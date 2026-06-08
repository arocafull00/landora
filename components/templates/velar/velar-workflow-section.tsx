"use client";

import { CalendarCheck, Tent, Sofa } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { VelarButton } from "@/components/templates/velar/velar-button";

const WORKFLOW_ICONS = [
  <CalendarCheck key="calendario" className="h-16 w-16" stroke="#e8e4df" />,
  <Tent key="escenario" className="h-16 w-16" stroke="#e8e4df" />,
  <Sofa key="tumbona" className="h-16 w-16" stroke="#e8e4df" />,
];

function getWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hola, me gustaría contactar para un evento.")}`;
}

export function VelarWorkflowSection({ content }: { content: LandingContent }) {
  if (!content.workflow || content.workflow.length === 0) return null;

  const whatsappLink = getWhatsAppLink(content.contact.phone);

  return (
    <section id="proceso" className="relative z-[25] bg-[#1a1a1a] px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16" data-aos="fade-up">
          <p
            className="mb-6 text-center text-xs uppercase tracking-widest text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            CÓMO TRABAJAMOS
          </p>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h2
                className="mb-6 font-extrabold leading-tight text-[#e8e4df]"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Nuestra forma de ayudarte a celebrar
              </h2>
            </div>
            <div className="text-center lg:text-left">
              <p
                className="mb-6 text-lg leading-relaxed text-[#e8e4df]/80"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Hacemos que la organización de tu evento sea sencilla y
                elegante.{" "}
                <strong className="font-semibold text-[#e8e4df]">
                  Nuestro equipo estará contigo en cada paso para asegurarse de
                  que todo salga perfecto.
                </strong>
              </p>
              <div className="flex justify-center lg:justify-start">
                <VelarButton
                  href={whatsappLink}
                  variant="secondary"
                  size="sm"
                  className="uppercase !border-[#e8e4df] !text-[#e8e4df] hover:!bg-[#e8e4df] hover:!text-[#1a1a1a]"
                >
                  CONTÁCTANOS
                </VelarButton>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {(content.workflow ?? []).map((step, index) => (
            <div
              key={step.id}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-6 flex justify-center">
                {WORKFLOW_ICONS[index % WORKFLOW_ICONS.length]}
              </div>
              <h3
                className="mb-3 text-xl font-bold text-[#e8e4df]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {step.title}
              </h3>
              <p
                className="leading-relaxed text-[#e8e4df]/70"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
