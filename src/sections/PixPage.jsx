import React, { useEffect, useState } from 'react';
import { Copy, Check, ChevronRight, QrCode } from 'lucide-react';

export default function PixPage({ setView, clearCart }) {
  const [copied, setCopied] = useState(false);
  
  // Clear cart upon reaching payment page (simulated)
  useEffect(() => {
    if (clearCart) clearCart();
  }, [clearCart]);

  const pixCode = "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913VINICOLA UVVA6009SAO PAULO62140510UVVA2026TX6304ABCD";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#fcfbf9] min-h-screen pt-32 pb-24 text-[#1c1514] font-section animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white border border-[#e8e2d9] shadow-xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#83712b]"></div>
          
          <h1 className="text-3xl font-title font-medium mb-2 text-[#1c1514]">Pagamento via PIX</h1>
          <p className="text-[#1c1514]/60 mb-8 text-sm max-w-md mx-auto">
            Seu pedido foi reservado! Escaneie o QR Code abaixo com o aplicativo do seu banco para concluir o pagamento.
          </p>

          <div className="flex flex-col items-center mb-10">
            <div className="w-48 h-48 bg-white border-4 border-[#e8e2d9] p-2 flex items-center justify-center relative mb-6">
              {/* Fake QR Code using CSS grid */}
              <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1 opacity-80">
                {Array.from({length: 16}).map((_, i) => (
                  <div key={i} className={`bg-[#1c1514] ${[0,3,5,10,12,15].includes(i) ? 'opacity-100' : 'opacity-40'}`}></div>
                ))}
              </div>
              <QrCode className="absolute text-white bg-[#1c1514] p-1 w-8 h-8 rounded-sm" />
            </div>

            <div className="w-full max-w-sm">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#1c1514]/50 block mb-2 text-left">
                Ou copie a chave PIX (Copia e Cola)
              </label>
              <div className="flex items-center border border-[#e8e2d9] bg-[#fbfaf8] overflow-hidden">
                <input 
                  type="text" 
                  readOnly 
                  value={pixCode}
                  className="flex-1 bg-transparent px-4 py-3 text-xs text-[#1c1514]/70 outline-none truncate"
                />
                <button 
                  onClick={handleCopy}
                  className={`px-4 py-3 border-l border-[#e8e2d9] flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-white hover:bg-[#83712b] hover:text-white text-[#1c1514]'}`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md text-xs inline-block text-left max-w-md mx-auto mb-10 border border-yellow-200">
            <strong>Atenção:</strong> Você tem <strong>30 minutos</strong> para concluir este pagamento. Após esse período, o pedido e suas reservas serão automaticamente cancelados.
          </div>

          <div className="flex justify-center border-t border-[#e8e2d9] pt-10">
            <button 
              onClick={() => setView('home')}
              className="bg-[#1c1514] text-white px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-[#83712b] transition-colors inline-flex items-center gap-2"
            >
              Concluí meu pagamento <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
