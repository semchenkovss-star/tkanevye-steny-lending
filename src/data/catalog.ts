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
    width: 320,
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
    width: 320,
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
    width: 320,
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
    width: 320,
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
    width: 320,
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
    width: 320,
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
    width: 320,
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
    width: 320,
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
    width: 320,
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
    width: 320,
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
    width: 320,
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
    width: 320,
    warranty: 5,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/fd2942bd-0c20-41a3-a2cc-637ad88164b9.jpg',
    inStock: true,
    description:
      'Свежий бирюзовый с мягкой фактурой. Хорошо смотрится в детской и зоне отдыха.',
  },
  {
    slug: 'mars-1',
    name: 'Марс 1',
    concept: 'modern',
    material: 'Марс',
    rooms: ['Гостиная', 'Спальня'],
    color: '#A9A9A7',
    colorName: 'Серый',
    price: 4200,
    noise: 7,
    thickness: 13,
    width: 300,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/b37bee0e-90e5-4b2a-9ba3-8b63ab6a06b4.jpg',
    badge: 'Хит',
    inStock: true,
    description:
      'Классический холодный серый с чётким переплетением нити. Нейтральная основа для гостиной и спальни.',
  },
  {
    slug: 'mars-3',
    name: 'Марс 3',
    concept: 'modern',
    material: 'Марс',
    rooms: ['Спальня', 'Детская'],
    color: '#C3A899',
    colorName: 'Пудровый',
    price: 4200,
    noise: 7,
    thickness: 13,
    width: 300,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/d0fa9794-f1da-4a7a-afb0-0bf6250f0976.jpg',
    inStock: true,
    description:
      'Тёплый пудрово-розовый оттенок с мягким зерном. Делает спальню и детскую спокойнее без лишней яркости.',
  },
  {
    slug: 'mars-7',
    name: 'Марс 7',
    concept: 'scandi',
    material: 'Марс',
    rooms: ['Гостиная', 'Кабинет'],
    color: '#B5A794',
    colorName: 'Песочный',
    price: 4200,
    noise: 7,
    thickness: 13,
    width: 300,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/bcbd22e3-b569-4a17-b14a-4f2952c3b4ec.jpg',
    inStock: true,
    description:
      'Тёплый серо-бежевый — самый универсальный тон коллекции. Хорошо сочетается с деревом и светлой мебелью.',
  },
  {
    slug: 'mars-10',
    name: 'Марс 10',
    concept: 'minimal',
    material: 'Марс',
    rooms: ['Гостиная', 'Спальня', 'Кабинет'],
    color: '#E6E3DE',
    colorName: 'Белый',
    price: 4200,
    noise: 7,
    thickness: 13,
    width: 300,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/61a57efa-e777-4061-8c25-a12586343026.jpg',
    inStock: true,
    description:
      'Почти белое полотно с тонкой сеткой плетения. Визуально расширяет комнату и не спорит с интерьером.',
  },
  {
    slug: 'mars-11',
    name: 'Марс 11',
    concept: 'minimal',
    material: 'Марс',
    rooms: ['Кабинет', 'Переговорная'],
    color: '#C8CBCB',
    colorName: 'Светло-серый',
    price: 4200,
    noise: 7,
    thickness: 13,
    width: 300,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/694bfb63-e001-4265-aa74-3ad87db92112.jpg',
    inStock: true,
    description:
      'Светлый холодный серый с лёгким серебристым отливом. Строгий вариант для кабинета и переговорной.',
  },
  {
    slug: 'luna-1',
    name: 'Луна 1',
    concept: 'scandi',
    material: 'Луна',
    rooms: ['Гостиная', 'Спальня'],
    color: '#DFD2BC',
    colorName: 'Кремовый',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/5b7bd9d8-e9ee-4723-9002-8f3d8d81ad2c.jpg',
    inStock: true,
    description:
      'Светлое льняное плетение с золотистым подтоном. Тёплая база для гостиной и спальни.',
  },
  {
    slug: 'luna-2',
    name: 'Луна 2',
    concept: 'scandi',
    material: 'Луна',
    rooms: ['Спальня', 'Детская'],
    color: '#CBBBAB',
    colorName: 'Бежевый',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/cbcee52f-1392-4722-a18a-3019b7288499.jpg',
    inStock: true,
    description:
      'Мягкий бежево-розовый меланж. Спокойный оттенок, который не спорит с текстилем и деревом.',
  },
  {
    slug: 'luna-3',
    name: 'Луна 3',
    concept: 'minimal',
    material: 'Луна',
    rooms: ['Гостиная', 'Кабинет'],
    color: '#BFBBB2',
    colorName: 'Светло-серый',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/a74b52b1-9eb8-4054-918e-ea86f71856e6.jpg',
    inStock: true,
    description:
      'Нейтральный серый меланж с льняной фактурой. Универсальная основа для любого интерьера.',
  },
  {
    slug: 'luna-4',
    name: 'Луна 4',
    concept: 'loft',
    material: 'Луна',
    rooms: ['Кабинет', 'Переговорная'],
    color: '#8F8B84',
    colorName: 'Тёмно-серый',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/dd783e26-cfad-4dbd-a901-06a2b15f6b15.jpg',
    inStock: true,
    description:
      'Насыщенный графитовый меланж с заметной нитью. Контрастная стена под бетон и металл.',
  },
  {
    slug: 'luna-5',
    name: 'Луна 5',
    concept: 'modern',
    material: 'Луна',
    rooms: ['Гостиная', 'Спальня'],
    color: '#B4A79B',
    colorName: 'Тауп',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/ef5ab68e-c817-42e5-8a32-b2391a0c2229.jpg',
    inStock: true,
    description:
      'Серо-коричневый тауп — самый «тёплый нейтральный» тон коллекции. Хорошо работает при дневном свете.',
  },
  {
    slug: 'luna-6',
    name: 'Луна 6',
    concept: 'loft',
    material: 'Луна',
    rooms: ['Гостиная', 'Кабинет'],
    color: '#9C948C',
    colorName: 'Серо-коричневый',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/c053559e-e625-4b37-9e7f-0eb2c4cc0078.jpg',
    inStock: true,
    description:
      'Плотный серо-коричневый меланж с выраженной нитью. Спокойный фон для мебели тёмных тонов.',
  },
  {
    slug: 'luna-7',
    name: 'Луна 7',
    concept: 'scandi',
    material: 'Луна',
    rooms: ['Спальня', 'Гостиная'],
    color: '#B7A794',
    colorName: 'Капучино',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/217dd272-7ab5-4759-adff-859e7b91eed1.jpg',
    inStock: true,
    description:
      'Тёплый оттенок капучино с льняным переплетением. Мягкий свет и уют без потери нейтральности.',
  },
  {
    slug: 'luna-8',
    name: 'Луна 8',
    concept: 'classic',
    material: 'Луна',
    rooms: ['Спальня', 'Детская'],
    color: '#C9B49E',
    colorName: 'Песочный',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/c9e9ec11-76e0-4b57-8c56-31e94e0dae2c.jpg',
    inStock: true,
    description:
      'Светлый песочный лён с натуральным характером. Универсален для спальни и детской.',
  },
  {
    slug: 'luna-9',
    name: 'Луна 9',
    concept: 'modern',
    material: 'Луна',
    rooms: ['Гостиная', 'Детская'],
    color: '#93A9A9',
    colorName: 'Полынный',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/3085e088-b5e7-4327-8493-f0d742970358.jpg',
    inStock: true,
    description:
      'Приглушённый серо-голубой с зеленоватым подтоном. Свежий акцент, который не утомляет глаз.',
  },
  {
    slug: 'luna-10',
    name: 'Луна 10',
    concept: 'loft',
    material: 'Луна',
    rooms: ['Кабинет', 'Переговорная'],
    color: '#5F707C',
    colorName: 'Синий',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/bc719fe7-3e71-4233-b1e7-d3dc9082d619.jpg',
    inStock: true,
    description:
      'Глубокий грозовой синий с матовой поверхностью. Сильный акцент для кабинета и переговорной.',
  },
  {
    slug: 'luna-11',
    name: 'Луна 11',
    concept: 'classic',
    material: 'Луна',
    rooms: ['Кабинет', 'Гостиная'],
    color: '#6E5B4C',
    colorName: 'Какао',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/1b1b025b-f2fd-4493-94a8-2d2df772036a.jpg',
    inStock: true,
    description:
      'Тёплый шоколадный оттенок с плотным плетением. Благородный тёмный тон для классического кабинета.',
  },
  {
    slug: 'luna-12',
    name: 'Луна 12',
    concept: 'loft',
    material: 'Луна',
    rooms: ['Гостиная', 'Кабинет'],
    color: '#4A4845',
    colorName: 'Графит',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/55ff1e55-47d0-46bb-880a-308cd674b78d.jpg',
    inStock: true,
    description:
      'Глубокий графитовый без бликов. Контрастная стена под подсветку, бетон и металл.',
  },
  {
    slug: 'luna-13',
    name: 'Луна 13',
    concept: 'modern',
    material: 'Луна',
    rooms: ['Детская', 'Спальня'],
    color: '#7C9FB5',
    colorName: 'Голубой',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/b90df69f-931b-4616-8bee-bd350384d226.jpg',
    inStock: true,
    description:
      'Мягкий джинсовый голубой с меланжевой нитью. Свежий и спокойный акцент для детской.',
  },
  {
    slug: 'luna-14',
    name: 'Луна 14',
    concept: 'scandi',
    material: 'Луна',
    rooms: ['Гостиная', 'Кабинет'],
    color: '#7D8A6A',
    colorName: 'Оливковый',
    price: 4400,
    noise: 7,
    thickness: 13,
    width: 290,
    warranty: 3,
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/b7919603-d6af-4ba5-b808-2ab5950bf548.jpg',
    inStock: true,
    description:
      'Приглушённая олива с природным характером. Хорошо сочетается с деревом и живыми растениями.',
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
];

