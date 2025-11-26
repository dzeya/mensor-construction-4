import React, { useEffect, useRef, useState } from 'react';
import ThreeHero from './components/ThreeHero';
import AIChatWidget from './components/AIChatWidget';
import anime from 'animejs';
import { 
  Scan, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Globe, 
  FileText, 
  Cpu,
  Ruler,
  Plus,
  Minus,
  Construction,
  Factory,
  Home,
  Building2,
  TreeDeciduous,
  Target,
  Menu,
  X
} from 'lucide-react';

// Mensor Logo - Image
const MensorLogo = ({ className }: { className?: string }) => (
  <img 
    src="https://www.dropbox.com/scl/fi/ipg105i9pmzovno157ypj/mensLog2.svg?rlkey=f7j56ypc7pavw1tqa39nsyesa&raw=1" 
    alt="Mensor Logo" 
    className={`object-contain ${className}`} 
  />
);

// Technical Corner Graphic for Cards
const TechCorner = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M1 19V1H19" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { label: 'УСЛУГИ', href: '#services' }, 
    { label: 'РЕШЕНИЯ', href: '#solutions' }, 
    { label: 'БЛОГ', href: '#blog' }, 
    { label: 'КОНТАКТЫ', href: '#contact' }
  ];

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMobileMenuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-panel border-t-0 border-l-0 border-r-0 border-b border-white/5 transition-all duration-300 safe-area-top">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 md:py-5">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="h-12 sm:h-14 transition-transform duration-300 hover:scale-105">
            <MensorLogo className="h-full w-auto" />
          </div>
          <div className="hidden sm:block text-[11px] font-mono text-mensor-light/60 tracking-[0.14em]">ENGINEERING SURVEY</div>
        </div>

        <div className="hidden md:flex gap-10 text-xs font-mono font-bold text-mensor-light tracking-widest">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-mensor-accent transition-colors relative group">
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-mensor-accent transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 border border-mensor-accent/50 text-mensor-accent px-5 py-2 text-xs font-mono font-bold tracking-widest hover:bg-mensor-accent hover:text-white transition-all group">
            РАССЧИТАТЬ
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden w-11 h-11 rounded-full border border-white/10 bg-mensor-dark/70 text-white flex items-center justify-center hover:border-mensor-accent transition-colors"
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 bg-mensor-dark/95 border-t border-white/5 px-4 sm:px-6 ${isMobileMenuOpen ? 'max-h-80 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="flex flex-col gap-3 font-mono text-sm">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-mensor-light hover:text-white transition-colors py-2 border-b border-white/5 last:border-b-0"
            >
              {item.label}
            </a>
          ))}
          <button className="w-full bg-mensor-accent text-white px-4 py-3 font-bold tracking-[0.15em] hover:bg-white hover:text-mensor-dark transition-all">
            РАССЧИТАТЬ СТОИМОСТЬ
          </button>
        </div>
      </div>
    </nav>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: ref.current,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1200,
            easing: 'easeOutExpo'
          });
        }
      });
    }, { threshold: 0.5 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-12 md:mb-20 text-center opacity-0">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="w-12 h-[1px] bg-mensor-accent/50"></div>
        <h3 className="text-mensor-accent font-mono text-xs tracking-[0.2em] uppercase">{subtitle}</h3>
        <div className="w-12 h-[1px] bg-mensor-accent/50"></div>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h2>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, points, delay }: { icon: any, title: string, points: string[], delay: number }) => {
  const cardRef = useRef(null);

  useEffect(() => {
     const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: cardRef.current,
            opacity: [0, 1],
            translateY: [50, 0],
            delay: delay,
            duration: 800,
            easing: 'easeOutExpo'
          });
        }
      });
    }, { threshold: 0.2 });
    
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={cardRef} className="relative p-8 bg-mensor-gray/30 border border-white/5 hover:border-mensor-accent/30 transition-all duration-500 group opacity-0 translate-y-12 overflow-hidden h-full flex flex-col">
      <TechCorner className="absolute top-0 left-0 text-mensor-accent/20 group-hover:text-mensor-accent transition-colors" />
      <TechCorner className="absolute top-0 right-0 text-mensor-accent/20 group-hover:text-mensor-accent transition-colors rotate-90" />
      <TechCorner className="absolute bottom-0 right-0 text-mensor-accent/20 group-hover:text-mensor-accent transition-colors rotate-180" />
      <TechCorner className="absolute bottom-0 left-0 text-mensor-accent/20 group-hover:text-mensor-accent transition-colors -rotate-90" />

      <div className="w-14 h-14 bg-black/50 border border-white/10 rounded-sm flex items-center justify-center mb-6 group-hover:border-mensor-accent transition-colors">
        <Icon className="text-mensor-light group-hover:text-mensor-accent transition-colors" size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
      <ul className="space-y-4 flex-1">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-mensor-light/80">
            <span className="w-1.5 h-1.5 bg-mensor-accent mt-1.5 rounded-full flex-shrink-0" />
            <span className="leading-relaxed">
              {/* Bold the part before the colon if it exists */}
              {point.includes(':') ? (
                <>
                  <strong className="text-white font-semibold">{point.split(':')[0]}:</strong>
                  {point.split(':')[1]}
                </>
              ) : (
                point
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-mensor-accent transition-colors group"
      >
        <span className="text-lg font-bold text-white group-hover:text-mensor-accent">{question}</span>
        {isOpen ? <Minus className="text-mensor-accent" /> : <Plus className="text-white/50 group-hover:text-mensor-accent" />}
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-mensor-light/70 leading-relaxed text-sm max-w-2xl pl-4 border-l-2 border-mensor-accent/30">
          {answer}
        </p>
      </div>
    </div>
  );
};

