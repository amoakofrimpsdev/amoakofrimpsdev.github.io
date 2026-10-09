import type { DemoKind } from "@/content/case-studies";
import AccSim from "./AccSim";
import CoursePilotFlow from "./CoursePilotFlow";
import JuteChart from "./JuteChart";
import MatchScore from "./MatchScore";
import PortalFlow from "./PortalFlow";
import PrimeDemo from "./PrimeDemo";

export default function Demo({ kind }: { kind: DemoKind }) {
  switch (kind) {
    case "jobhunt":
      return <MatchScore />;
    case "acc":
      return <AccSim />;
    case "jute":
      return <JuteChart />;
    case "prime":
      return <PrimeDemo />;
    case "portal":
      return <PortalFlow />;
    case "coursepilot":
      return <CoursePilotFlow />;
  }
}
