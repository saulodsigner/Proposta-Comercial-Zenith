/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimationFrame } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Layout, 
  Code, 
  Send, 
  MessageCircle, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Target
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import heroVideo from './hero-video.mp4';
import sauloProfile from './saulo-profile.jpg';
import section3 from './section-3.jpg';
import cripto1 from './cripto-1.jpg';
import aureum2 from './aureum-2.jpg';
import allas3 from './allas-3.jpg';
import advogado4 from './advogado-4.jpg';
import saask5 from './saask-5.jpg';

const IconMap: Record<string, any> = {
  CheckCircle2,
  Clock,
  FileText,
  Layout,
  Code,
  Send,
  ShieldCheck,
  Zap,
  Target
};

const Section = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={cn("py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10", className)}>
    {children}
  </section>
);

const Background = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden bg-background noise-bg">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Mesh Gradient Orbs */}
      <motion.div 
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-primary/15 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent-secondary/15 rounded-full blur-[120px]" 
      />
      
      {/* Scanning Light Beam */}
      <motion.div
        animate={{
          top: ['-20%', '120%'],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-primary to-transparent z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
};

const HeroVideo = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10" />
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover opacity-40 scale-105"
    >
      <source src={heroVideo} type="video/mp4" />
    </video>
    {/* Linear-style radial mask */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,1,10,0.8)_100%)] z-10" />
  </div>
);

const PortfolioCarousel = () => {
  const baseItems = [
    { id: 1, title: "Zenith Creative", category: "Branding & Web", img: cripto1 },
    { id: 2, title: "Aureum", category: "Luxury Design", img: aureum2 },
    { id: 3, title: "Allas Viagens", category: "Landing Page", img: allas3 },
    { id: 4, title: "Advocacia Estratégica", category: "Website", img: advogado4 },
    { id: 5, title: "Saask Growth", category: "SaaS Marketing", img: saask5 },
    { id: 6, title: "Katia Lins", category: "Agência de Viagens", img: section3 },
  ];

  // Triplicate items for seamless loop
  const items = [...baseItems, ...baseItems, ...baseItems];
  const [cardWidth, setCardWidth] = useState(400);
  const gap = 64;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardWidth(300);
      } else {
        setCardWidth(400);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSetWidth = baseItems.length * (cardWidth + gap);

  const x = useMotionValue(-totalSetWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((t, delta) => {
    if (isDragging) return;
    const moveAmount = delta * 0.04; 
    const currentX = x.get();
    let nextX = currentX - moveAmount;
    if (nextX <= -totalSetWidth * 2) nextX += totalSetWidth;
    else if (nextX >= 0) nextX -= totalSetWidth;
    x.set(nextX);
  });

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-12 cursor-grab active:cursor-grabbing select-none" ref={containerRef}>
      <motion.div 
        drag="x"
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onDrag={(e, info) => {
          const currentX = x.get();
          if (currentX <= -totalSetWidth * 2) x.set(currentX + totalSetWidth);
          else if (currentX >= 0) x.set(currentX - totalSetWidth);
        }}
        style={{ x }}
        className="flex gap-16 items-center"
      >
        {items.map((item, index) => (
          <PortfolioCard key={`${item.id}-${index}`} item={item} x={x} index={index} cardWidth={cardWidth} />
        ))}
      </motion.div>
    </div>
  );
};

