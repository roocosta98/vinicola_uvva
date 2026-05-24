import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Clock, Calendar, User } from 'lucide-react';
import { ARTICLES } from './MateriasPage';

export default function ArtigoPage({ setView, articleId, setArticleId }) {
  const article = ARTICLES.find((a) => a.id === articleId) || ARTICLES[0];
  const related = ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 2);
  const moreArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, related.length < 2 ? 4 - related.length : 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  const handleOpenArticle = (id) => {
    setArticleId(id);
    setView('artigo');
  };

  return (
    <div className="fade-in bg-[#1c1514] text-[#fcfbf9] font-section min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end justify-center overflow-hidden bg-[#140f0e]">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.30] scale-105 select-none z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#1c1514] z-10" />

        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-14 sm:pb-20 space-y-5">
          {/* Back + Category Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('materias')}
              className="flex items-center gap-1.5 text-[#fcfbf9]/50 hover:text-[#c5a880] text-[11px] tracking-widest uppercase transition-colors duration-300 cursor-pointer group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform duration-300" />
              Voltar
            </button>
            <span className="text-[#fcfbf9]/20">/</span>
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#c5a880]">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-title font-light tracking-[0.08em] text-white leading-tight drop-shadow-lg">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#fcfbf9]/45">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[#c5a880]" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#c5a880]" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#c5a880]" />
              <span>{article.readTime} de leitura</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article Body ─────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Lead / Excerpt */}
        <div className="py-12 sm:py-16 border-b border-[#c5a880]/10">
          <p className="text-lg sm:text-xl font-title font-light text-[#fcfbf9]/80 leading-relaxed tracking-wide">
            {article.excerpt}
          </p>
        </div>

        {/* Body paragraphs */}
        <div className="py-12 sm:py-16 space-y-7 border-b border-[#c5a880]/10">
          {article.body.map((para, i) => (
            <div key={i} className="relative">
              {/* Drop cap on first paragraph */}
              {i === 0 ? (
                <p className="text-sm sm:text-base text-[#fcfbf9]/75 leading-relaxed font-light first-letter:text-5xl first-letter:font-title first-letter:text-[#c5a880] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  {para}
                </p>
              ) : (
                <p className="text-sm sm:text-base text-[#fcfbf9]/75 leading-relaxed font-light">
                  {para}
                </p>
              )}
              {/* Decorative separator between paragraphs */}
              {i < article.body.length - 1 && i === Math.floor(article.body.length / 2) - 1 && (
                <div className="flex items-center justify-center gap-3 my-10">
                  <div className="h-px w-16 bg-[#c5a880]/20" />
                  <div className="h-1.5 w-1.5 rounded-full bg-[#c5a880]/40" />
                  <div className="h-px w-16 bg-[#c5a880]/20" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Author Card */}
        <div className="py-10 sm:py-14">
          <div className="border border-[#c5a880]/12 bg-[#140f0e] p-7 sm:p-10 flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar placeholder */}
            <div className="h-14 w-14 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/20 flex items-center justify-center shrink-0">
              <User className="h-6 w-6 text-[#c5a880]/60" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#c5a880] block">
                Sobre o Autor
              </span>
              <p className="text-sm font-title font-light text-[#fcfbf9]/80">{article.author}</p>
              <p className="text-xs text-[#fcfbf9]/45 leading-relaxed font-light">
                Especialista dedicado às histórias da Vinícola UVVA, da vinha ao copo. Com profundo conhecimento do terroir da Chapada Diamantina, escreve sobre viticultura, gastronomia e a cultura do vinho de altitude no Brasil.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Related Articles ─────────────────────────────────── */}
      <section className="border-t border-[#c5a880]/10 py-16 sm:py-24 bg-[#140f0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#c5a880] block">
                EDITORIAL UVVA
              </span>
              <h2 className="text-2xl sm:text-3xl font-title font-light">
                Você também pode gostar
              </h2>
            </div>
            <button
              onClick={() => setView('materias')}
              className="hidden sm:flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#fcfbf9]/45 hover:text-[#c5a880] transition-colors duration-300 cursor-pointer group"
            >
              Ver Todas
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...related, ...moreArticles].slice(0, 4).map((post) => (
              <article
                key={post.id}
                onClick={() => handleOpenArticle(post.id)}
                className="flex flex-col bg-[#1c1514] border border-[#c5a880]/10 overflow-hidden group hover:border-[#c5a880]/30 transition-all duration-500 hover:shadow-2xl cursor-pointer"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover brightness-70 group-hover:brightness-85 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1514]/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3.5 text-[9px] font-bold tracking-[0.2em] uppercase text-[#c5a880]">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-grow">
                  <div className="text-[10px] text-[#fcfbf9]/30 tracking-wide">{post.date} · {post.readTime}</div>
                  <h4 className="text-sm font-title font-light leading-snug group-hover:text-[#c5a880] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="mt-auto flex items-center gap-1.5 text-[10px] font-semibold text-[#fcfbf9]/40 group-hover:text-[#c5a880] transition-colors duration-300 pt-2 border-t border-[#c5a880]/8">
                    Ler Matéria
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile: Ver Todas */}
          <div className="mt-10 text-center sm:hidden">
            <button
              onClick={() => setView('materias')}
              className="border border-[#c5a880]/30 hover:border-[#c5a880] text-[#c5a880] text-[11px] font-semibold tracking-[0.2em] uppercase py-3.5 px-7 transition-all duration-300 cursor-pointer"
            >
              Ver Todas as Matérias
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
