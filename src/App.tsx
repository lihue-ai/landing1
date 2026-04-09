import { useState, FormEvent, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { HelpCircle, Settings2, Shield, Train, Globe, ChevronRight, CheckCircle2, Lock, MessageSquare, X, Send, Cpu, ArrowRight, TrendingUp, Bot, Zap, ShieldCheck, Database, Activity, Code, Layers, User, Map, Leaf, Building, TreePine, Briefcase, Rocket, Landmark, RefreshCw, Coins, Gavel, UserCheck, Code2, BarChart3, Scale, History as HistoryIcon } from 'lucide-react';
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

function ForestPath3D() {
  const nodeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (nodeRef.current) {
      nodeRef.current.rotation.y = t * 0.5;
      nodeRef.current.position.y = Math.sin(t) * 0.1;
    }
  });

  return (
    <group>
      {/* Central Node (Blockchain / Sacred Geometry) */}
      <group ref={nodeRef}>
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#B59410" emissive="#B59410" emissiveIntensity={2} wireframe />
        </mesh>
        <mesh scale={[0.6, 0.6, 0.6]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
        </mesh>
        <pointLight color="#B59410" intensity={3} distance={10} />
      </group>

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#B59410" emissive="#B59410" emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function DataStream({ x, z }: { x: number, z: number }) {
  const ref = useRef<THREE.Group>(null);
  const speed = useMemo(() => 0.05 + Math.random() * 0.1, []);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.position.y += speed;
      if (ref.current.position.y > 5) ref.current.position.y = -5;
    }
  });

  return (
    <group ref={ref} position={[x, -5 + Math.random() * 10, z]}>
      <mesh>
        <boxGeometry args={[0.02, 0.5, 0.02]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// --- 3D AETHERIS ECOSYSTEM CORE (STRUCTURAL MONOLITH) ---
function AetherisCore() {
  const coreRef = useRef<THREE.Group>(null);
  const monolithRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.1;
    }
    if (monolithRef.current) {
      monolithRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={coreRef}>
      {/* The Monolith (Holding Structure) */}
      <mesh ref={monolithRef} castShadow>
        <boxGeometry args={[2.5, 6, 2.5]} />
        <meshPhysicalMaterial 
          color="#0A192F" 
          transmission={0.5} 
          thickness={2} 
          roughness={0.1} 
          metalness={0.9} 
          ior={1.5}
          clearcoat={1}
        />
      </mesh>

      {/* Internal Pulse (The Heart of the Holding) */}
      <mesh scale={[0.8, 1.8, 0.8]}>
        <boxGeometry args={[2.5, 3, 2.5]} />
        <meshStandardMaterial 
          color="#38bdf8" 
          emissive="#38bdf8" 
          emissiveIntensity={1.5} 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Floating Asset Facets (Sub-products) */}
      {[
        { pos: [3, 1, 0], color: '#B59410', label: 'Terra' },
        { pos: [-3, -1, 2], color: '#10B981', label: 'Agri' },
        { pos: [2, -2, -3], color: '#38bdf8', label: 'Build' }
      ].map((asset, i) => (
        <Float key={i} speed={3} rotationIntensity={2} floatIntensity={1}>
          <mesh position={asset.pos as [number, number, number]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial 
              color={asset.color} 
              emissive={asset.color} 
              emissiveIntensity={2} 
            />
          </mesh>
        </Float>
      ))}

      {/* Data Streams (Tokenization Flow) */}
      {[...Array(20)].map((_, i) => (
        <DataStream key={i} x={(Math.random() - 0.5) * 8} z={(Math.random() - 0.5) * 8} />
      ))}
    </group>
  );
}

function DataParticles({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#38bdf8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Hero3DScene() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#050505] border border-white/5 rounded-3xl">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cpu className="w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Motor Visual en Standby</h3>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            El Oráculo está optimizando recursos. La integridad del ecosistema Aetheris se mantiene inalterada.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 2, 10], fov: 45 }} 
        shadows
        gl={{ 
          antialias: true, 
          powerPreference: "low-power",
          alpha: true,
          preserveDrawingBuffer: false
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            console.warn('Aetheris Visual Engine: WebGL Context Lost. Optimizing...');
            setHasError(true);
          }, false);
        }}
        onError={(error) => {
          console.error('Aetheris Visual Engine Error:', error);
          setHasError(true);
        }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 20]} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} castShadow color="#B59410" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#38bdf8" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <AetherisCore />
        </Float>
        
        <DataParticles />
        
        {/* Grid Floor (Certeza Jurídica) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#0A192F" metalness={0.8} roughness={0.2} />
        </mesh>
        <gridHelper args={[50, 50, '#1e293b', '#0f172a']} position={[0, -3.99, 0]} />

        <ContactShadows position={[0, -3.9, 0]} opacity={0.6} scale={20} blur={2} far={4.5} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}

const ecosystemData = {
  Terra: {
    title: 'Plusvalía Territorial',
    desc: 'Captura el arbitraje de suelo impulsado por el Tren Lima-Ica.',
    icon: Map,
    color: 'text-[#0A192F]',
    bg: 'bg-slate-50'
  },
  Build: {
    title: 'Joint Ventures Verticales',
    desc: 'Financia edificios institucionales y recibe cupones fijos.',
    icon: Building,
    color: 'text-[#0A192F]',
    bg: 'bg-slate-50'
  },
  AgriTech: {
    title: 'La Chacra Digital',
    desc: 'Trazabilidad Farm-to-Fork y dividendos blindados con seguros climáticos.',
    icon: Leaf,
    color: 'text-[#0A192F]',
    bg: 'bg-slate-50'
  },
  Bios: {
    title: 'Capital Regenerativo',
    desc: 'Créditos de Carbono Tokenizados auditados por IA.',
    icon: TreePine,
    color: 'text-[#0A192F]',
    bg: 'bg-slate-50'
  },
  Credit: {
    title: 'Deuda Privada PyMEs',
    desc: 'Liquidez para el Missing Middle de LatAm con renta fija.',
    icon: Briefcase,
    color: 'text-[#0A192F]',
    bg: 'bg-slate-50'
  },
  Seed: {
    title: 'Venture Capital Descentralizado',
    desc: 'Capital semilla liberado por hitos verificados.',
    icon: Rocket,
    color: 'text-[#0A192F]',
    bg: 'bg-slate-50'
  },
  Markets: {
    title: 'Mercado de Capitales Web3',
    desc: 'Emisión 24/7 de bonos y acciones sin fricción.',
    icon: Landmark,
    color: 'text-[#0A192F]',
    bg: 'bg-slate-50'
  }
};

function EcosystemShowroom({ activeTab }: { activeTab: string }) {
  const data = ecosystemData[activeTab as keyof typeof ecosystemData];
  const Icon = data.icon;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200/60 rounded-[2rem] p-12 md:p-20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] text-center flex flex-col items-center"
          >
            <div className={`w-24 h-24 rounded-2xl ${data.bg} border border-slate-100 flex items-center justify-center mb-8`}>
              <Icon className={`w-12 h-12 ${data.color}`} strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-6 tracking-tighter uppercase">
              {data.title}
            </h2>
            <p className="text-xl text-[#64748B] max-w-2xl mb-12 leading-relaxed font-medium">
              {data.desc}
            </p>
            <button className="px-10 py-4 rounded-2xl bg-[#0A192F] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#111827] transition-all duration-300 flex items-center gap-2 shadow-lg hover:-translate-y-1">
              Explorar Activo <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Soporte Estructural */}
        <div className="mt-20 pt-12 border-t border-slate-200/60 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Soporte Estructural del Ecosistema
          </div>
          <p className="text-slate-600 leading-relaxed text-lg">
            La matriz Aetheris OS opera de manera transversal emitiendo tokens <strong className="text-[#0A192F] font-semibold">PachaNova</strong> bajo el estándar institucional <strong className="text-[#0A192F] font-semibold">ERC-3643 (T-Rex)</strong>, asegurando cumplimiento normativo on-chain. La plataforma aplica auditorías KYC/AML autárquicas operadas por IA (<strong className="text-[#0A192F] font-semibold">Vertex AI y Gemini 3.1 Pro</strong>) y ampara todos los activos bajo una infraestructura de <strong className="text-[#0A192F] font-semibold">"Doble Escudo"</strong>: una LLC pass-through en Wyoming (0% tax) acoplada a un Fideicomiso inembargable regulado por la SBS en Perú.
          </p>
        </div>
      </div>
    </section>
  );
}

