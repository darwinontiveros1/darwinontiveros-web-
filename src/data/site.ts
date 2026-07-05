// ============================================================================
// DATOS CENTRALES DEL SITIO — Darwin Ontiveros
// Fuente única de verdad para contenido, SEO y Schema.org.
// Editá aquí y se refleja en todo el sitio.
// ============================================================================

export const SITE = {
  domain: "www.darwinontiveros.com",
  url: "https://www.darwinontiveros.com",
  name: "Darwin Ontiveros",
  // Color accent del tema (teal).
  // Para cambiarlo, ajustá también --accent en globals.css.
  accent: "#03bfb5",
} as const;

export type Locale = "es" | "en";

// --- Perfil bilingüe -------------------------------------------------------

export const PROFILE = {
  fullName: "Darwin Ontiveros",
  es: {
    role: "Emprendedor, Conferencista y Autor",
    tagline: "Ventas sin límites. Liderazgo sin excusas.",
    heroHeadline: "Conviértete en imparable en las ventas y en la vida.",
    heroSub:
      "Ayudo a vendedores, líderes y emprendedores a romper sus techos de producción, construir equipos de alto rendimiento y crear una vida abundante — con estrategia, mentalidad y ejecución.",
    bioShort:
      "Darwin Ontiveros es emprendedor, conferencista y autor del libro «Imparable y Abundante — Ventas Sin Límites». Líder en el área de ventas, tanto en producción personal como en la creación y desarrollo de equipos de alto rendimiento, y mentor de desarrollo personal, ventas y negocios.",
    bioLong:
      "Darwin Ontiveros es un líder reconocido en el área de las ventas, con una trayectoria destacada tanto en la producción personal como en la creación y el desarrollo de equipos comerciales de alto rendimiento. Es autor del libro «Imparable y Abundante — Ventas Sin Límites», donde condensa su filosofía de ventas, disciplina y abundancia.\n\nComo conferencista y mentor, Darwin acompaña a emprendedores, vendedores y líderes a transformar su mentalidad, dominar los fundamentos de las ventas de alto nivel y construir una vida próspera en todas sus áreas. Su trabajo integra estrategia comercial, desarrollo personal y liderazgo con propósito.\n\nHa sido formado e inspirado por referentes mundiales del desarrollo personal y los negocios, entre ellos John C. Maxwell, Ismael Cala, Vilma Núñez y Margarita Pasos, y ha colaborado con figuras del ecosistema de la autoridad digital como Spencer Hoffmann. Además de su faceta profesional, Darwin es padre y esposo, y considera que el verdadero éxito es aquel que se construye sin sacrificar lo que más importa.",
    knowsAbout: [
      "Ventas de alto rendimiento",
      "Liderazgo comercial",
      "Construcción y desarrollo de equipos",
      "Desarrollo personal",
      "Mentalidad de abundancia",
      "Emprendimiento",
      "Negocios",
      "Oratoria y conferencias",
    ],
  },
  en: {
    role: "Entrepreneur, Speaker & Author",
    tagline: "Sales without limits. Leadership without excuses.",
    heroHeadline: "Become unstoppable in sales and in life.",
    heroSub:
      "I help salespeople, leaders and entrepreneurs break their income ceilings, build high-performance teams and create an abundant life — through strategy, mindset and execution.",
    bioShort:
      "Darwin Ontiveros is an entrepreneur, speaker and author of the book “Unstoppable and Abundant — Sales Without Limits.” A leader in the field of sales, both in personal production and in building and developing high-performance teams, and a mentor in personal development, sales and business.",
    bioLong:
      "Darwin Ontiveros is a recognized leader in the field of sales, with a distinguished track record in both personal production and the creation and development of high-performance sales teams. He is the author of the book “Unstoppable and Abundant — Sales Without Limits,” where he distills his philosophy of sales, discipline and abundance.\n\nAs a speaker and mentor, Darwin guides entrepreneurs, salespeople and leaders to transform their mindset, master the fundamentals of high-level selling and build a prosperous life across every area. His work integrates sales strategy, personal development and purpose-driven leadership.\n\nHe has been trained and inspired by world-class references in personal development and business, including John C. Maxwell, Ismael Cala, Vilma Núñez and Margarita Pasos, and has collaborated with figures in the digital authority ecosystem such as Spencer Hoffmann. Beyond his professional life, Darwin is a father and husband, and believes that true success is the kind you build without sacrificing what matters most.",
    knowsAbout: [
      "High-performance sales",
      "Sales leadership",
      "Team building and development",
      "Personal development",
      "Abundance mindset",
      "Entrepreneurship",
      "Business",
      "Public speaking",
    ],
  },
} as const;

