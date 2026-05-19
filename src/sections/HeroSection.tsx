import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import HeroCanvas from './HeroCanvas'
import { useInView } from '../hooks/useInView'

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const { ref: prefaceRef, inView: prefaceVisible } = useInView<HTMLDivElement>()

  useEffect(() => {
    const onScroll = () => {
      if (!titleRef.current) return
      const scrollY = window.scrollY
      const opacity = Math.max(0, 1 - scrollY / 500)
      const translateY = scrollY * 0.3
      titleRef.current.style.opacity = String(opacity)
      titleRef.current.style.transform = `translateY(-${translateY}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToInfo = () => {
    const el = document.getElementById('exhibition-info')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative w-full" style={{ height: '100vh' }}>
      <HeroCanvas />
      <div
        ref={titleRef}
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <h1
          className="text-center font-bold tracking-wider"
          style={{
            fontSize: 'clamp(48px, 10vw, 120px)',
            color: '#1a1a1a',
            letterSpacing: '0.08em',
            lineHeight: 1.1,
          }}
        >
          裂隙之境
        </h1>
        <p
          className="mt-4 text-center font-medium"
          style={{
            fontSize: 'clamp(18px, 3vw, 32px)',
            color: '#1a1a1a',
            letterSpacing: '0.15em',
          }}
        >
          八重存在之思
        </p>
        <p
          className="mt-3 text-center"
          style={{
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            color: '#888888',
            letterSpacing: '0.2em',
          }}
        >
          2026 当代装置艺术展
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        style={{ zIndex: 2 }}
        onClick={scrollToInfo}
      >
        <ChevronDown size={28} color="#888888" className="animate-bounce" />
      </div>

      {/* Preface */}
      <div
        ref={prefaceRef}
        className="absolute w-full px-6"
        style={{ bottom: '-280px', zIndex: 3 }}
      >
        <div
          className="mx-auto max-w-2xl transition-all duration-1000"
          style={{
            opacity: prefaceVisible ? 1 : 0,
            transform: prefaceVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <p
            className="text-center leading-relaxed"
            style={{
              fontSize: '14px',
              color: '#1a1a1a',
              lineHeight: 2,
            }}
          >
            本次展览以八组跨媒介装置为棱镜，剖开当代文明的表层肌理，追问本真与伪装、边界与突破、消逝与重生、虚无与循环的永恒命题。所有作品皆从日常经验与集体记忆中生长，以冷静的视觉语言构建一个个自洽的思辨场域，邀请观者在凝视与参与中，直面个体生存的困境、文化传承的焦虑与人类存在的本质。
          </p>
        </div>
      </div>
    </section>
  )
}