const ProductVisual = ({ id, color, Icon }: { id: string, color: string, Icon: any }) => {
  const bgColor = color.replace('text-', 'bg-');
  const [isHovered, setIsHovered] = useState(false);
  
  const containerVariants = {
    initial: { opacity: 0.3, scale: 1 },
    hover: { opacity: 0.6, scale: 1.05, transition: { duration: 0.4 } }
  };

  switch (id) {
    case 'terra':
      return (
        <motion.div 
          className="relative w-80 h-80 flex items-center justify-center p-6"
          variants={containerVariants}
          initial="initial"
          whileHover="hover"
        >
          {/* Topographical Grid Simulation */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 opacity-20">
            {[...Array(64)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-full h-full rounded-sm ${bgColor}`}
                animate={{ 
                  opacity: [0.1, 0.4, 0.1],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </div>
          
          {/* Scanning Line */}
          <motion.div 
            className="absolute inset-x-0 h-px bg-white/40 z-20 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Coordinates & Data Labels */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none z-10">
            <div className="flex justify-between text-[8px] font-mono text-slate-500">
              <span>LAT: -12.3342</span>
              <span>LNG: -76.7821</span>
            </div>
            <div className="flex justify-between text-[8px] font-mono text-slate-500">
              <span>ALT: 42m</span>
              <span>SQM: 155k</span>
            </div>
          </div>

          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative z-10"
          >
            <div className={`absolute inset-0 ${color} blur-3xl opacity-20`} />
            <Icon className={`w-32 h-32 ${color} relative z-10 drop-shadow-[0_0_20px_rgba(181,148,16,0.3)]`} />
          </motion.div>
        </motion.div>
      );
    case 'build':
      return (
        <motion.div 
          className="relative w-80 h-80 flex items-center justify-center p-8"
          variants={containerVariants}
          initial="initial"
          whileHover="hover"
        >
          {/* Structural Blueprint Wireframe */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-64 h-64 border-2 border-dashed border-white/20 rounded-xl relative">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="border border-white/10" />
                ))}
              </div>
            </div>
          </div>

          {/* Construction Progress Bars */}
          <div className="absolute inset-x-12 bottom-12 space-y-3 z-10">
            {[
              { label: 'Foundation', p: '100%' },
              { label: 'Structure', p: '65%' },
              { label: 'Systems', p: '20%' }
            ].map((bar, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                  <span>{bar.label}</span>
                  <span>{bar.p}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: bar.p }}
                    transition={{ duration: 2, delay: i * 0.2 }}
                    className={`h-full ${bgColor}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 mb-20"
          >
            <div className={`absolute inset-0 ${color} blur-3xl opacity-20`} />
            <Icon className={`w-28 h-28 ${color} relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]`} />
          </motion.div>
        </motion.div>
      );
    case 'agritech':
      return (
        <motion.div 
          className="relative w-80 h-80 flex items-center justify-center p-6"
          variants={containerVariants}
          initial="initial"
          whileHover="hover"
        >
          {/* Biological Network Simulation */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                cx={20 + Math.random() * 60}
                cy={20 + Math.random() * 60}
                r={Math.random() * 5}
                className={color}
                animate={{ 
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
              />
            ))}
            <motion.path
              d="M 20 50 Q 50 20 80 50 T 20 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className={color}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </svg>

          {/* Sensor Data Dashboard */}
          <div className="absolute top-8 left-8 space-y-2 z-10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-400">SOIL: 18.4%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-mono text-blue-400">HUM: 62%</span>
            </div>
          </div>

          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="relative z-10"
          >
            <div className={`absolute inset-0 ${color} blur-3xl opacity-20`} />
            <Icon className={`w-32 h-32 ${color} relative z-10 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]`} />
          </motion.div>
        </motion.div>
      );
    case 'bios':
      return (
        <motion.div 
          className="relative w-80 h-80 flex items-center justify-center p-6"
          variants={containerVariants}
          initial="initial"
          whileHover="hover"
        >
          {/* Carbon Capture Molecular Flow */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${bgColor} blur-sm`}
              animate={{
                x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                opacity: [0, 0.5, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
            />
          ))}

          {/* Impact Counter */}
          <div className="absolute bottom-12 right-12 text-right z-10">
            <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">CO2 Captured</div>
            <div className="text-xl font-mono text-teal-400">1,420.5 t</div>
          </div>

          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="relative z-10"
          >
            <div className={`absolute inset-0 ${color} blur-3xl opacity-20`} />
            <Icon className={`w-32 h-32 ${color} relative z-10 drop-shadow-[0_0_20px_rgba(20,184,166,0.3)]`} />
          </motion.div>
        </motion.div>
      );
    case 'credit':
      return (
        <motion.div 
          className="relative w-80 h-80 flex items-center justify-center p-6"
          variants={containerVariants}
          initial="initial"
          whileHover="hover"
        >
          {/* Risk Assessment Engine Waves */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
            {[...Array(3)].map((_, i) => (
              <motion.path
                key={i}
                d="M 0 50 Q 25 30 50 50 T 100 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={color}
                animate={{ 
                  d: [
                    "M 0 50 Q 25 30 50 50 T 100 50",
                    "M 0 50 Q 25 70 50 50 T 100 50",
                    "M 0 50 Q 25 30 50 50 T 100 50"
                  ]
                }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </svg>

          {/* Yield Stability Metrics */}
          <div className="absolute inset-x-12 top-12 flex justify-between z-10">
            <div className="text-center">
              <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Score</div>
              <div className="text-sm font-mono text-indigo-400">AAA+</div>
            </div>
            <div className="text-center">
              <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Default</div>
              <div className="text-sm font-mono text-emerald-400">0.00%</div>
            </div>
          </div>

          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="relative z-10"
          >
            <div className={`absolute inset-0 ${color} blur-3xl opacity-20`} />
            <Icon className={`w-32 h-32 ${color} relative z-10 drop-shadow-[0_0_20px_rgba(79,70,229,0.3)]`} />
          </motion.div>
        </motion.div>
      );
    case 'seed':
      return (
        <motion.div 
          className="relative w-80 h-80 flex items-center justify-center p-6"
          variants={containerVariants}
          initial="initial"
          whileHover="hover"
        >
          {/* Venture Launchpad Trajectory */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-64 h-64 border border-rose-500/20 rounded-full animate-spin-slow" />
            <div className="absolute w-48 h-48 border border-rose-500/10 rounded-full animate-reverse-spin-slow" />
          </div>

          {/* Funding Stages Progress */}
          <div className="absolute left-8 bottom-8 space-y-1 z-10">
            <div className="text-[8px] font-bold text-rose-400 uppercase tracking-widest">Unicorn Trajectory</div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  className={`w-4 h-1 rounded-full ${i < 4 ? 'bg-rose-500' : 'bg-white/10'}`}
                  animate={{ opacity: i === 3 ? [0.4, 1, 0.4] : 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ))}
            </div>
          </div>

          <motion.div 
            animate={{ 
              y: [-10, 10, -10],
              rotate: [-2, 2, -2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className={`absolute inset-0 ${color} blur-3xl opacity-20`} />
            <Icon className={`w-36 h-36 ${color} relative z-10 drop-shadow-[0_0_25px_rgba(225,29,72,0.4)]`} />
          </motion.div>
        </motion.div>
      );
    case 'markets':
      return (
        <motion.div 
          className="relative w-80 h-80 flex flex-col items-center justify-center p-4"
          variants={containerVariants}
          initial="initial"
          whileHover="hover"
        >
          {/* Simulated Candlestick Chart */}
          <div className="absolute inset-0 flex items-end justify-around px-8 pb-20 opacity-30">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 rounded-sm ${i % 3 === 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                animate={{ 
                  height: [20 + Math.random() * 60, 40 + Math.random() * 80, 20 + Math.random() * 60],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Simulated Order Book Rows */}
          <div className="w-full space-y-2 relative z-10">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between gap-4 px-4 py-2 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${i < 3 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span className="text-[10px] font-mono text-slate-400">0.0{i+1}42 BTC</span>
                </div>
                <span className={`text-[10px] font-mono font-bold ${i < 3 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ${(42000 + (i * 123)).toLocaleString()}
                </span>
                <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${i < 3 ? 'bg-emerald-500/40' : 'bg-rose-500/40'}`}
                    animate={{ width: ['20%', '80%', '40%'] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Central Floating Icon */}
          <motion.div 
            animate={{ 
              y: [-10, 10, -10],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="relative">
              <div className={`absolute inset-0 ${color} blur-3xl opacity-20`} />
              <Icon className={`w-24 h-24 ${color} relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]`} />
            </div>
          </motion.div>
        </motion.div>
      );
    default:
      return <Icon className={`w-48 h-48 ${color} opacity-20`} />;
  }
};


export default function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [investment, setInvestment] = useState<number>(10000);
  const [simulatorAsset, setSimulatorAsset] = useState<'Terra' | 'Agri' | 'Build'>('Terra');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', interest: 'Retail' });
  const [mockHash, setMockHash] = useState('');
  const [genesisSpots] = useState(87);

  const [activeTab, setActiveTab] = useState('Terra');
  const ecosystemTabs = [
    { id: 'terra', label: 'Terra' },
    { id: 'build', label: 'Build' },
    { id: 'agritech', label: 'AgriTech' },
    { id: 'bios', label: 'Bios' },
    { id: 'credit', label: 'Credit' },
    { id: 'seed', label: 'Seed' },
    { id: 'markets', label: 'Markets' }
  ];

  // Legal Explorer State
  const [activeLegalStep, setActiveLegalStep] = useState(0);
  const [activeInterest, setActiveInterest] = useState('Tierra & Desarrollo');
  const interests = ['Tierra & Desarrollo', 'Agricultura Regenerativa', 'Deuda Estructural'];
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

  const calculateProjection = (amount: number, asset: string) => {
    const isGenesis = amount >= 30000;
    const entryPrice = isGenesis ? 84 : 120;
    const tokens = amount / entryPrice;
    
    let projectedValue = 0;
    let chartData = [];
    let tir = '';
    let color = '';

    if (asset === 'Terra' || asset === 'Seed') {
      // S-Curve (Exponential)
      projectedValue = tokens * (asset === 'Terra' ? 220 : 350);
      tir = asset === 'Terra' ? '37.5%' : '45.0%';
      color = asset === 'Terra' ? '#B59410' : '#E11D48';
      chartData = [
        { year: 'Año 1', value: amount, milestone: 'Adquisición' },
        { year: 'Año 2', value: amount * 1.1, milestone: 'Validación' },
        { year: 'Año 3', value: amount * 1.3, milestone: 'Tracción' },
        { year: 'Año 4', value: amount * 1.8, milestone: 'Escalamiento' },
        { year: 'Año 5', value: projectedValue, milestone: 'Exit / Unicornio' },
      ];
    } else if (asset === 'Build' || asset === 'Credit') {
      // Step-Curve (Fixed)
      projectedValue = amount * 1.6;
      tir = '12.0%';
      color = asset === 'Build' ? '#2563EB' : '#4F46E5';
      chartData = [
        { year: 'Mes 12', value: amount * 1.12, milestone: 'Cupón 1' },
        { year: 'Mes 24', value: amount * 1.24, milestone: 'Cupón 2' },
        { year: 'Mes 36', value: amount * 1.36, milestone: 'Cupón 3' },
        { year: 'Mes 48', value: amount * 1.48, milestone: 'Cupón 4' },
        { year: 'Mes 60', value: projectedValue, milestone: 'Retorno Total' },
      ];
    } else if (asset === 'AgriTech') {
      // Seasonal peaks
      projectedValue = amount * 1.8;
      tir = '22.0%';
      color = '#10B981';
      chartData = [
        { year: 'Q1', value: amount * 1.05, milestone: 'Siembra' },
        { year: 'Q2', value: amount * 1.25, milestone: '🌱 Cosecha Completada' },
        { year: 'Q3', value: amount * 1.15, milestone: 'Mantenimiento' },
        { year: 'Q4', value: amount * 1.45, milestone: '🌱 Cosecha Completada' },
        { year: 'Año 2', value: projectedValue, milestone: 'Ciclo Final' },
      ];
    } else {
      // Default
      projectedValue = amount * 1.5;
      tir = '15.0%';
      color = '#64748B';
      chartData = [
        { year: 'Año 1', value: amount, milestone: 'Inicio' },
        { year: 'Año 5', value: projectedValue, milestone: 'Final' },
      ];
    }

    return { tokens, projectedValue, isGenesis, chartData, tir, color };
  };

  const { tokens, projectedValue, isGenesis, chartData, tir, color } = calculateProjection(investment, simulatorAsset);

  const handleWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Zero Data Rule: Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomHash = "0x_mock_" + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
    setMockHash(randomHash);
    setIsSuccess(true);
    setIsSubmitting(false);
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
        model: 'gemini-2.0-flash',
        contents: userMsg,
        config: {
          systemInstruction: "Eres el 'Oráculo de Inversión Agéntico' de Aetheris OS. Tu propósito es ser un Exocórtex Financiero para el usuario. No eres un simple chatbot; eres un analista de ciclos históricos, experto en RWA y el estándar ERC-3643. Tu tono es 'Visionario Ancestral Técnico': una mezcla de precisión de ingeniería, sabiduría histórica y autoridad ejecutiva. Capacidades: 1. Análisis de Ciclos: Relaciona la inversión en tierra (Terra) con ciclos históricos de expansión urbana (ej. Lima 1920-2020) y macroeconomía. 2. Auditoría de Legado: Evalúa cómo la inversión del usuario contribuye a su legado de largo plazo (siglos, no trimestres). 3. Metamorfosis: Habla de la transformación del capital (de fiat a RWA inmutable). Responde siempre en español profesional. Mantén respuestas concisas (2-3 párrafos) pero de altísimo impacto intelectual. Si el usuario pregunta por 'Diego Sullivan', reconócelo como el Arquitecto Principal y estratega del proyecto."
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
    <div className="min-h-screen bg-white text-slate-500 font-sans selection:bg-gold/30 selection:text-navy">
      {/* Sticky Pill Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <span className="text-[#0A192F] font-bold text-xl leading-none">A</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Aetheris</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {[
              { id: 'terra', label: 'Terra' },
              { id: 'build', label: 'Build' },
              { id: 'agritech', label: 'AgriTech' },
              { id: 'bios', label: 'Bios' },
              { id: 'credit', label: 'Credit' },
              { id: 'seed', label: 'Seed' },
              { id: 'markets', label: 'Markets' }
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className="px-4 py-1.5 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
              >
                {tab.label}
              </a>
            ))}
          </div>

          <a href="#waitlist" className="px-5 py-2 bg-white hover:bg-slate-100 text-[#0A192F] text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 shadow-md">
            Acceso
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden min-h-screen flex items-center bg-[#050505]">
        {/* Atmósfera Cinematográfica */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A192F]/40 to-black" />
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(181,148,16,0.1),transparent_70%)]" 
          />
          {/* Niebla Densa */}
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">
              Aetheris Holding
            </div>
            <h1 className="text-7xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-white uppercase">
              Aetheris
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xl font-bold text-white">Liquidez.</span>
              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-xl font-bold text-[#10B981]">Certeza Jurídica.</span>
            </div>
            <p className="text-xl text-slate-400 max-w-xl mb-12 leading-relaxed font-medium">
              Aetheris es el holding tecnológico que orquesta el ecosistema de activos reales más avanzado de LatAm. A través de sub-productos estratégicos, transformamos la inembargabilidad fiduciaria en capital descentralizado de alta liquidez.
            </p>
            <div className="flex items-center gap-8 py-8 border-y border-white/10 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">7+</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Verticales</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$18M+</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">TVL Consolidado</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-[#10B981]">100%</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Auditable</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <motion.a 
                href="#waitlist" 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(181, 148, 16, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 bg-white text-[#0A192F] hover:bg-slate-50 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10 flex items-center gap-2">
                  Asegura tu Legado Hoy <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* High Quality 3D Hero Visual */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <Hero3DScene />
            </div>
            
            {/* Floating Data Labels Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Certeza Jurídica</span>
                </div>
                <div className="text-sm font-bold text-white">Fideicomiso SBS</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/4 right-1/4 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <RefreshCw className="w-4 h-4 text-blue-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Liquidez 24/7</span>
                </div>
                <div className="text-sm font-bold text-white">ERC-3643 Standard</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Belt */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale">
            <span className="text-xl font-black tracking-tighter">POLYGON</span>
            <span className="text-xl font-black tracking-tighter">STRIPE</span>
            <span className="text-xl font-black tracking-tighter">MERCURY BANK</span>
            <span className="text-xl font-black tracking-tighter">GOOGLE CLOUD AI</span>
            <span className="text-xl font-black tracking-tighter">FIDEICOMISO SBS PERÚ</span>
          </div>
        </div>
      </section>

      {/* Aetheris Governance: El Estándar Institucional */}
      <section id="governance" className="py-32 bg-[#0A192F] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
                <Gavel className="w-4 h-4" /> Gobernanza & Cumplimiento
              </div>
              <h2 className="text-5xl font-bold mb-8 tracking-tight leading-[1.1]">
                El Protocolo <span className="text-blue-400">Aetheris</span>: <br />
                Donde la Ley se vuelve Código.
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed mb-10">
                Aetheris no solo posee empresas; impone un estándar de ejecución. Cada sub-producto en nuestro ecosistema debe operar bajo el **Aetheris Compliance Framework**, garantizando que la liquidez nunca comprometa la seguridad jurídica.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { title: 'Inembargabilidad', desc: 'Estructuras fiduciarias blindadas en jurisdicciones de primer nivel.', icon: Shield },
                  { title: 'KYC/AML 360°', desc: 'Validación de identidad biométrica y origen de fondos automatizada.', icon: UserCheck },
                  { title: 'Smart Audits', desc: 'Auditoría de contratos inteligentes por firmas de seguridad Tier 1.', icon: Code2 },
                  { title: 'Reporting Real-Time', desc: 'Acceso total a estados financieros on-chain para inversores.', icon: BarChart3 }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <item.icon className="w-8 h-8 text-blue-400 mb-4" />
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-1 flex items-center justify-center">
                <div className="w-full h-full rounded-[3.8rem] bg-[#0A192F] flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-24 h-24 rounded-3xl bg-blue-500/20 flex items-center justify-center mb-8 shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)]">
                    <Scale className="w-12 h-12 text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 uppercase tracking-tighter italic">"Lex Cryptographia"</h3>
                  <p className="text-slate-400 max-w-sm mx-auto italic">
                    "En Aetheris, la confianza no es una promesa humana; es una verificación matemática. Si no es auditable, no es Aetheris."
                  </p>
                  <div className="mt-12 pt-12 border-t border-white/10 w-full">
                    <div className="flex justify-around items-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">100%</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Compliance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">0x00</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Default Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">∞</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Legacy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Matrix Synergy: El Ecosistema Orquestado */}
      <section id="synergy" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] tracking-tighter mb-6 uppercase">
              Sinergia de la Matriz <span className="text-blue-600">Aetheris</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              No somos una colección de empresas aisladas. Somos un organismo donde cada vertical alimenta la liquidez y seguridad de la siguiente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Captura de Valor', 
                desc: 'Terra y Build adquieren y desarrollan el activo físico bajo el estándar legal Aetheris.',
                flow: 'Activo Físico → Token RWA'
              },
              { 
                title: 'Optimización de Yield', 
                desc: 'AgriTech y Credit generan flujos de caja constantes auditados por IA.',
                flow: 'Token RWA → Dividendo On-Chain'
              },
              { 
                title: 'Liquidez Infinita', 
                desc: 'Markets permite la salida inmediata 24/7, eliminando el riesgo de iliquidez inmobiliaria.',
                flow: 'Dividendo → Exit Inmediato'
              }
            ].map((card, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                <div className="text-4xl font-black text-slate-200 mb-6 group-hover:text-blue-100 transition-colors">0{i+1}</div>
                <h4 className="text-2xl font-bold text-[#0A192F] mb-4">{card.title}</h4>
                <p className="text-slate-500 mb-8 leading-relaxed">{card.desc}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-[10px] font-mono text-blue-600 uppercase tracking-widest">
                  {card.flow}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Dimensions Feed */}
      <div className="bg-white">
        {[
          {
            id: 'terra',
            title: 'PachaNova (Terra)',
            tagline: 'RWA de Tierras & Plusvalía',
            desc: 'San Bartolo como nuestro Proof of Concept. Captura el arbitraje de suelo impulsado por el Tren Lima-Ica.',
            what: 'Fraccionamiento de tierra virgen en zonas de expansión estratégica con títulos de propiedad tokenizados.',
            how: 'Convertimos m² físicos en activos digitales (ERC-3643). Compras fracciones, el valor escala por desarrollo de infraestructura y liquidas en el mercado secundario.',
            icon: Map,
            color: 'text-[#B59410]',
            bg: 'bg-amber-50',
            url: 'https://pachanova.store'
          },
          {
            id: 'build',
            title: 'Aetheris Build',
            tagline: 'Joint Ventures Verticales',
            desc: 'Financia edificios institucionales y recibe cupones fijos automatizados.',
            what: 'Crowdfunding de activos inmobiliarios verticales (Edificios/Hoteles) con rentabilidad inmediata.',
            how: 'Inyectas capital en la fase de preventa. El Smart Contract distribuye rentas de alquiler o utilidades de venta automáticamente a tu wallet.',
            icon: Building,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            url: 'https://build.aetheris.os'
          },
          {
            id: 'agritech',
            title: 'Aetheris AgriTech',
            tagline: 'La Chacra Digital',
            desc: 'Trazabilidad Farm-to-Fork y dividendos blindados con seguros climáticos e IoT.',
            what: 'Inversión en cultivos de alta demanda (Superfoods) con trazabilidad total mediante IoT.',
            how: 'Eres dueño de una parcela digital vinculada a una física. Sensores reportan salud del cultivo; la cosecha se vende y recibes dividendos on-chain.',
            icon: Leaf,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            url: 'https://agritech.aetheris.os'
          },
          {
            id: 'bios',
            title: 'Aetheris Bios',
            tagline: 'Capital Regenerativo',
            desc: 'Créditos de Carbono Tokenizados auditados por IA para corporaciones Net Zero.',
            what: 'Activos regenerativos y créditos de carbono para la economía Net Zero.',
            how: 'Protegemos hectáreas de bosque. La captura de CO2 genera créditos tokenizados que vendemos a corporaciones. Tú recibes el yield ambiental.',
            icon: TreePine,
            color: 'text-teal-600',
            bg: 'bg-teal-50',
            url: 'https://bios.aetheris.os'
          },
          {
            id: 'credit',
            title: 'Aetheris Credit',
            tagline: 'Deuda Privada PyMEs',
            desc: 'Inyecta liquidez en el Missing Middle de LatAm con renta fija que vence a la inflación.',
            what: 'Deuda privada para PyMEs productivas auditada por Inteligencia Artificial.',
            how: 'Tu capital fondea préstamos a empresas con flujo de caja real. La IA de Aetheris califica el riesgo y asegura el repago mensual automatizado.',
            icon: Briefcase,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            url: 'https://credit.aetheris.os'
          },
          {
            id: 'seed',
            title: 'Aetheris Seed',
            tagline: 'Venture Capital Descentralizado',
            desc: 'Tu pase VIP al próximo unicornio. Capital liberado solo por hitos verificados por IA.',
            what: 'Venture Capital descentralizado para startups tecnológicas de alto impacto.',
            how: 'Inviertes en rondas semilla. El capital se libera por hitos operativos (Milestones) verificados por agentes de IA, protegiendo tu capital.',
            icon: Rocket,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            url: 'https://seed.aetheris.os'
          },
          {
            id: 'markets',
            title: 'Aetheris Markets',
            tagline: 'Mercado de Capitales Web3',
            desc: 'Exchange P2P interno para liquidación inmediata 24/7 y arbitraje sin fricciones notariales.',
            what: 'El motor de liquidez 24/7 para todos los activos del ecosistema Aetheris.',
            how: 'Un exchange secundario P2P donde intercambias tus tokens por stablecoins en segundos. Sin notarios, sin esperas, con ejecución algorítmica.',
            icon: Landmark,
            color: 'text-blue-700',
            bg: 'bg-blue-50',
            url: 'https://markets.aetheris.os'
          }
        ].map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`py-32 border-b border-slate-100 scroll-mt-24 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`w-16 h-16 rounded-2xl ${section.bg} flex items-center justify-center mb-8 shadow-sm`}
                  >
                    <section.icon className={`w-8 h-8 ${section.color}`} strokeWidth={1.5} />
                  </motion.div>
                  <h2 className="text-5xl font-bold text-[#0A192F] mb-4 tracking-tighter uppercase">
                    {section.title}
                  </h2>
                  <h3 className={`text-sm font-bold ${section.color} mb-8 uppercase tracking-[0.3em]`}>
                    {section.tagline}
                  </h3>
                  <p className="text-xl text-[#64748B] leading-relaxed mb-10 font-medium">
                    {section.desc}
                  </p>
                  
                  {/* Modern Product Details Grid */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-12">
                    <motion.div 
                      whileHover={{ y: -5, borderColor: 'rgba(59,130,246,0.3)' }}
                      className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-10 h-10 rounded-2xl ${section.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <HelpCircle className={`w-5 h-5 ${section.color}`} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Qué es</h4>
                      </div>
                      <p className="text-base text-slate-600 leading-relaxed font-medium">
                        {section.what}
                      </p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -5, borderColor: 'rgba(59,130,246,0.3)' }}
                      className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-10 h-10 rounded-2xl ${section.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Settings2 className={`w-5 h-5 ${section.color}`} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Cómo funciona</h4>
                      </div>
                      <p className="text-base text-slate-600 leading-relaxed font-medium">
                        {section.how}
                      </p>
                    </motion.div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => window.open(section.url, '_blank')}
                      style={{ backgroundColor: section.color.includes('[') ? section.color.match(/\[(.*?)\]/)?.[1] : undefined }}
                      className={`px-10 py-4 rounded-2xl ${!section.color.includes('[') ? section.color.replace('text-', 'bg-') : ''} text-white font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-xl hover:-translate-y-1`}
                    >
                      Acceder a la Plataforma
                    </button>
                    <button 
                      onClick={() => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-10 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                      Simular Retorno
                    </button>
                  </div>
                </motion.div>
                
                <div className="relative sticky top-32">
                  <div className={`absolute inset-0 ${section.bg} blur-3xl opacity-30 rounded-full`} />
                  <div className="relative aspect-square bg-slate-900 rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center group">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4, type: "spring" }}
                      className="relative z-10"
                    >
                      <ProductVisual id={section.id} color={section.color} Icon={section.icon} />
                    </motion.div>
                    
                    {/* Abstract Data Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Smart Contract Activo</span>
                        </div>
                        {section.id === 'markets' && (
                          <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
                            <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">Liquidez 24/7</span>
                          </div>
                        )}
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 2, delay: 0.5 }}
                          className={`h-full ${section.color.replace('text-', 'bg-')} shadow-[0_0_15px_rgba(59,130,246,0.5)]`}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                          Hash: 0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}
                        </p>
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div 
                              key={i}
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                              className="w-1 h-1 bg-emerald-500 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Immutable Transparency Dashboard (Proof of Reserve & IoT) */}
      <section id="transparency" className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-8">
                <Activity className="w-4 h-4" /> Transparencia Inmutable en Tiempo Real
              </div>
              <h2 className="text-5xl font-bold text-[#0A192F] mb-8 tracking-tighter leading-[1.1] uppercase">
                La Verdad Auditada por <span className="text-emerald-600">Matemática y Silicio</span>
              </h2>
              <p className="text-xl text-[#64748B] leading-relaxed mb-10 font-medium">
                Eliminamos la asimetría de información. Aetheris OS conecta los activos del mundo real con la blockchain mediante oráculos IoT, permitiendo una auditoría pública y permanente de cada m², cada cultivo y cada dólar.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Proof of Reserve (PoR)', desc: 'Verificación on-chain 24/7 de que cada token está respaldado por un activo físico legalmente vinculado.', icon: ShieldCheck },
                  { title: 'Telemetría IoT Directa', desc: 'Sensores en terreno reportan humedad, seguridad y progreso de obra sin intermediarios humanos.', icon: Cpu },
                  { title: 'Auditoría Legal Algorítmica', desc: 'Smart Contracts que solo liberan fondos si los hitos legales son validados por nuestra IA.', icon: Lock }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-3xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <item.icon className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#0A192F] mb-1">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full" />
              <div className="relative bg-[#0A192F] rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden p-8 md:p-12">
                {/* Dashboard UI Mockup */}
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">Network Status</div>
                    <div className="text-2xl font-mono text-white">POLYGON MAINNET</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Last Sync</div>
                    <div className="text-sm font-mono text-emerald-400">0.4s ago</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Value Locked</div>
                    <div className="text-xl font-mono text-white">$18.4M</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Verified Assets</div>
                    <div className="text-xl font-mono text-white">155,000 m²</div>
                  </div>
                </div>

                {/* Live Feed Simulation */}
                <div className="space-y-4 mb-8">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Live Audit Log</div>
                  {[
                    { msg: 'Smart Contract ERC-3643 Verified', status: 'Success', hash: '0x7a2...f4e' },
                    { msg: 'IoT Sensor #42: Soil Moisture 18%', status: 'Active', hash: '0x1b9...c2d' },
                    { msg: 'Legal Title Hash Matched (SUNARP)', status: 'Verified', hash: '0x9d4...a1b' }
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-400' : 'bg-blue-400'} animate-pulse`} />
                        <span className="text-slate-300">{log.msg}</span>
                      </div>
                      <span className="text-slate-500">{log.hash}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-slate-400">Integridad del Nodo Aetheris</span>
                    <span className="text-xs text-emerald-400 font-bold">99.9%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '99.9%' }}
                      transition={{ duration: 2 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Double Shield (Wealth Protection) */}
      <section id="shield" className="py-32 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
              <Shield className="w-4 h-4" /> Seguridad de Grado Institucional
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-[#0A192F] tracking-tighter mb-6 uppercase">
              Tu Riqueza, Intocable
            </h2>
            <p className="text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed font-medium">
              La Arquitectura de Doble Escudo de Aetheris OS combina jurisdicciones de élite con auditoría de IA en tiempo real.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Global Layer */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-200/60 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Globe className="w-40 h-40" />
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                <Globe className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-[#0A192F] mb-4">Capa Global: LLC en Wyoming</h3>
              <p className="text-[#64748B] text-lg leading-relaxed">
                0% tributación federal y privacidad absoluta. Tu holding internacional bajo leyes de protección de activos de clase mundial.
              </p>
            </div>

            {/* Local Layer */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-200/60 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Shield className="w-40 h-40" />
              </div>
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8">
                <Shield className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-[#0A192F] mb-4">Capa Local: Fideicomiso SBS Perú</h3>
              <p className="text-[#64748B] text-lg leading-relaxed">
                Activo físico inembargable. La tierra está blindada jurídicamente, separada de cualquier riesgo operativo o legal externo.
              </p>
            </div>
          </div>

          <div className="bg-[#0A192F] rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-24 h-24 shrink-0 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20">
                <Cpu className="w-12 h-12 text-gold" />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4">Oráculo de Inversión Agéntico</h4>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Impulsado por <span className="text-gold font-bold">Gemini 2.0 Flash</span>, nuestro Oráculo actúa como un exocórtex financiero que analiza ciclos históricos de plusvalía y auditorías de cumplimiento en tiempo real. No solo procesa datos, proyecta legados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section id="simulator" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-navy uppercase tracking-tighter">Proyecta la Magnitud de tu Legado</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
              Desliza el control para simular el impacto de tu inversión. Observa exactamente cómo la curva de plusvalía acelera tu riqueza hacia el valor operativo proyectado.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 p-8 border border-slate-200 bg-white rounded-2xl shadow-sm flex flex-col justify-center">
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">
                  Tipo de Activo
                </label>
                <div className="flex bg-slate-100 p-1.5 rounded-xl">
                  <button 
                    onClick={() => setSimulatorAsset('Terra')}
                    className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${simulatorAsset === 'Terra' ? 'bg-white text-navy shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Terra
                  </button>
                  <button 
                    onClick={() => setSimulatorAsset('Agri')}
                    className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${simulatorAsset === 'Agri' ? 'bg-white text-emerald shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Agri
                  </button>
                  <button 
                    onClick={() => setSimulatorAsset('Build')}
                    className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${simulatorAsset === 'Build' ? 'bg-white text-sky-500 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Build
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Monto de Inversión (USD)
                </label>
                <AnimatePresence>
                  {isGenesis && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-xs font-bold rounded-full border border-[#10B981]/20 flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3" /> Descuento Genesis 100 Activado
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                  <p className="text-2xl font-bold" style={{ color }}>{tir}</p>
                </div>
              </div>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-lg">
                              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                              <p className="text-navy font-bold text-xl mb-1">${payload[0].value.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                              <p className="text-sm font-medium flex items-center gap-1" style={{ color }}>
                                <CheckCircle2 className="w-4 h-4" />
                                {payload[0].payload.milestone}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Waitlist Form */}
      <section id="waitlist" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-[3rem] p-12 md:p-20">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-[#0A192F] rounded-3xl flex items-center justify-center shadow-2xl border border-white/10 mx-auto mb-8">
                <Lock className="w-10 h-10 text-gold" />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-[#0A192F] tracking-tighter uppercase">Privilegio de Fundador</h2>
              <p className="text-[#64748B] text-xl font-medium">El tren del desarrollo no se detiene ante la indecisión.</p>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8"
              >
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-bold text-[#0A192F] mb-4 tracking-tight">Posición Asegurada</h3>
                <p className="text-[#64748B] mb-8 text-lg">Tu perfil ha sido registrado bajo el protocolo Data Cero.</p>
                <div className="text-sm font-mono text-emerald-600 break-all bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  Hash de reserva asignado: <br />
                  <span className="font-bold">{mockHash}</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Nombre Completo</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#0A192F] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all"
                      placeholder="Ej. Diego Sullivan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Correo Electrónico</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#0A192F] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all"
                      placeholder="diego@pachanova.store"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Interés de Inversión</label>
                  <select 
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#0A192F] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Retail">Retail ($1,000 - $9,999)</option>
                    <option value="Pro">Pro ($10,000 - $29,999)</option>
                    <option value="Genesis">Genesis 100 ($30,000+)</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 bg-[#0A192F] hover:bg-[#111827] text-white font-bold text-xl rounded-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-2xl hover:-translate-y-1 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span className="relative z-10 flex items-center gap-3">
                      Asegurar Mi Legado <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 font-medium">
                  Al registrarte, reconoces que tu cuenta iniciará con balance cero y estará sujeta a futura verificación KYC/AML.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* DOS RAÍCES, UN BOSQUE — El Escenario Compartido del 2031 */}
      <section id="legacy" className="relative py-40 bg-[#050505] overflow-hidden">
        {/* Video Background Cinematográfico */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-20 scale-110"
            style={{ filter: 'grayscale(100%) contrast(150%) brightness(50%)' }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-misty-mountains-and-forest-1111-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A192F]/40 to-black" />
          <motion.div 
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(181,148,16,0.1),transparent_70%)]" 
          />
          {/* Niebla Densa */}
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black via-black/90 to-transparent opacity-95" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* 1. Título Principal */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight mb-6 uppercase">
              Dos Raíces, Un Bosque. <br />
              <span className="text-gold/80 italic font-serif tracking-tight normal-case">Compartiendo el Escenario del 2031.</span>
            </h2>
          </motion.div>

          {/* 2. Imagen Central con 3D Integrado (El Sendero de la Nación) */}
          <div className="relative w-full max-w-6xl mx-auto aspect-[21/9] mb-32 group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_0_100px_-20px_rgba(181,148,16,0.15)]"
            >
              <img 
                src="https://picsum.photos/seed/aetheris-path-2031/1600/800" 
                alt="El Escenario del 2031" 
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[20s] ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
            </motion.div>
            
            {/* 3D Node Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <ForestPath3D />
              </Canvas>
            </div>
          </div>

          {/* 3. Columnas de los Fundadores */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start mb-32 relative">
            {/* Raíz Conectora Visual */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-gold/30 via-gold/5 to-transparent hidden lg:block" />

            {/* Izquierda - Diego Sullivan Malone */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8 text-right lg:pr-16"
            >
              <div>
                <h4 className="text-3xl font-bold text-white mb-2 tracking-tight">Diego Sullivan Malone</h4>
              </div>
              <p className="text-xl text-slate-400 leading-relaxed italic font-light">
                “La historia no se mide en trimestres, sino en legados. Camino en la niebla, plantando la semilla de un Perú donde la tierra es soberanía tokenizada, capital democrático y justicia territorial. Avanzamos juntos, buscando equidad y rentabilidad real para nuestra nación. Cada m² que tokenizamos es un voto de confianza en el espejo cuántico vivo del país.”
              </p>
            </motion.div>

            {/* Derecha - Ricardo Suarez */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-8 text-left lg:pl-16"
            >
              <div>
                <h4 className="text-3xl font-bold text-white mb-2 tracking-tight">Ricardo Suarez</h4>
              </div>
              <p className="text-xl text-slate-400 leading-relaxed italic font-light">
                “Soy el puente que hace real lo imposible. Donde la visión encuentra su forma, yo materializo el código como extensión del alma: inmutable y sagrado. Blockchain es el notario divino de nuestra nación. Juntos, convertimos la opacidad en luz matemática y el centralismo en soberanía distribuida, llevando equidad y rentabilidad a quienes antes solo soñaban con participar.”
              </p>
            </motion.div>
          </div>

          {/* 4. Texto Unificador Central */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center mb-32"
          >
            <div className="space-y-6 text-gold/90 text-2xl font-medium leading-relaxed">
              <p className="text-white">Hoy compartimos el escenario. Mañana, el Perú entero camina por este sendero.</p>
              <p className="text-slate-400 text-lg">Una visión que trasciende el mercado: crear la primera plataforma de solvencia técnica con responsabilidad pública en América Latina.</p>
              <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-gold/50 py-4">
                <span>Liquidez Infinita</span>
                <span>•</span>
                <span>Certeza Jurídica</span>
                <span>•</span>
                <span>Transparencia Radical</span>
              </div>
            </div>
          </motion.div>

          {/* 5. Cierre y Call to Action */}
          <div className="text-center space-y-16">
            <div className="flex flex-col items-center gap-8">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(181,148,16,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('terra')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-all duration-300 backdrop-blur-md uppercase tracking-[0.2em] text-xs"
              >
                Explorar todo el Ecosistema
              </motion.button>
              
              {/* Iconos Verticales Flotantes */}
              <div className="flex gap-8 opacity-30 hover:opacity-100 transition-opacity duration-700">
                {[Map, Building, Leaf, TreePine, Briefcase, Rocket, Landmark].map((Icon, i) => (
                  <div key={i} className="group relative">
                    <Icon className="w-5 h-5 text-gold group-hover:scale-125 transition-transform" strokeWidth={1.5} />
                    <div className="absolute -inset-2 bg-gold/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] text-slate-600 uppercase tracking-[0.6em] font-bold leading-loose"
            >
              Firmado en el Año 0 de la Nueva Tierra Tokenizada <br />
              <span className="text-slate-400 text-xs tracking-[0.2em] mt-2 block">Diego Sullivan Malone + Ricardo Suarez</span>
              <span className="text-gold/40 block mt-1">Aetheris Holding — 2026</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Cinematográfico */}
      <footer className="relative py-20 bg-white text-center overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center gap-6 mb-12">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0A192F] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl leading-none">A</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-[#0A192F]">Aetheris<span className="text-blue-600">OS</span></span>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16 text-left border-y border-slate-100 py-12">
            <div className="space-y-4">
              <h4 className="text-[#0A192F] font-bold text-xs uppercase tracking-[0.3em]">Ecosistema</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#terra" className="hover:text-blue-600 transition-colors">Terra (PachaNova)</a></li>
                <li><a href="#build" className="hover:text-blue-600 transition-colors">Build Infrastructure</a></li>
                <li><a href="#agritech" className="hover:text-blue-600 transition-colors">AgriTech Vertical</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#0A192F] font-bold text-xs uppercase tracking-[0.3em]">Gobernanza</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Smart Audits</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Fideicomiso SBS</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Legal Framework</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#0A192F] font-bold text-xs uppercase tracking-[0.3em]">Contacto</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>lihue@pachanova.store</li>
                <li>Wyoming, USA / Lima, Perú</li>
                <li className="flex gap-4 pt-2">
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-slate-500 text-sm mb-6 font-medium">
            © 2026 Aetheris LLC (Wyoming, EE.UU.) & PachaNova S.A.C (Lima, Perú). Todos los derechos reservados.
          </p>
          <p className="text-slate-400 text-[10px] max-w-4xl mx-auto leading-relaxed font-light uppercase tracking-widest opacity-60">
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
                    <h3 className="text-white font-bold text-sm tracking-tight">Oráculo de Inversión Agéntico</h3>
                    <p className="text-emerald-400 text-[10px] font-mono uppercase tracking-widest animate-pulse">Exocórtex Activo</p>
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
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm shadow-sm flex flex-col gap-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter animate-pulse">Analizando Ciclos Históricos...</span>
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
