"use client";
import { useState } from "react";
import type { PublicProductDto } from "@/lib/domain/dtos";
import { getWhatsAppLink } from "@/lib/whatsapp-link";

const MAX_TAGS = 6;

export function usePublicProduct(product: PublicProductDto, phone: string, publicUrl: string) {
  const [variantId, setVariantId] = useState(() => product.variants.find((variant) => variant.available)?.id ?? product.variants[0]?.id ?? "");
  const [imageIndex, setImageIndex] = useState(0);
  const variant = product.variants.find((variant) => variant.id === variantId) ?? product.variants[0];
  const price = product.priceCents;
  const previousPrice = product.previousPriceCents;
  const discounted = previousPrice !== null && price !== null && previousPrice > price;
  const variantLabel = [variant?.size, variant?.color].filter(Boolean).join(" / ");
  const text = `Hola, quiero consultar por ${product.title}${variantLabel ? ` (${variantLabel})` : ""}${variant?.available ? "" : ". Aparece como agotado"}. ${publicUrl}`;
  const whatsappHref = getWhatsAppLink(phone, text) || null;
  const eyebrow = [product.category, product.brand].filter(Boolean).join(" · ");
  const titleWords = product.title.trim().split(/\s+/);
  const titleAccent = titleWords.length > 1 ? (titleWords.pop() ?? "") : "";
  const titleLead = titleWords.join(" ");
  const tags = product.tags.slice(0, MAX_TAGS);
  const characteristics = [{ name: "Material", value: product.material }, { name: "Composición", value: product.composition }, { name: "Medidas", value: product.dimensions }, { name: "Peso", value: product.weight }, ...product.characteristics].filter((item) => item.value);
  return {
    variant, variantId, setVariantId, imageIndex, setImageIndex,
    price, previousPrice, discounted, available: variant?.available ?? false,
    size: variant?.size ?? "", color: variant?.color ?? "",
    eyebrow, titleLead, titleAccent, tags, whatsappHref, characteristics,
  };
}
