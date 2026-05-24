import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import winesImg from '../assets/wines.png';
import { useLanguage } from '../context/LanguageContext';

export default function LojaOnline({ setView }) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('todos');
  const [startIndex, setStartIndex] = useState(0);

  // Featured products data mapping real UVVA high-end wines
  const products = [
    {
      id: 1,
      name: "UVVA Cabernet Sauvignon",
      priceBRL: 195.00,
      priceUSD: 39.00,
      category: "tintos",
      bottleIndex: 1, // Red wine bottle styling
    },
    {
      id: 2,
      name: "UVVA Cabernet Franc",
      priceBRL: 180.00,
      priceUSD: 36.00,
      category: "tintos",
      bottleIndex: 3, // Premium dark tinto bottle styling
    },
    {
      id: 3,
      name: "UVVA Sauvignon Blanc",
      priceBRL: 165.00,
      priceUSD: 33.00,
      category: "brancos",
      bottleIndex: 0, // White wine bottle styling
    },
    {
      id: 4,
      name: "UVVA Chardonnay Reserva",
      priceBRL: 210.00,
      priceUSD: 42.00,
      category: "brancos",
      bottleIndex: 2, // Oak white wine bottle styling
    },
    {
      id: 5,
      name: "UVVA Diamante Extra Brut",
      priceBRL: 240.00,
      priceUSD: 48.00,
      category: "espumantes",
      bottleIndex: 0, // Gold sparking styling
    },
    {
      id: 6,
      name: "UVVA Brut Rosé Fino",
      priceBRL: 225.00,
      priceUSD: 45.00,
      category: "espumantes",
      bottleIndex: 3, // Rose sparkling styling
    }
  ];

  const tabs = [
    { id: 'todos', name: t('lojaOnline.filterAll') },
    { id: 'tintos', name: t('lojaOnline.filterTintos') },
    { id: 'brancos', name: t('lojaOnline.filterBrancos') },
    { id: 'espumantes', name: t('lojaOnline.filterEspumantes') },
  ];

  // Filter products based on active tab
  const filteredProducts = activeTab === 'todos' 
    ? products 
    : products.filter(p => p.category === activeTab);

  // Handle slide controls
  const handleNext = () => {
    if (startIndex + 2 < filteredProducts.length) {
      setStartIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    setStartIndex(0); // Reset index on tab change
  };

  const formatPrice = (prod) => {
    if (language === 'PT') {
      return `R$ ${prod.priceBRL.toFixed(2).replace('.', ',')}`;
    }
    return `$ ${prod.priceUSD.toFixed(2)}`;
  };

  return (
    <section id="loja" className="bg-[#fcfbf9] text-[#1c1514] py-24 sm:py-32 font-section relative overflow-hidden">
      
      {/* Large UVVA Watermark on the right side in the background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-[0.03] text-[#1c1514] font-title text-[26vw] select-none pointer-events-none leading-none z-0">
        UVVA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-start justify-between">
          
          {/* Left Column: Heading, Horizontal Tabs (Exactly like before), Description */}
          <div className="w-full lg:w-[40%] flex flex-col space-y-8 animate-fade-in shrink-0">
            <div>
              <span className="text-[#c5a880] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
                {t('lojaOnline.tagline')}
              </span>
              <h2 className="text-4xl md:text-5xl font-title font-light text-[#1c1514] leading-tight">
                {t('lojaOnline.title')}
              </h2>
            </div>

            {/* Horizontal Filter Tabs - Exactly like first version */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-[#1c1514]/10 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab.id)}
                  className={`text-xs uppercase tracking-wider font-semibold py-1 transition-all duration-300 relative ${
                    activeTab === tab.id 
                      ? 'text-[#c5a880]' 
                      : 'text-[#1c1514]/50 hover:text-[#1c1514]'
                  }`}
                >
                  {tab.name}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#c5a880] animate-width-expand"></span>
                  )}
                </button>
              ))}
            </div>

            <p className="text-sm text-[#1c1514]/75 leading-relaxed max-w-md">
              {t('lojaOnline.description')}
            </p>

            <div className="pt-2">
              <button
                onClick={() => { if (setView) { setView('vinhos'); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                className="inline-block border border-[#1c1514] hover:bg-[#1c1514] hover:text-[#fcfbf9] text-[#1c1514] font-semibold text-xs tracking-[0.2em] uppercase py-4 px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center font-section cursor-pointer"
              >
                {t('lojaOnline.btnAllWines')}
              </button>
            </div>
          </div>

          {/* Right Column: Transparent Product Slider */}
          <div className="w-full lg:w-[52%] flex flex-col space-y-6">
            
            {/* Slider Actions / Arrows */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#1c1514]/40 font-semibold">
                {t('lojaOnline.highlights')}
              </span>
              
              {/* Slide Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handlePrev}
                  disabled={startIndex === 0}
                  className={`h-9 w-9 border border-[#1c1514]/15 flex items-center justify-center rounded-none transition-all duration-300 ${
                    startIndex === 0 
                      ? 'text-[#1c1514]/25 bg-transparent cursor-not-allowed' 
                      : 'text-[#1c1514] hover:bg-[#1c1514] hover:text-[#fcfbf9] hover:border-[#1c1514]'
                  }`}
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={startIndex + 2 >= filteredProducts.length}
                  className={`h-9 w-9 border border-[#1c1514]/15 flex items-center justify-center rounded-none transition-all duration-300 ${
                    startIndex + 2 >= filteredProducts.length 
                      ? 'text-[#1c1514]/25 bg-transparent cursor-not-allowed' 
                      : 'text-[#1c1514] hover:bg-[#1c1514] hover:text-[#fcfbf9] hover:border-[#1c1514]'
                  }`}
                  aria-label="Próximo"
                >
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Slider Window Container */}
            <div className="overflow-hidden w-full relative">
              
              {/* Product Cards Row */}
              <div 
                className="flex gap-8 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${startIndex * 292}px)` }} // Cards are 260px + 32px gap
              >
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => { if (setView) { setView('produto'); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                    className="w-[260px] shrink-0 bg-transparent border-0 shadow-none flex flex-col items-center text-center group transition-all duration-500 rounded-none cursor-pointer"
                  >
                    
                    {/* Bottle Display Area - Transparent with subtle hover effect */}
                    <div className="h-[290px] w-full bg-transparent relative flex items-center justify-center overflow-hidden mb-4">
                      
                      {/* Subtle circular elegant backdrop line */}
                      <div className="absolute h-36 w-36 rounded-full border border-[#c5a880]/10 group-hover:border-[#c5a880]/30 transition-colors duration-500 z-0"></div>

                      {/* Display bottle cropped dynamically from the wines.png sprite */}
                      <div className="h-[240px] w-[96px] relative z-10 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                        <img 
                          src={winesImg} 
                          alt={product.name} 
                          className="absolute max-w-[400%] h-full object-contain"
                          style={{ 
                            left: `-${product.bottleIndex * 92}px`,
                            top: '0'
                          }}
                        />
                      </div>
                    </div>

                    {/* Minimalist Details: Title & Price Only */}
                    <div className="space-y-1.5 w-full">
                      <h3 className="text-lg font-title font-light text-[#1c1514] leading-snug group-hover:text-[#c5a880] transition-colors duration-300 px-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <span className="text-xs font-semibold tracking-wider text-[#1c1514]/65 block">
                        {formatPrice(product)}
                      </span>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
