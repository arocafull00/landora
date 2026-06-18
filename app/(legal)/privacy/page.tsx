import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | Landora",
  description:
    "Información sobre el tratamiento de datos personales en la plataforma Landora.",
};

export default function PrivacyPage() {
  return (
    <article className="space-y-8 font-body text-body-md text-on-surface">
      <header className="space-y-2">
        <h1 className="font-headline text-headline-lg font-semibold text-on-surface">
          Política de Privacidad
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Última actualización: 17 de junio de 2026
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          1. Responsable del tratamiento
        </h2>
        <p>
          El responsable del tratamiento de los datos personales recogidos a
          través de Landora es:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Identidad:</strong> Adrian Rocafull Berbel
          </li>
          <li>
            <strong>Correo electrónico:</strong>{" "}
            <a
              href="mailto:adrianrocafull1@gmail.com"
              className="text-primary hover:underline"
            >
              adrianrocafull1@gmail.com
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          2. Información que recopilamos
        </h2>
        <p>
          Landora es una plataforma SaaS para crear y gestionar páginas web de
          clientes. Recopilamos y tratamos los siguientes datos personales:
        </p>
        <h3 className="font-headline text-body-md font-medium text-on-surface">
          2.1. Datos de usuarios registrados (clientes y administradores)
        </h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>Nombre</li>
          <li>Correo electrónico</li>
          <li>Contraseña (gestionada y almacenada por Clerk Inc.)</li>
          <li>Identificador de usuario y datos de sesión</li>
        </ul>
        <h3 className="font-headline text-body-md font-medium text-on-surface">
          2.2. Contenido introducido por los clientes
        </h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Datos de contacto del negocio (teléfono, correo, dirección, enlaces
            a redes sociales)
          </li>
          <li>Textos, imágenes y metadatos de las páginas web publicadas</li>
          <li>
            Nombres de miembros del equipo, autores de testimonios y contenido
            del blog
          </li>
          <li>Dominios personalizados asociados a cada página</li>
        </ul>
        <h3 className="font-headline text-body-md font-medium text-on-surface">
          2.3. Datos técnicos y de uso
        </h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Métricas agregadas de rendimiento y uso de la plataforma mediante
            Vercel Analytics y Vercel Speed Insights (sin cookies de
            seguimiento)
          </li>
          <li>
            Registros técnicos necesarios para el funcionamiento, seguridad y
            mantenimiento del servicio
          </li>
        </ul>
        <p>
          Landora no dispone de formularios de contacto en las páginas públicas
          de los clientes que almacenen datos de visitantes en nuestra base de
          datos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          3. Finalidad del tratamiento
        </h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>Gestionar el registro, autenticación y acceso a la plataforma</li>
          <li>
            Permitir la creación, edición y publicación de páginas web de los
            clientes
          </li>
          <li>Almacenar y servir el contenido y los archivos multimedia</li>
          <li>Gestionar dominios personalizados</li>
          <li>
            Medir el rendimiento técnico de la plataforma y mejorar el servicio
          </li>
          <li>Cumplir obligaciones legales aplicables</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          4. Base jurídica
        </h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Ejecución de un contrato</strong> (art. 6.1.b RGPD): para
            prestar el servicio contratado a los usuarios registrados
          </li>
          <li>
            <strong>Obligación legal</strong> (art. 6.1.c RGPD): cuando el
            tratamiento sea necesario para cumplir requisitos legales
          </li>
          <li>
            <strong>Interés legítimo</strong> (art. 6.1.f RGPD): para garantizar
            la seguridad, el mantenimiento y la mejora técnica de la plataforma
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          5. Destinatarios y encargados del tratamiento
        </h2>
        <p>
          Para prestar el servicio, compartimos datos con los siguientes
          proveedores, que actúan como encargados del tratamiento:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Clerk Inc.</strong> — autenticación y gestión de cuentas
          </li>
          <li>
            <strong>Neon Inc.</strong> — base de datos (PostgreSQL)
          </li>
          <li>
            <strong>Cloudinary Ltd.</strong> — almacenamiento y entrega de
            archivos multimedia
          </li>
          <li>
            <strong>Vercel Inc.</strong> — alojamiento, dominios y analítica
            técnica sin cookies
          </li>
        </ul>
        <p>
          Algunos de estos proveedores pueden estar ubicados fuera del Espacio
          Económico Europeo. En esos casos, las transferencias internacionales
          se realizan con las garantías previstas en el RGPD, incluidas las
          cláusulas contractuales tipo aprobadas por la Comisión Europea.
        </p>
        <p>
          No vendemos ni cedemos datos personales a terceros con fines
          comerciales.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          6. Plazo de conservación
        </h2>
        <p>
          Los datos se conservan mientras el usuario mantenga una cuenta activa
          en Landora y durante el tiempo necesario para cumplir obligaciones
          legales o resolver reclamaciones. Una vez finalizada la relación, los
          datos se eliminarán o anonimizarán en un plazo razonable, salvo que
          exista una obligación legal de conservación.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          7. Medidas de seguridad
        </h2>
        <p>
          Aplicamos medidas técnicas y organizativas para proteger los datos
          personales, entre ellas:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Autenticación segura gestionada por Clerk</li>
          <li>Comunicaciones cifradas mediante HTTPS</li>
          <li>Acceso restringido a áreas protegidas de la plataforma</li>
          <li>
            Almacenamiento en infraestructura de proveedores con controles de
            seguridad
          </li>
          <li>
            Separación de datos por cliente en la arquitectura multi-tenant
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          8. Derechos de las personas interesadas
        </h2>
        <p>
          Puedes ejercer los siguientes derechos en relación con tus datos
          personales:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Acceso</li>
          <li>Rectificación</li>
          <li>Supresión</li>
          <li>Limitación del tratamiento</li>
          <li>Oposición</li>
          <li>Portabilidad de los datos</li>
        </ul>
        <p>
          Para ejercer estos derechos, envía una solicitud a{" "}
          <a
            href="mailto:adrianrocafull1@gmail.com"
            className="text-primary hover:underline"
          >
            adrianrocafull1@gmail.com
          </a>
          , indicando el derecho que deseas ejercer y acreditando tu identidad.
        </p>
        <p>
          También tienes derecho a presentar una reclamación ante la Agencia
          Española de Protección de Datos (
          <a
            href="https://www.aepd.es"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aepd.es
          </a>
          ).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          9. Cambios en esta política
        </h2>
        <p>
          Podemos actualizar esta Política de Privacidad para reflejar cambios
          legales o en el funcionamiento del servicio. La versión vigente estará
          siempre disponible en esta página.
        </p>
      </section>

      <footer className="border-t border-outline-variant pt-6">
        <p className="text-body-sm text-on-surface-variant">
          Consulta también el{" "}
          <Link href="/legal" className="text-primary hover:underline">
            Aviso Legal
          </Link>{" "}
          y los{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Términos del Servicio
          </Link>
          .
        </p>
      </footer>
    </article>
  );
}
