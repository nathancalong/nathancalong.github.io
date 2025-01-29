import { Box, Container, Typography, useTheme } from "@mui/material";
import { Section } from "../components";
import { ReactTerminal } from "react-terminal";

export default function Terminal() {
  const theme = useTheme();
  function whoami(): string {
    const adjectives = ["impressed", "amazed", "amused", "surprised"];
    const users = ["recruiter", "talent_seeker", "head_hunter", "hirer"];
    const randomAdj = adjectives[(Math.random() * adjectives.length) | 0];
    const randomUser = users[(Math.random() * users.length) | 0];
    return `${randomAdj}_${randomUser}`;
  }

  // prettier-ignore
  const welcomeMessage = (
    <span>
      <pre style={{color: theme.palette.primary.main}}>
        {" "}_  _ _____ ___ ___ __  __ <br/>
        | \| |_   _| __| _ \  \/  |<br/>
        | .` | | | | _||   / |\/| |<br/>
        |_|\_| |_| |___|_|_\_|  |_|<br/>
      </pre>
      <br/>
      Type in `help` for commands
      <br/>
    </span>
  );
  // prettier-ignore
  const helpText = (
    <span>
      <span>whoami - displays the current user</span><br />
      <span>clear - clears the display</span>
    </span>
  );
  const commands = {
    help: helpText,
    whoami: whoami(),
    cd: (directory: string) => `changed path to ${directory}`,
  };

  return (
    <Section name="terminal" displayText>
      <Box height="800px">
        <ReactTerminal
          welcomeMessage={welcomeMessage}
          commands={commands}
          errorMessage="command not found"
          showControlButtons={true}
          themes={{
            "custom-theme": {
              themeBGColor: theme.palette.background.default,
              themeToolbarColor: "#DBDBDB",
              themeColor: "#ffffff",
              themePromptColor: theme.palette.primary.main,
            },
          }}
          theme="custom-theme"
        />
      </Box>
    </Section>
  );
}
