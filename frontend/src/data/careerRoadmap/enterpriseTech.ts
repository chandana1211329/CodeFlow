import { CareerNode } from './types';

export const enterpriseTechData: CareerNode = {
  id: 'enterprise-technology',
  title: 'Enterprise Technology',
  category: 'enterprise-technology',
  type: 'category',
  icon: 'Building',
  description: 'Enterprise resource planning, customer relationship management systems, SAP, Salesforce, and enterprise solutions.',
  overview: 'Enterprise Technology professionals customize, integrate, and maintain large-scale software platforms powering core global business operations.',
  children: [
    { id: 'sap', title: 'SAP', type: 'role', description: 'ABAP development, SAP S/4HANA implementation, and enterprise business process modules.' },
    { id: 'salesforce', title: 'Salesforce', type: 'role', description: 'Apex code, Lightning Web Components (LWC), Salesforce CRM workflows, and integrations.' },
    { id: 'servicenow', title: 'ServiceNow', type: 'role', description: 'IT Service Management (ITSM) workflows, automated ticketing, and enterprise integrations.' },
    { id: 'erp', title: 'ERP (Enterprise Resource Planning)', type: 'role', description: 'Managing integrated business operations across finance, supply chain, HR, and manufacturing.' },
    { id: 'crm', title: 'CRM (Customer Relationship Management)', type: 'role', description: 'Managing customer lifecycle data, sales pipelines, and support automation.' },
    { id: 'enterprise-applications', title: 'Enterprise Applications', type: 'role', description: 'Oracle, Workday, Microsoft Dynamics enterprise integration architectures.' },
    { id: 'application-support', title: 'Application Support', type: 'role', description: 'Production Tier 2/3 application troubleshooting and enterprise maintenance.' }
  ]
};
