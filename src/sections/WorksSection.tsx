import { useState, useRef, useCallback, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

/* ============ Shared Components ============ */
function WorkHeader({ number, title, artist, artistPhoto }: { number: string; title: string; artist?: string; artistPhoto?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="mb-8 transition-all duration-800"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      <div className="section-divider mb-6" />
      <h2 className="work-unit-title">
        单元{number} 《{title}》
      </h2>
      {artist && (
        <div className="mt-3 flex items-center gap-3">
          {artistPhoto && (
            <div
              className="rounded-full overflow-hidden flex-shrink-0"
              style={{ width: '40px', height: '40px', border: '2px solid #1a1a1a' }}
            >
              <img
                src={artistPhoto}
                alt={artist}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          )}
          <div className="inline-flex items-center px-3 py-1 rounded-full" style={{ backgroundColor: '#1a1a1a' }}>
            <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600, letterSpacing: '0.05em' }}>
              {artist}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function VideoPlayer({ src, ratio }: { src: string; ratio?: number }) {
  // Default 16:9 = 56.25%, custom ratio e.g. 4:3 = 75%
  const paddingBottom = ratio ? `${(1 / ratio) * 100}%` : '56.25%'
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ paddingBottom, borderRadius: '2px', backgroundColor: '#1a1a1a' }}
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
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}

function RevealText({ children, className = '' }: { children: string; className?: string }) {
  const { ref, inView } = useInView<HTMLParagraphElement>()
  return (
    <p
      ref={ref}
      className={`transition-all duration-800 ${className}`}
      style={{
        fontSize: '13px',
        lineHeight: 2,
        color: '#1a1a1a',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      {children}
    </p>
  )
}

function ImageLightbox({
  src,
  alt,
  className = '',
  style = {},
  hoverScale = true,
}: {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  hoverScale?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer transition-transform duration-500 ${className}`}
        style={style}
        onClick={() => setOpen(true)}
        onMouseEnter={(e) => {
          if (hoverScale) e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          if (hoverScale) e.currentTarget.style.transform = 'scale(1)'
        }}
      />
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999 }}
          onClick={() => setOpen(false)}
        >
          <img src={src} alt={alt} className="max-w-[90vw] max-h-[90vh] object-contain" />
        </div>
      )}
    </>
  )
}

/* ============ Work 01 ============ */
export function Work01() {
  return (
    <div className="work-unit">
      <WorkHeader number="01" title="升降的囚徒" artist="马塞尔·堵上门 Marcel Duchamp" artistPhoto="/images/artist-duchamp.jpg" />
      <VideoPlayer src="/videos/work01-prisoner.mp4" ratio={4 / 3} />
      <div className="mt-8 max-w-2xl">
        <RevealText>
          以滑梯与升降台的机械联动，构建了一个无法逃脱的生存闭环。滑梯是童真的最后避难所，是个体卸下所有社会面具、回归纯粹本真的瞬间；而每一次向下的滑落，都必然驱动齿轮转动，将另一侧的升降台推向高处。这一残酷的力学平衡，精准隐喻了当代社会的进阶逻辑：成长往往以牺牲本真为代价，欲望的实现常常建立在对他者的消耗之上。不锈钢镜面方盒如同一面冰冷的审判镜，在循环往复的运动中，不断映照出观者真实的面容，让我们在童真与世俗的拉扯中，看清自己既是被系统裹挟的囚徒，也是系统运转的同谋。
        </RevealText>
      </div>
    </div>
  )
}

/* ============ Work 02 ============ */
export function Work02() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0)
    scrollLeft.current = scrollRef.current?.scrollLeft || 0
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current.offsetLeft || 0)
    const walk = (x - startX.current) * 1.5
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }
  const handleMouseUp = () => {
    isDragging.current = false
  }

  const detailImages = [
    '/images/work02-detail1.jpg',
    '/images/work02-detail2.jpg',
    '/images/work02-detail3.jpg',
    '/images/work02-detail4.jpg',
    '/images/work02-detail5.jpg',
    '/images/work02-detail6.jpg',
  ]

  return (
    <div className="work-unit">
      <WorkHeader number="02" title="废墟的织体" artist="约瑟夫·博意思 Joseph Beuys" artistPhoto="/images/artist-beuys.jpg" />

      <ImageLightbox
        src="/images/work02-main.jpg"
        alt="《废墟的织体》全景"
        className="w-full"
        style={{ objectFit: 'cover' }}
      />

      <div
        ref={scrollRef}
        className="mt-6 flex gap-4 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {detailImages.map((src, i) => (
          <div key={i} className="flex-shrink-0" style={{ width: '280px' }}>
            <img
              src={src}
              alt={`细节图 ${i + 1}`}
              className="w-full h-48 object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-2xl">
        <RevealText>
          当人工边界成为割裂自然与生活的暴力符号，我们选择用编织的方式完成和解。这件作品以拆迁废墟中的废弃钢丝、建筑废料为材料，邀请公众共同参与编织，将原本冰冷、隔离的围栏，转化为有机、生长的艺术织体。它质疑了"人工与自然二元对立"的固有认知，证明破碎并非终结，而是重生的起点。当废弃之物在众人的手中重新获得生命，当坚硬的边界变得柔软而富有温度，我们也完成了对工业文明废墟的诗意救赎，探索了艺术介入公共空间、重构人与环境关系的可能。
        </RevealText>
      </div>
    </div>
  )
}

/* ============ Work 03 ============ */
export function Work03() {
  return (
    <div className="work-unit">
      <WorkHeader number="03" title="风的祝福" artist="马克·螺丝壳 Mark Rothko" artistPhoto="/images/artist-rothko.jpg" />
      <VideoPlayer src="/videos/work03-wind.mp4" />
      <div className="mt-8 max-w-2xl">
        <RevealText>
          在强势文化席卷一切的时代，满族剪纸如同一缕脆弱却坚韧的风，飘荡在历史的缝隙中。这件动态装置让剪纸在风的吹拂下轻轻摇曳，阳光穿过镂空的纹样，在地面投下流动的光影。那些摇曳的剪纸，是正在消逝的民俗记忆，是一个民族沉默的诉说；而那些流动的光影，是文化的灵魂，是跨越时空的祝福。风动影移之间，我们看到了弱势文化在时代洪流中的飘摇与坚守，也见证了文化最本真的力量：它从不以强势的姿态征服，而是以温柔的方式渗透，最终反哺大地，滋养每一个行走在这片土地上的人。
        </RevealText>
      </div>
    </div>
  )
}

/* ============ Work 04 ============ */
const specimenHotspots = [
  { id: 1, x: 22, y: 35, label: '标本 01' },
  { id: 2, x: 42, y: 28, label: '标本 02' },
  { id: 3, x: 58, y: 45, label: '标本 03' },
  { id: 4, x: 35, y: 60, label: '标本 04' },
  { id: 5, x: 72, y: 55, label: '标本 05' },
]

export function Work04() {
  const [activeSpecimen, setActiveSpecimen] = useState<number | null>(null)

  return (
    <div className="work-unit">
      <WorkHeader number="04" title="标准的怪物" artist="勒内·妈了个特 René Magritte" artistPhoto="/images/artist-magritte.jpg" />

      <div className="relative w-full" style={{ maxHeight: '70vh' }}>
        <ImageLightbox
          src="/images/work04-main.jpg"
          alt="《标准的怪物》装置全景"
          className="w-full"
          style={{ maxHeight: '70vh', objectFit: 'cover' }}
          hoverScale={false}
        />
        {specimenHotspots.map((spot) => (
          <button
            key={spot.id}
            className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${spot.x}%`, top: `${spot.y}%`, zIndex: 10 }}
            onClick={(e) => {
              e.stopPropagation()
              setActiveSpecimen(spot.id)
            }}
          >
            <span className="absolute inset-0 rounded-full border-2 border-white/80" />
            <span className="absolute inset-0 rounded-full border-2 border-white/60 animate-pulse-ring" />
            <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
              {spot.id}
            </span>
          </button>
        ))}
      </div>

      {activeSpecimen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999 }}
          onClick={() => setActiveSpecimen(null)}
        >
          <div className="text-center">
            <img
              src={`/images/work04-spec${activeSpecimen}.jpg`}
              alt={`标本 ${activeSpecimen}`}
              className="max-w-[80vw] max-h-[70vh] object-contain"
            />
            <p className="text-white/60 mt-4 text-sm">标本 {activeSpecimen} 特写</p>
          </div>
        </div>
      )}

      <div className="mt-8 max-w-2xl">
        <RevealText>
          "鸡头猪肚"的拼接装置，是对模板化时代最尖锐的讽刺。当所有的创作都被纳入统一的范式，当所有的表达都遵循固定的模板，我们得到的不再是鲜活的艺术，而是一个个面目模糊的"标准产物"。这件作品将"作文模板"的逻辑视觉化，用荒诞的拼接形态，追问标准化评判体系的合理性：当所有人都使用同一个模具，我们该如何区分优劣？当个性被磨平，表达沦为复制，艺术的价值又将何去何从？它提醒我们，真正的创造永远是对标准的反叛，真正的价值永远存在于参差多态之中。
        </RevealText>
      </div>
    </div>
  )
}

