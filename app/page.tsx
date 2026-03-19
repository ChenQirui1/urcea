"use client";

import { useState, useEffect } from "react";
import { EducationalScenario } from "./types";
import ScenarioPanel from "./components/ScenarioPanel";
import MiroPanel from "./components/MiroPanel";
import ChatPanel from "./components/ChatPanel";
import ScenarioModal from "./components/ScenarioModal";

export default function Home() {
  const [scenario, setScenario] = useState<EducationalScenario | null>(null);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);

  useEffect(() => {
    const loadScenario = async () => {
      try {
        const response = await fetch("/educational.json");
        if (!response.ok) return;
        const data: EducationalScenario = await response.json();
        setScenario(data);
      } catch {
        // Keep the panel empty if static JSON cannot be loaded.
      }
    };

    loadScenario();
  }, []);

  return (
    <div className="p-2 box-border h-screen w-screen overflow-hidden bg-black text-white">
      <div className="grid grid-cols-4 gap-2 h-full w-full">
        <div className="col-span-3 flex flex-col gap-2 h-full">
          <ScenarioPanel
            scenario={scenario}
            onViewDetails={() => setIsScenarioModalOpen(true)}
          />
          <MiroPanel />
        </div>

        <ChatPanel />
      </div>

      {isScenarioModalOpen && (
        <ScenarioModal
          scenario={scenario}
          onClose={() => setIsScenarioModalOpen(false)}
        />
      )}
    </div>
  );
}
