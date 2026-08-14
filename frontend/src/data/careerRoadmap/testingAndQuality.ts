import { CareerNode } from './types';

export const testingAndQualityData: CareerNode = {
  id: 'testing-and-quality',
  title: 'Testing & Quality Engineering',
  category: 'testing-and-quality',
  type: 'category',
  icon: 'CheckCircle',
  description: 'Software quality assurance, test automation frameworks, performance benchmarking, and test architecture.',
  overview: 'Quality Engineers ensure software reliability, bug-free performance, security standards, and seamless user experiences.',
  children: [
    { id: 'qa-engineer', title: 'QA Engineer', type: 'role', description: 'Formulating test plans, test cases, issue tracking, and software validation.' },
    { id: 'manual-testing', title: 'Manual Testing', type: 'role', description: 'Exploratory testing, regression test suites, usability evaluation, and defect reporting.' },
    { id: 'automation-testing', title: 'Automation Testing', type: 'role', description: 'Building automated test suites with Selenium, Playwright, Cypress, and Appium.' },
    { id: 'sdet', title: 'SDET (Software Development Engineer in Test)', type: 'role', description: 'Engineers who write production-grade test tools, CI pipelines, and automation infrastructure.' },
    { id: 'api-testing', title: 'API Testing', type: 'role', description: 'Testing REST and gRPC endpoints with Postman, REST Assured, and k6.' },
    { id: 'performance-testing', title: 'Performance Testing', type: 'role', description: 'Load testing, stress testing, and concurrency metrics using JMeter and Locust.' },
    { id: 'security-testing', title: 'Security Testing', type: 'role', description: 'Automated vulnerability scanning and security compliance testing.' },
    { id: 'test-architecture', title: 'Test Architecture', type: 'role', description: 'Designing enterprise test automation strategy and test data management.' }
  ]
};
