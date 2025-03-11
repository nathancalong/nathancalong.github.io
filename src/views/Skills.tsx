import { Grid2 } from "@mui/material";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import DataObject from "@mui/icons-material/DataObject";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import { Section, SkillCard } from "../components";

export default function Skills() {
  return (
    <>
      <Section name="skills" displayText>
        <Grid2 container spacing={8} alignItems="stretch">
          <Grid2 size={{ md: 6 }}>
            <SkillCard
              Icon={CloudOutlinedIcon}
              title="Cloud Solutions"
              skills={[
                "Lambda",
                "EC2",
                "API Gateway",
                "DynamoDB",
                "VPC",
                "Route53",
                "Cloudwatch",
                "SNS",
                "SQS",
                "SES",
              ]}
            >
              As a certified AWS Cloud Practitioner, I specialize in leveraging
              AWS to build scalable, secure, and cost-effective cloud solutions.
              I have experience from inception to delivery, both architecting
              and deploying cloud infrastructure tailored project requirements.
              Whether its cloud native solution, migrations, or anything
              inbetween, I can deliver cheap and effective solutions.
            </SkillCard>
          </Grid2>

          <Grid2 size={{ md: 6 }}>
            <SkillCard
              Icon={TerminalOutlinedIcon}
              title="Backend Development"
              skills={[
                "C#",
                ".NET (Core & Framework)",
                "Python",
                "OAuth",
                "Microservices",
                "APIs",
                "Databases",
                "Authentication",
              ]}
            >
              Seasoned in backend development, specializing in building robust,
              scalable, and modern solutions. With expertise in designing and
              implementing complex systems, I focus on delivering
              high-performance backend architectures that meet both functional
              and non-functional requirements. Whether it's developing
              microservices, integrating APIs, or managing databases, I ensure
              seamless functionality and security across the board.
            </SkillCard>
          </Grid2>

          <Grid2 size={{ md: 6 }}>
            <SkillCard
              Icon={DataObject}
              title="Data Engineering"
              skills={[
                "ElasticSearch",
                "Logstash",
                "Kibana",
                "DataDog",
                "Snowflake",
                "Tableau",
                "SQL",
                "numpy & pandas",
              ]}
            >
              I have experience designing robust data pipelines that can
              process, store, and analyze large volumes of data in near
              real-time. From observability platforms, data warehousing
              technologies, as well as the backend ETL pipelines and data
              architectures, I ensure the integrity, availability, and
              accessibility of data across platforms and systems.
            </SkillCard>
          </Grid2>

          <Grid2 size={{ md: 6 }}>
            <SkillCard
              Icon={InsightsOutlinedIcon}
              title="DevOps & Automation"
              skills={[
                "Git",
                "Github Actions",
                "Docker",
                "Dev Containers",
                "Linux",
                "Proxmox",
                "Cucumber",
                "TDD",
                "BDD",
              ]}
            >
              All projects need good automated workflows, using Git and GitHub
              Actions for seamless CI/CD. With Docker, I containerize
              applications for consistent deployment across environments. I also
              integrate testing into the pipeline and use dev containers to
              create reproducible environments, minimizing issues and improving
              collaboration.
            </SkillCard>
          </Grid2>
        </Grid2>
      </Section>
    </>
  );
}
