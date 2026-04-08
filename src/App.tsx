import { useState, FormEvent, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Shield, Train, Globe, ChevronRight, CheckCircle2, Lock, MessageSquare, X, Send, Cpu, ArrowRight, TrendingUp, Bot, Zap, ShieldCheck, Database, Activity, Code, Layers, User, Map } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows, Html } from '@react-three/drei';
import { GoogleGenAI } from '@google/genai';
import * as THREE from 'three';

// --- GEMINI AI INTEGRATION ---
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- MOCK API & REGLAS DE NEGOCIO ---
const submitWaitlist = async (formData: { name: string; email: string; amount: number }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          ...formData,
          walletBalance: 0,
          pachaTokens: 0,
          kycStatus: 'pending',
          registrationHash: `0x_mock_${Math.random().toString(36).substring(2, 15)}`
        }
      });
    }, 1500);
  });
};

// --- 3D FRACTIONALIZED LAND COMPONENT ---
// Regla 4: Simulación Total. Representación visual de la tokenización de tierras.
function FractionalizedLand() {
  const groupRef = useRef<THREE.Group>(null);
  
  const blocks = useMemo(() => {
    const temp = [];
    const gridSize = 12; // 12x12 = 144 tokens
    const blockSize = 0.6;
    const gap = 0.02;
    const step = blockSize + gap;
    
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // Calcular posición base centrada
        const posX = (x - gridSize / 2 + 0.5) * step;
        const posZ = (z - gridSize / 2 + 0.5) * step;
        
        // Topografía procedimental (colinas)
        const height = 0.5 + Math.max(0, Math.sin(posX * 0.4) * Math.cos(posZ * 0.4) * 1.5) + (posX + 4) * 0.1;
        
        // Tokens premium/vendidos
        const isGold = Math.random() > 0.85;
        const isEmerald = Math.random() > 0.9;
        
        temp.push({
          id: `${x}-${z}`,
          origPos: [posX, height / 2, posZ],
          height: height,
          isGold,
          isEmerald
        });
      }
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Animación de fraccionalización (respiración)
    const pulse = (Math.sin(time * 1.2) + 1) / 2; // 0 a 1
    // Curva de aceleración suave
    const easePulse = pulse * pulse * (3 - 2 * pulse); 
    const separation = 1 + easePulse * 0.5; // 1.0 a 1.5
    
    groupRef.current.children.forEach((child, i) => {
      if (i >= blocks.length) return;
      const orig = blocks[i].origPos;
      
      // Expansión horizontal desde el centro
      child.position.x = orig[0] * separation;
      child.position.z = orig[2] * separation;
      
      // Ligera levitación individual al separarse
      child.position.y = orig[1] + easePulse * (Math.sin(orig[0] * 2 + time) * 0.2);
    });
  });

  return (
    <>
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.8} 
        enablePan={false} 
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0, 0]}
      />
      
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-10, 5, -10]} intensity={0.5} color="#B59410" />

      <group position={[0, -1, 0]}>
        {/* Base de la tierra (raíces/fundación) */}
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[8.5, 0.2, 8.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.1} />
        </mesh>
        
        {/* Cuadrícula holográfica base */}
        <mesh position={[0, -0.39, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[8.5, 8.5, 12, 12]} />
          <meshStandardMaterial color="#B59410" emissive="#B59410" emissiveIntensity={0.2} wireframe transparent opacity={0.3} />
        </mesh>

        {/* Bloques de Tierra (Tokens) */}
        <group ref={groupRef}>
          {blocks.map((block) => {
            let color = "#1e293b";
            let emissive = "#000000";
            let intensity = 0;
            
            if (block.isGold) {
              color = "#B59410";
              emissive = "#B59410";
              intensity = 0.6;
            } else if (block.isEmerald) {
              color = "#10B981";
              emissive = "#10B981";
              intensity = 0.6;
            }

            return (
              <mesh key={block.id} castShadow receiveShadow>
                <boxGeometry args={[0.58, block.height, 0.58]} />
                <meshStandardMaterial 
                  color={color} 
                  emissive={emissive}
                  emissiveIntensity={intensity}
                  roughness={0.8}
                  metalness={0.2}
                />
              </mesh>
            );
          })}
        </group>

        {/* Etiqueta Flotante */}
        <Html position={[0, 4, 0]} center className="pointer-events-none">
          <div className="flex flex-col items-center">
            <div className="px-3 py-1.5 bg-navy/90 text-gold text-xs font-mono rounded border border-gold/30 whitespace-nowrap backdrop-blur-md shadow-xl">
              1 TOKEN = 1 m² DE TIERRA <br/>
              <span className="text-white/80 text-[10px]">MACROLOTE SAN BARTOLO</span>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
          </div>
        </Html>
      </group>
    </>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [investment, setInvestment] = useState<number>(10000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', amount: 10000 });
  const [genesisSpots] = useState(87);

  // Legal Explorer State
  const [activeLegalStep, setActiveLegalStep] = useState(0);
  const legalSteps = [
    { id: 'investor', title: '1. Tú (Inversor)', icon: User, desc: 'Tu capital inicia el viaje. Tienes el control total de tus tokens $PACHA en tu billetera digital, representando tu participación exacta.' },
    { id: 'wyoming', title: '2. Titanio Global (EE.UU.)', icon: Globe, desc: 'Tu inversión ingresa a través de una estructura súper eficiente en EE.UU. Esto garantiza que tu dinero esté en una jurisdicción de primer nivel, privada y sin dolores de cabeza fiscales.' },
    { id: 'peru', title: '3. Titanio Local (Perú)', icon: Shield, desc: 'La estructura de EE.UU. se conecta a un Fideicomiso regulado en Perú. Es como tener un candado mágico: la tierra es tuya y de nadie más, haciéndola jurídicamente inembargable.' },
    { id: 'land', title: '4. Tierra Real (San Bartolo)', icon: Map, desc: 'El Fideicomiso custodia la tierra física. Pase lo que pase con la plataforma, tu inversión está respaldada por metros cuadrados reales en la zona de mayor plusvalía.' }
  ];

  // Live Order Book State
  const [liveTrades, setLiveTrades] = useState<{id: string, time: string, wallet: string, type: 'buy' | 'sell', amount: number, price: number}[]>([
    { id: '1', time: '10:42:05', wallet: '0x7F...A1B2', type: 'buy', amount: 150, price: 26.50 },
    { id: '2', time: '10:41:30', wallet: '0x3A...C9D1', type: 'sell', amount: 45, price: 26.80 },
    { id: '3', time: '10:39:12', wallet: '0x9B...E4F5', type: 'buy', amount: 320, price: 26.45 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTrades(prev => {
        const newTrade = {
          id: Math.random().toString(36).substring(2, 9),
          time: new Date().toLocaleTimeString('es-PE', { hour12: false }),
          wallet: `0x${Math.random().toString(16).substring(2, 4).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`,
          type: Math.random() > 0.3 ? 'buy' : 'sell' as 'buy' | 'sell',
          amount: Math.floor(Math.random() * 500) + 10,
          price: 26 + Math.random(),
        };
        return [newTrade, ...prev].slice(0, 5);
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hola. Soy el Agente de Cumplimiento RWA de PachaNova. ¿En qué puedo asesorarte sobre nuestra tokenización institucional?' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const calculateProjection = (amount: number) => {
    const isGenesis = amount >= 30000;
    const entryPrice = isGenesis ? 84 : 120;
    const tokens = amount / entryPrice;
    const projectedValue = tokens * 220;
    return { tokens, projectedValue, isGenesis };
  };

  const { tokens, projectedValue, isGenesis } = calculateProjection(investment);

  const chartData = [
    { year: 'Año 1', value: investment, milestone: 'Adquisición Macrolote' },
    { year: 'Año 2', value: investment * 1.15, milestone: 'Zonificación' },
    { year: 'Año 3', value: investment * 1.35, milestone: 'Inicio Obras Tren' },
    { year: 'Año 4', value: investment * 1.60, milestone: 'Estación Terminada' },
    { year: 'Año 5', value: investment * 1.90, milestone: 'Desarrollo Urbano' },
    { year: 'Año 6', value: projectedValue, milestone: 'Subasta Final' },
  ];

  const handleWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await submitWaitlist(formData);
      console.log("Registro exitoso:", response);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro',
        contents: userMsg,
        config: {
          systemInstruction: "Eres el Asesor RWA y Oficial de Cumplimiento de PachaNova. Eres un experto en tokenización inmobiliaria, el estándar ERC-3643 y el modelo de Doble Escudo legal (Wyoming LLC + Fideicomiso SBS Perú). Responde de manera profesional, concisa, visionaria y persuasiva (arquetipo 'El Gobernante'). Enfócate en la seguridad inembargable, la transparencia on-chain y el alto retorno asimétrico (TIR 37.5%) del proyecto en San Bartolo impulsado por el Tren Lima-Ica. No uses formato markdown complejo, mantén respuestas cortas de 2-3 párrafos máximo."
        }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'Error procesando la respuesta.' }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Lo siento, mis sistemas de orquestación están experimentando latencia. Por favor, intenta de nuevo.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-slate-900 font-sans selection:bg-gold/30 selection:text-navy">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-navy flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl leading-none">P</span>
            </div>
            <span className="text-xl font-medium tracking-tight text-navy">Pacha<span className="text-gold">Nova</span></span>
          </div>
          <a href="#waitlist" className="px-6 py-2.5 bg-navy hover:bg-navy/90 text-white font-medium rounded-sm transition-colors duration-200 shadow-md">
            Acceso Anticipado
          </a>
        </div>
      </nav>

      {/* Hero Section 3D Hardware Aesthetic */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-[#F8FAFC]">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-slate-200/50 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-sm font-semibold mb-8 text-slate-700 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              NUEVA ERA RWA
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.1] text-navy">
              Tierra Real.<br />
              <span className="text-gradient-gold">
                Cero Estrés.
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mb-10 leading-relaxed font-medium">
              Invierte en grandes terrenos con la facilidad de un clic y la seguridad de un banco suizo. Eres dueño de un pedacito de tierra real, protegido por tecnología de punta, listo para crecer.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#investors" className="w-full sm:w-auto px-8 py-4 bg-navy hover:bg-navy/90 text-white font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-[0_8px_20px_rgba(10,25,47,0.2)] hover:shadow-[0_12px_25px_rgba(10,25,47,0.3)] hover:-translate-y-1">
                Portal de Inversores <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#developers" className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-white/80 text-navy font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-lg">
                API para Desarrolladores <Code className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* 3D Canvas Container */}
          <motion.div 
            style={{ y }}
            className="relative h-[500px] lg:h-[700px] w-full rounded-2xl overflow-hidden border border-slate-200/50 shadow-2xl bg-slate-900"
          >
            {/* HUD Overlay */}
            <div className="absolute top-4 left-4 z-20 font-mono text-xs text-white bg-navy/60 backdrop-blur-md px-4 py-3 rounded-lg border border-white/10 shadow-lg">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                <span className="font-semibold tracking-wider">SATELLITE SYNC: LIVE</span>
              </div>
              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between gap-4"><span>LAT:</span> <span className="text-gold">-12.382696</span></div>
                <div className="flex justify-between gap-4"><span>LNG:</span> <span className="text-gold">-76.756092</span></div>
                <div className="flex justify-between gap-4"><span>ELEV:</span> <span>45m MSL</span></div>
                <div className="flex justify-between gap-4"><span>SECTOR:</span> <span>SAN BARTOLO 15855</span></div>
              </div>
            </div>

            <Canvas camera={{ position: [8, 6, 10], fov: 45 }} dpr={[1, 2]} shadows>
              <FractionalizedLand />
              <Environment preset="city" />
            </Canvas>
          </motion.div>
        </div>
      </section>

      {/* Data & Intelligence en Tiempo Real */}
      <section className="border-y border-slate-200 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="py-8 md:px-8 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-slate-500 mb-2 font-medium">
                <Database className="w-4 h-4" /> TVL Proyectado
              </div>
              <div className="text-4xl font-bold text-navy tracking-tight">$1.2M <span className="text-lg text-slate-400 font-normal">USD</span></div>
            </div>
            <div className="py-8 md:px-8 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-slate-500 mb-2 font-medium">
                <Layers className="w-4 h-4" /> Tokens Emitidos
              </div>
              <div className="text-4xl font-bold text-navy tracking-tight">48,000 <span className="text-lg text-slate-400 font-normal">$PACHA</span></div>
            </div>
            <div className="py-8 md:px-8 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-slate-500 mb-2 font-medium">
                <Activity className="w-4 h-4" /> Rendimiento TIR
              </div>
              <div className="text-4xl font-bold text-emerald tracking-tight">37.5% <span className="text-lg text-slate-400 font-normal">Anual</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Belt - Hardware Specs Style */}
      <section className="border-b border-slate-200 bg-surface py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs text-slate-500 mb-8 font-semibold uppercase tracking-widest">Infraestructura de Grado Bancario impulsada y regulada por</p>
          <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 text-navy">
            <span className="text-xl font-bold tracking-tighter flex items-center gap-2"><div className="w-6 h-6 bg-navy rounded-full"></div> POLYGON</span>
            <span className="text-xl font-bold tracking-tighter">STRIPE</span>
            <span className="text-xl font-bold tracking-tighter">MERCURY</span>
            <span className="text-xl font-bold tracking-tighter flex items-center gap-2"><Cpu className="w-6 h-6"/> GOOGLE AI</span>
            <span className="text-xl font-bold tracking-tighter">SBS PERÚ</span>
          </div>
        </div>
      </section>

      {/* Genesis 100 Scarcity */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-medium mb-4 text-navy">Programa de Exclusividad "Genesis 100"</h2>
          <p className="text-slate-600 mb-10">El privilegio exclusivo de los fundadores. Limitado estrictamente a 100 posiciones estratégicas.</p>
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-8 p-8 bg-surface border border-slate-200 rounded-xl shadow-sm">
            <div className="text-center sm:text-left">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Plazas Restantes</p>
              <div className="text-6xl font-bold text-navy flex items-baseline justify-center sm:justify-start gap-2">
                {genesisSpots} <span className="text-2xl text-slate-400 font-medium">/ 100</span>
              </div>
            </div>
            <div className="w-full sm:w-px h-px sm:h-20 bg-slate-200"></div>
            <div className="text-center sm:text-left">
              <p className="text-xs text-emerald uppercase tracking-widest font-semibold mb-2">Ventaja Asimétrica</p>
              <p className="text-2xl font-medium text-navy">+42.8% Plusvalía Latente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Choque de Accesibilidad */}
      <section className="py-24 bg-surface border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-medium mb-6 text-navy">El Tren de las Oportunidades 🚆</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                ¿Te imaginas haber comprado terrenos en Miami justo antes de que construyeran el metro? Esa es exactamente la oportunidad que tienes hoy frente a ti.
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                El nuevo Tren Lima-Ica cortará el viaje de 100 a solo 42 minutos. San Bartolo está a punto de explotar en valor. <strong className="text-navy font-semibold">Súbete a este tren antes de que los precios se disparen y haz crecer tu dinero con una sonrisa.</strong>
              </p>
              <ul className="space-y-5">
                {[
                  'Inversión de $6,500 Millones USD en infraestructura.',
                  'Reducción del 60% en tiempos de traslado.',
                  'Proyección de 1.5M de habitantes en Lima Sur para 2035.'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-emerald flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 to-white">
                <Train className="w-32 h-32 text-slate-200 mb-8" />
                <h3 className="text-2xl font-medium text-navy mb-4">Simulación de Trazado</h3>
                <p className="text-slate-500 mb-8">Conectando el centro financiero con la nueva expansión urbana.</p>
                <div className="w-full max-w-md bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gold w-1/3 animate-pulse rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Double Shield Legal - Interactive Explorer */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-medium mb-6 text-navy">Tu Caja Fuerte de Doble Titanio 🛡️</h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Imagina una caja fuerte impenetrable. Explora nuestro diagrama interactivo y descubre cómo tu dinero entra por Estados Unidos y tu tierra se guarda bajo llave en Perú. ¡Épico y 100% libre de estrés!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Interactive Nodes */}
            <div className="relative">
              <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-200" />
              <div className="space-y-8 relative">
                {legalSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activeLegalStep === index;
                  return (
                    <div 
                      key={step.id}
                      onClick={() => setActiveLegalStep(index)}
                      className={`flex items-center gap-6 cursor-pointer group transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                    >
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 relative z-10 ${isActive ? 'bg-navy shadow-lg scale-110' : 'bg-white border border-slate-200 group-hover:border-navy/30'}`}>
                        <Icon className={`w-8 h-8 ${isActive ? 'text-gold' : 'text-slate-400 group-hover:text-navy'}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-medium transition-colors ${isActive ? 'text-navy' : 'text-slate-500'}`}>{step.title}</h3>
                        {isActive && (
                          <motion.div layoutId="activeStepIndicator" className="h-0.5 w-12 bg-gold mt-2" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="relative h-full min-h-[350px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLegalStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-surface border border-slate-200 rounded-3xl p-10 flex flex-col justify-center shadow-xl"
                >
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 mb-8">
                    {(() => {
                      const ActiveIcon = legalSteps[activeLegalStep].icon;
                      return <ActiveIcon className="w-8 h-8 text-emerald" />;
                    })()}
                  </div>
                  <h3 className="text-3xl font-medium mb-6 text-navy">{legalSteps[activeLegalStep].title}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {legalSteps[activeLegalStep].desc}
                  </p>
                  
                  {/* Visual connection indicator */}
                  <div className="mt-10 pt-8 border-t border-slate-200 flex items-center gap-4 text-sm font-mono text-slate-500">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                      STATUS: SECURE
                    </span>
                    <span>|</span>
                    <span>NODE: {legalSteps[activeLegalStep].id.toUpperCase()}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Orquestación de Agentes RWA.AI */}
      <section className="py-24 bg-navy text-white border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-8 text-white tracking-wide">
                <Bot className="w-4 h-4 text-emerald" />
                ASISTENTE DE IA SÚPER RÁPIDO
              </div>
              <h2 className="text-3xl lg:text-5xl font-medium mb-6">Tu Guardián Robótico 🤖</h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Olvídate de las criptomonedas salvajes y los papeleos eternos. Lo que te damos es un Título de Propiedad Digital con superpoderes. Nuestra Inteligencia Artificial revisa que todo esté en regla en cuestión de segundos.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald shrink-0" />
                  <span className="text-slate-300">Entras a invertir rápido, seguro y sin dolores de cabeza.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-gold shrink-0" />
                  <span className="text-slate-300">Protege tu dinero 24/7, obedeciendo la ley automáticamente.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-6 h-6 text-emerald shrink-0" />
                  <span className="text-slate-300">Cero intervención humana, 100% precisión robótica.</span>
                </li>
              </ul>
            </motion.div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald/20 to-gold/20 blur-3xl rounded-full" />
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald animate-pulse" />
                    <span className="font-mono text-sm text-slate-300">RWA.AI Compliance Engine</span>
                  </div>
                  <span className="font-mono text-xs text-emerald bg-emerald/10 px-2 py-1 rounded">ACTIVE</span>
                </div>
                <div className="space-y-4 font-mono text-sm text-slate-400">
                  <p className="flex justify-between"><span>[SYSTEM]</span> <span className="text-slate-500">Initializing KYC protocol...</span></p>
                  <p className="flex justify-between"><span>[GEMINI]</span> <span className="text-white">Analyzing passport MRZ data...</span></p>
                  <p className="flex justify-between"><span>[VERTEX]</span> <span className="text-emerald">Cross-referencing OFAC sanctions list... CLEAR.</span></p>
                  <p className="flex justify-between"><span>[SMART_CONTRACT]</span> <span className="text-gold">Whitelisting wallet 0x7F...A1B2</span></p>
                  <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <span className="text-emerald font-bold text-lg">VERIFICATION COMPLETE: 1.2s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mercado Secundario Inmutable (ERC-3643) */}
      <section className="py-24 bg-surface border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-sm font-semibold mb-6 text-navy tracking-wide">
            <TrendingUp className="w-4 h-4 text-gold" />
            DINERO RÁPIDO Y FÁCIL
          </div>
          <h2 className="text-3xl lg:text-5xl font-medium mb-6 text-navy">Vende como si enviaras un WhatsApp 💬</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto mb-16">
            ¿Necesitas tu dinero de vuelta? Cero problemas. Vende tu fracción de tierra tan fácil y rápido como enviar un mensaje, en nuestro mercado interno blindado. Sin papeleos aburridos ni esperas eternas.
          </p>

          {/* Diagrama de Flujo Tecnológico */}
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-emerald via-gold to-navy -translate-y-1/2 opacity-30" />
            
            <div className="grid md:grid-cols-4 gap-6 relative z-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <Globe className="w-8 h-8 text-navy" />
                </div>
                <h4 className="font-semibold text-navy mb-2">Tierra Real</h4>
                <p className="text-xs text-slate-500">Tu pedacito de San Bartolo, guardado bajo siete llaves.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center relative">
                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <Code className="w-8 h-8 text-emerald" />
                </div>
                <h4 className="font-semibold text-navy mb-2">Título Digital</h4>
                <p className="text-xs text-slate-500">Tu propiedad convertida en un token súper seguro.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center relative">
                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <ShieldCheck className="w-8 h-8 text-gold" />
                </div>
                <h4 className="font-semibold text-navy mb-2">IA Guardiana</h4>
                <p className="text-xs text-slate-500">Nuestra IA revisa que todo esté perfecto en segundos.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center relative">
                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <Activity className="w-8 h-8 text-navy" />
                </div>
                <h4 className="font-semibold text-navy mb-2">Venta Instantánea</h4>
                <p className="text-xs text-slate-500">Recibe tu dinero al instante, sin complicaciones.</p>
              </div>
            </div>
          </div>

          {/* Live Order Book (Prueba Social y FOMO) */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-navy px-6 py-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-gold" />
                  <h3 className="text-white font-medium">Mercado en Vivo</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  <span className="text-emerald text-xs font-mono">ONLINE</span>
                </div>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                      <th className="px-6 py-3">Hora</th>
                      <th className="px-6 py-3">Billetera</th>
                      <th className="px-6 py-3">Tipo</th>
                      <th className="px-6 py-3 text-right">Monto ($PACHA)</th>
                      <th className="px-6 py-3 text-right">Precio</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-sm">
                    <AnimatePresence>
                      {liveTrades.map((trade) => (
                        <motion.tr 
                          key={trade.id}
                          initial={{ opacity: 0, y: -20, backgroundColor: trade.type === 'buy' ? '#ecfdf5' : '#fef2f2' }}
                          animate={{ opacity: 1, y: 0, backgroundColor: '#ffffff' }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-6 py-4 text-slate-500">{trade.time}</td>
                          <td className="px-6 py-4 text-navy font-medium">{trade.wallet}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${trade.type === 'buy' ? 'bg-emerald/10 text-emerald' : 'bg-red-500/10 text-red-500'}`}>
                              {trade.type === 'buy' ? 'COMPRA' : 'VENTA'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-navy font-medium">{trade.amount}</td>
                          <td className="px-6 py-4 text-right text-slate-600">${trade.price.toFixed(2)}</td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* El Gran Día de Pago (Endgame) */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 text-sm font-semibold mb-6 text-emerald tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              EL ENDGAME
            </div>
            <h2 className="text-3xl lg:text-5xl font-medium mb-6 text-navy">El Gran Día de Pago 💰</h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Toda gran inversión tiene una meta clara. En el año 5 o 6, subastaremos el terreno entero a las "grandes ligas" (mega-constructoras inmobiliarias) a un precio respaldado por una auditoría externa imparcial (proyectado a $320 USD/m²). Es como hacer crecer una startup exitosa y venderla al mejor postor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 border border-slate-200 bg-surface rounded-2xl text-left shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                <CheckCircle2 className="w-8 h-8 text-emerald" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-navy">Aquí Tú Eres el Jefe 👑</h3>
              <p className="text-slate-600 leading-relaxed">
                Nosotros no tomamos la decisión final por ti. La venta final del terreno se aprueba por mayoría simple a través de una votación transparente de todos los dueños de tokens. Siente el poder real de ser un co-propietario.
              </p>
            </div>

            <div className="p-10 border border-slate-200 bg-surface rounded-2xl text-left shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                <Zap className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-navy">El Reparto del Botín 🚀</h3>
              <p className="text-slate-600 leading-relaxed">
                Cuando la constructora compra el terreno, nuestro guardián legal (el Fideicomiso) se liquida automáticamente. Se cobra el cheque, y el dinero en efectivo se reparte de inmediato y de forma proporcional a las billeteras de quienes tengan el token en ese segundo exacto. Cero papeleos notariales interminables.
              </p>
            </div>

            <div className="p-10 border border-slate-200 bg-navy rounded-2xl text-left shadow-xl hover:shadow-2xl transition-shadow text-white">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center shadow-sm border border-white/20 mb-6">
                <TrendingUp className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Tú Tienes el Control del Acelerador 🏎️</h3>
              <p className="text-slate-300 leading-relaxed">
                ¿La subasta a 5 años te parece mucho tiempo? Tranquilo. Nuestro Mercado Secundario interno es tu botón de salida de emergencia o tu carril rápido. Si quieres tus ganancias hoy, vende tus tokens a otro inversor en segundos, al precio que tú decidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section id="simulator" className="py-24 bg-surface border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-medium mb-6 text-navy">Proyecta la Magnitud de tu Legado</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Desliza el control para simular el impacto de tu inversión. Observa exactamente cómo la curva de plusvalía acelera tu riqueza hacia el valor operativo proyectado.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 p-8 border border-slate-200 bg-white rounded-2xl shadow-sm flex flex-col justify-center">
              <label className="block text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">
                Monto de Inversión (USD)
              </label>
              <div className="text-5xl font-medium text-navy mb-8 tracking-tight">
                ${investment.toLocaleString()}
              </div>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="1000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full accent-gold mb-10 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
              />
              
              <div className="space-y-5 pt-8 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Tokens $PACHA</span>
                  <span className="font-mono text-lg text-navy font-semibold">{tokens.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Costo por Token</span>
                  <span className="font-mono text-lg text-navy font-semibold">${isGenesis ? '84' : '120'}</span>
                </div>
                {isGenesis && (
                  <div className="flex justify-between items-center bg-emerald/10 px-3 py-2 rounded-md border border-emerald/20">
                    <span className="text-emerald font-semibold text-sm">Beneficio Genesis 100</span>
                    <span className="text-emerald font-bold text-sm">-30% Costo</span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 p-8 border border-slate-200 bg-white rounded-2xl shadow-sm h-[450px] flex flex-col">
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Valor Proyectado (2029)</p>
                  <p className="text-4xl font-medium text-navy tracking-tight">${projectedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="text-right bg-surface px-4 py-2 rounded-lg border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-widest">TIR Estimada</p>
                  <p className="text-2xl font-bold text-emerald">37.5%</p>
                </div>
              </div>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B59410" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#B59410" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-lg">
                              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                              <p className="text-navy font-bold text-xl mb-1">${payload[0].value.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                              <p className="text-emerald text-sm font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                {payload[0].payload.milestone}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#B59410" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-10 md:p-14 border border-slate-200 bg-surface rounded-3xl shadow-xl">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mx-auto mb-8">
                <Lock className="w-10 h-10 text-navy" />
              </div>
              <h2 className="text-3xl font-medium mb-4 text-navy tracking-tight">Abre tu cuenta hoy.</h2>
              <p className="text-slate-600 text-lg">El tren del desarrollo macroeconómico no se detiene a esperar a los indecisos. Únete a la lista de espera exclusiva.</p>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-10 bg-white border border-emerald/20 rounded-2xl shadow-sm"
              >
                <CheckCircle2 className="w-20 h-20 text-emerald mx-auto mb-6" />
                <h3 className="text-3xl font-medium text-navy mb-4 tracking-tight">Posición Asegurada</h3>
                <p className="text-slate-600 mb-8 text-lg">Tu perfil ha sido registrado bajo el protocolo de Data Cero. Te notificaremos cuando inicie la fase de KYC.</p>
                <div className="text-sm font-mono text-slate-500 break-all bg-surface p-4 rounded-xl border border-slate-100">
                  Hash: 0x_mock_{Math.random().toString(36).substring(2, 15)}
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nombre Completo</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-xl px-5 py-4 text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all shadow-sm"
                      placeholder="Ej. Carlos Mendoza"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Correo Electrónico</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-xl px-5 py-4 text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all shadow-sm"
                      placeholder="carlos@ejemplo.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Interés de Inversión Estimado (USD)</label>
                  <select 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                    className="w-full bg-white border border-slate-300 rounded-xl px-5 py-4 text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all shadow-sm appearance-none cursor-pointer"
                  >
                    <option value={1000}>$1,000 - $9,999 (Retail)</option>
                    <option value={10000}>$10,000 - $29,999 (Pro)</option>
                    <option value={30000}>$30,000+ (Genesis 100 - 30% Descuento)</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 mt-4 bg-navy hover:bg-navy/90 text-white font-bold text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-navy/20"
                >
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Reclama tu Posición en la Vanguardia'
                  )}
                </button>
                <p className="text-center text-xs text-slate-500 mt-6 font-medium">
                  Al registrarte, aceptas que tu cuenta iniciará con balance cero y estará sujeta a verificación KYC/AML posterior.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-sm bg-navy flex items-center justify-center">
              <span className="text-white font-bold text-sm leading-none">P</span>
            </div>
            <span className="text-lg font-medium tracking-tight text-navy">Pacha<span className="text-gold">Nova</span></span>
          </div>
          <p className="text-slate-600 text-sm mb-4 font-medium">
            © 2026 PachaNova LLC (Wyoming, EE.UU.) & PachaNova S.A.C (Lima, Perú). Todos los derechos reservados.
          </p>
          <p className="text-slate-400 text-xs max-w-4xl mx-auto leading-relaxed">
            La información presentada en esta página es estrictamente referencial y no constituye una oferta pública de valores. Las proyecciones financieras están basadas en modelos DCF y estimaciones de mercado que pueden variar. La propiedad fraccionada está sujeta a los términos del Fideicomiso de Administración y Garantía regulado por la SBS.
          </p>
        </div>
      </footer>

      {/* --- GEMINI AI CHATBOT WIDGET --- */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
            >
              {/* Chat Header */}
              <div className="bg-navy p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">Asesor RWA PachaNova</h3>
                    <p className="text-white/60 text-xs">Impulsado por Gemini 3.1 Pro</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/60 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-navy text-white rounded-tr-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Pregunta sobre el proyecto..."
                  className="flex-1 bg-surface border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!chatInput.trim() || isTyping}
                  className="w-10 h-10 bg-navy text-white rounded-xl flex items-center justify-center hover:bg-navy/90 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-navy hover:bg-navy/90 text-white rounded-full shadow-xl shadow-navy/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
