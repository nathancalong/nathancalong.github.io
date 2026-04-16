import { Cloud, Terminal, Braces, TrendingUp } from "lucide-react";
import { Section, SkillCard } from "@/components";
import styles from "./Skills.module.scss";

export default function Skills() {
  return (
    <Section name="skills" displayText>
      <div className={styles.bentoGrid}>
        <div className={styles.cardLarge}>
          <SkillCard
            icon={<Cloud size={28} />}
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
        </div>

        <div className={styles.cardSmall}>
          <SkillCard
            icon={<Terminal size={28} />}
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
        </div>

        <div className={styles.cardSmall}>
          <SkillCard
            icon={<Braces size={28} />}
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
        </div>

        <div className={styles.cardLarge}>
          <SkillCard
            icon={<TrendingUp size={28} />}
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
        </div>
      </div>
    </Section>
  );
}
