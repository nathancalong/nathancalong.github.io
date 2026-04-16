import { Footer, Navigation, Projects, Skills } from "@/views";
import { Terminal } from "@/components";

export default function HomePage() {
  return (
    <div className="grid-background">
      <Navigation />
      <Terminal />
      <Skills />
      <Projects />
      <Footer />
    </div>
  );
}
