import { Box, useTheme } from "@mui/material";
import { Section } from "../components";
import { ReactTerminal } from "react-terminal";
import { useNavigate } from "react-router-dom";
import resumePdf from "../assets/documents/resume.pdf";

export default function Terminal() {
  const theme = useTheme();
  const navigate = useNavigate();

  function whoami(): string {
    const adjectives = ["impressed", "amazed", "amused", "surprised"];
    const users = ["recruiter", "talent_seeker", "head_hunter", "hirer"];
    const randomAdj = adjectives[(Math.random() * adjectives.length) | 0];
    const randomUser = users[(Math.random() * users.length) | 0];
    return `${randomAdj}_${randomUser}`;
  }

  function rm(file: string) {
    let recurse = false,
      force = false,
      root = false;
    for (const option of file.split(" ")) {
      if (option === "-r") {
        recurse = true;
      } else if (option === "-f") {
        force = true;
      } else if (option === "-rf") {
        recurse = true;
        force = true;
      } else if (option == "/") {
        root = true;
      }
    }
    if (recurse && force && root) navigate("/snap");
    if (recurse && force) return "file removed: please dont remove /";
    return "permission denied: use -rf";
  }

  const resumeElement: string = "resumeLink";
  function resume() {
    document.getElementById(resumeElement)?.click();
    return "resume: Opened in a new tab.";
  }

  // prettier-ignore
  const historyMessage = (
    <span>
      <br />
      <span><b>ResMed</b></span><br />
      <span><i>Software Data Engineer</i></span><br />
      <span>Oct 2022 - Present</span><br />
      <br />
      <span>- Implemented various microservices using C# and Python</span><br />
      <span>- Deployed and secured cloud infrastructure with Terraform and OAuth</span><br />
      <span>- Created business driven analytics with ELK stack, Snowflake and Tableau</span><br />
      <br />
      <span><b>National Measurement Institute</b></span><br />
      <span><i>Calibration Engineer</i></span><br />
      <span>Mar 2021 - Sept 2022</span><br />
      <br />
      <span>- Calibrated gas flow devices under ISO17025 using Australia's national standards</span><br />
      <span>- Performed data analysis and generated measurement reports</span><br />
      <span>- Automated various manual tasks through software</span><br />
    </span>
  );

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
      <span>history - displays a brief career summary</span><br />
      <span>resume - displays a copy of the resume</span><br />
      <span>rm - removes files and directories</span><br />
      <span>clear - clears the display</span>
    </span>
  );
  const commands = {
    help: helpText,
    whoami: whoami(), // Call this to print the same user each time
    rm: (file: string) => rm(file),
    cd: (directory: string) => `changed path to ${directory}`,
    history: historyMessage,
    resume: resume,
  };

  return (
    <Section name="terminal" displayText>
      <Box height="800px">
        {/* Hide a link that is not visible to open the resume */}
        <a id={resumeElement} href={resumePdf} target="_blank" />
        <ReactTerminal
          welcomeMessage={welcomeMessage}
          commands={commands}
          errorMessage="nterm: command not found"
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
