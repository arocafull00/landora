const PUBLIC_LANDING_LOADING_COPY = {
  label: "Cargando contenido",
} as const;

export function PublicLandingLoading() {
  return (
    <div
      aria-busy="true"
      className="sr-only"
      role="status"
    >
      {PUBLIC_LANDING_LOADING_COPY.label}
    </div>
  );
}
