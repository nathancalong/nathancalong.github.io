import { Footer, Home, Navigation, Projects, Skills, Terminal } from "../views";

// tsParticles imports
import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { TerminalContextProvider } from "react-terminal";
import { useTheme } from "@mui/material";

export default function HomePage() {
  // Initialize tsparticles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const theme = useTheme();
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      background: {
        color: {
          value: theme.palette.background.default,
        },
      },
      fpsLimit: 120,
      particles: {
        color: {
          value: theme.palette.secondary.main,
        },
        links: {
          color: theme.palette.secondary.main,
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
    }),
    [theme.palette.background.default, theme.palette.secondary.main]
  );

  return (
    <>
      <Particles id="tsparticles" options={options} />
      <Navigation />
      <Home />
      <Skills />
      <Projects />
      <TerminalContextProvider>
        <Terminal />
      </TerminalContextProvider>
      <Footer />
    </>
  );
}