/* ============ Work 05 ============ */
const ballData = [
  { id: 1, x: 30, y: 40, color: 'from-rose-400 to-orange-300', bg: '#ff6b6b' },
  { id: 2, x: 45, y: 30, color: 'from-sky-400 to-cyan-300', bg: '#4ecdc4' },
  { id: 3, x: 60, y: 50, color: 'from-amber-400 to-yellow-300', bg: '#ffe66d' },
  { id: 4, x: 35, y: 65, color: 'from-violet-400 to-purple-300', bg: '#a855f7' },
  { id: 5, x: 55, y: 70, color: 'from-emerald-400 to-teal-300', bg: '#34d399' },
  { id: 6, x: 70, y: 35, color: 'from-pink-400 to-rose-300', bg: '#ec4899' },
  { id: 7, x: 25, y: 55, color: 'from-blue-400 to-indigo-300', bg: '#6366f1' },
  { id: 8, x: 50, y: 45, color: 'from-lime-400 to-green-300', bg: '#84cc16' },
  { id: 9, x: 65, y: 60, color: 'from-orange-400 to-red-300', bg: '#f97316' },
  { id: 10, x: 40, y: 50, color: 'from-cyan-400 to-blue-300', bg: '#06b6d4' },
]

interface BallState {
  vx: number
  vy: number
  baseX: number
  baseY: number
}