export type Tone = 'light' | 'beige' | 'grey' | 'dark' | 'color';

export const TONES: { id: Tone; label: string }[] = [
  { id: 'light', label: 'Светлые' },
  { id: 'beige', label: 'Бежевые' },
  { id: 'grey', label: 'Серые' },
  { id: 'dark', label: 'Тёмные' },
  { id: 'color', label: 'Цветные' },
];

export const toneOf = (hex: string): Tone => {
  const v = hex.replace('#', '');
  const r = parseInt(v.slice(0, 2), 16) / 255;
  const g = parseInt(v.slice(2, 4), 16) / 255;
  const b = parseInt(v.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const light = (max + min) / 2;
  const sat = d === 0 ? 0 : d / (1 - Math.abs(2 * light - 1));

  let hue = 0;
  if (d !== 0) {
    if (max === r) hue = ((g - b) / d) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue = (hue * 60 + 360) % 360;
  }

  if (light < 0.35 && sat < 0.4) return 'dark';
  if (sat < 0.13) return light > 0.82 ? 'light' : 'grey';
  if (light > 0.85) return 'light';
  if (hue >= 15 && hue <= 55 && sat < 0.5) return 'beige';
  return 'color';
};

export const PRICE_MIN = Math.min(...CATALOG.map((i) => i.price));
export const PRICE_MAX = Math.max(...CATALOG.map((i) => i.price));