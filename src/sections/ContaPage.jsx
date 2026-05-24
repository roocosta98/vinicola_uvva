import { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag, MapPin, Users, User, Archive, Heart, CreditCard,
  MessageCircle, LogOut, ChevronDown, ChevronRight, Trash2, Plus,
  Download, Truck, X, CheckCircle, Clock, XCircle, Star, ShoppingCart,
  Eye, EyeOff, Copy, Check, AlertCircle, Edit2, Save, ArrowRight,
  Package, Calendar, MoreVertical, Filter, Search, ChevronsRight
} from 'lucide-react';
import trilogiaImg from '../assets/trilogia_uvva_box.png';

// ─── Data Mocks ──────────────────────────────────────────────────────────────
const USER_DATA = {
  name: 'Rodrigo Costa',
  email: 'roocosta98@gmail.com',
  cpf: '465.411.9**-**',
  phone: '+55 (77) 99134-0102',
};

const INITIAL_ORDERS = [
  {
    id: 'UVVA-990909-V',
    type: 'wine',
    category: 'Vinhos & Espumantes',
    number: '99090909',
    qty: 4,
    date: '13:45, 10/11/2026',
    status: 'active',
    statusLabel: 'A Caminho',
    total: 9999.00,
    deliveryDate: 'Sexta 11/11/2026',
    deliveryPlace: 'Casa',
    present: false,
    products: [
      { name: 'Trilogia UVVA', sub: 'Vinho Tinto Seco', img: trilogiaImg },
      { name: 'Trilogia UVVA', sub: 'Vinho Tinto Seco', img: trilogiaImg },
      { name: 'Trilogia UVVA', sub: 'Vinho Tinto Seco', img: trilogiaImg },
      { name: 'Trilogia UVVA', sub: 'Vinho Tinto Seco', img: trilogiaImg },
    ]
  },
  {
    id: 'UVVA-990909-T',
    type: 'tour',
    category: 'Tours',
    number: '99090909',
    qty: 2,
    qtyLabel: '2 Reservas',
    date: '13:45, 10/11/2026',
    status: 'pending',
    statusLabel: 'Aguardando',
    total: 9999.00,
    deliveryDate: 'Sexta 11/11/2025',
    present: false,
    members: [
      { name: 'Rodrigo da Costa Tagashira', cpf: '465.411.9***-**', role: 'Filho(a)', bday: '27/03/1998' },
      { name: 'Rodrigo da Costa Tagashira', cpf: '465.411.9***-**', role: 'Cônjuge', bday: '27/03/1998' },
    ]
  },
  {
    id: 'UVVA-990909-R',
    type: 'restaurante',
    category: 'Restaurante Arenito',
    number: '99090909',
    qty: 2,
    qtyLabel: '2 Reservas',
    date: '13:45, 10/11/2026',
    status: 'pending',
    statusLabel: 'Aguardando',
    total: 9999.00,
    deliveryDate: 'Sexta 11/11/2026',
    present: false,
    members: [
      { name: 'Rodrigo da Costa Tagashira', cpf: '465.411.9***-**', role: '', bday: '27/03/1998' },
      { name: 'Rodrigo da Costa Tagashira', cpf: '465.411.9***-**', role: '', bday: '27/03/1998' },
    ]
  },
];

const ARCHIVED_ORDERS = [
  {
    id: 'ARCH-990909-V',
    type: 'wine',
    category: 'Vinhos & Espumantes',
    number: '99090909',
    qty: 4,
    date: '13:45, 10/11/2026',
    status: 'done',
    statusLabel: 'Concluído',
    total: 9999.00,
    deliveryDate: 'Sexta 11/11/2026',
    deliveryPlace: 'Casa',
    present: false,
    products: [
      { name: 'Trilogia UVVA', sub: 'Vinho Tinto Seco', img: trilogiaImg },
      { name: 'Trilogia UVVA', sub: 'Vinho Tinto Seco', img: trilogiaImg },
      { name: 'Trilogia UVVA', sub: 'Vinho Tinto Seco', img: trilogiaImg },
      { name: 'Trilogia UVVA', sub: 'Vinho Tinto Seco', img: trilogiaImg },
    ]
  },
  {
    id: 'ARCH-990909-T',
    type: 'tour',
    category: 'Tours',
    number: '99090909',
    qty: 2,
    qtyLabel: '2 Reservas',
    date: '13:45, 10/11/2026',
    status: 'cancelled',
    statusLabel: 'Cancelado',
    total: 9999.00,
    deliveryDate: 'Sexta 11/11/2025',
    present: false,
    members: [
      { name: 'Rodrigo da Costa Tagashira', cpf: '465.411.9***-**', role: 'Filho(a)', bday: '27/03/1998' },
      { name: 'Rodrigo da Costa Tagashira', cpf: '465.411.9***-**', role: 'Cônjuge', bday: '27/03/1998' },
    ]
  },
  {
    id: 'ARCH-990909-R',
    type: 'restaurante',
    category: 'Restaurante Arenito',
    number: '99090909',
    qty: 2,
    qtyLabel: '2 Reservas',
    date: '13:45, 10/11/2026',
    status: 'done',
    statusLabel: 'Concluído',
    total: 9999.00,
    deliveryDate: 'Sexta 11/11/2026',
    present: false,
    members: [
      { name: 'Rodrigo da Costa Tagashira', cpf: '465.411.9***-**', role: '', bday: '27/03/1998' },
      { name: 'Rodrigo da Costa Tagashira', cpf: '465.411.9***-**', role: '', bday: '27/03/1998' },
    ]
  },
];

const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    alias: 'Casa',
    cep: '06764-040',
    street: 'Rua José Maciel Neto',
    number: '215',
    complement: '186D',
    neighborhood: 'Chácara Agrindus',
    state: 'São Paulo',
    city: 'Taboão da Serra',
    isOpen: true,
  },
  {
    id: 'addr-2',
    alias: 'Trabalho',
    cep: '06764-040',
    street: 'Rua José Maciel Neto',
    number: '215',
    complement: '186D',
    neighborhood: 'Chácara Agrindus',
    state: 'São Paulo',
    city: 'Taboão da Serra',
    isOpen: false,
  },
];

const INITIAL_MEMBERS = [
  { id: 'm1', name: 'Rodrigo da Costa Tagashira', cpf: '465.***.***.***-**', role: 'Filho(a)', bday: '27/03/1998' },
  { id: 'm2', name: 'Rodrigo da Costa Tagashira', cpf: '465.***.***.***-**', role: 'Filho(a)', bday: '27/03/1998' },
  { id: 'm3', name: 'Rodrigo da Costa Tagashira', cpf: '465.***.***.***-**', role: 'Filho(a)', bday: '27/03/1998' },
];

