import { useMemo, useState } from 'react';
import './App.css';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80';

const FLOWERS = [
  {
    name: '장미',
    meaning: '사랑과 열정',
    color: '빨강',
    season: '봄',
    description: '왕관처럼 화려한 꽃잎이 사랑의 고백을 대신해 주는 대표적인 꽃.',
    image: '/flowers/rose.jpg', // 예시 경로. public/flowers/rose.jpg 추가 후 교체
  },
  {
    name: '해바라기',
    meaning: '변치 않는 마음',
    color: '노랑',
    season: '여름',
    description: '태양을 따라 고개를 돌리는 모습처럼 한 사람만 바라보는 마음을 상징.',
    image: '/flowers/sunflower.jpg',
  },
  {
    name: '라일락',
    meaning: '첫사랑의 설렘',
    color: '연보라',
    season: '봄',
    description: '은은한 향기와 함께 첫사랑의 아련함을 전하는 꽃.',
    image: '/flowers/lilac.jpg',
  },
  {
    name: '수국',
    meaning: '진심과 감사',
    color: '블루',
    season: '여름',
    description: '비 오는 날 더욱 빛나는 수국은 마음 속 깊은 진심을 드러낸다.',
    image: '/flowers/hydrangea.jpg',
  },
  {
    name: '국화',
    meaning: '진실과 고결',
    color: '흰색',
    season: '가을',
    description: '단아한 자태로 오랜 시간 사랑받아 온 가을의 상징.',
    image: '/flowers/chrysanthemum.jpg',
  },
  {
    name: '튤립',
    meaning: '사랑의 고백',
    color: '다양',
    season: '봄',
    description: '색깔마다 다른 꽃말로 마음을 섬세하게 전달할 수 있다.',
    image: '/flowers/tulip.jpg',
  },
  {
    name: '카멜리아',
    meaning: '겸손한 아름다움',
    color: '선홍',
    season: '겨울',
    description: '서늘한 계절에도 붉게 피어나는 강인함을 닮은 꽃.',
    image: '/flowers/camellia.jpg',
  },
  {
    name: '라벤더',
    meaning: '침착과 평온',
    color: '보라',
    season: '여름',
    description: '향기만으로도 마음을 다독여 주는 힐링 식물의 대표.',
    image: '/flowers/lavender.jpg',
  },
  {
    name: '안개꽃',
    meaning: '변치 않는 사랑',
    color: '흰색',
    season: '사계절',
    description: '메인 꽃을 더욱 돋보이게 해 주는 조연이지만, 그 자체로도 순수함을 담고 있다.',
    image: '/flowers/babysbreath.jpg',
  },
  {
    name: '데이지',
    meaning: '희망과 순수',
    color: '흰색',
    season: '봄',
    description: '햇살처럼 밝은 꽃이 전하는 긍정의 메시지.',
    image: '/flowers/daisy.jpg',
  },
];

const seasons = ['전체', '봄', '여름', '가을', '겨울', '사계절'];

function App() {
  const [query, setQuery] = useState('');
  const [season, setSeason] = useState('전체');

  const filteredFlowers = useMemo(() => {
    return FLOWERS.filter((flower) => {
      const matchQuery =
        flower.name.includes(query) ||
        flower.meaning.includes(query) ||
        flower.description.includes(query);
      const matchSeason = season === '전체' ? true : flower.season === season;
      return matchQuery && matchSeason;
    });
  }, [season, query]);

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">Floriography</p>
        <h1>꽃말 사전</h1>
        <p className="subtitle">
          마음을 대신 전해 줄 꽃말을 찾아보세요. 이름, 색, 계절로 빠르게 검색할 수 있어요.
        </p>
      </header>

      <section className="panel controls">
        <div className="control">
          <label htmlFor="query">키워드 검색</label>
          <input
            id="query"
            type="text"
            value={query}
            placeholder="예: 사랑, 희망, 장미..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="control">
          <label htmlFor="season">계절</label>
          <select
            id="season"
            value={season}
            onChange={(event) => setSeason(event.target.value)}
          >
            {seasons.map((seasonOption) => (
              <option key={seasonOption} value={seasonOption}>
                {seasonOption}
              </option>
            ))}
          </select>
        </div>

        <div className="hint">
          검색어는 이름, 꽃말, 설명에 모두 적용돼요. 두 글자만 입력해도 충분해요.
        </div>
      </section>

      <section className="panel results">
        <div className="results-header">
          <h2>검색 결과</h2>
          <span>{filteredFlowers.length}종의 꽃</span>
        </div>

        {filteredFlowers.length === 0 ? (
          <div className="empty-state">
            <p>조건에 맞는 꽃이 없어요.</p>
            <p className="muted">검색어를 줄이거나 다른 계절을 선택해 보세요.</p>
          </div>
        ) : (
          <ul className="flower-grid">
            {filteredFlowers.map((flower) => (
              <li key={flower.name} className="flower-card">
                <div className="photo-wrapper">
                  <img
                    src={flower.image || PLACEHOLDER_IMAGE}
                    alt={flower.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                </div>
                <div className="card-header">
                  <span className="chip">{flower.season}</span>
                  <span className="color">{flower.color}</span>
                </div>
                <h3>{flower.name}</h3>
                <p className="meaning">“{flower.meaning}”</p>
                <p className="description">{flower.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
