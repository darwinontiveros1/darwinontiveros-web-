import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data we collect from people who write to us or leave their details in our ads, where it lives, for how long, and how to ask us to delete it.",
  alternates: {
    canonical: "/en/privacy",
    languages: { "es-ES": "/privacidad", "en-US": "/en/privacy" },
  },
};

const UPDATED = "September 28, 2026";

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
    <SiteChrome locale="en">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Privacy Policy", path: "/en/privacy" },
          ]),
        ]}
      />
      <div className="container-page pt-32 pb-24">
        <Breadcrumbs
          items={[{ name: "Home", path: "/en" }, { name: "Privacy Policy", path: "/en/privacy" }]}
        />

        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Legal</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: {UPDATED}</p>
        </Reveal>

        <div className="mt-12 max-w-3xl">
          <Reveal>
            <div className="rounded-xl border-l-2 border-accent bg-white/[0.02] px-5 py-4">
              <p className="leading-relaxed">
                <span className="font-semibold">In one sentence:</span> we keep the details you
                give us so we can get back to you, we do not sell them to anyone, and you can
                ask us to delete them by writing to us.
              </p>
            </div>

            <P>
              We use our own sales management system, DAOS Portal, to serve the people who
              write to us or leave their details in our ads. This page explains what we
              collect, where it comes from, where it lives and how to ask us to delete it.
            </P>

            <H>Who is responsible for this data</H>
            <P>
              OG Business Group LLC.
              <br />
              Contact email:{" "}
              <a className="text-accent underline underline-offset-4" href={`mailto:${CONTACT.assistantEmail}`}>
                {CONTACT.assistantEmail}
              </a>
              <br />
              WhatsApp: {CONTACT.whatsappDisplay}
            </P>

            <H>What we collect and where it comes from</H>
            <Tabla
              cabeceras={["Where it comes from", "What we collect"]}
              filas={[
                [
                  "Facebook and Instagram lead forms",
                  "Your name, phone, email and whatever you answer in the form. Also the ad and campaign you came through.",
                ],
                [
                  "WhatsApp conversations started from an ad",
                  "Your number and what you write to us.",
                ],
                ["Forms on this site", "Whatever you fill in."],
                [
                  "Phone calls",
                  "Your number and the duration. If the call is recorded, you are told at the start.",
                ],
                [
                  "What you tell us afterwards",
                  "Our team notes about your case, quotes and the status of your request.",
                ],
              ]}
            />

            <H>What we use it for</H>
            <ul className="mt-3 space-y-2 text-muted">
              <li>· To reply to you and handle what you asked for.</li>
              <li>· To prepare quotes and follow up on them.</li>
              <li>
                · To know which ads work, by counting how many people came through each
                one. For this we use <span className="font-medium text-fg">aggregate numbers</span>,
                not your individual case.
              </li>
              <li>· To meet the legal and accounting obligations that apply to us.</li>
            </ul>
            <P>
              We do not sell your data. We do not pass it to other companies so they can
              sell you things.
            </P>

            <H>Where it lives and for how long</H>
            <ul className="mt-3 space-y-2 text-muted">
              <li>
                · In a database with access separated per company: staff at one agency
                cannot see another agency&apos;s data.
              </li>
              <li>
                · The notifications Meta sends when you fill in a form pass through a queue
                on Amazon Web Services that keeps them{" "}
                <span className="font-medium text-fg">for at most fourteen days</span> and then
                discards them.
              </li>
              <li>
                · Call recordings, where they exist, are deleted after{" "}
                <span className="font-medium text-fg">ninety days</span>.
              </li>
              <li>
                · The rest is kept while you are a client or there is an open matter with
                you, and afterwards for as long as the law requires.
              </li>
            </ul>

            <H>Who else sees it</H>
            <P>We only work with the providers we need in order to operate:</P>
            <Tabla
              cabeceras={["Provider", "What they see"]}
              filas={[
                [
                  "Meta",
                  "The data you yourself typed into their form or sent them on WhatsApp. They already had it: we receive it from them.",
                ],
                ["Amazon Web Services", "Hosts the queue that new form notifications pass through."],
                [
                  "Anthropic",
                  <>
                    <span className="font-medium text-fg">No data of yours.</span> We use their
                    model to review our own ad creatives: it is sent the ad image and its
                    text, nothing else. It receives no names, phones, emails or client
                    figures.
                  </>,
                ],
                ["Telnyx", "If you call us or we call you, the number and the call."],
              ]}
            />

            <H id="eliminar">Your rights, and how to ask us to delete your data</H>
            <P>
              You can ask us at any time to tell you what we hold about you, to correct it
              if it is wrong, or to delete it.
            </P>
            <P>
              <span className="font-medium text-fg">To request deletion</span>, write to{" "}
              <a className="text-accent underline underline-offset-4" href={`mailto:${CONTACT.assistantEmail}?subject=Delete%20my%20data`}>
                {CONTACT.assistantEmail}
              </a>{" "}
              with the subject <span className="font-mono text-sm">Delete my data</span> and
              include the phone or email you contacted us with and, if you remember, where you
              came from.
            </P>
            <P>
              We confirm within{" "}
              <span className="font-medium text-fg">fifteen business days</span> . If we
              cannot delete something because of a legal obligation, we tell you what it is
              and for how long we have to keep it. You do not need to explain why.
            </P>

            <H>Minors</H>
            <P>
              Our services are not aimed at minors and we do not knowingly collect their
              data. If you believe we hold a minor&apos;s data, write to us and we delete it.
            </P>

            <H>Changes to this page</H>
            <P>
              If we change something important, we update the date above. The version that
              counts is always the one published here.
            </P>
          </Reveal>
        </div>
      </div>
    </SiteChrome>
  );
}
