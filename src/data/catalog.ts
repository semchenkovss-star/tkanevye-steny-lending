export type Concept = 'modern' | 'loft' | 'classic' | 'scandi' | 'minimal';
export type Material = 'Лён' | 'Велюр' | 'Рогожка' | 'Акустический фетр' | 'Микрошенилл';
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
  'Лён',
  'Велюр',
  'Рогожка',
  'Акустический фетр',
  'Микрошенилл',
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
    slug: 'natur-linen',
    name: 'Натур Лён',
    concept: 'modern',
    material: 'Лён',
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
      'Живая фактура нити и тёплый песочный тон. Базовое решение для гостиной, где нужна ровная стена без ремонта.',
  },
  {
    slug: 'grafit-linen',
    name: 'Графит Лён',
    concept: 'minimal',
    material: 'Лён',
    rooms: ['Кабинет', 'Гостиная'],
    color: '#5A5A54',
    colorName: 'Тёмно-серый',
    price: 4400,
    noise: 7,
    thickness: 13,
    warranty: 3,
    img: IMG_LOFT,
    inStock: true,
    description: 'Глубокий серый, не маркий. Держит форму на больших плоскостях без швов.',
  },
  {
    slug: 'terracotta-velour',
    name: 'Терракота Велюр',
    concept: 'classic',
    material: 'Велюр',
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
    description: 'Матовый ворс меняет тон при разном свете. Тёплая акустика для кабинета.',
  },
  {
    slug: 'milk-velour',
    name: 'Молоко Велюр',
    concept: 'scandi',
    material: 'Велюр',
    rooms: ['Спальня', 'Детская'],
    color: '#EDE6DA',
    colorName: 'Молочный',
    price: 5400,
    noise: 9,
    thickness: 30,
    warranty: 5,
    img: IMG_MODERN,
    inStock: true,
    description: 'Светлая база под любой интерьер. Визуально расширяет небольшую спальню.',
  },
  {
    slug: 'dune-rogozhka',
    name: 'Дюна Рогожка',
    concept: 'scandi',
    material: 'Рогожка',
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
    description: 'Плотное плетение, устойчивое к когтям животных. Самый доступный вариант.',
  },
  {
    slug: 'coal-rogozhka',
    name: 'Уголь Рогожка',
    concept: 'loft',
    material: 'Рогожка',
    rooms: ['Гостиная', 'Кабинет'],
    color: '#3B3B38',
    colorName: 'Угольный',
    price: 4100,
    noise: 6,
    thickness: 13,
    warranty: 3,
    img: IMG_LOFT,
    inStock: true,
    description: 'Контрастная акцентная стена под бетон и металл. Хорошо смотрится с подсветкой.',
  },
  {
    slug: 'felt-acoustic',
    name: 'Фетр Акустик',
    concept: 'modern',
    material: 'Акустический фетр',
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
    description: 'Максимальное поглощение звука −11 дБ. Для переговорных и домашних студий.',
  },
  {
    slug: 'orange-acoustic',
    name: 'Оранж Акустик',
    concept: 'modern',
    material: 'Акустический фетр',
    rooms: ['Кабинет', 'Переговорная'],
    color: '#FF6637',
    colorName: 'Оранжевый',
    price: 6500,
    noise: 11,
    thickness: 40,
    warranty: 5,
    img: IMG_CLASSIC,
    inStock: false,
    description: 'Яркий акцент для рабочей зоны. Тот же фетр, что и в сером исполнении.',
  },
  {
    slug: 'ivory-microchenille',
    name: 'Айвори Микрошенилл',
    concept: 'classic',
    material: 'Микрошенилл',
    rooms: ['Спальня', 'Гостиная'],
    color: '#E4D8C4',
    colorName: 'Айвори',
    price: 5900,
    noise: 8,
    thickness: 30,
    warranty: 5,
    img: IMG_CLASSIC,
    inStock: true,
    description: 'Мягкий блеск и плотная поверхность. Подходит для классических интерьеров.',
  },
  {
    slug: 'olive-microchenille',
    name: 'Олива Микрошенилл',
    concept: 'minimal',
    material: 'Микрошенилл',
    rooms: ['Гостиная', 'Кабинет'],
    color: '#7C7F5E',
    colorName: 'Оливковый',
    price: 6100,
    noise: 8,
    thickness: 30,
    warranty: 5,
    img: IMG_MODERN,
    inStock: true,
    description: 'Спокойный природный тон. Не даёт бликов при верхнем свете.',
  },
  {
    slug: 'blue-linen',
    name: 'Индиго Лён',
    concept: 'loft',
    material: 'Лён',
    rooms: ['Спальня', 'Кабинет'],
    color: '#3E4A5C',
    colorName: 'Синий',
    price: 4600,
    noise: 7,
    thickness: 13,
    warranty: 3,
    img: IMG_LOFT,
    inStock: true,
    description: 'Приглушённый синий с фактурой льна. Работает как тёмный акцент у изголовья.',
  },
  {
    slug: 'sand-acoustic',
    name: 'Дюна Акустик',
    concept: 'scandi',
    material: 'Акустический фетр',
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
    description: 'Тишина в детской без тёмных цветов. Безопасный состав без запаха.',
  },
];

export const PRICE_MIN = Math.min(...CATALOG.map((i) => i.price));
export const PRICE_MAX = Math.max(...CATALOG.map((i) => i.price));