function App() {
  const heroTextRef = useRef(null);

  useEffect(() => {
    // Hero Text Animation
    anime({
      targets: '.hero-element',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(200, {start: 1000}),
      easing: 'easeOutExpo'
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-mensor-accent selection:text-white bg-mensor-dark">
      <Navbar />

      {/* BLOCK 1: HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-14">
        <ThreeHero />
        <div className="relative z-10 container mx-auto px-4 sm:px-8">
          <div ref={heroTextRef} className="max-w-4xl md:max-w-5xl">
            <div className="flex items-center gap-4 mb-6 opacity-0 hero-element">
              <span className="text-mensor-accent font-mono text-xs tracking-[0.3em] font-bold">EST. 2011 &bull; MINSK</span>
              <div className="h-[1px] w-20 bg-mensor-accent"></div>
            </div>
            
            <h1 className="hero-element text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white opacity-0 leading-[1.08] sm:leading-[1.05] mb-6">
              ГЕОДЕЗИЯ,<br />
              3D-СКАНИРОВАНИЕ<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mensor-accent to-white">И КОНТРОЛЬ СТРОИТЕЛЬСТВА</span>
            </h1>

            <p className="hero-element text-base sm:text-lg md:text-xl text-mensor-light/80 font-light mt-6 max-w-2xl opacity-0 leading-relaxed border-l-4 border-mensor-accent pl-5 sm:pl-6 mb-10">
              Точность 1 мм. Ускоряем изыскания и исключаем ошибки в проекте. Экономим до 15% бюджета, избавляя вас от брака и переделок.
            </p>

            <div className="hero-element opacity-0 flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-mensor-accent text-white px-7 sm:px-8 py-4 font-mono text-sm font-bold tracking-widest hover:bg-white hover:text-mensor-dark transition-all duration-300 flex items-center justify-center gap-4 group">
                РАССЧИТАТЬ СТОИМОСТЬ
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
              </button>
              <button className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-7 sm:px-8 py-4 font-mono text-sm font-bold tracking-widest hover:bg-white/10 transition-all duration-300">
                ВСЕ УСЛУГИ
              </button>
            </div>

            <div className="hero-element opacity-0 flex flex-wrap gap-x-6 gap-y-3 text-[11px] sm:text-xs font-mono text-mensor-light/60 uppercase tracking-wider">
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-mensor-accent rounded-full"></div>Свое оборудование</span>
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-mensor-accent rounded-full"></div>Данные для AutoCAD / Revit</span>
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-mensor-accent rounded-full"></div>Работаем по всей Беларуси</span>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 2: ADVANTAGES */}
      <section className="py-16 md:py-24 bg-mensor-dark relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle title="ПОЧЕМУ МЫ" subtitle="ТЕХНОЛОГИИ, КОТОРЫЕ ЭКОНОМЯТ" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Scan,
                title: "Исключили человеческий фактор",
                desc: "Автоматическое лазерное сканирование. Прибор не устает, не ошибается и видит всё."
              },
              {
                icon: Zap,
                title: "Результат быстрее",
                desc: "Сокращаем время полевых работ. Вы получаете подоснову раньше и быстрее выходите на стройплощадку."
              },
              {
                icon: ShieldCheck,
                title: "Бюджет без сюрпризов",
                desc: "Фиксированная цена и прозрачная смета. Никаких скрытых доплат в процессе работ."
              },
              {
                icon: FileText,
                title: "Документы для технадзора",
                desc: "Сдаем исполнительную документацию строго по ГОСТ. У инспекторов не будет вопросов."
              }
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <item.icon className="w-10 h-10 text-mensor-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-mensor-light/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 3: SERVICES */}
      <section id="services" className="py-16 md:py-24 bg-black relative">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle title="КАТАЛОГ УСЛУГ" subtitle="КОМПЛЕКСНЫЕ РЕШЕНИЯ" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={Construction} 
              title="Стройка и Контроль" 
              points={[
                "Геодезическое сопровождение: Контроль геометрии от котлована до кровли.",
                "Исполнительная съемка: Проверка факта, поиск отклонений.",
                "Создание ГРО: Закладка пунктов геодезической основы.",
                "Земляные работы: Точный расчет объемов.",
                "Нивелировка путей: Проверка рельсов."
              ]}
              delay={0}
            />
            <ServiceCard 
              icon={Scan} 
              title="3D и Изыскания" 
              points={[
                "3D Лазерное сканирование: Цифровые двойники зданий.",
                "Топографическая съемка: Планы М 1:500, подоснова.",
                "Фасадная съемка: Чертежи и 3D для реконструкции.",
                "Обмерные работы: Для дизайнеров и БТИ.",
                "Инженерная геология: Анализ грунтов.",
                "Поиск коммуникаций: Находим кабели и трубы."
              ]}
              delay={200}
            />
            <ServiceCard 
              icon={Layers} 
              title="Проектирование" 
              points={[
                "Scan-to-BIM: Переводим облако точек в 3D (Revit).",
                "ППГР: Проекты производства геодезических работ."
              ]}
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* BLOCK 4 & 5: SOLUTIONS (Business & Private) */}
      <section id="solutions" className="py-16 md:py-24 bg-mensor-dark border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle title="РЕШЕНИЯ" subtitle="СПЕЦИАЛИЗИРОВАННЫЙ ПОДХОД" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                role: "Застройщику", 
                sub: "Сдаем объект без претензий",
                icon: Building2,
                items: [
                  { b: "Экономия", t: "Контроль «нулевого цикла» и котлована бережет бетон." },
                  { b: "Безопасность", t: "Регулярный мониторинг находит отклонения." },
                  { b: "Результат", t: "Идеальная исполнительная документация." }
                ]
              },
              { 
                role: "Проектировщику", 
                sub: "Точная основа с первого раза",
                icon: Ruler,
                items: [
                  { b: "Точность 1 мм", t: "Исключаем ошибки на старте." },
                  { b: "Совместимость", t: "Файлы готовы для Civil 3D и Revit." },
                  { b: "Полнота", t: "3D-модель местности, а не плоский чертеж." }
                ]
              },
              { 
                role: "Ландшафтникам", 
                sub: "Дизайн в реальный рельеф",
                icon: TreeDeciduous, 
                items: [
                  { b: "Детализация", t: "Модель рельефа с шагом 10 см." },
                  { b: "Учет всего", t: "Точная привязка деревьев и люков." },
                  { b: "Выгода", t: "Минус 30% времени на замеры." }
                ]
              },
              { 
                role: "Частным клиентам", 
                sub: "Дом и участок по закону",
                icon: Home,
                items: [
                  { b: "Вынос границ", t: "Забор без споров с соседями." },
                  { b: "Топосъемка", t: "Для газа, воды и проекта дома." },
                  { b: "Разбивка фундамента", t: "Дом встанет ровно и по проекту." },
                  { b: "Контроль стройки", t: "Проверим строителей." }
                ]
              },
            ].map((card, i) => (
              <div key={i} className="group relative overflow-hidden bg-mensor-gray/20 border border-white/5 hover:border-mensor-accent/50 p-8 transition-all h-full">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-mensor-accent/10 flex items-center justify-center text-mensor-accent">
                    <card.icon size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{card.role}</h3>
                </div>
                <div className="text-mensor-accent font-mono text-xs uppercase tracking-wider mb-6 ml-14">{card.sub}</div>
                
                <ul className="space-y-4">
                  {card.items.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 bg-mensor-accent mt-1.5 rounded-full flex-shrink-0" />
                      <div className="text-mensor-light/80">
                        <strong className="text-white block mb-0.5">{item.b}</strong>
                        {item.t}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 6: TECH & EQUIPMENT */}
      <section className="py-16 md:py-24 bg-mensor-gray border-y border-white/5">
         <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-white mb-6">НАШ АРСЕНАЛ</h2>
              <p className="text-mensor-light/80 mb-8 leading-relaxed">
                Для миллиметровой точности используем собственный парк техники.
              </p>
              <div className="space-y-6">
                {[
                  "Лазерные сканеры: Цифровые двойники и обмеры.",
                  "Тахеометры и GNSS: Привязка и разбивка на местности.",
                  "Лицензионный софт: Данные откроются у вас без ошибок.",
                  "Собственные мощности для обработки облаков точек."
                ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4">
                     <div className="w-2 h-2 bg-mensor-accent rotate-45 flex-shrink-0"></div>
                     <span className="text-white text-sm font-mono">
                       <strong className="text-white">{item.split(':')[0]}:</strong>
                       {item.split(':')[1]}
                     </span>
                   </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative h-[400px] w-full bg-black border border-white/10 p-2 overflow-hidden group">
               {/* Updated visualization with user provided image */}
               <div className="absolute inset-0 bg-[url('https://www.dropbox.com/scl/fi/8lu2fqbxnzuzl81oh3dgw/Screenshot-2025-11-26-at-18.16.39.png?rlkey=icktwf94biv32r81edhnaiji0&raw=1')] bg-cover bg-center opacity-90 transition-transform duration-700 group-hover:scale-105"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-mensor-gray/90 via-transparent to-transparent"></div>
               
               {/* HUD Overlay */}
               <div className="absolute top-4 left-4 font-mono text-[10px] text-mensor-accent">SYS.STATUS: ONLINE</div>
               <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white">LIDAR ACQUISITION...</div>
            </div>
          </div>
         </div>
      </section>

      {/* BLOCK 7: BLOG */}
      <section id="blog" className="py-16 md:py-24 bg-mensor-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle title="БАЗА ЗНАНИЙ" subtitle="ПОЛЕЗНОЕ ВМЕСТО СКУЧНОГО" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Зачем нужна геодезия?",
                desc: "Когда без топосъемки не дадут газ, и зачем проверять границы перед покупкой земли."
              },
              {
                title: "Топосъемка: Цены и сроки",
                desc: "От чего зависит смета и какие документы нужны для старта."
              },
              {
                title: "BIM: Зачем платить за 3D?",
                desc: "Почему 3D-модель выгоднее 2D-чертежа на этапе стройки."
              },
              {
                title: "Споры с соседями",
                desc: "Как вынос границ в натуру бережет нервы и деньги. Инструкция владельцу."
              }
            ].map((post, i) => (
              <div key={i} className="group cursor-pointer bg-white/5 border border-white/5 p-6 hover:border-mensor-accent/50 transition-all flex flex-col h-full">
                <div className="text-mensor-accent text-xs font-mono mb-4 tracking-widest">СТАТЬЯ 0{i+1}</div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-mensor-accent transition-colors">{post.title}</h3>
                <p className="text-sm text-mensor-light/60 mb-6 flex-1">{post.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider group-hover:gap-4 transition-all mt-auto">
                  Читать <ArrowRight size={12} className="text-mensor-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 8: CONTACT & FOOTER */}
      <section id="contact" className="py-32 bg-mensor-dark relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="flex flex-col justify-center">
              <div className="inline-block text-mensor-accent font-mono text-xs tracking-[0.2em] mb-6">КОНТАКТЫ</div>
              <h2 className="text-5xl font-bold text-white mb-8 leading-tight">ОБСУДИМ <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-mensor-accent to-white">ВАШ ОБЪЕКТ?</span></h2>
              <p className="text-mensor-light mb-10 text-lg font-light leading-relaxed opacity-80 max-w-md">
                Оставьте заявку — рассчитаем стоимость и план работ за 24 часа.
              </p>
              <ul className="space-y-6 text-mensor-light font-mono text-sm">
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-mensor-accent/10 flex items-center justify-center text-mensor-accent"><CheckCircle2 size={16} /></div> 
                  +375 (XX) XXX-XX-XX
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-mensor-accent/10 flex items-center justify-center text-mensor-accent"><CheckCircle2 size={16} /></div> 
                  info@mensor.by
                </li>
                <li className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-mensor-accent/10 flex items-center justify-center text-mensor-accent"><CheckCircle2 size={16} /></div> 
                  г. Минск
                </li>
              </ul>
            </div>
            
            <form className="glass-panel p-10 md:p-14 border border-white/5 space-y-8 bg-black/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-xs font-mono text-mensor-accent/70 uppercase tracking-widest group-hover:text-mensor-accent transition-colors">Имя</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-mensor-accent focus:outline-none transition-colors rounded-none placeholder-white/20 font-mono" placeholder="ИВАН" />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs font-mono text-mensor-accent/70 uppercase tracking-widest group-hover:text-mensor-accent transition-colors">Телефон</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-mensor-accent focus:outline-none transition-colors rounded-none placeholder-white/20 font-mono" placeholder="+375..." />
                </div>
              </div>
              <div className="space-y-2 group">
                <label className="text-xs font-mono text-mensor-accent/70 uppercase tracking-widest group-hover:text-mensor-accent transition-colors">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-mensor-accent focus:outline-none transition-colors rounded-none placeholder-white/20 font-mono" placeholder="MAIL@COMPANY.COM" />
              </div>
              <button className="w-full bg-mensor-accent text-white font-bold py-5 hover:bg-white hover:text-mensor-dark transition-all tracking-[0.2em] uppercase text-xs flex justify-center items-center gap-2 group">
                ОСТАВИТЬ ЗАЯВКУ
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-16 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center mb-6 md:mb-0">
               <div className="h-11 transition-transform duration-300 hover:scale-105">
                 <MensorLogo className="h-full w-auto" />
               </div>
            </div>
            <div className="flex gap-10 text-xs font-mono text-mensor-light tracking-widest">
              <a href="#" className="hover:text-mensor-accent transition-colors">TELEGRAM</a>
              <a href="#" className="hover:text-mensor-accent transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-mensor-accent transition-colors">LINKEDIN</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-mensor-light/40 font-mono pt-8 border-t border-white/5 uppercase tracking-wider">
            <p>&copy; 2011-{new Date().getFullYear()} MENSOR ENGINEERING SURVEY. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI WIDGET */}
      <AIChatWidget />
    </div>
  );
}

export default App;
