import { CompareView } from "@/components/compare-view";
import { SiteChrome } from "@/components/site-chrome";

export default function CompararPage() {
  return (
    <SiteChrome pathname="/comparar">
      <CompareView />
    </SiteChrome>
  );
}
