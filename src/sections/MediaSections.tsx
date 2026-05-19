import { useState, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { ZoomIn, ZoomOut } from 'lucide-react'

/* ============ Floor Plan ============ */
export function FloorPlanSection() {
  const { ref, inView } = useInView<HTMLElement>()
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setScale((s) => Math.min(Math.max(s - e.deltaY * 0.001, 0.5), 4))
  }

  return (
    <section
      id="floor-plan"
      ref={ref}
      className="w-full px-6"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div
        className="mx-auto max-w-4xl transition-all duration-800"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="section-divider mb-12" />
        <h2 className="work-unit-title mb-10 text-center">导览图</h2>

        <div
          ref={containerRef}
          className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ height: '70vh', backgroundColor: '#f0f0f0' }}
          onWheel={onWheel}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-200"
            style={{ transform: `scale(${scale})` }}
          >
            <img
              src="/images/floor-plan.jpg"
              alt="展厅平面动线导览图"
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => setScale((s) => Math.min(s + 0.3, 4))}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow transition"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setScale((s) => Math.max(s - 0.3, 0.5))}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow transition"
            >
              <ZoomOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ Ticket ============ */
export function TicketSection() {
  const { ref, inView } = useInView<HTMLElement>()
  const [flipped, setFlipped] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const ticketRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (flipped) return
    const rect = ticketRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const rotateX = flipped ? 0 : (mousePos.y - 0.5) * -15
  const rotateY = flipped ? 180 : (mousePos.x - 0.5) * 15

  return (
    <section
      id="ticket"
      ref={ref}
      className="w-full px-6"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div
        className="mx-auto max-w-2xl text-center transition-all duration-800"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="section-divider mb-12" />
        <h2 className="work-unit-title mb-10">门票</h2>

        <div
          ref={ticketRef}
          className="inline-block cursor-pointer select-none"
          style={{ perspective: '1000px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className="relative transition-transform duration-700"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: 'preserve-3d',
              width: '500px',
              maxWidth: '85vw',
            }}
          >
            {/* Front */}
            <img
              src="/images/ticket-front.jpg"
              alt="展览门票正面"
              className="w-full shadow-lg"
              style={{ backfaceVisibility: 'hidden' }}
            />
            {/* Back */}
            <img
              src="/images/ticket-back.jpg"
              alt="展览门票背面"
              className="absolute inset-0 w-full shadow-lg"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            />
          </div>
        </div>

        <p className="caption-text mt-4">{flipped ? '点击翻回正面' : '点击翻面查看背面'}</p>
      </div>
    </section>
  )
}

/* ============ Poster ============ */
export function PosterSection() {
  const { ref, inView } = useInView<HTMLElement>()
  const [fullscreen, setFullscreen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <section
      id="poster"
      ref={ref}
      className="w-full px-6"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div
        className="mx-auto max-w-2xl text-center transition-all duration-800"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="section-divider mb-12" />
        <h2 className="work-unit-title mb-10">海报</h2>

        <div
          className="relative inline-block cursor-pointer overflow-hidden"
          onClick={() => setFullscreen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src="/images/main-poster.jpg"
            alt="展览主视觉海报"
            className="max-w-full transition-transform duration-500"
            style={{ maxHeight: '70vh', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)', opacity: hovered ? 1 : 0 }}
          >
            <p className="text-white text-center px-8" style={{ fontSize: '16px', letterSpacing: '0.1em' }}>
              探寻存在本质，解构现实秩序
            </p>
          </div>
        </div>
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999 }}
          onClick={() => setFullscreen(false)}
        >
          <img
            src="/images/main-poster.jpg"
            alt="展览主视觉海报"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  )
}

/* ============ Panorama Video ============ */
export function PanoramaVideoSection() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      id="panorama-video"
      ref={ref}
      className="w-full px-6"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div
        className="mx-auto max-w-4xl transition-all duration-800"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="section-divider mb-12" />
        <h2 className="work-unit-title mb-10 text-center">全景视频</h2>

        <div
          className="relative w-full overflow-hidden"
          style={{ paddingBottom: '75%', borderRadius: '2px', backgroundColor: '#1a1a1a' }}
        >
          <video
            className="absolute inset-0 w-full h-full"
            style={{ borderRadius: '2px', objectFit: 'contain' }}
            muted
            loop
            playsInline
            autoPlay
            controls
          >
            <source src="/videos/panorama-main.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="caption-text mt-4 text-center">展厅全域实景巡览</p>
      </div>
    </section>
  )
}
