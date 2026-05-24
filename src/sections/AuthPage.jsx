import { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import wineryNightImg from '../assets/architecture.png'; // Will reuse existing high-quality image

export default function AuthPage({ setView, setIsLoggedIn }) {
  const [authState, setAuthState] = useState('login'); // 'login' | 'register' | 'forgot'
  
  // Login Form States
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCpf, setRegCpf] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);

  // Forgot Password States
  const [forgotId, setForgotId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [authState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authState === 'login') {
      setIsLoggedIn(true);
      setView('conta');
      window.scrollTo(0, 0);
    } else if (authState === 'register') {
      setIsLoggedIn(true);
      setView('conta');
      window.scrollTo(0, 0);
    } else {
      alert(`Instruções de recuperação enviadas para: ${forgotId}`);
      setAuthState('login');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1c1514] font-section flex">
      
      {/* ── Left Side: Form Area ── */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 md:p-24 lg:p-32 relative">
        
        {/* Back Button */}
        <button 
          onClick={() => setView('home')}
          className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase text-[#1c1514]/40 hover:text-[#c5a880] transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        <div className="w-full max-w-sm space-y-10 fade-in">
          
          {/* Header */}
          <div className="space-y-4 text-center lg:text-left">
            <ShieldCheck className="h-10 w-10 text-[#c5a880] mx-auto lg:mx-0" strokeWidth={1} />
            <h1 className="text-3xl sm:text-4xl font-title font-light leading-tight text-[#1c1514]">
              {authState === 'login' && 'Bem-vindo'}
              {authState === 'register' && 'Criar Conta'}
              {authState === 'forgot' && 'Recuperar Senha'}
            </h1>
            <p className="text-sm text-[#1c1514]/60 font-light leading-relaxed">
              {authState === 'login' && 'Acesse sua conta para uma experiência exclusiva na Vinícola UVVA.'}
              {authState === 'register' && 'Junte-se a nós para ter acesso a rótulos exclusivos e benefícios únicos.'}
              {authState === 'forgot' && 'Informe seus dados e enviaremos as instruções de recuperação.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* LOGIN STATE */}
            {authState === 'login' && (
              <>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-2">E-mail, CPF ou Telefone</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1c1514]/30" />
                      <input 
                        type="text" 
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        required
                        className="w-full bg-transparent border border-[#e8e2d9] text-sm text-[#1c1514] pl-12 pr-4 py-3 focus:outline-none focus:border-[#c5a880] transition-colors duration-300"
                        placeholder="Insira seu identificador..."
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-2">Senha</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1c1514]/30" />
                      <input 
                        type={showLoginPass ? 'text' : 'password'} 
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        required
                        className="w-full bg-transparent border border-[#e8e2d9] text-sm text-[#1c1514] pl-12 pr-12 py-3 focus:outline-none focus:border-[#c5a880] transition-colors duration-300"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowLoginPass(!showLoginPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1c1514]/30 hover:text-[#c5a880] transition-colors duration-300"
                      >
                        {showLoginPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="accent-[#c5a880] w-3.5 h-3.5" />
                    <span className="text-[11px] text-[#1c1514]/60 group-hover:text-[#1c1514] transition-colors">Lembrar de mim</span>
                  </label>
                  <button type="button" onClick={() => setAuthState('forgot')} className="text-[11px] text-[#1c1514]/60 hover:text-[#c5a880] transition-colors font-medium">
                    Esqueceu a senha?
                  </button>
                </div>

                <button type="submit" className="w-full bg-[#1c1514] hover:bg-[#2d2220] text-white font-semibold text-[11px] tracking-[0.15em] uppercase py-4 transition-all duration-300">
                  Entrar na conta
                </button>
              </>
            )}

            {/* REGISTER STATE */}
            {authState === 'register' && (
              <>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                      className="w-full bg-transparent border border-[#e8e2d9] text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880] transition-colors duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-2">E-mail</label>
                      <input 
                        type="email" 
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                        className="w-full bg-transparent border border-[#e8e2d9] text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880] transition-colors duration-300"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-2">CPF</label>
                      <input 
                        type="text" 
                        value={regCpf}
                        onChange={(e) => setRegCpf(e.target.value)}
                        required
                        className="w-full bg-transparent border border-[#e8e2d9] text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880] transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-2">Senha</label>
                      <input 
                        type={showRegPass ? 'text' : 'password'} 
                        value={regPass}
                        onChange={(e) => setRegPass(e.target.value)}
                        required
                        className="w-full bg-transparent border border-[#e8e2d9] text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880] transition-colors duration-300"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-2">Confirmar</label>
                      <div className="relative">
                        <input 
                          type={showRegPass ? 'text' : 'password'} 
                          value={regConfirm}
                          onChange={(e) => setRegConfirm(e.target.value)}
                          required
                          className="w-full bg-transparent border border-[#e8e2d9] text-sm text-[#1c1514] px-4 py-3 focus:outline-none focus:border-[#c5a880] transition-colors duration-300 pr-10"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowRegPass(!showRegPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1c1514]/30 hover:text-[#c5a880] transition-colors duration-300"
                        >
                          {showRegPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#1c1514] hover:bg-[#2d2220] text-white font-semibold text-[11px] tracking-[0.15em] uppercase py-4 transition-all duration-300 mt-6">
                  Criar minha conta
                </button>
              </>
            )}

            {/* FORGOT PASSWORD STATE */}
            {authState === 'forgot' && (
              <>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#1c1514]/60 mb-2">E-mail, CPF ou Telefone</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1c1514]/30" />
                      <input 
                        type="text" 
                        value={forgotId}
                        onChange={(e) => setForgotId(e.target.value)}
                        required
                        className="w-full bg-transparent border border-[#e8e2d9] text-sm text-[#1c1514] pl-12 pr-4 py-3 focus:outline-none focus:border-[#c5a880] transition-colors duration-300"
                        placeholder="Seu dado de cadastro..."
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#1c1514] hover:bg-[#2d2220] text-white font-semibold text-[11px] tracking-[0.15em] uppercase py-4 transition-all duration-300 mt-2">
                  Enviar instruções
                </button>
              </>
            )}

          </form>

          {/* Form Footer Toggles */}
          <div className="pt-6 border-t border-[#e8e2d9] text-center">
            {authState === 'login' && (
              <p className="text-[11px] text-[#1c1514]/60">
                Ainda não tem uma conta?{' '}
                <button onClick={() => setAuthState('register')} className="font-semibold text-[#c5a880] hover:text-[#1c1514] transition-colors uppercase tracking-wider ml-1">
                  Cadastre-se
                </button>
              </p>
            )}
            
            {authState === 'register' && (
              <p className="text-[11px] text-[#1c1514]/60">
                Já possui uma conta?{' '}
                <button onClick={() => setAuthState('login')} className="font-semibold text-[#c5a880] hover:text-[#1c1514] transition-colors uppercase tracking-wider ml-1">
                  Fazer login
                </button>
              </p>
            )}

            {authState === 'forgot' && (
              <p className="text-[11px] text-[#1c1514]/60">
                Lembrou sua senha?{' '}
                <button onClick={() => setAuthState('login')} className="font-semibold text-[#c5a880] hover:text-[#1c1514] transition-colors uppercase tracking-wider ml-1">
                  Voltar ao login
                </button>
              </p>
            )}
          </div>

        </div>
      </div>

      {/* ── Right Side: Cinematic Image ── */}
      <div className="hidden lg:block w-1/2 relative bg-[#1c1514] overflow-hidden">
        <img 
          src={wineryNightImg} 
          alt="Vinícola UVVA à noite" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] transform hover:scale-105 transition-transform duration-[20s]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1c1514]/20 to-[#1c1514]/80"></div>
        
        <div className="absolute bottom-20 left-20 max-w-sm space-y-4">
          <span className="text-[#c5a880] text-[10px] font-bold tracking-[0.2em] uppercase">
            Clube de Vinhos
          </span>
          <p className="text-white font-title font-light text-2xl leading-snug">
            Uma curadoria especial para quem entende a verdadeira essência do tempo.
          </p>
        </div>
      </div>

    </div>
  );
}
