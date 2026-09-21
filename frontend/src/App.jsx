import { useEffect, useMemo, useState } from 'react'
import './App.css'

const demoProducts = [
  {
    id: 1, name: 'Джемпер «Хангай»', slug: 'khangai-jumper', category: { name: 'Джемперы', slug: 'jumpers' },
    short_description: 'Мягкий базовый джемпер свободного силуэта', material: '100% кашемир', price_from: 14900,
    images: [{ url: 'https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=1200&q=85', alt: 'Кашемировый джемпер' }],
    variants: ['S', 'M', 'L'].flatMap((size, index) => [
      { id: 10 + index, sku: `MGL-001-01-0${index + 1}`, color: 'Песочный', size, price: 14900, stock_quantity: 3 + index },
      { id: 20 + index, sku: `MGL-001-02-0${index + 1}`, color: 'Графит', size, price: 14900, stock_quantity: 2 + index },
    ]),
  },
  {
    id: 2, name: 'Кардиган «Орхон»', slug: 'orkhon-cardigan', category: { name: 'Кардиганы', slug: 'cardigans' },
    short_description: 'Удлинённый кардиган с поясом', material: '70% кашемир, 30% шерсть яка', price_from: 18900,
    images: [{ url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85', alt: 'Удлинённый кардиган' }],
    variants: ['S', 'M', 'L', 'XL'].map((size, index) => ({ id: 30 + index, sku: `MGL-002-01-0${index + 1}`, color: 'Молочный', size, price: 18900, stock_quantity: 4 })),
  },
  {
    id: 3, name: 'Шарф «Гоби»', slug: 'gobi-scarf', category: { name: 'Аксессуары', slug: 'accessories' },
    short_description: 'Лёгкий кашемировый шарф с мягкой бахромой', material: '100% кашемир', price_from: 7900,
    images: [{ url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=85', alt: 'Кашемировый шарф' }],
    variants: [
      { id: 40, sku: 'MGL-003-01-01', color: 'Кэмел', size: 'ONE SIZE', price: 7900, stock_quantity: 6 },
      { id: 41, sku: 'MGL-003-02-01', color: 'Туман', size: 'ONE SIZE', price: 7900, stock_quantity: 4 },
    ],
  },
]

const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price) + ' ₽'

function Header({ cartCount, onCartOpen }) {
  return <>
    <div className="announcement">Бесплатная доставка по Улан-Удэ от 15 000 ₽</div>
    <header className="header shell">
      <a className="brand" href="#top" aria-label="На главную">
        <span className="brand-mark">ᠮ</span>
        <span><b>НАРАН</b><small>кашемир из Монголии</small></span>
      </a>
      <nav><a href="#catalog">Каталог</a><a href="#story">О кашемире</a><a href="#delivery">Доставка</a></nav>
      <button className="cart-button" onClick={onCartOpen}>Корзина <span>{cartCount}</span></button>
    </header>
  </>
}

function ProductCard({ product, onSelect }) {
  return <article className="product-card" onClick={() => onSelect(product)}>
    <div className="product-image-wrap">
      <img src={product.images[0]?.url} alt={product.images[0]?.alt || product.name} />
      <span className="origin-badge">Монголия</span><button className="quick-add">＋</button>
    </div>
    <p className="eyebrow">{product.category.name}</p><h3>{product.name}</h3>
    <p className="description">{product.short_description}</p>
    <div className="product-meta"><span>{product.material}</span><strong>{formatPrice(product.price_from)}</strong></div>
  </article>
}

function ProductDialog({ product, onClose, onAdd }) {
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color)
  const colors = [...new Set(product.variants.map((variant) => variant.color))]
  const sizes = [...new Set(product.variants.filter((variant) => variant.color === selectedColor).map((variant) => variant.size))]
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size)
  const variant = product.variants.find((item) => item.color === selectedColor && item.size === selectedSize)

  return <div className="overlay" onMouseDown={onClose}>
    <section className="product-dialog" onMouseDown={(event) => event.stopPropagation()}>
      <button className="close" onClick={onClose}>×</button><img src={product.images[0]?.url} alt={product.name} />
      <div className="dialog-content">
        <p className="eyebrow">Сделано в Монголии</p><h2>{product.name}</h2><p className="dialog-lead">{product.short_description}</p><p className="material">{product.material}</p>
        <label>Цвет</label><div className="options">{colors.map((color) => <button className={color === selectedColor ? 'active' : ''} onClick={() => { setSelectedColor(color); setSelectedSize(product.variants.find((item) => item.color === color)?.size) }} key={color}>{color}</button>)}</div>
        <label>Размер</label><div className="options">{sizes.map((size) => <button className={size === selectedSize ? 'active' : ''} onClick={() => setSelectedSize(size)} key={size}>{size}</button>)}</div>
        <div className="dialog-buy"><strong>{formatPrice(variant?.price || product.price_from)}</strong><button disabled={!variant?.stock_quantity} onClick={() => { onAdd(product, variant); onClose() }}>Добавить в корзину</button></div>
        <small>В наличии: {variant?.stock_quantity || 0} шт.</small>
      </div>
    </section>
  </div>
}

function CartDrawer({ cart, open, onClose, onChange, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.variant.price * item.quantity, 0)
  return <div className={`cart-layer ${open ? 'open' : ''}`} onMouseDown={onClose}>
    <aside className="cart-drawer" onMouseDown={(event) => event.stopPropagation()}>
      <div className="cart-heading"><div><p className="eyebrow">Ваш выбор</p><h2>Корзина</h2></div><button className="close" onClick={onClose}>×</button></div>
      {!cart.length ? <div className="empty"><span>ᠮ</span><h3>Здесь пока пусто</h3><p>Выберите вещь, к которой захочется прикасаться каждый день.</p></div> : <>
        <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.variant.id}><img src={item.product.images[0]?.url} alt="" /><div><h3>{item.product.name}</h3><p>{item.variant.color} · {item.variant.size}</p><strong>{formatPrice(item.variant.price)}</strong><div className="quantity"><button onClick={() => onChange(item.variant.id, -1)}>−</button><span>{item.quantity}</span><button onClick={() => onChange(item.variant.id, 1)}>＋</button></div></div></div>)}</div>
        <div className="cart-total"><span>Итого</span><strong>{formatPrice(total)}</strong></div><button className="checkout" onClick={onCheckout}>Оформить заказ</button><p className="cart-note">Оплата после подтверждения заказа менеджером</p>
      </>}
    </aside>
  </div>
}

