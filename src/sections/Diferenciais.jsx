import { Compass, Award, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import bgImage from '../assets/diferenciais_bg.jpg';

export default function Diferenciais() {
  const { t } = useLanguage();

  const items = [
    {
      icon: <Compass className="h-8 w-8 text-[#c5a880] stroke-[1.25]" />,
      title: t('diferenciais.p1Title'),
      description: t('diferenciais.p1Desc')
    },
    {
      icon: <Award className="h-8 w-8 text-[#c5a880] stroke-[1.25]" />,
      title: t('diferenciais.p2Title'),
      description: t('diferenciais.p2Desc')
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-[#c5a880] stroke-[1.25]" />,
      title: t('diferenciais.p3Title'),
      description: t('diferenciais.p3Desc')
    }
  ];

  return (
    <section className="relative border-y border-[#c5a880]/15 py-16 sm:py-20 font-section z-10 bg-[#140f0e] overflow-hidden">
      {/* Background Image Container (contained within the padding box to prevent bleeding under borders) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Luxurious semi-transparent dark overlay to ensure readability and contrast */}
      <div className="absolute inset-0 bg-black/70 -z-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center space-y-4 group p-6 rounded-none hover:bg-white/[0.01] transition-all duration-300"
            >
              {/* Animated Icon Ring */}
              <div className="h-16 w-16 rounded-full border border-[#c5a880]/20 flex items-center justify-center bg-[#1c1514] transform group-hover:scale-110 group-hover:border-[#c5a880] transition-all duration-500 shadow-md">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-[#fcfbf9] tracking-wider uppercase pt-2">
                {item.title}
              </h3>

              {/* Decorative line */}
              <div className="h-px w-8 bg-[#c5a880]/25 group-hover:w-16 transition-all duration-500"></div>

              {/* Description */}
              <p className="text-xs text-[#fcfbf9]/60 leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
