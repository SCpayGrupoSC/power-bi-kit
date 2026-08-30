import { EstadoPanel } from "@/components/estado-panel";
import { SiteChrome } from "@/components/site-chrome";

export default function EstadoPage() {
  return (
    <SiteChrome pathname="/estado">
      <EstadoPanel />
    </SiteChrome>
  );
}
