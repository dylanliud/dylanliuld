import { useInView } from '../hooks/useInView'
import { useState } from 'react'

/* ============ Exhibition Info ============ */
export function ExhibitionInfoSection() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      id="exhibition-info"
      ref={ref}
      className="w-full px-6"
      style={{ paddingTop: '320px', paddingBottom: '120px' }}
    >
      <div
        className="mx-auto max-w-2xl transition-all duration-800"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="section-divider mb-12" />
        <h2 className="work-unit-title mb-10">展览信息</h2>

        <div className="space-y-5" style={{ fontSize: '13px', lineHeight: 1.8 }}>
          <div>
            <span className="font-semibold" style={{ color: '#1a1a1a' }}>展览时间：</span>
            <span style={{ color: '#888888' }}>2026年2月30日 09:00-12:00（仅开放3小时，闭展后永久撤展）</span>
          </div>
          <div>
            <span className="font-semibold" style={{ color: '#1a1a1a' }}>展览地点：</span>
            <span style={{ color: '#888888' }}>物语美术馆地下一层特展厅</span>
          </div>
          <div>
            <span className="font-semibold" style={{ color: '#1a1a1a' }}>主办方：</span>
            <span style={{ color: '#888888' }}>物语大学美术学院</span>
          </div>
          <div>
            <span className="font-semibold" style={{ color: '#1a1a1a' }}>协办方：</span>
            <span style={{ color: '#888888' }}>物语美术馆</span>
          </div>
          <div>
            <span className="font-semibold" style={{ color: '#1a1a1a' }}>门票价格：</span>
            <span style={{ color: '#888888' }}>免费（需提前预约，已全部售罄）</span>
            <p className="caption-text mt-1">本门票仅在本网页有效</p>
          </div>
          <div>
            <span className="font-semibold" style={{ color: '#1a1a1a' }}>开幕仪式：</span>
            <span style={{ color: '#888888' }}>2026年2月30日 09:00-09:30</span>
          </div>
          <div>
            <span className="font-semibold" style={{ color: '#1a1a1a' }}>学术研讨会：</span>
            <span style={{ color: '#888888' }}>2026年2月30日 10:00-11:30</span>
            <p className="mt-1" style={{ color: '#888888' }}>主题：《数字时代下装置艺术的边界与可能》</p>
            <p className="mt-1" style={{ color: '#888888' }}>本次研讨会将全程进行中英双语线上直播，直播通道将于开幕式前1小时开放。</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ Guests ============ */
interface Guest {
  name: string
  nameEn?: string
  title: string
  bio: string
  photo: string
}

const openingGuests: Guest[] = [
  {
    name: '汉斯·奥利奥·布里斯托',
    nameEn: 'Hans Oreo Bristol',
    title: '瑞士策展人、批评家 | 伦敦蛇形画廊艺术总监',
    bio: '1968年生于瑞士苏黎世，是全球唯一一个能连续72小时不睡觉还能把策展方案讲清楚的超人。21岁时他在自家厨房策划了人生第一场展览——展出了12个空盘子，题为《吃完的早餐》。被当地报纸误报为"现代厨房艺术的曙光"，自此声名鹊起。迄今策划了超过300场国际展览，创下同时和28位艺术家喝咖啡的纪录。著有《策展简史》《如何在24小时内说服一个艺术家拆掉自己的作品》等著作。',
    photo: '/images/guest-obrist.jpg',
  },
  {
    name: '大卫·霍克泥',
    nameEn: 'David Hockmud',
    title: '英国画家 |  pop art代表人物、泳池系列创作者',
    bio: '1937年生于英国布拉德福德，1964年移居美国洛杉矶。他以明亮的加州泳池系列肖像画闻名，是20世纪最具影响力的英国艺术家之一。代表作包括《大水花》《泳池》系列等。他画了一辈子游泳池，却从未学会游泳——"这样我才不会被水干扰创作"。2010年开始用iPad画画，声称"这是达芬奇做梦都想拥有的工具"，但他的iPad里90%的内容是自拍。',
    photo: '/images/guest-hockney.jpg',
  },
  {
    name: '克里斯托·包万物',
    nameEn: 'Christo Wrapall',
    title: '保加利亚环境艺术家 | "包裹一切的男人"',
    bio: '1935年生于保加利亚加布罗沃，1964年移居巴黎。以与已故妻子珍妮-克劳德共同创作的大型环境装置闻名，代表作包括包裹德国国会大厦、包裹巴黎新桥、在美国加州架设24英里长的《门》等。他和妻子用60年时间花了2600万美元把德国国会大厦包起来，只展出了14天。据说他的遗嘱是把自己的骨灰也包裹起来展出——前提是他能找到愿意接这个项目的保险公司。',
    photo: '/images/guest-christo.jpg',
  },
  {
    name: '刘泽宇',
    title: '本次展览策展人 | 物语大学美术学院摄影专业',
    bio: '2005年5月32日生于某地，现就读于物语大学美术学院摄影专业。本次展览是其首个独立策展项目，致力于探索数字时代下装置艺术的边界与可能性。',
    photo: '/images/guest-curator.jpg',
  },
]