function FloatingBall({
  ball,
  mouseX,
  mouseY,
  onClick,
}: {
  ball: typeof ballData[0]
  mouseX: number
  mouseY: number
  onClick: () => void
}) {
  const springX = useMotionValue(ball.x)
  const springY = useMotionValue(ball.y)
  const smoothX = useSpring(springX, { stiffness: 120, damping: 8, mass: 0.6 })
  const smoothY = useSpring(springY, { stiffness: 120, damping: 8, mass: 0.6 })
  const scale = useMotionValue(1)
  const smoothScale = useSpring(scale, { stiffness: 300, damping: 15 })

  // Physics state
  const stateRef = useRef<BallState>({
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    baseX: ball.x,
    baseY: ball.y,
  })

  useEffect(() => {
    let raf: number
    const state = stateRef.current

    const animate = () => {
      raf = requestAnimationFrame(animate)

      // Idle floating - random drift
      state.baseX += state.vx
      state.baseY += state.vy

      // Bounce off edges
      if (state.baseX < 8 || state.baseX > 92) {
        state.vx *= -1
        state.vx += (Math.random() - 0.5) * 0.3
      }
      if (state.baseY < 8 || state.baseY > 85) {
        state.vy *= -1
        state.vy += (Math.random() - 0.5) * 0.3
      }

      // Random jitter for zero-gravity feel
      state.vx += (Math.random() - 0.5) * 0.08
      state.vy += (Math.random() - 0.5) * 0.08
      // Damping
      state.vx *= 0.995
      state.vy *= 0.995

      // Mouse repulsion - STRONG force
      const dx = state.baseX - mouseX * 100
      const dy = state.baseY - mouseY * 100
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 25 && dist > 0.1) {
        const force = (25 - dist) / 25
        state.vx += (dx / dist) * force * 2.5
        state.vy += (dy / dist) * force * 2.5
      }

      springX.set(state.baseX)
      springY.set(state.baseY)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [mouseX, mouseY, springX, springY])

  return (
    <motion.button
      className="absolute rounded-full cursor-pointer"
      style={{
        left: smoothX.get(),
        top: smoothY.get(),
        x: '-50%',
        y: '-50%',
        width: 44,
        height: 44,
        scale: smoothScale,
        zIndex: 10,
        background: `radial-gradient(circle at 35% 35%, ${ball.bg}, ${adjustColor(ball.bg, -60)})`,
        boxShadow: `0 4px 20px ${ball.bg}80, inset 0 -4px 8px rgba(0,0,0,0.2), inset 0 4px 8px rgba(255,255,255,0.3)`,
      }}
      onClick={(e) => {
        e.stopPropagation()
        scale.set(0.6)
        setTimeout(() => scale.set(1.4), 50)
        setTimeout(() => scale.set(1), 200)
        onClick()
      }}
      onHoverStart={() => scale.set(1.3)}
      onHoverEnd={() => scale.set(1)}
      whileTap={{ scale: 0.7 }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -60, bottom: 60 }}
      dragElastic={0.4}
      onDragEnd={() => {
        scale.set(0.8)
        setTimeout(() => scale.set(1.2), 50)
        setTimeout(() => scale.set(1), 250)
      }}
    >
      {/* Inner shine */}
      <span
        className="absolute rounded-full"
        style={{
          width: 16,
          height: 16,
          top: 6,
          left: 8,
          background: 'radial-gradient(circle, rgba(255,255,255,0.6), transparent)',
        }}
      />
      {/* Glow ring */}
      <motion.span
        className="absolute -inset-2 rounded-full"
        style={{
          border: `2px solid ${ball.bg}40`,
          boxShadow: `0 0 15px ${ball.bg}60, 0 0 30px ${ball.bg}30`,
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.button>
  )
}

// Helper to darken color
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount))
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount))
  return `rgb(${r},${g},${b})`
}

