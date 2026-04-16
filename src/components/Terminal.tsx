import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import resumePdf from "@/assets/documents/resume.pdf";
import { cn } from "@/lib/utils";
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

const USER = "visitor@nathancalong-portfolio";
const PROMPT = `${USER}:~$ `;
const SSH_PROMPT = "> ";
const SSH_COMMAND = `ssh ${USER}`;

const AUTO_SEQUENCE: AutoStep[] = [{ command: "whoami" }, { command: "help" }];

const TYPE_SPEED = 55;
const SSH_TYPE_SPEED = 45;
const PAUSE_AFTER_COMMAND = 300;
const PAUSE_AFTER_OUTPUT = 600;

// --- ASCII Art ---

const ASCII_BANNER = `
 _  _ _____ ___ ___ __  __
| \\| |_   _| __| _ \\  \\/  |
| .\` | | | | _||   / |\\/| |
|_|\\_| |_| |___|_|_\\_|  |_|
`.trimStart();

// --- Component ---

let lineIdCounter = 0;
function nextId() {
  return lineIdCounter++;
}

export default function Terminal() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("ssh");
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [autoTypingText, setAutoTypingText] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // SSH intro state
  const [sshText, setSshText] = useState("");
  const [showSshCursor, setShowSshCursor] = useState(true);

  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const resumeLinkRef = useRef<HTMLAnchorElement>(null);

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
                <>
                  <span className={styles.lineBold}>Nathan Long</span>
                  {"\n"}
                  <span className={styles.lineItalic}>
                    Mechatronic Software Engineer
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
                </>
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
                  {"    - displays info about me\n"}
                  <span className={styles.lineAccent}>history</span>
                  {"   - displays career summary\n"}
                  <span className={styles.lineAccent}>resume</span>
                  {"    - opens my resume\n"}
                  <span className={styles.lineAccent}>skills</span>
                  {"    - jump to skills section\n"}
                  <span className={styles.lineAccent}>projects</span>
                  {"  - jump to projects section\n"}
                  <span className={styles.lineAccent}>rm</span>
                  {"        - removes files and directories\n"}
                  <span className={styles.lineAccent}>clear</span>
                  {"     - clears the terminal"}
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
                  <span className={styles.lineBold}>ResMed</span>
                  {"\n"}
                  <span className={styles.lineItalic}>
                    Software Data Engineer
                  </span>
                  {"\n"}
                  {"Oct 2022 - Present\n\n"}
                  {"- Implemented various microservices using C# and Python\n"}
                  {
                    "- Deployed and secured cloud infrastructure with Terraform and OAuth\n"
                  }
                  {
                    "- Created business driven analytics with ELK stack, Snowflake and Tableau\n"
                  }
                  {"\n"}
                  <span className={styles.lineBold}>
                    National Measurement Institute
                  </span>
                  {"\n"}
                  <span className={styles.lineItalic}>
                    Calibration Engineer
                  </span>
                  {"\n"}
                  {"Mar 2021 - Sept 2022\n\n"}
                  {
                    "- Calibrated gas flow devices under ISO17025 using Australia's national standards\n"
                  }
                  {
                    "- Performed data analysis and generated measurement reports\n"
                  }
                  {"- Automated various manual tasks through software"}
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

        case "skills":
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          return [
            {
              id: nextId(),
              type: "output",
              content: "Scrolling to skills...",
            },
          ];

        case "projects":
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          return [
            {
              id: nextId(),
              type: "output",
              content: "Scrolling to projects...",
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
    [navigate],
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
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex === -1
              ? commandHistory.length - 1
              : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setCurrentInput("");
          } else {
            setHistoryIndex(newIndex);
            setCurrentInput(commandHistory[newIndex]);
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
    <section id="home" className={styles.terminalHero}>
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
              Connecting to nathancalong-portfolio...
            </div>
          )}
        </div>
      </div>

      {/* Main terminal */}
      <div
        className={cn(
          styles.terminalWindow,
          isSshPhase && styles.terminalWindowHidden,
        )}
        onClick={focusInput}
      >
        <div className={styles.terminalChrome}>
          <div className={styles.trafficLights}>
            <span
              className={styles.trafficDot}
              style={{ background: "#ff5f57" }}
            />
            <span
              className={styles.trafficDot}
              style={{ background: "#febc2e" }}
            />
            <span
              className={styles.trafficDot}
              style={{ background: "#28c840" }}
            />
          </div>
          <span className={styles.terminalTitle}>
            nterm — nathan@portfolio:~
          </span>
        </div>

        <div className={styles.terminalBody}>
          <div ref={outputRef} className={styles.terminalOutput}>
            {lines.map((line) => (
              <div key={line.id} className={styles.line}>
                {line.content}
              </div>
            ))}

            {phase === "auto" && autoTypingText !== "" && (
              <div className={styles.line}>
                <span className={styles.prompt}>{PROMPT}</span>
                <span className={styles.lineCommand}>{autoTypingText}</span>
                <span className={styles.autoTypeCursor}>_</span>
              </div>
            )}

            {phase === "auto" && autoTypingText === "" && (
              <div className={styles.line}>
                <span className={styles.prompt}>{PROMPT}</span>
                <span className={styles.autoTypeCursor}>_</span>
              </div>
            )}
          </div>

          {phase === "interactive" && (
            <div className={styles.inputLine}>
              <span className={styles.prompt}>{PROMPT}</span>
              <span className={styles.inputText}>{currentInput}</span>
              <span
                className={styles.cursor}
                style={
                  isFocused ? undefined : { animation: "none", opacity: 0.4 }
                }
              >
                _
              </span>
            </div>
          )}

          <input
            ref={inputRef}
            className={styles.hiddenInput}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
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
    </section>
  );
}