// --- Estadísticas / logros -------------------------------------------------

export const STATS = {
  es: [
    { value: "10+", label: "Años en ventas y liderazgo" },
    { value: "1", label: "Libro publicado" },
    { value: "23.4K+", label: "Comunidad en redes" },
    { value: "100%", label: "Enfocado en resultados" },
  ],
  en: [
    { value: "10+", label: "Years in sales & leadership" },
    { value: "1", label: "Published book" },
    { value: "23.4K+", label: "Community across socials" },
    { value: "100%", label: "Results-focused" },
  ],
} as const;

// --- Redes sociales (para Schema.org sameAs e interactionStatistic) --------
// IMPORTANTE: solo URLs verificadas. No inventar.

export const SOCIALS = [
  {
    platform: "Instagram",
    handle: "@darwin_ontiveros",
    url: "https://www.instagram.com/darwin_ontiveros/",
    followers: 23400,
    interactionType: "https://schema.org/FollowAction",
  },
  {
    platform: "TikTok",
    handle: "@darwin.ontiveros",
    url: "https://www.tiktok.com/@darwin.ontiveros",
    followers: 568,
    interactionType: "https://schema.org/FollowAction",
  },
  {
    platform: "YouTube",
    handle: "@darwin_ontiveros",
    url: "https://www.youtube.com/@darwin_ontiveros",
    followers: null,
    interactionType: "https://schema.org/FollowAction",
  },
] as const;

// --- Referentes / mentores (autoridad por asociación) ----------------------

export const REFERENCES = [
  { name: "Spencer Hoffmann", relation: { es: "Mentor", en: "Mentor" }, photo: "/mentors/spencer-hoffmann.jpg" },
  { name: "John C. Maxwell", relation: { es: "Mentor", en: "Mentor" }, photo: "/mentors/john-maxwell.jpg" },
  { name: "Ismael Cala", relation: { es: "Referente", en: "Reference" }, photo: "/mentors/ismael-cala.jpg" },
  { name: "Vilma Núñez", relation: { es: "Referente", en: "Reference" }, photo: "/mentors/vilma-nunez.jpg" },
  { name: "Margarita Pasos", relation: { es: "Referente", en: "Reference" }, photo: "/mentors/margarita-pasos.jpg" },
] as const;

// --- Libros ----------------------------------------------------------------

export const BOOKS = [
  {
    slug: "imparable-y-abundante",
    title: "Imparable y Abundante — Ventas Sin Límites",
    titleEn: "Unstoppable and Abundant — Sales Without Limits",
    cover: "/books/imparable-y-abundante.jpg",
    author: "Darwin Ontiveros",
    inLanguage: "es",
    description: {
      es: "Un manual directo y práctico para vendedores y líderes que quieren romper sus límites de producción, dominar la mentalidad de abundancia y construir una carrera imparable en las ventas.",
      en: "A direct, practical manual for salespeople and leaders who want to break their production ceilings, master the abundance mindset and build an unstoppable career in sales.",
    },
    topics: {
      es: ["Ventas", "Mentalidad", "Abundancia", "Disciplina", "Liderazgo"],
      en: ["Sales", "Mindset", "Abundance", "Discipline", "Leadership"],
    },
    amazonUrl: "https://www.amazon.com/-/es/dp/B0DRW99JP1" as string | null,
    goodreadsUrl: null as string | null,
  },
] as const;

// --- Testimonios -----------------------------------------------------------
// Reseñas REALES y verificadas de Trustpilot (perfil darwinontiveros.com).
// TrustScore 4.6/5 sobre 22 reseñas. Verificable en el enlace público.

export const TRUSTPILOT = {
  profileUrl: "https://www.trustpilot.com/review/darwinontiveros.com",
  trustScore: 4.6,
  totalReviews: 22,
} as const;

