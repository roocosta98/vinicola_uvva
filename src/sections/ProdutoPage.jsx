import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Share2, Star, ChevronLeft, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import wineBateiaImg from '../assets/wine_bottle_bateia.png';
import trilogiaBoxImg from '../assets/trilogia_uvva_box.png';
import winesImg from '../assets/wines.png';
import sunsetImg from '../assets/sunset.png';
import diferenciaisBgImg from '../assets/diferenciais_bg.jpg';

// Product data
const PRODUCT = {
  sku: 'TLG-001',
  category: 'VINHO TINTO SECO',
  name: 'Trilogia UVVA',
  rating: 4,
  reviews: 37,
  price: 'R$ 9.999,00',
  oldPrice: null,
  description:
    'A Trilogia UVVA é uma celebração dos vinhos da Chapada Diamantina. Este vinho fino seco com sua elegância e complexidade, apresenta notas de frutas vermelhas maduras, especiarias e um liqüeur de cacau. Perfeito para compartilhar carnes vermelhas e queijos maturados.',
  technicalInfo: [
    { label: 'Tipo', value: 'Vinho Tinto Seco' },
    { label: 'Safra', value: '2021' },
    { label: 'Região', value: 'Chapada Diamantina, Bahia' },
    { label: 'Uvas', value: 'Syrah, Cabernet Sauvignon, Merlot' },
    { label: 'Teor Alcoólico', value: '14%' },
    { label: 'Temperatura de Serviço', value: '16–18°C' },
    { label: 'Volume', value: '750 ml' },
    { label: 'Produtor', value: 'Vinícola UVVA' },
  ],
  benefits: [
    'Frete grátis para pedidos acima de R$500,00',
    'Entrega em 5 a 8 dias úteis',
    'Embalagem especial de presente disponível',
  ],
};

const TASTING_NOTES = [
  {
    label: 'Visual',
    description:
      'Cor rubi intensa com reflexos púrpura. Limpidez cristalina e brilhante, com lágrimas lentas.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    label: 'Aroma',
    description:
      'Notas de frutas vermelhas maduras, como ameixa e cereja, com toques de baunilha, cacau e especiarias.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 2.5-3 4-3 6.5C9 12 10.5 13.5 12 13.5S15 12 15 9.5C15 7 13.5 5.5 12 3z" />
        <path strokeLinecap="round" d="M9.5 13.5C8 15 7 16.5 7 18.5a5 5 0 0010 0c0-2-1-3.5-2.5-5" />
      </svg>
    ),
  },
  {
    label: 'Paladar',
    description:
      'Corpo pleno e aveludado. Taninos maduros e polidos com final longo e persistente. Grande equilíbrio e frescor.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8 2 5 6 5 10c0 3 1.5 5.5 4 7v3h6v-3c2.5-1.5 4-4 4-7 0-4-3-8-7-8z" />
      </svg>
    ),
  },
];

const HARMONIZATIONS = [
  { label: 'Carnes Vermelhas', emoji: '🥩' },
  { label: 'Queijos Maturados', emoji: '🧀' },
  { label: 'Massas com Molho Escuro', emoji: '🍝' },
  { label: 'Caça e Assados', emoji: '🍖' },
];

const RELATED_PRODUCTS = [
  { name: 'Trilogia UVVA', price: 'R$757,00', img: trilogiaBoxImg },
  { name: 'Trilogia UVVA', price: 'R$757,22', img: trilogiaBoxImg },
  { name: 'Trilogia UVVA', price: 'R$757,00', img: trilogiaBoxImg },
  { name: 'Trilogia UVVA', price: 'R$757,25', img: trilogiaBoxImg },
];

const GALLERY = [trilogiaBoxImg, wineBateiaImg, winesImg, sunsetImg];

