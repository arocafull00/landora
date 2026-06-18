import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal | Landora",
  description: "Información legal sobre el titular y condiciones de uso de Landora.",
};

export default function LegalPage() {
  return (
    <article className="space-y-8 font-body text-body-md text-on-surface">
      <header className="space-y-2">
        <h1 className="font-headline text-headline-lg font-semibold text-on-surface">
          Aviso Legal
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Última actualización: 17 de junio de 2026
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          1. Datos identificativos del titular
        </h2>
        <p>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se
          informa de los siguientes datos:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Titular:</strong> Adrian Rocafull Berbel
          </li>
          <li>
            <strong>DNI:</strong> [DNI]
          </li>
          <li>
            <strong>Domicilio:</strong> [DOMICILIO]
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
          2. Objeto
        </h2>
        <p>
          El presente aviso legal regula el acceso y uso del sitio web y la
          plataforma Landora, un servicio SaaS de gestión y publicación de
          páginas web multi-tenant.
        </p>
        <p>
          El acceso a la plataforma implica la aceptación de las condiciones
          recogidas en este aviso legal, en la{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Política de Privacidad
          </Link>{" "}
          y en los{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Términos del Servicio
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          3. Condiciones de uso
        </h2>
        <p>
          El usuario se compromete a utilizar Landora de forma lícita, de
          conformidad con la legislación vigente y sin causar perjuicio a
          terceros. Queda prohibido:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Utilizar la plataforma para fines ilícitos o contrarios al orden
            público
          </li>
          <li>
            Introducir contenido que infrinja derechos de propiedad intelectual,
            privacidad o cualquier otro derecho de terceros
          </li>
          <li>
            Intentar acceder sin autorización a sistemas, cuentas o datos de
            otros usuarios
          </li>
          <li>
            Realizar actividades que puedan dañar, inutilizar o sobrecargar la
            plataforma
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          4. Propiedad intelectual e industrial
        </h2>
        <p>
          Los elementos propios de Landora (software, diseño, código, marca,
          logotipos y estructura de la plataforma) son propiedad del titular o
          de sus licenciantes y están protegidos por la legislación aplicable en
          materia de propiedad intelectual e industrial.
        </p>
        <p>
          El contenido publicado por cada cliente en su página web es
          responsabilidad del cliente titular de dicha cuenta. Landora actúa
          como proveedor de la infraestructura técnica para su publicación.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          5. Responsabilidad
        </h2>
        <p>
          Landora no se hace responsable del uso que los clientes hagan de la
          plataforma ni del contenido que publiquen en sus páginas web.
        </p>
        <p>
          El titular no garantiza la ausencia de interrupciones o errores en el
          acceso a la plataforma, aunque adoptará las medidas razonables para
          mantener su correcto funcionamiento.
        </p>
        <p>
          Landora no se responsabiliza de los daños derivados del uso indebido
          de la plataforma por parte de los usuarios ni de enlaces externos
          incluidos en las páginas publicadas por los clientes.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          6. Enlaces
        </h2>
        <p>
          Las páginas web creadas por los clientes pueden incluir enlaces a
          sitios de terceros. Landora no controla ni asume responsabilidad por
          el contenido, políticas o prácticas de dichos sitios externos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          7. Legislación aplicable y jurisdicción
        </h2>
        <p>
          Las relaciones derivadas del uso de Landora se regirán por la
          legislación española.
        </p>
        <p>
          Para la resolución de cualquier controversia, las partes se someten a
          los juzgados y tribunales del domicilio del titular, salvo que la
          normativa aplicable establezca otro fuero imperativo.
        </p>
      </section>

      <footer className="border-t border-outline-variant pt-6">
        <p className="text-body-sm text-on-surface-variant">
          Consulta también la{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Política de Privacidad
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
