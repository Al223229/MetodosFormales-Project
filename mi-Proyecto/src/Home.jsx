import { useCallback } from 'react';
import { motion } from 'framer-motion';

// ... (Todas tus 'variants' y 'StarIcon' se quedan exactamente igual) ...
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const StarIcon = ({ className = "w-4 h-4 sm:w-5 sm:h-5", filled = true }) => (
  <motion.svg 
    className={`${className} ${filled ? 'text-yellow-400' : 'text-gray-300'}`} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
    whileHover={{ scale: 1.2, rotate: 10 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.135-.662 1.456 0l1.86 3.844 4.251.618c.731.106 1.023.987.493 1.498l-3.076 2.998.726 4.234c.124.727-.638 1.282-1.296.953L10 15.118l-3.805 2.001c-.658.33-1.42-.226-1.296-.953l.726-4.234L2.55 8.844c-.53-.511-.238-1.392.493-1.498l4.25-.618L9.16 2.884z" clipRule="evenodd" />
  </motion.svg>
);


// --- MODIFICACIÓN 1: Componente SplitText ---
// Lo cambiamos de <motion.h1> a <motion.div> y lo ponemos inline

const splitTextContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const charVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/**
 * Componente que divide un texto en letras y las anima
 * para que aparezcan subiendo.
 * @param {string} text - El texto a animar.
 * @param {string} className - Clases de Tailwind (usualmente solo color).
 */
const SplitText = ({ text, className }) => {
  const words = text.split(' ');

  return (
    // Cambiado a 'div' para poder anidarlo y ponerlo inline
    <motion.div
      className={className} // Aquí se pasa el color (ej. "text-white")
      style={{ display: 'inline-block' }} // Para que se ponga junto a other text
      variants={splitTextContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} 
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${word}-${wordIndex}`}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            marginRight: '0.4em', // Espacio entre palabras
          }}
          variants={wordVariants}
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${char}-${charIndex}`}
              style={{ display: 'inline-block' }}
              variants={charVariants}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
};


// --- MODIFICACIÓN 2: Componente Hero ---
// Ahora usa un <h1> principal y 3 componentes <SplitText> dentro
const Hero = () => (
  <motion.section 
    className="relative w-full overflow-hidden bg-gray-900 min-h-[500px] md:h-[550px] lg:h-[600px]"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <motion.img 
      className="absolute inset-0 h-full w-full object-cover opacity-50" 
      src="https://placehold.co/1440x624/000000/FFFFFF?text=Hero+Image" 
      alt="Suplementos para tu cuerpo"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
    
    <motion.div 
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      variants={staggerContainer}
    >
      <motion.div 
        className="w-full text-center md:text-left md:w-1/2 md:pl-8 lg:pl-16"
        variants={fadeInUp}
      >
        
        {/* === Animacion de las letras === */}
        <h1 className="font-bebas text-4xl font-bold tracking-wide sm:text-4xl md:text-5xl lg:text-[60px]">
          
          {/* 2. Primera línea (blanca) */}
          <SplitText 
            text="Suplementos diseñados"
            className="text-white"
          />
          
          <SplitText 
            text="Para"
            className="text-white"
          />
          
          <SplitText 
            text="tu cuerpo"
            className="text-green-400"
          />
        </h1>
        
        {/* ... (Tus botones y el resto del componente siguen igual) ... */}
        
        <motion.div 
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start"
          variants={containerVariants}
        >
          <motion.button 
            className="font-bebas tracking-[1px] rounded-lg bg-blue-800 px-8 py-3 text-xl font-regular text-white shadow-lg transition hover:bg-blue-700 sm:px-12 sm:py-4 sm:text-2xl"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explora la suscripción
          </motion.button>
          
          <motion.button 
            className="font-bebas tracking-[1px] rounded-lg border-2 border-green-400 px-6 py-3 text-xl font-regular text-white shadow-lg transition hover:bg-green-400 hover:text-black sm:px-10 sm:py-4 sm:text-2xl"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#34D399",
              color: "#000000"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Productos
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>

    {/* ... (Elementos decorativos siguen igual) ... */}
    <motion.div
      className="absolute top-1/4 right-1/4 w-3 h-3 bg-green-400 rounded-full sm:w-4 sm:h-4"
      animate={{
        scale: [1, 2, 1],
        opacity: [0.7, 0.3, 0.7],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full sm:w-3 sm:h-3"
      animate={{
        scale: [1.5, 1, 1.5],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
  </motion.section>
);

// --- (El resto de tus componentes: ProductCard, FeaturedProducts, HowItWorks, etc.) ---
// --- (Permanecen sin cambios) ---

// --- Component: ProductCard ---
const ProductCard = ({ product }) => (
  <motion.div 
    className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    whileHover="hover"
  >
    <div className="relative">
      <motion.img 
        className="h-48 w-full object-cover sm:h-56 md:h-64 lg:h-72" 
        src={product.imageSrc} 
        alt={product.title}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      {product.tag && (
        <motion.span 
          className="absolute left-2 top-2 rounded-full border border-green-500 bg-white px-2 py-1 text-xs font-semibold text-green-600 sm:left-4 sm:top-4 sm:px-3 sm:text-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {product.tag}
        </motion.span>
      )}
    </div>
    
    <div className="flex flex-1 flex-col p-4 sm:p-6">
      <motion.h3 
        className="text-base font-semibold text-black sm:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {product.title}
      </motion.h3>
      
      <motion.p 
        className="mt-1 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {product.description}
      </motion.p>
      
      <motion.div 
        className="my-2 flex items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < product.rating} />
          ))}
        </div>
        <span className="ml-2 text-xs text-gray-500 sm:text-sm">({product.reviewCount})</span>
      </motion.div>

      <motion.div 
        className="mt-auto flex items-end justify-between pt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div>
          <motion.p 
            className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            ${product.price}
          </motion.p>
          <span className="text-sm text-gray-500 sm:text-md">MXN</span>
        </div>
        <motion.button 
          className="rounded-2xl bg-blue-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-6 sm:py-3 sm:text-base"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(37, 99, 235, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Ver
        </motion.button>
      </motion.div>
    </div>
  </motion.div>
);

// --- Component: FeaturedProducts ---
const FeaturedProducts = () => {
  const products = [
    { id: 1, title: "Proteina Whey Gold Standard", description: "2.27kg Chocolate Flavor", price: 899, rating: 5, reviewCount: 322, tag: "Recomendado para ti", imageSrc: "https://placehold.co/305x300/CCCCCC/FFFFFF?text=Proteina" },
    { id: 2, title: "Creatina Monohidratada", description: "500g Sin Sabor", price: 499, rating: 4, reviewCount: 210, tag: "Popular", imageSrc: "https://placehold.co/305x300/CCCCCC/FFFFFF?text=Creatina" },
    { id: 3, title: "Multivitamínico Opti-Men", description: "90 Tabletas", price: 350, rating: 5, reviewCount: 180, tag: "Esencial", imageSrc: "https://placehold.co/305x300/CCCCCC/FFFFFF?text=Vitaminas" },
    { id: 4, title: "Pre-Entrenamiento C4", description: "30 Servicios Fruit Punch", price: 599, rating: 4, reviewCount: 250, tag: "", imageSrc: "https://placehold.co/305x300/CCCCCC/FFFFFF?text=Pre-Workout" },
  ];

  return (
    <motion.section 
      className="bg-[#B8D2B1] py-12 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-center font-bebas text-4xl font-bold text-black sm:text-5xl lg:text-6xl"
          variants={fadeInUp}
        >
          Productos destacados
        </motion.h2>
        
        <motion.p 
          className="mt-4 text-center text-gray-700 sm:text-lg"
          variants={fadeInUp}
        >
          Los productos más populares entre nuestra comunidad
        </motion.p>
        
        <motion.div 
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:mt-12"
          variants={staggerContainer}
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- Component: StepCard (Reusable for HowItWorks and PersonalizedPlan) ---
const StepCard = ({ number, title, description, icon }) => (
  <motion.div 
    className="flex h-full flex-col rounded-2xl bg-white p-4 text-center shadow-lg sm:p-6"
    variants={cardVariants}
    whileHover="hover"
  >
    {number && (
      <motion.div 
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 text-3xl font-bold text-white sm:h-20 sm:w-20 sm:text-4xl lg:h-24 lg:w-24 lg:text-5xl"
        whileHover={{ 
          scale: 1.1,
          rotate: 360,
          transition: { duration: 0.6 }
        }}
      >
        {number}
      </motion.div>
    )}
    {icon && (
      <motion.div 
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
        whileHover={{ scale: 1.1 }}
      >
        <img src={icon} alt={`${title} icon`} className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
      </motion.div>
    )}
    <motion.h3 
      className="font-poppins text-xl font-semibold text-black sm:text-2xl"
      whileHover={{ color: "#3B82F6" }}
    >
      {title}
    </motion.h3>
    <motion.p 
      className="font-poppins mt-2 flex-1 text-sm text-gray-700 sm:text-base"
      whileHover={{ scale: 1.02 }}
    >
      {description}
    </motion.p>
  </motion.div>
);

// --- Component: HowItWorks ---
const HowItWorks = () => {
  const steps = [
    { id: 1, title: "Completa tu perfil", description: "Responde un test rápido sobre tus objetivos, nivel de actividad física y preferencias alimenticias.", icon: "https://placehold.co/60x60/3B82F6/FFFFFF?text=1" },
    { id: 2, title: "Recibe Recomendaciones", description: "Nuestro algoritmo inteligente selecciona los mejores productos para ti de marcas certificadas.", icon: "https://placehold.co/60x60/3B82F6/FFFFFF?text=2" },
    { id: 3, title: "Compra o Suscríbete", description: "Suscríbete para tener beneficios, personaliza tu perfil.", icon: "https://placehold.co/60x60/3B82F6/FFFFFF?text=3" },
  ];

  return (
    <motion.section 
      className="bg-[#FFFCF2] py-12 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="font-bebas tracking-[1px] text-center text-4xl font-regular text-black sm:text-5xl sm:tracking-[2px] lg:text-7xl"
          variants={fadeInUp}
        >
          Cómo funciona BEFIT
        </motion.h2>
        
        <motion.p 
          className="mt-4 text-center text-gray-600 sm:text-lg"
          variants={fadeInUp}
        >
          Tres simples pasos para obtener los mejores resultados
        </motion.p>
        
        <motion.div 
          className="mt-8 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 sm:mt-12"
          variants={staggerContainer}
        >
          {steps.map(step => (
            <StepCard key={step.id} title={step.title} description={step.description} icon={step.icon} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- Component: PersonalizedPlan ---
const PersonalizedPlan = () => {
  const steps = [
    { 
      id: 1, 
      number: 1, 
      title: "Completa el Test", 
      description: "Responde preguntas sobre tus objetivos: ganar masa, perder grasa, mantener energía o mejorar rendimiento." 
    },
    { 
      id: 2, 
      number: 2, 
      title: "Genera tu Perfil", 
      description: "El sistema crea un perfil nutricional y de entrenamiento basado en tus respuestas y características." 
    },
    { 
      id: 3, 
      number: 3, 
      title: "Recibe Recomendaciones", 
      description: "Accede a un plan de suplementos y nutrición curado por expertos y ajustado a tus necesidades." 
    },
    { 
      id: 4, 
      number: 4, 
      title: "Actualiza Cuando Quieras", 
      description: "Modifica tus objetivos o repite el test en cualquier momento para ajustar las recomendaciones." 
    },
  ];

  const handleStartTest = () => {
    console.log("Iniciar test de plan personalizado");
  };

  return (
    <motion.section 
      className="bg-gradient-to-br from-[#FFFCF2] to-green-50 py-12 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-center font-bebas text-4xl font-bold text-black mb-4 sm:text-5xl lg:text-6xl">
            Tu Plan Personalizado
          </h2>
          <p className="text-gray-600 sm:text-lg">
            Un plan adaptado específicamente a tus metas y necesidades
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div 
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 sm:mt-12"
          variants={staggerContainer}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              className="relative"
              variants={itemVariants}
            >
              {/* Connecting lines for desktop */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-green-200 -z-10 sm:top-12"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                />
              )}
              
              {/* Mobile connecting lines */}
              {index < steps.length - 1 && index % 2 === 0 && (
                <motion.div 
                  className="hidden sm:block lg:hidden absolute top-8 left-1/2 w-full h-0.5 bg-green-200 -z-10"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                />
              )}
              
              <StepCard 
                number={step.number} 
                title={step.title} 
                description={step.description} 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Botón CTA */}
        <motion.div 
          className="mt-12 text-center sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- Component: TestimonialCard ---
const TestimonialCard = ({ testimonial }) => (
  <motion.div 
    className="flex h-full flex-col rounded-xl bg-white p-4 shadow-lg sm:p-6"
    variants={cardVariants}
    whileHover="hover"
  >
    <div className="flex items-center">
      <motion.img 
        className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12" 
        src={testimonial.imageSrc} 
        alt={testimonial.name}
        whileHover={{ scale: 1.2, rotate: 5 }}
      />
      <div className="ml-3 sm:ml-4">
        <h4 className="font-semibold text-black text-sm sm:text-base">{testimonial.name}</h4>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={true} className="h-3 w-3 sm:h-4 sm:w-4" />
          ))}
        </div>
      </div>
    </div>
    <motion.p 
      className="mt-3 flex-1 text-sm italic text-gray-600 sm:mt-4 sm:text-base"
      whileHover={{ scale: 1.02 }}
    >
      "{testimonial.quote}"
    </motion.p>
  </motion.div>
);

// --- Component: Testimonials ---
const Testimonials = () => {
  const testimonials = [
    { id: 1, name: "María Rodríguez", quote: "Las recomendaciones personalizadas son increíbles. Nunca había encontrado productos que funcionaran tan bien para mis objetivos. ¡Y los precios son inmejorables!", imageSrc: "https://placehold.co/48x48/E0E0E0/000000?text=MR" },
    { id: 2, name: "Juan Pérez", quote: "El plan de suscripción me ahorra tiempo y dinero. Los productos llegan justo cuando los necesito. ¡Excelente servicio!", imageSrc: "https://placehold.co/48x48/E0E0E0/000000?text=JP" },
    { id: 3, name: "Ana García", quote: "Me encanta la variedad y la calidad de las marcas. El test fue súper fácil y acertó perfecto con lo que buscaba. ¡Totalmente recomendado!", imageSrc: "https://placehold.co/48x48/E0E0E0/000000?text=AG" },
  ];

  return (
    <motion.section 
      className="bg-[#B8D2B1] py-12 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-center font-bebas text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          variants={fadeInUp}
        >
          Lo que dicen nuestros clientes
        </motion.h2>
        
        <motion.p 
          className="font-poppins mt-4 text-center text-white sm:text-lg"
          variants={fadeInUp}
        >
          Miles de personas ya transformaron su vida con BeFit
        </motion.p>
        
        <motion.div 
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12"
          variants={staggerContainer}
        >
          {testimonials.map(item => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};


// --- Main Component ---
const HomeViewClientInternal = () => {

  return (
    <motion.div 
      className="flex min-h-screen w-full flex-col bg-[#FFFCF2] font-poppins text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <FeaturedProducts />
        <PersonalizedPlan />
        <Testimonials />
      </main>
    </motion.div>
  );
};

const App = () => {
  return <HomeViewClientInternal />;
};

export default App;