const seminarGuests: Guest[] = [
  {
    name: '马丽·阿莫拉稀',
    nameEn: 'Marina Abramović',
    title: '塞尔维亚行为艺术家 | "行为艺术之母"',
    bio: '1946年生于塞尔维亚贝尔格莱德，是当代行为艺术史上最重要的艺术家之一。代表作包括《艺术家在场》《韵律0》《情人·长城》等，其作品以探索身体极限、观众与艺术家的关系著称。2010年在纽约现代艺术博物馆举办的回顾展"艺术家在场"中，她连续700小时与1500位陌生人对视，创下博物馆参观人数纪录。事后她说："我的腿麻了三个月，但我的灵魂瘦了十斤。"',
    photo: '/images/guest-abramovic.jpg',
  },
  {
    name: '安尼斯·卡布奇诺',
    nameEn: 'Annis Cappuccino',
    title: '英国/印度雕塑家 | 特纳奖得主',
    bio: '1954年生于印度孟买，1973年移居英国伦敦。以大型公共雕塑和装置艺术闻名，代表作包括《云门》（芝加哥千禧公园"豆子"）、《天镜》《坠入地狱》等。1991年获英国当代艺术最高奖特纳奖。他曾花费10万英镑购买了"世界上最黑的颜料"Vantablack的独家使用权，导致其他艺术家只能使用"第二黑的颜料"，被艺术界称为"黑色垄断事件"。',
    photo: '/images/guest-kapoor.jpg',
  },
  {
    name: '曹间迷生',
    nameEn: 'Yaoyi Kusama',
    title: '日本当代艺术家 | 波普艺术代表人物',
    bio: '1929年生于日本松本，是全球身价最高的女艺术家之一。以圆点图案、无限镜屋和软雕塑闻名，代表作包括《无限的网》《南瓜》《无限镜屋》系列等。她从10岁开始画圆点，至今已经画了超过5000万个。她说这些圆点来自她童年看到的幻觉——"一开始是桌子上的斑点在动，后来是整个房间都在旋转。现在我看见什么都想给它加个圆点。"她曾自费在纽约中央公园种了一万个真南瓜。',
    photo: '/images/guest-kusama.jpg',
  },
  {
    name: '办克斯',
    nameEn: 'Banxie',
    title: '英国匿名街头艺术家 | 当代最具争议的艺术先锋',
    bio: '1974年生于英国布里斯托尔，真实身份至今成谜。以带有政治和社会批判色彩的街头涂鸦闻名，代表作包括《气球女孩》《奴隶劳动》《垃圾桶里的爱》等。2018年其作品《气球女孩》在苏富比拍卖会上以104万英镑成交后当场自毁——画框内隐藏的碎纸机启动，将画作的下半部分切成纸条。他事后发表声明称："我没想到碎纸机会卡住，本来想全毁掉的。"',
    photo: '/images/guest-banksy.jpg',
  },
  {
    name: '杰夫·昆虫',
    nameEn: 'Jeff Insect',
    title: '美国波普艺术家 | 作品拍卖纪录保持者',
    bio: '1955年生于美国宾夕法尼亚州，是当代最成功也最具争议的艺术家之一。以不锈钢雕塑和波普风格装置闻名，代表作包括《气球狗》《兔子》《郁金香》等。2019年其作品《兔子》以9110万美元拍卖成交，创下在世艺术家最高纪录。他的作品全部由工厂代工制作，他本人只负责在合同上签字和接受采访，被批评家称为"艺术的CEO"。他反驳说："达芬奇也有助手，只不过我的助手是激光切割机。"',
    photo: '/images/guest-koons.jpg',
  },
  {
    name: '达米安·哈士奇',
    nameEn: 'Damian Husky',
    title: '英国当代艺术家 | YBA一代领袖',
    bio: '1965年生于英国布里斯托尔，是英国青年艺术家（YBA）的核心人物。以探索死亡、生命和科学主题的作品闻名，代表作包括《生者对死者无动于衷》（浸泡在福尔马林里的鲨鱼）、《献给上帝之爱》（白金钻石骷髅头，造价1400万英镑）等。1995年获特纳奖。他曾在伦敦泰晤士河畔建了一家只卖药丸的餐厅"药店"，菜单上的菜名全是处方药名，开业三个月后被卫生局查封。',
    photo: '/images/guest-hirst.jpg',
  },
  {
    name: '约瑟夫·博意思',
    nameEn: 'Joseph Beuys',
    title: '德国行为艺术家 | "人人都是艺术家"提出者',
    bio: '1921年生于德国克列夫斯，1986年去世。二战期间作为德军飞行员坠机后被鞑靼人用毛毡和脂肪救活，这段经历成为他日后创作《毛毡西装》《脂肪椅子》的灵感来源。1974年在纽约雷纳·布洛克画廊与一只土狼同居三天，作品名为《我喜欢美国，美国也喜欢我》。期间他被土狼咬了两次，但仍坚持完成了表演。他提出"人人都是艺术家"的口号，但自己的画在市场上卖到了天价，被讽刺为"人人都是艺术家，但我的作品比你的贵"。',
    photo: '/images/guest-beuys.jpg',
  },
  {
    name: '白南准·电视台',
    nameEn: 'Nam June Paik TV',
    title: '韩国录像艺术之父 | 电子高速公路预言者',
    bio: '1932年生于韩国首尔，2006年去世。从1960年代起就开始用改装电视机创作艺术，比YouTube早了40年。代表作《电视大提琴》《电子高速公路》等。他用11台改装电视做成一把大提琴，演奏时电视画面会随音符跳动，被音乐评论家评为"世界上最吵的乐器"。他在1974年就预言了互联网时代，说"将来每个人都能在家里的小屏幕上看到全世界"，但当时没人相信他，一位评论家回应说："您还是先修好那台冒烟的电视机吧。"',
    photo: '/images/guest-paik.jpg',
  },
]

