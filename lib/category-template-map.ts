import type { TemplateId } from "@/lib/dashboard-data";

const STUDIO_CATEGORIES = new Set([
  "Barber shop",
  "Hair Salon",
  "Nail Salon",
  "Beauty Salon",
  "Beautician",
  "Body art service",
  "Wellness Center",
  "Dental Clinic",
  "Medical Clinic",
  "Fitness center",
]);

const RISTORANTE_CATEGORIES = new Set([
  "Restaurant",
  "Tapas Restaurant",
  "Spanish Restaurant",
  "Persian Restaurant",
  "Halal Restaurant",
  "Moroccan Restaurant",
  "North Indian Restaurant",
  "Chinese Restaurant",
  "Bar",
  "Bar & Grill",
  "Gastropub",
  "Brunch Restaurant",
  "Cafe",
  "Cafeteria",
  "Coffee Shop",
  "Bakery",
  "Pastry Shop",
  "Ice Cream Shop",
  "Fast Food Restaurant",
  "Takeout Restaurant",
  "Food Store",
  "Cocktail Bar",
  "Lounge bar",
  "Wine Bar",
  "Irish Pub",
  "Pub",
]);

const FLORISTERIA_CATEGORIES = new Set(["Florist"]);

const PORTFOLIO_CATEGORIES = new Set([
  "Plumber",
  "Electrician",
  "General Contractor",
  "Car repair and maintenance service",
]);

export function resolveTemplateId(category: string | undefined): TemplateId | null {
  if (!category) return null;

  if (STUDIO_CATEGORIES.has(category)) return "studio";
  if (RISTORANTE_CATEGORIES.has(category)) return "ristorante";
  if (FLORISTERIA_CATEGORIES.has(category)) return "floristeria";
  if (PORTFOLIO_CATEGORIES.has(category)) return "portfolio";

  return "ristorante";
}
