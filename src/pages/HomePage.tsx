import { Footer, Navigation, Projects, Skills } from "@/views";
import { Terminal } from "@/components";
import { WindowProvider } from "@/components/WindowContext";

export default function HomePage() {
  return (
    <WindowProvider>
      <div className="grid-background">
        <Navigation />
        <Terminal />
        <Skills />
        <Projects />
        <Footer />
      </div>
    </WindowProvider>
  );
}