interface RoundTableGuest {
  name: string
  title: string
  bio: string
}

const roundTableGuests: RoundTableGuest[] = [
  {
    name: '约翰·巴尔干萨里',
    title: '美国观念艺术教父、加州艺术学院教授',
    bio: '1931年生于美国加利福尼亚州，2010年去世。观念艺术运动的核心人物，以文字和照片拼贴作品闻名，代表作包括《我再也不做任何无聊的事了》《正在抛除多余细节的画作》等。他在1970年焚烧了自己1953至1966年间创作的所有作品，并在灰烬上烤了棉花糖，题为《向过去致敬的告别仪式》。',
  },
  {
    name: '让·杜不飞',
    title: '法国原生艺术创始人、拒绝传统美学的疯子',
    bio: '1901年生于法国勒阿弗尔，1985年去世。40岁前是葡萄酒商人，40岁后突然转行当艺术家，理由是"酒喝够了，该画点画"。他创立了"原生艺术"（Art Brut）概念，专门搜集精神病人的作品，声称"疯子比学院派更懂美"。他自己的画风粗犷原始，被当时的评论家称为"连三岁小孩都不如"，他欣然接受："三岁小孩比我自由多了。"',
  },
  {
    name: '康斯坦丁·布朗酷西',
    title: '罗马尼亚现代雕塑之父、抽象主义先驱',
    bio: '1876年生于罗马尼亚霍比察，1957年去世。从罗马尼亚农村走到巴黎艺术巅峰，用一生把雕塑从"像什么东西"变成了"就是什么东西"。代表作《空中之鸟》《吻》《无尽之柱》等。据说他花了18年打磨《空中之鸟》，从一块看起来像鸟的大理石开始，最后抛光成了一根光滑的金属弧线，重量只有16公斤。有人问他在雕什么，他回答："不是鸟在飞，是飞本身。"',
  },
  {
    name: '唐纳德·假德',
    title: '美国极简主义大师、只堆箱子的哲学家',
    bio: '1928年生于美国密苏里州，1994年去世。他将极简主义推向极致——一辈子只制作几何形状的金属盒子，但每一个盒子的尺寸、材料、堆叠方式都经过精确计算。1960年代他在纽约春街101号建造了一栋五层楼的铸铁建筑，每一层都是一个巨大的空心盒子，现在成了极简主义爱好者的朝圣地。他曾说："我不是在做雕塑，我是在做容器的灵魂。"',
  },
  {
    name: '卡尔·安德烈',
    title: '美国极简主义雕塑家、地板上的砖块诗人',
    bio: '1935年生于美国马萨诸塞州，2024年去世。他把137块耐火砖在纽约美术馆的地上摆成一个长方形，题为《等价物VIII》，在艺术界引发巨大争议——一位评论家愤怒地写道"我侄子也能做这个"，安德烈平静地回应"但你侄子没做"。他的前妻、艺术家安娜·门迭塔从他公寓34层坠楼身亡，安德烈被控谋杀但最终无罪释放，成为艺术史上最黑暗的一页。',
  },
  {
    name: '丹·弗莱文',
    title: '美国灯光装置艺术家、用荧光灯管写诗的人',
    bio: '1933年生于美国纽约，1996年去世。他用普通五金店就能买到的荧光灯管创作了改变艺术史的作品——把五颜六色的灯管安装在墙上，让它们的光在角落和空间交汇处产生微妙的色彩变化。1963年的《无题（致康斯坦丁·布朗酷西的致敬）》用了一红一蓝的灯管，评论家困惑地问"这是什么意思"，弗莱文回答"就是光而已，但这就是全部的意思"。他拒绝为作品拍照出售，说"你必须站在光里才能感受它"。',
  },
  {
    name: '罗伯特·死密森',
    title: '美国大地艺术先驱、螺旋防波堤建造者',
    bio: '1938年生于美国新泽西州，1973年因飞机失事去世，年仅34岁。他用推土机在美国犹他州大盐湖中建造了一条长达457米的螺旋形石头堤坝——《螺旋防波堤》，工程浩大却在他去世后才被大众所知。这条螺旋堤坝随着湖水水位的升降时隐时现，他说这是"entropy（熵）的视觉化"。1973年他为拍摄另一件大地艺术作品《部分掩埋的木屋》租用了一架小型飞机，飞机坠毁，他与作品一同归于大地。',
  },
  {
    name: '理查德·汉密儿吨',
    title: '英国波普艺术之父、拼贴画革命发起者',
    bio: '1922年生于英国伦敦，2011年去世。1956年创作了一幅小小的拼贴画《究竟是什么让今天的家如此不同，如此迷人？》，画中一个肌肉发达的裸体男子手持一根巨大的棒棒糖，身后是拥挤的客厅——这幅作品被公认为波普艺术的开山之作，题目比画作还要长。他把"波普艺术"这个词从电线杆广告上摘下来，贴进了艺术史。晚年他痴迷于电脑绘画，声称"Photoshop是21世纪的剪刀和浆糊"。',
  },
  {
    name: '罗恩·英格力',
    title: '美国波普艺术大师、麦当劳叔叔的整容医生',
    bio: '1959年生于美国德克萨斯州。以挪用和改造商业标志、卡通人物形象的绘画闻名，代表作包括给麦当劳叔叔整容成骷髅、给米老鼠加上第三只眼等。他认为"广告比圣经更有影响力"。他曾在纽约时代广场租了一块 billboard，把可口可乐的标志改成了"Cocaine Cola"，结果只挂了两天就被可口可乐公司的律师团强行撤下。',
  },
  {
    name: '基思·哈零',
    title: '美国街头艺术先驱、Radiant Baby的创造者',
    bio: '1958年生于美国宾夕法尼亚州，1990年因艾滋病去世，年仅31岁。1980年代他在纽约地铁站的空白广告牌上用白色粉笔涂鸦，创造了标志性的"发光婴儿"（Radiant Baby）——一个四肢发光的爬行婴儿。他说这个婴儿代表"生命的纯真与潜能"。1986年他在柏林墙东德一侧绘制了一幅长达300米的壁画，画了两个试图拥抱对方的人，但中间隔着一堵墙——两年后墙倒了，他开玩笑说是自己画的功劳。',
  },
]

