import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones del Servicio | Landora",
  description:
    "Condiciones de uso del servicio SaaS Landora para la creación y gestión de páginas web.",
};

export default function TermsPage() {
  return (
    <article className="space-y-8 font-body text-body-md text-on-surface">
      <header className="space-y-2">
        <h1 className="font-headline text-headline-lg font-semibold text-on-surface">
          Términos y Condiciones del Servicio
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Última actualización: 18 de junio de 2026
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          1. Objeto del servicio
        </h2>
        <p>
          Los presentes Términos y Condiciones regulan el acceso y uso de
          Landora, una plataforma SaaS que permite a los clientes crear, editar
          y publicar páginas web mediante plantillas predefinidas, gestionar
          contenido, archivos multimedia y dominios personalizados.
        </p>
        <p>
          El titular del servicio es Adrian Rocafull Berbel, con correo de
          contacto{" "}
          <a
            href="mailto:adrianrocafull1@gmail.com"
            className="text-primary hover:underline"
          >
            adrianrocafull1@gmail.com
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          2. Aceptación de los términos
        </h2>
        <p>
          El registro y uso de Landora implica la aceptación plena de estos
          Términos y Condiciones, del{" "}
          <Link href="/legal" className="text-primary hover:underline">
            Aviso Legal
          </Link>{" "}
          y de la{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Política de Privacidad
          </Link>
          .
        </p>
        <p>
          Si no estás de acuerdo con alguna de estas condiciones, no debes
          utilizar el servicio.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          3. Registro y cuenta
        </h2>
        <p>
          Para acceder a Landora es necesario disponer de una cuenta de usuario.
          Al registrarte, te comprometes a:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Proporcionar información veraz, exacta y actualizada</li>
          <li>
            Mantener la confidencialidad de tus credenciales de acceso
          </li>
          <li>
            Notificar de inmediato cualquier uso no autorizado de tu cuenta
          </li>
          <li>
            Ser responsable de todas las actividades realizadas desde tu cuenta
          </li>
        </ul>
        <p>
          Landora se reserva el derecho de rechazar o cancelar cuentas que
          incumplan estos términos o que contengan datos falsos o incompletos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          4. Uso aceptable
        </h2>
        <p>
          El cliente se compromete a utilizar Landora de forma lícita y
          conforme a la legislación vigente. Queda expresamente prohibido:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Publicar contenido ilícito, difamatorio, amenazante, obsceno o que
            incite al odio o la violencia
          </li>
          <li>
            Infringir derechos de propiedad intelectual, privacidad o cualquier
            otro derecho de terceros
          </li>
          <li>
            Distribuir spam, malware, virus o cualquier código dañino
          </li>
          <li>
            Suplantar la identidad de otra persona o entidad
          </li>
          <li>
            Intentar acceder sin autorización a sistemas, cuentas o datos de
            otros usuarios
          </li>
          <li>
            Realizar ingeniería inversa, descompilar o intentar extraer el
            código fuente de la plataforma
          </li>
          <li>
            Utilizar el servicio para actividades que puedan dañar, inutilizar
            o sobrecargar la infraestructura
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          5. Contenido del cliente
        </h2>
        <p>
          El cliente conserva la titularidad de todo el contenido que publique
          en su página web a través de Landora, incluyendo textos, imágenes,
          vídeos y demás materiales.
        </p>
        <p>
          Al utilizar el servicio, el cliente otorga a Landora una licencia
          limitada, no exclusiva y revocable para alojar, reproducir y servir
          dicho contenido exclusivamente con el fin de prestar el servicio
          contratado.
        </p>
        <p>
          El cliente es el único responsable del contenido que publique y de
          garantizar que dispone de los derechos necesarios para su uso.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          6. Disponibilidad del servicio
        </h2>
        <p>
          Landora se esfuerza por mantener el servicio disponible de forma
          continua, pero no garantiza un tiempo de actividad ininterrumpido.
        </p>
        <p>
          El titular podrá realizar tareas de mantenimiento programado,
          actualizaciones o mejoras que puedan suponer interrupciones temporales
          del servicio, procurando minimizar su impacto.
        </p>
        <p>
          Landora no será responsable de interrupciones causadas por factores
          ajenos a su control, incluyendo fallos de proveedores de
          infraestructura, fuerza mayor o causas de terceros.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          7. Suspensión y cancelación
        </h2>
        <p>
          Landora podrá suspender o cancelar el acceso de un cliente en los
          siguientes casos:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Incumplimiento de estos Términos y Condiciones</li>
          <li>Publicación de contenido ilícito o que infrinja derechos de terceros</li>
          <li>Uso del servicio que ponga en riesgo la seguridad de la plataforma</li>
          <li>Impago de las tarifas aplicables, cuando corresponda</li>
        </ul>
        <p>
          El cliente puede solicitar la cancelación de su cuenta en cualquier
          momento contactando a{" "}
          <a
            href="mailto:adrianrocafull1@gmail.com"
            className="text-primary hover:underline"
          >
            adrianrocafull1@gmail.com
          </a>
          . Tras la cancelación, los datos asociados a la cuenta se eliminarán
          en un plazo razonable, salvo obligación legal de conservación.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          8. Precios y pago
        </h2>
        <p>[MODELO DE PRECIOS]</p>
        <p>
          Landora se reserva el derecho de modificar sus tarifas con
          antelación razonable, notificando al cliente por correo electrónico.
          Los cambios de precio no afectarán a periodos ya abonados.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          9. Limitación de responsabilidad
        </h2>
        <p>
          En la máxima medida permitida por la legislación aplicable, Landora
          no será responsable de daños indirectos, incidentales, especiales o
          consecuentes derivados del uso o la imposibilidad de uso del servicio.
        </p>
        <p>
          La responsabilidad total de Landora frente al cliente por cualquier
          reclamación derivada de estos términos se limitará al importe
          efectivamente abonado por el cliente en los doce meses anteriores a
          la reclamación.
        </p>
        <p>
          Landora no se responsabiliza del contenido publicado por los clientes
          ni de los daños que dicho contenido pueda causar a terceros.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          10. Modificaciones
        </h2>
        <p>
          Landora podrá modificar estos Términos y Condiciones en cualquier
          momento. Los cambios se notificarán al cliente por correo electrónico
          con antelación razonable antes de su entrada en vigor.
        </p>
        <p>
          El uso continuado del servicio tras la notificación de cambios
          implicará la aceptación de los nuevos términos. La versión vigente
          estará siempre disponible en esta página.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-headline text-headline-sm font-medium text-on-surface">
          11. Legislación aplicable y jurisdicción
        </h2>
        <p>
          Estos Términos y Condiciones se regirán por la legislación española.
        </p>
        <p>
          Para la resolución de cualquier controversia derivada de la prestación
          del servicio, las partes se someten a los juzgados y tribunales del
          domicilio del titular, salvo que la normativa aplicable establezca
          otro fuero imperativo.
        </p>
      </section>

      <footer className="border-t border-outline-variant pt-6">
        <p className="text-body-sm text-on-surface-variant">
          Consulta también el{" "}
          <Link href="/legal" className="text-primary hover:underline">
            Aviso Legal
          </Link>{" "}
          y la{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Política de Privacidad
          </Link>
          .
        </p>
      </footer>
    </article>
  );
}
