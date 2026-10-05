import type { NuvoletsContent, NuvoletsProduct } from "@/lib/schemas/nuvolets";

const productDetails: Pick<NuvoletsProduct, "badge" | "tone" | "colors">[] = [
  { badge: "Nuevo", tone: "blue", colors: ["blue", "pink", "yellow"] },
  { badge: "", tone: "pink", colors: ["pink", "sage"] },
  { badge: "Bestseller", tone: "yellow", colors: ["yellow", "blue"] },
  { badge: "Últimas unidades", tone: "sage", colors: ["sage", "pink"] },
  { badge: "", tone: "blue", colors: ["blue", "sage"] },
  { badge: "Nuevo", tone: "pink", colors: ["pink", "yellow"] },
  { badge: "", tone: "sage", colors: ["sage", "blue"] },
  { badge: "Nuevo", tone: "yellow", colors: ["yellow", "pink", "blue"] },
];

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=72`;

export const NUVOLETS_HERO_IMAGE = photo("1484665754804-74b091211472");
export const NUVOLETS_SECTION_HEADINGS = {
  categorias: { title: "Para cada pequeño momento", subtitle: "" },
  coleccion: { title: "Recién llegado a Nuvolets", subtitle: "Nuevas prendas para llenar el armario de cosas bonitas. Pronóstico de hoy: 100% de probabilidad de monadas." },
  historia: { title: "Pequeñas prendas.\nGrandes recuerdos.", subtitle: "" },
  favoritos: { title: "Nuestros favoritos", subtitle: "Esas prendas que siempre terminan enamorando. Nuestras nubes preferidas." },
  tienda: { title: "Ven a conocernos", subtitle: "" },
  instagram: { title: "@nuvolets.paiporta", subtitle: "Nuevas colecciones, ideas y pequeñas sorpresas. Aquí tenemos la cabeza en las nubes." },
  newsletter: { title: "Cositas bonitas, directamente en tu correo", subtitle: "" },
};

export const NUVOLETS_DEFAULT_CONFIG: NuvoletsContent = {
  heroDetails: { alt: "Peque riendo mientras su madre la levanta en brazos", primaryHref: "#coleccion", secondaryLabel: "Descubrir Nuvolets", secondaryHref: "#tienda" },
  marquee: ["Ropita de 0 a 10 años", "Más blandita que una nube", "Tienda en Paiporta", "Hecho con cariño", "Pronóstico: 100% monadas"].map((text, i) => ({ id: `message-${i}`, text })),
  categories: [
    { id: "bebe", title: "Bebé", description: "Suavidad desde sus primeros días. Ternura nivel nube de algodón.", image: photo("1522771930-78848d9293e8"), alt: "Bebé con un pelele de peluche", href: "#coleccion", tone: "blue" },
    { id: "nina", title: "Niña", description: "Para saltar charcos con mucho estilo.", image: photo("1518831959646-742c3a14ebf7"), alt: "Niña con chaqueta blanca entre flores", href: "#coleccion", tone: "pink" },
    { id: "nino", title: "Niño", description: "A prueba de carreras, rodillas y barro.", image: photo("1519238263530-99bdd11df2ea"), alt: "Niño con cárdigan azul marino", href: "#coleccion", tone: "sage" },
  ],
  products: [
    ["Conjunto Nube", "29,90 €", "1514090458221-65bb69cf63e6", "Bebé con camisa de cuadros y tirantes"],
    ["Vestido Luna", "34,90 €", "1476234251651-f353703a034d", "Dos niñas con vestido leyendo un libro"],
    ["Pelele Estrella", "24,90 €", "1617331140180-e8262094733a", "Bebé sonriente con un pelele gris"],
    ["Jersey Cúmulo", "27,90 €", "1503919005314-30d93d07d823", "Niño con chaqueta marrón"],
    ["Conjunto Brisa", "32,90 €", "1471286174890-9c112ffca5b4", "Niño con polo rojo junto al mar"],
    ["Vestido Amapola", "36,90 €", "1560506840-ec148e82a604", "Vestidos amarillos de lunares"],
    ["Pelele Algodón", "22,90 €", "1546015720-b8b30df5aa27", "Bebé bostezando con un gorrito gris"],
    ["Gorrito Llovizna", "14,90 €", "1604917621956-10dfa7cce2e7", "Bebé con un gorrito de punto"],
  ].map(([name, price, imageId, alt], i) => ({ id: `product-${i}`, name, price, image: photo(imageId), alt, ...productDetails[i] })),
  collection: { ...NUVOLETS_SECTION_HEADINGS.coleccion, note: "¿Te ha gustado algo? Pásate por la tienda o escríbenos por", linkLabel: "Instagram", href: "https://www.instagram.com/nuvolets.paiporta" },
  story: { title: NUVOLETS_SECTION_HEADINGS.historia.title, text: "Elegimos cada pieza pensando en comodidad, calidad y esos momentos que pasan demasiado rápido.", secondaryText: "Nuvolets significa «nubecitas» en valenciano, y así queremos que se sienta cada prenda: ligera, suave y con la cabeza en las nubes.", image: photo("1622290291468-a28f7a7dc6a8"), alt: "Camiseta blanca junto a un gorro y un peluche", ctaLabel: "Conócenos", ctaHref: "#tienda" },
  favorites: { ...NUVOLETS_SECTION_HEADINGS.favoritos, productIds: ["product-1", "product-4", "product-2", "product-6", "product-3", "product-7"] },
  store: { eyebrow: "NOS ENCONTRAMOS EN PAIPORTA", title: "Ven a conocernos", text: "Pásate por Nuvolets, descubre las prendas en persona y déjate aconsejar para encontrar justo lo que buscas. Aquí casi siempre sale el sol.", image: photo("1567401893414-76b7b1e5a7a5"), alt: "Interior de una tienda de ropa", ctaLabel: "Cómo llegar", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nuvolets+Paiporta", secondaryLabel: "Ver Instagram", secondaryHref: "#instagram" },
  instagram: { title: "@nuvolets.paiporta", text: NUVOLETS_SECTION_HEADINGS.instagram.subtitle, buttonLabel: "Síguenos en Instagram", url: "https://www.instagram.com/nuvolets.paiporta", images: ["1607453998774-d533f65dac99", "1621452773781-0f992fd1f5cb", "1519457431-44ccd64a579b", "1555252333-9f8e92e65df9", "1503944583220-79d8926ad5e2", "1503454537195-1dcabb73ffb9"].map((imageId, i) => ({ id: `instagram-${i}`, image: photo(imageId), alt: "Pequeños momentos en familia", href: "https://www.instagram.com/nuvolets.paiporta", tone: "blue" })) },
  newsletter: { enabled: false, title: NUVOLETS_SECTION_HEADINGS.newsletter.title, text: "Nuevas colecciones, novedades y alguna sorpresa de vez en cuando. Prometemos cero tormentas de spam.", placeholder: "Tu email", buttonLabel: "Quiero apuntarme", consentText: "", privacyUrl: "" },
  mascot: { enabled: true, name: "Nuvi", image: "", alt: "Nuvi, la nube", messages: ["¡Hola! Soy Nuvi. Toca mi barriguita.", "Pronóstico de hoy: abrazos con probabilidad alta.", "Psst… los favoritos están más abajo.", "Prometo no llover sobre tu ropa nueva.", "Soy una nube, pero me encantaría tener un pelele."].map((text, i) => ({ id: `mascot-${i}`, text })) },
  effects: { decorations: true, motion: true },
  colors: { enabled: false, background: "#FAF7F1", surface: "#FFFDF9", text: "#3D3A36", border: "#E9E2D8", blue: "#A9C4D3", pink: "#EBC7C5", yellow: "#F2D995", sage: "#C6D2BE" },
  footer: { description: "Ropita dulce para bebés\ny peques de 0 a 10 años.", exploreTitle: "Explora", exploreLinks: [{ id: "collection", label: "Colección", href: "#coleccion" }, { id: "baby", label: "Bebé", href: "#categorias" }, { id: "girl", label: "Niña", href: "#categorias" }, { id: "boy", label: "Niño", href: "#categorias" }], infoTitle: "Información", infoLinks: [{ id: "directions", label: "Cómo llegar", href: "#tienda" }, { id: "visit", label: "Visítanos en Paiporta", href: "#tienda" }], socialTitle: "Síguenos", socialLinks: [{ id: "instagram", label: "Instagram", href: "https://www.instagram.com/nuvolets.paiporta" }], copyright: "«Nuvolets» significa «nubecitas» en valenciano. Hecho con cariño en Paiporta. Fotos de Unsplash." },
};
