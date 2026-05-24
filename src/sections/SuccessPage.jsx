import React, { useEffect } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function SuccessPage({ setView, clearCart }) {
  // Clear cart upon reaching success page
  useEffect(() => {
    if (clearCart) clearCart();
  }, [clearCart]);

  return (
    <section className="bg-[#fcfbf9] min-h-screen flex items-center justify-center pt-24 pb-24 text-[#1c1514] font-section animate-fade-in">
      <div className="max-w-xl mx-auto px-4 text-center">
        
        <div className="flex justify-center mb-8 animate-bounce">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-title font-medium mb-4">Pagamento Aprovado!</h1>
        <p className="text-[#1c1514]/70 mb-8">
          Sua compra foi confirmada com sucesso. A Vinícola UVVA agradece a sua preferência. Em breve você receberá um e-mail com os detalhes da reserva e os ingressos.
        </p>

        <div className="bg-white p-6 border border-[#e8e2d9] shadow-sm mb-12">
          <p className="text-xs uppercase tracking-widest text-[#1c1514]/50 font-semibold mb-1">Número do Pedido</p>
          <p className="text-2xl font-mono tracking-wider font-bold">#UVVA-{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>

        <button 
          onClick={() => setView('home')}
          className="bg-[#1c1514] text-white px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-[#83712b] transition-colors inline-flex items-center gap-2"
        >
          Voltar para a Página Inicial <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </section>
  );
}
