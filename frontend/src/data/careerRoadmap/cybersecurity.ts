import { CareerNode } from './types';

export const cybersecurityData: CareerNode = {
  id: 'cybersecurity',
  title: 'Cybersecurity',
  category: 'cybersecurity',
  type: 'category',
  icon: 'Shield',
  description: 'Protecting networks, software systems, data, devices, and cloud environments from cyber threats and breaches.',
  overview: 'Cybersecurity professionals safeguard digital assets through security operations, ethical hacking, vulnerability assessments, and incident response.',
  skillsRequired: ['Network Protocols (TCP/IP)', 'Linux & Windows Internals', 'Ethical Hacking & Pen Testing', 'SIEM Tools', 'Cryptography', 'AppSec'],
  children: [
    { id: 'soc-analyst', title: 'SOC Analyst', type: 'role', description: 'Monitoring Security Operations Center alerts, analyzing suspicious events, and containing threats.' },
    { id: 'cybersecurity-analyst', title: 'Cybersecurity Analyst', type: 'role', description: 'Evaluating risk posture, assessing system vulnerabilities, and recommending security controls.' },
    { id: 'security-engineer', title: 'Security Engineer', type: 'role', description: 'Designing, deploying, and maintaining security tools, firewalls, and encryption standards.' },
    { id: 'application-security', title: 'Application Security (AppSec)', type: 'role', description: 'Auditing code for OWASP Top 10 vulnerabilities, static/dynamic analysis (SAST/DAST), and secure coding.' },
    { id: 'cloud-security-sec', title: 'Cloud Security', type: 'role', description: 'Securing AWS/Azure/GCP identity boundaries, storage buckets, and cloud workloads.' },
    { id: 'network-security-sec', title: 'Network Security', type: 'role', description: 'Managing firewalls, intrusion detection systems (IDS/IPS), VPNs, and network segmentation.' },
    { id: 'penetration-testing', title: 'Penetration Testing', type: 'role', description: 'Simulating cyber attacks against target applications and infrastructure to find security flaws.' },
    { id: 'ethical-hacking', title: 'Ethical Hacking', type: 'role', description: 'Authorized security auditing using exploit tools (Metasploit, Burp Suite, Nmap).' },
    { id: 'digital-forensics', title: 'Digital Forensics', type: 'role', description: 'Analyzing compromised hard drives, memory dumps, and network logs to investigate breaches.' },
    { id: 'incident-response', title: 'Incident Response', type: 'role', description: 'Managing immediate threat containment, malware analysis, and recovery after security incidents.' },
    { id: 'security-architecture', title: 'Security Architecture', type: 'role', description: 'Architecting zero-trust infrastructure, security policies, compliance standards, and PKI.' }
  ]
};
