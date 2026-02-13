
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons (Custom SVG Paths) ---
const Icons = {
  Map: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.446l-5.552-2.776a.75.75 0 00-.67 0l-5.552 2.776a.75.75 0 01-1.1-.67V4.737c0-.39.242-.74.603-.89l5.552-2.776a.75.75 0 01.67 0l5.552 2.776c.361.15.603.5.603.89v12.023a.75.75 0 01-1.1.67z" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  Tool: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.797.939a4.103 4.103 0 011.214.7a.825.825 0 001.011-.026l.66-.547c.438-.362 1.076-.316 1.458.106l.773.856c.381.422.345 1.085-.083 1.462l-.647.57a.825.825 0 00-.227 1.019c.174.402.298.825.367 1.265.067.428.406.76.832.83l.898.147c.54.088.937.556.937 1.107v1.093c0 .55-.397 1.02-.937 1.107l-.898.147a.825.825 0 00-.832.83 4.1 4.1 0 01-.367 1.265.825.825 0 00.227 1.02l.647.569c.428.377.464 1.04.083 1.462l-.773.856c-.382.422-1.02.468-1.458.106l-.66-.547a.825.825 0 00-1.011.026 4.103 4.103 0 01-1.214.7a.825.825 0 00-.797.939l-.149.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.148-.894a.825.825 0 00-.797-.939 4.107 4.107 0 01-1.214-.7.825.825 0 00-1.011.026l-.66.547c-.438.362-1.076.316-1.458-.106l-.773-.856c-.381-.422-.345-1.085.083-1.462l.647-.57a.825.825 0 00.227-1.019 4.108 4.108 0 01-.367-1.265.825.825 0 00-.832-.83l-.898-.147c-.54-.088-.937-.556-.937-1.107v-1.093c0-.55.397-1.02.937-1.107l.898-.147a.825.825 0 00.832-.83 4.109 4.109 0 01.367-1.265.825.825 0 00-.227-1.02l-.647-.569c-.428-.377-.464-1.04-.083-1.462l.773-.856c.382-.422 1.02-.468 1.458-.106l.66.547a.825.825 0 001.011-.026c.37-.263.777-.499 1.214-.7.413-.175.727-.515.797-.939l.148-.894z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Cloud: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  Currency: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  Car: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.091-1.124l-.208-3.33a5.125 5.125 0 00-4.732-4.816L17.25 4.875A1.125 1.125 0 0016.125 3.75h-2.25m-3 0H6.75A2.25 2.25 0 004.5 6v1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.34 12m-4.77 0L9.3 9m16.5 6a2.25 2.25 0 00-2.25-2.25H15M9 6h12m1.5 0h-3.75v-.75c0-1.242-1.008-2.25-2.25-2.25h-4.5c-1.242 0-2.25 1.008-2.25 2.25V6H9m1.5 0h9" />
    </svg>
  ),
  Chef: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  Export: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  )
};

const Tag = ({ text }: { text: string; key?: React.Key }) => (
  <span className="inline-block px-2 py-0.5 mr-2 mb-1 text-[10px] font-bold tracking-wider text-stone-400 bg-stone-50 rounded border border-stone-100 uppercase">
    {text}
  </span>
);

const TransportInfo = ({ info }: { info: { type: string, time: string, desc: string } }) => (
  <div className="mt-4 flex items-start space-x-2 p-3 bg-stone-50 rounded-xl border border-stone-100/50">
    <div className="text-stone-400 mt-0.5"><Icons.Car /></div>
    <div className="flex-1">
      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">下一站交通導引</p>
      <p className="text-[11px] text-stone-600 font-medium">
        <span className="text-stone-900 font-bold">[{info.type}]</span> {info.desc} 
        <span className="ml-2 text-stone-400">預計 {info.time}</span>
      </p>
    </div>
  </div>
);

