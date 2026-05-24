import { useState, useEffect } from 'react';
import Header from './components/Header';
import AgeGate from './components/AgeGate';
import Hero from './sections/Hero';
import LojaOnline from './sections/LojaOnline';
import NossaHistoria from './sections/NossaHistoria';
import ExperienciaUnica from './sections/ExperienciaUnica';
import Diferenciais from './sections/Diferenciais';
import Restaurante from './sections/Restaurante';
import NossosConteudos from './sections/NossosConteudos';
import RestauranteArenitoPage from './sections/RestauranteArenitoPage';
import ToursPage from './sections/ToursPage';
import TourInternaPage from './sections/TourInternaPage';
import VinhosPage from './sections/VinhosPage';
import VinicolaPage from './sections/VinicolaPage';
import EmpresasPage from './sections/EmpresasPage';
import ContatoPage from './sections/ContatoPage';
import ImprensaPage from './sections/ImprensaPage';
import ProdutoPage from './sections/ProdutoPage';
import MateriasPage from './sections/MateriasPage';
import ArtigoPage from './sections/ArtigoPage';
import AuthPage from './sections/AuthPage';
import CarrinhoPage from './sections/CarrinhoPage';
import CheckoutPage from './sections/CheckoutPage';
import SuccessPage from './sections/SuccessPage';
import PixPage from './sections/PixPage';
import BoletoPage from './sections/BoletoPage';
import ContaPage from './sections/ContaPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [view, setView] = useState('home'); // 'home'|'restaurante'|'tours'|'vinhos'|'vinicola'|'empresas'|'contato'|'imprensa'|'produto'|'materias'|'artigo'|'carrinho'|'conta'
  const [articleId, setArticleId] = useState(1);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('uvva-theme') || 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('uvva-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Cart State Mock
  const [cartItems, setCartItems] = useState([
    { id: 'p1', type: 'product', title: 'Trilogia UVVA', subtitle: 'Vinho Tinto Seco', price: 77.00, qty: 1, selected: true, img: 'trilogia_uvva_box.png' },
    { id: 't1', type: 'tour', title: 'Experiência UVVA', subtitle: 'Adulto', price: 150.00, qty: 2, selected: true, img: 'vineyard.png', date: '27/04/2026 19:00' },
    { id: 't2', type: 'tour', title: 'Experiência UVVA', subtitle: 'Criança 12 - 18 anos', price: 75.00, qty: 2, selected: true, img: 'vineyard.png', date: '27/04/2026 19:00' },
    { id: 'r1', type: 'restaurante', title: 'Reserva Restaurante Arenito', subtitle: 'Adulto', price: 75.00, qty: 2, selected: true, img: 'arenito_dish.png', date: '27/04/2026 21:00' },
    { id: 'e1', type: 'evento', title: 'Evento Lorem Ipsum', subtitle: 'Adulto', price: 75.00, qty: 2, selected: true, img: 'hero.png', date: '27/04/2026 21:00' }
  ]);

  const updateCartItem = (id, newProps) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, ...newProps } : item));
  };
  
  const addCartItem = (newItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === newItem.id);
      if (existing) {
        return prev.map(i => i.id === newItem.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, newItem];
    });
  };

  const removeCartItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCartItems([]);
  const toggleAllCartItems = (selected) => setCartItems(prev => prev.map(item => ({ ...item, selected })));

  return (
    <div className="min-h-screen bg-uvva-brown text-[#fcfbf9] antialiased selection:bg-[#c5a880] selection:text-[#1c1514] transition-colors duration-400">
      {/* Age verification gate */}
      <AgeGate />

      {view !== 'auth' && (
        <Header 
          view={view} 
          setView={setView} 
          cartItems={cartItems} 
          removeCartItem={removeCartItem} 
          updateCartItem={updateCartItem}
          isLoggedIn={isLoggedIn}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
      <main>
        {view === 'home' && (
          <>
            {/* Cinematic Welcome Section */}
            <Hero />

            {/* Dynamic Online Store */}
            <LojaOnline setView={setView} />

            {/* Seamless Asymmetric Historical Grid */}
            <NossaHistoria setView={setView} />

            {/* Tours & Experiences in the Vineyard */}
            <ExperienciaUnica />

            {/* Technical Value Pillars (Altitude, Organic, Selection) */}
            <Diferenciais />

            {/* Culinary Arts & Pairing Carousel */}
            <Restaurante />

            {/* Editorial Stories & Blog */}
            <NossosConteudos setView={setView} setArticleId={setArticleId} />
          </>
        )}

        {view === 'restaurante' && (
          /* Full Page dedicated to the new Arenito Restaurant */
          <RestauranteArenitoPage />
        )}

        {view === 'tours' && (
          /* Encotourism experiences hub */
          <ToursPage setView={setView} setSelectedTour={setSelectedTour} />
        )}

        {view === 'tour_interna' && (
          /* Internal page for a specific Tour */
          <TourInternaPage setView={setView} selectedTour={selectedTour} />
        )}

        {view === 'vinhos' && (
          /* Dedicated page for listing all premium Vinhos & Espumantes */
          <VinhosPage setView={setView} />
        )}

        {view === 'vinicola' && (
          /* Dedicated page for listing UVVA winery's history, terroir & architecture */
          <VinicolaPage setView={setView} />
        )}

        {view === 'empresas' && (
          /* Dedicated B2B corporate contact and partnership page */
          <EmpresasPage setView={setView} />
        )}

        {view === 'contato' && (
          /* Dedicated contact page */
          <ContatoPage setView={setView} />
        )}

        {view === 'imprensa' && (
          /* Dedicated press kit page */
          <ImprensaPage setView={setView} />
        )}

        {view === 'produto' && (
          /* Dedicated product detail page */
          <ProdutoPage setView={setView} />
        )}

        {view === 'materias' && (
          /* Full blog listing page */
          <MateriasPage setView={setView} setArticleId={setArticleId} />
        )}

        {view === 'artigo' && (
          /* Single Article rendering */
          <ArtigoPage setView={setView} articleId={articleId} />
        )}

        {view === 'carrinho' && (
          <CarrinhoPage 
            setView={setView} 
            cartItems={cartItems} 
            updateCartItem={updateCartItem} 
            removeCartItem={removeCartItem} 
            clearCart={clearCart} 
            toggleAllCartItems={toggleAllCartItems}
          />
        )}

        {view === 'checkout' && (
          <CheckoutPage 
            setView={setView} 
            cartItems={cartItems} 
            updateCartItem={updateCartItem} 
            addCartItem={addCartItem}
          />
        )}

        {view === 'success' && <SuccessPage setView={setView} clearCart={clearCart} />}
        {view === 'pix' && <PixPage setView={setView} clearCart={clearCart} />}
        {view === 'boleto' && <BoletoPage setView={setView} clearCart={clearCart} />}
        
        {view === 'auth' && (
          /* Authentication Page (Login/Register/Forgot) */
          <AuthPage setView={setView} setIsLoggedIn={setIsLoggedIn} />
        )}

        {view === 'conta' && (
          /* User Account Dashboard */
          <ContaPage setView={setView} setIsLoggedIn={setIsLoggedIn} />
        )}
      </main>

      {/* Institutional Multi-column Footer */}
      {view !== 'auth' && view !== 'conta' && <Footer view={view} setView={setView} />}
    </div>
  );
}


export default App;

