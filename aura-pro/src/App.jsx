import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Cpu, 
  Eye, 
  BatteryCharging, 
  Layers, 
  RotateCw, 
  Sliders, 
  Check, 
  ArrowUpRight, 
  X, 
  ShoppingBag, 
  Info,
  Maximize2,
  Camera,
  Compass,
  Radio,
  Zap,
  ChevronDown
} from 'lucide-react';

const COLORWAYS = [
  { 
    id: 'natural-titanium', 
    name: 'Natural Titanium', 
    hex: '#A49B8F', 
    glow: 'rgba(164, 155, 143, 0.45)', 
    ringBg: 'from-[#2e2a26] via-[#1a1816] to-[#0a0a0c]',
    surfaceGrad: 'linear-gradient(135deg, #A49B8F 0%, #686157 50%, #2a2723 100%)',
    edgeHighlight: '#d4ccbf',
    desc: 'Grade 5 aerospace titanium with micro-blasted vapor texture.'
  },
  { 
    id: 'space-black', 
    name: 'Space Black', 
    hex: '#1E1F22', 
    glow: 'rgba(50, 52, 58, 0.5)', 
    ringBg: 'from-[#252830] via-[#121316] to-[#050507]',
    surfaceGrad: 'linear-gradient(135deg, #373a40 0%, #1c1d21 50%, #0d0e10 100%)',
    edgeHighlight: '#5b5f6b',
    desc: 'Deep anodized molecular carbon seal with zero-reflection finish.'
  },
  { 
    id: 'desert-gold', 
    name: 'Desert Gold', 
    hex: '#C5A880', 
    glow: 'rgba(197, 168, 128, 0.45)', 
    ringBg: 'from-[#3a2f20] via-[#1e170e] to-[#080705]',
    surfaceGrad: 'linear-gradient(135deg, #d8bc93 0%, #a28359 50%, #3a2b16 100%)',
    edgeHighlight: '#f7e3c3',
    desc: 'Warm reflective golden crystallization with dual-ion infusion.'
  },
  { 
    id: 'aurora-blue', 
    name: 'Aurora Blue', 
    hex: '#3D5A80', 
    glow: 'rgba(61, 90, 128, 0.55)', 
    ringBg: 'from-[#172b43] via-[#0d1825] to-[#03060a]',
    surfaceGrad: 'linear-gradient(135deg, #517cae 0%, #2a415e 50%, #0e1927 100%)',
    edgeHighlight: '#89bbf3',
    desc: 'Sub-surface sapphire interference layer capturing refracted light.'
  }
];

const STORY_STEPS = [
  {
    step: '01',
    eyebrow: 'MATERIAL ARCHITECTURE',
    title: 'Pure Titanium chassis.',
    subtitle: 'Precision honed to 0.005mm.',
    description: 'Forged under 4,000 metric tons of pneumatic pressure. High-frequency laser ablation creates a seamless bond between sapphire crystal and structural Grade 5 titanium.',
    metrics: [
      { label: 'Weight Reduction', val: '−19%' },
      { label: 'Tensile Strength', val: '980 MPa' },
      { label: 'Thermal Shield', val: '3.4x Faster' }
    ],
    highlightCode: 'TITANIUM-GRADE-V'
  },
  {
    step: '02',
    eyebrow: 'SILICON DOMINANCE',
    title: 'M4 Extreme Neural Silicon.',
    subtitle: '120 Trillion operations per second.',
    description: 'Crafted on the breakthrough 2-nanometer FinFET architecture. Ray tracing hardware acceleration with dedicated neuromorphic cores rendering photorealistic spatial scenes in real-time.',
    metrics: [
      { label: 'Neural Compute', val: '120 TOPS' },
      { label: 'GPU Efficiency', val: '+45%' },
      { label: 'Memory Bandwidth', val: '400 GB/s' }
    ],
    highlightCode: 'M4-EXTREME-2NM'
  },
  {
    step: '03',
    eyebrow: 'OPTICAL BREAKTHROUGH',
    title: 'Liquid Retina XDR Ultra.',
    subtitle: 'ProMotion adaptive 1Hz to 240Hz.',
    description: 'Micro-OLED tandem arrays delivering 3,200 nits peak outdoor brightness. Nanometer anti-reflective coating delivers pitch blacks and infinite contrast with zero bloom.',
    metrics: [
      { label: 'Peak Brightness', val: '3,200 nits' },
      { label: 'Contrast Ratio', val: '2,000,000:1' },
      { label: 'Response Time', val: '0.1 ms' }
    ],
    highlightCode: 'XDR-TANDEM-OLED'
  }
];

