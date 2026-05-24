import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import vineyardImg from '../assets/vineyard.png';

export default function NossosConteudos({ setView, setArticleId }) {
  const { t } = useLanguage();

  const posts = [
    {
      id: 1,
      category: t('nossosConteudos.post1Category'),
      title: t('nossosConteudos.post1Title'),
      description: t('nossosConteudos.post1Desc'),
      image: vineyardImg,
    },
    {
      id: 2,
      category: t('nossosConteudos.post2Category'),
      title: t('nossosConteudos.post2Title'),
      description: t('nossosConteudos.post2Desc'),
      image: vineyardImg,
    },
    {
      id: 3,
      category: t('nossosConteudos.post3Category'),
      title: t('nossosConteudos.post3Title'),
      description: t('nossosConteudos.post3Desc'),
      image: vineyardImg,
    }
  ];

  const handleOpenArticle = (id) => {
    if (setArticleId) setArticleId(id);
    if (setView) setView('artigo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVerTodas = (e) => {
    e.preventDefault();
    if (setView) setView('materias');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="conteudos" className="bg-[#1c1514] text-[#fcfbf9] py-24 sm:py-32 font-section border-t border-[#c5a880]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[#c5a880] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
              {t('nossosConteudos.editorialTag')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-title font-light leading-tight">
              {t('nossosConteudos.title')}
            </h2>
          </div>
          <div>
            <a 
              href="#blog"
              onClick={handleVerTodas}
              className="inline-block border border-[#c5a880]/30 hover:border-[#c5a880] text-[#c5a880] hover:text-[#fcfbf9] hover:bg-[#c5a880]/10 font-semibold text-xs tracking-[0.2em] uppercase py-3.5 px-6 transition-all duration-300 font-section shrink-0 cursor-pointer"
            >
              {t('nossosConteudos.ctaAll')}
            </a>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              onClick={() => handleOpenArticle(post.id)}
              className="flex flex-col bg-[#140f0e] border border-[#c5a880]/10 overflow-hidden group hover:border-[#c5a880]/30 transition-all duration-500 hover:shadow-2xl cursor-pointer"
            >
              
              {/* Post Image Container */}
              <div className="relative overflow-hidden h-[240px]">
                <img 
                   src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Visual shade overlay */}
                <div className="absolute inset-0 bg-[#1c1514]/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col justify-between flex-grow min-h-[220px]">
                <div className="space-y-4">
                  {/* Category Tag */}
                  <span className="text-[10px] text-[#c5a880] uppercase tracking-[0.2em] font-bold block">
                    {post.category}
                  </span>
                  
                  {/* Post Title */}
                  <h3 className="text-base sm:text-lg font-title font-light group-hover:text-[#c5a880] transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>

                  {/* Post Description */}
                  <p className="text-xs text-[#fcfbf9]/50 leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="pt-6">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#fcfbf9]/80 group-hover:text-[#c5a880] transition-colors duration-300">
                    {t('nossosConteudos.ctaRead')}
                    <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