const DEFAULT_ITINERARY = [
  {
    day: 1, date: '3/3 (Tue)', notes: '西面商圈：釜山中心購物與美食盛宴。', spots: [
      { id: '1-1', time: '10:00', title: '金海國際機場 (PUS)', tags: ['抵達'], budget: 0, intro: '釜山的門戶。建議先在此購買 T-Money 卡。', image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '輕軌', time: '45min', desc: '搭乘輕軌至沙上站轉地鐵2號線。' } },
      { id: '1-2', time: '11:30', title: '西面酒店 Check-in', tags: ['下榻'], budget: 0, intro: '入住 SOTA Suites。西面是交通樞紐，也是美食一級戰區。', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '步行', time: '5min', desc: '沿購物街步行。' } },
      { id: '1-3', time: '13:00', title: '松亭 3 代豬肉湯飯', tags: ['必吃美食', '餐廳'], budget: 12000, intro: '午餐首選：擁有70年歷史的靈魂湯飯。推薦加點一份白切肉盤。', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '步行', time: '10min', desc: '穿越地下商街直達百貨。' } },
      { id: '1-4', time: '15:30', title: '樂天百貨 (西面總店)', tags: ['購物', '免稅'], budget: 50000, intro: '西面地標。推薦逛逛B1的流行品牌與9-12樓的免稅店。', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '步行', time: '8min', desc: '往田浦方向前行。' } },
      { id: '1-5', time: '19:00', title: '味贊王鹽烤肉', tags: ['必吃烤肉', '晚餐'], budget: 35000, intro: '晚餐推薦：釜山最強厚切烤五花肉。肉汁飽滿，配上沾醬絕佳。', image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9481b2b?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    day: 2, date: '3/4 (Wed)', notes: '影島與南浦區：海女文化、海洋步道與海港百貨。', spots: [
      { id: '2-0', time: '09:00', title: '酒店出發', tags: ['起程'], budget: 0, intro: '從西面酒店出發，準備前往影島。', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '地鐵/公車', time: '35min', desc: '地鐵1號線至南浦站轉搭公車往影島。' } },
      { id: '2-1', time: '10:00', title: '影島海女村', tags: ['海女文化', '在地推薦'], budget: 35000, intro: '在岸邊品嚐海女現撈海產。海膽、海螺配上冷麵，是影島的極致體驗。', image: 'https://images.unsplash.com/photo-1547917724-f3b14630e87b?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '公車', time: '15min', desc: '搭乘影島5號小巴往白淺灘。' } },
      { id: '2-2', time: '13:00', title: '白淺灘文化村', tags: ['風景', '咖啡'], budget: 15000, intro: '釜山的聖托里尼。沿海小徑有許多特色咖啡廳，適合發呆賞海。', image: 'https://images.unsplash.com/photo-1590664095641-7fa05f689813?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '計程車', time: '12min', desc: '跨過影島大橋前往樂天光復。' } },
      { id: '2-3', time: '15:30', title: '樂天百貨 (光復店)', tags: ['噴泉', '觀景'], budget: 10000, intro: '觀賞世界最大室內音樂噴泉。頂樓展望台可看見釜山塔。', image: 'https://images.unsplash.com/photo-1528666504543-85579979b08d?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '步行', time: '10min', desc: '前往南浦洞商圈。' } },
      { id: '2-4', time: '18:30', title: '白花牛小腸', tags: ['老字號', '晚餐'], budget: 45000, intro: '釜山美食必修課：炭烤牛小腸，香氣撲鼻，口感爽脆。', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '地鐵', time: '15min', desc: '回西面站。' } },
      { id: '2-5', time: '21:00', title: '返回酒店', tags: ['休息'], budget: 0, intro: '結束豐富的海港行程。', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    day: 3, date: '3/5 (Thu)', notes: '東釜山大樂園：海景佛寺與海濱火車。', spots: [
      { id: '3-0', time: '09:00', title: '酒店出發', tags: ['起程'], budget: 0, intro: '展開東釜山的海濱之旅。', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '計程車', time: '40min', desc: '建議搭乘計程車直達，節省轉乘時間。' } },
      { id: '3-1', time: '10:30', title: '海東龍宮寺', tags: ['奇觀'], budget: 5000, intro: '建立在海邊岩礁上的千年古寺，景觀壯麗非凡。', image: 'https://images.unsplash.com/photo-1548115184-bc65ee97b616?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '計程車', time: '8min', desc: '前往樂天樂園。' } },
      { id: '3-2', time: '12:30', title: '釜山樂天世界', tags: ['樂園'], budget: 55000, intro: '2022年全新開幕。刺激設施齊全，適合拍照與探險。', image: 'https://images.unsplash.com/photo-1513889959040-6bd417c6ca52?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '計程車', time: '15min', desc: '前往尾浦站。' } },
      { id: '3-3', time: '16:30', title: '海雲台天空膠囊', tags: ['美拍'], budget: 35000, intro: '搭乘可愛的膠囊火車，捕捉海濱夕陽美景。', image: 'https://images.unsplash.com/photo-1578135322046-e6660e5c6cd1?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '步行/公車', time: '10min', desc: '往青沙浦烤貝街。' } },
      { id: '3-4', time: '18:30', title: '青沙浦秀民家烤貝', tags: ['海鮮', '晚餐'], budget: 40000, intro: '在海邊品嚐現烤扇貝，奶油起司味香醇濃厚。', image: 'https://images.unsplash.com/photo-1544654803-b69140b285a1?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '計程車', time: '20min', desc: '回 Centum City。' } },
      { id: '3-5', time: '21:00', title: 'Spa Land (Centum City)', tags: ['極致放鬆'], budget: 22000, intro: '五星級汗蒸幕，消解三天的疲勞。', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '地鐵', time: '15min', desc: '地鐵2號線回西面。' } },
      { id: '3-6', time: '23:00', title: '返回酒店', tags: ['休息'], budget: 0, intro: '晚安，釜山。', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    day: 4, date: '3/6 (Fri)', notes: '廣安里慢活與歸途。', spots: [
      { id: '4-1', time: '10:00', title: '廣安里海水浴場', tags: ['海景', '休閒'], budget: 15000, intro: '對著廣安大橋吃頓早午餐，享受釜山海風。', image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '地鐵', time: '15min', desc: '回西面拿行李。' } },
      { id: '4-2', time: '13:00', title: '田浦咖啡街', tags: ['文青'], budget: 15000, intro: '最後的選物與下午茶時間。', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800', nextTransport: { type: '輕軌', time: '40min', desc: '前往機場。' } },
      { id: '4-3', time: '16:00', title: '金海國際機場', tags: ['歸途'], budget: 0, intro: '帶回滿滿的回憶，下次見！', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];

const App = () => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'tools' | 'weather' | 'food'>('itinerary');
  const [selectedDay, setSelectedDay] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [hkdRate, setHkdRate] = useState<number>(0.0057);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedItin = localStorage.getItem('busan_itinerary_v8');
    const savedExp = localStorage.getItem('busan_expenses_v8');
    setItinerary(savedItin ? JSON.parse(savedItin) : DEFAULT_ITINERARY);
    setExpenses(savedExp ? JSON.parse(savedExp) : []);
    
    fetch('https://api.exchangerate-api.com/v4/latest/KRW')
      .then(res => res.json())
      .then(data => data.rates?.HKD && setHkdRate(data.rates.HKD))
      .catch(console.error);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('busan_itinerary_v8', JSON.stringify(itinerary));
      localStorage.setItem('busan_expenses_v8', JSON.stringify(expenses));
    }
  }, [itinerary, expenses, isLoaded]);

  const currentDayData = useMemo(() => itinerary.find(d => d.day === selectedDay), [itinerary, selectedDay]);

  const updateSpot = (dayNum: number, spotId: string, field: string, value: any) => {
    setItinerary(prev => prev.map(d => d.day === dayNum ? { ...d, spots: d.spots.map((s: any) => s.id === spotId ? { ...s, [field]: value } : s) } : d));
  };

  const deleteSpot = (dayNum: number, spotId: string) => {
    if (!confirm('確定刪除？')) return;
    setItinerary(prev => prev.map(d => d.day === dayNum ? { ...d, spots: d.spots.filter((s: any) => s.id !== spotId) } : d));
  };

  const addSpot = (dayNum: number) => {
    const newSpot = { id: Date.now().toString(), time: '12:00', title: '新景點', tags: ['自訂'], budget: 0, intro: '描述內容...', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800' };
    setItinerary(prev => prev.map(d => d.day === dayNum ? { ...d, spots: [...d.spots, newSpot] } : d));
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col bg-[#FDFCF8] print:bg-white print:max-w-none">
      <header className="px-6 pt-12 pb-6 flex justify-between items-start print:hidden z-50">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Busan Experience 4D4N</p>
          <h1 className="serif text-4xl font-bold text-stone-900 mt-1 tracking-tight">釜山案內</h1>
        </div>
        <div className="flex space-x-2">
          {activeTab === 'itinerary' && (
            <button onClick={() => setIsEditMode(!isEditMode)} className={`p-2 rounded-full border transition-all ${isEditMode ? 'bg-stone-900 text-white' : 'bg-white text-stone-400 border-stone-100'}`}>
              <Icons.Edit />
            </button>
          )}
          <button onClick={() => window.print()} className="p-2 rounded-full border border-stone-100 bg-white text-stone-400"><Icons.Export /></button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        {activeTab === 'itinerary' && (
          <div className="px-6 animate-in fade-in">
            <div className="sticky top-0 bg-[#FDFCF8]/95 backdrop-blur-md py-4 z-[60] mb-4 print:hidden border-b border-stone-50/50">
              <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
                {itinerary.map((d) => (
                  <button 
                    key={d.day} 
                    onClick={() => setSelectedDay(d.day)} 
                    className={`flex-shrink-0 px-6 py-4 rounded-2xl transition-all border ${selectedDay === d.day ? 'bg-stone-900 text-white border-stone-900 shadow-xl scale-105' : 'bg-white text-stone-400 border-stone-100 shadow-sm'}`}
                  >
                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Day 0{d.day}</p>
                    <p className="text-sm serif font-bold">{d.date}</p>
                  </button>
                ))}
              </div>
            </div>

            {!currentDayData ? (
              <div className="p-10 text-center bg-stone-100 rounded-3xl border border-stone-200">
                <div className="flex justify-center mb-4 text-stone-300"><Icons.Info /></div>
                <h3 className="serif text-xl font-bold text-stone-800 mb-2">數據載入錯誤</h3>
                <p className="text-sm text-stone-500">無法獲取本日資訊，請重新整理。</p>
              </div>
            ) : (
              <>
                <div className="bg-stone-50 rounded-2xl p-5 mb-8 border border-stone-100 print:hidden shadow-sm">
                  <span className="text-[10px] font-bold text-stone-300 uppercase block mb-1">區域攻略與指引</span>
                  {isEditMode ? (
                    <textarea value={currentDayData.notes} onChange={(e) => setItinerary(itinerary.map(d => d.day === selectedDay ? { ...d, notes: e.target.value } : d))} className="w-full text-sm bg-white border border-stone-100 rounded-xl p-3 focus:outline-none" rows={2} />
                  ) : (
                    <p className="text-sm text-stone-500 italic leading-relaxed">{currentDayData.notes}</p>
                  )}
                </div>

                <div className="space-y-8">
                  {currentDayData.spots.map((spot: any) => (
                    <div key={spot.id} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden print:shadow-none">
                      <div className="h-56 w-full relative print:hidden">
                        <img src={spot.image} className="w-full h-full object-cover" alt={spot.title} />
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm">{spot.time}</div>
                      </div>
                      <div className="p-6">
                        {isEditMode ? (
                          <div className="space-y-4">
                            <input value={spot.title} onChange={(e) => updateSpot(selectedDay, spot.id, 'title', e.target.value)} className="serif text-xl font-bold w-full border-b outline-none" />
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-stone-300">₩</span>
                              <input type="number" value={spot.budget} onChange={(e) => updateSpot(selectedDay, spot.id, 'budget', e.target.value)} className="w-full text-sm border-b outline-none" />
                            </div>
                            <button onClick={() => deleteSpot(selectedDay, spot.id)} className="text-rose-400 text-[10px] font-bold uppercase tracking-widest flex items-center"><Icons.Trash /><span className="ml-1">移除行程</span></button>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="serif text-2xl font-bold text-stone-800 tracking-tight">{spot.title}</h3>
                              <span className="text-xs font-bold text-stone-300">₩{Number(spot.budget).toLocaleString()}</span>
                            </div>
                            <div className="flex flex-wrap mb-4">{spot.tags.map((t: string) => <Tag key={t} text={t} />)}</div>
                            <p className="text-sm text-stone-600 leading-relaxed font-light">{spot.intro}</p>
                            
                            {spot.nextTransport && <TransportInfo info={spot.nextTransport} />}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {isEditMode && (
                    <button onClick={() => addSpot(selectedDay)} className="w-full py-10 border-2 border-dashed border-stone-200 rounded-3xl text-stone-400 flex flex-col items-center justify-center hover:bg-stone-50 transition-all">
                      <Icons.Plus /><span className="text-[10px] font-bold mt-2 uppercase tracking-widest">新增景點</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'weather' && <WeatherTab />}
        {activeTab === 'tools' && <ToolsTab hkdRate={hkdRate} expenses={expenses} setExpenses={setExpenses} itinerary={itinerary} />}
        {activeTab === 'food' && <FoodTab />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-stone-100 px-2 pt-4 pb-8 tab-bar-safe z-50 print:hidden">
        <div className="max-w-md mx-auto flex justify-between items-center px-4">
          <button onClick={() => setActiveTab('itinerary')} className={`flex flex-col items-center space-y-1.5 flex-1 ${activeTab === 'itinerary' ? 'text-stone-900' : 'text-stone-300'}`}>
            <Icons.Calendar /><span className="text-[9px] font-bold uppercase tracking-widest">行程</span>
          </button>
          <button onClick={() => setActiveTab('food')} className={`flex flex-col items-center space-y-1.5 flex-1 ${activeTab === 'food' ? 'text-stone-900' : 'text-stone-300'}`}>
            <Icons.Chef /><span className="text-[9px] font-bold uppercase tracking-widest">美食</span>
          </button>
          <button onClick={() => setActiveTab('weather')} className={`flex flex-col items-center space-y-1.5 flex-1 ${activeTab === 'weather' ? 'text-stone-900' : 'text-stone-300'}`}>
            <Icons.Cloud /><span className="text-[9px] font-bold uppercase tracking-widest">氣象</span>
          </button>
          <button onClick={() => setActiveTab('tools')} className={`flex flex-col items-center space-y-1.5 flex-1 ${activeTab === 'tools' ? 'text-stone-900' : 'text-stone-300'}`}>
            <Icons.Tool /><span className="text-[9px] font-bold uppercase tracking-widest">工具</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

const FoodTab = () => {
  const recommendations = [
    { area: '西面 Seomyeon', name: '味贊王鹽烤肉', type: '韓式烤肉', desc: '釜山最具人氣烤肉，厚切五花肉配上鹽巴調味極佳。', tag: '必吃' },
    { area: '西面 Seomyeon', name: '松亭3代豬肉湯飯', type: '釜山靈魂', desc: '70年歷史，湯頭濃郁，韭菜與蝦醬是美味靈魂。', tag: '老字號' },
    { area: '影島 Yeongdo', name: '海女村', type: '海鮮/海膽', desc: '影島岸邊享用海女現捕海味，推薦海膽配白麵。', tag: '在地' },
    { area: '南浦洞 Nampo', name: '白花牛小腸', type: '烤小腸', desc: '南浦洞傳統小腸街之首，炭火香氣十足。', tag: '隱藏版' },
    { area: '青沙浦 Cheongsapo', name: '秀民家烤貝', type: '海景烤貝', desc: '釜山經典烤海鮮，配上起司碎末風味絕倫。', tag: '浪漫' },
    { area: '廣安里 Gwanganli', name: 'Eonyang Bulgeogi', type: '彥陽燒肉', desc: '大橋第一排美景，享用釜山特色的切碎燒肉。', tag: '海景' }
  ];

  return (
    <div className="px-6 py-4 animate-in fade-in">
      <h2 className="serif text-3xl font-bold mb-8 tracking-tight">釜山美食地圖</h2>
      <div className="space-y-6">
        {recommendations.map((food, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Icons.Chef /></div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">{food.area}</p>
              <span className="text-[9px] font-bold bg-stone-900 text-white px-2 py-0.5 rounded-full uppercase">{food.tag}</span>
            </div>
            <h3 className="serif text-xl font-bold text-stone-800 mb-1">{food.name}</h3>
            <p className="text-[11px] font-bold text-stone-400 mb-3">{food.type}</p>
            <p className="text-sm text-stone-500 font-light leading-relaxed">{food.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeatherTab = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35.1796&longitude=129.0756&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto')
      .then(res => res.json()).then(setData);
  }, []);
  if (!data) return <div className="p-20 text-center serif text-stone-300 animate-pulse">連線氣象衛星中...</div>;
  return (
    <div className="px-6 py-4 animate-in fade-in">
      <h2 className="serif text-3xl font-bold mb-8 tracking-tight">釜山即時氣候</h2>
      <div className="bg-stone-900 text-white rounded-[2rem] p-10 text-center mb-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10"><Icons.Cloud /></div>
        <p className="text-8xl font-light mb-4 tracking-tighter">{Math.round(data.current.temperature_2m)}°</p>
        <p className="text-xs font-bold opacity-40 uppercase tracking-[0.4em]">Current Status</p>
      </div>
      <div className="space-y-4">
        {data.daily.time.slice(0, 5).map((t: string, i: number) => (
          <div key={t} className="flex justify-between items-center p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
            <span className="text-xs font-bold text-stone-400">{t.split('-').slice(1).join('/')}</span>
            <div className="flex items-center space-x-6">
              <span className="text-sm font-bold text-stone-800">{Math.round(data.daily.temperature_2m_max[i])}°</span>
              <span className="text-sm font-medium text-stone-200">{Math.round(data.daily.temperature_2m_min[i])}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ToolsTab = ({ hkdRate, expenses, setExpenses, itinerary }: any) => {
  const [wonInput, setWonInput] = useState<string>('');
  const [notifPermission, setNotifPermission] = useState<string>(Notification.permission);
  const flightInfo = { out: '釜山航空 BX382 (06:20)', in: '釜山航空 BX381 (22:00)' };
  const accommodation = { name: 'SOTA Suites Busan', tel: '+82 51-123-4567', addr: '釜山地鐵西面站步行10分鐘' };

  const requestNotification = () => {
    Notification.requestPermission().then(setNotifPermission);
  };

  const testNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('釜山案內：提醒您', {
        body: '下一個行程即將開始，請準時出發！',
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0iIzI5MkQyRCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI1NiIgZmlsbD0iI0ZERkNGOCIgZHk9Ii4zNWVtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2VyaWYiPui釜PC90ZXh0Pjwvc3ZnPg=='
      });
    } else {
      alert('請先開啟通知權限');
    }
  };

  return (
    <div className="px-6 py-4 animate-in fade-in pb-20">
      <h2 className="serif text-3xl font-bold mb-8 tracking-tight">旅途工具箱</h2>
      
      {/* PWA & Notif */}
      <section className="mb-10">
        <div className="flex items-center space-x-2 mb-4 text-stone-400">
          <Icons.Bell /><h3 className="text-xs font-bold uppercase tracking-widest">PWA 功能管理</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-stone-100 space-y-4 shadow-sm">
          <p className="text-xs text-stone-500 leading-relaxed">
            開啟通知後，我們將在行程點開始前發送提醒。
          </p>
          <div className="flex space-x-2">
            {notifPermission !== 'granted' ? (
              <button onClick={requestNotification} className="flex-1 py-3 bg-stone-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">開啟通知權限</button>
            ) : (
              <button onClick={testNotification} className="flex-1 py-3 border border-stone-200 text-stone-800 rounded-xl text-[10px] font-bold uppercase tracking-widest">測試行程通知</button>
            )}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center space-x-2 mb-4 text-stone-400">
          <Icons.Info /><h3 className="text-xs font-bold uppercase tracking-widest">航班與住宿</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-stone-100 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div><p className="text-[10px] font-bold text-stone-300 uppercase mb-1">去程</p><p className="text-xs font-bold text-stone-800 serif">{flightInfo.out}</p></div>
            <div className="text-right"><p className="text-[10px] font-bold text-stone-300 uppercase mb-1">回程</p><p className="text-xs font-bold text-stone-800 serif">{flightInfo.in}</p></div>
          </div>
          <div className="pt-6 border-t border-stone-50">
            <p className="text-[10px] font-bold text-stone-300 uppercase mb-1">下榻點</p>
            <p className="text-sm font-bold text-stone-800 serif">{accommodation.name}</p>
            <p className="text-[10px] text-stone-400">{accommodation.addr}</p>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <div className="flex items-center space-x-2 mb-4 text-stone-400">
          <Icons.Currency /><h3 className="text-xs font-bold uppercase tracking-widest">實時換算</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
          <div className="relative mb-4">
            <input 
              type="number" 
              value={wonInput}
              onChange={(e) => setWonInput(e.target.value)}
              placeholder="輸入韓元" 
              className="w-full pl-10 pr-4 py-5 bg-stone-50 border border-stone-100 rounded-2xl text-xl serif outline-none focus:ring-1 focus:ring-stone-200 transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 text-xl font-bold">₩</span>
          </div>
          <div className="text-center py-5 bg-stone-900 rounded-2xl shadow-lg">
            <p className="text-white text-2xl font-bold serif">≈ HKD ${(parseFloat(wonInput || '0') * hkdRate).toFixed(2)}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center space-x-2 mb-4 text-stone-400">
          <Icons.Plus /><h3 className="text-xs font-bold uppercase tracking-widest">支出記錄</h3>
        </div>
        <div className="bg-stone-50 p-6 rounded-3xl mb-6 border border-stone-100">
          <div className="flex justify-between items-end">
            <h4 className="serif text-4xl font-bold">₩{expenses.reduce((a:any,c:any) => a+Number(c.won), 0).toLocaleString()}</h4>
            <span className="text-sm font-medium text-stone-400">≈ ${(expenses.reduce((a:any,c:any) => a+Number(c.won), 0) * hkdRate).toFixed(1)} HKD</span>
          </div>
        </div>
        
        <form className="bg-white p-4 rounded-3xl border border-stone-100 flex space-x-2 mb-6 shadow-sm" onSubmit={(e:any) => {
          e.preventDefault();
          const item = e.target.item.value;
          const won = e.target.won.value;
          if(!item || !won) return;
          setExpenses([{ id: Date.now(), item, won }, ...expenses]);
          e.target.reset();
        }}>
          <input name="item" placeholder="品項" className="flex-1 text-xs bg-stone-50 p-4 rounded-2xl outline-none" required />
          <input name="won" type="number" placeholder="₩" className="w-24 text-xs bg-stone-50 p-4 rounded-2xl outline-none" required />
          <button className="bg-stone-900 text-white p-4 rounded-2xl transition-transform hover:scale-95"><Icons.Plus /></button>
        </form>

        <div className="space-y-3">
          {expenses.map((ex:any) => (
            <div key={ex.id} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-stone-50">
              <div><p className="text-xs font-bold text-stone-800">{ex.item}</p><p className="text-[10px] text-stone-300">${(ex.won * hkdRate).toFixed(1)} HKD</p></div>
              <div className="flex items-center space-x-4"><span className="text-sm font-bold text-stone-900 serif">₩{Number(ex.won).toLocaleString()}</span><button onClick={() => setExpenses(expenses.filter((e:any) => e.id !== ex.id))} className="text-stone-100 hover:text-rose-400 transition-colors"><Icons.Trash /></button></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- Error Boundary ---
interface ErrorBoundaryProps { children?: React.ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  constructor(props: ErrorBoundaryProps) { super(props); }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center bg-[#FDFCF8]">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-400 mb-8 animate-pulse"><Icons.Info /></div>
          <h2 className="serif text-3xl font-bold text-stone-800 mb-4 tracking-tight">系統異常</h2>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="px-10 py-4 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl">重置數據</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) createRoot(rootElement).render(<ErrorBoundary><App /></ErrorBoundary>);