const SAVED_PRODUCTS = Array(9).fill(null).map((_, i) => ({
  id: `sp-${i}`,
  name: 'Trilogia UVVA',
  sub: 'Vinho Tinto Seco',
  price: 717.00,
  img: trilogiaImg,
}));

const INITIAL_PAYMENTS = {
  cards: [
    { id: 'c1', type: 'credit', brand: 'VISA', last4: '4242', holder: 'RODRIGO C TAGASHIRA', expiry: '12/28', isDefault: true },
    { id: 'c2', type: 'debit', brand: 'MASTER', last4: '8801', holder: 'RODRIGO C TAGASHIRA', expiry: '09/27', isDefault: false },
  ],
  pix: [
    { id: 'p1', type: 'CPF', key: '465.411.9**-**', isDefault: true },
    { id: 'p2', type: 'E-mail', key: 'rooc***@gmail.com', isDefault: false },
  ],
};

// ─── Helper Components ────────────────────────────────────────────────────────

// ─── Tracking Modal ──────────────────────────────────────────────────────────
const TRACKING_STEPS = [
  { key: 'pedido',       label: 'Pedido Realizado',      icon: '📋', desc: 'Seu pedido foi recebido com sucesso.' },
  { key: 'confirmado',   label: 'Pagamento Confirmado',   icon: '✅', desc: 'Pagamento aprovado e pedido confirmado.' },
  { key: 'preparacao',   label: 'Em Preparação',          icon: '📦', desc: 'Seu pedido está sendo preparado na vinícola.' },
  { key: 'enviado',      label: 'Enviado',                icon: '🚚', desc: 'Seu pedido foi enviado à transportadora.' },
  { key: 'transito',     label: 'Em Trânsito',            icon: '🛣️', desc: 'O pacote está a caminho do seu endereço.' },
  { key: 'entregue',     label: 'Entregue',               icon: '🏠', desc: 'Pedido entregue com sucesso!' },
];

const TRACKING_HISTORY = [
  { date: '11/11/2026 08:30', local: 'Taboão da Serra – SP',    event: 'Objeto saiu para entrega ao destinatário' },
  { date: '11/11/2026 06:15', local: 'São Paulo – SP',          event: 'Objeto em trânsito — de São Paulo/SP para Taboão da Serra/SP' },
  { date: '10/11/2026 22:00', local: 'São Paulo – SP',          event: 'Objeto encaminhado para o Centro de Distribuição' },
  { date: '10/11/2026 14:45', local: 'Lençóis – BA (Vinícola)', event: 'Objeto postado' },
  { date: '10/11/2026 13:58', local: 'Lençóis – BA (Vinícola)', event: 'Pedido coletado pela transportadora' },
  { date: '10/11/2026 13:50', local: 'Vinícola UVVA',           event: 'Pedido embalado e pronto para coleta' },
  { date: '10/11/2026 13:45', local: 'Vinícola UVVA',           event: 'Pagamento confirmado — pedido enviado para separação' },
  { date: '10/11/2026 13:45', local: 'Online',                  event: 'Pedido realizado com sucesso' },
];

