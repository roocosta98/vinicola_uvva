import { useState, useEffect } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import vineyardImg from '../assets/vineyard.png';
import winesImg from '../assets/wines.png';
import sunsetImg from '../assets/sunset.png';
import grapesImg from '../assets/grapes.png';
import gastronomy from '../assets/gastronomy.png';
import arquitectureImg from '../assets/architecture.png';

// ─── Shared article data ──────────────────────────────────────────
export const ARTICLES = [
  {
    id: 1,
    slug: 'colheita-cabernet-sauvignon-2026',
    category: 'Terroir & Uvas',
    date: '15 Mai 2026',
    readTime: '7 min',
    author: 'Enólogo Chefe — Rodrigo Matos',
    title: 'A colheita do Cabernet Sauvignon e o segredo da safra 2026',
    excerpt:
      'Acompanhe os bastidores de uma colheita histórica, moldada pela excelente amplitude térmica de Mucugê neste outono.',
    body: [
      'O outono de 2026 marcou um capítulo inédito na história da Vinícola UVVA. Com dias ensolarados e noites frescas — uma amplitude térmica que raramente ultrapassa os 18°C entre o pôr e o nascer do sol — as uvas do Cabernet Sauvignon desenvolveram um perfil aromático extraordinariamente complexo.',
      'A colheita teve início na segunda semana de março, quando nosso enólogo identificou o ponto exato de maturação fenólica: peles espessas, sementes de cor marrom uniforme e o equilíbrio perfeito entre açúcar e acidez, com pH fixado em 3,42.',
      'Cada fileira foi colhida manualmente pela manhã, quando as temperaturas ainda estão baixas, preservando os aromas primários das uvas. As caixas de 15 kg seguiam direto para a câmara fria antes de entrar nas cubas de inox.',
      'A fermentação aconteceu em cubas abertas de madeira de castanheiro, com remontagens diárias e pigagens suaves, respeitando as cascas sem extratividade excessiva. O resultado é um vinho de cor rubi intensa, com taninos sedosos e uma longevidade estimada de pelo menos 15 anos.',
    ],
    image: vineyardImg,
    featured: true,
  },
  {
    id: 2,
    slug: 'microclima-altitude-chapada',
    category: 'Viticultura',
    date: '02 Mai 2026',
    readTime: '5 min',
    author: 'Direção Técnica — Ana Luísa Borges',
    title: 'O segredo do microclima e a altitude da Chapada Diamantina',
    excerpt:
      'Como a barreira de ventos da Serra do Sincorá e a altitude de 1.150 metros influenciam na complexidade das nossas uvas.',
    body: [
      'Plantar uvas no semiárido baiano pode parecer um paradoxo para quem desconhece a Chapada Diamantina. Mas é exatamente a peculiaridade geográfica desta região que torna o terroir da UVVA único no Brasil.',
      'A 1.150 metros de altitude, o sol da Bahia irradia com intensidade máxima durante o dia — essencial para a fotossíntese e a maturação dos açúcares — enquanto os ventos da Serra do Sincorá baixam a temperatura à noite, preservando a acidez natural e os aromas varietais.',
      'Esta amplitude térmica diária de até 20°C é o "segredo" que os enólogos de montanha ao redor do mundo almejam. Na UVVA, ela ocorre naturalmente, ano após ano, criando safras consistentes e elegantes sem necessidade de intervenção artificial no vinhedo.',
      'Nosso solo é igualmente singular: predominantemente areno-argiloso com camadas de quartzito e mica, garantindo drenagem perfeita e obrigando as raízes a mergulhar até 4 metros em busca de água e minerais — o que se traduz em vinhos de grande mineralidade e frescor.',
    ],
    image: grapesImg,
    featured: false,
  },
  {
    id: 3,
    slug: 'arte-harmonizar-blends',
    category: 'Arte e Vinho',
    date: '20 Abr 2026',
    readTime: '6 min',
    author: 'Sommelier — Fernanda Leal',
    title: 'A arte de harmonizar: blends, notas aromáticas e queijos finos',
    excerpt:
      'Um guia assinado por nosso enólogo chefe revelando combinações divinas com os clássicos tintos de guarda da UVVA.',
    body: [
      'Harmonizar vinho e queijo é uma das experiências sensoriais mais elevadas da gastronomia. Ao contrário do que muitos imaginam, não existe uma regra única — existe uma lógica: contrastar ou complementar.',
      'Para nosso Syrah de altitude, o caminho é o contraste. A acidez vibrante e as notas de pimenta-do-reino e frutas escuras do vinho encontram no Brie francês um parceiro perfeito: a gordura cremosa da casca suaviza os taninos, enquanto o vinho limpa o paladar com elegância.',
      'Já a Trilogia UVVA, com seu blend de Cabernet, Syrah e Merlot, casa melhor com queijos de cura mais intensa. O Pecorino curado ou o Canastra reserva trazem à tona as notas de chocolate amargo e ameixa seca do vinho, em uma relação de profunda cumplicidade.',
      'A temperatura de serviço também é decisiva. Para os tintos encorpados da UVVA, recomendamos servir entre 16°C e 18°C — e deixar o queijo fora da geladeira por pelo menos 30 minutos antes de servir.',
    ],
    image: winesImg,
    featured: false,
  },
  {
    id: 4,
    slug: 'restaurante-arenito-gastronomia',
    category: 'Gastronomia',
    date: '10 Abr 2026',
    readTime: '4 min',
    author: 'Chef Executivo — Marco Pinheiro',
    title: 'O Restaurante Arenito e a nova gastronomia de altitude',
    excerpt:
      'Como o chef Marco Pinheiro traduz o terroir da Chapada em pratos que dialogam diretamente com os vinhos da casa.',
    body: [
      'O Restaurante Arenito nasceu da convicção de que o melhor acompanhamento para um vinho de terroir é uma cozinha de terroir. O chef Marco Pinheiro, formado em Paris e com passagens por São Paulo e Lisboa, chegou à UVVA com a missão de criar um menu que fosse, antes de tudo, um ato de pertencimento.',
      'Os pratos são sazonais e seguem rigorosamente o calendário agrícola da Chapada: umbu, licuri, carne-de-sol, queijo artesanal de Mucugê e ervas silvestres colhidas no próprio vale são protagonistas que mudam a cada estação.',
      'A carta de vinhos é, claro, inteiramente composta por rótulos da UVVA, com o sommelier responsável por montar a harmonização de cada prato à mesa — uma experiência que começa na seleção da garrafa e termina no último gole antes da sobremesa.',
      'Para 2026, Arenito será contemplado com um novo espaço externo, uma varanda sobre os vinhedos com mesas para até 30 pessoas, reservado exclusivamente para jantares de degustação com o enólogo.',
    ],
    image: gastronomy,
    featured: false,
  },
  {
    id: 5,
    slug: 'arquitetura-fazenda-uvva',
    category: 'A Vinícola',
    date: '28 Mar 2026',
    readTime: '5 min',
    author: 'Equipe UVVA',
    title: 'Arquitetura, pedra e vinho: a essência da Fazenda UVVA',
    excerpt:
      'Conheça a história da construção da sede da Vinícola UVVA, onde a arquitetura em pedra bege dialoga com a paisagem da Chapada.',
    body: [
      'A sede da Vinícola UVVA não foi projetada para impressionar — foi projetada para pertencer. O escritório paulistano responsável pelo projeto conduziu meses de estudo de implantação antes de definir a orientação dos blocos em relação ao sol, ao vento e à topografia do vale.',
      'O uso da pedra bege local — extraída de canteiras a menos de 40 km da propriedade — não foi apenas uma escolha estética. É também uma decisão sustentável: o material regula naturalmente a temperatura interna das adegas, sem necessidade de climatização artificial durante boa parte do ano.',
      'O projeto prevê integração total entre o espaço de produção e o espaço de visitação: as janelas de vidro que separam o salão de degustação da adega de barricas foram posicionadas para que o hóspede nunca perca de vista o trabalho silencioso do envelhecimento.',
      'Os vinhedos que circundam a sede foram desenhados como parte da paisagem arquitetônica — não como área de trabalho separada, mas como jardim vivo, a ser admirado em qualquer época do ano.',
    ],
    image: arquitectureImg,
    featured: false,
  },
  {
    id: 6,
    slug: 'eventos-safra-2025',
    category: 'Eventos',
    date: '10 Mar 2026',
    readTime: '3 min',
    author: 'Equipe UVVA',
    title: 'Calendário de eventos exclusivos: safra 2025 em destaque',
    excerpt:
      'Os melhores momentos do lançamento da safra 2025, com jantares harmonizados, degustações verticais e noites na adega.',
    body: [
      'O lançamento da safra 2025 reuniu, ao longo de três dias em fevereiro, cerca de 180 convidados entre sommeliers, compradores, jornalistas especializados e clientes do Clube UVVA.',
      'O ponto alto foi o jantar de gala na adega de barricas, com 40 lugares, onde o enólogo Rodrigo Matos conduziu uma degustação vertical de 8 safras — de 2017 a 2025 — acompanhada de um menu de quatro tempos do chef Marco Pinheiro.',
      'Em 2026, o calendário de eventos promete ser ainda mais completo. Estão previstos quatro "Fins de Semana na Vinha" com hospedagem na fazenda, noites de lua cheia na adega com música ao vivo e uma nova edição do Festival de Inverno da Chapada com paticipação especial da UVVA.',
      'As inscrições para os eventos exclusivos estão abertas para membros do Clube UVVA. Para saber mais, entre em contato com nossa equipe comercial.',
    ],
    image: sunsetImg,
    featured: false,
  },
];