const PortfolioCard = ({ item, x, index, cardWidth }: { item: any, x: any, index: number, cardWidth: number, key?: any }) => {
  const gap = 64; // Match parent
  const offset = index * (cardWidth + gap);
  
  const relativeX = useTransform(x, (latestX: number) => {
    const position = latestX + offset;
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
    return position - centerX + (cardWidth / 2);
  });

  const rotateY = useTransform(relativeX, [-1000, 0, 1000], [30, 0, -30]);
  const translateZ = useTransform(relativeX, [-1000, 0, 1000], [-150, 0, -150]);
  const scale = useTransform(relativeX, [-1000, 0, 1000], [0.9, 1.1, 0.9]);
  const opacity = useTransform(relativeX, [-1200, -800, 0, 800, 1200], [0, 0.85, 1, 0.85, 0]);

  return (
    <motion.div
      style={{
        perspective: "1200px",
        rotateY,
        z: translateZ,
        scale,
        opacity,
        minWidth: cardWidth,
      }}
      className="relative aspect-[3/4.5] rounded-[32px] overflow-hidden border-glow group shadow-2xl shadow-accent-primary/10"
    >
      <div className="absolute inset-0 bg-white/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
      <img 
        src={item.img} 
        alt={item.title}
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 brightness-[1.05] contrast-[1.05]"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
};

const GradientText = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={cn("text-gradient font-display", className)}>
    {children}
  </span>
);

