export interface Plan {
  id: string;
  name: string;
  rate: number;
  priceLabel: string;
  unit: string;
  for: string;
  features: string[];
  accent: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'base',
    name: 'База',
    rate: 3900,
    priceLabel: 'от 3 900',
    unit: '₽ / м²',
    for: 'Ровная стена без акустики',
    features: [
      'Алюминиевый каркас по периметру',
      'Ткань коллекции «Комфорт»',
      'Монтаж за 1 день',
      'Гарантия 3 года',
    ],
    accent: false,
  },
  {
    id: 'quiet',
    name: 'Тихо',
    rate: 5400,
    priceLabel: 'от 5 400',
    unit: '₽ / м²',
    for: 'Когда мешает эхо и соседи',
    features: [
      'Всё из тарифа «База»',
      'Акустическая мембрана 10 мм',
      'Звукопоглощение αw = 0,30 (MH)',
      'Теневой плинтус',
      'Гарантия 5 лет',
    ],
    accent: true,
  },
  {
    id: 'project',
    name: 'Проект',
    rate: 7800,
    priceLabel: 'от 7 800',
    unit: '₽ / м²',
    for: 'Дизайнерское решение под ключ',
    features: [
      'Всё из тарифа «Тихо»',
      'Премиальные коллекции',
      'Подсветка и световые линии',
      'Ниши под ТВ и мебель',
      'Согласование с вашим дизайнером',
      'Гарантия 5 лет + сервис',
    ],
    accent: false,
  },
];

export interface Extra {
  id: string;
  label: string;
  hint: string;
  price: number;
}

export const EXTRAS: Extra[] = [
  { id: 'tv', label: 'Ниша под телевизор', hint: 'скрытые кабели и крепление', price: 12000 },
  { id: 'light', label: 'Подсветка в полотне', hint: 'лента по контуру стены', price: 9500 },
  { id: 'door', label: 'Обход двери или окна', hint: 'аккуратные откосы', price: 6500 },
];

export const formatMoney = (v: number) => Math.round(v).toLocaleString('ru-RU') + ' ₽';