function RastrearModal({ order, onClose }) {
  // order status: active = step index 4 (Em Trânsito), pending = 1 (Pagamento Confirmado)
  const currentStep = order.status === 'active' ? 4 : order.status === 'done' ? 5 : 1;
  const [copied, setCopied] = useState(false);
  const trackCode = 'BR' + order.number + 'UVVA';

  // Prevent scroll behind modal
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function copyCode() {
    navigator.clipboard.writeText(trackCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#1c1514]/70 backdrop-blur-sm p-4">
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-[fadeIn_0.25s_ease]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e2d9] bg-[#1c1514] shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold mb-0.5">Rastrear Compra</p>
            <h3 className="font-title text-lg text-white font-light">Ordem #{order.number}</h3>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors cursor-pointer p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">

          {/* Tracking Code */}
          <div className="px-6 py-5 bg-[#f5f2ee] border-b border-[#e8e2d9]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-[#1c1514]/50 mb-1">Código de Rastreamento</p>
                <p className="font-mono text-base font-bold text-[#1c1514] tracking-widest">{trackCode}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={copyCode}
                  className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold px-3 py-2 border transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'border-[#c5a880] text-[#8a7b2e] hover:bg-[#8a7b2e] hover:text-white'
                  }`}
                >
                  {copied ? <><Check className="w-3 h-3" /> Copiado!</> : <><Copy className="w-3 h-3" /> Copiar</>}
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
              <span className="text-[11px] text-[#1c1514]/60"><strong className="text-[#1c1514]/80">Transportadora:</strong> Correios SEDEX</span>
              <span className="text-[11px] text-[#1c1514]/60"><strong className="text-[#1c1514]/80">Previsão de Entrega:</strong> {order.deliveryDate || 'Em breve'}</span>
              <span className="text-[11px] text-[#1c1514]/60"><strong className="text-[#1c1514]/80">Destino:</strong> {order.deliveryPlace || 'Endereço cadastrado'}</span>
            </div>
          </div>

          {/* Progress Timeline (horizontal on md+) */}
          <div className="px-6 py-8">
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#1c1514]/40 mb-6">Progresso do Pedido</p>

            {/* Steps */}
            <div className="relative">
              {/* Connector line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-[#e8e2d9] ml-px" style={{ top: '16px', bottom: '16px' }} />
              {/* Filled connector */}
              <div
                className="absolute left-4 top-0 w-px bg-[#8a7b2e] ml-px transition-all duration-1000"
                style={{ top: '16px', height: `calc(${(currentStep / (TRACKING_STEPS.length - 1)) * 100}% - 16px)` }}
              />

              <div className="flex flex-col gap-0">
                {TRACKING_STEPS.map((step, idx) => {
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;
                  const isPending = idx > currentStep;

                  return (
                    <div key={step.key} className="flex items-start gap-4 pb-6 relative">
                      {/* Circle */}
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm transition-all duration-500 ${
                        isDone ? 'bg-[#8a7b2e] shadow-[0_0_0_3px_rgba(138,123,46,0.15)]'
                               : isCurrent ? 'bg-[#1c1514] shadow-[0_0_0_4px_rgba(28,21,20,0.12)] ring-2 ring-[#c5a880]'
                               : 'bg-[#f0ede8] border-2 border-[#e8e2d9]'
                      }`}>
                        {isDone ? (
                          <Check className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <span className={`text-xs ${isCurrent ? 'text-[#c5a880]' : 'text-[#1c1514]/30'}`}>{step.icon}</span>
                        )}
                        {isCurrent && (
                          <span className="absolute inset-0 rounded-full animate-ping bg-[#c5a880]/20" />
                        )}
                      </div>

                      {/* Text */}
                      <div className="pt-1">
                        <p className={`text-xs font-bold uppercase tracking-wider ${
                          isDone ? 'text-[#8a7b2e]' : isCurrent ? 'text-[#1c1514]' : 'text-[#1c1514]/30'
                        }`}>
                          {step.label}
                          {isCurrent && (
                            <span className="ml-2 text-[9px] font-bold uppercase tracking-widest bg-[#c5a880]/15 text-[#8a7b2e] px-1.5 py-0.5 align-middle">
                              Atual
                            </span>
                          )}
                        </p>
                        <p className={`text-[11px] mt-0.5 ${
                          isPending ? 'text-[#1c1514]/20' : 'text-[#1c1514]/50'
                        }`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Event History */}
          <div className="px-6 pb-8 border-t border-[#e8e2d9]">
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#1c1514]/40 mb-5 pt-6">Histórico Detalhado</p>
            <div className="flex flex-col gap-0 border border-[#e8e2d9]">
              {TRACKING_HISTORY.map((evt, i) => (
                <div key={i} className={`flex flex-col sm:flex-row sm:items-start gap-y-1 gap-x-4 px-4 py-3 ${
                  i < TRACKING_HISTORY.length - 1 ? 'border-b border-[#f0ede8]' : ''
                } ${ i === 0 ? 'bg-[#f5f2ee]' : '' }`}>
                  <div className="shrink-0 sm:w-36">
                    <p className={`text-[10px] font-mono font-semibold ${ i === 0 ? 'text-[#8a7b2e]' : 'text-[#1c1514]/40' }`}>
                      {evt.date}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-semibold ${ i === 0 ? 'text-[#1c1514]' : 'text-[#1c1514]/60' }`}>
                      {evt.event}
                    </p>
                    <p className="text-[10px] text-[#1c1514]/40 mt-0.5">{evt.local}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#e8e2d9] shrink-0 bg-[#f5f2ee] flex items-center justify-between gap-4">
          <p className="text-[10px] text-[#1c1514]/40">Atualizado automaticamente a cada hora</p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1c1514] text-white text-[11px] uppercase tracking-widest font-semibold hover:bg-[#2d2220] transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, label }) {
  const map = {
    active: 'bg-[#e8a838]/15 text-[#e8a838] border border-[#e8a838]/30',
    pending: 'bg-amber-500/15 text-amber-600 border border-amber-500/30',
    done: 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30',
    cancelled: 'bg-red-500/15 text-red-600 border border-red-500/30',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm ${map[status] || map.pending}`}>
      {status === 'active' && <Truck className="w-2.5 h-2.5" />}
      {status === 'pending' && <Clock className="w-2.5 h-2.5" />}
      {status === 'done' && <CheckCircle className="w-2.5 h-2.5" />}
      {status === 'cancelled' && <XCircle className="w-2.5 h-2.5" />}
      {label}
    </span>
  );
}

// ─── Tab: Minhas Compras ──────────────────────────────────────────────────────
function MinhasCompras({ orders, setOrders, archivedOrders, setArchivedOrders }) {
  const [filter, setFilter] = useState('all');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [cancelConfirmId, setCancelConfirmId] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);

  const filterTabs = [
    { key: 'all', label: 'Todas as Compras' },
    { key: 'wine', label: 'Vinhos' },
    { key: 'tour', label: 'Tours' },
    { key: 'restaurante', label: 'Restaurante Arenito' },
  ];

  const filtered = filter === 'all' ? orders : orders.filter(o => o.type === filter);

  function handleCancel(order) {
    setOrders(prev => prev.filter(o => o.id !== order.id));
    setArchivedOrders(prev => [{ ...order, status: 'cancelled', statusLabel: 'Cancelado' }, ...prev]);
    setCancelConfirmId(null);
    setOpenMenuId(null);
  }

  return (
    <div>
      <h2 className="text-2xl font-title font-light text-[#1c1514] mb-6">Minhas Compras</h2>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filterTabs.map(t => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`text-[10px] uppercase tracking-widest font-semibold px-4 py-2 border transition-all duration-200 cursor-pointer ${
              filter === t.key
                ? 'bg-[#1c1514] text-white border-[#1c1514]'
                : 'bg-white text-[#1c1514]/60 border-[#e8e2d9] hover:border-[#1c1514]/40'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-6">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#1c1514]/40">
            <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhuma compra encontrada.</p>
          </div>
        )}
        {filtered.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
            cancelConfirmId={cancelConfirmId}
            setCancelConfirmId={setCancelConfirmId}
            handleCancel={handleCancel}
            showActions
            onTrack={() => setTrackingOrder(order)}
          />
        ))}
      </div>

      {/* Tracking Modal */}
      {trackingOrder && (
        <RastrearModal order={trackingOrder} onClose={() => setTrackingOrder(null)} />
      )}

      {/* Cancel Confirm Modal */}
      {cancelConfirmId && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1c1514]/60 backdrop-blur-sm">
          <div className="bg-white max-w-sm w-full mx-4 p-8 shadow-2xl animate-[fadeIn_0.2s_ease]">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
              <h3 className="text-base font-title font-semibold text-[#1c1514]">Cancelar Pedido</h3>
            </div>
            <p className="text-sm text-[#1c1514]/70 mb-6 leading-relaxed">
              Tem certeza que deseja cancelar este pedido? O item será movido para <strong>Pedidos Arquivados</strong>.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelConfirmId(null)}
                className="flex-1 py-3 border border-[#e8e2d9] text-[#1c1514] text-xs font-semibold uppercase tracking-wider hover:bg-[#f5f2ee] transition-colors cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={() => handleCancel(orders.find(o => o.id === cancelConfirmId))}
                className="flex-1 py-3 bg-red-500 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-600 transition-colors cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Order Card (shared) ──────────────────────────────────────────────────────
function OrderCard({ order, openMenuId, setOpenMenuId, cancelConfirmId, setCancelConfirmId, handleCancel, showActions = false, onTrack }) {
  const isMenuOpen = openMenuId === order.id;

  return (
    <div className="border border-[#e8e2d9] bg-white">
      {/* Card Header */}
      <div className="p-5 border-b border-[#f0ede8]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#1c1514]/40 font-semibold mb-1">{order.category}</p>
            <h3 className="text-base font-title font-semibold text-[#1c1514]">Ordem de Compra # {order.number}</h3>
            <p className="text-[11px] text-[#1c1514]/50 mt-0.5">
              {order.qtyLabel || `${order.qty} Produtos`} &nbsp;|&nbsp; {order.date}
            </p>
          </div>
          {showActions && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  alert(`Invoice #${order.number} gerada e enviada ao seu e-mail!`);
                }}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 border border-[#e8e2d9] px-3 py-2 hover:border-[#c5a880] hover:text-[#c5a880] transition-all cursor-pointer"
              >
                <Download className="w-3 h-3" />
                Baixar
              </button>
              {/* Three-dot menu */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenuId(isMenuOpen ? null : order.id)}
                  className="w-8 h-8 flex items-center justify-center border border-[#e8e2d9] text-[#1c1514]/40 hover:text-[#1c1514] hover:border-[#1c1514]/30 transition-all cursor-pointer"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {/* Floating Dropdown Menu */}
                {isMenuOpen && (
                  <>
                    {/* Fixed invisible backdrop to capture clicks outside */}
                    <div 
                      className="fixed inset-0 z-40 cursor-default" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(null);
                      }}
                    />
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#e8e2d9] shadow-xl z-50 animate-[fadeIn_0.15s_ease]">
                      <button
                        onClick={() => {
                          alert(`Invoice #${order.number} gerada e enviada ao seu e-mail!`);
                          setOpenMenuId(null);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-xs text-[#1c1514] hover:bg-[#f5f2ee] transition-colors cursor-pointer text-left"
                      >
                        <Download className="w-3.5 h-3.5 text-[#c5a880]" />
                        Baixar Invoice
                      </button>
                      <div className="h-px bg-[#f0ede8]" />
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          if (onTrack) onTrack();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-xs text-[#1c1514] hover:bg-[#f5f2ee] transition-colors cursor-pointer text-left"
                      >
                        <Truck className="w-3.5 h-3.5 text-[#c5a880]" />
                        Rastrear Compra
                      </button>
                      <div className="h-px bg-[#f0ede8]" />
                      <button
                        onClick={() => {
                          setCancelConfirmId(order.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-xs text-red-500 hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Cancelar Compra
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {!showActions && (
            <button
              onClick={() => alert(`Invoice #${order.number} gerada!`)}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 border border-[#e8e2d9] px-3 py-2 hover:border-[#c5a880] hover:text-[#c5a880] transition-all cursor-pointer shrink-0"
            >
              <Download className="w-3 h-3" />
              Baixar Invoice
            </button>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-[#f0ede8]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#1c1514]/40 uppercase tracking-wider font-semibold">Status:</span>
            <StatusBadge status={order.status} label={order.statusLabel} />
          </div>
          <div className="h-3 w-px bg-[#e8e2d9] hidden sm:block" />
          <span className="text-[10px] text-[#1c1514]/60">
            <strong className="text-[#1c1514]/80">Valor total:</strong> R${order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          {order.deliveryDate && (
            <>
              <div className="h-3 w-px bg-[#e8e2d9] hidden sm:block" />
              <span className="text-[10px] text-[#1c1514]/60">
                <strong className="text-[#1c1514]/80">{order.type === 'wine' ? 'Data de Entrega:' : 'Data da Reserva:'}</strong> {order.deliveryDate}
              </span>
            </>
          )}
          {order.deliveryPlace && (
            <>
              <div className="h-3 w-px bg-[#e8e2d9] hidden sm:block" />
              <span className="text-[10px] text-[#1c1514]/60">
                <strong className="text-[#1c1514]/80">Entregar em:</strong> {order.deliveryPlace}
              </span>
            </>
          )}
          <div className="h-3 w-px bg-[#e8e2d9] hidden sm:block" />
          <span className="text-[10px] text-[#1c1514]/60">
            <strong className="text-[#1c1514]/80">Presente:</strong> {order.present ? 'Sim' : 'Não'}
          </span>
        </div>
      </div>

      {/* Products */}
      {order.products && (
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-[#1c1514]/50 mb-3">Produtos:</p>
          <div className="flex flex-wrap gap-4">
            {order.products.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-14 h-14 bg-[#f5f2ee] overflow-hidden shrink-0">
                  <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1c1514]">{p.name}</p>
                  <p className="text-[10px] text-[#1c1514]/50">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Members (Tour/Restaurante) */}
      {order.members && (
        <div className="divide-y divide-[#f0ede8]">
          {order.members.map((m, i) => (
            <div key={i} className="px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-1">
              <span className="text-xs font-semibold text-[#1c1514] min-w-[180px]">{m.name}</span>
              <span className="text-[11px] text-[#1c1514]/50">CPF: {m.cpf}</span>
              {m.role && <span className="text-[11px] text-[#1c1514]/60">{m.role}</span>}
              <span className="text-[11px] text-[#1c1514]/50 ml-auto">Data de Nascimento: {m.bday}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tab: Endereços ───────────────────────────────────────────────────────────
function Enderecos() {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ alias: '', cep: '', street: '', number: '', complement: '', neighborhood: '', state: '', city: '' });

  function toggleOpen(id) {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, isOpen: !a.isOpen } : a));
  }

  function handleSave(id, data) {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  }

  function handleDelete(id) {
    setAddresses(prev => prev.filter(a => a.id !== id));
  }

  function handleAddNew(e) {
    e.preventDefault();
    const id = `addr-${Date.now()}`;
    setAddresses(prev => [...prev, { ...newAddr, id, isOpen: false }]);
    setNewAddr({ alias: '', cep: '', street: '', number: '', complement: '', neighborhood: '', state: '', city: '' });
    setShowNewForm(false);
  }

  return (
    <div>
      <h2 className="text-2xl font-title font-light text-[#1c1514] mb-6">Endereços</h2>
      <div className="flex flex-col gap-4">
        {addresses.map(addr => (
          <AddressAccordion key={addr.id} addr={addr} onToggle={() => toggleOpen(addr.id)} onSave={handleSave} onDelete={handleDelete} />
        ))}
      </div>

      {showNewForm && (
        <form onSubmit={handleAddNew} className="mt-4 border border-[#e8e2d9] bg-white p-6">
          <h4 className="text-sm font-semibold text-[#1c1514] mb-5 uppercase tracking-wider">Novo Endereço</h4>
          <AddressFields data={newAddr} onChange={(k, v) => setNewAddr(prev => ({ ...prev, [k]: v }))} />
          <div className="flex gap-3 mt-4">
            <button type="button" onClick={() => setShowNewForm(false)} className="px-6 py-2.5 border border-[#e8e2d9] text-[11px] text-[#1c1514]/60 uppercase tracking-wider hover:bg-[#f5f2ee] transition-colors cursor-pointer">Cancelar</button>
            <button type="submit" className="px-6 py-2.5 bg-[#8a7b2e] text-white text-[11px] uppercase tracking-wider hover:bg-[#6b5f23] transition-colors cursor-pointer">Salvar</button>
          </div>
        </form>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setShowNewForm(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#8a7b2e] text-white text-[11px] uppercase tracking-widest font-semibold hover:bg-[#6b5f23] transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Cadastrar novo endereço
        </button>
      </div>
    </div>
  );
}

function AddressFields({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Apelido do Endereço</label>
        <input value={data.alias} onChange={e => onChange('alias', e.target.value)} placeholder="Casa" className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">CEP *</label>
        <input value={data.cep} onChange={e => onChange('cep', e.target.value)} placeholder="00000-000" className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Endereço *</label>
        <input value={data.street} onChange={e => onChange('street', e.target.value)} placeholder="Rua, Avenida..." className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Número *</label>
          <input value={data.number} onChange={e => onChange('number', e.target.value)} placeholder="Nº" className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Complemento</label>
          <input value={data.complement} onChange={e => onChange('complement', e.target.value)} placeholder="Apto, Bloco..." className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Bairro *</label>
          <input value={data.neighborhood} onChange={e => onChange('neighborhood', e.target.value)} placeholder="Bairro" className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Estado *</label>
          <input value={data.state} onChange={e => onChange('state', e.target.value)} placeholder="Estado" className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Cidade</label>
          <input value={data.city} onChange={e => onChange('city', e.target.value)} placeholder="Cidade" className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
        </div>
      </div>
    </div>
  );
}

function AddressAccordion({ addr, onToggle, onSave, onDelete }) {
  const [draft, setDraft] = useState({ ...addr });
  const shortAddr = `${addr.street}, ${addr.number} – Apto ${addr.complement} – ${addr.city} / ${addr.state.slice(0, 2).toUpperCase()} – ${addr.cep}`;
  return (
    <div className="border border-[#e8e2d9] bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={onToggle} className="flex items-center gap-4 flex-1 text-left cursor-pointer">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1c1514] min-w-[60px]">{addr.alias}</span>
          <span className="text-[11px] text-[#1c1514]/50 truncate">{shortAddr}</span>
          {addr.isOpen ? <ChevronDown className="w-4 h-4 text-[#1c1514]/40 ml-auto shrink-0" /> : <ChevronRight className="w-4 h-4 text-[#1c1514]/40 ml-auto shrink-0" />}
        </button>
        <button onClick={() => onDelete(addr.id)} className="ml-4 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer rounded">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      {addr.isOpen && (
        <div className="px-5 pb-5 border-t border-[#f0ede8] pt-5">
          <AddressFields data={draft} onChange={(k, v) => setDraft(prev => ({ ...prev, [k]: v }))} />
          <div className="flex justify-end mt-4">
            <button onClick={() => onSave(addr.id, draft)} className="px-6 py-2.5 bg-[#8a7b2e] text-white text-[11px] uppercase tracking-wider hover:bg-[#6b5f23] transition-colors cursor-pointer">Salvar</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Membros da Família ──────────────────────────────────────────────────
function MembrosFamily() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', cpf: '', bday: '', role: '' });

  function handleDelete(id) {
    setMembers(prev => prev.filter(m => m.id !== id));
  }

  function handleAdd(e) {
    e.preventDefault();
    setMembers(prev => [...prev, { ...newMember, id: `m-${Date.now()}` }]);
    setNewMember({ name: '', cpf: '', bday: '', role: '' });
    setShowForm(false);
  }

  return (
    <div>
      <h2 className="text-2xl font-title font-light text-[#1c1514] mb-6">Membros da Família</h2>
      <div className="border border-[#e8e2d9] bg-white divide-y divide-[#f0ede8]">
        {members.map(m => (
          <div key={m.id} className="flex flex-wrap items-center gap-x-6 gap-y-1 px-5 py-4">
            <span className="text-xs font-semibold text-[#1c1514] min-w-[180px]">{m.name}</span>
            <span className="text-[11px] text-[#1c1514]/50">CPF: {m.cpf}</span>
            {m.role && <span className="text-[11px] text-[#1c1514]/60">{m.role}</span>}
            <span className="text-[11px] text-[#1c1514]/50 flex-1">Data de Nascimento: {m.bday}</span>
            <button onClick={() => handleDelete(m.id)} className="text-red-400 hover:text-red-600 transition-colors cursor-pointer p-1">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {members.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-[#1c1514]/40">Nenhum membro cadastrado.</div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#8a7b2e] text-white text-[11px] uppercase tracking-widest font-semibold hover:bg-[#6b5f23] transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Cadastrar novo usuário
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mt-4 border border-[#e8e2d9] bg-white p-6 space-y-4">
          <h4 className="text-sm font-semibold text-[#1c1514] uppercase tracking-wider">Novo Membro</h4>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Nome: *</label>
            <input value={newMember.name} onChange={e => setNewMember(p => ({ ...p, name: e.target.value }))} placeholder="Nome do membro" required className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">CPF: *</label>
            <input value={newMember.cpf} onChange={e => setNewMember(p => ({ ...p, cpf: e.target.value }))} placeholder="000.000.000-00" required className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Data de Nascimento:</label>
              <input type="date" value={newMember.bday} onChange={e => setNewMember(p => ({ ...p, bday: e.target.value }))} className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Vínculo</label>
              <select value={newMember.role} onChange={e => setNewMember(p => ({ ...p, role: e.target.value }))} className="w-full border border-[#e8e2d9] bg-white text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]">
                <option value="">Selecione</option>
                <option>Cônjuge</option>
                <option>Filho(a)</option>
                <option>Pai / Mãe</option>
                <option>Irmão(ã)</option>
                <option>Outro</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-[#e8e2d9] text-[11px] text-[#1c1514]/60 uppercase tracking-wider hover:bg-[#f5f2ee] transition-colors cursor-pointer">Cancelar</button>
            <button type="submit" className="px-6 py-2.5 bg-[#8a7b2e] text-white text-[11px] uppercase tracking-wider hover:bg-[#6b5f23] transition-colors cursor-pointer">Salvar</button>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── Tab: Usuário & Login ─────────────────────────────────────────────────────
function UsuarioLogin() {
  const [form, setForm] = useState({ ...USER_DATA });
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState('');

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <h2 className="text-2xl font-title font-light text-[#1c1514] mb-6">Usuário & Login</h2>
      <form onSubmit={handleSave} className="border border-[#e8e2d9] bg-white p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Nome Completo</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">E-mail</label>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">CPF</label>
            <input value={form.cpf} readOnly className="w-full border border-[#e8e2d9] bg-[#f5f2ee] text-sm text-[#1c1514]/50 px-4 py-3 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Telefone</label>
            <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
          </div>
        </div>

        <div className="border-t border-[#f0ede8] pt-5">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#1c1514]/40 mb-4">Alterar Senha</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Nova Senha</label>
              <input type={showPass ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 pr-10 focus:outline-none focus:border-[#c5a880]" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-[38px] text-[#1c1514]/30 hover:text-[#c5a880] transition-colors cursor-pointer">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-[#8a7b2e] text-white text-[11px] uppercase tracking-widest hover:bg-[#6b5f23] transition-colors cursor-pointer">
            {saved ? <><Check className="w-3.5 h-3.5" /> Salvo!</> : <><Save className="w-3.5 h-3.5" /> Salvar Alterações</>}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Tab: Pedidos Arquivados ──────────────────────────────────────────────────
function PedidosArquivados({ archivedOrders }) {
  const [filter, setFilter] = useState('all');

  const filterTabs = [
    { key: 'all', label: 'Todas as Compras' },
    { key: 'wine', label: 'Vinhos' },
    { key: 'tour', label: 'Tours' },
    { key: 'restaurante', label: 'Restaurante Arenito' },
  ];

  const filtered = filter === 'all' ? archivedOrders : archivedOrders.filter(o => o.type === filter);

  return (
    <div>
      <h2 className="text-2xl font-title font-light text-[#1c1514] mb-6">Pedidos Arquivados</h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {filterTabs.map(t => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`text-[10px] uppercase tracking-widest font-semibold px-4 py-2 border transition-all duration-200 cursor-pointer ${
              filter === t.key
                ? 'bg-[#1c1514] text-white border-[#1c1514]'
                : 'bg-white text-[#1c1514]/60 border-[#e8e2d9] hover:border-[#1c1514]/40'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#1c1514]/40">
            <Archive className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhum pedido arquivado.</p>
          </div>
        )}
        {filtered.map(order => (
          <OrderCard key={order.id} order={order} showActions={false} />
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Produtos Salvos ─────────────────────────────────────────────────────
function ProdutosSalvos() {
  const [saved, setSaved] = useState(SAVED_PRODUCTS);
  const [page, setPage] = useState(1);
  const perPage = 9;
  const totalPages = Math.ceil(saved.length / perPage);
  const paginated = saved.slice((page - 1) * perPage, page * perPage);

  function handleRemove(id) {
    setSaved(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div>
      <h2 className="text-2xl font-title font-light text-[#1c1514] mb-8">Produtos Salvos</h2>

      {saved.length === 0 && (
        <div className="text-center py-16 text-[#1c1514]/40">
          <Heart className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Nenhum produto salvo.</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {paginated.map(p => (
          <div key={p.id} className="group relative bg-white border border-[#e8e2d9] hover:border-[#c5a880] transition-all duration-300">
            <div className="relative overflow-hidden bg-[#f5f2ee] aspect-square">
              <img src={p.img} alt={p.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
              <button
                onClick={() => handleRemove(p.id)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm text-red-400 hover:text-red-600 hover:bg-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-red-400" />
              </button>
            </div>
            <div className="p-4">
              <h4 className="text-xs font-bold text-[#1c1514] font-title">{p.name}</h4>
              <p className="text-[10px] text-[#1c1514]/50 mt-0.5">{p.sub}</p>
              <p className="text-sm font-bold text-[#8a7b2e] mt-2">R${p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              <button className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 bg-[#1c1514] text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-[#8a7b2e] transition-colors cursor-pointer">
                <ShoppingCart className="w-3 h-3" /> Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e8e2d9]">
          <p className="text-[11px] text-[#1c1514]/50">01 – {Math.min(page * perPage, saved.length)} of {saved.length}</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="w-8 h-8 flex items-center justify-center border border-[#e8e2d9] text-[#1c1514]/40 hover:border-[#c5a880] disabled:opacity-30 transition-all cursor-pointer">
              <ChevronsRight className="w-3 h-3 rotate-180" />
            </button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="w-8 h-8 flex items-center justify-center border border-[#e8e2d9] text-[#1c1514]/40 hover:border-[#c5a880] disabled:opacity-30 transition-all cursor-pointer">
              <ChevronRight className="w-3 h-3 rotate-180" />
            </button>
            <span className="text-[11px] text-[#1c1514]/60 px-3">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-8 h-8 flex items-center justify-center border border-[#e8e2d9] text-[#1c1514]/40 hover:border-[#c5a880] disabled:opacity-30 transition-all cursor-pointer">
              <ChevronRight className="w-3 h-3" />
            </button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="w-8 h-8 flex items-center justify-center border border-[#e8e2d9] text-[#1c1514]/40 hover:border-[#c5a880] disabled:opacity-30 transition-all cursor-pointer">
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Pagamentos ─────────────────────────────────────────────────────────
function Pagamentos() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showPixForm, setShowPixForm] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', holder: '', expiry: '', cvv: '', type: 'credit' });
  const [newPix, setNewPix] = useState({ type: 'CPF', key: '' });
  const [copied, setCopied] = useState(null);

  function detectBrand(num) {
    if (num.startsWith('4')) return 'VISA';
    if (num.startsWith('5')) return 'MASTER';
    if (num.startsWith('3')) return 'AMEX';
    return 'CARD';
  }

  function handleAddCard(e) {
    e.preventDefault();
    const card = {
      id: `c-${Date.now()}`,
      type: newCard.type,
      brand: detectBrand(newCard.number.replace(/\s/g, '')),
      last4: newCard.number.replace(/\s/g, '').slice(-4),
      holder: newCard.holder.toUpperCase(),
      expiry: newCard.expiry,
      isDefault: payments.cards.length === 0,
    };
    setPayments(prev => ({ ...prev, cards: [...prev.cards, card] }));
    setNewCard({ number: '', holder: '', expiry: '', cvv: '', type: 'credit' });
    setShowCardForm(false);
  }

  function handleAddPix(e) {
    e.preventDefault();
    setPayments(prev => ({ ...prev, pix: [...prev.pix, { id: `p-${Date.now()}`, ...newPix, isDefault: false }] }));
    setNewPix({ type: 'CPF', key: '' });
    setShowPixForm(false);
  }

  function handleDeleteCard(id) { setPayments(prev => ({ ...prev, cards: prev.cards.filter(c => c.id !== id) })); }
  function handleDeletePix(id) { setPayments(prev => ({ ...prev, pix: prev.pix.filter(p => p.id !== id) })); }

  function setDefaultCard(id) {
    setPayments(prev => ({ ...prev, cards: prev.cards.map(c => ({ ...c, isDefault: c.id === id })) }));
  }

  function formatCardNumber(val) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  const brandColors = { VISA: 'from-[#1a1f71] to-[#00a2e0]', MASTER: 'from-[#1c1514] to-[#eb001b]', AMEX: 'from-[#2e77bc] to-[#007ec5]', CARD: 'from-[#2c2c2c] to-[#555]' };

  return (
    <div>
      <h2 className="text-2xl font-title font-light text-[#1c1514] mb-8">Pagamentos</h2>

      {/* Cards Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] uppercase tracking-widest font-bold text-[#1c1514]/50">Cartões Salvos</h3>
          <button onClick={() => setShowCardForm(!showCardForm)} className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#8a7b2e] hover:text-[#6b5f23] transition-colors cursor-pointer">
            <Plus className="w-3 h-3" /> Adicionar cartão
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {payments.cards.map(card => (
            <div key={card.id} className={`relative rounded-none overflow-hidden bg-gradient-to-br ${brandColors[card.brand] || brandColors.CARD} p-5 text-white shadow-xl min-h-[150px] flex flex-col justify-between group`}>
              {/* Card Type Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-70">{card.type === 'credit' ? 'Crédito' : 'Débito'}</span>
                {card.isDefault && (
                  <span className="text-[8px] uppercase tracking-widest font-bold bg-[#c5a880] text-[#1c1514] px-2 py-0.5">Principal</span>
                )}
              </div>

              {/* Card Number */}
              <div>
                <p className="text-sm font-mono tracking-[0.25em] opacity-90">•••• •••• •••• {card.last4}</p>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <p className="text-[8px] opacity-50 uppercase tracking-wider mb-0.5">Titular</p>
                    <p className="text-[11px] font-semibold tracking-wider">{card.holder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] opacity-50 uppercase tracking-wider mb-0.5">Validade</p>
                    <p className="text-[11px] font-semibold tracking-wider">{card.expiry}</p>
                  </div>
                  <span className="text-lg font-bold opacity-80 tracking-wider">{card.brand}</span>
                </div>
              </div>

              {/* Actions on hover */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {!card.isDefault && (
                  <button onClick={() => setDefaultCard(card.id)} className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-[#c5a880] border border-[#c5a880] px-3 py-1.5 hover:bg-[#c5a880] hover:text-[#1c1514] transition-all cursor-pointer">
                    <Star className="w-3 h-3" /> Padrão
                  </button>
                )}
                <button onClick={() => handleDeleteCard(card.id)} className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-red-300 border border-red-300/50 px-3 py-1.5 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                  <Trash2 className="w-3 h-3" /> Remover
                </button>
              </div>
            </div>
          ))}

          {payments.cards.length === 0 && !showCardForm && (
            <div className="col-span-2 text-center py-10 border border-dashed border-[#e8e2d9] text-[#1c1514]/40">
              <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Nenhum cartão salvo.</p>
            </div>
          )}
        </div>

        {/* New Card Form */}
        {showCardForm && (
          <form onSubmit={handleAddCard} className="mt-4 border border-[#e8e2d9] bg-white p-6 space-y-4">
            <h4 className="text-sm font-semibold text-[#1c1514] uppercase tracking-wider">Novo Cartão</h4>
            <div className="flex gap-3 mb-2">
              {['credit', 'debit'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setNewCard(p => ({ ...p, type: t }))}
                  className={`text-[10px] uppercase tracking-wider font-semibold px-4 py-2 border transition-all cursor-pointer ${newCard.type === t ? 'bg-[#1c1514] text-white border-[#1c1514]' : 'border-[#e8e2d9] text-[#1c1514]/60 hover:border-[#1c1514]/30'}`}
                >
                  {t === 'credit' ? 'Crédito' : 'Débito'}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Número do Cartão</label>
              <input
                value={newCard.number}
                onChange={e => setNewCard(p => ({ ...p, number: formatCardNumber(e.target.value) }))}
                placeholder="0000 0000 0000 0000"
                required
                className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 font-mono tracking-widest focus:outline-none focus:border-[#c5a880]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Nome no Cartão</label>
              <input value={newCard.holder} onChange={e => setNewCard(p => ({ ...p, holder: e.target.value }))} placeholder="Como está no cartão" required className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Validade</label>
                <input value={newCard.expiry} onChange={e => setNewCard(p => ({ ...p, expiry: e.target.value }))} placeholder="MM/AA" required className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">CVV</label>
                <input type="password" value={newCard.cvv} onChange={e => setNewCard(p => ({ ...p, cvv: e.target.value.slice(0, 4) }))} placeholder="•••" required className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowCardForm(false)} className="px-6 py-2.5 border border-[#e8e2d9] text-[11px] text-[#1c1514]/60 uppercase tracking-wider hover:bg-[#f5f2ee] transition-colors cursor-pointer">Cancelar</button>
              <button type="submit" className="px-6 py-2.5 bg-[#8a7b2e] text-white text-[11px] uppercase tracking-wider hover:bg-[#6b5f23] transition-colors cursor-pointer">Salvar Cartão</button>
            </div>
          </form>
        )}
      </div>

      {/* PIX Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] uppercase tracking-widest font-bold text-[#1c1514]/50">Chaves Pix Salvas</h3>
          <button onClick={() => setShowPixForm(!showPixForm)} className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#8a7b2e] hover:text-[#6b5f23] transition-colors cursor-pointer">
            <Plus className="w-3 h-3" /> Nova chave
          </button>
        </div>

        <div className="border border-[#e8e2d9] bg-white divide-y divide-[#f0ede8]">
          {payments.pix.map(p => (
            <div key={p.id} className="flex items-center justify-between px-5 py-4 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#00b3d6]/10 border border-[#00b3d6]/20 rounded-full flex items-center justify-center text-[#00b3d6]">
                  <span className="text-[8px] font-black">PIX</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/40">{p.type}</p>
                  <p className="text-sm text-[#1c1514] font-medium">{p.key}</p>
                </div>
                {p.isDefault && <span className="text-[8px] uppercase tracking-widest font-bold bg-[#c5a880]/20 text-[#8a7b2e] px-2 py-0.5">Preferida</span>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { navigator.clipboard.writeText(p.key).catch(() => {}); setCopied(p.id); setTimeout(() => setCopied(null), 2000); }}
                  className={`flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 border transition-all cursor-pointer ${copied === p.id ? 'bg-emerald-500 text-white border-emerald-500' : 'border-[#e8e2d9] text-[#1c1514]/50 hover:border-[#c5a880] hover:text-[#c5a880]'}`}
                >
                  {copied === p.id ? <><Check className="w-3 h-3" /> Copiado!</> : <><Copy className="w-3 h-3" /> Copiar</>}
                </button>
                <button onClick={() => handleDeletePix(p.id)} className="p-1.5 text-red-400 hover:text-red-600 transition-colors cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {payments.pix.length === 0 && !showPixForm && (
            <div className="px-5 py-8 text-center text-sm text-[#1c1514]/40">Nenhuma chave Pix salva.</div>
          )}
        </div>

        {showPixForm && (
          <form onSubmit={handleAddPix} className="mt-4 border border-[#e8e2d9] bg-white p-6 space-y-4">
            <h4 className="text-sm font-semibold text-[#1c1514] uppercase tracking-wider">Nova Chave Pix</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Tipo de Chave</label>
                <select value={newPix.type} onChange={e => setNewPix(p => ({ ...p, type: e.target.value }))} className="w-full border border-[#e8e2d9] bg-white text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]">
                  <option>CPF</option>
                  <option>CNPJ</option>
                  <option>E-mail</option>
                  <option>Telefone</option>
                  <option>Chave Aleatória</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Chave</label>
                <input value={newPix.key} onChange={e => setNewPix(p => ({ ...p, key: e.target.value }))} required placeholder="Insira a chave..." className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowPixForm(false)} className="px-6 py-2.5 border border-[#e8e2d9] text-[11px] text-[#1c1514]/60 uppercase tracking-wider hover:bg-[#f5f2ee] transition-colors cursor-pointer">Cancelar</button>
              <button type="submit" className="px-6 py-2.5 bg-[#8a7b2e] text-white text-[11px] uppercase tracking-wider hover:bg-[#6b5f23] transition-colors cursor-pointer">Salvar Chave</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Suporte ao Cliente ──────────────────────────────────────────────────
function Suporte() {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState('');
  const [subject, setSubject] = useState('');

  return (
    <div>
      <h2 className="text-2xl font-title font-light text-[#1c1514] mb-6">Suporte ao Cliente</h2>
      {sent ? (
        <div className="border border-emerald-200 bg-emerald-50 p-8 text-center">
          <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <h3 className="font-title text-lg text-[#1c1514] mb-1">Mensagem enviada!</h3>
          <p className="text-sm text-[#1c1514]/60">Nossa equipe responderá em até 24h no e-mail cadastrado.</p>
          <button onClick={() => { setSent(false); setMsg(''); setSubject(''); }} className="mt-4 text-[11px] text-[#8a7b2e] uppercase tracking-widest font-semibold hover:underline cursor-pointer">Nova mensagem</button>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="border border-[#e8e2d9] bg-white p-6 space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Assunto</label>
            <select value={subject} onChange={e => setSubject(e.target.value)} required className="w-full border border-[#e8e2d9] bg-white text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880]">
              <option value="">Selecione o assunto...</option>
              <option>Dúvida sobre pedido</option>
              <option>Cancelamento / Reembolso</option>
              <option>Problema com entrega</option>
              <option>Dúvida sobre produtos</option>
              <option>Outros</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-1.5">Mensagem</label>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} required rows={5} placeholder="Descreva sua dúvida ou problema..." className="w-full border border-[#e8e2d9] bg-transparent text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880] resize-none" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-[#8a7b2e] text-white text-[11px] uppercase tracking-widest hover:bg-[#6b5f23] transition-colors cursor-pointer">
              <ArrowRight className="w-3.5 h-3.5" /> Enviar mensagem
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ContaPage({ setView, setIsLoggedIn }) {
  const [activeTab, setActiveTab] = useState('compras');
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [archivedOrders, setArchivedOrders] = useState(ARCHIVED_ORDERS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuItems = [
    { key: 'compras', icon: ShoppingBag, label: 'Minhas Compras' },
    { key: 'enderecos', icon: MapPin, label: 'Endereços' },
    { key: 'membros', icon: Users, label: 'Membros de Família' },
    { key: 'usuario', icon: User, label: 'Usuário & Login' },
    { key: 'arquivados', icon: Archive, label: 'Pedidos Arquivados' },
    { key: 'salvos', icon: Heart, label: 'Produtos Salvos' },
    { key: 'pagamentos', icon: CreditCard, label: 'Pagamentos' },
    { key: 'suporte', icon: MessageCircle, label: 'Suporte ao Cliente' },
  ];

  function handleLogout() {
    setIsLoggedIn(false);
    setView('home');
    window.scrollTo(0, 0);
  }

  function renderContent() {
    switch (activeTab) {
      case 'compras': return <MinhasCompras orders={orders} setOrders={setOrders} archivedOrders={archivedOrders} setArchivedOrders={setArchivedOrders} />;
      case 'enderecos': return <Enderecos />;
      case 'membros': return <MembrosFamily />;
      case 'usuario': return <UsuarioLogin />;
      case 'arquivados': return <PedidosArquivados archivedOrders={archivedOrders} />;
      case 'salvos': return <ProdutosSalvos />;
      case 'pagamentos': return <Pagamentos />;
      case 'suporte': return <Suporte />;
      default: return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfbf9] font-section text-[#1c1514]">
      {/* Page Header */}
      <div className="bg-[#1c1514] pt-28 pb-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-title font-light text-[#fcfbf9]">Sua Conta</h1>
          <p className="text-sm text-[#c5a880] mt-1">{USER_DATA.name}, {USER_DATA.email}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Sidebar Menu ── */}
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="flex flex-col">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`flex items-center gap-3 px-4 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer border-l-2 ${
                      activeTab === item.key
                        ? 'border-l-[#8a7b2e] bg-[#f5f2ee] text-[#1c1514]'
                        : 'border-l-transparent text-[#1c1514]/50 hover:text-[#1c1514] hover:bg-[#f5f2ee]/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${activeTab === item.key ? 'text-[#8a7b2e]' : 'text-[#1c1514]/30'}`} />
                    {item.label}
                  </button>
                );
              })}

              <div className="h-px bg-[#e8e2d9] my-2" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wider text-red-500/70 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer border-l-2 border-l-transparent"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                Sair da Conta
              </button>
            </nav>
          </aside>

          {/* ── Content Panel ── */}
          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
