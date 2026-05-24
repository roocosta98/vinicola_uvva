import React, { useEffect } from 'react';
import { Download, ChevronRight, FileText } from 'lucide-react';

export default function BoletoPage({ setView, clearCart }) {
  // Clear cart upon reaching payment page (simulated)
  useEffect(() => {
    if (clearCart) clearCart();
  }, [clearCart]);

  const boletoCode = "03399.32766 55400.000000 00000.000000 1 89760000015000";

  return (
    <section className="bg-[#fcfbf9] min-h-screen pt-32 pb-24 text-[#1c1514] font-section animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white border border-[#e8e2d9] shadow-xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#83712b]"></div>
          
          <h1 className="text-3xl font-title font-medium mb-2 text-[#1c1514]">Boleto Gerado!</h1>
          <p className="text-[#1c1514]/60 mb-10 text-sm max-w-md mx-auto">
            Seu pedido foi registrado. Realize o pagamento do boleto para confirmar suas reservas e produtos.
          </p>

          <div className="flex flex-col items-center mb-10">
            <div className="w-full max-w-md bg-[#fbfaf8] border border-[#e8e2d9] p-8 mb-6">
              
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#e8e2d9]/50">
                <span className="font-bold text-lg tracking-widest text-[#1c1514]/80">BANCO UVVA</span>
                <span className="text-sm font-bold border border-[#1c1514]/80 px-2 py-0.5">033-7</span>
              </div>

              {/* Fake Barcode */}
              <div className="flex h-16 justify-center w-full mb-6 gap-0.5 opacity-80">
                {Array.from({length: 45}).map((_, i) => (
                  <div key={i} className="bg-[#1c1514] h-full" style={{ width: `${Math.random() * 4 + 1}px` }}></div>
                ))}
              </div>

              <div className="text-center">
                <span className="text-[11px] font-mono font-semibold tracking-wider text-[#1c1514]/80 break-all leading-relaxed">
                  {boletoCode}
                </span>
              </div>
            </div>

            <button 
              onClick={() => alert("Simulando download do boleto UVVA em PDF...")}
              className="bg-[#83712b] text-white px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-[#6b5d23] transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" /> Baixar Boleto em PDF
            </button>
          </div>

          <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-xs inline-block text-left max-w-md mx-auto mb-10 border border-blue-200">
            <strong>Lembrete:</strong> A compensação do boleto pode levar até <strong>3 dias úteis</strong>. O seu pedido será confirmado automaticamente após a compensação.
          </div>

          <div className="flex justify-center border-t border-[#e8e2d9] pt-10">
            <button 
              onClick={() => setView('home')}
              className="bg-transparent text-[#1c1514] px-8 py-3 text-xs tracking-widest uppercase font-semibold border border-[#1c1514] hover:bg-[#1c1514] hover:text-white transition-colors inline-flex items-center gap-2"
            >
              Voltar para a Home
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
