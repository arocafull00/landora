import type { SubscriptionSettings } from "@/lib/schemas/subscription-settings";

export const DEFAULT_CONSENT_TEXT = "Quiero recibir novedades y comunicaciones comerciales por email. Puedo retirar mi consentimiento en cualquier momento.";

export const DEFAULT_PRIVACY_TEXT = `## Responsable del tratamiento
{{responsable}}, con domicilio en {{direccion}}. Puedes contactar con nosotros en {{email}}.

## Datos y finalidad
Tratamos tu dirección de email y la fecha de suscripción para gestionar tu suscripción y enviarte novedades y comunicaciones comerciales de nuestro negocio.

## Base jurídica
El tratamiento se basa en el consentimiento que otorgas al marcar la casilla y enviar el formulario. Suscribirte es voluntario y puedes retirar tu consentimiento en cualquier momento.

## Conservación
Conservaremos tu email mientras mantengas tu suscripción. Cuando solicites la baja, dejaremos de utilizarlo para comunicaciones comerciales, sin perjuicio de los datos que debamos conservar para atender obligaciones legales o posibles responsabilidades.

## Destinatarios y proveedores
Utilizamos proveedores tecnológicos de alojamiento, base de datos y protección del formulario frente al abuso. Actúan como encargados del tratamiento y solo tratan tus datos siguiendo nuestras instrucciones. No cedemos tus datos a terceros con fines comerciales.

## Tus derechos
Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad de tus datos y retirar tu consentimiento escribiendo a {{email}}. Retirarlo no afecta a la licitud del tratamiento previo. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos en https://www.aepd.es.

## Baja de las suscripciones
Para dejar de recibir comunicaciones, escribe a {{email}} indicando que deseas darte de baja.`;

export const DEFAULT_SUBSCRIPTION_SETTINGS: SubscriptionSettings = {
  enabled: false,
  controllerName: "",
  controllerAddress: "",
  contactEmail: "",
  consentText: DEFAULT_CONSENT_TEXT,
  privacyTitle: "Política de privacidad de las suscripciones",
  privacyText: DEFAULT_PRIVACY_TEXT,
};
