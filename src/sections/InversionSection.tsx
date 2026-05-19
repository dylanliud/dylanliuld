import { useEffect, useState, useRef } from 'react'

const inversionTexts = [
  '恭喜你完成了本次观展。',
  '你看到了8件精心制作的装置作品，',
  '看到了32位全球顶尖的艺术家和学者，',
  '看到了详细的展览日程，',
  '看到了专业的作品说明，',
  '看到了一个完整的、专业的当代艺术展。',
  '',
  '但现在，我要告诉你真相。',
  '',
  '这一切都是假的。',
  '',
  '没有物语美术馆地下一层特展厅。',
  '没有2026年2月30日上午9点的开幕式。',
  '没有剪彩，没有研讨会，没有茶歇。',
  '没有汉斯·乌尔里希·奥布里斯特，没有徐冰，没有蔡国强。',
  '他们没有收到邀请，不会来，甚至不知道有这个展览。',
  '',
  '你刚才看到的所有嘉宾头衔都是真的，',
  '但他们和这个展览，没有任何关系。',
  '',
  '那8件作品是真的。它们确实存在。',
  '但它们从来没有被摆在任何美术馆的展厅里。',
  '它们现在正躺在我们宿舍的角落，积着灰。',
  '',
  '这个展览从来没有发生过。',
  '它只存在于你现在正在看的这个网页里。',
  '',
  '而你，是这个展览唯一的观众。',
  '',
  '感谢你的参与。',
  '',
  '现在，你可以关闭这个标签页了。',
  '',
  '对了，刚才那个"门票已售罄"也是假的。',
  '根本就没有预约系统。',
]

export default function InversionSection() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [fadeAll, setFadeAll] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sequential reveal
  useEffect(() => {
    if (visibleLines >= inversionTexts.length) return
    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1)
    }, 600)
    return () => clearTimeout(timer)
  }, [visibleLines])

  // Fade out after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeAll(true)
    }, 30000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: fadeAll ? '#ffffff' : '#f5f5f5',
        zIndex: 10000,
        transition: 'background-color 8s ease',
      }}
    >
      <div className="max-w-2xl text-center">
        {inversionTexts.map((text, i) => (
          <p
            key={i}
            className="transition-all duration-700"
            style={{
              fontSize: text === '这一切都是假的。' || text === '这个展览从来没有发生过。' ? '22px' : '16px',
              fontWeight: text === '这一切都是假的。' || text === '这个展览从来没有发生过。' ? 700 : 400,
              color: '#1a1a1a',
              lineHeight: 2.0,
              opacity: i < visibleLines ? (fadeAll ? 0 : 1) : 0,
              transform: i < visibleLines ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 50}ms`,
              minHeight: text === '' ? '0.5em' : 'auto',
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}