export function Work05() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [activeBall, setActiveBall] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  return (
    <div className="work-unit">
      <WorkHeader number="05" title="边界的悖论" artist="康斯坦丁·布朗酷西 Constantin Brâncuși" artistPhoto="/images/artist-brancusi.jpg" />

      <div
        ref={containerRef}
        className="relative w-full cursor-crosshair overflow-hidden select-none"
        style={{ borderRadius: '8px', backgroundColor: '#e8e8e8' }}
        onMouseMove={handleMouseMove}
      >
        <ImageLightbox
          src="/images/work05-main.jpg"
          alt="《边界的悖论》装置"
          className="w-full"
          hoverScale={false}
        />

        {/* Ambient glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.08) 100%)',
          }}
        />

        {ballData.map((ball) => (
          <FloatingBall
            key={ball.id}
            ball={ball}
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            onClick={() => setActiveBall(ball.id)}
          />
        ))}

        <p className="caption-text absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
          鼠标靠近球体感受排斥力场 · 拖拽球体体验失重
        </p>
      </div>

      {activeBall && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999 }}
          onClick={() => setActiveBall(null)}
        >
          <div className="text-center">
            <motion.div
              className="w-32 h-32 rounded-full mx-auto mb-6"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${ballData.find(b => b.id === activeBall)?.bg}, ${adjustColor(ballData.find(b => b.id === activeBall)?.bg || '#888', -60)})`,
                boxShadow: `0 8px 40px ${ballData.find(b => b.id === activeBall)?.bg}80`,
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            />
            <p className="text-white/60 text-sm">球体 {activeBall} 特写</p>
            <p className="text-white/30 text-xs mt-2">点击空白处关闭</p>
          </div>
        </div>
      )}

      <div className="mt-8 max-w-2xl">
        <RevealText>
          一堆球体被禁锢在正方体的框架之内，却又不断试图突破边界，向外溢出。这件作品探讨了自由与限制的永恒悖论：边界既是禁锢，也是保护；既是规则，也是秩序。球体对正方体的冲击，是个体对世俗框架的反抗，是自由对规则的挑战；但当球体真正突破边界，它也将失去原本的坐标，陷入新的无序之中。它让我们思考：真正的自由是否存在？我们所追求的突破，究竟是自我的解放，还是另一种形式的迷失？
        </RevealText>
      </div>
    </div>
  )
}

/* ============ Work 06 ============ */
export function Work06() {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <div className="work-unit">
      <WorkHeader number="06" title="完美的异化" artist="弗朗西斯·培根肉 Francis Bacon" artistPhoto="/images/artist-bacon.jpg" />

      <div
        className="relative mx-auto"
        style={{ maxWidth: '1000px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/images/work06-main.jpg"
          alt="《完美的异化》作品"
          className="w-full cursor-pointer transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          onClick={() => setOpen(true)}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4 transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0, width: '200px' }}
        >
          <p className="caption-text" style={{ lineHeight: 1.6 }}>
            创作说明：将动物身体与黄金比例人脸拼接，直指人类中心主义。
          </p>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999 }}
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/work06-main.jpg"
            alt="《完美的异化》作品"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}

      <div className="mt-8 max-w-2xl mx-auto">
        <RevealText>
          将动物的身体与人类黄金比例的人脸拼接，创造出一种既熟悉又陌生的怪异生命体。这件作品直指人类中心主义的认知局限与审美霸权。长久以来，人类将自己视为万物的尺度，用自己的标准定义美与丑、高级与低级。而当动物拥有了人类所谓"完美"的面容，我们感受到的不是和谐，而是深刻的不安与荒诞。它打破了物种之间的清晰边界，让我们重新审视人类与其他生命的关系，反思我们对"完美"的偏执追求，最终如何导致了生命形态的异化。
        </RevealText>
      </div>
    </div>
  )
}

