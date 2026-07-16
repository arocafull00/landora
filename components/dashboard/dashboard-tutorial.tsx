"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { IconButton } from "@/components/ui/primitives";

function buildTutorial(
  markSeen: () => void,
  setActiveEditorTab: (tab: string) => void,
) {
  markSeen();
  const driverObj = driver({
      showProgress: true,
      nextBtnText: "Siguiente →",
      prevBtnText: "← Anterior",
      doneBtnText: "Listo",
      progressText: "{{current}} de {{total}}",
      steps: [
        {
          popover: {
            title: "Bienvenido al editor",
            description:
              "Este tutorial te muestra cómo editar y publicar tu página web en pocos pasos.",
          },
        },
        {
          element: "#tutorial-editor-form",
          popover: {
            title: "Panel de edición",
            description:
              "Aquí editas el contenido de tu página. Usa las pestañas de arriba para moverte entre secciones.",
            side: "right",
          },
        },
        {
          element: "#tutorial-hero-tab",
          onHighlightStarted: () => {
            setActiveEditorTab("Hero");
          },
          popover: {
            title: "Secciones del editor",
            description:
              "Cada pestaña corresponde a una sección de la página. Selecciona Hero para editar la portada.",
            side: "bottom",
          },
        },
        {
          element: "#tutorial-hero-title",
          popover: {
            title: "Editar el título",
            description:
              "Escribe aquí el título principal. Los cambios se reflejan al instante en la vista previa de la derecha.",
            side: "right",
          },
        },
        {
          element: "#tutorial-preview",
          popover: {
            title: "Vista previa en tiempo real",
            description:
              "Cada cambio que haces en el panel de edición se refleja aquí al instante, sin necesidad de guardar.",
            side: "left",
          },
        },
        {
          element: "#tutorial-save",
          popover: {
            title: "Guardar cambios",
            description:
              "Pulsa Guardar para conservar los cambios. Puedes guardar cuantas veces quieras antes de publicar.",
            side: "bottom",
          },
        },
        {
          element: "#tutorial-publish",
          popover: {
            title: "Publicar la página",
            description:
              "Cuando estés listo, pulsa Publicar para que tu página sea visible al público.",
            side: "bottom",
          },
        },
        {
          element: "#tutorial-copy-link",
          popover: {
            title: "Compartir la vista previa",
            description:
              "Copia el enlace de vista previa y compártelo para que otros puedan ver la página antes de que esté publicada.",
            side: "bottom",
          },
        },
      ],
    });

    driverObj.drive();
}

export function DashboardTutorialButton() {
  const tutorialSeen = useOnboardingStore((s) => s.tutorialSeen);
  const markTutorialSeen = useOnboardingStore((s) => s.markTutorialSeen);
  const setActiveEditorTab = useDashboardStore(
    (state) => state.setActiveEditorTab,
  );

  useEffect(() => {
    if (tutorialSeen) return;
    const timeout = setTimeout(
      () => buildTutorial(markTutorialSeen, setActiveEditorTab),
      800,
    );
    return () => clearTimeout(timeout);
  }, [tutorialSeen, markTutorialSeen, setActiveEditorTab]);

  return (
    <IconButton
      icon="tutorial"
      label="Tutorial"
      onClick={() => buildTutorial(markTutorialSeen, setActiveEditorTab)}
    />
  );
}
