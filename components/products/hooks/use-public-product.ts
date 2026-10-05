"use client";
import { useState } from "react";
import type { PublicProductDto } from "@/lib/domain/dtos";

export function usePublicProduct(product: PublicProductDto, phone: string, publicUrl: string) {
  const [variantId, setVariantId] = useState(() => product.variants.find((variant) => variant.available)?.id ?? product.variants[0]?.id ?? "");
  const [imageIndex, setImageIndex] = useState(0);
  const variant = product.variants.find((variant) => variant.id === variantId) ?? product.variants[0];
  const price = variant?.priceCents ?? product.priceCents;
  const previousPrice = variant?.previousPriceCents ?? product.previousPriceCents;
  const variantLabel = [variant?.size, variant?.color].filter(Boolean).join(" / ");
  const text = `Hola, quiero consultar por ${product.title}${variantLabel ? ` (${variantLabel})` : ""}${variant?.available ? "" : ". Aparece como agotado"}. ${publicUrl}`;
  const whatsappHref = /^\+[1-9]\d{7,14}$/.test(phone) ? `https://wa.me/${phone.slice(1)}?text=${encodeURIComponent(text)}` : null;
  const options = product.variants.map((variant) => ({ value: variant.id, label: `${[variant.size, variant.color].filter(Boolean).join(" / ") || "Estándar"}${variant.available ? "" : " · Agotado"}` }));
  const characteristics = [{ name: "Marca", value: product.brand }, { name: "Categoría", value: product.category }, { name: "Material", value: product.material }, { name: "Composición", value: product.composition }, { name: "Medidas", value: product.dimensions }, { name: "Peso", value: product.weight }, ...product.characteristics].filter((item) => item.value);
  return { variant, price, previousPrice, options, variantId, setVariantId, imageIndex, setImageIndex, whatsappHref, characteristics };
}
