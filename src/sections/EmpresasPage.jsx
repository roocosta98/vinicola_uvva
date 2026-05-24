import { useState, useEffect } from 'react';
import sunsetImg from '../assets/sunset.png';
import toursHeroBannerImg from '../assets/tours_hero_banner.png';

export default function EmpresasPage({ setView }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cnpj: '',
    segmento: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Always scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (segmentoName) => {
    setFormData((prev) => {
      const alreadySelected = prev.segmento.includes(segmentoName);
      if (alreadySelected) {
        return {
          ...prev,
          segmento: prev.segmento.filter((s) => s !== segmentoName)
        };
      } else {
        return {
          ...prev,
          segmento: [...prev.segmento, segmentoName]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome && formData.email) {
      setIsSubmitted(true);
    }
  };

  const segmentosList = [
    'Restaurante',
    'Loja Especializada',
    'Mercado',
    'Empório',
    'Wine Bar',
    'E-Commerce',
    'Corporativo',
    'Eventos',
    'Outros'
  ];

  return (
    <div className="fade-in bg-[#fcfbf9] text-[#1c1514] font-section min-h-screen">
      
      {/* 1. Widescreen Hero Section (O Melhor Vinho Para Seu Negócio) */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden bg-[#1c1514]">
        {/* Background Image (Scenic twilight pour representing mature B2B tone) */}
        <img 
          src={sunsetImg} 
          alt="Taça de vinho tinto UVVA sendo apreciada com o pôr do sol na Chapada Diamantina" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-103 select-none z-0"
        />
        
        {/* Sophisticated dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/45 z-10"></div>

        {/* Centered Premium Content Overlay */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full text-white space-y-6 select-none">
          {/* Sub-headline */}
          <span className="text-[#fcfbf9]/95 text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold">
            BEM-VINDO À UVVA
          </span>

          {/* Main Title (Moneta-style elegant tracking) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-title font-light tracking-wide text-white uppercase leading-tight drop-shadow-md">
            O MELHOR VINHO PARA <br className="hidden sm:inline" /> SEU NEGÓCIO
          </h1>
        </div>
      </section>

      {/* 2. Editorial Section: B2B Opportunity Intro */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          
          <div className="space-y-3">
            <span className="text-[#c5a880] text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold block leading-none">
              VINÍCOLA UVVA
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-light leading-tight tracking-wide text-[#1c1514] uppercase">
              JUNTE-SE A NÓS E AMPLIFIQUE SUAS <br className="hidden sm:inline" /> OPORTUNIDADES DE NEGÓCIO
            </h2>
          </div>

          <div className="h-px w-20 bg-[#c5a880]/30 mx-auto"></div>

          <div className="space-y-6 text-sm sm:text-base text-[#1c1514]/85 leading-relaxed font-light font-section max-w-3xl mx-auto text-justify sm:text-center">
            <p>
              Na UVVA, acreditamos que cada garrafa de vinho conta uma história. Temos a missão de transformar cada taça em uma experiência sensorial única.
            </p>
            <p>
              Nossa vinícola é o resultado de uma combinação ímpar entre tradição e inovação em um terroir propício para a produção de vinhos finos e até então inexplorado.
            </p>
            <p>
              Com um compromisso inabalável com a qualidade, oferecemos uma gama diversificada de vinhos para atender às necessidades e exigências do mercado B2B.
            </p>
            <p className="font-medium text-[#1c1514] pt-2">
              Entre em contato conosco para que possamos ser o seu parceiro estratégico em vinhos.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Contact Form Section over Blurry Tasting Table Background */}
      <section className="relative py-20 sm:py-28 bg-[#1c1514] overflow-hidden flex items-center justify-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src={toursHeroBannerImg} 
            alt="Mesa de degustação com taças de vinho e enoturistas em Mucugê" 
            className="w-full h-full object-cover select-none filter blur-xs brightness-50 scale-105"
          />
          {/* Deep elegant overlay to ensure full focus and legibility on the card */}
          <div className="absolute inset-0 bg-[#1c1514]/65"></div>
        </div>

        {/* Dynamic Card Containment */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="bg-white p-8 sm:p-12 md:p-16 shadow-2xl border border-[#c5a880]/15 z-20 relative">
            
            {isSubmitted ? (
              /* Success State Display Card */
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="h-16 w-16 bg-[#c5a880]/15 rounded-full flex items-center justify-center mx-auto border border-[#c5a880]/30">
                  <span className="text-[#c5a880] text-3xl">✓</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-title font-light tracking-wide uppercase text-[#1c1514]">
                    MENSAGEM ENVIADA!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1c1514]/70 max-w-md mx-auto leading-relaxed">
                    Agradecemos o interesse em nossa vinícola. Nossa equipe comercial B2B analisará seus dados e entrará em contato em até 24 horas para propor a melhor parceria para seu negócio.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ nome: '', email: '', telefone: '', cnpj: '', segmento: [] });
                    }}
                    className="border border-[#c5a880] text-[#c5a880] hover:bg-[#c5a880] hover:text-white font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase py-3.5 px-8 transition-all duration-300 cursor-pointer rounded-none"
                  >
                    ENVIAR NOVO FORMULÁRIO
                  </button>
                </div>
              </div>
            ) : (
              /* Input Form State */
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 text-[#1c1514]">
                
                {/* Header inside Card */}
                <div className="text-center space-y-2.5">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-title font-light tracking-wide uppercase leading-tight text-[#1c1514]">
                    TENHA VINHOS DA UVVA PARA SEUS CLIENTES
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 font-light font-section">
                    Para saber mais, complete os dados abaixo.
                  </p>
                </div>

                <div className="space-y-5">
                  
                  {/* Name field */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-semibold tracking-widest text-[#1c1514] uppercase">
                      Nome *
                    </label>
                    <input 
                      type="text" 
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome aqui" 
                      className="w-full bg-[#fcfbf9] border border-[#c5a880]/30 hover:border-[#c5a880]/60 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/20 rounded-none text-xs text-[#1c1514] placeholder-neutral-400 py-3 px-4 transition-all duration-300 font-light mt-1.5 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-semibold tracking-widest text-[#1c1514] uppercase">
                      E-mail *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="exemplo@email.com" 
                      className="w-full bg-[#fcfbf9] border border-[#c5a880]/30 hover:border-[#c5a880]/60 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/20 rounded-none text-xs text-[#1c1514] placeholder-neutral-400 py-3 px-4 transition-all duration-300 font-light mt-1.5 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Phone and CNPJ fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold tracking-widest text-[#1c1514] uppercase">
                        Telefone
                      </label>
                      <input 
                        type="tel" 
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999" 
                        className="w-full bg-[#fcfbf9] border border-[#c5a880]/30 hover:border-[#c5a880]/60 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/20 rounded-none text-xs text-[#1c1514] placeholder-neutral-400 py-3 px-4 transition-all duration-300 font-light mt-1.5 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold tracking-widest text-[#1c1514] uppercase">
                        CNPJ
                      </label>
                      <input 
                        type="text" 
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleInputChange}
                        placeholder="00.000.000/0001-00" 
                        className="w-full bg-[#fcfbf9] border border-[#c5a880]/30 hover:border-[#c5a880]/60 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/20 rounded-none text-xs text-[#1c1514] placeholder-neutral-400 py-3 px-4 transition-all duration-300 font-light mt-1.5 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Segment checkbox area */}
                  <div className="flex flex-col pt-2">
                    <label className="text-[10px] font-semibold tracking-widest text-[#1c1514] uppercase mb-3">
                      Segmento
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {segmentosList.map((seg) => (
                        <label 
                          key={seg} 
                          className="flex items-center space-x-3 text-xs text-[#1c1514]/75 select-none cursor-pointer group"
                        >
                          <input 
                            type="checkbox"
                            checked={formData.segmento.includes(seg)}
                            onChange={() => handleCheckboxChange(seg)}
                            className="w-4 h-4 text-[#c5a880] border-[#c5a880]/30 rounded-none focus:ring-[#c5a880]/30 focus:ring-opacity-50 cursor-pointer focus:ring-offset-0 focus:outline-none bg-transparent accent-[#c5a880]"
                          />
                          <span className="group-hover:text-[#1c1514] transition-colors duration-300 font-light">
                            {seg}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#c5a880] hover:bg-[#b3956d] text-white font-semibold text-xs tracking-[0.2em] uppercase py-4.5 px-8 transition-all duration-300 transform active:scale-95 cursor-pointer rounded-none shadow-md flex items-center justify-center gap-3 group"
                  >
                    <span>ENVIAR →</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
