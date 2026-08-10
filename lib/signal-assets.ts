export const SIGNAL_ASSETS = {
  hero: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=85&auto=format",
  texture: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&q=80&auto=format",
  fragment1: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=85&auto=format",
  fragment2: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&q=85&auto=format",
  fragment3: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=85&auto=format",
  fragment4: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=1200&q=85&auto=format",
  fragment5: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=85&auto=format",
} as const;

export const SIGNAL_IMAGE_OPTIONS = [
  { value: SIGNAL_ASSETS.hero, label: "Portada" },
  { value: SIGNAL_ASSETS.texture, label: "Textura" },
  { value: SIGNAL_ASSETS.fragment1, label: "Fragmento 1" },
  { value: SIGNAL_ASSETS.fragment2, label: "Fragmento 2" },
  { value: SIGNAL_ASSETS.fragment3, label: "Fragmento 3" },
  { value: SIGNAL_ASSETS.fragment4, label: "Fragmento 4" },
  { value: SIGNAL_ASSETS.fragment5, label: "Fragmento 5" },
] as const;
