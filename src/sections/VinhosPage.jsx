import { useState, useEffect, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronLeft, ChevronRight, ChevronDown, Check, ArrowUpDown } from 'lucide-react';

// Import images
import wineBateiaImg from '../assets/wine_bottle_bateia.png';
import trilogiaBoxImg from '../assets/trilogia_uvva_box.png';
import grapesImg from '../assets/grapes.png';
import winesImg from '../assets/wines.png';
import sunsetImg from '../assets/sunset.png';

export default function VinhosPage({ setView }) {
  // Navigation back to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hero Slider states
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      id: 0,
      tag: "NOVIDADE",
      title: "Bateia",
      description: "A Essência Lapidada da Chapada Diamantina. Corte 2023.",
      image: wineBateiaImg,
      color: "from-[#2f201d] via-[#1c1514] to-black"
    },
    {
      id: 1,
      tag: "EDIÇÃO LIMITADA",
      title: "Microlote Syrah",
      description: "A expressão pura do terroir de altitude a 1.150 metros. Safra 2022.",
      image: winesImg,
      color: "from-[#3c2a26] via-[#1c1514] to-black"
    },
    {
      id: 2,
      tag: "EXCLUSIVIDADE",
      title: "Trilogia UVVA",
      description: "Uma caixa colecionável em madeira contendo 3 cortes emblemáticos da vinícola.",
      image: trilogiaBoxImg,
      color: "from-[#241a18] via-[#140f0e] to-black"
    },
    {
      id: 3,
      tag: "PREMIUM",
      title: "Diamã Brut",
      description: "O brilho e a elegância da Chapada Diamantina lapidados em borbulhas finas.",
      image: sunsetImg,
      color: "from-[#332421] via-[#1c1514] to-black"
    }
  ];

  // Auto-play hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Products Data
  const baseProducts = [
    {
      id: 1,
      ref: "REF#001",
      title: "Trilogia UVVA",
      price: 717.00,
      category: "tintos",
      type: "Tinto",
      grapes: ["Cabernet Sauvignon", "Syrah", "Merlot"],
      vintage: "2021",
      alcohol: "14.2%",
      image: trilogiaBoxImg
    },
    {
      id: 2,
      ref: "REF#002",
      title: "Bateia Corte 2023",
      price: 380.00,
      category: "tintos",
      type: "Tinto",
      grapes: ["Cabernet Sauvignon", "Syrah"],
      vintage: "2023",
      alcohol: "13.8%",
      image: wineBateiaImg
    },
    {
      id: 3,
      ref: "REF#003",
      title: "Microlote Syrah",
      price: 420.00,
      category: "tintos",
      type: "Tinto",
      grapes: ["Syrah"],
      vintage: "2022",
      alcohol: "14.5%",
      image: winesImg
    },
    {
      id: 4,
      ref: "REF#004",
      title: "Diamã Espumante Brut",
      price: 195.00,
      category: "espumantes",
      type: "Espumante",
      grapes: ["Chardonnay", "Pinot Noir"],
      vintage: "2023",
      alcohol: "12.0%",
      image: grapesImg
    },
    {
      id: 5,
      ref: "REF#005",
      title: "Chardonnay Reserva",
      price: 260.00,
      category: "brancos",
      type: "Branco",
      grapes: ["Chardonnay"],
      vintage: "2022",
      alcohol: "13.0%",
      image: wineBateiaImg
    },
    {
      id: 6,
      ref: "REF#006",
      title: "Sauvignon Blanc",
      price: 240.00,
      category: "brancos",
      type: "Branco",
      grapes: ["Sauvignon Blanc"],
      vintage: "2023",
      alcohol: "12.5%",
      image: winesImg
    },
    {
      id: 7,
      ref: "REF#007",
      title: "Cordillera Rosé",
      price: 180.00,
      category: "brancos", // filters dynamically as rosé or customized
      type: "Rosé",
      grapes: ["Syrah", "Merlot"],
      vintage: "2023",
      alcohol: "12.8%",
      image: grapesImg
    },
    {
      id: 8,
      ref: "REF#008",
      title: "Cabernet Sauvignon",
      price: 310.00,
      category: "tintos",
      type: "Tinto",
      grapes: ["Cabernet Sauvignon"],
      vintage: "2021",
      alcohol: "14.0%",
      image: wineBateiaImg
    },
    {
      id: 9,
      ref: "REF#009",
      title: "Merlot Terroir",
      price: 290.00,
      category: "tintos",
      type: "Tinto",
      grapes: ["Merlot"],
      vintage: "2022",
      alcohol: "13.9%",
      image: winesImg
    },
    {
      id: 10,
      ref: "REF#010",
      title: "UVVA Extra Brut",
      price: 220.00,
      category: "espumantes",
      type: "Espumante",
      grapes: ["Chardonnay"],
      vintage: "2022",
      alcohol: "12.2%",
      image: grapesImg
    },
    {
      id: 11,
      ref: "REF#011",
      title: "Microlote Chardonnay",
      price: 380.00,
      category: "brancos",
      type: "Branco",
      grapes: ["Chardonnay"],
      vintage: "2023",
      alcohol: "13.2%",
      image: wineBateiaImg
    },
    {
      id: 12,
      ref: "REF#012",
      title: "Reserva Família Blend",
      price: 890.00,
      category: "tintos",
      type: "Tinto",
      grapes: ["Cabernet Sauvignon", "Syrah", "Merlot"],
      vintage: "2020",
      alcohol: "14.6%",
      image: trilogiaBoxImg
    }
  ];

  // Tab selections ('todos' | 'tintos' | 'brancos' | 'espumantes')
  const [activeTab, setActiveTab] = useState('todos');

  // Filter states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    types: [],
    prices: [],
    grapes: [],
    vintages: []
  });
  const [appliedFilters, setAppliedFilters] = useState({
    types: [],
    prices: [],
    grapes: [],
    vintages: []
  });

  // Sorting
  const [sortBy, setSortBy] = useState('relevant'); // 'relevant' | 'price-asc' | 'price-desc'

  // Pagination states
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync tab selection with active list
  const filterTabProducts = useMemo(() => {
    if (activeTab === 'todos') return baseProducts;
    return baseProducts.filter(p => p.category === activeTab);
  }, [activeTab]);

  // Apply Sidebar Filters
  const filteredProducts = useMemo(() => {
    let result = [...filterTabProducts];

    // Filter by Wine Type
    if (appliedFilters.types.length > 0) {
      result = result.filter(p => appliedFilters.types.includes(p.type));
    }

    // Filter by Price Range
    if (appliedFilters.prices.length > 0) {
      result = result.filter(p => {
        return appliedFilters.prices.some(range => {
          if (range === 'sub250') return p.price <= 250;
          if (range === '250to500') return p.price > 250 && p.price <= 500;
          if (range === '500to750') return p.price > 500 && p.price <= 750;
          if (range === 'over750') return p.price > 750;
          return true;
        });
      });
    }

    // Filter by Grape variety
    if (appliedFilters.grapes.length > 0) {
      result = result.filter(p => {
        return p.grapes.some(g => appliedFilters.grapes.includes(g));
      });
    }

    // Filter by Vintage
    if (appliedFilters.vintages.length > 0) {
      result = result.filter(p => appliedFilters.vintages.includes(p.vintage));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filterTabProducts, appliedFilters, sortBy]);

  // Pagination dynamic elements
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = useMemo(() => {
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, indexOfFirstItem, indexOfLastItem]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  // Sync scroll lock with sidebar modal
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  // Handle pagination clicks
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const element = document.querySelector('#vinhos-listing-top');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Helper toggle filters in state
  const toggleFilter = (category, value) => {
    setTempFilters(prev => {
      const items = prev[category];
      const newItems = items.includes(value)
        ? items.filter(i => i !== value)
        : [...items, value];
      return { ...prev, [category]: newItems };
    });
  };

  // Sidebar controls
  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
    setIsSidebarOpen(false);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    const cleared = { types: [], prices: [], grapes: [], vintages: [] };
    setTempFilters(cleared);
    setAppliedFilters(cleared);
    setCurrentPage(1);
  };

  // Quick tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="fade-in bg-[#fcfbf9] text-[#1c1514] font-section min-h-screen">
      
      {/* 1. Cinematic Interactive Hero Slider */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-start overflow-hidden pt-20">
        
        {/* Dynamic Backgrounds and images with animations */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out z-0 flex items-center ${
              idx === activeSlide ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            {/* Ambient Background & Full-bleed Image Layer */}
            <div className="absolute inset-0 z-0 bg-[#1c1514]">
              {/* Product background image positioned to cover screen */}
              <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] h-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center md:object-right-center scale-105 opacity-70 md:opacity-85 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] transition-transform duration-[12000ms] ease-out select-none"
                />
              </div>
              
              {/* Luxury gradient overlays for text readability */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}/95 via-[#1c1514]/80 to-transparent z-10`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1514] via-transparent to-[#1c1514]/40 z-10"></div>
              
              {/* Ambient gold glow in the center-right */}
              <div className="absolute right-[10%] top-1/4 w-[400px] h-[400px] bg-[#c5a880]/15 rounded-full blur-[120px] pointer-events-none z-10"></div>
            </div>

            {/* Content Container (overlaying the full-bleed image) */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex items-center justify-start">
              
              {/* Left Side: Editorial Typography Block */}
              <div className="w-full md:max-w-xl text-left space-y-6 md:space-y-7 text-[#fcfbf9] animate-fade-in-up">
                <div className="space-y-3">
                  <span className="text-[#c5a880] text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold block leading-none">
                    {slide.tag}
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-title font-light tracking-wide uppercase leading-tight select-none">
                    {slide.title}
                  </h1>
                </div>
                
                <p className="text-xs sm:text-sm md:text-base text-[#fcfbf9]/85 leading-relaxed max-w-lg font-light font-section">
                  {slide.description}
                </p>

                {/* Inline Slide Indicator Selectors - positioned directly below the description, matching the mock */}
                <div className="flex items-center space-x-3 pt-2 select-none">
                  {slides.map((s, idxBtn) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSlide(idxBtn)}
                      className="h-1 focus:outline-none transition-all duration-500 cursor-pointer relative"
                      style={{ width: idxBtn === activeSlide ? '80px' : '40px' }}
                      aria-label={`Ir para slide ${idxBtn + 1}`}
                    >
                      <div className={`absolute inset-0 rounded-none transition-all duration-500 ${idxBtn === activeSlide ? 'bg-[#c5a880]' : 'bg-[#fcfbf9]/30 hover:bg-[#fcfbf9]/60'}`}></div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex items-center">
                  <button
                    onClick={() => {
                      const element = document.querySelector('#vinhos-listing-top');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="bg-[#c5a880] hover:bg-[#b3956d] text-[#1c1514] font-semibold text-[10px] tracking-[0.2em] uppercase py-3.5 px-8 transition-all duration-300 transform active:scale-95 cursor-pointer shadow-xl rounded-none border border-transparent hover:border-[#fcfbf9]/20"
                  >
                    CONHECER SAFRAS
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}

      </section>

      {/* 2. Listing & Filter Catalog System */}
      <div id="vinhos-listing-top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Breadcrumbs Navigation */}
        <nav className="text-xs text-[#1c1514]/50 tracking-wider uppercase mb-3 flex items-center space-x-1.5 font-medium select-none">
          <button 
            onClick={() => setView('home')} 
            className="hover:text-[#c5a880] transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#1c1514]/90 font-semibold">Nossos Vinhos & Espumantes</span>
        </nav>

        {/* Heading and Tabs Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#c5a880]/20 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-light leading-tight text-[#1c1514] select-none">
              Nossos Vinhos & Espumantes
            </h2>
          </div>

          {/* Quick filter tabs and filters icon button strictly matching screenshot */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            <div className="flex bg-[#1c1514]/5 p-1 rounded-none border border-[#c5a880]/15">
              <button
                onClick={() => handleTabChange('todos')}
                className={`px-4 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'todos' ? 'bg-[#1c1514] text-[#c5a880]' : 'text-[#1c1514]/65 hover:text-[#1c1514]'
                }`}
              >
                Todos os Vinhos
              </button>
              <button
                onClick={() => handleTabChange('tintos')}
                className={`px-4 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'tintos' ? 'bg-[#1c1514] text-[#c5a880]' : 'text-[#1c1514]/65 hover:text-[#1c1514]'
                }`}
              >
                Vinhos Tintos
              </button>
              <button
                onClick={() => handleTabChange('brancos')}
                className={`px-4 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'brancos' ? 'bg-[#1c1514] text-[#c5a880]' : 'text-[#1c1514]/65 hover:text-[#1c1514]'
                }`}
              >
                Vinhos Brancos
              </button>
              <button
                onClick={() => handleTabChange('espumantes')}
                className={`px-4 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'espumantes' ? 'bg-[#1c1514] text-[#c5a880]' : 'text-[#1c1514]/65 hover:text-[#1c1514]'
                }`}
              >
                Espumantes
              </button>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => {
                setTempFilters(appliedFilters);
                setIsSidebarOpen(true);
              }}
              className={`p-3 border border-[#c5a880]/30 hover:border-[#c5a880] transition-all duration-300 cursor-pointer ${
                isSidebarOpen || Object.values(appliedFilters).some(arr => arr.length > 0)
                  ? 'bg-[#1c1514] text-[#c5a880]' 
                  : 'bg-transparent text-[#1c1514] hover:bg-[#1c1514]/5'
              }`}
              title="Abrir Filtros Avançados"
            >
              <SlidersHorizontal className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* 3. Product Catalog Grid (Matches screenshot 100%) */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#1c1514]/5 border border-[#c5a880]/15 space-y-4">
            <SlidersHorizontal className="h-10 w-10 text-[#c5a880] mx-auto animate-pulse" />
            <p className="text-sm font-semibold uppercase tracking-wider text-[#1c1514]/80">Nenhum rótulo encontrado</p>
            <p className="text-xs text-[#1c1514]/55 max-w-sm mx-auto">Tente redefinir os filtros selecionados para explorar nossa adega completa de precisão.</p>
            <button
              onClick={handleClearAll}
              className="mt-2 border border-[#c5a880] text-[#c5a880] font-semibold text-[10px] tracking-wider uppercase py-2 px-6 hover:bg-[#c5a880] hover:text-[#1c1514] transition-all duration-300 cursor-pointer"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => { setView('produto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group relative flex flex-col justify-between bg-[#fcfbf9] border border-[#c5a880]/15 hover:border-[#c5a880]/40 p-5 shadow-sm transition-all duration-500 select-none hover:shadow-xl cursor-pointer"
              >
                
                {/* Product Image Frame */}
                <div className="w-full h-[220px] bg-white border border-[#c5a880]/5 flex items-center justify-center p-4 relative overflow-hidden mb-5">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-[1200ms] ease-out transform scale-100 group-hover:scale-[1.04] select-none filter drop-shadow-md"
                  />
                  
                  {/* Premium Hover Action Overlay */}
                  <div className="absolute inset-0 bg-[#1c1514]/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex flex-col items-center justify-center p-4 space-y-3">
                    
                    {/* Add to Cart button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`"${product.title}" adicionado ao carrinho.`);
                      }}
                      className="w-full bg-[#c5a880] hover:bg-[#b3956d] text-[#1c1514] font-semibold text-[9px] sm:text-[10px] tracking-[0.12em] uppercase py-2 px-3 transition-all duration-300 transform active:scale-95 cursor-pointer text-center"
                    >
                      Adicionar ao carrinho
                    </button>

                    {/* Buy in 1 Click button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Solicitação de Compra Rápida para "${product.title}" enviada.`);
                      }}
                      className="w-full bg-transparent border border-[#c5a880] hover:bg-[#c5a880] text-[#c5a880] hover:text-[#1c1514] font-semibold text-[9px] sm:text-[10px] tracking-[0.12em] uppercase py-2 px-3 transition-all duration-300 transform active:scale-95 cursor-pointer text-center"
                    >
                      Comprar com um clique
                    </button>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle favorite visual
                        const target = e.currentTarget.querySelector('svg');
                        if (target) {
                          if (target.getAttribute('fill') === 'currentColor') {
                            target.setAttribute('fill', 'none');
                            target.setAttribute('stroke', '#c5a880');
                          } else {
                            target.setAttribute('fill', 'currentColor');
                            target.setAttribute('stroke', '#c5a880');
                          }
                        }
                      }}
                      className="flex items-center justify-center gap-1.5 text-[#c5a880] hover:text-[#fcfbf9] text-[9px] sm:text-[10px] tracking-[0.12em] uppercase font-semibold transition-colors duration-300 cursor-pointer pt-1"
                      title="Favoritar"
                    >
                      <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>Favoritar</span>
                    </button>

                    {/* Ver Detalhes button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setView('produto');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full bg-transparent border border-[#fcfbf9]/30 hover:border-[#c5a880] text-[#fcfbf9] hover:text-[#c5a880] font-semibold text-[9px] sm:text-[10px] tracking-[0.12em] uppercase py-2 px-3 transition-all duration-300 transform active:scale-95 cursor-pointer text-center"
                    >
                      Ver Detalhes
                    </button>

                  </div>
                </div>

                {/* Product Metadata & Info block */}
                <div className="space-y-2.5 text-center flex-grow flex flex-col justify-end">
                  <span className="text-[#1c1514]/40 text-[9px] uppercase tracking-wider font-semibold block select-none">
                    {product.ref}
                  </span>
                  
                  <h3 className="text-base sm:text-lg font-title font-light text-[#1c1514] tracking-wide uppercase leading-tight select-text">
                    {product.title}
                  </h3>
                  
                  <p className="text-sm font-semibold text-[#c5a880] tracking-wider leading-none select-text">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                {/* Border glowing highlight ring on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#c5a880]/30 pointer-events-none transition-all duration-500 z-20"></div>

              </div>
            ))}
          </div>
        )}

        {/* 4. Elegant dynamic pagination controls from layout */}
        {filteredProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#c5a880]/15 pt-8 mt-16 text-xs text-[#1c1514]/65 select-none font-medium">
            
            {/* Items Per Page selector */}
            <div className="flex items-center space-x-2">
              <span>Itens por página:</span>
              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border border-[#c5a880]/30 text-xs px-3 py-1.5 pr-8 focus:outline-none focus:border-[#c5a880] appearance-none rounded-none cursor-pointer font-semibold"
                >
                  <option value="4" className="text-[#1c1514]">4</option>
                  <option value="8" className="text-[#1c1514]">8</option>
                  <option value="12" className="text-[#1c1514]">12</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-[#c5a880] pointer-events-none" />
              </div>
            </div>

            {/* Current status display */}
            <div className="font-semibold text-[#1c1514]/80">
              {String(indexOfFirstItem + 1).padStart(2, '0')} – {String(Math.min(indexOfLastItem, filteredProducts.length)).padStart(2, '0')} de {filteredProducts.length}
            </div>

            {/* Chevron Page Controls */}
            <div className="flex items-center space-x-1.5">
              {/* Back to First */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`h-9 w-9 flex items-center justify-center border transition-all duration-300 ${
                  currentPage === 1
                    ? 'border-[#1c1514]/10 text-[#1c1514]/20 cursor-not-allowed'
                    : 'border-[#c5a880]/30 hover:border-[#c5a880] hover:bg-[#1c1514] hover:text-[#c5a880] text-[#1c1514] cursor-pointer'
                }`}
                aria-label="Primeira página"
              >
                <span>|&lt;</span>
              </button>

              {/* Prev */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`h-9 w-9 flex items-center justify-center border transition-all duration-300 ${
                  currentPage === 1
                    ? 'border-[#1c1514]/10 text-[#1c1514]/20 cursor-not-allowed'
                    : 'border-[#c5a880]/30 hover:border-[#c5a880] hover:bg-[#1c1514] hover:text-[#c5a880] text-[#1c1514] cursor-pointer'
                }`}
                aria-label="Página anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`h-9 w-9 flex items-center justify-center border transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'border-[#1c1514]/10 text-[#1c1514]/20 cursor-not-allowed'
                    : 'border-[#c5a880]/30 hover:border-[#c5a880] hover:bg-[#1c1514] hover:text-[#c5a880] text-[#1c1514] cursor-pointer'
                }`}
                aria-label="Próxima página"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* End of Pages */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`h-9 w-9 flex items-center justify-center border transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'border-[#1c1514]/10 text-[#1c1514]/20 cursor-not-allowed'
                    : 'border-[#c5a880]/30 hover:border-[#c5a880] hover:bg-[#1c1514] hover:text-[#c5a880] text-[#1c1514] cursor-pointer'
                }`}
                aria-label="Última página"
              >
                <span>&gt;|</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* 5. Filter Sidebar Drawer Modal */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end select-none animate-fade-in">
          
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-[#140f0e]/75 backdrop-blur-sm cursor-pointer transition-all duration-500"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar Panel Container */}
          <div className="relative w-full sm:w-[450px] h-full bg-[#fcfbf9] text-[#1c1514] z-[120] p-8 shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-[#c5a880]/35 transition-transform duration-500 transform translate-x-0">
            
            {/* Sidebar Top Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#c5a880]/20 mb-8">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-[#c5a880]" />
                  <h4 className="text-xl font-title font-light tracking-wider uppercase text-[#1c1514]">
                    Filtros Avançados
                  </h4>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="h-8 w-8 flex items-center justify-center bg-[#1c1514]/5 text-[#1c1514]/70 hover:text-[#1c1514] hover:bg-[#1c1514]/10 transition-all duration-300 cursor-pointer"
                  aria-label="Fechar Filtros"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable Filter Categories */}
              <div className="space-y-8 select-text">
                
                {/* 1. Category: Tipo de Vinho */}
                <div className="space-y-3">
                  <h5 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#c5a880] border-b border-[#c5a880]/10 pb-1.5">
                    Tipo de Vinho
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-xs select-none">
                    {["Tinto", "Branco", "Rosé", "Espumante"].map(type => (
                      <button
                        key={type}
                        onClick={() => toggleFilter('types', type)}
                        className={`flex items-center justify-between px-3 py-2 border transition-all duration-300 cursor-pointer ${
                          tempFilters.types.includes(type)
                            ? 'bg-[#1c1514] text-[#c5a880] border-[#1c1514]'
                            : 'border-[#c5a880]/20 hover:border-[#c5a880]/60 text-[#1c1514]/75 hover:bg-[#1c1514]/5'
                        }`}
                      >
                        <span>{type}s</span>
                        {tempFilters.types.includes(type) && <Check className="h-3.5 w-3.5 text-[#c5a880]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Category: Faixa de Preço */}
                <div className="space-y-3">
                  <h5 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#c5a880] border-b border-[#c5a880]/10 pb-1.5">
                    Faixa de Preço
                  </h5>
                  <div className="flex flex-col space-y-2 text-xs select-none">
                    {[
                      { id: 'sub250', label: 'Até R$ 250,00' },
                      { id: '250to500', label: 'R$ 250,00 a R$ 500,00' },
                      { id: '500to750', label: 'R$ 500,00 a R$ 750,00' },
                      { id: 'over750', label: 'Acima de R$ 750,00' }
                    ].map(range => (
                      <button
                        key={range.id}
                        onClick={() => toggleFilter('prices', range.id)}
                        className={`flex items-center justify-between px-4 py-2.5 border transition-all duration-300 text-left cursor-pointer ${
                          tempFilters.prices.includes(range.id)
                            ? 'bg-[#1c1514] text-[#c5a880] border-[#1c1514]'
                            : 'border-[#c5a880]/20 hover:border-[#c5a880]/60 text-[#1c1514]/75 hover:bg-[#1c1514]/5'
                        }`}
                      >
                        <span>{range.label}</span>
                        {tempFilters.prices.includes(range.id) && <Check className="h-3.5 w-3.5 text-[#c5a880]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Category: Variedade de Uva */}
                <div className="space-y-3">
                  <h5 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#c5a880] border-b border-[#c5a880]/10 pb-1.5">
                    Casta / Uva
                  </h5>
                  <div className="flex flex-wrap gap-2 text-xs select-none">
                    {["Cabernet Sauvignon", "Syrah", "Merlot", "Chardonnay", "Sauvignon Blanc", "Pinot Noir"].map(grape => (
                      <button
                        key={grape}
                        onClick={() => toggleFilter('grapes', grape)}
                        className={`px-3 py-2 border transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                          tempFilters.grapes.includes(grape)
                            ? 'bg-[#1c1514] text-[#c5a880] border-[#1c1514]'
                            : 'border-[#c5a880]/20 hover:border-[#c5a880]/60 text-[#1c1514]/75 hover:bg-[#1c1514]/5'
                        }`}
                      >
                        <span>{grape}</span>
                        {tempFilters.grapes.includes(grape) && <Check className="h-3 w-3 text-[#c5a880]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Category: Safra (Vintage) */}
                <div className="space-y-3">
                  <h5 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#c5a880] border-b border-[#c5a880]/10 pb-1.5">
                    Safra
                  </h5>
                  <div className="grid grid-cols-3 gap-2 text-xs select-none">
                    {["2020", "2021", "2022", "2023"].map(vintage => (
                      <button
                        key={vintage}
                        onClick={() => toggleFilter('vintages', vintage)}
                        className={`py-2 border transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer ${
                          tempFilters.vintages.includes(vintage)
                            ? 'bg-[#1c1514] text-[#c5a880] border-[#1c1514]'
                            : 'border-[#c5a880]/20 hover:border-[#c5a880]/60 text-[#1c1514]/75 hover:bg-[#1c1514]/5'
                        }`}
                      >
                        <span>{vintage}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Sort By Control inside sidebar */}
                <div className="space-y-3 pt-2">
                  <h5 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#c5a880] border-b border-[#c5a880]/10 pb-1.5">
                    Ordenar por
                  </h5>
                  <div className="flex bg-[#1c1514]/5 p-1 rounded-none border border-[#c5a880]/15 text-xs select-none">
                    <button
                      onClick={() => setSortBy('relevant')}
                      className={`flex-1 py-2 text-center transition-all duration-300 cursor-pointer ${
                        sortBy === 'relevant' ? 'bg-[#1c1514] text-[#c5a880]' : 'text-[#1c1514]/65 hover:text-[#1c1514]'
                      }`}
                    >
                      Relevância
                    </button>
                    <button
                      onClick={() => setSortBy('price-asc')}
                      className={`flex-1 py-2 text-center transition-all duration-300 cursor-pointer ${
                        sortBy === 'price-asc' ? 'bg-[#1c1514] text-[#c5a880]' : 'text-[#1c1514]/65 hover:text-[#1c1514]'
                      }`}
                    >
                      Menor Preço
                    </button>
                    <button
                      onClick={() => setSortBy('price-desc')}
                      className={`flex-1 py-2 text-center transition-all duration-300 cursor-pointer ${
                        sortBy === 'price-desc' ? 'bg-[#1c1514] text-[#c5a880]' : 'text-[#1c1514]/65 hover:text-[#1c1514]'
                      }`}
                    >
                      Maior Preço
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Sidebar Bottom Controls */}
            <div className="grid grid-cols-2 gap-4 border-t border-[#c5a880]/20 pt-6 mt-8 select-none">
              <button
                onClick={handleClearAll}
                className="w-full bg-transparent hover:bg-[#1c1514]/5 border border-[#1c1514]/40 text-[#1c1514] font-semibold text-[10px] tracking-[0.15em] uppercase py-3 transition-all duration-300 transform active:scale-95 text-center cursor-pointer"
              >
                Limpar Tudo
              </button>
              <button
                onClick={handleApplyFilters}
                className="w-full bg-[#1c1514] hover:bg-[#c5a880] hover:text-[#1c1514] text-[#c5a880] font-semibold text-[10px] tracking-[0.15em] uppercase py-3 transition-all duration-300 transform active:scale-95 text-center cursor-pointer shadow-lg"
              >
                Aplicar Filtros
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