export default function ProdutoPage({ setView }) {
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="bg-[#f9f8f6] text-[#1c1514] font-section min-h-screen fade-in">

      {/* ──────────────────────── Breadcrumb ──────────────────────── */}
      <div className="bg-white border-b border-[#e8e2d9] pt-36 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#1c1514]/50">
            <button onClick={() => setView('home')} className="hover:text-[#c5a880] transition-colors cursor-pointer">Home</button>
            <span>/</span>
            <button onClick={() => setView('vinhos')} className="hover:text-[#c5a880] transition-colors cursor-pointer">Vinhos</button>
            <span>/</span>
            <span className="text-[#c5a880]">Trilogia UVVA</span>
          </nav>
        </div>
      </div>

      {/* ──────────────────────── Product Main Section ──────────────────────── */}
      <section className="bg-white py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

            {/* LEFT: Gallery */}
            <div className="flex flex-col gap-5">
              {/* Main Image */}
              <div className="relative aspect-square flex items-center justify-center overflow-hidden group">
                <img
                  src={GALLERY[activeImg]}
                  alt={PRODUCT.name}
                  className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                />
                {/* Prev / Next arrows */}
                <button
                  onClick={() => setActiveImg((p) => (p - 1 + GALLERY.length) % GALLERY.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center bg-white/80 hover:bg-white shadow border border-[#e8e2d9] transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4 text-[#1c1514]" />
                </button>
                <button
                  onClick={() => setActiveImg((p) => (p + 1) % GALLERY.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center bg-white/80 hover:bg-white shadow border border-[#e8e2d9] transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4 text-[#1c1514]" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {GALLERY.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-1 aspect-square border transition-all duration-200 cursor-pointer overflow-hidden ${
                      activeImg === i ? 'border-[#c5a880]' : 'border-transparent hover:border-[#c5a880]/40'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>

              {/* Benefits */}
              <ul className="space-y-2 mt-1">
                {PRODUCT.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11px] text-[#1c1514]/65">
                    <Check className="h-3.5 w-3.5 text-[#c5a880] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: Product Info */}
            <div className="flex flex-col gap-6">

              {/* Category / SKU */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#c5a880]">
                  {PRODUCT.category}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setWishlist(!wishlist)}
                    className={`p-2 border transition-all duration-300 cursor-pointer ${wishlist ? 'border-red-400 text-red-400' : 'border-[#e8e2d9] text-[#1c1514]/40 hover:border-[#c5a880] hover:text-[#c5a880]'}`}
                    aria-label="Favoritar"
                  >
                    <Heart className={`h-4 w-4 ${wishlist ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 border border-[#e8e2d9] text-[#1c1514]/40 hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-300 cursor-pointer" aria-label="Compartilhar">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl sm:text-4xl font-title font-light tracking-wide text-[#1c1514] leading-tight">
                {PRODUCT.name}
              </h1>

              {/* Stars + Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s <= PRODUCT.rating ? 'text-[#c5a880] fill-[#c5a880]' : 'text-[#e8e2d9]'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#1c1514]/50">{PRODUCT.reviews} avaliações</span>
              </div>

              {/* Price */}
              <div>
                <span className="text-3xl font-title font-light text-[#1c1514] tracking-wide">
                  {PRODUCT.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#1c1514]/65 leading-relaxed font-light">
                {PRODUCT.description}
              </p>

              {/* Divider */}
              <div className="h-px bg-[#e8e2d9]" />

              {/* Technical Info Table */}
              <div>
                <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1c1514]/60 mb-4">
                  Informações Técnicas
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {PRODUCT.technicalInfo.map((info) => (
                    <div key={info.label} className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-[#c5a880]">
                        {info.label}
                      </span>
                      <span className="text-xs text-[#1c1514]/75 font-light">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#e8e2d9]" />

              {/* Quantity + CTA Buttons */}
              <div className="flex flex-col gap-3">

                {/* Row 1: Qty Selector */}
                <div className="flex items-center border border-[#e8e2d9] h-12 select-none w-fit">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="h-full px-4 text-[#1c1514]/50 hover:text-[#c5a880] transition-colors cursor-pointer border-r border-[#e8e2d9]"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-6 text-sm font-medium w-12 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="h-full px-4 text-[#1c1514]/50 hover:text-[#c5a880] transition-colors cursor-pointer border-l border-[#e8e2d9]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Row 2: Add to Cart + Buy Now */}
                <div className="flex gap-3">
                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 h-12 flex items-center justify-center gap-2 font-semibold text-[11px] tracking-[0.12em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      addedToCart
                        ? 'bg-[#5a7a4e] text-white'
                        : 'bg-[#c5a880] hover:bg-[#b3956d] text-white'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="h-4 w-4 shrink-0" />
                        ADICIONADO
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4 shrink-0" />
                        ADICIONAR AO CARRINHO
                      </>
                    )}
                  </button>

                  {/* Buy Now */}
                  <button className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#1c1514] hover:bg-[#2e2220] text-white font-semibold text-[11px] tracking-[0.12em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer">
                    COMPRAR COM UM CLIQUE
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Value Pillars (Dark) ──────────────────────── */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#1c1514]">
        <div className="absolute inset-0 z-0">
          <img
            src={diferenciaisBgImg}
            alt="Adega UVVA"
            className="w-full h-full object-cover brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#1c1514]/80 to-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 text-center text-white">

            {[
              {
                title: 'Harmonização Local',
                desc: 'Vinhos selecionados para elevar os sabores dos ingredientes típicos da nossa terra.',
                icon: (
                  <svg className="h-8 w-8 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M8 5h8M9 9h6M7 13c0-3 5-3 5-3s5 0 5 3v5H7v-5z" />
                  </svg>
                ),
              },
              {
                title: 'Carta de Autor',
                desc: 'Uma curadoria exclusiva de rótulos que você só encontra na Fazenda UVVA.',
                icon: (
                  <svg className="h-8 w-8 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                title: 'Reserva da Casa',
                desc: 'Obras-primas da nossa adega guardadas especialmente para sua experiência gastronômica.',
                icon: (
                  <svg className="h-8 w-8 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ),
              },
            ].map((pilar) => (
              <div key={pilar.title} className="flex flex-col items-center space-y-4 group">
                <div className="text-[#c5a880] group-hover:scale-110 transition-transform duration-300">
                  {pilar.icon}
                </div>
                <h3 className="text-base font-title font-light tracking-wider uppercase text-[#c5a880]">
                  {pilar.title}
                </h3>
                <p className="text-xs text-[#fcfbf9]/55 leading-relaxed max-w-xs mx-auto font-light">
                  {pilar.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ──────────────────────── Tasting Notes ──────────────────────── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-title font-light tracking-wider uppercase text-[#1c1514]">
              Notas de Degustação
            </h2>
            <div className="h-px w-12 bg-[#c5a880]/40 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TASTING_NOTES.map((note) => (
              <div key={note.label} className="flex flex-col items-center text-center gap-5">
                {/* Circular Icon */}
                <div className="h-16 w-16 rounded-full border border-[#c5a880]/30 bg-[#f4f1ec] flex items-center justify-center text-[#c5a880]">
                  {note.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#1c1514]">
                    {note.label}
                  </h4>
                  <p className="text-xs text-[#1c1514]/60 leading-relaxed font-light max-w-xs mx-auto">
                    {note.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────────────────── Harmonização ──────────────────────── */}
      <section className="bg-[#f4f1ec] py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-title font-light tracking-wider uppercase text-[#1c1514]">
              Harmonização
            </h2>
            <div className="h-px w-12 bg-[#c5a880]/40 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {HARMONIZATIONS.map((item) => (
              <div
                key={item.label}
                className="bg-white border border-[#e8e2d9] flex flex-col items-center justify-center gap-3 py-8 px-4 text-center hover:border-[#c5a880]/50 hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </span>
                <span className="text-xs font-medium tracking-wide text-[#1c1514]/70 leading-snug">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────────────────── Você também pode gostar ──────────────────────── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-title font-light tracking-wider uppercase text-[#1c1514]">
              Você também pode gostar
            </h2>
            <div className="h-px w-12 bg-[#c5a880]/40 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {RELATED_PRODUCTS.map((prod, i) => (
              <div
                key={i}
                className="group flex flex-col gap-3 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                {/* Image Box */}
                <div className="bg-[#f4f1ec] aspect-square flex items-center justify-center overflow-hidden border border-transparent group-hover:border-[#c5a880]/30 transition-all duration-300">
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Info */}
                <div className="flex flex-col gap-1 px-1">
                  <span className="text-xs font-semibold tracking-wide text-[#1c1514] group-hover:text-[#c5a880] transition-colors duration-300">
                    {prod.name}
                  </span>
                  <span className="text-xs text-[#1c1514]/50 font-light">{prod.price}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
