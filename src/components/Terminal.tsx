import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import resumePdf from "@/assets/documents/resume.pdf";
import portrait from "@/assets/images/portrait.jpg";
import cn from "classnames";
import { useWindowContext } from "./WindowContext";
import WindowChrome from "./WindowChrome";
import styles from "./Terminal.module.scss";

// --- Types ---

interface TerminalLine {
  id: number;
  type: "command" | "output" | "blank";
  content: ReactNode;
}

type Phase = "ssh" | "connecting" | "auto" | "interactive";

interface AutoStep {
  command: string;
}

// --- Constants ---

const USER = "guest@nlong-portfolio";
const PROMPT = `${USER}:~$ `;
const SSH_PROMPT = "> ";
const SSH_COMMAND = `ssh ${USER}`;

const AUTO_SEQUENCE: AutoStep[] = [{ command: "whoami" }, { command: "help" }];

const TYPE_SPEED = 65;
const SSH_TYPE_SPEED = 45;
const PAUSE_AFTER_COMMAND = 300;
const PAUSE_AFTER_OUTPUT = 600;

// --- ASCII Art ---

const ASCII_BANNER = ` _  _ _____ ___ ___ __  __
| \\| |_   _| __| _ \\  \\/  |
| .\` | | | | _||   / |\\/| |
|_|\\_| |_| |___|_|_\\_|  |_|
`;

// --- Cookie helpers ---

const VISITED_COOKIE = "nterm_visited";

function hasVisitedCookie(): boolean {
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith(`${VISITED_COOKIE}=`));
}

