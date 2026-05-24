import React, { useState, useEffect } from 'react';
import { Trash2, Heart, X, Edit2, ChevronDown, Check, Calendar as CalendarIcon, Clock } from 'lucide-react';
import trilogiaImg from '../assets/trilogia_uvva_box.png';
import vineyardImg from '../assets/vineyard.png';
import arenitoImg from '../assets/arenito_dish.png';
import heroImg from '../assets/hero.png';

// Fallback images map
const imagesMap = {
  'trilogia_uvva_box.png': trilogiaImg,
  'vineyard.png': vineyardImg,
  'arenito_dish.png': arenitoImg,
  'hero.png': heroImg,
};

export default function CarrinhoPage({ setView, cartItems, updateCartItem, removeCartItem, clearCart, toggleAllCartItems }) {
  const [editingDateItem, setEditingDateItem] = useState(null); // stores the item object being edited
  const [tempDate, setTempDate] = useState('');
  const [tempTime, setTempTime] = useState('');

  // Handle modal open
  const openDateModal = (item) => {
    setEditingDateItem(item);
    if (item.date) {
      const [d, t] = item.date.split(' ');
      setTempDate(d);
      setTempTime(t);
    } else {
      setTempDate('');
      setTempTime('');
    }
  };

  const saveDateModal = () => {
    if (editingDateItem && tempDate && tempTime) {
      updateCartItem(editingDateItem.id, { date: `${tempDate} ${tempTime}` });
    }
    setEditingDateItem(null);
  };
  
  const allSelected = cartItems.length > 0 && cartItems.every(i => i.selected);
  const handleSelectAll = () => toggleAllCartItems(!allSelected);

  // Grouped Calculations (only for selected items)
  const selectedItems = cartItems.filter(i => i.selected);
  
  const products = selectedItems.filter(i => i.type === 'product');
  const productsSubtotal = products.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const hasProducts = products.length > 0;
  const frete = hasProducts ? (productsSubtotal > 299 ? 0 : 29.90) : 0;

  const tours = selectedItems.filter(i => i.type === 'tour');
  const restaurantes = selectedItems.filter(i => i.type === 'restaurante');
  const eventos = selectedItems.filter(i => i.type === 'evento');

  const toursTotal = tours.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const restaurantesTotal = restaurantes.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const eventosTotal = eventos.reduce((acc, i) => acc + (i.price * i.qty), 0);

  const finalTotal = productsSubtotal + frete + toursTotal + restaurantesTotal + eventosTotal;

  // Format Helpers
  const formatCurrency = (val) => `R$ ${val.toFixed(2).replace('.', ',')}`;

  const renderItemDetails = (item) => {
    return (
      <div className="flex flex-col gap-1">
        
        {/* Title with Tour Dropdown */}
        {item.type === 'tour' ? (
          <div className="relative group flex items-center gap-1 w-max">
            <span className="font-semibold text-sm text-[#1c1514]">{item.title}</span>
            <ChevronDown className="w-4 h-4 text-[#1c1514] group-hover:text-[#c5a880] transition-colors cursor-pointer" />
            <select 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              value={item.title}
              onChange={(e) => updateCartItem(item.id, { title: e.target.value })}
            >
              <option value="Experiência UVVA">Experiência UVVA</option>
              <option value="Tour Entusiasta Sincero">Tour Entusiasta Sincero</option>
              <option value="Visitação e Degustação">Visitação e Degustação</option>
            </select>
          </div>
        ) : (
          <span className="font-semibold text-sm text-[#1c1514]">{item.title}</span>
        )}
        
        <span className="text-xs text-[#1c1514]/60">{item.subtitle}</span>

        {/* Date / Time Edit (for everything except physical products) */}
        {item.date && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-[#1c1514] font-medium">{item.date}</span>
            <button onClick={() => openDateModal(item)} className="text-[#1c1514] hover:text-[#c5a880] transition-colors p-1" title="Alterar Data e Hora">
              <Edit2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="bg-white min-h-screen pt-32 pb-24 text-[#1c1514] font-section animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs tracking-wider mb-6">
          <span className="text-[#c5a880] cursor-pointer hover:underline" onClick={() => setView('home')}>Home</span>
          <span className="text-[#1c1514]/40 mx-2">/</span>
          <span className="text-[#1c1514]">Carrinho</span>
        </div>

        <h1 className="text-4xl font-title font-light mb-12">Carrinho de Compras</h1>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column: Cart Items */}
          <div className="w-full lg:flex-1">
            
            {/* Table Header using CSS Grid */}
            <div className="grid grid-cols-[40px_1fr_100px_120px_100px_60px] gap-4 items-center text-[10px] tracking-widest text-[#1c1514]/50 uppercase pb-4 border-b border-[#e8e2d9] mb-4 font-semibold">
              <div className="flex justify-center">
                <input 
                  type="checkbox" 
                  checked={allSelected} 
                  onChange={handleSelectAll}
                  className="w-3.5 h-3.5 accent-[#c5a880] cursor-pointer"
                />
              </div>
              <div>Produto/Serviço</div>
              <div className="text-center hidden sm:block">Preço</div>
              <div className="text-center">Quantidade</div>
              <div className="text-center hidden sm:block">Total</div>
              <div></div>
            </div>

            {/* Cart Items List */}
            {cartItems.length === 0 ? (
              <div className="py-12 text-center text-[#1c1514]/50">Seu carrinho está vazio.</div>
            ) : (
              <div className="flex flex-col gap-0">
                {cartItems.map((item, idx) => (
                  <div key={item.id} className={`grid grid-cols-[40px_1fr_100px_120px_100px_60px] gap-4 items-center py-6 ${idx !== cartItems.length - 1 ? 'border-b border-[#e8e2d9]/50' : ''} transition-opacity ${item.selected ? 'opacity-100' : 'opacity-40 grayscale-[50%]'}`}>
                    
                    {/* Checkbox */}
                    <div className="flex justify-center shrink-0">
                      <input 
                        type="checkbox" 
                        checked={item.selected}
                        onChange={() => updateCartItem(item.id, { selected: !item.selected })}
                        className="w-3.5 h-3.5 accent-[#c5a880] cursor-pointer rounded-sm"
                      />
                    </div>

                    {/* Image & Details */}
                    <div className="flex gap-4 items-center min-w-0">
                      <div className="w-[72px] h-[72px] shrink-0 bg-[#f9f8f6] flex items-center justify-center">
                        <img src={imagesMap[item.img]} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0 overflow-hidden">
                        {renderItemDetails(item)}
                      </div>
                    </div>

                    {/* Price (Desktop) */}
                    <div className="text-center text-xs text-[#1c1514]/70 hidden sm:block">
                      {formatCurrency(item.price)}
                    </div>

                    {/* Quantity */}
                    <div className="flex justify-center shrink-0">
                      <div className="flex items-center border border-[#e8e2d9] bg-transparent h-8 w-24">
                        <button 
                          onClick={() => updateCartItem(item.id, { qty: Math.max(1, item.qty - 1) })}
                          className="flex-1 h-full text-[#1c1514]/40 hover:text-[#c5a880] transition-colors font-semibold"
                        >-</button>
                        <span className="w-8 text-center text-xs text-[#1c1514]">{item.qty}</span>
                        <button 
                          onClick={() => updateCartItem(item.id, { qty: item.qty + 1 })}
                          className="flex-1 h-full text-[#1c1514]/40 hover:text-[#c5a880] transition-colors font-semibold"
                        >+</button>
                      </div>
                    </div>

                    {/* Total (Desktop) */}
                    <div className="text-center text-xs font-bold text-[#8a7b2e] hidden sm:block shrink-0">
                      {formatCurrency(item.price * item.qty)}
                    </div>

                    {/* Actions (Remove & Heart) */}
                    <div className="flex items-center justify-end gap-3 shrink-0 pr-2">
                      <button onClick={() => removeCartItem(item.id)} className="text-[#1c1514]/50 hover:text-red-500 transition-colors" title="Remover item">
                        <X className="w-4 h-4" />
                      </button>
                      <button className="text-[#1c1514]/50 hover:text-[#c5a880] transition-colors" title="Favoritar">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Cart Footer Actions */}
            <div className="flex justify-between items-center mt-8">
              <button onClick={() => setView('home')} className="text-xs text-[#c5a880] font-medium tracking-wider hover:underline flex items-center gap-2">
                &larr; Continuar Comprando
              </button>
              
              {cartItems.length > 0 && (
                <button onClick={clearCart} className="text-xs text-red-500/80 font-medium tracking-wider flex items-center gap-2 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" /> Limpar carrinho
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Resumo do Pedido */}
          <div className="w-full lg:w-[380px] shrink-0 bg-[#faf9f7] px-8 py-10 mt-8 lg:mt-0">
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
                      <span className="truncate pr-4">{t.title} {t.subtitle} x {t.qty}</span>
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
                      <span className="truncate pr-4">{r.title} {r.subtitle} x {r.qty}</span>
                      <span className="shrink-0">{formatCurrency(r.price * r.qty)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Eventos Section */}
              {eventos.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm border-b border-[#e8e2d9] pb-2">Eventos</h3>
                  {eventos.map(e => (
                    <div key={e.id} className="flex justify-between text-xs text-[#1c1514]/70">
                      <span>{e.title} {e.subtitle} x {e.qty}</span>
                      <span>{formatCurrency(e.price * e.qty)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Total Final */}
              <div className="pt-8 flex justify-between items-end mt-4">
                <span className="font-semibold text-base text-[#1c1514]">Total</span>
                <span className="font-bold text-xl text-[#8a7b2e]">{formatCurrency(finalTotal)}</span>
              </div>

              {/* Action */}
              <button 
                onClick={() => setView('checkout')}
                disabled={finalTotal === 0}
                className={`w-full font-semibold text-[11px] tracking-widest uppercase py-4 mt-6 transition-all duration-300 ${
                  finalTotal > 0 ? 'bg-[#83712b] hover:bg-[#6b5d23] text-white' : 'bg-[#e8e2d9] text-[#1c1514]/30 cursor-not-allowed'
                }`}
              >
                Finalizar Compra &rarr;
              </button>

              {/* Trust Badges */}
              <div className="pt-6 space-y-2.5">
                <div className="flex items-center gap-2 text-[10px] text-[#1c1514]/60 justify-center">
                  <Check className="w-3 h-3 text-[#1c1514]" /> Pagamento 100% seguro
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#1c1514]/60 justify-center">
                  <Check className="w-3 h-3 text-[#1c1514]" /> Frete calculado no checkout
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#1c1514]/60 justify-center">
                  <Check className="w-3 h-3 text-[#1c1514]" /> 30 dias para trocas
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CUSTOM DATE/TIME MODAL */}
      {editingDateItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1c1514]/60 backdrop-blur-sm" onClick={() => setEditingDateItem(null)}></div>
          <div className="relative bg-[#fcfbf9] p-8 max-w-sm w-full shadow-2xl animate-fade-in-up">
            <button onClick={() => setEditingDateItem(null)} className="absolute top-4 right-4 text-[#1c1514]/40 hover:text-[#c5a880]">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-title text-xl mb-2 text-[#1c1514]">Alterar Data e Hora</h3>
            <p className="text-xs text-[#1c1514]/60 mb-6">{editingDateItem.title}</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1c1514]/60 block mb-2 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" /> Nova Data
                </label>
                <input 
                  type="text" 
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                  placeholder="DD/MM/AAAA"
                  className="w-full border border-[#e8e2d9] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#c5a880]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1c1514]/60 block mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Novo Horário
                </label>
                <select 
                  value={tempTime}
                  onChange={(e) => setTempTime(e.target.value)}
                  className="w-full border border-[#e8e2d9] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#c5a880]"
                >
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="16:00">16:00</option>
                  <option value="19:00">19:00</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>
            </div>

            <button 
              onClick={saveDateModal}
              disabled={!tempDate || !tempTime}
              className="w-full mt-8 bg-[#1c1514] text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#c5a880] transition-colors disabled:opacity-50"
            >
              Confirmar Alteração
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