const CAMERA_ZOOM_LEVELS = [
  { 
    zoom: '0.5x', 
    focal: '13mm', 
    aperture: 'ƒ/2.2', 
    label: 'Ultra Wide', 
    lensDesc: '120° Panoramic Field of View with Macro AutoFocus down to 2cm',
    scale: 0.72,
    blur: '0px'
  },
  { 
    zoom: '1x', 
    focal: '24mm', 
    aperture: 'ƒ/1.4', 
    label: 'Main Fusion', 
    lensDesc: '2-micron quad-pixel array with 100% focus pixels and 2nd gen sensor-shift OIS',
    scale: 1,
    blur: '0px'
  },
  { 
    zoom: '2x', 
    focal: '48mm', 
    aperture: 'ƒ/1.7', 
    label: 'Telephoto Crop', 
    lensDesc: 'Lossless sensor-crop computational fusion portrait focal length',
    scale: 1.45,
    blur: '0px'
  },
  { 
    zoom: '5x', 
    focal: '120mm', 
    aperture: 'ƒ/2.8', 
    label: 'Tetraprism Tele', 
    lensDesc: 'Light folded 4 times inside glass prism for unprecedented optical reach',
    scale: 2.1,
    blur: '0.5px'
  },
  { 
    zoom: '10x', 
    focal: '240mm', 
    aperture: 'ƒ/3.2', 
    label: 'Neural Super-Res', 
    lensDesc: 'Sub-pixel machine learning upsampling preserving micro-textures at long range',
    scale: 3.2,
    blur: '1px'
  }
];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORWAYS[0]);
  const [activeZoomIndex, setActiveZoomIndex] = useState(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comparisonSliderPos, setComparisonSliderPos] = useState(50);
  
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const heroRef = useRef(null);

  const [configModel, setConfigModel] = useState('Aura Pro Max');
  const [configStorage, setConfigStorage] = useState('512GB');
  const [configTradeIn, setConfigTradeIn] = useState(true);
  const [configAppleCare, setConfigAppleCare] = useState(false);

  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleHeroMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const toggleAudio = () => {
    if (!isAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(174, ctx.currentTime);
          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();

          oscRef.current = osc;
          gainRef.current = gain;
        }
      } catch (err) {
        console.warn('Audio Context init prevented:', err);
      }
      setIsAudioPlaying(true);
    } else {
      if (audioCtxRef.current && gainRef.current) {
        gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, audioCtxRef.current.currentTime);
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.4);
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
        }, 500);
      }
      setIsAudioPlaying(false);
    }
  };

  const calculatedPrice = useMemo(() => {
    let base = configModel === 'Aura Pro Max' ? 1299 : 1099;
    if (configStorage === '512GB') base += 200;
    if (configStorage === '1TB') base += 400;
    if (configStorage === '2TB') base += 700;
    if (configAppleCare) base += 199;
    if (configTradeIn) base -= 350;
    return base;
  }, [configModel, configStorage, configTradeIn, configAppleCare]);

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans antialiased selection:bg-[#3d5a80]/50 selection:text-white overflow-x-hidden">
      
      {/* Sticky Glass Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 40 
            ? 'bg-[#000000]/75 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between text-xs tracking-tight">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#3a3a40] via-[#858595] to-[#f5f5f7] flex items-center justify-center p-[1px] shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <span className="text-[11px] font-bold tracking-widest text-white/90">◈</span>
              </div>
            </div>
            <span className="font-semibold text-white tracking-wide text-sm">Aura <span className="text-zinc-400 font-light">Pro</span></span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-zinc-400 text-[13px]">
            <a href="#overview" className="hover:text-white transition-colors">Overview</a>
            <a href="#breakthroughs" className="hover:text-white transition-colors">Breakthroughs</a>
            <a href="#colorways" className="hover:text-white transition-colors">Design & Colors</a>
            <a href="#optics" className="hover:text-white transition-colors">Camera Lab</a>
            <a href="#specs" className="hover:text-white transition-colors">Compare</a>
          </nav>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-medium text-black bg-gradient-to-r from-zinc-100 via-white to-zinc-200 hover:from-white hover:to-white shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all active:scale-95"
            >
              <span>Pre-order</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5 opacity-70" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="overview"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[105vh] flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-sky-900/20 via-indigo-900/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="text-center z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md text-[11px] font-medium tracking-widest text-zinc-300 uppercase shadow-inner">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>Titanium Grade 5 • Neural OS 4</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600">
            Aura Pro.
          </h1>

          <p className="text-lg sm:text-2xl font-normal text-zinc-400 tracking-tight max-w-xl mx-auto">
            Forged in titanium. Powered by M4 Extreme. An instrument of boundless imagination.
          </p>

          <div className="flex items-center justify-center space-x-4 pt-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95"
            >
              Order from $1,099
            </button>
            <a 
              href="#breakthroughs" 
              className="px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-zinc-200 text-sm font-medium border border-white/[0.1] backdrop-blur-md transition-all inline-flex items-center space-x-1.5"
            >
              <span>Explore hardware</span>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </a>
          </div>
        </div>

        {/* 3D Hardware Simulation Device */}
        <div className="relative mt-12 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] h-[520px] sm:h-[600px] flex items-center justify-center perspective-[1200px]">
          <div 
            className="w-full h-full relative transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div 
              className="absolute inset-0 rounded-[52px] p-[3px] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.06)]"
              style={{
                background: selectedColor.surfaceGrad,
                boxShadow: `0 35px 80px -15px ${selectedColor.glow}`
              }}
            >
              <div className="w-full h-full bg-[#0a0a0c] rounded-[49px] p-2.5 relative overflow-hidden border border-white/10 flex flex-col justify-between">
                
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.35) 0%, transparent 60%)`
                  }}
                />

                {/* Dynamic Island */}
                <div className="relative z-20 flex justify-center pt-1.5">
                  <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-3 border border-white/[0.08] shadow-inner">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-700/80 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-500/70" />
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[9px] text-zinc-400 font-mono">240Hz</span>
                    </div>
                  </div>
                </div>

                {/* Center Core Screen Graphic */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '28s' }} />
                    <div className="absolute inset-4 rounded-full border border-dashed border-sky-400/20 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
                    <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-amber-500/10 blur-xl animate-pulse" />
                    
                    <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-white/20 shadow-2xl flex flex-col items-center justify-center">
                      <Zap className="w-6 h-6 text-amber-300 mb-0.5" />
                      <span className="text-[10px] font-mono tracking-wider text-zinc-300">120 TFLOPS</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Micro-OLED XDR</p>
                    <p className="text-xl font-bold tracking-tight text-white mt-0.5">Quantum Fusion Engine</p>
                  </div>
                </div>

                <div className="relative z-20 flex justify-center pb-1">
                  <div className="w-32 h-1 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>

            <div className="absolute -left-1 top-24 w-1.5 h-12 bg-zinc-600 rounded-l-sm opacity-60" />
            <div className="absolute -right-1 top-36 w-1.5 h-16 bg-zinc-600 rounded-r-sm opacity-60" />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center text-zinc-500 text-xs tracking-widest space-y-2 uppercase">
          <span>Scroll to uncover breakthrough architecture</span>
          <div className="w-5 h-9 rounded-full border border-zinc-700 p-1 flex justify-center">
            <div className="w-1 h-2 bg-zinc-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Breakthrough Architecture */}
      <section id="breakthroughs" className="relative py-28 border-t border-white/[0.06] bg-[#030304]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400/90">Deep Dive Architecture</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
              Every micron reconsidered.
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-10 p-1.5 bg-zinc-900/60 rounded-2xl border border-white/10 backdrop-blur-md">
            {STORY_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStoryIndex(idx)}
                className={`py-3 px-3 rounded-xl text-left transition-all relative ${
                  activeStoryIndex === idx
                    ? 'bg-zinc-800 text-white shadow-lg border border-white/10'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono opacity-60">{s.step}</span>
                  <span className="text-xs md:text-sm font-semibold truncate">{s.eyebrow}</span>
                </div>
                {activeStoryIndex === idx && (
                  <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-amber-400 to-sky-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-b from-zinc-900/40 to-black/80 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden backdrop-blur-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[11px] font-mono text-zinc-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>{STORY_STEPS[activeStoryIndex].highlightCode}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    {STORY_STEPS[activeStoryIndex].title}
                  </h3>
                  <p className="text-xl sm:text-2xl text-zinc-400 font-light">
                    {STORY_STEPS[activeStoryIndex].subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-zinc-300/80 leading-relaxed max-w-xl">
                  {STORY_STEPS[activeStoryIndex].description}
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  {STORY_STEPS[activeStoryIndex].metrics.map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {m.val}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex items-center justify-center p-4">
                <div className="relative w-full aspect-square max-w-[340px] rounded-2xl bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-black p-6 border border-white/10 flex flex-col items-center justify-center shadow-2xl">
                  {activeStoryIndex === 0 && (
                    <div className="relative w-full h-full flex flex-col items-center justify-center space-y-3">
                      <div className="w-48 h-10 rounded-xl bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 shadow-md border border-white/30 transform -rotate-3 transition-transform" />
                      <div className="w-52 h-10 rounded-xl bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-700 shadow-lg border border-white/10 transform rotate-1 transition-transform" />
                      <div className="w-44 h-10 rounded-xl bg-gradient-to-r from-zinc-800 via-zinc-900 to-black shadow-inner border border-zinc-700 transform -rotate-2" />
                      <span className="text-[10px] font-mono text-zinc-400 tracking-wider pt-2">GRADE 5 DIFFUSION BONDING</span>
                    </div>
                  )}

                  {activeStoryIndex === 1 && (
                    <div className="relative w-44 h-44 rounded-2xl bg-[#090b10] border border-sky-500/30 p-4 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.15)]">
                      <Cpu className="w-14 h-14 text-sky-400 mb-2 animate-pulse" />
                      <div className="text-xs font-mono font-bold text-white tracking-wider">M4 EXTREME</div>
                      <div className="text-[10px] text-zinc-400">2nm Unified Die</div>
                      <div className="absolute inset-0 border border-sky-400/20 rounded-2xl animate-ping opacity-20 pointer-events-none" />
                    </div>
                  )}

                  {activeStoryIndex === 2 && (
                    <div className="relative w-48 h-64 rounded-3xl bg-black border-2 border-zinc-600 p-2 flex flex-col justify-between overflow-hidden shadow-2xl">
                      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-amber-500/20 via-indigo-600/20 to-sky-500/30 p-3 flex flex-col justify-between">
                        <div className="flex justify-between items-center text-[10px] font-mono text-white/90">
                          <span>3,200 NITS</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <div className="text-center font-extrabold text-sm tracking-tight text-white">
                          TANDEM OLED
                        </div>
                        <div className="text-[9px] font-mono text-zinc-300 text-center">
                          0.0001 nit Pure Black
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finishes Studio */}
      <section id="colorways" className="py-28 relative border-t border-white/[0.06] bg-[#000000]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Finish Studio</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-2 mb-3">
            Titanium in four distinct tones.
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm sm:text-base mb-12">
            Engineered through sub-micron Physical Vapor Deposition for scratch resilience and deep luminescence.
          </p>

          <div className="relative max-w-xl mx-auto bg-gradient-to-b from-zinc-900/60 to-black rounded-3xl border border-white/10 p-8 shadow-2xl overflow-hidden">
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: selectedColor.glow }}
            />

            <div className="relative z-10 py-8 flex flex-col items-center">
              <div 
                className="w-56 h-80 rounded-[44px] p-2.5 transition-all duration-500 shadow-2xl relative"
                style={{
                  background: selectedColor.surfaceGrad,
                  boxShadow: `0 25px 60px -10px ${selectedColor.glow}`
                }}
              >
                <div className="w-full h-full bg-[#08080a] rounded-[36px] flex flex-col justify-between p-4 relative overflow-hidden border border-white/10">
                  <div className="w-16 h-3 bg-black rounded-full mx-auto" />
                  <div className="text-center space-y-1">
                    <p className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">Finish</p>
                    <p className="text-base font-bold text-white">{selectedColor.name}</p>
                  </div>
                  <div className="w-20 h-1 bg-white/20 rounded-full mx-auto" />
                </div>
              </div>

              <p className="text-xs text-zinc-400 mt-6 max-w-sm text-center italic">
                "{selectedColor.desc}"
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-center space-x-4 pt-6 border-t border-white/10">
              {COLORWAYS.map((c) => {
                const isActive = selectedColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className="group flex flex-col items-center space-y-2 focus:outline-none"
                    aria-label={`Select ${c.name}`}
                  >
                    <div 
                      className={`w-9 h-9 rounded-full p-0.5 transition-all duration-300 ${
                        isActive 
                          ? 'ring-2 ring-white scale-110 shadow-lg' 
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <div 
                        className="w-full h-full rounded-full border border-black/30 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                    </div>
                    <span className={`text-[10px] tracking-wide font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                      {c.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Highlights */}
      <section className="py-28 border-t border-white/[0.06] bg-[#020203]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">Modular Superiority</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-2">
              Beyond standard capabilities.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Micro-engineered sensors and custom silicon harmonize for uncompromised performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 rounded-3xl bg-zinc-900/50 border border-white/10 p-7 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">36-Hour Continuous.</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Dual-tier graphene electrolyte cells with intelligent thermal shunt circuits for all-day heavy compute.
                </p>
              </div>

              <div className="py-6 flex items-center justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="52" 
                      stroke="#27272a" 
                      strokeWidth="10" 
                      fill="transparent" 
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="52" 
                      stroke="#10b981" 
                      strokeWidth="10" 
                      strokeDasharray="326" 
                      strokeDashoffset="45" 
                      strokeLinecap="round" 
                      fill="transparent" 
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-extrabold text-white">88%</span>
                    <span className="text-[10px] text-zinc-500 font-mono">STANDBY READY</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-zinc-500 flex justify-between border-t border-white/5 pt-3">
                <span>MagFast 45W</span>
                <span>0 to 80% in 22 min</span>
              </div>
            </div>

            <div className="md:col-span-2 rounded-3xl bg-zinc-900/50 border border-white/10 p-7 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    Spatial Audio with Dynamic Head Tracking.
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
                    Custom 6-driver acoustic architecture with studio-grade micro-woofers pushing binaural clarity.
                  </p>
                </div>

                <button
                  onClick={toggleAudio}
                  className={`px-3.5 py-2 rounded-full border text-xs font-medium flex items-center space-x-2 transition-all ${
                    isAudioPlaying 
                      ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
                      : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isAudioPlaying ? 'Stop Acoustic Demo' : 'Play Solfeggio Demo'}</span>
                </button>
              </div>

              <div className="my-8 flex items-center justify-center space-x-1.5 h-20">
                {[40, 65, 25, 90, 45, 100, 30, 75, 55, 95, 35, 80, 50, 70, 85, 40, 60].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isAudioPlaying 
                        ? 'bg-gradient-to-t from-indigo-500 to-sky-300 animate-pulse' 
                        : 'bg-zinc-700/60'
                    }`}
                    style={{
                      height: isAudioPlaying ? `${Math.min(100, h * 0.9)}%` : '18%',
                      animationDelay: `${i * 60}ms`
                    }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
                <div>
                  <div className="text-white font-bold text-sm">Dolby Atmos</div>
                  <div className="text-[10px] text-zinc-500">Native Mastered</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Adaptive EQ</div>
                  <div className="text-[10px] text-zinc-500">10,000x/sec Calib</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Studio Mics</div>
                  <div className="text-[10px] text-zinc-500">Triple beamforming</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optics Lab Viewfinder */}
      <section id="optics" className="py-28 border-t border-white/[0.06] bg-[#000000]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Optics Engineering</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1">
              Photons caught in flight.
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Switch focal lengths to simulate the quad-lens optical pipeline in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {CAMERA_ZOOM_LEVELS.map((item, idx) => {
              const isSelected = activeZoomIndex === idx;
              return (
                <button
                  key={item.zoom}
                  onClick={() => setActiveZoomIndex(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="text-sm">{item.zoom}</span>
                  <span className="opacity-60 ml-1.5 text-[10px]">({item.focal})</span>
                </button>
              );
            })}
          </div>

          <div className="relative rounded-3xl bg-zinc-950 border border-white/15 overflow-hidden shadow-2xl aspect-[16/10] max-h-[500px]">
            <div className="absolute top-4 left-5 right-5 z-20 flex justify-between items-center text-xs font-mono text-white/80">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>RAW 48MP • ProRes 4K 120fps</span>
              </div>
              <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span>{CAMERA_ZOOM_LEVELS[activeZoomIndex].aperture}</span>
                <span>ISO 64</span>
                <span>1/2000s</span>
              </div>
            </div>

            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
              <div className="w-28 h-28 border border-white/20 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 border-t border-l border-amber-400" />
              </div>
            </div>

            <div 
              className="w-full h-full relative transition-all duration-700 ease-out flex items-center justify-center overflow-hidden"
              style={{
                transform: `scale(${CAMERA_ZOOM_LEVELS[activeZoomIndex].scale})`,
                filter: `blur(${CAMERA_ZOOM_LEVELS[activeZoomIndex].blur})`
              }}
            >
              <div className="w-full h-full bg-gradient-to-tr from-[#0b101b] via-[#1f2839] to-[#3a3f58] flex items-center justify-center relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-b from-amber-200 to-amber-600 shadow-[0_0_80px_rgba(251,191,36,0.6)] flex items-center justify-center" />
                <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-zinc-900 to-transparent opacity-90" />
                <div className="absolute bottom-6 font-mono text-zinc-300 text-xs tracking-widest uppercase">
                  Apex Observation Ridge • 4,200m
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 z-20 bg-black/60 backdrop-blur-md p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">{CAMERA_ZOOM_LEVELS[activeZoomIndex].label}</span>
                <span className="text-zinc-500">|</span>
                <span className="text-zinc-300 font-mono">{CAMERA_ZOOM_LEVELS[activeZoomIndex].focal} equivalent</span>
              </div>
              <p className="text-zinc-400 text-[11px] mt-1 sm:mt-0 text-center sm:text-right">
                {CAMERA_ZOOM_LEVELS[activeZoomIndex].lensDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Model Matrix Comparison */}
      <section id="specs" className="py-28 border-t border-white/[0.06] bg-[#020204]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Model Matrix</span>
            <h2 className="text-4xl font-extrabold text-white mt-2">
              Compare Aura with Aura Pro.
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Drag the divider below to inspect dimensional and architectural differences.
            </p>
          </div>

          <div className="relative rounded-3xl border border-white/15 bg-zinc-950 overflow-hidden select-none shadow-2xl">
            <div className="p-8 md:p-12 space-y-6">
              <div className="max-w-xs space-y-2">
                <span className="text-xs font-mono text-zinc-500">ALUMINUM CHASSIS</span>
                <h3 className="text-2xl font-bold text-white">Aura Standard</h3>
                <p className="text-xs text-zinc-400">Balanced power for daily workflows.</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
                <div>
                  <div className="text-zinc-500 text-xs">Chip</div>
                  <div className="text-white font-medium">M4 Core Silicon</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-xs">Display</div>
                  <div className="text-white font-medium">6.3-inch Retina (120Hz)</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-xs">Camera System</div>
                  <div className="text-white font-medium">Dual 48MP Wide / Ultra Wide</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-xs">Chassis</div>
                  <div className="text-white font-medium">Anodized Aerospace Aluminum</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-xs">Starting from</div>
                  <div className="text-lg font-bold text-white">$899</div>
                </div>
              </div>
            </div>

            <div 
              className="absolute inset-y-0 right-0 bg-gradient-to-l from-zinc-900 via-zinc-900/95 to-zinc-950 border-l border-white/20 p-8 md:p-12 overflow-hidden flex flex-col justify-start"
              style={{ width: `${100 - comparisonSliderPos}%` }}
            >
              <div className="min-w-[280px] space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-amber-400">GRADE 5 TITANIUM</span>
                  <h3 className="text-2xl font-bold text-white">Aura Pro Max</h3>
                  <p className="text-xs text-zinc-300">Uncompromising computing power.</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
                  <div>
                    <div className="text-zinc-400 text-xs">Chip</div>
                    <div className="text-amber-300 font-bold">M4 Extreme (120 TOPS)</div>
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs">Display</div>
                    <div className="text-white font-medium">6.9-inch Liquid XDR (240Hz)</div>
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs">Camera System</div>
                    <div className="text-white font-medium">Quad 48MP Tetraprism 10x Zoom</div>
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs">Chassis</div>
                    <div className="text-white font-medium">Grade 5 Precision Titanium</div>
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs">Starting from</div>
                    <div className="text-lg font-bold text-white">$1,099</div>
                  </div>
                </div>
              </div>
            </div>

            <input 
              type="range"
              min="15"
              max="85"
              value={comparisonSliderPos}
              onChange={(e) => setComparisonSliderPos(Number(e.target.value))}
              className="absolute inset-x-0 bottom-4 w-11/12 mx-auto z-30 opacity-70 hover:opacity-100 cursor-ew-resize accent-white"
            />
          </div>
        </div>
      </section>

      {/* Pre-Order Strip */}
      <section className="py-24 border-t border-white/10 bg-gradient-to-b from-[#050507] to-black">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Elevate your standard.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            Reserve Aura Pro with complimentary express carrier dispatch and trade-in deductions applied instantly.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:bg-zinc-200 transition-all shadow-[0_0_35px_rgba(255,255,255,0.3)] active:scale-95 inline-flex items-center space-x-2"
            >
              <span>Customize & Pre-order Aura Pro</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Pre-Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0e0e11] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <ShoppingBag className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-bold text-white">Configure your Aura Pro</h3>
            </div>

            <div className="space-y-6 text-left">
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">1. Choose Model</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Aura Pro (6.3")', 'Aura Pro Max (6.9")'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setConfigModel(m.includes('Max') ? 'Aura Pro Max' : 'Aura Pro')}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all text-left ${
                        configModel === (m.includes('Max') ? 'Aura Pro Max' : 'Aura Pro')
                          ? 'bg-white/10 border-white text-white'
                          : 'bg-zinc-900 border-white/10 text-zinc-400'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                  2. Selected Titanium Finish: <span className="text-white font-medium">{selectedColor.name}</span>
                </label>
                <div className="flex space-x-3">
                  {COLORWAYS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full p-0.5 border ${
                        selectedColor.id === c.id ? 'ring-2 ring-white border-transparent' : 'border-white/20'
                      }`}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">3. Storage Capacity</label>
                <div className="grid grid-cols-3 gap-2">
                  {['256GB', '512GB', '1TB'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setConfigStorage(st)}
                      className={`p-3 rounded-xl border text-xs font-mono transition-all ${
                        configStorage === st
                          ? 'bg-white/10 border-white text-white font-bold'
                          : 'bg-zinc-900 border-white/10 text-zinc-400'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Apple Trade-In Credit</div>
                  <div className="text-xs text-zinc-400">Trade in your previous smartphone for instant credit.</div>
                </div>
                <input 
                  type="checkbox"
                  checked={configTradeIn}
                  onChange={(e) => setConfigTradeIn(e.target.checked)}
                  className="w-5 h-5 accent-white cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">AuraCare+ 2-Year Plan (+$199)</div>
                  <div className="text-xs text-zinc-400">Unlimited repairs for accidental drops & battery replacement.</div>
                </div>
                <input 
                  type="checkbox"
                  checked={configAppleCare}
                  onChange={(e) => setConfigAppleCare(e.target.checked)}
                  className="w-5 h-5 accent-white cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Estimated Total</div>
                  <div className="text-3xl font-black text-white">${calculatedPrice}</div>
                  {configTradeIn && (
                    <div className="text-[10px] text-emerald-400 font-mono">Includes $350 Trade-In Discount</div>
                  )}
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all"
                >
                  Confirm & Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black text-zinc-500 text-xs">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <div className="text-[11px] leading-relaxed space-y-2 text-zinc-600">
            <p>* Trade-in values vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit.</p>
            <p>** Battery life claims tested with continuous 4K spatial video playback in controlled laboratory conditions.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 text-zinc-400">
            <div>Copyright © 2026 Aura Inc. All rights reserved.</div>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#overview" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#overview" className="hover:text-white transition-colors">Legal Terms</a>
              <a href="#overview" className="hover:text-white transition-colors">Sales Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}