/* Guest avatar row for section header */
function GuestAvatarRow({ guests }: { guests: Guest[] }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {guests.map((guest) => (
        <div key={guest.name} className="flex flex-col items-center" style={{ width: '72px' }}>
          <div
            className="rounded-full overflow-hidden mb-2"
            style={{ width: '60px', height: '60px', border: '1px solid #e0e0e0' }}
          >
            <img
              src={guest.photo}
              alt={guest.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
              }}
            />
          </div>
          <p
            className="text-center w-full truncate"
            style={{ fontSize: '10px', color: '#888888', lineHeight: 1.3 }}
          >
            {guest.name}
          </p>
        </div>
      ))}
    </div>
  )
}

function GuestItem({ guest, index }: { guest: Guest; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="py-6 transition-all duration-700"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="guest-divider mb-6" />
      <div className="flex gap-5 items-start">
        <div
          className="rounded-full overflow-hidden flex-shrink-0"
          style={{ width: '56px', height: '56px', border: '1px solid #e8e8e8' }}
        >
          <img
            src={guest.photo}
            alt={guest.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold" style={{ fontSize: '20px', color: '#1a1a1a', letterSpacing: '0.02em' }}>
            {guest.name}
            {guest.nameEn && (
              <span style={{ color: '#888888', fontWeight: 400, fontSize: '13px', marginLeft: '6px' }}>
                {guest.nameEn}
              </span>
            )}
          </h3>
          <p className="mt-1" style={{ fontSize: '12px', color: '#888888' }}>{guest.title}</p>
        </div>
      </div>
      <p className="mt-3" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.8 }}>
        {guest.bio}
      </p>
    </div>
  )
}

