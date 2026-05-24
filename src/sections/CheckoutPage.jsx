import React, { useState } from 'react';
import { Search, CreditCard, Landmark, QrCode, FileText, Check, Plus, X, Phone, User, Mail, CreditCard as CardIcon, Edit2 } from 'lucide-react';
import trilogiaImg from '../assets/trilogia_uvva_box.png';

export default function CheckoutPage({ setView, cartItems = [], updateCartItem, addCartItem }) {
  // Only selected items in cart matter for checkout
  const selectedItems = cartItems.filter(i => i.selected);

  // Checks
  const tours = selectedItems.filter(i => i.type === 'tour');
  const restaurantes = selectedItems.filter(i => i.type === 'restaurante');
  const products = selectedItems.filter(i => i.type === 'product');
  const eventos = selectedItems.filter(i => i.type === 'evento');

  const hasTour = tours.length > 0;
  const hasRestaurante = restaurantes.length > 0;
  const hasProducts = products.length > 0;

  // Calculos
  const productsSubtotal = products.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const frete = hasProducts ? (productsSubtotal > 299 ? 0 : 29.90) : 0;
  
  const [hasTourTransfer, setHasTourTransfer] = useState(false);
  const [hasRestauranteTransfer, setHasRestauranteTransfer] = useState(false);

  const transferTotal = (hasTourTransfer ? 50 : 0) + (hasRestauranteTransfer ? 50 : 0);

  const toursTotal = tours.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const restaurantesTotal = restaurantes.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const eventosTotal = eventos.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const finalTotal = productsSubtotal + frete + toursTotal + restaurantesTotal + eventosTotal + transferTotal;

  // States
  const [paymentMethod, setPaymentMethod] = useState('credit'); // credit, debit, pix, boleto
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [wineTab, setWineTab] = useState('todos'); // todos, tinto, branco, espumante

  const formatCurrency = (val) => `R$ ${val.toFixed(2).replace('.', ',')}`;

  return (
    <section className="bg-white min-h-screen pt-32 pb-24 text-[#1c1514] font-section animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs tracking-wider mb-6">
          <span className="text-[#c5a880] cursor-pointer hover:underline" onClick={() => setView('home')}>Home</span>
          <span className="text-[#1c1514]/40 mx-2">/</span>
          <span className="text-[#c5a880] cursor-pointer hover:underline" onClick={() => setView('carrinho')}>Carrinho</span>
          <span className="text-[#1c1514]/40 mx-2">/</span>
          <span className="text-[#1c1514]">Finalizar Compras</span>
        </div>

        <h1 className="text-4xl font-title font-light mb-12">Finalizar Compras</h1>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column: Forms */}
          <div className="w-full lg:flex-1 space-y-12">
            
            {/* Informações de Contato */}
            <div>
              <h2 className="text-lg font-title mb-6 border-b border-[#e8e2d9] pb-2">Informações de Contato</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold mb-2">Nome Completo *</label>
                  <input type="text" placeholder="João da Silva" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2">E-mail *</label>
                  <input type="email" placeholder="joao@gmail.com" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2">Telefone *</label>
                  <input type="tel" placeholder="(11) 99999-9999" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2">CPF *</label>
                  <input type="text" placeholder="000.000.000-00" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>
              </div>
            </div>

            {/* Endereços Cadastrados */}
            <div>
              <h2 className="text-lg font-title mb-6 border-b border-[#e8e2d9] pb-2">Endereços Cadastrados</h2>
              
              <div className="space-y-4">
                <label className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${selectedAddress === 'home' ? 'border-[#83712b] bg-[#fbfaf8]' : 'border-[#e8e2d9]'}`}>
                  <input type="radio" name="address" checked={selectedAddress === 'home'} onChange={() => setSelectedAddress('home')} className="mt-1 accent-[#83712b]" />
                  <div className="flex-1 text-sm">
                    <span className="font-semibold block mb-1">CASA</span>
                    <span className="text-[#1c1514]/70">Rua das Parreiras, 100, Apto 202, Bairro Vinhedo, SP, 00000-000</span>
                  </div>
                  <button className="text-xs text-[#83712b] font-medium flex items-center gap-1 hover:underline">
                    <Edit2 className="w-3 h-3" /> Editar
                  </button>
                </label>

                <label className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${selectedAddress === 'work' ? 'border-[#83712b] bg-[#fbfaf8]' : 'border-[#e8e2d9]'}`}>
                  <input type="radio" name="address" checked={selectedAddress === 'work'} onChange={() => setSelectedAddress('work')} className="mt-1 accent-[#83712b]" />
                  <div className="flex-1 text-sm">
                    <span className="font-semibold block mb-1">TRABALHO</span>
                    <span className="text-[#1c1514]/70">Av Paulista, 1000, Andar 10, Bela Vista, SP, 01310-100</span>
                  </div>
                  <button className="text-xs text-[#83712b] font-medium flex items-center gap-1 hover:underline">
                    <Edit2 className="w-3 h-3" /> Editar
                  </button>
                </label>
              </div>

              <div className="mt-6 text-right">
                <button 
                  onClick={() => setIsAddressModalOpen(true)}
                  className="bg-[#83712b] text-white px-6 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-[#6b5d23] transition-colors"
                >
                  Cadastrar novo endereço
                </button>
              </div>
            </div>

            {/* Configuração Tour Condicional */}
            {hasTour && (
              <div>
                <h2 className="text-lg font-title mb-6 border-b border-[#e8e2d9] pb-2">Configuração Tour</h2>
                
                {tours.map(t => (
                  <div key={t.id} className="bg-[#fbfaf8] p-4 border border-[#e8e2d9] mb-4 text-sm">
                    <span className="font-semibold block mb-1">{t.title}</span>
                    <span className="text-[#1c1514]/70">{t.subtitle} - Qtd: {t.qty} - {t.date}</span>
                  </div>
                ))}

                <div className="mt-6">
                  <label className="block text-xs font-semibold mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#83712b]" /> Número de Contato
                  </label>
                  <p className="text-[10px] text-[#1c1514]/50 mb-2">Digite um número para emergências ou atrasos no tour</p>
                  <input type="tel" placeholder="+55 11 99999-9999" className="w-full sm:w-1/2 border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>
                <div className="mt-6 border-t border-[#e8e2d9] pt-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={hasTourTransfer} onChange={(e) => setHasTourTransfer(e.target.checked)} className="w-4 h-4 accent-[#83712b]" />
                    <span className="text-xs font-semibold group-hover:text-[#83712b] transition-colors">Adicionar Serviço de Transfer (+ R$ 50,00)</span>
                  </label>
                  <p className="text-[10px] text-[#1c1514]/50 ml-7 mt-1">Garantimos o seu trajeto de ida e volta dos principais hotéis da região.</p>
                </div>
              </div>
            )}

            {/* Configuração Restaurante Condicional */}
            {hasRestaurante && (
              <div>
                <h2 className="text-lg font-title mb-6 border-b border-[#e8e2d9] pb-2">Configuração Restaurante Arenito</h2>
                
                <div className="mt-6">
                  <label className="block text-xs font-semibold mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#83712b]" /> Número de Contato
                  </label>
                  <p className="text-[10px] text-[#1c1514]/50 mb-2">Digite um número para emergências ou atrasos na reserva</p>
                  <input type="tel" placeholder="+55 11 99999-9999" className="w-full sm:w-1/2 border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>

                <div className="mt-6">
                  <label className="block text-xs font-semibold mb-2">Requisito Especial</label>
                  <p className="text-[10px] text-[#1c1514]/50 mb-2">Possui alguma restrição alimentar ou requisição especial?</p>
                  <textarea 
                    rows="3"
                    placeholder="Ex: Alergia a frutos do mar, pedido de mesa perto da janela..."
                    className="w-full border border-[#e8e2d9] p-3 text-sm focus:outline-none focus:border-[#c5a880] bg-[#fbfaf8] resize-none"
                  ></textarea>
                </div>

                <div className="mt-6 border-t border-[#e8e2d9] pt-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={hasRestauranteTransfer} onChange={(e) => setHasRestauranteTransfer(e.target.checked)} className="w-4 h-4 accent-[#83712b]" />
                    <span className="text-xs font-semibold group-hover:text-[#83712b] transition-colors">Adicionar Serviço de Transfer (+ R$ 50,00)</span>
                  </label>
                  <p className="text-[10px] text-[#1c1514]/50 ml-7 mt-1">Vá de táxi de forma segura. Organizamos seu transfer de ida e volta.</p>
                </div>
              </div>
            )}

            {/* Cross-Sell Vinhos Condicional */}
            {(hasTour || hasRestaurante) && (
              <div>
                <h2 className="text-lg font-title mb-6 border-b border-[#e8e2d9] pb-2 flex items-center gap-2">
                  <span className="text-[#83712b] text-xl">🍷</span> Deseja pré-selecionar algum vinho para agilizar a sua experiência?
                </h2>

                {/* Tabs */}
                <div className="flex border-b border-[#e8e2d9] mb-6 overflow-x-auto no-scrollbar">
                  {['Todos os Vinhos', 'Vinho Tinto', 'Vinho Branco', 'Espumantes'].map((tab) => {
                    const value = tab.split(' ')[0].toLowerCase();
                    const active = wineTab === value || (wineTab==='todos' && value==='todos');
                    return (
                      <button 
                        key={tab}
                        onClick={() => setWineTab(value)}
                        className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                          active ? 'border-[#83712b] text-[#83712b]' : 'border-transparent text-[#1c1514]/50 hover:text-[#1c1514]'
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                  <div className="ml-auto flex items-center px-4">
                    <Search className="w-4 h-4 text-[#83712b] cursor-pointer" />
                  </div>
                </div>

                {/* Wine Grid (Mocked) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="text-center group cursor-pointer relative" onClick={() => addCartItem({ id: `cx-${i}`, type: 'product', title: 'Trilogia UVVA', subtitle: 'Vinho Tinto', price: 77.00, qty: 1, selected: true, img: 'trilogia_uvva_box.png' })}>
                      <div className="bg-[#fbfaf8] aspect-square flex items-center justify-center p-4 border border-[#e8e2d9] mb-3 group-hover:border-[#c5a880] transition-colors">
                        <img src={trilogiaImg} alt="Trilogia UVVA" className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105" />
                        <div className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-[#83712b] hover:text-white text-[#83712b]">
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                      <span className="text-[10px] text-[#1c1514]/50 uppercase tracking-widest block mb-1">Vinho Tinto</span>
                      <h4 className="text-xs font-bold text-[#1c1514]">Trilogia UVVA</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formas de Pagamento */}
            <div>
              <h2 className="text-lg font-title mb-6 border-b border-[#e8e2d9] pb-2">Forma de Pagamento</h2>
              
              <div className="border border-[#e8e2d9] divide-y divide-[#e8e2d9]">
                
                {/* Credit Card */}
                <div>
                  <label className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${paymentMethod === 'credit' ? 'bg-[#fbfaf8]' : 'hover:bg-[#fbfaf8]/50'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} className="accent-[#83712b]" />
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'credit' ? 'text-[#83712b]' : 'text-[#1c1514]/40'}`} />
                    <span className={`text-sm font-semibold ${paymentMethod === 'credit' ? 'text-[#83712b]' : 'text-[#1c1514]/70'}`}>Cartão de Crédito</span>
                  </label>
                  {paymentMethod === 'credit' && (
                    <div className="p-6 bg-[#fbfaf8] border-t border-[#e8e2d9] space-y-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-2">Número do Cartão *</label>
                        <div className="relative">
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-b border-[#e8e2d9] py-2 pl-8 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                          <CardIcon className="w-4 h-4 text-[#1c1514]/30 absolute left-0 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-2">Nome no Cartão *</label>
                        <input type="text" placeholder="Como impresso no cartão" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-[10px] font-semibold uppercase tracking-wider mb-2">Validade *</label>
                          <input type="text" placeholder="MM/AA" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[10px] font-semibold uppercase tracking-wider mb-2">CVV *</label>
                          <input type="text" placeholder="123" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-2">Parcelas *</label>
                        <select className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent outline-none">
                          <option>1x de {formatCurrency(finalTotal)} sem juros</option>
                          {finalTotal > 100 && <option>2x de {formatCurrency(finalTotal/2)} sem juros</option>}
                          {finalTotal > 150 && <option>3x de {formatCurrency(finalTotal/3)} sem juros</option>}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Debit Card */}
                <div>
                  <label className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${paymentMethod === 'debit' ? 'bg-[#fbfaf8]' : 'hover:bg-[#fbfaf8]/50'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'debit'} onChange={() => setPaymentMethod('debit')} className="accent-[#83712b]" />
                    <Landmark className={`w-5 h-5 ${paymentMethod === 'debit' ? 'text-[#83712b]' : 'text-[#1c1514]/40'}`} />
                    <span className={`text-sm font-semibold ${paymentMethod === 'debit' ? 'text-[#83712b]' : 'text-[#1c1514]/70'}`}>Cartão de Débito</span>
                  </label>
                  {paymentMethod === 'debit' && (
                    <div className="p-6 bg-[#fbfaf8] border-t border-[#e8e2d9] space-y-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-2">Número do Cartão *</label>
                        <div className="relative">
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-b border-[#e8e2d9] py-2 pl-8 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                          <CardIcon className="w-4 h-4 text-[#1c1514]/30 absolute left-0 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-2">Nome no Cartão *</label>
                        <input type="text" placeholder="Como impresso no cartão" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-[10px] font-semibold uppercase tracking-wider mb-2">Validade *</label>
                          <input type="text" placeholder="MM/AA" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[10px] font-semibold uppercase tracking-wider mb-2">CVV *</label>
                          <input type="text" placeholder="123" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* PIX */}
                <div>
                  <label className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${paymentMethod === 'pix' ? 'bg-[#fbfaf8]' : 'hover:bg-[#fbfaf8]/50'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} className="accent-[#83712b]" />
                    <QrCode className={`w-5 h-5 ${paymentMethod === 'pix' ? 'text-[#83712b]' : 'text-[#1c1514]/40'}`} />
                    <div className="flex flex-col">
                      <span className={`text-sm font-semibold ${paymentMethod === 'pix' ? 'text-[#83712b]' : 'text-[#1c1514]/70'}`}>PIX</span>
                      <span className="text-[10px] text-[#1c1514]/50">Aprovação imediata - 5% de desconto</span>
                    </div>
                  </label>
                </div>

                {/* Boleto */}
                <div>
                  <label className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${paymentMethod === 'boleto' ? 'bg-[#fbfaf8]' : 'hover:bg-[#fbfaf8]/50'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'boleto'} onChange={() => setPaymentMethod('boleto')} className="accent-[#83712b]" />
                    <FileText className={`w-5 h-5 ${paymentMethod === 'boleto' ? 'text-[#83712b]' : 'text-[#1c1514]/40'}`} />
                    <div className="flex flex-col">
                      <span className={`text-sm font-semibold ${paymentMethod === 'boleto' ? 'text-[#83712b]' : 'text-[#1c1514]/70'}`}>Boleto Bancário</span>
                      <span className="text-[10px] text-[#1c1514]/50">Vencimento em 3 dias úteis</span>
                    </div>
                  </label>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Resumo do Pedido */}
          <div className="w-full lg:w-[380px] shrink-0 bg-[#faf9f7] px-8 py-10 sticky top-32 border border-[#e8e2d9]/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
            <h2 className="text-xl font-title font-medium text-[#1c1514] mb-8">Resumo do Pedido</h2>

            <div className="space-y-6">
              
              {/* Vinhos Section */}
              {hasProducts && (
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-[#1c1514] border-b border-[#e8e2d9] pb-2">Produtos</h3>
                  <div className="flex justify-between text-xs text-[#1c1514]/80">
                    <span>Subtotal</span>
                    <span>{formatCurrency(productsSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#1c1514]/80">
                    <span>Frete</span>
                    <span>{frete === 0 ? 'Grátis' : formatCurrency(frete)}</span>
                  </div>
                  {frete > 0 && (
                    <div className="text-[10px] text-[#8a7b2e] font-medium text-right mt-1">
                      Frete grátis para compras acima de R$ 299,00
                    </div>
                  )}
                </div>
              )}

              {/* Tours Section */}
              {tours.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="font-bold text-sm text-[#1c1514] border-b border-[#e8e2d9] pb-2">Tours</h3>
                  {tours.map(t => (
                    <div key={t.id} className="flex justify-between text-xs text-[#1c1514]/80">
                      <span className="truncate pr-4">{t.title} x {t.qty}</span>
                      <span className="shrink-0">{formatCurrency(t.price * t.qty)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Restaurante Section */}
              {restaurantes.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="font-bold text-sm text-[#1c1514] border-b border-[#e8e2d9] pb-2">Restaurante Arenito</h3>
                  {restaurantes.map(r => (
                    <div key={r.id} className="flex justify-between text-xs text-[#1c1514]/80">
                      <span className="truncate pr-4">Mesa x {r.qty}</span>
                      <span className="shrink-0">{formatCurrency(r.price * r.qty)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Eventos Section */}
              {eventos.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="font-bold text-sm text-[#1c1514] border-b border-[#e8e2d9] pb-2">Eventos</h3>
                  {eventos.map(e => (
                    <div key={e.id} className="flex justify-between text-xs text-[#1c1514]/80">
                      <span className="truncate pr-4">{e.title} x {e.qty}</span>
                      <span className="shrink-0">{formatCurrency(e.price * e.qty)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Transfer Section */}
              {transferTotal > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="font-bold text-sm text-[#1c1514] border-b border-[#e8e2d9] pb-2">Serviços Adicionais</h3>
                  <div className="flex justify-between text-xs text-[#1c1514]/80">
                    <span className="truncate pr-4">Serviço de Transfer x {(hasTourTransfer ? 1 : 0) + (hasRestauranteTransfer ? 1 : 0)}</span>
                    <span className="shrink-0">{formatCurrency(transferTotal)}</span>
                  </div>
                </div>
              )}

              {/* Discount PIX */}
              {paymentMethod === 'pix' && finalTotal > 0 && (
                <div className="flex justify-between text-xs text-green-600 font-medium pt-2">
                  <span>Desconto PIX (5%)</span>
                  <span>- {formatCurrency(finalTotal * 0.05)}</span>
                </div>
              )}

              {/* Total Final */}
              <div className="pt-8 flex justify-between items-end mt-4">
                <span className="font-semibold text-base text-[#1c1514]">Total</span>
                <span className="font-bold text-xl text-[#8a7b2e]">
                  {formatCurrency(paymentMethod === 'pix' ? finalTotal * 0.95 : finalTotal)}
                </span>
              </div>

              {/* Action */}
              <button 
                onClick={() => {
                  if (paymentMethod === 'pix') setView('pix');
                  else if (paymentMethod === 'boleto') setView('boleto');
                  else setView('success');
                }}
                disabled={finalTotal === 0}
                className={`w-full font-semibold text-[11px] tracking-widest uppercase py-4 mt-6 transition-all duration-300 ${
                  finalTotal > 0 ? 'bg-[#83712b] hover:bg-[#6b5d23] text-white' : 'bg-[#e8e2d9] text-[#1c1514]/30 cursor-not-allowed'
                }`}
              >
                Efetuar Pagamento &rarr;
              </button>

              {/* Trust Badges */}
              <div className="pt-6 space-y-2.5">
                <div className="flex items-center gap-2 text-[10px] text-[#1c1514]/60 justify-center">
                  <Check className="w-3 h-3 text-[#1c1514]" /> Pagamento 100% seguro
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#1c1514]/60 justify-center">
                  <Check className="w-3 h-3 text-[#1c1514]" /> Ambiente criptografado
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* NOVO ENDEREÇO MODAL */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1c1514]/60 backdrop-blur-sm" onClick={() => setIsAddressModalOpen(false)}></div>
          <div className="relative bg-[#fcfbf9] p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
            <button onClick={() => setIsAddressModalOpen(false)} className="absolute top-4 right-4 text-[#1c1514]/40 hover:text-[#83712b]">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-title text-xl mb-6 text-[#1c1514]">Cadastrar Novo Endereço</h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider block mb-1">CEP *</label>
                <input type="text" placeholder="00000-000" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
              </div>
              <div className="flex gap-4">
                <div className="flex-[3]">
                  <label className="text-[10px] font-semibold uppercase tracking-wider block mb-1">Rua / Avenida *</label>
                  <input type="text" placeholder="Ex: Rua das Flores" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-semibold uppercase tracking-wider block mb-1">Número *</label>
                  <input type="text" placeholder="123" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider block mb-1">Complemento</label>
                <input type="text" placeholder="Apto, Sala, Bloco..." className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
              </div>
              <div className="flex gap-4">
                <div className="flex-[2]">
                  <label className="text-[10px] font-semibold uppercase tracking-wider block mb-1">Bairro *</label>
                  <input type="text" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>
                <div className="flex-[2]">
                  <label className="text-[10px] font-semibold uppercase tracking-wider block mb-1">Cidade *</label>
                  <input type="text" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-semibold uppercase tracking-wider block mb-1">UF *</label>
                  <input type="text" placeholder="SP" className="w-full border-b border-[#e8e2d9] py-2 text-sm focus:outline-none focus:border-[#c5a880] bg-transparent" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsAddressModalOpen(false)}
              className="w-full mt-8 bg-[#1c1514] text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#83712b] transition-colors"
            >
              Salvar Endereço
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
