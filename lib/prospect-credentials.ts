function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function nameWords(name: string) {
  return normalizeName(name)
    .split(/\s+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean);
}

export function buildProspectEmail(name: string) {
  const localPart = nameWords(name)
    .join("")
    .toLowerCase();

  if (!localPart) {
    throw new Error("No se pudo generar el email a partir del nombre");
  }

  return `${localPart}@gmail.com`;
}

export function buildProspectPassword(name: string) {
  const words = nameWords(name);

  if (words.length === 0) {
    throw new Error("No se pudo generar la contraseña a partir del nombre");
  }

  const parts = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  return `${parts.join(".")}123!`;
}

export function buildProspectSlug(name: string) {
  return normalizeName(name)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function resolveProspectName(metaName: string | undefined, heroTitle: string) {
  const name = metaName?.trim() || heroTitle.trim();

  if (!name) {
    throw new Error("El JSON no incluye un nombre válido");
  }

  return name;
}
