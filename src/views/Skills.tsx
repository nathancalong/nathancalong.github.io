import { Cloud, Terminal, Braces, TrendingUp, Cpu, Layout } from "lucide-react";
import { Section, SkillCard } from "@/components";
import type { Skill } from "@/components/SkillCard";
import styles from "./Skills.module.scss";

// devicons-react — direct imports for tree-shaking
import CsharpOriginal from "devicons-react/lib/icons/CsharpOriginal";
import DotnetcoreOriginal from "devicons-react/lib/icons/DotnetcoreOriginal";
import PythonOriginal from "devicons-react/lib/icons/PythonOriginal";
import OauthOriginal from "devicons-react/lib/icons/OauthOriginal";
import ElasticsearchOriginal from "devicons-react/lib/icons/ElasticsearchOriginal";
import LogstashOriginal from "devicons-react/lib/icons/LogstashOriginal";
import KibanaOriginal from "devicons-react/lib/icons/KibanaOriginal";
import DatadogOriginal from "devicons-react/lib/icons/DatadogOriginal";
import AzuresqldatabasePlain from "devicons-react/lib/icons/AzuresqldatabasePlain";
import NumpyOriginal from "devicons-react/lib/icons/NumpyOriginal";
import PandasOriginal from "devicons-react/lib/icons/PandasOriginal";
import GitOriginal from "devicons-react/lib/icons/GitOriginal";
import GithubactionsOriginal from "devicons-react/lib/icons/GithubactionsOriginal";
import DockerOriginal from "devicons-react/lib/icons/DockerOriginal";
import LinuxOriginal from "devicons-react/lib/icons/LinuxOriginal";
import ProxmoxOriginalWordmark from "devicons-react/lib/icons/ProxmoxOriginalWordmark";
import ReactOriginal from "devicons-react/lib/icons/ReactOriginal";
import NextjsOriginal from "devicons-react/lib/icons/NextjsOriginal";
import TypescriptOriginal from "devicons-react/lib/icons/TypescriptOriginal";
import VitejsOriginal from "devicons-react/lib/icons/VitejsOriginal";
import SassOriginal from "devicons-react/lib/icons/SassOriginal";
import JupyterOriginal from "devicons-react/lib/icons/JupyterOriginal";
import FastapiOriginal from "devicons-react/lib/icons/FastapiOriginal";

// react-simple-icons — direct imports for tree-shaking
// @ts-expect-error - no types for direct icon imports
import SiOllama from "@icons-pack/react-simple-icons/icons/SiOllama.mjs";
// @ts-expect-error - no types for direct icon imports
import SiClaude from "@icons-pack/react-simple-icons/icons/SiClaude.mjs";

// Brand icons (not in any icon library)
import {
  SnowflakeIcon,
  TableauIcon,
  OpenAIIcon,
  AnthropicIcon,
} from "@/components/BrandIcons";

// AWS service icons (raw SVG imports via Vite)
import lambdaIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Compute/48/Arch_AWS-Lambda_48.svg";
import ec2Icon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Compute/48/Arch_Amazon-EC2_48.svg";
import apiGwIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_App-Integration/Arch_48/Arch_ Amazon-API-Gateway_48.svg";
import dynamoIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Database/48/Arch_Amazon-DynamoDB_48.svg";
import vpcIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Networking-Content-Delivery/48/Arch_Amazon-Virtual-Private-Cloud_48.svg";
import route53Icon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Networking-Content-Delivery/48/Arch_Amazon-Route-53_48.svg";
import cloudwatchIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Management-Governance/48/Arch_Amazon-CloudWatch_48.svg";
import snsIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_App-Integration/Arch_48/Arch_Amazon-Simple-Notification-Service_48.svg";
import sqsIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_App-Integration/Arch_48/Arch_Amazon-Simple-Queue-Service_48.svg";
import sesIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Business-Applications/48/Arch_Amazon-Simple-Email-Service_48.svg";
import ecsIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Containers/48/Arch_Amazon-Elastic-Container-Service_48.svg";
import cloudfrontIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Networking-Content-Delivery/48/Arch_Amazon-CloudFront_48.svg";
import cognitoIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Security-Identity-Compliance/48/Arch_Amazon-Cognito_48.svg";

function AwsImg({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} />;
}

const cloudSkills: Skill[] = [
  { label: "Lambda", icon: <AwsImg src={lambdaIcon} alt="Lambda" /> },
  { label: "EC2", icon: <AwsImg src={ec2Icon} alt="EC2" /> },
  { label: "ECS", icon: <AwsImg src={ecsIcon} alt="ECS" /> },
  { label: "API Gateway", icon: <AwsImg src={apiGwIcon} alt="API Gateway" /> },
  { label: "DynamoDB", icon: <AwsImg src={dynamoIcon} alt="DynamoDB" /> },
  { label: "VPC", icon: <AwsImg src={vpcIcon} alt="VPC" /> },
  { label: "Route53", icon: <AwsImg src={route53Icon} alt="Route53" /> },
  {
    label: "CloudFront",
    icon: <AwsImg src={cloudfrontIcon} alt="CloudFront" />,
  },
  {
    label: "CloudWatch",
    icon: <AwsImg src={cloudwatchIcon} alt="CloudWatch" />,
  },
  { label: "Cognito", icon: <AwsImg src={cognitoIcon} alt="Cognito" /> },
  { label: "SNS", icon: <AwsImg src={snsIcon} alt="SNS" /> },
  { label: "SQS", icon: <AwsImg src={sqsIcon} alt="SQS" /> },
  { label: "SES", icon: <AwsImg src={sesIcon} alt="SES" /> },
];

