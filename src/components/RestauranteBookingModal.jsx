import { useState } from 'react';
import { X, ChevronDown, ChevronRight, Calendar } from 'lucide-react';
import arenitoDishImg from '../assets/arenito_dish.png'; // Fallback or header image
import restauranteHero from '../assets/arenito_hero.jpg';

// FAMILIARES MOCK FOR AUTO-COMPLETE
const FAMILIARES_DB = [
  { nome: 'Rodrigo da Costa', data: '27/03/1998', cpf: '411.233.455-66' },
  { nome: 'Ana Maria Souza', data: '15/08/1995', cpf: '122.344.566-77' },
  { nome: 'Carlos Eduardo', data: '02/11/1980', cpf: '899.766.544-33' },
  { nome: 'Juliana Costa', data: '10/05/2010', cpf: '011.222.333-44' }
];

// TABLES MOCK BASED ON FLOOR PLAN
const TABLES = [
  // AREA EXTERNA (Esquerda)
  { id: 'e1', type: 'round', seats: 6, area: 'externa', top: '30%', left: '12%' },
  { id: 'e2', type: 'round', seats: 6, area: 'externa', top: '70%', left: '12%' },
  // AREA INTERNA (Direita)
  // Row 1 (Top)
  { id: 'i1', type: 'rect', seats: 4, area: 'interna', top: '15%', left: '33%', width: 50, height: 35 },
  { id: 'i2', type: 'rect', seats: 2, area: 'interna', top: '15%', left: '46%', width: 30, height: 35 },
  { id: 'i3', type: 'rect', seats: 2, area: 'interna', top: '15%', left: '55%', width: 30, height: 35 },
  { id: 'i4', type: 'rect', seats: 4, area: 'interna', top: '15%', left: '68%', width: 50, height: 35 },
  { id: 'i5', type: 'rect', seats: 4, area: 'interna', top: '15%', left: '83%', width: 50, height: 35 },

  // Middle/Bottom Left
  { id: 'i6', type: 'rect', seats: 2, area: 'interna', top: '40%', left: '33%', width: 30, height: 35 },
  { id: 'i7', type: 'rect', seats: 4, area: 'interna', top: '70%', left: '33%', width: 50, height: 35 },
  
  // Center
  { id: 'i8', type: 'round', seats: 6, area: 'interna', top: '58%', left: '48%' }, 
  { id: 'i9', type: 'rect', seats: 2, area: 'interna', top: '90%', left: '50%', width: 30, height: 35, isVertical: true }, 
  
  // Big Table Center Right
  { id: 'i10', type: 'rect', seats: 10, area: 'interna', top: '70%', left: '65%', width: 60, height: 110, isVertical: true }, 
  
  // Far Right
  { id: 'i11', type: 'rect', seats: 4, area: 'interna', top: '48%', left: '83%', width: 50, height: 35 },
  { id: 'i12', type: 'rect', seats: 4, area: 'interna', top: '70%', left: '83%', width: 50, height: 35 },
  
  // Bottom Right (Duas mesas redondas lado a lado)
  { id: 'i13', type: 'round', seats: 6, area: 'interna', top: '90%', left: '72%' },
  { id: 'i14', type: 'round', seats: 6, area: 'interna', top: '90%', left: '88%' }
];