function CheckoutDialog({ cart, onClose, onSuccess }) {
  const [form, setForm] = useState({ customer_name: '', customer_phone: '', delivery_method: 'pickup' })
  const [status, setStatus] = useState({ loading: false, error: '' })
  const total = cart.reduce((sum, item) => sum + item.variant.price * item.quantity, 0)
  const submit = async (event) => {
    event.preventDefault(); setStatus({ loading: true, error: '' })
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/orders`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, items: cart.map((item) => ({ variant_id: item.variant.id, quantity: item.quantity })) }),
      })
      if (!response.ok) throw new Error('Не удалось отправить заказ. Проверьте данные или попробуйте позже.')
      const payload = await response.json(); onSuccess(payload.order)
    } catch (error) { setStatus({ loading: false, error: error.message }) }
  }
  return <div className="overlay" onMouseDown={onClose}><form className="checkout-dialog" onSubmit={submit} onMouseDown={(event) => event.stopPropagation()}>
    <button type="button" className="close" onClick={onClose}>×</button><p className="eyebrow">Оформление</p><h2>Почти готово</h2>
    <p>Оставьте контакты — менеджер подтвердит наличие и согласует примерку.</p>
    <label>Ваше имя<input required value={form.customer_name} onChange={(event) => setForm({ ...form, customer_name: event.target.value })} /></label>
    <label>Телефон<input required type="tel" placeholder="+7 900 000-00-00" value={form.customer_phone} onChange={(event) => setForm({ ...form, customer_phone: event.target.value })} /></label>
    <label>Получение<select value={form.delivery_method} onChange={(event) => setForm({ ...form, delivery_method: event.target.value })}><option value="pickup">Примерка и самовывоз</option><option value="courier">Доставка по Улан-Удэ</option></select></label>
    {form.delivery_method === 'courier' && <label>Адрес<input required onChange={(event) => setForm({ ...form, delivery_address: event.target.value })} /></label>}
    {status.error && <p className="form-error">{status.error}</p>}<div className="checkout-total"><span>К оплате после подтверждения</span><strong>{formatPrice(total)}</strong></div>
    <button className="checkout" disabled={status.loading}>{status.loading ? 'Отправляем…' : 'Отправить заказ'}</button>
  </form></div>
}

function App() {
  const [products, setProducts] = useState(demoProducts)
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('naran-cart') || '[]'))

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/products?per_page=48`)
      .then((response) => response.ok ? response.json() : Promise.reject()).then((payload) => payload.data?.length && setProducts(payload.data)).catch(() => {})
  }, [])
  useEffect(() => { localStorage.setItem('naran-cart', JSON.stringify(cart)) }, [cart])
  const visibleProducts = useMemo(() => activeCategory === 'all' ? products : products.filter((product) => product.category.slug === activeCategory), [products, activeCategory])
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const addToCart = (product, variant) => setCart((current) => {
    const found = current.find((item) => item.variant.id === variant.id)
    return found ? current.map((item) => item.variant.id === variant.id ? { ...item, quantity: Math.min(item.quantity + 1, variant.stock_quantity) } : item) : [...current, { product, variant, quantity: 1 }]
  })
  const changeQuantity = (variantId, delta) => setCart((current) => current.map((item) => item.variant.id === variantId ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0))

  return <div id="top"><Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} /><main>
    <section className="hero shell"><div className="hero-copy"><p className="eyebrow">Тепло монгольской степи</p><h1>Кашемир,<br /><em>который остаётся</em></h1><p>Спокойные силуэты, природные оттенки и настоящее монгольское качество — вещи вне быстрого времени.</p><a className="primary" href="#catalog">Смотреть коллекцию <span>→</span></a></div><div className="hero-visual"><img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1300&q=88" alt="Женщина в кашемировой одежде" /><div className="hero-note"><span>01</span><p>Коллекция<br />Осень · Зима</p></div></div></section>
    <section className="values shell"><div><b>100%</b><span>натуральные волокна</span></div><div><b>Монголия</b><span>прямые поставки</span></div><div><b>Тепло</b><span>до −30°C</span></div><div><b>Деликатно</b><span>к коже и природе</span></div></section>
    <section className="catalog shell" id="catalog"><div className="section-heading"><div><p className="eyebrow">Наша коллекция</p><h2>Выберите своё тепло</h2></div><p>Вещи, которые легко становятся любимыми и остаются в гардеробе на годы.</p></div><div className="filters">{[['all', 'Вся коллекция'], ['jumpers', 'Джемперы'], ['cardigans', 'Кардиганы'], ['accessories', 'Аксессуары']].map(([value, label]) => <button key={value} className={activeCategory === value ? 'active' : ''} onClick={() => setActiveCategory(value)}>{label}</button>)}</div><div className="product-grid">{visibleProducts.map((product) => <ProductCard product={product} onSelect={setSelectedProduct} key={product.id} />)}</div></section>
    <section className="story" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85" alt="Горный пейзаж Монголии" /></div><div className="story-copy"><p className="eyebrow">Откуда приходит тепло</p><h2>Рождён в суровом климате</h2><p>Монгольские козы выращивают особенно тонкий и тёплый подшёрсток, выдерживая резкие ветра и морозы. Весной его бережно вычёсывают вручную.</p><p>Так рождается кашемир — невесомый, мягкий и способный хранить тепло лучше обычной шерсти.</p><a href="#catalog">Узнать больше <span>→</span></a></div></section>
    <section className="delivery shell" id="delivery"><p className="eyebrow">Всё просто</p><h2>Примерьте в Улан-Удэ</h2><div className="delivery-grid"><div><span>01</span><h3>Выберите</h3><p>Добавьте модель, цвет и размер в корзину.</p></div><div><span>02</span><h3>Подтвердите</h3><p>Мы свяжемся и отложим вещи для вас.</p></div><div><span>03</span><h3>Примерьте</h3><p>Заберите в магазине или закажите доставку.</p></div></div></section>
  </main><footer><div className="shell"><div className="brand footer-brand"><span className="brand-mark">ᠮ</span><span><b>НАРАН</b><small>кашемир из Монголии</small></span></div><p>Улан-Удэ · Адрес появится после открытия</p><p>© 2026 Наран</p></div></footer>
  {selectedProduct && <ProductDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />}
  <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onChange={changeQuantity} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }} />
  {checkoutOpen && <CheckoutDialog cart={cart} onClose={() => setCheckoutOpen(false)} onSuccess={(order) => { setCart([]); setCheckoutOpen(false); alert(`Заказ ${order.number} принят`) }} />}</div>
}

export default App
