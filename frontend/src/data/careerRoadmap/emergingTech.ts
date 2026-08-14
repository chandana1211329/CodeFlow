import { CareerNode } from './types';

export const emergingTechData: CareerNode = {
  id: 'emerging-technologies',
  title: 'Emerging Technologies',
  category: 'emerging-technologies',
  type: 'category',
  icon: 'Sparkles',
  description: 'Quantum computing, autonomous systems, edge computing, digital twins, distributed ledger, and next-gen tech paradigms.',
  overview: 'Emerging Tech explores pioneer technology domains that are defining the next era of computer science and industry automation.',
  children: [
    { id: 'quantum-computing', title: 'Quantum Computing', type: 'role', description: 'Qubits, quantum logic gates, Qiskit, Cirq, and quantum algorithms (Shor, Grover).' },
    { id: 'autonomous-systems', title: 'Autonomous Systems', type: 'role', description: 'Self-driving vehicles, autonomous drones, motion planning, and obstacle avoidance.' },
    { id: 'edge-computing-et', title: 'Edge Computing', type: 'role', description: 'Low-latency data processing decentralized closer to end-user sensors and cellular towers.' },
    { id: 'iot-emerging', title: 'Internet of Things', type: 'role', description: 'Smart cities, industrial IoT (IIoT), and mesh network device communication.' },
    { id: 'digital-twins', title: 'Digital Twins', type: 'role', description: 'Virtual real-time simulation models replicating physical industrial hardware and factories.' },
    { id: 'distributed-computing-et', title: 'Distributed Computing', type: 'role', description: 'Grid computing, volunteer computing networks, and serverless edge functions.' },
    { id: 'hci', title: 'Human-Computer Interaction (HCI)', type: 'role', description: 'Brain-computer interfaces, haptic feedback, eye tracking, and novel input paradigms.' }
  ]
};
