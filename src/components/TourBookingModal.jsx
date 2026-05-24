import { useState } from 'react';
import { X, ChevronDown, Minus, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TourBookingModal({ isOpen, onClose, tour }) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1); // 1: Date & Time, 2: Tickets
  const [selectedMonth, setSelectedMonth] = useState(''); // Empty initially
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  
  const [tickets, setTickets] = useState({
    inteira: 1,
    meia: 1
  });

  if (!isOpen || !tour) return null;

  const basePrice = 188; // Using mocked base price from user's image

  const handleNextStep = () => setStep(2);
  const handlePrevStep = () => setStep(1);

  const incrementTicket = (type) => {
    setTickets(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const decrementTicket = (type) => {
    setTickets(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
  };

  const totalTickets = tickets.inteira + tickets.meia;
  
  const isUSD = language !== 'PT';
  const displayBasePrice = isUSD ? 35 : 188;
  const displayInteiraPriceSingle = isUSD ? 35 : 175;
  const displayMeiaPriceSingle = isUSD ? 28 : 140;

  const totalInteiraPrice = tickets.inteira * displayInteiraPriceSingle;
  const totalMeiaPrice = tickets.meia * displayMeiaPriceSingle;

  const formatPrice = (value) => {
    return t('common.currency') + ' ' + (language === 'PT' ? value.toFixed(2).replace('.', ',') : value.toFixed(2));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1c1514]/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-[800px] max-h-[90vh] overflow-y-auto flex flex-col font-section text-[#1c1514] shadow-2xl animate-fade-in-up border border-[#e8e2d9]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e8e2d9]">
          <h2 className="text-2xl sm:text-3xl font-title font-light">{t('bookingModals.reserveTourTitle')}</h2>
          <button 
            onClick={onClose}
            className="text-[#1c1514]/40 hover:text-[#c5a880] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Hero Area */}
        <div className="relative h-48 sm:h-56 w-full">
          <div className="absolute inset-0 bg-[#1c1514]">
            <img 
              src={tour.image} 
              alt={tour.title} 
              className="w-full h-full object-cover brightness-50"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-white/90 mb-2">
              {tour.tag || tour.subtitle || 'VINÍCOLA UVVA'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-title font-medium text-white tracking-wide">
              {tour.title}
            </h3>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 flex-1">
          
          {/* STEP 1: DATE & TIME */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex justify-between items-end border-b border-[#e8e2d9] pb-2">
                <h4 className="text-lg font-title font-light text-[#1c1514]">{t('bookingModals.selectDate')}</h4>
                <span className="text-xs text-[#1c1514]/50">{t('bookingModals.stepLabel')} 1/2</span>
              </div>

              {/* Month Selector */}
              <div className="space-y-2">
                <label className="text-xs text-[#1c1514] font-medium">{t('bookingModals.selectMonth')}</label>
                <div className="relative">
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full appearance-none border border-[#e8e2d9] rounded-none py-2 px-4 text-sm text-[#1c1514] focus:outline-none focus:border-[#c5a880] bg-white cursor-pointer"
                  >
                    <option value="" disabled>{t('bookingModals.selectMonthPlaceholder')}</option>
                    <option value="marco">{t('bookingModals.months.marco')}</option>
                    <option value="abril">{t('bookingModals.months.abril')}</option>
                    <option value="maio">{t('bookingModals.months.maio')}</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1c1514]/40 pointer-events-none" />
                </div>
              </div>

              {/* Reveal Days and Times only if Month is selected */}
              {selectedMonth && (
                <div className="space-y-5 animate-fade-in-up">
                  {/* Day Selector */}
                  <div className="space-y-2">
                    <label className="text-xs text-[#1c1514] font-medium">{t('bookingModals.selectDay')}</label>
                    <div className={isCalendarExpanded ? "grid grid-cols-7 gap-2" : "flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide"}>
                      {[
                        { dow: t('bookingModals.daysOfWeek.seg'), d: '12' },
                        { dow: t('bookingModals.daysOfWeek.ter'), d: '13' },
                        { dow: t('bookingModals.daysOfWeek.qua'), d: '14' },
                        { dow: t('bookingModals.daysOfWeek.qui'), d: '15', disabled: true },
                        { dow: t('bookingModals.daysOfWeek.sex'), d: '16' },
                        { dow: t('bookingModals.daysOfWeek.sab'), d: '17' },
                        { dow: t('bookingModals.daysOfWeek.dom'), d: '18' },
                        // Extra days if expanded
                        ...(isCalendarExpanded ? [
                          { dow: t('bookingModals.daysOfWeek.seg'), d: '19' }, 
                          { dow: t('bookingModals.daysOfWeek.ter'), d: '20' }, 
                          { dow: t('bookingModals.daysOfWeek.qua'), d: '21' },
                          { dow: t('bookingModals.daysOfWeek.qui'), d: '22' }, 
                          { dow: t('bookingModals.daysOfWeek.sex'), d: '23' }, 
                          { dow: t('bookingModals.daysOfWeek.sab'), d: '24' },
                          { dow: t('bookingModals.daysOfWeek.dom'), d: '25' }
                        ] : [])
                      ].map((day, idx) => (
                        <button
                          key={idx}
                          disabled={day.disabled}
                          onClick={() => setSelectedDay(day.d)}
                          className={`min-w-[60px] sm:min-w-[70px] h-[60px] sm:h-[70px] flex flex-col items-center justify-center border transition-all duration-300 ${
                            selectedDay === day.d 
                              ? 'border-[#83712b] bg-[#83712b] text-white' 
                              : day.disabled 
                                ? 'border-[#f4f1ec] bg-[#fcfbf9] text-[#1c1514]/20 cursor-not-allowed'
                                : 'border-[#e8e2d9] bg-white text-[#1c1514] hover:border-[#83712b] hover:text-[#83712b]'
                          }`}
                        >
                          <span className="text-[10px]">{day.dow}</span>
                          <span className="text-base font-medium">{day.d}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative flex py-2 items-center cursor-pointer group" onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}>
                    <div className="flex-grow border-t border-[#e8e2d9] group-hover:border-[#83712b] transition-colors"></div>
                    <span className="flex-shrink-0 mx-4 text-[10px] text-[#1c1514]/60 group-hover:text-[#83712b] transition-colors">
                      {isCalendarExpanded ? t('bookingModals.collapseCalendar') : t('bookingModals.expandCalendar')}
                    </span>
                    <div className="flex-grow border-t border-[#e8e2d9] group-hover:border-[#83712b] transition-colors"></div>
                  </div>

                  {/* Time Selector */}
                  <div className="space-y-2">
                    <label className="text-xs text-[#1c1514] font-medium">{t('bookingModals.selectTime')}</label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`w-[70px] sm:w-[80px] h-9 flex items-center justify-center border text-xs transition-all duration-300 ${
                            selectedTime === time
                              ? 'border-[#83712b] bg-[#83712b] text-white'
                              : 'border-[#e8e2d9] bg-white text-[#1c1514] hover:border-[#83712b] hover:text-[#83712b]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button 
                      disabled={!selectedDay || !selectedTime}
                      onClick={handleNextStep}
                      className={`font-medium text-xs tracking-wider px-6 py-2.5 transition-colors ${
                        selectedDay && selectedTime
                          ? 'bg-[#83712b] hover:bg-[#6c5d24] text-white'
                          : 'bg-[#e8e2d9] text-[#1c1514]/40 cursor-not-allowed'
                      }`}
                    >
                      {t('bookingModals.next')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: TICKETS */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex justify-between items-end border-b border-[#e8e2d9] pb-2">
                <h4 className="text-lg font-title font-light text-[#1c1514]">{t('bookingModals.tickets')}</h4>
                <span className="text-xs text-[#1c1514]/50">{t('bookingModals.stepLabel')} 2/2</span>
              </div>

              <div className="space-y-4">
                {/* Ticket Item 1 */}
                <div className="border border-[#e8e2d9] p-4 flex justify-between items-center bg-white">
                  <div>
                    <h5 className="text-[#1c1514] text-sm font-medium">{t('bookingModals.adultRegular')}</h5>
                    <p className="text-[#1c1514]/60 text-xs mt-1">{formatPrice(displayBasePrice)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => decrementTicket('inteira')}
                      className="w-8 h-8 flex items-center justify-center border border-[#e8e2d9] text-[#1c1514]/50 hover:text-[#1c1514] hover:border-[#1c1514] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{tickets.inteira}</span>
                    <button 
                      onClick={() => incrementTicket('inteira')}
                      className="w-8 h-8 flex items-center justify-center border border-[#e8e2d9] text-[#1c1514]/50 hover:text-[#1c1514] hover:border-[#1c1514] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Ticket Item 2 */}
                <div className="border border-[#e8e2d9] p-4 flex justify-between items-center bg-white">
                  <div>
                    <h5 className="text-[#1c1514] text-sm font-medium">{t('bookingModals.childHalf')}</h5>
                    <p className="text-[#1c1514]/60 text-xs mt-1">{formatPrice(displayBasePrice)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => decrementTicket('meia')}
                      className="w-8 h-8 flex items-center justify-center border border-[#e8e2d9] text-[#1c1514]/50 hover:text-[#1c1514] hover:border-[#1c1514] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{tickets.meia}</span>
                    <button 
                      onClick={() => incrementTicket('meia')}
                      className="w-8 h-8 flex items-center justify-center border border-[#e8e2d9] text-[#1c1514]/50 hover:text-[#1c1514] hover:border-[#1c1514] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Section */}
              <div className="pt-6 border-t border-[#e8e2d9] space-y-4">
                <h4 className="text-[#1c1514] font-medium text-sm">{t('common.total')}:</h4>
                <div className="flex flex-col sm:flex-row gap-8">
                  {tickets.inteira > 0 && (
                    <div>
                      <p className="text-xs text-[#1c1514]">{t('bookingModals.adultDescription')} <span className="text-[#83712b] font-medium ml-2">{formatPrice(totalInteiraPrice)}</span></p>
                      <p className="text-[10px] text-[#1c1514]/50 mt-1">{tickets.inteira}x {t('bookingModals.peopleCount')}</p>
                    </div>
                  )}
                  {tickets.meia > 0 && (
                    <div>
                      <p className="text-xs text-[#1c1514]">{t('bookingModals.childDescription')} <span className="text-[#83712b] font-medium ml-2">{formatPrice(totalMeiaPrice)}</span></p>
                      <p className="text-[10px] text-[#1c1514]/50 mt-1">{tickets.meia}x {t('bookingModals.peopleCount')}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button 
                  onClick={handlePrevStep}
                  className="w-full sm:w-auto bg-[#f8f6f3] text-[#1c1514] font-medium text-xs tracking-wider px-6 py-2.5 hover:bg-[#e8e2d9] transition-colors"
                >
                  {t('bookingModals.back')}
                </button>
                <button 
                  className="w-full sm:w-auto bg-white border border-[#83712b] text-[#83712b] font-medium text-xs tracking-wider px-6 py-2.5 hover:bg-[#83712b]/5 transition-colors"
                >
                  {t('bookingModals.sendToCart')}
                </button>
                <button 
                  onClick={() => alert(t('bookingModals.successAlertTour'))}
                  className="w-full sm:w-auto bg-[#83712b] hover:bg-[#6c5d24] text-white font-medium text-xs tracking-wider px-6 py-2.5 transition-colors"
                >
                  {t('bookingModals.checkout')}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
