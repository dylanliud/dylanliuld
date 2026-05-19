import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from '@studio-freight/lenis'
import HeroSection from './sections/HeroSection'
import { ExhibitionInfoSection, GuestsSection, ScheduleSection } from './sections/InfoSections'
import { FloorPlanSection, TicketSection, PanoramaVideoSection } from './sections/MediaSections'
import WorksSection from './sections/WorksSection'
import InversionSection from './sections/InversionSection'

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'exhibition-info', label: '展览信息' },
  { id: 'guests', label: '特邀嘉宾' },
  { id: 'schedule', label: '展览日程' },
  { id: 'floor-plan', label: '导览图' },
  { id: 'ticket', label: '门票' },
  { id: 'panorama-video', label: '全景视频' },
  { id: 'works', label: '八大作品' },
]

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [navVisible, setNavVisible] = useState(false)
  const [inverted, setInverted] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Nav background on scroll
  useEffect(() => {
    const onScroll = () => {
      setNavVisible(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Section detection for nav highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.2 }
    )

    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Handle popstate (back button)
  useEffect(() => {
    const handlePopState = () => {
      if (inverted) {
        window.alert('展览已结束，无法返回')
        window.history.pushState(null, '', window.location.href)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [inverted])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0 })
    }
  }, [])

  const handleLeaveExhibition = useCallback(() => {
    // Push state to prevent back button
    window.history.pushState(null, '', window.location.href)

    // Destroy Lenis and lock scroll
    if (lenisRef.current) {
      lenisRef.current.destroy()
    }
    document.body.style.overflow = 'hidden'

    // Scroll to works section position to prevent jump
    const worksEl = document.getElementById('works')
    if (worksEl) {
      worksEl.scrollIntoView()
    }

    setInverted(true)
  }, [])

  return (
    <>
      {/* Navigation */}
      {!inverted && (
        <nav
          className="fixed top-0 left-0 w-full transition-all duration-500"
          style={{
            zIndex: 1000,
            height: '48px',
            backgroundColor: navVisible ? 'rgba(245, 245, 245, 0.9)' : 'transparent',
            backdropFilter: navVisible ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: navVisible ? 'blur(12px)' : 'none',
          }}
        >
          <div className="mx-auto max-w-6xl h-full flex items-center justify-center gap-6 px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative transition-colors duration-300"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  color: activeSection === item.id ? '#1a1a1a' : '#888888',
                  fontWeight: activeSection === item.id ? 600 : 400,
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <span
                    className="absolute -bottom-1 left-0 w-full"
                    style={{
                      height: '1px',
                      backgroundColor: '#1a1a1a',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div
        ref={mainRef}
        style={{
          opacity: inverted ? 0 : 1,
          pointerEvents: inverted ? 'none' : 'auto',
          transition: 'opacity 0.3s',
        }}
      >
        <HeroSection />
        <ExhibitionInfoSection />
        <GuestsSection />
        <ScheduleSection />
        <FloorPlanSection />
        <TicketSection />
        <PanoramaVideoSection />
        <WorksSection onLeave={handleLeaveExhibition} />
      </div>

      {/* Inversion Overlay */}
      {inverted && <InversionSection />}
    </>
  )
}
