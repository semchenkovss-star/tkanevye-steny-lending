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
  width?: number;
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
    slug: 'akustik-shafran',
    name: 'Акустик Шафран',
    concept: 'modern',
    material: 'Акустик',
    rooms: ['Кабинет', 'Переговорная'],
    color: '#B7771C',
    colorName: 'Шафрановый',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/051e7e66-a5e5-426a-b78d-efd2d0b4433c.jpg',
    inStock: true,
    description:
      'Тёплый золотистый акцент для рабочей зоны. Плотный ворс гасит эхо и не выгорает на солнце.',
  },
  {
    slug: 'akustik-lazur',
    name: 'Акустик Лазурь',
    concept: 'modern',
    material: 'Акустик',
    rooms: ['Кабинет', 'Детская'],
    color: '#065F96',
    colorName: 'Лазурный',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/0a211213-79d6-4440-8579-a0f2c7a21c96.jpg',
    inStock: true,
    description:
      'Глубокий синий с мелким рельефом. Держит цвет годами и хорошо работает на всю стену.',
  },
  {
    slug: 'akustik-oliva',
    name: 'Акустик Олива',
    concept: 'scandi',
    material: 'Акустик',
    rooms: ['Гостиная', 'Кабинет'],
    color: '#6A7849',
    colorName: 'Оливковый',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/21aef804-a43e-4ff3-918a-c99378179548.jpg',
    inStock: true,
    description:
      'Природный приглушённый оттенок без бликов при верхнем свете. Спокойный фон для гостиной.',
  },
  {
    slug: 'akustik-kakao',
    name: 'Акустик Какао',
    concept: 'classic',
    material: 'Акустик',
    rooms: ['Кабинет', 'Спальня'],
    color: '#6C4735',
    colorName: 'Коричневый',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/53644f69-fd7e-4842-8c18-fde917cf67b6.jpg',
    inStock: true,
    description:
      'Тёплый шоколадный тон с матовой поверхностью. Подходит для классических интерьеров с деревом.',
  },
  {
    slug: 'akustik-kofe',
    name: 'Акустик Кофе с молоком',
    concept: 'minimal',
    material: 'Акустик',
    rooms: ['Спальня', 'Гостиная'],
    color: '#837B78',
    colorName: 'Тёмно-бежевый',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/70f53d93-ad94-41a4-bb98-a73382024ef2.jpg',
    inStock: true,
    description:
      'Мягкий нейтральный тон между серым и бежевым. Универсальная база под любую мебель.',
  },
  {
    slug: 'akustik-perl',
    name: 'Акустик Перламутр',
    concept: 'minimal',
    material: 'Акустик',
    rooms: ['Гостиная', 'Спальня'],
    color: '#B4B3B4',
    colorName: 'Светло-серый',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/71fd8a4a-d1aa-46b3-9155-96e5eff82370.jpg',
    inStock: true,
    description:
      'Светлый холодный серый с лёгким блеском нити. Визуально расширяет небольшую комнату.',
  },
  {
    slug: 'akustik-grafit',
    name: 'Акустик Графит',
    concept: 'loft',
    material: 'Акустик',
    rooms: ['Кабинет', 'Переговорная'],
    color: '#4F4C4D',
    colorName: 'Тёмно-серый',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/a2db3b16-a599-4de7-b8d4-df92c1a6941b.jpg',
    inStock: true,
    description:
      'Тёмный графит для переговорных и домашних студий. Максимальное поглощение звука −11 дБ.',
  },
  {
    slug: 'akustik-slivа',
    name: 'Акустик Слива',
    concept: 'classic',
    material: 'Акустик',
    rooms: ['Спальня', 'Кабинет'],
    color: '#6B244A',
    colorName: 'Сливовый',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/a71dae66-ab5e-4d22-ba16-677fa5caa7da.jpg',
    inStock: true,
    description:
      'Насыщенный винный оттенок с плотной фактурой. Работает как тёмный акцент у изголовья.',
  },
  {
    slug: 'akustik-duna',
    name: 'Акустик Дюна',
    concept: 'scandi',
    material: 'Акустик',
    rooms: ['Детская', 'Спальня'],
    color: '#A7917F',
    colorName: 'Бежевый',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/ccac3258-d234-437c-ae06-e61d4300b7a9.jpg',
    inStock: true,
    description:
      'Тишина в детской без тёмных цветов. Тёплый песочный тон, состав без запаха.',
  },
  {
    slug: 'akustik-yantar',
    name: 'Акустик Янтарь',
    concept: 'modern',
    material: 'Акустик',
    rooms: ['Кабинет', 'Детская'],
    color: '#D69C1A',
    colorName: 'Янтарный',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/d2c0b9c2-cff4-408a-aae7-7a97f35bef12.jpg',
    inStock: true,
    description:
      'Яркий солнечный цвет для активной зоны. Тот же акустический слой, что и в спокойных оттенках.',
  },
  {
    slug: 'akustik-tuman',
    name: 'Акустик Туман',
    concept: 'modern',
    material: 'Акустик',
    rooms: ['Переговорная', 'Кабинет'],
    color: '#918F8F',
    colorName: 'Серый',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/f4ac0686-6357-4782-bc44-5942276cfadf.jpg',
    inStock: true,
    description:
      'Ровный средне-серый без подтона. Самый ходовой вариант для офисов и переговорных.',
  },
  {
    slug: 'akustik-menta',
    name: 'Акустик Мята',
    concept: 'scandi',
    material: 'Акустик',
    rooms: ['Детская', 'Гостиная'],
    color: '#49A3A4',
    colorName: 'Бирюзовый',
    price: 6300,
    noise: 11,
    thickness: 40,
    width: 140,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/fd2942bd-0c20-41a3-a2cc-637ad88164b9.jpg',
    inStock: true,
    description:
      'Свежий бирюзовый с мягкой фактурой. Хорошо смотрится в детской и зоне отдыха.',
  },
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
];

export const PRICE_MIN = Math.min(...CATALOG.map((i) => i.price));
export const PRICE_MAX = Math.max(...CATALOG.map((i) => i.price));