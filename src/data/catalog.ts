export type Concept = 'modern' | 'loft' | 'classic' | 'scandi' | 'minimal';
export type Material =
  | 'Марс'
  | 'Луна'
  | 'Комфорт'
  | 'Штукатурка'
  | 'Узор'
  | 'Акустик'
  | 'Модерн';
export type Room = 'Гостиная' | 'Спальня' | 'Кабинет' | 'Детская' | 'Переговорная';

export interface CatalogItem {
  slug: string;
  name: string;
  concept: Concept;
  material: Material;
  rooms: Room[];
  color: string;
  colorName: string;
  price: number;
  oldPrice?: number;
  noise: number;
  thickness: number;
  warranty: number;
  img: string;
  badge?: string;
  inStock: boolean;
  description: string;
}

export const CONCEPTS: { id: Concept; label: string }[] = [
  { id: 'modern', label: 'Современный' },
  { id: 'loft', label: 'Лофт' },
  { id: 'classic', label: 'Классика' },
  { id: 'scandi', label: 'Сканди' },
  { id: 'minimal', label: 'Минимализм' },
];

export const MATERIALS: Material[] = [
  'Марс',
  'Луна',
  'Комфорт',
  'Штукатурка',
  'Узор',
  'Акустик',
  'Модерн',
];

export const ROOMS: Room[] = ['Гостиная', 'Спальня', 'Кабинет', 'Детская', 'Переговорная'];

const IMG_MODERN =
  'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/e8206c2f-b21f-4d38-8126-08ca6342596f.jpg';
const IMG_LOFT =
  'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/d491dc61-7bb2-4c0b-9a4e-be611c5e64d1.jpg';
const IMG_CLASSIC =
  'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/73decbbc-78a8-41ce-a3de-f3026036bbb5.jpg';

