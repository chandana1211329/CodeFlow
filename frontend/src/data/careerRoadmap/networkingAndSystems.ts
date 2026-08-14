import { CareerNode } from './types';

export const networkingAndSystemsData: CareerNode = {
  id: 'networking-and-systems',
  title: 'Networking & Systems',
  category: 'networking-and-systems',
  type: 'category',
  icon: 'Network',
  description: 'Network engineering, enterprise system administration, Linux/Windows server management, and network security.',
  overview: 'Networking & Systems engineers manage physical and virtual network connectivity, server fleets, active directories, and infrastructure services.',
  children: [
    { id: 'network-engineer', title: 'Network Engineer', type: 'role', description: 'Designing, configuring, and maintaining routers, switches, BGP/OSPF protocols, and WAN/LAN.' },
    { id: 'network-administrator', title: 'Network Administrator', type: 'role', description: 'Monitoring network traffic, subnets, Wi-Fi infrastructure, and firewall rules.' },
    { id: 'systems-administrator', title: 'Systems Administrator (SysAdmin)', type: 'role', description: 'Managing server operating systems, storage, backups, user accounts, and system updates.' },
    { id: 'linux-administrator', title: 'Linux Administrator', type: 'role', description: 'Specialized Linux OS management (RHEL, Ubuntu Server), kernel tunings, and shell automation.' },
    { id: 'windows-administrator', title: 'Windows Administrator', type: 'role', description: 'Managing Windows Server, Active Directory, Group Policy Objects (GPO), and PowerShell.' },
    { id: 'infrastructure-administrator', title: 'Infrastructure Administrator', type: 'role', description: 'Overseeing data center hardware, SAN storage, and VMware/Hyper-V hypervisors.' },
    { id: 'network-security-engineer', title: 'Network Security Engineer', type: 'role', description: 'Deploying intrusion prevention systems (IPS), zero-trust networks, and VPN gateways.' }
  ]
};
