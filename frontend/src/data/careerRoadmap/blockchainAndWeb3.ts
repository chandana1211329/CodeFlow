import { CareerNode } from './types';

export const blockchainAndWeb3Data: CareerNode = {
  id: 'blockchain-and-web3',
  title: 'Blockchain & Web3',
  category: 'blockchain-and-web3',
  type: 'category',
  icon: 'Blocks',
  description: 'Decentralized ledger protocols, smart contract engineering, Ethereum, Solidity, and Web3 applications.',
  overview: 'Blockchain & Web3 developers build trustless, decentralized protocols, smart contracts, and cryptographic ledger applications.',
  children: [
    { id: 'blockchain-developer', title: 'Blockchain Developer', type: 'role', description: 'Developing decentralized applications and integrating cryptographic blockchain APIs.' },
    {
      id: 'smart-contract-developer',
      title: 'Smart Contract Developer',
      type: 'role',
      description: 'Writing secure, audited self-executing contracts deployed on EVM and Solana blockchains.',
      children: [
        { id: 'solidity', title: 'Solidity', type: 'stack', description: 'EVM smart contract programming language for Ethereum and Layer 2s.' },
        { id: 'ethereum', title: 'Ethereum', type: 'stack', description: 'Decentralized smart contract platform, Gas optimization, ERC-20, and ERC-721 standards.' }
      ]
    },
    { id: 'web3-developer', title: 'Web3 Developer', type: 'role', description: 'Frontend developers integrating ethers.js, viem, and wagmi for wallet connection and dApp UIs.' },
    { id: 'blockchain-engineer', title: 'Blockchain Engineer', type: 'role', description: 'Building consensus protocols (Proof of Stake), node clients, and L2 scaling solutions (Rollups).' },
    { id: 'blockchain-security', title: 'Blockchain Security', type: 'role', description: 'Auditing smart contracts for reentrancy bugs, integer overflows, and flash loan exploits.' },
    { id: 'decentralized-applications', title: 'Decentralized Applications (dApps)', type: 'role', description: 'End-to-end Web3 products in DeFi, NFT marketplaces, and decentralized governance.' }
  ]
};