export const CATALOG: CatalogItem[] = [
  {
    slug: 'mars-sand',
    name: 'Марс Песок',
    concept: 'modern',
    material: 'Марс',
    rooms: ['Гостиная', 'Спальня'],
    color: '#D9CFBC',
    colorName: 'Песочный',
    price: 4200,
    noise: 7,
    thickness: 13,
    warranty: 3,
    img: IMG_MODERN,
    badge: 'Хит',
    inStock: true,
    description:
      'Матовая поверхность с мелким зерном, как остывший марсианский грунт. Тёплый песочный тон для гостиной, где нужна ровная стена без ремонта.',
  },
  {
    slug: 'luna-grafit',
    name: 'Луна Графит',
    concept: 'minimal',
    material: 'Луна',
    rooms: ['Кабинет', 'Гостиная'],
    color: '#5A5A54',
    colorName: 'Тёмно-серый',
    price: 4400,
    noise: 7,
    thickness: 13,
    warranty: 3,
    img: IMG_LOFT,
    inStock: true,
    description:
      'Ровный лунный серый без бликов и разводов. Не маркий, держит форму на больших плоскостях без единого шва.',
  },
  {
    slug: 'comfort-terracotta',
    name: 'Комфорт Терракота',
    concept: 'classic',
    material: 'Комфорт',
    rooms: ['Кабинет', 'Спальня'],
    color: '#B4532F',
    colorName: 'Терракотовый',
    price: 5600,
    oldPrice: 6200,
    noise: 9,
    thickness: 30,
    warranty: 5,
    img: IMG_CLASSIC,
    badge: 'Скидка',
    inStock: true,
    description:
      'Мягкая тёплая поверхность с плотным наполнением. Гасит эхо и приятна на ощупь — комфортная акустика для кабинета.',
  },
  {
    slug: 'shtukaturka-moloko',
    name: 'Штукатурка Молоко',
    concept: 'scandi',
    material: 'Штукатурка',
    rooms: ['Спальня', 'Детская'],
    color: '#EDE6DA',
    colorName: 'Молочный',
    price: 5400,
    noise: 9,
    thickness: 30,
    warranty: 5,
    img: IMG_MODERN,
    inStock: true,
    description:
      'Повторяет фактуру венецианской штукатурки, но без пыли и мокрых работ. Светлая база под любой интерьер.',
  },
  {
    slug: 'uzor-duna',
    name: 'Узор Дюна',
    concept: 'scandi',
    material: 'Узор',
    rooms: ['Гостиная', 'Детская'],
    color: '#C8B79B',
    colorName: 'Бежевый',
    price: 3900,
    noise: 6,
    thickness: 13,
    warranty: 3,
    img: IMG_MODERN,
    badge: 'Дешевле всех',
    inStock: true,
    description:
      'Рельефное плетение с чётким геометрическим рисунком. Устойчиво к когтям животных и самое доступное в линейке.',
  },
  {
    slug: 'luna-ugol',
    name: 'Луна Уголь',
    concept: 'loft',
    material: 'Луна',
    rooms: ['Гостиная', 'Кабинет'],
    color: '#3B3B38',
    colorName: 'Угольный',
    price: 4100,
    noise: 6,
    thickness: 13,
    warranty: 3,
    img: IMG_LOFT,
    inStock: true,
    description:
      'Глубокий угольный тон с ровной матовой поверхностью. Контрастная акцентная стена под бетон и металл, хорошо смотрится с подсветкой.',
  },
  {
    slug: 'akustik-seryy',
    name: 'Акустик Серый',
    concept: 'modern',
    material: 'Акустик',
    rooms: ['Переговорная', 'Кабинет'],
    color: '#8A8A84',
    colorName: 'Серый',
    price: 6300,
    noise: 11,
    thickness: 40,
    warranty: 5,
    img: IMG_LOFT,
    badge: 'Максимум тишины',
    inStock: true,
    description:
      'Максимальное поглощение звука −11 дБ за счёт сорокамиллиметрового слоя. Для переговорных и домашних студий.',
  },
  {
    slug: 'akustik-oranzh',
    name: 'Акустик Оранж',
    concept: 'modern',
    material: 'Акустик',
    rooms: ['Кабинет', 'Переговорная'],
    color: '#FF6637',
    colorName: 'Оранжевый',
    price: 6500,
    noise: 11,
    thickness: 40,
    warranty: 5,
    img: IMG_CLASSIC,
    inStock: false,
    description:
      'Тот же акустический слой, что и в сером исполнении, но в ярком цвете. Живой акцент для рабочей зоны.',
  },
  {
    slug: 'modern-ayvori',
    name: 'Модерн Айвори',
    concept: 'classic',
    material: 'Модерн',
    rooms: ['Спальня', 'Гостиная'],
    color: '#E4D8C4',
    colorName: 'Айвори',
    price: 5900,
    noise: 8,
    thickness: 30,
    warranty: 5,
    img: IMG_CLASSIC,
    inStock: true,
    description:
      'Гладкая поверхность с мягким перламутровым отблеском. Спокойный светлый тон для классических интерьеров.',
  },
  {
    slug: 'modern-oliva',
    name: 'Модерн Олива',
    concept: 'minimal',
    material: 'Модерн',
    rooms: ['Гостиная', 'Кабинет'],
    color: '#7C7F5E',
    colorName: 'Оливковый',
    price: 6100,
    noise: 8,
    thickness: 30,
    warranty: 5,
    img: IMG_MODERN,
    inStock: true,
    description:
      'Природный приглушённый оттенок без бликов при верхнем свете. Плотная гладкая поверхность держит цвет годами.',
  },
  {
    slug: 'mars-indigo',
    name: 'Марс Индиго',
    concept: 'loft',
    material: 'Марс',
    rooms: ['Спальня', 'Кабинет'],
    color: '#3E4A5C',
    colorName: 'Синий',
    price: 4600,
    noise: 7,
    thickness: 13,
    warranty: 3,
    img: IMG_LOFT,
    inStock: true,
    description:
      'Тот же зернистый рельеф, что и в песочном варианте, в глубоком синем. Работает как тёмный акцент у изголовья кровати.',
  },
  {
    slug: 'akustik-duna',
    name: 'Акустик Дюна',
    concept: 'scandi',
    material: 'Акустик',
    rooms: ['Детская', 'Спальня'],
    color: '#CBBFA6',
    colorName: 'Светло-бежевый',
    price: 6000,
    oldPrice: 6600,
    noise: 10,
    thickness: 40,
    warranty: 5,
    img: IMG_MODERN,
    badge: 'Скидка',
    inStock: true,
    description:
      'Тишина в детской без тёмных цветов: сорок миллиметров поглощения в светлом бежевом. Состав без запаха.',
  },
];

export const PRICE_MIN = Math.min(...CATALOG.map((i) => i.price));
export const PRICE_MAX = Math.max(...CATALOG.map((i) => i.price));