export const TESTIMONIALS = [
  {
    quote: {
      es: "El acompañamiento es clave en todo lo que decidas emprender. No solo nos dan estrategias y herramientas de ventas, hay una formación integral y muchos incentivos que van más allá de lo económico. Acabamos de vivir una experiencia maravillosa en un viaje a New York que nos motiva aún más a seguir creciendo.",
      en: "The mentorship is key to whatever you decide to build. It's not just sales strategies and tools — there's a complete formation and incentives that go beyond the financial. We just lived an amazing experience on a trip to New York that motivates us even more to keep growing.",
    },
    name: "Dicson Añez",
    rating: 5,
  },
  {
    quote: {
      es: "Excelente manager y ser humano, con elevados estándares de servicio al cliente y un trato exquisito. Para mí es un honor pertenecer a su equipo.",
      en: "Excellent manager and human being, with high standards of customer service and outstanding treatment. It's an honor to be part of his team.",
    },
    name: "Julio Ramirez",
    rating: 5,
  },
  {
    quote: {
      es: "Es un privilegio trabajar con él. Con ética y profesionalismo logra atender a todos sus clientes y agentes.",
      en: "It's a privilege to work with him. With ethics and professionalism he manages to serve all his clients and agents.",
    },
    name: "Julio Angulo",
    rating: 5,
  },
  {
    quote: {
      es: "Siempre atento y enfocado en su trabajo, contamos con su apoyo un 100%. Es incansable y a cualquier pregunta siempre tiene la respuesta. Gracias por compartir tu conocimiento con quien más lo necesita.",
      en: "Always attentive and focused on his work, we have his support 100%. He is tireless and always has an answer to any question. Thank you for sharing your knowledge with those who need it most.",
    },
    name: "Jessika Leon",
    rating: 5,
  },
  {
    quote: {
      es: "Gracias por ser un mentor increíble. Eres amable en cada enfoque y me animas a trabajar con dedicación y a soñar en grande. Estoy muy agradecida de tener un mentor genial como tú.",
      en: "Thank you for being an incredible mentor. You're kind in every approach and encourage me to work hard and dream big. I'm so grateful to have a great mentor like you.",
    },
    name: "Maria Tirado",
    rating: 5,
  },
  {
    quote: {
      es: "Me encantan sus entrenamientos: es rápido, directo y está abierto a cualquier pregunta. He participado en varios y realmente siempre aporta alguna experiencia relevante.",
      en: "I love his trainings: he's fast, direct and open to any question. I've taken part in several and he always brings a relevant experience to the table.",
    },
    name: "Lisandra Carralero",
    rating: 5,
  },
] as const;

// --- Temas de conferencia --------------------------------------------------

export const SPEAKING_TOPICS = {
  es: [
    {
      title: "Ventas Sin Límites",
      description:
        "Los principios y hábitos que separan a los vendedores promedio de los imparables: prospección, cierre, seguimiento y mentalidad.",
    },
    {
      title: "Liderazgo y Construcción de Equipos",
      description:
        "Cómo reclutar, formar y multiplicar equipos comerciales de alto rendimiento que producen con o sin ti presente.",
    },
    {
      title: "Mentalidad de Abundancia",
      description:
        "Reprogramar las creencias sobre el dinero, el mérito y las posibilidades para vender y vivir desde la abundancia.",
    },
    {
      title: "Éxito Integral",
      description:
        "Construir una vida próspera sin sacrificar la familia, la salud ni el propósito. El éxito que sí vale la pena.",
    },
  ],
  en: [
    {
      title: "Sales Without Limits",
      description:
        "The principles and habits that separate average salespeople from unstoppable ones: prospecting, closing, follow-up and mindset.",
    },
    {
      title: "Leadership & Team Building",
      description:
        "How to recruit, train and multiply high-performance sales teams that produce with or without you in the room.",
    },
    {
      title: "Abundance Mindset",
      description:
        "Reprogramming beliefs about money, worth and possibility so you can sell and live from abundance.",
    },
    {
      title: "Integral Success",
      description:
        "Building a prosperous life without sacrificing family, health or purpose. The kind of success that's actually worth it.",
    },
  ],
} as const;

// --- FAQs (para FAQPage Schema) --------------------------------------------

