import { CareerNode } from './types';

export const hardwareAndEmbeddedData: CareerNode = {
  id: 'hardware-and-embedded',
  title: 'Hardware & Embedded',
  category: 'hardware-and-embedded',
  type: 'category',
  icon: 'Cpu',
  description: 'Microcontrollers, firmware, IoT devices, robotics, FPGA logic design, and hardware-software interaction.',
  overview: 'Hardware & Embedded engineers write real-time code running directly on physical microchips, microcontrollers, and electronic hardware.',
  children: [
    { id: 'embedded-systems', title: 'Embedded Systems', type: 'role', description: 'Programming microcontrollers (ARM, AVR, ESP32) with C/C++ and FreeRTOS.' },
    { id: 'firmware-development', title: 'Firmware Development', type: 'role', description: 'Writing low-level bootloaders, driver code, and hardware initialization routines.' },
    { id: 'iot', title: 'IoT (Internet of Things)', type: 'role', description: 'Connecting smart sensors and edge devices via MQTT, HTTP, Zigbee, and Bluetooth.' },
    { id: 'robotics', title: 'Robotics', type: 'role', description: 'Robot operating system (ROS), kinematics, motor control, and sensor fusion.' },
    { id: 'fpga', title: 'FPGA', type: 'role', description: 'Field-Programmable Gate Array hardware design using Verilog or VHDL.' },
    { id: 'vlsi-digital-design', title: 'VLSI / Digital Design', type: 'role', description: 'Very Large Scale Integration circuit design, ASIC verification, and logic gates.' },
    { id: 'hardware-software-integration', title: 'Hardware-Software Integration', type: 'role', description: 'Oscilloscopes, logic analyzers, bus protocols (SPI, I2C, UART, CAN bus).' },
    { id: 'edge-computing-hw', title: 'Edge Computing', type: 'role', description: 'Running AI inference models on edge hardware (NVIDIA Jetson, Coral TPU).' }
  ]
};