export default function RestauranteBookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); 
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  
  // Tables
  const [selectedTableIds, setSelectedTableIds] = useState([]);
  
  // Participants
  const [participants, setParticipants] = useState([]);
  const [expandedFormIndex, setExpandedFormIndex] = useState(0);

  if (!isOpen) return null;

  const totalSeats = TABLES.filter(t => selectedTableIds.includes(t.id)).reduce((acc, t) => acc + t.seats, 0);
  const minRequired = Math.max(1, totalSeats - Math.floor(totalSeats / 4)); // e.g. 10->8, 6->5, 4->3, 2->2
  const basePrice = 350;

  const handleNextStep = () => {
    if (step === 3) {
      // Initialize participants array based on totalSeats
      const newParts = Array.from({ length: totalSeats }).map((_, i) => participants[i] || { nome: '', data: '', cpf: '' });
      setParticipants(newParts);
      setExpandedFormIndex(0);
    }
    setStep(s => s + 1);
  };
  const handlePrevStep = () => setStep(s => s - 1);

  const toggleTable = (id) => {
    setSelectedTableIds(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const updateParticipant = (index, field, value) => {
    setParticipants(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const autoFillFamiliar = (index, familiar) => {
    setParticipants(prev => {
      const copy = [...prev];
      copy[index] = { ...familiar };
      return copy;
    });
    // Auto collapse this and expand next
    if (index + 1 < totalSeats) {
      setExpandedFormIndex(index + 1);
    } else {
      setExpandedFormIndex(-1);
    }
  };

  // Validations
  const filledParticipantsCount = participants.filter(p => p && p.nome && p.nome.trim() !== '').length;
  const isStep4Valid = filledParticipantsCount >= minRequired;

  // RENDER TABLE HELPER
  const renderTable = (t) => {
    const isSelected = selectedTableIds.includes(t.id);
    const bgClass = isSelected ? 'bg-gradient-to-br from-[#c5a880] to-[#8a7b2e]' : 'bg-gradient-to-br from-[#8c7462] to-[#5a4634]';
    const borderClass = isSelected ? 'border-[#fcfbf9]' : 'border-[#4a3624]';
    const chairColor = isSelected ? 'bg-[#c5a880]' : 'bg-[#cbd4db]';

    if (t.type === 'round') {
      return (
        <div key={t.id} onClick={() => toggleTable(t.id)} className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group hover:scale-105 transition-all z-10" style={{ top: t.top, left: t.left }}>
          {/* Chairs */}
          {Array.from({ length: t.seats }).map((_, i) => {
            const angle = (i * 360) / t.seats;
            const radius = 22;
            const cx = Math.cos((angle * Math.PI) / 180) * radius;
            const cy = Math.sin((angle * Math.PI) / 180) * radius;
            return <div key={i} className={`absolute w-3.5 h-3.5 rounded-full ${chairColor} shadow-sm`} style={{ top: `calc(50% + ${cy}px - 7px)`, left: `calc(50% + ${cx}px - 7px)` }}></div>
          })}
          {/* Table */}
          <div className={`relative w-[35px] h-[35px] rounded-full ${bgClass} border-2 ${borderClass} z-20 flex items-center justify-center shadow-md`}>
            <span className={`text-[10px] font-bold ${isSelected ? 'text-[#1c1514]' : 'text-white/80'}`}>{t.seats}L</span>
          </div>
        </div>
      );
    }

    // For Rectangular Tables
    return (
      <div key={t.id} onClick={() => toggleTable(t.id)} className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group hover:scale-105 transition-all z-10" style={{ top: t.top, left: t.left, width: t.width + 'px', height: t.height + 'px' }}>
        {t.seats === 10 && t.isVertical && (
          <>
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute top-[10%] -left-3 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute top-[35%] -left-3 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute top-[60%] -left-3 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute top-[85%] -left-3 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute top-[10%] -right-3 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute top-[35%] -right-3 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute top-[60%] -right-3 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute top-[85%] -right-3 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
          </>
        )}
        
        {t.seats === 4 && !t.isVertical && (
          <>
            <div className={`absolute -top-3 left-[20%] w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute -top-3 right-[20%] w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute -bottom-3 left-[20%] w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute -bottom-3 right-[20%] w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
          </>
        )}

        {t.seats === 2 && !t.isVertical && (
          <>
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
          </>
        )}

        {t.seats === 2 && t.isVertical && (
          <>
            <div className={`absolute top-1/2 -translate-y-1/2 -left-3 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
            <div className={`absolute top-1/2 -translate-y-1/2 -right-3 w-3.5 h-3.5 rounded-sm ${chairColor}`}></div>
          </>
        )}

        <div className={`absolute inset-0 rounded-md ${bgClass} border-2 ${borderClass} z-20 shadow-md flex items-center justify-center`}>
          <span className={`text-[10px] font-bold ${isSelected ? 'text-[#1c1514]' : 'text-white/80'}`}>{t.seats}L</span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#1c1514]/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-[900px] max-h-[90vh] overflow-y-auto flex flex-col font-section text-[#1c1514] shadow-2xl animate-fade-in-up border border-[#e8e2d9]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e8e2d9] shrink-0">
          <h2 className="text-2xl sm:text-3xl font-title font-light">Reservar Restaurante Arenito</h2>
          <button onClick={onClose} className="text-[#1c1514]/40 hover:text-[#c5a880] transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Hero Area */}
        <div className="relative h-40 sm:h-48 w-full shrink-0">
          <div className="absolute inset-0 bg-[#1c1514]">
            <img src={restauranteHero} alt="Arenito" className="w-full h-full object-cover brightness-50" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h3 className="text-2xl sm:text-3xl font-title font-medium text-white tracking-wide">
              Restaurante Arenito
            </h3>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 flex-1 bg-[#fdfcf9]">
          
          {/* STEP 1 & 2: DATE & TIME */}
          {step <= 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex justify-between items-end border-b border-[#e8e2d9] pb-2">
                <h4 className="text-lg font-title font-light text-[#1c1514]">Selecione a Data e o Horário</h4>
                <span className="text-xs text-[#1c1514]/50">Etapa {step}/4</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#1c1514] font-medium">Selecionar o Mês:</label>
                <div className="relative">
                  <select 
                    value={selectedMonth}
                    onChange={(e) => { setSelectedMonth(e.target.value); setStep(2); }}
                    className="w-full appearance-none border border-[#e8e2d9] rounded-none py-2 px-4 text-sm text-[#1c1514] focus:outline-none focus:border-[#c5a880] bg-white cursor-pointer"
                  >
                    <option value="" disabled>Selecione um mês</option>
                    <option value="Março">Março</option>
                    <option value="Abril">Abril</option>
                    <option value="Maio">Maio</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1c1514]/40 pointer-events-none" />
                </div>
              </div>

              {step === 2 && selectedMonth && (
                <div className="space-y-5 animate-fade-in-up">
                  <div className="space-y-2">
                    <label className="text-xs text-[#1c1514] font-medium">Selecionar o Dia:</label>
                    <div className={isCalendarExpanded ? "grid grid-cols-7 gap-2" : "flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide"}>
                      {[
                        { dow: 'Seg', d: '12' }, { dow: 'Ter', d: '13' }, { dow: 'Qua', d: '14' },
                        { dow: 'Qui', d: '15', disabled: true }, { dow: 'Sex', d: '16' }, { dow: 'Sab', d: '17' }, { dow: 'Dom', d: '18' },
                        ...(isCalendarExpanded ? [
                          { dow: 'Seg', d: '19' }, { dow: 'Ter', d: '20' }, { dow: 'Qua', d: '21' },
                          { dow: 'Qui', d: '22' }, { dow: 'Sex', d: '23' }, { dow: 'Sab', d: '24' }, { dow: 'Dom', d: '25' }
                        ] : [])
                      ].map((day, idx) => (
                        <button
                          key={idx} disabled={day.disabled} onClick={() => setSelectedDay(day.d)}
                          className={`min-w-[60px] sm:min-w-[70px] h-[60px] sm:h-[70px] flex flex-col items-center justify-center border transition-all duration-300 ${
                            selectedDay === day.d 
                              ? 'border-[#83712b] bg-[#83712b] text-white' 
                              : day.disabled ? 'border-[#f4f1ec] bg-[#fcfbf9] text-[#1c1514]/20 cursor-not-allowed' : 'border-[#e8e2d9] bg-white text-[#1c1514] hover:border-[#83712b] hover:text-[#83712b]'
                          }`}
                        >
                          <span className="text-[10px]">{day.dow}</span>
                          <span className="text-base font-medium">{day.d}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative flex py-2 items-center cursor-pointer group" onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}>
                    <div className="flex-grow border-t border-[#e8e2d9] group-hover:border-[#83712b] transition-colors"></div>
                    <span className="flex-shrink-0 mx-4 text-[10px] text-[#1c1514]/60 group-hover:text-[#83712b] transition-colors">
                      {isCalendarExpanded ? 'Recolher Calendário' : 'Expandir Calendário Completo'}
                    </span>
                    <div className="flex-grow border-t border-[#e8e2d9] group-hover:border-[#83712b] transition-colors"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-[#1c1514] font-medium">Selecionar o Horário:</label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {['12:00', '13:00', '14:00', '19:00', '20:00', '21:00'].map((time) => (
                        <button
                          key={time} onClick={() => setSelectedTime(time)}
                          className={`w-[70px] sm:w-[80px] h-9 flex items-center justify-center border text-xs transition-all duration-300 ${
                            selectedTime === time ? 'border-[#83712b] bg-[#83712b] text-white' : 'border-[#e8e2d9] bg-white text-[#1c1514] hover:border-[#83712b] hover:text-[#83712b]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button 
                      disabled={!selectedDay || !selectedTime} onClick={handleNextStep}
                      className={`font-medium text-xs tracking-wider px-6 py-2.5 transition-colors ${
                        selectedDay && selectedTime ? 'bg-[#83712b] hover:bg-[#6c5d24] text-white' : 'bg-[#e8e2d9] text-[#1c1514]/40 cursor-not-allowed'
                      }`}
                    >
                      Avançar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: TABLES */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in flex flex-col min-h-[500px]">
              <div className="flex justify-between items-end border-b border-[#e8e2d9] pb-2 shrink-0">
                <h4 className="text-lg font-title font-light text-[#1c1514]">Selecionar a Sua Mesa</h4>
                <span className="text-xs text-[#1c1514]/50">Etapa 3/4</span>
              </div>

              <div className="relative w-full h-[550px] sm:h-[600px] border border-[#e8e2d9] bg-[#fdfdfd] overflow-hidden shrink-0 mt-4 rounded-md">
                {/* Divider Line */}
                <div className="absolute left-[25%] top-[5%] bottom-[5%] border-l-4 border-dashed border-[#b0b8c4]"></div>
                
                <span className="absolute left-[6%] bottom-[10%] text-[#8aa6b5] font-bold text-sm sm:text-base tracking-wider uppercase">ÁREA<br/>EXTERNA</span>
                <span className="absolute left-[28%] top-[5%] text-[#8aa6b5] font-bold text-sm sm:text-base tracking-wider uppercase">ÁREA INTERNA</span>

                {/* Render All Tables */}
                {TABLES.map(renderTable)}
              </div>

              {/* Selection Summary */}
              <div className="flex justify-between items-center bg-white p-4 border border-[#e8e2d9]">
                <div>
                  <p className="text-sm font-medium text-[#1c1514]">Lugares Selecionados: <span className="text-[#83712b]">{totalSeats}</span></p>
                  <p className="text-[10px] text-[#1c1514]/60 mt-1">Mínimo de participantes exigido: {totalSeats > 0 ? minRequired : 0}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={handlePrevStep} className="bg-[#f8f6f3] text-[#1c1514] font-medium text-xs tracking-wider px-6 py-2.5 hover:bg-[#e8e2d9] transition-colors">
                    Voltar
                  </button>
                  <button 
                    disabled={totalSeats === 0} onClick={handleNextStep}
                    className={`font-medium text-xs tracking-wider px-6 py-2.5 transition-colors ${
                      totalSeats > 0 ? 'bg-[#83712b] hover:bg-[#6c5d24] text-white' : 'bg-[#e8e2d9] text-[#1c1514]/40 cursor-not-allowed'
                    }`}
                  >
                    Avançar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PARTICIPANTS */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex justify-between items-end border-b border-[#e8e2d9] pb-2">
                <h4 className="text-lg font-title font-light text-[#1c1514]">Informe os participantes</h4>
                <span className="text-xs text-[#1c1514]/50">Etapa 4/4</span>
              </div>

              <div className="bg-[#f4ebd9]/30 p-4 border border-[#e8e2d9] text-sm text-[#1c1514]/80">
                Para confirmar a reserva das mesas selecionadas ({totalSeats} lugares), é necessário informar no mínimo <strong>{minRequired} participantes</strong>.
              </div>

              <div className="space-y-3">
                {participants.map((p, idx) => {
                  const isExpanded = expandedFormIndex === idx;
                  const nome = p?.nome || '';
                  const data = p?.data || '';
                  const cpf = p?.cpf || '';
                  const isFilled = nome.trim() !== '';

                  return (
                    <div key={idx} className="border border-[#e8e2d9] bg-white">
                      {/* Accordion Header */}
                      <div 
                        className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#fcfbf9] transition-colors"
                        onClick={() => setExpandedFormIndex(isExpanded ? -1 : idx)}
                      >
                        <span className="font-medium text-sm">{idx + 1}º Cadeira {idx >= minRequired && <span className="text-[10px] text-[#1c1514]/40 font-normal ml-2">(Opcional)</span>}</span>
                        {!isExpanded && isFilled && (
                          <div className="flex gap-4 text-xs text-[#1c1514]/60">
                            <span>{nome}</span>
                            <span>{data}</span>
                            <span>{cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '***.***.$3-**')}</span>
                          </div>
                        )}
                        <ChevronRight className={`w-4 h-4 text-[#1c1514]/40 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>

                      {/* Accordion Body */}
                      {isExpanded && (
                        <div className="p-4 border-t border-[#e8e2d9] space-y-4 animate-fade-in-up bg-[#fcfbf9]">
                          
                          {/* Auto-complete Mock */}
                          <div className="relative group">
                            <label className="text-xs text-[#1c1514] font-medium block mb-1">Nome:</label>
                            <input 
                              type="text" 
                              value={nome}
                              onChange={(e) => updateParticipant(idx, 'nome', e.target.value)}
                              placeholder="Digite o nome"
                              className="w-full border border-[#e8e2d9] py-2 px-3 text-sm focus:outline-none focus:border-[#c5a880] peer"
                            />
                            {/* Dropdown for familiares */}
                            <div className="absolute top-full left-0 w-full bg-white border border-[#e8e2d9] shadow-lg mt-1 hidden peer-focus:block hover:block z-20">
                              <div className="p-2 text-[10px] uppercase tracking-wider text-[#1c1514]/50 bg-[#f8f6f3]">Familiares Salvos</div>
                              {FAMILIARES_DB.map((fam, fidx) => (
                                <div 
                                  key={fidx} 
                                  onMouseDown={() => autoFillFamiliar(idx, fam)}
                                  className="p-3 text-sm hover:bg-[#f4ebd9]/30 cursor-pointer border-b border-[#e8e2d9] last:border-0"
                                >
                                  {fam.nome}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-[#1c1514] font-medium block mb-1">Data de Nascimento:</label>
                              <div className="relative">
                                <input 
                                  type="text" 
                                  value={data}
                                  onChange={(e) => updateParticipant(idx, 'data', e.target.value)}
                                  placeholder="DD/MM/AAAA"
                                  className="w-full border border-[#e8e2d9] py-2 px-3 text-sm focus:outline-none focus:border-[#c5a880]"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c1514]/40" />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-[#1c1514] font-medium block mb-1">CPF:</label>
                              <input 
                                type="text" 
                                value={cpf}
                                onChange={(e) => updateParticipant(idx, 'cpf', e.target.value)}
                                placeholder="Insira o CPF"
                                className="w-full border border-[#e8e2d9] py-2 px-3 text-sm focus:outline-none focus:border-[#c5a880]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Total Section */}
              <div className="pt-6 border-t border-[#e8e2d9] space-y-4">
                <h4 className="text-[#1c1514] font-medium text-sm">Total:</h4>
                <div>
                  <p className="text-xs text-[#1c1514]">Restaurante Arenito <span className="text-[#83712b] font-medium ml-2">R$ {(basePrice * filledParticipantsCount).toFixed(2).replace('.', ',')}</span></p>
                  <p className="text-[10px] text-[#1c1514]/50 mt-1">{filledParticipantsCount}x pessoas preenchidas (Mín: {minRequired})</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button onClick={handlePrevStep} className="w-full sm:w-auto bg-[#f8f6f3] text-[#1c1514] font-medium text-xs tracking-wider px-6 py-2.5 hover:bg-[#e8e2d9] transition-colors">
                  Voltar
                </button>
                <button className="w-full sm:w-auto bg-white border border-[#83712b] text-[#83712b] font-medium text-xs tracking-wider px-6 py-2.5 hover:bg-[#83712b]/5 transition-colors">
                  Enviar pro Carrinho
                </button>
                <button 
                  disabled={!isStep4Valid}
                  onClick={() => alert('Mesa Reservada com Sucesso!')}
                  className={`w-full sm:w-auto font-medium text-xs tracking-wider px-6 py-2.5 transition-colors ${
                    isStep4Valid ? 'bg-[#83712b] hover:bg-[#6c5d24] text-white' : 'bg-[#e8e2d9] text-[#1c1514]/40 cursor-not-allowed'
                  }`}
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
