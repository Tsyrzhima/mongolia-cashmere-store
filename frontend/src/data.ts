import type { CategorySlug, Product } from './types'

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`
const gallery = (primary: string, name: string) => [
  { url: image(primary), alt: name },
  { url: image('photo-1551488831-00ddcb6c6bd3'), alt: `${name}, общий вид` },
  { url: image('photo-1529139574466-a303027c1d8b'), alt: `${name}, посадка` },
  { url: image('photo-1558769132-cb1aea458c5e'), alt: `${name}, фактура материала` },
  { url: image('photo-1517841905240-472988babdf9'), alt: `${name}, детали` },
  { url: image('photo-1542291026-7eec264c27ff'), alt: `${name}, упаковка` },
]

const categoryNames: Record<CategorySlug, string> = {
  clothing: 'Одежда', accessories: 'Аксессуары', home: 'Для дома', gifts: 'Подарки',
}

type Seed = {
  name: string; slug: string; category: CategorySlug; material: string; composition: string
  price: number; color: string; sizes: string[]; photo: string; description: string
}

const seeds: Seed[] = [
  { name:'Джемпер «Хангай»', slug:'khangai-jumper', category:'clothing', material:'Кашемир', composition:'100% кашемир', price:14900, color:'Песочный', sizes:['S','M','L'], photo:'photo-1608234807905-4466023792f5', description:'Свободный джемпер с мягкой линией плеча для спокойных многослойных образов.' },
  { name:'Кардиган «Орхон»', slug:'orkhon-cardigan', category:'clothing', material:'Кашемир', composition:'70% кашемир, 30% шерсть яка', price:18900, color:'Молочный', sizes:['S','M','L','XL'], photo:'photo-1434389677669-e08b4cac3105', description:'Удлинённый кардиган с поясом — тёплый верхний слой для города и путешествий.' },
  { name:'Жилет «Гоби»', slug:'gobi-vest', category:'clothing', material:'Шерсть яка', composition:'80% шерсть яка, 20% кашемир', price:11900, color:'Графит', sizes:['S','M','L'], photo:'photo-1620799140408-edc6dcb6d633', description:'Плотный жилет природного оттенка с выразительной фактурой пуха яка.' },
  { name:'Пальто «Алтай»', slug:'altai-coat', category:'clothing', material:'Верблюжья шерсть', composition:'90% верблюжья шерсть, 10% кашемир', price:28900, color:'Кэмел', sizes:['S','M','L'], photo:'photo-1539533018447-63fcce2678e3', description:'Лаконичное пальто-халат из тёплой верблюжьей шерсти.' },
  { name:'Шарф «Степь»', slug:'steppe-scarf', category:'accessories', material:'Кашемир', composition:'100% кашемир', price:7900, color:'Терракота', sizes:['ONE SIZE'], photo:'photo-1520903920243-00d872a2d1c9', description:'Невесомый широкий шарф с аккуратной бахромой и мягким сиянием волокна.' },
  { name:'Шапка «Сэлэнгэ»', slug:'selenge-hat', category:'accessories', material:'Шерсть яка', composition:'100% пух яка', price:4900, color:'Шалфей', sizes:['M','L'], photo:'photo-1576871337622-98d48d1cf531', description:'Тёплая шапка без колкости с комфортной посадкой.' },
  { name:'Варежки «Урга»', slug:'urga-mittens', category:'accessories', material:'Овечья шерсть', composition:'100% овечья шерсть', price:3500, color:'Молочный', sizes:['M','L'], photo:'photo-1609250291996-fdebe6020a8f', description:'Плотные варежки ручной работы для морозной зимы.' },
  { name:'Плед «Тэрэлж»', slug:'terelj-throw', category:'home', material:'Верблюжья шерсть', composition:'100% верблюжья шерсть', price:16900, color:'Песочный', sizes:['140×200'], photo:'photo-1583845112203-454c2254ed0e', description:'Тёплый дышащий плед с тонким геометрическим кантом.' },
  { name:'Подушка «Хубсугул»', slug:'khovsgol-cushion', category:'home', material:'Шерсть яка', composition:'Кашемир и шерсть яка', price:6900, color:'Графит', sizes:['45×45'], photo:'photo-1584100936595-c0654b55a2e2', description:'Фактурная декоративная подушка в спокойной природной гамме.' },
  { name:'Носки «Тайга»', slug:'taiga-socks', category:'home', material:'Шерсть яка', composition:'90% шерсть яка, 10% эластан', price:1900, color:'Коричневый', sizes:['36–38','39–41','42–44'], photo:'photo-1586350977771-b3b0abd50c82', description:'Мягкие плотные носки для дома, прогулок и поездок.' },
  { name:'Набор «Забота»', slug:'care-gift-set', category:'gifts', material:'Кашемир', composition:'Шарф и варежки из кашемира', price:12900, color:'Песочный', sizes:['ONE SIZE'], photo:'photo-1549465220-1a8b9238cd48', description:'Готовый тёплый подарок в минималистичной упаковке.' },
  { name:'Набор «Тёплый дом»', slug:'warm-home-set', category:'gifts', material:'Верблюжья шерсть', composition:'Плед и две пары носков', price:18900, color:'Кэмел', sizes:['ONE SIZE'], photo:'photo-1513883049090-d0b7439799bf', description:'Подарочный комплект для уютных домашних вечеров.' },
]

export const products: Product[] = seeds.map((seed, productIndex) => ({
  id: productIndex + 1,
  name: seed.name,
  slug: seed.slug,
  category: { name: categoryNames[seed.category], slug: seed.category },
  brand: 'Монгол Нэхмэл',
  manufacturer: 'Партнёрская фабрика, Улан-Батор',
  short_description: seed.description,
  description: `${seed.description} Изделие отобрано у производителя в Монголии и подходит для климата Сибири.`,
  material: seed.material,
  composition: seed.composition,
  properties: ['Натуральное дышащее волокно', 'Сохраняет тепло без лишнего объёма', 'Подходит для чувствительной кожи'],
  measurements: Object.fromEntries(seed.sizes.map((size, sizeIndex) => [size, { 'Обхват груди': `${92 + sizeIndex * 8} см`, 'Длина изделия': `${62 + sizeIndex * 2} см`, 'Длина рукава': `${58 + sizeIndex} см` }])),
  model_info: 'Рост модели 174 см, на модели размер M. Посадка свободная.',
  care: 'Ручная стирка при температуре до 30°C. Не выкручивать. Сушить горизонтально вдали от нагревательных приборов.',
  country_of_origin: 'Монголия',
  is_new: productIndex < 4,
  is_gift: seed.category === 'gifts',
  images: gallery(seed.photo, seed.name),
  variants: seed.sizes.flatMap((size, sizeIndex) => [
    { id:(productIndex + 1) * 100 + sizeIndex, sku:`MGL-${String(productIndex + 1).padStart(3,'0')}-${sizeIndex + 1}`, color:seed.color, size, price:seed.price, compare_at_price: productIndex === 3 ? 31900 : null, online_stock_quantity:2 + sizeIndex, offline_stock_quantity:productIndex % 3 === 0 ? 1 : 2 },
  ]),
}))

export const storeInfo = {
  name: 'Наран', city: 'Улан-Удэ',
  address: 'Адрес будет опубликован перед открытием',
  hours: 'График работы уточняется', phone: '', mapUrl: '',
}

