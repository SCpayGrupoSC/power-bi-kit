import { HomePanel } from "@/components/home-panel";
import { SiteChrome } from "@/components/site-chrome";

export default function Home() {
  return (
    <SiteChrome pathname="/">
      <HomePanel />
    </SiteChrome>
  );
}