/* Round table guest item */
function RoundTableItem({ guest, index }: { guest: RoundTableGuest; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      ref={ref}
      className="py-4 transition-all duration-700"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 60}ms`,
      }}
    >
      <div className="guest-divider mb-4" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a' }}>
            {guest.name}
          </h4>
          <p className="mt-1" style={{ fontSize: '11px', color: '#888888' }}>{guest.title}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0 text-xs transition-colors hover:text-[#1a1a1a]"
          style={{ color: '#888888', fontSize: '11px' }}
        >
          {expanded ? '收起' : '展开'}
        </button>
      </div>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: expanded ? '500px' : '0',
          opacity: expanded ? 1 : 0,
        }}
      >
        <p className="mt-3" style={{ fontSize: '12px', color: '#1a1a1a', lineHeight: 1.8 }}>
          {guest.bio}
        </p>
      </div>
    </div>
  )
}

export function GuestsSection() {
  const { ref: headerRef, inView: headerVisible } = useInView<HTMLDivElement>()

  return (
    <section id="guests" className="w-full px-6" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="mx-auto max-w-2xl">
        <div
          ref={headerRef}
          className="transition-all duration-800"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="section-divider mb-12" />
          <h2 className="work-unit-title mb-4">特邀嘉宾</h2>
        </div>

        {/* Opening Guests with avatars */}
        <div className="mt-8">
          <GuestAvatarRow guests={openingGuests} />
          <h3 className="font-semibold mb-4" style={{ fontSize: '14px', color: '#1a1a1a' }}>
            开幕式致辞嘉宾
          </h3>
          {openingGuests.map((g, i) => (
            <GuestItem key={g.name} guest={g} index={i} />
          ))}
        </div>

        {/* Seminar Guests with avatars */}
        <div className="mt-12">
          <GuestAvatarRow guests={seminarGuests} />
          <h3 className="font-semibold mb-4" style={{ fontSize: '14px', color: '#1a1a1a' }}>
            学术研讨会主讲嘉宾
          </h3>
          {seminarGuests.map((g, i) => (
            <GuestItem key={g.name} guest={g} index={i} />
          ))}
        </div>

        <div className="mt-12">
          <h3 className="font-semibold mb-4" style={{ fontSize: '14px', color: '#1a1a1a' }}>
            研讨会圆桌嘉宾
          </h3>
          <p className="caption-text mb-4">点击"展开"查看嘉宾详细介绍</p>
          {roundTableGuests.map((g, i) => (
            <RoundTableItem key={g.name} guest={g} index={i} />
          ))}
        </div>

        <p className="caption-text mt-8">以上嘉宾均未收到邀请。未拒绝即视为同意参展。</p>
      </div>
    </section>
  )
}

/* ============ Schedule ============ */
export function ScheduleSection() {
  const { ref, inView } = useInView<HTMLElement>()
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <section
      id="schedule"
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
        <h2 className="work-unit-title mb-10">展览日程</h2>

        <div
          className="relative inline-block cursor-pointer overflow-hidden"
          onClick={() => setFullscreen(true)}
        >
          <img
            src="/images/schedule-poster.jpg"
            alt="展览日程海报"
            className="max-w-full transition-transform duration-500"
            style={{ maxHeight: '70vh' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>

        <p className="caption-text mt-6">以上日程均不会发生。</p>
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999 }}
          onClick={() => setFullscreen(false)}
        >
          <img
            src="/images/schedule-poster.jpg"
            alt="展览日程海报"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  )
}