/* ============ Work 07 ============ */
export function Work07() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div className="work-unit">
      <WorkHeader number="07" title="南柯蚁穴" artist="M.C. 挨烧儿 M.C. Escher" artistPhoto="/images/artist-escher.jpg" />
      <VideoPlayer src="/videos/work07-ants.mp4" ratio={4 / 3} />
      <div className="mt-8 max-w-2xl">
        <RevealText>
          从第一缕微光在泥土中亮起，到无数蚂蚁洞蔓延成璀璨的网络，再到所有光芒熄灭，一切重归沉寂。这件99秒的循环影像，是对"南柯一梦"的当代转译。蚂蚁洞的诞生、扩张、鼎盛与毁灭，对应着人类生命的全过程，也对应着所有文明的兴衰轮回。它揭示了存在的本质：一切繁华都是短暂的幻象，所有的喧嚣最终都将归于寂静。在这个加速运转的时代，它邀请我们慢下来，凝视生命的虚无与循环，在短暂的存在中，寻找永恒的意义。
        </RevealText>
      </div>
      <div
        ref={ref}
        className="mt-6 text-center transition-all duration-1000 delay-500"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        <p className="caption-text">99秒循环影像 | 诞生·扩张·毁灭·重生</p>
      </div>
    </div>
  )
}

