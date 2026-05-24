import { useState, useEffect } from 'react';
import diferenciaisBgImg from '../assets/diferenciais_bg.jpg';

export default function ContatoPage({ setView }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    descricao: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll to top on mount
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome && formData.email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fade-in bg-[#fcfbf9] text-[#1c1514] font-section min-h-screen">
      
      {/* 1. Cinematic Wine-Cellar Hero Section (Fale Conosco) */}
      <section className="relative h-[65vh] md:h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#1c1514]">
        {/* Background Image: Deep Wine Cellar Racks */}
        <img 
          src={diferenciaisBgImg} 
          alt="Adega escura da Vinícola UVVA com garrafas envelhecendo" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-103 select-none z-0 brightness-50"
        />
        
        {/* Editorial vignetting and dark overlays for premium contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60 z-10"></div>

        {/* Centered Premium Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full text-white space-y-4 select-none pb-12">
          {/* Sub-headline */}
          <span className="text-[#fcfbf9]/95 text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold">
            VINÍCOLA UVVA
          </span>

          {/* Main Title (Moneta-style elegant spacing) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-title font-light tracking-[0.15em] text-white uppercase leading-tight drop-shadow-md">
            FALE CONOSCO
          </h1>
        </div>
      </section>

      {/* 2. Interactive Contact Form Overlay Card */}
      <section className="relative z-30 px-4 sm:px-6 -mt-28 md:-mt-36 max-w-3xl mx-auto">
        <div className="bg-white p-8 sm:p-12 md:p-16 shadow-2xl border border-[#c5a880]/15 relative">
          
          {isSubmitted ? (
            /* Success state message inside card */
            <div className="text-center py-12 space-y-6 animate-fade-in">
              <div className="h-16 w-16 bg-[#c5a880]/15 rounded-full flex items-center justify-center mx-auto border border-[#c5a880]/30">
                <span className="text-[#c5a880] text-3xl">✓</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-title font-light tracking-wide uppercase text-[#1c1514]">
                  MENSAGEM ENVIADA!
                </h3>
                <p className="text-xs sm:text-sm text-[#1c1514]/70 max-w-md mx-auto leading-relaxed">
                  Agradecemos o seu contato. Sua mensagem foi encaminhada à nossa equipe de atendimento VIP. Responderemos ao seu e-mail o mais breve possível.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ nome: '', email: '', telefone: '', cpf: '', descricao: '' });
                  }}
                  className="border border-[#c5a880] text-[#c5a880] hover:bg-[#c5a880] hover:text-white font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase py-3.5 px-8 transition-all duration-300 cursor-pointer rounded-none"
                >
                  ENVIAR NOVA MENSAGEM
                </button>
              </div>
            </div>
          ) : (
            /* Input Form State */
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 text-[#1c1514]">
              
              {/* Header inside Card */}
              <div className="text-center space-y-3.5">
                <h3 className="text-2xl sm:text-3xl font-title font-light tracking-wide uppercase leading-tight text-[#1c1514]">
                  NOS ENVIE SUA MENSAGEM
                </h3>
                {/* Thin Elegant gold line divider */}
                <div className="h-px w-16 bg-[#c5a880]/35 mx-auto"></div>
              </div>

              <div className="space-y-5">
                
                {/* Name field */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-semibold tracking-widest text-[#1c1514]/75 uppercase">
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
                  <label className="text-[10px] font-semibold tracking-widest text-[#1c1514]/75 uppercase">
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

                {/* Phone and CPF fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-semibold tracking-widest text-[#1c1514]/75 uppercase">
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
                    <label className="text-[10px] font-semibold tracking-widest text-[#1c1514]/75 uppercase">
                      CPF
                    </label>
                    <input 
                      type="text" 
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      placeholder="999.999.999-99" 
                      className="w-full bg-[#fcfbf9] border border-[#c5a880]/30 hover:border-[#c5a880]/60 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/20 rounded-none text-xs text-[#1c1514] placeholder-neutral-400 py-3 px-4 transition-all duration-300 font-light mt-1.5 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description Textarea field */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-semibold tracking-widest text-[#1c1514]/75 uppercase">
                    Descrição
                  </label>
                  <textarea 
                    name="descricao"
                    rows="4"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    placeholder="Escreva sua mensagem" 
                    className="w-full bg-[#fcfbf9] border border-[#c5a880]/30 hover:border-[#c5a880]/60 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/20 rounded-none text-xs text-[#1c1514] placeholder-neutral-400 py-3 px-4 transition-all duration-300 font-light mt-1.5 focus:outline-none resize-none min-h-[100px]"
                  />
                </div>

              </div>

              {/* Submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#c5a880] hover:bg-[#b3956d] text-white font-semibold text-xs tracking-[0.2em] uppercase py-4.5 px-8 transition-all duration-300 transform active:scale-95 cursor-pointer rounded-none shadow-md flex items-center justify-center gap-3"
                >
                  <span>ENVIAR MENSAGEM →</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

      {/* 3. Luxury Value-Pillars Banner Section (Identical to layout) */}
      <section className="relative py-24 sm:py-32 bg-[#1c1514] overflow-hidden mt-16 sm:mt-24">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src={diferenciaisBgImg} 
            alt="Adega de envelhecimento UVVA com garrafas" 
            className="w-full h-full object-cover select-none brightness-[0.25]"
          />
          {/* Subtle gold-hued gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-[#1c1514]/85 to-black/85"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 text-center text-white">
            
            {/* Pilar 1: Harmonização Local */}
            <div className="flex flex-col items-center space-y-4 group">
              <div className="h-10 w-10 flex items-center justify-center text-[#c5a880] group-hover:scale-110 transition-transform duration-300">
                {/* Premium Wine glass/bottle SVG */}
                <svg className="h-8 w-8 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M8 5h8M9 9h6M7 13c0-3 5-3 5-3s5 0 5 3v5H7v-5z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-title font-light tracking-wider uppercase text-[#c5a880]">
                  Harmonização Local
                </h3>
                <p className="text-xs text-[#fcfbf9]/60 leading-relaxed max-w-xs mx-auto font-light font-section">
                  Vinhos selecionados para elevar os sabores dos ingredientes típicos da nossa terra.
                </p>
              </div>
            </div>

            {/* Pilar 2: Carta de Autor */}
            <div className="flex flex-col items-center space-y-4 group">
              <div className="h-10 w-10 flex items-center justify-center text-[#c5a880] group-hover:scale-110 transition-transform duration-300">
                {/* Premium Book/Menu SVG */}
                <svg className="h-8 w-8 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-title font-light tracking-wider uppercase text-[#c5a880]">
                  Carta de Autor
                </h3>
                <p className="text-xs text-[#fcfbf9]/60 leading-relaxed max-w-xs mx-auto font-light font-section">
                  Uma curadoria exclusiva de rótulos que você só encontra na Fazenda UVVA.
                </p>
              </div>
            </div>

            {/* Pilar 3: Reserva da Casa */}
            <div className="flex flex-col items-center space-y-4 group">
              <div className="h-10 w-10 flex items-center justify-center text-[#c5a880] group-hover:scale-110 transition-transform duration-300">
                {/* Premium Star/Award/Cellar key SVG */}
                <svg className="h-8 w-8 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-title font-light tracking-wider uppercase text-[#c5a880]">
                  Reserva da Casa
                </h3>
                <p className="text-xs text-[#fcfbf9]/60 leading-relaxed max-w-xs mx-auto font-light font-section">
                  Obras-primas da nossa adega guardadas especialmente para acompanhar sua experiência gastronômica.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