const CATEGORIES = ['Todos', 'Terroir & Uvas', 'Viticultura', 'Arte e Vinho', 'Gastronomia', 'A Vinícola', 'Eventos'];

export default function MateriasPage({ setView, setArticleId }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = ARTICLES.filter((a) => {
    const matchCat = activeCategory === 'Todos' || a.category === activeCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== (featured?.id ?? -1));

  const handleOpenArticle = (id) => {
    setArticleId(id);
    setView('artigo');
  };

  return (
    <div className="fade-in bg-[#1c1514] text-[#fcfbf9] font-section min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative h-[55vh] md:h-[62vh] flex items-center justify-center overflow-hidden bg-[#140f0e]">
        <img
          src={vineyardImg}
          alt="Editorial UVVA"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.30] scale-105 select-none z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#1c1514] z-10" />

        <div className="relative z-20 max-w-3xl mx-auto px-6 text-center space-y-5 select-none pb-6">
          <span className="text-[#c5a880] text-xs uppercase tracking-[0.28em] font-semibold block">
            EDITORIAL UVVA
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-title font-light tracking-[0.12em] text-white uppercase leading-tight drop-shadow-lg">
            Nossas Matérias
          </h1>
          <p className="text-[#fcfbf9]/65 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
            Histórias sobre terroir, viticultura, gastronomia e a vida na Chapada Diamantina.
          </p>
        </div>
      </section>

      {/* ── Filters + Search ─────────────────────────────── */}
      <div className="sticky top-[68px] z-30 bg-[#1c1514]/95 backdrop-blur-md border-b border-[#c5a880]/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">

          {/* Category Pills */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-semibold tracking-[0.18em] uppercase px-3.5 py-1.5 border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'border-[#c5a880] bg-[#c5a880]/10 text-[#c5a880]'
                    : 'border-[#c5a880]/15 text-[#fcfbf9]/50 hover:border-[#c5a880]/40 hover:text-[#fcfbf9]/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative shrink-0 w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#fcfbf9]/35 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar matérias…"
              className="w-full bg-[#140f0e] border border-[#c5a880]/15 text-[11px] text-[#fcfbf9]/70 placeholder-[#fcfbf9]/30 pl-8 pr-8 py-2 focus:outline-none focus:border-[#c5a880]/50 transition-colors duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#fcfbf9]/30 hover:text-[#c5a880] transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">

        {/* ── Featured Article ─────────────────────────────── */}
        {featured && (
          <div
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#c5a880]/12 overflow-hidden hover:border-[#c5a880]/35 transition-all duration-500 cursor-pointer"
            onClick={() => handleOpenArticle(featured.id)}
          >
            {/* Image */}
            <div className="relative h-72 lg:h-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover brightness-75 group-hover:brightness-85 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1c1514]/60 lg:block hidden" />
              <span className="absolute top-5 left-5 bg-[#c5a880] text-[#1c1514] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1">
                DESTAQUE
              </span>
            </div>

            {/* Content */}
            <div className="bg-[#140f0e] p-10 lg:p-14 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#c5a880] uppercase tracking-[0.22em] font-bold">
                    {featured.category}
                  </span>
                  <span className="h-px flex-1 bg-[#c5a880]/15" />
                  <span className="text-[10px] text-[#fcfbf9]/35 tracking-wide">{featured.date}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-title font-light leading-snug group-hover:text-[#c5a880] transition-colors duration-300">
                  {featured.title}
                </h2>

                <p className="text-sm text-[#fcfbf9]/55 leading-relaxed font-light">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#fcfbf9]/35 uppercase tracking-wider">Autor</span>
                  <span className="text-xs text-[#fcfbf9]/65 font-light">{featured.author}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#c5a880] group-hover:gap-3 transition-all duration-300">
                  Ler Matéria
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Rest of Articles Grid ────────────────────────── */}
        {rest.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-xs font-semibold tracking-[0.22em] uppercase text-[#fcfbf9]/40">
                {activeCategory === 'Todos' ? 'Todas as Matérias' : activeCategory}
              </h3>
              <div className="flex-1 h-px bg-[#c5a880]/10" />
              <span className="text-[10px] text-[#fcfbf9]/30 tracking-wider">{rest.length} matéria{rest.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <article
                  key={post.id}
                  onClick={() => handleOpenArticle(post.id)}
                  className="flex flex-col bg-[#140f0e] border border-[#c5a880]/10 overflow-hidden group hover:border-[#c5a880]/30 transition-all duration-500 hover:shadow-2xl cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-75 group-hover:brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140f0e]/70 via-transparent to-transparent" />
                    <span className="absolute top-3.5 left-4 text-[9px] font-bold tracking-[0.2em] uppercase text-[#c5a880]">
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-7 flex flex-col justify-between flex-grow gap-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] text-[#fcfbf9]/30 tracking-wide">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime} de leitura</span>
                      </div>
                      <h3 className="text-base font-title font-light group-hover:text-[#c5a880] transition-colors duration-300 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#fcfbf9]/50 leading-relaxed line-clamp-2 font-light">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#c5a880]/8 flex items-center justify-between">
                      <span className="text-[10px] text-[#fcfbf9]/30 font-light">{post.author.split('—')[0].trim()}</span>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#fcfbf9]/50 group-hover:text-[#c5a880] transition-colors duration-300">
                        Ler Matéria
                        <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <p className="text-[#fcfbf9]/30 text-sm">Nenhuma matéria encontrada para "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('Todos'); }}
              className="text-[11px] tracking-widest uppercase text-[#c5a880] border border-[#c5a880]/30 hover:border-[#c5a880] px-5 py-2.5 transition-all duration-300 cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