/* ============ Floating Bubble Carousel ============ */
function FloatingCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 80, damping: 12, mass: 0.8 })
  const springY = useSpring(y, { stiffness: 80, damping: 12, mass: 0.8 })

  // Idle floating animation
  const floatX = useMotionValue(0)
  const floatY = useMotionValue(0)
  const floatSpringX = useSpring(floatX, { stiffness: 30, damping: 8 })
  const floatSpringY = useSpring(floatY, { stiffness: 30, damping: 8 })

  const rotateX = useTransform(springY, [-150, 150], [8, -8])
  const rotateY = useTransform(springX, [-150, 150], [-8, 8])
  const scale = useTransform(springX, [-200, 0, 200], [0.92, 1, 0.92])

  // Idle float effect
  useEffect(() => {
    let frame = 0
    const interval = setInterval(() => {
      frame++
      floatX.set(Math.sin(frame * 0.03) * 15)
      floatY.set(Math.cos(frame * 0.025) * 10)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const goNext = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % images.length)
    x.set(0)
    y.set(0)
  }
  const goPrev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + images.length) % images.length)
    x.set(0)
    y.set(0)
  }
  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
    x.set(0)
    y.set(0)
  }

  // Drag end - spring back
  const handleDragEnd = () => {
    x.set(0)
    y.set(0)
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      y: 30,
      opacity: 0,
      scale: 0.85,
      rotateZ: dir > 0 ? 5 : -5,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotateZ: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      y: -30,
      opacity: 0,
      scale: 0.85,
      rotateZ: dir > 0 ? -5 : 5,
    }),
  }

  return (
    <div
      ref={containerRef}
      className="mt-12 relative w-full max-w-3xl mx-auto select-none"
      style={{ perspective: '1000px' }}
    >
      {/* Image container with drag */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing mx-auto"
        style={{
          height: '420px',
          borderRadius: '12px',
          backgroundColor: '#eaeaea',
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              mass: 0.8,
            }}
            drag
            dragConstraints={{ left: -120, right: 120, top: -80, bottom: 80 }}
            dragElastic={0.25}
            onDragEnd={handleDragEnd}
            style={{
              x: springX,
              y: springY,
              rotateX,
              rotateY,
              scale,
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.img
              src={images[current]}
              alt={`细节图 ${current + 1}`}
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                x: floatSpringX,
                y: floatSpringY,
                filter: 'saturate(1.2) contrast(1.05)',
                borderRadius: '8px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.04) 100%)',
            borderRadius: '12px',
          }}
        />
      </div>

      {/* Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-[210px] -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white shadow-md transition backdrop-blur-sm"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 top-[210px] -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white shadow-md transition backdrop-blur-sm"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              backgroundColor: i === current ? '#1a1a1a' : '#d4d4d4',
              borderRadius: i === current ? '3px' : '50%',
            }}
          />
        ))}
      </div>

      <p className="caption-text mt-3 text-center">
        {current + 1} / {images.length} · 拖拽图片体验失重感
      </p>
    </div>
  )
}

/* ============ Work 08 ============ */
const carouselImages = [
  '/images/work08-detail1.jpg',
  '/images/work08-detail2.jpg',
  '/images/work08-detail3.jpg',
  '/images/work08-detail4.jpg',
  '/images/work08-detail5.jpg',
  '/images/work08-detail6.jpg',
  '/images/work08-detail7.jpg',
  '/images/work08-detail8.jpg',
]

export function Work08({ onLeave }: { onLeave: () => void }) {
  return (
    <div className="work-unit">
      <WorkHeader number="08" title="空教室" artist="伊夫·克莱因蓝 Yves Klein" artistPhoto="/images/artist-klein.jpg" />
      <VideoPlayer src="/videos/work08-classroom.mp4" />
      <div className="mt-8 max-w-2xl">
        <RevealText>
          以透明PVC充气复刻的全套校园物品，构建了一个失重悬浮的记忆真空。透明的空心形态消解了物品的实体重量，却保留了最清晰的集体记忆轮廓；每一个悬浮的文具与书包，都曾是我们成长轨迹中无法缺席的坐标。这一轻盈到近乎虚无的呈现，精准隐喻了当代教育的悖论：那些曾经压在我们身上的沉重负担，最终都变成了透明的、看不见的烙印。纯白空间如同一块巨大的记忆幕布，在空无一人的教室里，缺席的人反而成为了作品的主角，让我们在回望童年的瞬间，看清那些早已融入骨血的、无形的规训。
        </RevealText>
      </div>

      {/* Floating Bubble Carousel */}
      <FloatingCarousel images={carouselImages} />

      {/* Leave Button */}
      <div className="mt-16 text-center">
        <button
          onClick={onLeave}
          className="px-10 py-3 border transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
          style={{
            fontSize: '13px',
            color: '#888888',
            borderColor: '#d4d4d4',
            letterSpacing: '0.1em',
          }}
        >
          【离开展览】
        </button>
      </div>
    </div>
  )
}

/* ============ Works Container ============ */
export default function WorksSection({ onLeave }: { onLeave: () => void }) {
  const { ref, inView } = useInView<HTMLElement>(0.05)

  return (
    <section
      id="works"
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
        <h2 className="work-unit-title mb-16 text-center">八大作品</h2>

        <div className="space-y-32">
          <Work01 />
          <Work02 />
          <Work03 />
          <Work04 />
          <Work05 />
          <Work06 />
          <Work07 />
          <Work08 onLeave={onLeave} />
        </div>
      </div>
    </section>
  )
}