const TypingText = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.2,
            delay: i * 0.1,
            ease: "easeIn",
          }}
          className="inline-block mr-[0.3em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const [proposalConfig, setProposalConfig] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Pega o '?id=nomecliente' da URL, se não tiver, busca o 'padrao'
    const params = new URLSearchParams(window.location.search);
    const proposalId = params.get('id') || 'padrao';
    
    // Busca o arquivo JSON de dentro da pasta public/propostas/
    fetch(`/propostas/${proposalId}.json`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => setProposalConfig(data))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white">
        <Zap className="w-12 h-12 text-accent-primary mb-6" />
        <h1 className="text-3xl font-display font-bold mb-2">Proposta não encontrada</h1>
        <p className="text-white/50">Por favor, verifique o link recebido.</p>
      </div>
    );
  }

  if (!proposalConfig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-accent-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-accent-primary/30 overflow-x-hidden relative">
      <Background />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-tech rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter">zenith</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
            <span className="text-white/40 uppercase tracking-widest text-[10px]">Cliente:</span>
            <span className="text-white">{proposalConfig.clientName}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden min-h-screen flex items-center">
        <HeroVideo />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-[11px] font-medium uppercase tracking-[0.2em] text-accent-primary mb-10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
              </span>
              {proposalConfig.proposalType}
            </motion.div>
            
            <h1 className="text-5xl sm:text-7xl md:text-[120px] font-display font-black tracking-tighter leading-[0.85] mb-12">
              DESIGN QUE<br />
              <GradientText className="italic">IMPULSIONA</GradientText>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed mb-16">
              Transformamos marcas em líderes de mercado através de interfaces de <span className="text-white font-medium">alto impacto</span> e estratégias digitais precisas.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6"
            >
              <a 
                href="https://wa.me/82993254247"
                target="_blank"
                className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all glow-purple"
              >
                Iniciar Projeto
              </a>
              <a 
                href="#portfolio"
                className="px-8 py-4 rounded-full glass border-white/10 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Ver Portfólio
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Card - Linear Style */}
          <div className="max-w-4xl mx-auto mt-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group rounded-[32px] overflow-hidden glass-morphism p-8 md:p-12 flex flex-col md:flex-row items-center gap-12"
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0">
                <div className="absolute inset-0 bg-accent-primary/20 blur-3xl rounded-full group-hover:bg-accent-primary/40 transition-colors duration-500" />
                <img 
                  src={sauloProfile} 
                  alt="Saulo Lima"
                  className="relative w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-display font-bold mb-4">Saulo Lima</h3>
                <p className="text-xl text-white/60 font-light leading-relaxed mb-6">
                  Web Designer especialista em <span className="text-white font-medium">Landing Pages, Web Sites e Interfaces de alto padrão</span> que elevam o nível da sua marca.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {['UI DESIGN', 'FRAMER', 'ESTRATÉGIA', 'CONVERSÃO'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section className="bg-white/[0.02]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/80">
              Queremos que nossos clientes se sintam parte de um processo de <span className="text-white font-medium italic">evolução constante</span>. Trabalhar conosco é ter a certeza de estar no caminho certo para alcançar o auge da excelência.
            </p>
            <p className="text-lg text-white/50 leading-relaxed">
              Nosso trabalho vai além da entrega de páginas. Criamos experiências funcionais e bem estruturadas, sempre orientadas pela estratégia e pela precisão. Cada projeto é construído com clareza, sofisticação e cuidado estético, traduzindo confiança e profissionalismo.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative py-32 overflow-visible z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 flex flex-col items-center relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-8 w-full">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">
                NOSSO <GradientText>PORTFÓLIO</GradientText>
              </h2>
              <p className="text-white/40 text-lg font-light leading-relaxed">
                Uma seleção curada de projetos que demonstram nossa obsessão por detalhes, performance e design de classe mundial.
              </p>
            </div>
            <a 
              href="https://www.behance.net/saulodsigner" 
              target="_blank"
              className="hidden md:flex group items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors pb-2"
            >
              Ver Behance completo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <PortfolioCarousel />

        {/* Mobile Behance Button - Moved after carousel */}
        <div className="md:hidden mt-12 px-6">
          <a 
            href="https://www.behance.net/saulodsigner" 
            target="_blank"
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all glow-purple flex items-center gap-2"
          >
            Ver Behance completo <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Timeline Section - Linear Style */}
      <Section className="relative">
        <div className="text-center mb-32">
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-display font-black tracking-tighter">
            PROCESSO <GradientText>PRECISO</GradientText>
          </h2>
          <TypingText 
            text="Do conceito, a entrega. Nosso fluxo de trabalho organizado para entregar o melhor resultado."
            className="text-white/40 mt-4 text-lg font-light leading-relaxed max-w-2xl mx-auto"
          />
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line with Glow */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10">
            <motion.div 
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent origin-top"
            />
          </div>

          {proposalConfig.processSteps.map((step: any, i: number) => {
            const Icon = IconMap[step.icon] || Target;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "relative flex items-center mb-32 last:mb-0",
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Dot */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background border border-accent-primary z-10 shadow-[0_0_15px_rgba(169,71,255,0.5)]" />
                
                <div className={cn(
                  "ml-16 md:ml-0 md:w-1/2",
                  i % 2 === 0 ? "md:pr-24 md:text-right" : "md:pl-24 md:text-left"
                )}>
                  <div className="text-[10px] font-bold text-accent-primary uppercase tracking-[0.3em] mb-4">{step.time}</div>
                  <h3 className="text-3xl font-display font-bold mb-4">{step.title}</h3>
                  <p className="text-white/40 text-lg font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Services Section - Bento Grid */}
      <Section className="relative">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">
            SERVIÇOS <GradientText>SOLICITADOS</GradientText>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-2xl">
            Uma abordagem 360° para garantir que cada ponto de contato do seu cliente seja memorável e eficiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Service */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-2 glass-morphism p-8 md:p-10 rounded-[32px] flex flex-col justify-between group border-glow"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-tech rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              {React.createElement(IconMap[proposalConfig.mainService.icon] || Layout, { className: "w-6 h-6 md:w-8 md:h-8 text-white" })}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 break-words">{proposalConfig.mainService.title}</h3>
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-8">
                {proposalConfig.mainService.desc}
              </p>
              <div className="flex flex-wrap gap-3">
                {proposalConfig.mainService.tags.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Secondary Services */}
          {proposalConfig.secondaryServices.map((service: any, i: number) => {
            const Icon = IconMap[service.icon] || Zap;
            return (
              <motion.div key={i} whileHover={{ y: -5 }} className="glass-morphism p-8 rounded-[32px] border-glow">
                <Icon className="w-10 h-10 text-accent-primary mb-6" />
                <h4 className="text-xl font-display font-bold mb-2">{service.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}

          <motion.div whileHover={{ y: -5 }} className="md:col-span-3 glass-morphism p-8 rounded-[32px] flex flex-col items-start md:flex-row md:items-center justify-between gap-8 border-glow">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center shrink-0">
                {React.createElement(IconMap[proposalConfig.strategyService.icon] || Target, { className: "w-6 h-6 text-accent-primary" })}
              </div>
              <div>
                <h4 className="text-xl font-display font-bold">{proposalConfig.strategyService.title}</h4>
                <p className="text-white/40 text-sm">{proposalConfig.strategyService.desc}</p>
              </div>
            </div>
            <button className="w-full md:w-auto px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              Saber Mais
            </button>
          </motion.div>
        </div>
      </Section>

      {/* Investment Section - Bento Grid Style */}
      <Section className="relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-6">
            INVESTIMENTO <GradientText>ESTRATÉGICO</GradientText>
          </h2>
          <div className="inline-block px-6 py-2 rounded-full glass border-white/10 text-accent-primary font-bold text-xs sm:text-sm tracking-widest uppercase">
            Valor Total: R$ {proposalConfig.totalInvestment}
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 space-y-6">
          {/* Tier 1: Main Payment Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option 1 - Payment at Sight */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 md:p-12 rounded-[40px] bg-white text-black relative overflow-hidden group flex flex-col items-start"
            >
              <div className="mb-6">
                <div className="bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Recomendado
                </div>
              </div>
              <h3 className="text-3xl font-display font-bold mb-2">Pagamento à Vista</h3>
              <p className="text-black/50 text-sm mb-10">Economia imediata e foco total na execução.</p>
              
              <div className="mb-12">
                <p className="text-black/30 line-through text-lg sm:text-xl font-medium">R$ {proposalConfig.totalInvestment}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-6xl font-display font-black">R$ {proposalConfig.paymentSight.value}</span>
                  <span className="text-lg sm:text-xl font-bold">,00</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-12 w-full">
                {proposalConfig.includedServices.map((item: string) => (
                  <div key={item} className="flex items-start gap-3 text-sm font-medium leading-tight">
                    <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" /> {item}
                  </div>
                ))}
              </div>

              <a 
                href="https://wa.me/82993254247?text=Olá%20Saulo%2C%20eu%20escolhi%20o%20plano%20com%20pagamento%20á%20vista."
                target="_blank"
                className="w-full py-5 rounded-2xl bg-black text-white font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all inline-flex items-center justify-center mt-auto"
              >
                Selecionar Plano
              </a>
            </motion.div>

            {/* Option 2 - 50/50 Payment */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 md:p-12 rounded-[40px] glass-morphism border-white/10 relative overflow-hidden group border-glow flex flex-col"
            >
              <h3 className="text-3xl font-display font-bold mb-2">Pagamento 50/50</h3>
              <p className="text-white/40 text-sm mb-10">Divida o investimento entre o início e a entrega.</p>
              
              <div className="mb-12">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-6xl font-display font-black text-white">{proposalConfig.paymentInstallments.label}</span>
                  <span className="text-xl font-bold text-white/60">,00</span>
                </div>
                <p className="text-white/40 text-sm mt-2">({proposalConfig.paymentInstallments.count}x sem juros - Entrada + Entrega)</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-12 w-full">
                {proposalConfig.includedServices.map((item: string) => (
                  <div key={item} className="flex items-start gap-3 text-sm font-medium leading-tight text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" /> {item}
                  </div>
                ))}
              </div>

              <a 
                href="https://wa.me/82993254247?text=Olá%20Saulo%2C%20escolhi%20o%20plano%20com%20pagamento%2050%2F50."
                target="_blank"
                className="w-full py-5 rounded-2xl glass border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all inline-flex items-center justify-center mt-auto"
              >
                Selecionar Plano
              </a>
            </motion.div>
          </div>

          {/* Tier 2: Horizontal Bonus Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 md:p-10 rounded-[40px] glass-morphism border-white/10 border-glow relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-accent-primary/20 text-accent-primary text-[10px] font-bold uppercase tracking-widest mb-8">
                  <Zap className="w-3 h-3 mr-2" /> Presente Exclusivo
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">Bônus de Aceleração</h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">
                  Fechando o projeto até o dia <span className="text-white font-bold">{proposalConfig.bonus.deadline}</span> você ganha esses bônus para turbinar suas conversões:
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  {proposalConfig.bonus.items.map((item: string) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-accent-primary shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-auto lg:min-w-[280px]">
                <div className="px-8 py-10 rounded-3xl bg-accent-primary/10 border border-accent-primary/20 text-center">
                  <p className="text-accent-primary font-display font-bold text-2xl">Valor agregado de<br />R$ {proposalConfig.bonus.value}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tier 3: Payment Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Pix", desc: "Com até 10% de desconto", icon: Zap },
              { title: "Cartão", desc: "Até 12x com juros da operadora", icon: CheckCircle2 },
              { title: "Parcelado", desc: "2x sem juros (Entrada + Entrega)", icon: Clock }
            ].map((method, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-[32px] glass-morphism border-white/5 flex items-center gap-6 border-glow"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <method.icon className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold">{method.title}</h4>
                  <p className="text-white/40 text-xs leading-tight">{method.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects List */}
      <Section className="border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-display font-bold mb-12 text-center">Projetos no <GradientText>ar:</GradientText></h3>
          <div className="space-y-4">
            {[
              { name: "Zenith Company Creative", url: "https://zenithcreative.com.br/" },
              { name: "Katia Lins | Agência de Viagens", url: "https://katialinsviagens.com.br/" },
              { name: "Saask | SaaS Growth Marketing", url: "https://saask.com.br/" },
              { name: "Alcalá Travel | Agência de Viagens", url: "https://alcalatravel.com.br/" },
              { name: "Allas Viagens | Agência de Viagens", url: "https://allasviagens.com.br/" }
            ].map((project, i) => (
              <motion.a
                key={i}
                href={project.url}
                target="_blank"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 rounded-2xl glass border-white/5 hover:bg-white/5 transition-all group"
              >
                <span className="text-lg font-light text-white/80 group-hover:text-white transition-colors">{project.name}</span>
                <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-accent-primary transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section - Linear Style */}
      <Section className="pb-40 relative overflow-visible">
        <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-black/40 p-10 md:p-32 text-left md:text-center relative z-10">
          {/* Background Effects */}
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent-primary/10 blur-[120px] rounded-full" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-normal mb-10 leading-[1.1] pr-6 md:pr-0">
              PRONTO PARA O<br />
              <GradientText className="italic">PRÓXIMO NÍVEL?</GradientText>
            </h2>
            <p className="text-white/50 text-xl mb-16 max-w-2xl md:mx-auto font-light leading-relaxed">
              Não entregamos apenas sites. Entregamos ferramentas de crescimento que posicionam sua marca no topo.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center md:justify-center gap-6">
              <a 
                href="https://wa.me/82993254247" 
                target="_blank"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-4 px-8 md:px-12 py-6 rounded-2xl bg-white text-black font-bold text-base md:text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <MessageCircle className="w-6 h-6" />
                Falar com Especialista
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.print(); }}
                className="flex-1 sm:flex-none px-8 md:px-12 py-6 rounded-2xl glass border-white/10 text-white font-bold text-base md:text-lg hover:bg-white/5 transition-all inline-flex items-center justify-center"
              >
                Baixar Proposta PDF
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Zap className="w-6 h-6 text-accent-primary" />
            <span className="text-xl font-display font-bold tracking-tighter">zenith</span>
          </div>
          
          <div className="text-center order-3 md:order-2">
            <p className="text-[10px] text-white/20 uppercase tracking-widest">
              © 2026 Zenith Company. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex justify-center md:justify-end gap-8 order-2 md:order-3">
            {[
              { name: "Saulo Lima", handle: "@saulodesigner", img: sauloProfile }
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <img src={p.img} alt={p.name} className="w-10 h-10 rounded-full border border-white/10 grayscale object-cover" referrerPolicy="no-referrer" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">{p.name}</p>
                  <p className="text-[10px] text-white/40">{p.handle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