export const FAQS = {
  speaking: {
    es: [
      {
        q: "¿Sobre qué temas imparte conferencias Darwin Ontiveros?",
        a: "Darwin habla sobre ventas de alto rendimiento, liderazgo y construcción de equipos, mentalidad de abundancia y éxito integral. Sus charlas combinan estrategia práctica con desarrollo personal.",
      },
      {
        q: "¿Cómo puedo contratar a Darwin Ontiveros para un evento?",
        a: "Puedes solicitar disponibilidad y tarifas a través del formulario de contacto del sitio o por WhatsApp. Su equipo responde con las opciones para conferencias, keynotes y eventos corporativos.",
      },
      {
        q: "¿Darwin ofrece charlas presenciales y virtuales?",
        a: "Sí. Darwin imparte conferencias tanto presenciales como virtuales para empresas, equipos comerciales y eventos de desarrollo personal y negocios.",
      },
      {
        q: "¿En qué idiomas ofrece sus conferencias?",
        a: "Darwin imparte sus conferencias principalmente en español, y puede coordinar contenido en inglés según las necesidades del evento.",
      },
    ],
    en: [
      {
        q: "What topics does Darwin Ontiveros speak about?",
        a: "Darwin speaks about high-performance sales, leadership and team building, abundance mindset and integral success. His talks combine practical strategy with personal development.",
      },
      {
        q: "How can I book Darwin Ontiveros for an event?",
        a: "You can request availability and rates through the site's contact form or via WhatsApp. His team replies with options for talks, keynotes and corporate events.",
      },
      {
        q: "Does Darwin offer in-person and virtual talks?",
        a: "Yes. Darwin delivers both in-person and virtual talks for companies, sales teams and personal-development and business events.",
      },
      {
        q: "In which languages does he speak?",
        a: "Darwin delivers his talks mainly in Spanish, and can coordinate English-language content depending on the event's needs.",
      },
    ],
  },
  about: {
    es: [
      {
        q: "¿Quién es Darwin Ontiveros?",
        a: "Darwin Ontiveros es emprendedor, conferencista y autor del libro «Imparable y Abundante — Ventas Sin Límites». Es líder en el área de ventas y mentor de desarrollo personal, ventas y negocios.",
      },
      {
        q: "¿Qué libro ha escrito Darwin Ontiveros?",
        a: "Es autor de «Imparable y Abundante — Ventas Sin Límites», un manual práctico sobre ventas de alto rendimiento y mentalidad de abundancia.",
      },
      {
        q: "¿Con qué referentes se ha formado Darwin Ontiveros?",
        a: "Darwin ha sido formado e inspirado por referentes como John C. Maxwell, Ismael Cala, Vilma Núñez y Margarita Pasos, y ha colaborado con Spencer Hoffmann.",
      },
    ],
    en: [
      {
        q: "Who is Darwin Ontiveros?",
        a: "Darwin Ontiveros is an entrepreneur, speaker and author of the book “Unstoppable and Abundant — Sales Without Limits.” He is a leader in sales and a mentor in personal development, sales and business.",
      },
      {
        q: "What book has Darwin Ontiveros written?",
        a: "He is the author of “Unstoppable and Abundant — Sales Without Limits,” a practical manual on high-performance sales and the abundance mindset.",
      },
      {
        q: "Which references has Darwin Ontiveros trained with?",
        a: "Darwin has been trained and inspired by references such as John C. Maxwell, Ismael Cala, Vilma Núñez and Margarita Pasos, and has collaborated with Spencer Hoffmann.",
      },
    ],
  },
} as const;

// --- Contacto --------------------------------------------------------------

export const CONTACT = {
  assistantEmail: "ogbusinessgroup2@gmail.com",
  // WhatsApp en formato internacional sin símbolos para el link wa.me
  whatsappNumber: "16893475898",
  whatsappDisplay: "+1 (689) 347-5898",
  inquiryTypes: {
    es: [
      "Conferencia / Keynote",
      "Evento Corporativo",
      "Mentoría",
      "Colaboración",
      "Medios",
      "Otro",
    ],
    en: [
      "Talk / Keynote",
      "Corporate Event",
      "Mentoring",
      "Collaboration",
      "Media",
      "Other",
    ],
  },
} as const;

// --- Navegación ------------------------------------------------------------

export const NAV = {
  es: [
    { href: "/", label: "Inicio" },
    { href: "/sobre-mi", label: "Sobre mí" },
    { href: "/libros", label: "Libros" },
    { href: "/conferencias", label: "Conferencias" },
    { href: "/prensa", label: "Prensa" },
    { href: "/blog", label: "Blog" },
  ],
  en: [
    { href: "/en", label: "Home" },
    { href: "/en/about", label: "About" },
    { href: "/en/books", label: "Books" },
    { href: "/en/speaking", label: "Speaking" },
    { href: "/en/press", label: "Press" },
    { href: "/en/blog", label: "Blog" },
  ],
} as const;

// --- Plataformas de autoridad (Fase 4) -------------------------------------
// URLs de perfiles verificados que refuerzan la identidad en Schema.org
// (sameAs) y ante las IAs. Agregar SOLO cuando el perfil exista realmente.
// Ver GUIA-PLATAFORMAS-AUTORIDAD.md para el paso a paso de creación.

export const AUTHORITY_LINKS: string[] = [
  // Ejemplos (descomentar y completar cuando estén creados):
  // "https://www.wikidata.org/wiki/QXXXXXXX",
  // "https://www.amazon.com/author/darwinontiveros",
  // "https://www.goodreads.com/author/show/XXXXXX.Darwin_Ontiveros",
  // "https://www.crunchbase.com/person/darwin-ontiveros",
  // "https://es.wikipedia.org/wiki/Darwin_Ontiveros",
];

// Premios / reconocimientos (Person.award). Agregar cuando existan.
export const AWARDS: string[] = [];

// Organizaciones a las que pertenece (Person.memberOf). Agregar cuando aplique.
export const MEMBERSHIPS: { name: string; url?: string }[] = [];