function setVisitedCookie() {
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${VISITED_COOKIE}=1; expires=${expires}; path=/; SameSite=Lax`;
}

function clearVisitedCookie() {
  document.cookie = `${VISITED_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

// --- Component ---

let lineIdCounter = 0;
function nextId() {
  return lineIdCounter++;
}

function makeWelcomeLines(): TerminalLine[] {
  return [
    {
      id: nextId(),
      type: "output",
      content: <pre className={styles.asciiArt}>{ASCII_BANNER}</pre>,
    },
    {
      id: nextId(),
      type: "output",
      content: (
        <span className={styles.lineOutput}>
          Welcome to nterm. Type `help` for commands.
        </span>
      ),
    },
    { id: nextId(), type: "blank", content: "" },
  ];
}

export default function Terminal() {
  const navigate = useNavigate();
  const { closedCount, resetAll } = useWindowContext();
  const skipAnimation = hasVisitedCookie();

  const [phase, setPhase] = useState<Phase>(
    skipAnimation ? "interactive" : "ssh",
  );
  const [lines, setLines] = useState<TerminalLine[]>(
    skipAnimation ? makeWelcomeLines() : [],
  );
  const [currentInput, setCurrentInput] = useState("");
  const [autoTypingText, setAutoTypingText] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // SSH intro state
  const [sshText, setSshText] = useState("");
  const [showSshCursor, setShowSshCursor] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);
  const [windowState, setWindowState] = useState<
    "normal" | "minimized" | "maximized"
  >("normal");

  const handleMinimize = useCallback(
    () => setWindowState((s) => (s === "minimized" ? "normal" : "minimized")),
    [],
  );
  const handleMaximize = useCallback(
    () => setWindowState((s) => (s === "maximized" ? "normal" : "maximized")),
    [],
  );

  // Lock body scroll when maximized
  useEffect(() => {
    if (windowState === "maximized") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [windowState]);

  // Escape to exit maximized
  useEffect(() => {
    if (windowState !== "maximized") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWindowState("normal");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [windowState]);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const resumeLinkRef = useRef<HTMLAnchorElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // --- Measure nav height for vertical centering ---
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const nav = hero.previousElementSibling as HTMLElement | null;
    if (!nav) return;

    const update = () => {
      hero.style.setProperty("--nav-h", `${nav.offsetHeight}px`);
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  // --- Scroll to bottom ---
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, autoTypingText, scrollToBottom]);

  // --- Focus input on click ---
  const focusInput = useCallback(() => {
    if (phase === "interactive") {
      inputRef.current?.focus();
    }
  }, [phase]);

  // --- SSH intro sequence ---
  // Runs once on mount, drives through ssh → connecting → auto without re-triggering
  useEffect(() => {
    if (skipAnimation) return;

    let cancelled = false;

    async function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function runSshIntro() {
      // Blank screen with blinking cursor for 2 seconds
      await sleep(2000);
      if (cancelled) return;

      // Type out the SSH command
      for (let i = 0; i <= SSH_COMMAND.length; i++) {
        if (cancelled) return;
        setSshText(SSH_COMMAND.slice(0, i));
        await sleep(SSH_TYPE_SPEED);
      }

      await sleep(400);
      if (cancelled) return;

      // "Press enter" — hide cursor, show connecting text
      setShowSshCursor(false);
      setPhase("connecting");

      await sleep(1200);
      if (cancelled) return;

      // Transition to main terminal
      setPhase("auto");
    }

    runSshIntro();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Command outputs ---
  const getCommandOutput = useCallback(
    (cmd: string, args?: string): TerminalLine[] => {
      const trimmed = cmd.trim().toLowerCase();
      const parts = trimmed.split(/\s+/);
      const command = parts[0];
      const rest = args || parts.slice(1).join(" ");

      switch (command) {
        case "whoami":
          return [
            {
              id: nextId(),
              type: "output",
              content: (
                <div className={styles.whoami}>
                  <img
                    className={styles.whoamiPortrait}
                    src={portrait}
                    alt="Nathan Long"
                  />
                  <div className={styles.whoamiInfo}>
                    <span className={styles.lineBold}>Nathan Long</span>
                    {"\n"}
                    <span className={styles.lineItalic}>
                      Fullstack AI & Mechatronic Engineer
                    </span>
                    {"\n\n"}
                    <a
                      className={styles.lineLink}
                      href="https://www.linkedin.com/in/nathan-ca-long/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin
                    </a>
                    {"  "}
                    <a
                      className={styles.lineLink}
                      href="https://github.com/nathancalong/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github
                    </a>
                    {"  "}
                    <a
                      className={styles.lineLink}
                      href="mailto:nathancalong@gmail.com"
                    >
                      email
                    </a>
                  </div>
                </div>
              ),
            },
          ];

        case "help":
          return [
            {
              id: nextId(),
              type: "output",
              content: (
                <>
                  <span className={styles.lineAccent}>whoami</span>
                  {"           - displays info about me\n"}
                  <span className={styles.lineAccent}>history</span>
                  {"          - displays career summary\n"}
                  <span className={styles.lineAccent}>resume</span>
                  {"           - opens my resume\n"}
                  <span className={styles.lineAccent}>rm</span>
                  {"               - removes files and directories\n"}
                  <span className={styles.lineAccent}>clear</span>
                  {"            - clears the terminal\n"}
                  <span className={styles.lineAccent}>restore</span>
                  {"          - restore closed windows\n"}
                  <span className={styles.lineAccent}>animation</span>
                  {"        - replay the intro animation"}
                </>
              ),
            },
          ];

        case "history":
          return [
            {
              id: nextId(),
              type: "output",
              content: (
                <>
                  {"\n"}
                  <span className={styles.lineBold}>NinjaTech AI</span>
                  {"\n"}
                  <span className={styles.lineItalic}>
                    Senior Full Stack AI Engineer
                  </span>
                  {"\n"}
                  {"Feb 2026 - Present\n\n"}
                  {
                    "- Lead sandbox infrastructure SME and primary reviewer for core system changes\n"
                  }
                  {
                    "- Drive architectural decisions across engineering, science, and QA teams\n"
                  }
                  {"\n"}
                  <span className={styles.lineBold}>NinjaTech AI</span>
                  {"\n"}
                  <span className={styles.lineItalic}>
                    AI Software Engineer
                  </span>
                  {"\n"}
                  {"Mar 2025 - Feb 2026\n\n"}
                  {
                    "- Led 3-phase sandbox migration to in-house AWS VMs, cutting vendor costs by 90%\n"
                  }
                  {
                    "- Built S3 static hosting serving 200+ daily AI website deployments\n"
                  }
                  {
                    "- Redesigned agentic harness for multi-worker scalability with Redis streaming\n"
                  }
                  {
                    "- Built observability dashboards reducing incident investigation by 90%\n"
                  }
                  {"\n"}
                  <span className={styles.lineBold}>ResMed</span>
                  {"\n"}
                  <span className={styles.lineItalic}>
                    Software Data Engineer
                  </span>
                  {"\n"}
                  {"Oct 2022 - Feb 2025\n\n"}
                  {
                    "- Designed microservice architectures using AWS and Terraform for 10,000+ providers\n"
                  }
                  {
                    "- Engineered centralised ELK logging across 500+ machines in 3 global regions\n"
                  }
                  {
                    "- Consolidated 20+ distributed databases into Snowflake data mesh architecture\n"
                  }
                  {"- Secured cloud and on-prem APIs with OAuth 2.0 and OIDC\n"}
                  {"\n"}
                  <span className={styles.lineBold}>
                    National Measurement Institute
                  </span>
                  {"\n"}
                  <span className={styles.lineItalic}>
                    Calibration Engineer
                  </span>
                  {"\n"}
                  {"Mar 2021 - Sep 2022\n\n"}
                  {
                    "- Calibrated 30+ gas flow device types to ISO17025 using national standards\n"
                  }
                  {
                    "- Built automated tools improving reporting speed by ~40%\n"
                  }
                  {
                    "- Developed data acquisition tools interfacing with lab equipment"
                  }
                </>
              ),
            },
          ];

        case "resume":
          resumeLinkRef.current?.click();
          return [
            {
              id: nextId(),
              type: "output",
              content: "resume: Opened in a new tab.",
            },
          ];

        case "animation":
          clearVisitedCookie();
          setTimeout(() => window.location.reload(), 1500);
          return [
            {
              id: nextId(),
              type: "output",
              content: "Clearing session... reloading.",
            },
          ];

        case "restore":
          if (closedCount === 0) {
            return [
              {
                id: nextId(),
                type: "output",
                content: "restore: no closed windows to restore.",
              },
            ];
          }
          resetAll();
          return [
            {
              id: nextId(),
              type: "output",
              content: `restore: restored ${closedCount} closed window${closedCount > 1 ? "s" : ""}.`,
            },
          ];

        case "rm": {
          let recurse = false,
            force = false,
            root = false;
          for (const option of rest.split(" ")) {
            if (option === "-r") recurse = true;
            else if (option === "-f") force = true;
            else if (option === "-rf") {
              recurse = true;
              force = true;
            } else if (option === "/") root = true;
          }
          if (recurse && force && root) {
            setTimeout(() => navigate("/snap"), 200);
            return [
              {
                id: nextId(),
                type: "output",
                content: "rm: removing /...",
              },
            ];
          }
          if (recurse && force)
            return [
              {
                id: nextId(),
                type: "output",
                content: "file removed: please dont remove /",
              },
            ];
          return [
            {
              id: nextId(),
              type: "output",
              content: "permission denied: use -rf",
            },
          ];
        }

        case "cd":
          return [
            {
              id: nextId(),
              type: "output",
              content: `changed path to ${rest || "~"}`,
            },
          ];

        case "clear":
          return [];

        case "":
          return [];

        default:
          return [
            {
              id: nextId(),
              type: "output",
              content: `nterm: command not found: ${command}`,
            },
          ];
      }
    },
    [navigate, closedCount, resetAll],
  );

  // --- Execute command ---
  const executeCommand = useCallback(
    (cmd: string) => {
      const commandLine: TerminalLine = {
        id: nextId(),
        type: "command",
        content: (
          <>
            <span className={styles.prompt}>{PROMPT}</span>
            <span className={styles.lineCommand}>{cmd}</span>
          </>
        ),
      };

      if (cmd.trim().toLowerCase() === "clear") {
        setLines([]);
        return;
      }

      const output = getCommandOutput(cmd);
      setLines((prev) => [...prev, commandLine, ...output]);
    },
    [getCommandOutput],
  );

  // --- Auto-type sequence ---
  useEffect(() => {
    if (phase !== "auto") return;

    let cancelled = false;

    const bannerLine: TerminalLine = {
      id: nextId(),
      type: "output",
      content: <pre className={styles.asciiArt}>{ASCII_BANNER}</pre>,
    };
    const welcomeLine: TerminalLine = {
      id: nextId(),
      type: "output",
      content: (
        <span className={styles.lineOutput}>
          Welcome to nterm. Type `help` for commands.
        </span>
      ),
    };
    const blankLine: TerminalLine = {
      id: nextId(),
      type: "blank",
      content: "",
    };

    setLines([bannerLine, welcomeLine, blankLine]);

    async function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function typeSequence() {
      await sleep(800);

      for (const step of AUTO_SEQUENCE) {
        if (cancelled) return;

        for (let i = 0; i <= step.command.length; i++) {
          if (cancelled) return;
          setAutoTypingText(step.command.slice(0, i));
          await sleep(TYPE_SPEED);
        }

        await sleep(PAUSE_AFTER_COMMAND);
        if (cancelled) return;

        setAutoTypingText("");
        const commandLine: TerminalLine = {
          id: nextId(),
          type: "command",
          content: (
            <>
              <span className={styles.prompt}>{PROMPT}</span>
              <span className={styles.lineCommand}>{step.command}</span>
            </>
          ),
        };
        const output = getCommandOutput(step.command);
        setLines((prev) => [...prev, commandLine, ...output]);

        await sleep(PAUSE_AFTER_OUTPUT);
      }

      if (cancelled) return;

      setLines((prev) => [
        ...prev,
        { id: nextId(), type: "blank", content: "" },
      ]);
      setPhase("interactive");
      setVisitedCookie();
    }

    typeSequence();

    return () => {
      cancelled = true;
    };
  }, [phase, getCommandOutput]);

  // --- Focus input when interactive ---
  useEffect(() => {
    if (phase === "interactive") {
      inputRef.current?.focus();
    }
  }, [phase]);

  // --- Handle keydown ---
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = currentInput;
        if (cmd.trim()) {
          setCommandHistory((prev) => [...prev, cmd]);
        }
        setHistoryIndex(-1);
        executeCommand(cmd);
        setCurrentInput("");
        setCursorPos(0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex === -1
              ? commandHistory.length - 1
              : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
          setCursorPos(commandHistory[newIndex].length);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setCurrentInput("");
            setCursorPos(0);
          } else {
            setHistoryIndex(newIndex);
            setCurrentInput(commandHistory[newIndex]);
            setCursorPos(commandHistory[newIndex].length);
          }
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      }
    },
    [currentInput, executeCommand, commandHistory, historyIndex],
  );

  // --- SSH intro screen ---
  const isSshPhase = phase === "ssh" || phase === "connecting";

  return (
    <section id="home" ref={heroRef} className={cn(styles.terminalHero, windowState === "minimized" && styles.terminalHeroMinimized)}>
      {/* SSH intro overlay */}
      <div
        className={cn(
          styles.sshOverlay,
          !isSshPhase && styles.sshOverlayHidden,
        )}
      >
        <div className={styles.sshContent}>
          <span className={styles.sshPrompt}>{SSH_PROMPT}</span>
          <span className={styles.sshText}>{sshText}</span>
          {showSshCursor && <span className={styles.sshCursor}>_</span>}
          {phase === "connecting" && (
            <div className={styles.sshConnecting}>
              Connecting to {USER.split("@")[1]}...
            </div>
          )}
        </div>
      </div>

      {/* Main terminal */}
      {(() => {
        const terminalEl = (
          <div
            className={cn(
              styles.terminalWindow,
              isSshPhase && styles.terminalWindowHidden,
              windowState === "minimized" && styles.terminalMinimized,
              windowState === "maximized" && styles.terminalMaximized,
            )}
            onClick={focusInput}
          >
            <WindowChrome
              title="nterm"
              onMinimize={handleMinimize}
              onMaximize={handleMaximize}
            />

            <div className={styles.terminalBody}>
              <div ref={outputRef} className={styles.terminalOutput}>
                {lines.map((line) => (
                  <div key={line.id} className={styles.line}>
                    {line.content}
                  </div>
                ))}
              </div>

              {(phase === "auto" || phase === "interactive") && (
                <div className={styles.inputLine}>
                  <span className={styles.prompt}>{PROMPT}</span>
                  {phase === "auto" ? (
                    <>
                      <span className={styles.inputText}>{autoTypingText}</span>
                      <span className={styles.autoTypeCursor}>_</span>
                    </>
                  ) : (
                    <>
                      <span className={styles.inputText}>
                        {currentInput.slice(0, cursorPos)}
                      </span>
                      <span
                        className={cn(
                          styles.cursor,
                          !isFocused && styles.cursorBlurred,
                        )}
                      >
                        {currentInput[cursorPos] ?? " "}
                      </span>
                      <span className={styles.inputText}>
                        {currentInput.slice(cursorPos + 1)}
                      </span>
                    </>
                  )}
                </div>
              )}

              <input
                ref={inputRef}
                className={styles.hiddenInput}
                value={currentInput}
                onChange={(e) => {
                  setCurrentInput(e.target.value);
                  setCursorPos(
                    e.target.selectionStart ?? e.target.value.length,
                  );
                }}
                onSelect={(e) => {
                  const target = e.target as HTMLInputElement;
                  setCursorPos(target.selectionStart ?? target.value.length);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />

              <a
                ref={resumeLinkRef}
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "none" }}
              />
            </div>
          </div>
        );

        if (windowState === "maximized") {
          return createPortal(
            <>
              <div
                className={styles.terminalBackdrop}
                onClick={handleMaximize}
              />
              {terminalEl}
            </>,
            document.body,
          );
        }
        return terminalEl;
      })()}
    </section>
  );
}
