import { CareerNode } from './types';

export const cloudAndDevOpsData: CareerNode = {
  id: 'cloud-and-devops',
  title: 'Cloud & DevOps',
  category: 'cloud-and-devops',
  type: 'category',
  icon: 'Cloud',
  description: 'Cloud computing infrastructure, automated CI/CD deployment pipelines, site reliability engineering, and infrastructure-as-code.',
  overview: 'Cloud & DevOps professionals build reliable, elastic, and automated infrastructure that enables continuous deployment of software applications.',
  skillsRequired: ['Linux Administration', 'Docker Containerization', 'Kubernetes Orchestration', 'CI/CD Automation', 'Cloud Providers (AWS/Azure/GCP)', 'Infrastructure as Code (Terraform)'],
  children: [
    {
      id: 'cloud-engineer',
      title: 'Cloud Engineer',
      type: 'role',
      icon: 'Cloud',
      description: 'Architecting, provisioning, and maintaining virtualized cloud environments on cloud platforms.',
      children: [
        { id: 'aws', title: 'AWS (Amazon Web Services)', type: 'stack', description: 'EC2, S3, RDS, Lambda, IAM, VPC cloud infrastructure services.' },
        { id: 'azure', title: 'Microsoft Azure', type: 'stack', description: 'Azure VMs, App Services, Blob Storage, Azure DevOps, and Active Directory.' },
        { id: 'gcp', title: 'Google Cloud Platform', type: 'stack', description: 'Compute Engine, Cloud Run, GKE, BigQuery, and Cloud Storage.' }
      ]
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      type: 'role',
      icon: 'Repeat',
      description: 'Automating build pipelines, test suites, infrastructure provisioning, and application deployments.',
      children: [
        { id: 'linux', title: 'Linux', type: 'stack', description: 'Bash scripting, shell commands, process signals, and OS permissions.' },
        { id: 'git', title: 'Git', type: 'stack', description: 'Distributed version control, branching models, and pull request workflows.' },
        { id: 'docker', title: 'Docker', type: 'stack', description: 'Containerization, Dockerfiles, images, multi-stage builds, and volumes.' },
        { id: 'kubernetes', title: 'Kubernetes', type: 'stack', description: 'Container orchestration, pods, deployments, services, ingress, and Helm.' },
        { id: 'cicd', title: 'CI/CD', type: 'subject', description: 'Continuous Integration & Continuous Deployment automated pipeline design.' },
        { id: 'jenkins', title: 'Jenkins', type: 'stack', description: 'Open-source automation server for building and testing software pipelines.' },
        { id: 'github-actions', title: 'GitHub Actions', type: 'stack', description: 'Workflows executing automated builds and deployments on GitHub events.' },
        { id: 'terraform', title: 'Terraform', type: 'stack', description: 'Declarative Infrastructure as Code (IaC) provisioning cloud resources.' }
      ]
    },
    {
      id: 'site-reliability-engineer',
      title: 'Site Reliability Engineer (SRE)',
      type: 'role',
      icon: 'Activity',
      description: 'Applying software engineering principles to infrastructure, uptime, monitoring, and operational reliability.',
      children: [
        { id: 'reliability-engineering', title: 'Reliability Engineering', type: 'specialization', description: 'SLO/SLA targets, error budgets, and system capacity planning.' },
        { id: 'monitoring', title: 'Monitoring', type: 'specialization', description: 'Prometheus, Grafana metrics collection, alerts, and system telemetry.' },
        { id: 'observability', title: 'Observability', type: 'specialization', description: 'Distributed tracing (Jaeger/OpenTelemetry), centralized logs (ELK Stack), and metrics.' },
        { id: 'incident-management', title: 'Incident Management', type: 'specialization', description: 'On-call rotations, blameless post-mortems, and incident response playbooks.' },
        { id: 'distributed-systems-sre', title: 'Distributed Systems', type: 'specialization', description: 'Fault tolerance, load balancing, and high availability system design.' }
      ]
    },
    {
      id: 'platform-engineer',
      title: 'Platform Engineer',
      type: 'role',
      icon: 'Server',
      description: 'Building internal developer platforms (IDPs) that streamline software delivery for feature developers.',
      children: [
        { id: 'internal-dev-platforms', title: 'Internal Developer Platforms', type: 'specialization', description: 'Self-service infrastructure portals for engineering teams.' },
        { id: 'k8s-platform', title: 'Kubernetes', type: 'stack', description: 'Custom controllers, operators, and cluster management.' },
        { id: 'iac-platform', title: 'Infrastructure as Code', type: 'specialization', description: 'Reusable Terraform modules and CloudFormation templates.' },
        { id: 'developer-tooling', title: 'Developer Tooling', type: 'specialization', description: 'CLI utilities, local dev environments, and service templates.' }
      ]
    },
    {
      id: 'infrastructure-engineer',
      title: 'Infrastructure Engineer',
      type: 'role',
      icon: 'Cpu',
      description: 'Managing physical and virtual server infrastructure, network topology, and bare-metal environments.',
      children: [
        { id: 'servers', title: 'Servers', type: 'topic', description: 'Server hardware, rack configuration, and virtualization hypervisors.' },
        { id: 'infra-networking', title: 'Networking', type: 'topic', description: 'DNS, DHCP, VPNs, BGP routing, firewalls, and subnets.' },
        { id: 'linux-infra', title: 'Linux', type: 'topic', description: 'Enterprise Linux distributions (Red Hat, Ubuntu Server, Debian).' },
        { id: 'automation', title: 'Automation', type: 'topic', description: 'Ansible configuration management and automation scripts.' }
      ]
    },
    {
      id: 'cloud-architect',
      title: 'Cloud Architect',
      type: 'role',
      icon: 'Compass',
      description: 'Designing high-level multi-cloud enterprise architectures, security policies, and cost optimizations.',
      children: [
        { id: 'cloud-architecture', title: 'Cloud Architecture', type: 'specialization', description: 'Well-Architected Framework pillars across security, performance, and reliability.' },
        { id: 'cloud-security', title: 'Security', type: 'specialization', description: 'Identity and Access Management (IAM), zero-trust network boundaries, and encryption.' },
        { id: 'scalability-cloud', title: 'Scalability', type: 'specialization', description: 'Auto-scaling groups, global load balancers, and multi-region failover.' },
        { id: 'cost-optimization', title: 'Cost Optimization (FinOps)', type: 'specialization', description: 'Reserved instance planning, spot instances, and cloud cost governance.' }
      ]
    }
  ]
};
