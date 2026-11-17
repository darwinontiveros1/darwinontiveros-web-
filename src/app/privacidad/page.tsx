import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Qué datos recogemos de quienes nos escriben o dejan sus datos en nuestros anuncios, dónde viven, cuánto tiempo, y cómo pedir que los borremos.",
  alternates: {
    canonical: "/privacidad",
    languages: { "es-ES": "/privacidad", "en-US": "/en/privacy" },
  },
};

const ACTUALIZADA = "17 de noviembre de 2026";

function H({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mt-12 mb-3 text-xl font-bold tracking-tight scroll-mt-28">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 leading-relaxed text-muted">{children}</p>;
}

function Tabla({ cabeceras, filas }: { cabeceras: [string, string]; filas: [string, React.ReactNode][] }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-white/[0.02]">
            {cabeceras.map((c) => (
              <th key={c} className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-accent">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map(([a, b], i) => (
            <tr key={i} className="border-b border-border last:border-0 align-top">
              <td className="px-4 py-3 font-medium">{a}</td>
              <td className="px-4 py-3 text-muted">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <SiteChrome locale="es">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Política de privacidad", path: "/privacidad" },
          ]),
        ]}
      />
      <div className="container-page pt-32 pb-24">
        <Breadcrumbs
          items={[{ name: "Inicio", path: "/" }, { name: "Política de privacidad", path: "/privacidad" }]}
        />

        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Legal</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Política de privacidad
          </h1>
          <p className="mt-4 text-sm text-muted">Última actualización: {ACTUALIZADA}</p>
        </Reveal>

        <div className="mt-12 max-w-3xl">
          {/* Sin Reveal: en un teléfono este bloque mide más de cinco pantallas y la
              animación (pide ver el 20 % a la vez) nunca arrancaba; la página se
              quedaba en blanco. El texto legal se ve siempre. */}
          <div>
            <div className="rounded-xl border-l-2 border-accent bg-white/[0.02] px-5 py-4">
              <p className="leading-relaxed">
                <span className="font-semibold">En una frase:</span> guardamos los datos que
                nos das para poder responderte, no se los vendemos a nadie, y puedes pedir
                que los borremos escribiéndonos.
              </p>
            </div>

            <P>
              Usamos un sistema de gestión comercial propio, DAOS Portal, para atender a las
              personas que nos escriben o dejan sus datos en nuestros anuncios. Esta página
              explica qué recogemos, de dónde viene, dónde vive y cómo pedir que lo borremos.
            </P>

            <H>Quién responde por estos datos</H>
            <P>
              OG Business Group LLC.
              <br />
              Correo de contacto:{" "}
              <a className="text-accent underline underline-offset-4" href={`mailto:${CONTACT.assistantEmail}`}>
                {CONTACT.assistantEmail}
              </a>
              <br />
              WhatsApp: {CONTACT.whatsappDisplay}
            </P>

            <H>Qué recogemos y de dónde viene</H>
            <Tabla
              cabeceras={["De dónde viene", "Qué recogemos"]}
              filas={[
                [
                  "Formularios de anuncios de Facebook e Instagram",
                  "Tu nombre, teléfono, correo y lo que respondas en el formulario. También el anuncio y la campaña por los que llegaste.",
                ],
                [
                  "Conversaciones de WhatsApp desde un anuncio",
                  "Tu número y lo que nos escribes.",
                ],
                [
                  "Mensajes directos a @darwin_ontiveros en Instagram, también las respuestas a nuestras historias",
                  "Tu usuario, el nombre de tu perfil, si sigues la cuenta, el número con el que Instagram te identifica ante nosotros y lo que nos escribes. Si mandas una foto, un audio o un vídeo, guardamos el enlace que nos da Instagram, no el archivo.",
                ],
                [
                  "Comentarios en nuestras publicaciones de Instagram",
                  "Tu usuario, lo que escribiste, en qué publicación y cuándo.",
                ],
                ["Formularios de esta web", "Lo que rellenes en ellos."],
                [
                  "Llamadas",
                  "Tu número y la duración. Si la llamada se graba, se te dice al principio.",
                ],
                [
                  "Lo que nos cuentas después",
                  "Notas de nuestro equipo sobre tu caso, presupuestos y el estado de tu solicitud.",
                ],
              ]}
            />

            <H>Para qué lo usamos</H>
            <ul className="mt-3 space-y-2 text-muted">
              <li>· Responderte y atender lo que nos pediste.</li>
              <li>
                · Contestar tus mensajes y comentarios de Instagram. Si comentas o nos
                escribes la palabra que pedimos en una publicación (por ejemplo, CLASE), el
                sistema te manda automáticamente un mensaje privado con lo que pediste, y
                puede contestar a tu comentario en público.
              </li>
              <li>
                · Un <span className="font-medium text-fg">asistente virtual</span> puede
                contestarte por WhatsApp o Instagram. Siempre dice que es un asistente
                virtual. Si prefieres hablar con una persona, pídelo en el mismo chat y se lo
                pasamos a alguien del equipo.
              </li>
              <li>· Prepararte presupuestos y hacerles seguimiento.</li>
              <li>
                · Saber qué anuncios funcionan, contando cuántas personas llegaron por cada
                uno. Para esto usamos <span className="font-medium text-fg">números agregados</span>,
                no tu caso concreto.
              </li>
              <li>· Cumplir las obligaciones legales y contables que nos apliquen.</li>
            </ul>
            <P>
              No vendemos tus datos. No los cedemos a otras empresas para que te vendan sus
              cosas.
            </P>

            <H>Dónde viven y cuánto tiempo</H>
            <ul className="mt-3 space-y-2 text-muted">
              <li>
                · En servidores de Amazon Web Services en Estados Unidos, en una base de datos
                con acceso separado por empresa: el personal de una agencia no puede ver los
                datos de otra.
              </li>
              <li>
                · Los avisos que manda Meta cuando rellenas un formulario pasan por una cola
                en Amazon Web Services que los guarda{" "}
                <span className="font-medium text-fg">como máximo catorce días</span> y luego
                los descarta.
              </li>
              <li>
                · Las grabaciones de llamadas, si las hay, se borran a los{" "}
                <span className="font-medium text-fg">noventa días</span>.
              </li>
              <li>
                · El resto se conserva mientras seas cliente o haya una gestión abierta
                contigo, y después el tiempo que exija la ley.
              </li>
            </ul>

            <H>Quién más lo ve</H>
            <P>Solo trabajamos con los proveedores que necesitamos para funcionar:</P>
            <Tabla
              cabeceras={["Proveedor", "Qué ve"]}
              filas={[
                [
                  "Meta",
                  "Lo que tú mismo escribiste en su formulario o nos mandaste por WhatsApp o Instagram. Ya lo tenía: nosotros lo recibimos de Meta, y nuestras respuestas te llegan también a través de Meta.",
                ],
                [
                  "Amazon Web Services",
                  "Aloja DAOS Portal entero: los servidores, la base de datos y sus copias, la cola de avisos y el envío de correos. Todo en Estados Unidos.",
                ],
                [
                  "Anthropic",
                  <>
                    Su modelo de inteligencia artificial escribe las respuestas del asistente
                    virtual. Cuando el asistente te contesta por WhatsApp o Instagram, o te
                    llama, recibe <span className="font-medium text-fg">esa conversación y tu
                    nombre</span>, si lo sabemos. También lo usamos para revisar nuestras piezas
                    publicitarias y para redactar presupuestos a partir de lo que nos pediste.
                    Según sus condiciones para empresas, no usa estos datos para entrenar sus
                    modelos.
                  </>,
                ],
                ["Telnyx", "Si nos llamas o te llamamos, el número y la llamada."],
              ]}
            />

            <H id="eliminar">Tus derechos, y cómo pedir que borremos tus datos</H>
            <P>
              Puedes pedirnos en cualquier momento que te digamos qué tenemos sobre ti, que
              lo corrijamos si está mal, o que lo borremos.
            </P>
            <P>
              <span className="font-medium text-fg">Para pedir el borrado</span>, escribe a{" "}
              <a className="text-accent underline underline-offset-4" href={`mailto:${CONTACT.assistantEmail}?subject=Eliminar%20mis%20datos`}>
                {CONTACT.assistantEmail}
              </a>{" "}
              con el asunto <span className="font-mono text-sm">Eliminar mis datos</span> e
              incluye el teléfono, el correo o el usuario de Instagram con el que nos
              contactaste y, si lo recuerdas, por dónde llegaste.
            </P>
            <P>
              Te confirmamos dentro de los{" "}
              <span className="font-medium text-fg">quince días hábiles</span> siguientes. Si
              algo no podemos borrarlo por una obligación legal, te decimos qué es y durante
              cuánto tiempo tenemos que conservarlo. No hace falta que expliques por qué.
            </P>

            <H>Menores</H>
            <P>
              Nuestros servicios no van dirigidos a menores de edad y no recogemos sus datos
              a sabiendas. Si crees que tenemos datos de un menor, escríbenos y los borramos.
            </P>

            <H>Cambios en esta página</H>
            <P>
              Si cambiamos algo importante, actualizamos la fecha de arriba. La versión que
              vale es siempre la que está publicada aquí.
            </P>
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}