const backendSkills: Skill[] = [
  { label: "Python", icon: <PythonOriginal /> },
  { label: "FastAPI", icon: <FastapiOriginal /> },
  { label: "OAuth", icon: <OauthOriginal /> },
  { label: "Microservices" },
  { label: "C#", icon: <CsharpOriginal /> },
  { label: ".NET", icon: <DotnetcoreOriginal /> },
];

const frontendSkills: Skill[] = [
  { label: "React", icon: <ReactOriginal /> },
  { label: "Next.js", icon: <NextjsOriginal /> },
  { label: "TypeScript", icon: <TypescriptOriginal /> },
  { label: "Vite", icon: <VitejsOriginal /> },
  { label: "SCSS", icon: <SassOriginal /> },
  { label: "Responsive Design" },
];

const aiSkills: Skill[] = [
  { label: "Anthropic", icon: <AnthropicIcon /> },
  { label: "Claude", icon: <SiClaude /> },
  { label: "OpenAI", icon: <OpenAIIcon /> },
  { label: "Ollama", icon: <SiOllama /> },
  { label: "Jupyter", icon: <JupyterOriginal /> },
  { label: "Prompt Engineering" },
  { label: "Context Engineering" },
];

const dataSkills: Skill[] = [
  { label: "ElasticSearch", icon: <ElasticsearchOriginal /> },
  { label: "Logstash", icon: <LogstashOriginal /> },
  { label: "Kibana", icon: <KibanaOriginal /> },
  { label: "DataDog", icon: <DatadogOriginal /> },
  { label: "Snowflake", icon: <SnowflakeIcon /> },
  { label: "Tableau", icon: <TableauIcon /> },
  { label: "SQL", icon: <AzuresqldatabasePlain /> },
  { label: "numpy", icon: <NumpyOriginal /> },
  { label: "pandas", icon: <PandasOriginal /> },
];

const devopsSkills: Skill[] = [
  { label: "Git", icon: <GitOriginal /> },
  { label: "Github Actions", icon: <GithubactionsOriginal /> },
  { label: "Docker", icon: <DockerOriginal /> },
  { label: "Linux", icon: <LinuxOriginal /> },
  { label: "Proxmox", icon: <ProxmoxOriginalWordmark /> },
  { label: "Dev Containers" },
];

export default function Skills() {
  return (
    <Section name="skills" displayText>
      <div className={styles.bentoGrid}>
        <div className={styles.cardLarge}>
          <SkillCard
            icon={<Cpu size={28} />}
            title="AI Engineering"
            skills={aiSkills}
          >
            <li>
              AI-powered applications using LLMs from Anthropic and OpenAI
            </li>
            <li>
              Prompt and context engineering, tools for agents for working with
              browsers and images
            </li>
            <li>Development of custom agent harness in python</li>
          </SkillCard>
        </div>

        <div className={styles.cardSmall}>
          <SkillCard
            icon={<Terminal size={28} />}
            title="Backend Development"
            skills={backendSkills}
          >
            <li>Robust, scalable microservices and API integrations</li>
            <li>
              High-performance backend architectures in Python and C#/.NET
            </li>
            <li>Database design, management, and security best practices</li>
          </SkillCard>
        </div>

        <div className={styles.cardSmall}>
          <SkillCard
            icon={<Layout size={28} />}
            title="Frontend Development"
            skills={frontendSkills}
          >
            <li>Modern, responsive UIs with React, Next.js, and TypeScript</li>
            <li>Component architecture, state management, and build tooling</li>
            <li>
              Polished styling with SCSS and accessible, cross-device design
            </li>
          </SkillCard>
        </div>

        <div className={styles.cardLarge}>
          <SkillCard
            icon={<Cloud size={28} />}
            title="Cloud Solutions"
            skills={cloudSkills}
          >
            <li><a href="https://www.credly.com/badges/bc83b54a-c413-4457-9d40-74247e551386" target="_blank" rel="noopener noreferrer">Certified AWS Cloud Practitioner</a></li>
            <li>Scalable, secure, and cost-effective cloud architectures</li>
            <li>End-to-end delivery from inception to production deployment</li>
            <li>
              Cloud-native solutions, migrations, and hybrid infrastructure
            </li>
          </SkillCard>
        </div>

        <div className={styles.cardLarge}>
          <SkillCard
            icon={<Braces size={28} />}
            title="Data Engineering"
            skills={dataSkills}
          >
            <li>
              Robust data pipelines for near real-time processing and analysis
            </li>
            <li>Observability platforms with the ELK stack and Datadog</li>
            <li>
              Data warehousing, ETL pipelines, and cross-platform accessibility
            </li>
          </SkillCard>
        </div>

        <div className={styles.cardSmall}>
          <SkillCard
            icon={<TrendingUp size={28} />}
            title="DevOps & Automation"
            skills={devopsSkills}
          >
            <li>CI/CD workflows with Git and GitHub Actions</li>
            <li>Containerized deployments with Docker and dev containers</li>
            <li>Automated testing pipelines and reproducible environments</li>
          </SkillCard>
        </div>
      </div>
    </Section>
  );
}
