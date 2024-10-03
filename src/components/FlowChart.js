// src/components/FlowChart.js

import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import CustomNode from './CustomNode';

// Define custom node types
const nodeTypes = {
  customNode: CustomNode,
};

// Define the initial nodes with custom styles
const initialNodes = [
  // Phase 1: Starting and Initial Upgrades
  {
    id: '1',
    type: 'input',
    data: { label: 'Start Game' },
    position: { x: 300, y: 50 },
    style: { backgroundColor: '#34D399', color: '#fff' },
  },
  {
    id: '2',
    data: { label: 'Tap Mine Button' },
    position: { x: 300, y: 150 },
    style: { backgroundColor: '#3B82F6', color: '#fff' },
  },
  {
    id: '3',
    data: { label: 'Limited Energy Storage\n(Finite taps per day)' },
    position: { x: 100, y: 250 },
    style: { backgroundColor: '#FBBF24', color: '#fff' },
  },
  {
    id: '4',
    data: { label: 'Energy Storage &\nDrill Efficiency Upgrades Available' },
    position: { x: 500, y: 250 },
    style: { backgroundColor: '#FBBF24', color: '#fff' },
  },
  {
    id: '5',
    data: { label: 'Upgrade Energy Storage &\nDrill Efficiency' },
    position: { x: 300, y: 350 },
    style: { backgroundColor: '#F59E0B', color: '#fff' },
  },
  {
    id: '6',
    data: { label: 'Collect Enough Crystals to Unlock\nFirst Region (Ser\'Atrya)' },
    position: { x: 300, y: 450 },
    style: { backgroundColor: '#F59E0B', color: '#fff' },
  },
  // Phase 2: Unlocking Automation
  {
    id: '7',
    data: { label: 'Unlock Region 1 (Ser\'Atrya)\nAutomation Unlocked' },
    position: { x: 300, y: 550 },
    style: { backgroundColor: '#10B981', color: '#fff' },
  },
  {
    id: '8',
    data: { label: 'Automation & Scanner\nInitially Locked' },
    position: { x: 100, y: 650 },
    style: { backgroundColor: '#6EE7B7', color: '#000' },
  },
  {
    id: '9',
    data: { label: 'Tap More & Upgrade to Unlock\nAutomation & Scanner on Tool' },
    position: { x: 500, y: 650 },
    style: { backgroundColor: '#6EE7B7', color: '#000' },
  },
  {
    id: '10',
    data: { label: 'Automation Claims Limited\n(3 Times a Day)' },
    position: { x: 300, y: 750 },
    style: { backgroundColor: '#6EE7B7', color: '#000' },
  },
  {
    id: '11',
    data: { label: 'Automation Upgrades:\nCrystal Storage, Drill Efficiency, Scanner & Mining Speed' },
    position: { x: 300, y: 850 },
    style: { backgroundColor: '#6EE7B7', color: '#000' },
  },
  // Phase 3: Unlocking Second Set of Tools
  {
    id: '12',
    data: { label: 'Unlock Second Tool\n(Level High Enough)' },
    position: { x: 300, y: 950 },
    style: { backgroundColor: '#3B82F6', color: '#fff' },
  },
  {
    id: '13',
    data: { label: 'Upgrade Tools & Switch Between Them\n(Own Energy Levels & Upgrades)' },
    position: { x: 300, y: 1050 },
    style: { backgroundColor: '#3B82F6', color: '#fff' },
  },
  // Phase 4: Unlocking Spaceport
  {
    id: '14',
    data: { label: 'Need Next Region (Hal\'Toran)\nLevel & T1 Upgrades Required' },
    position: { x: 300, y: 1150 },
    style: { backgroundColor: '#FBBF24', color: '#fff' },
  },
  {
    id: '15',
    data: { label: 'Unlock Region 2 (Hal\'Toran)\nSpaceport Unlocked' },
    position: { x: 300, y: 1250 },
    style: { backgroundColor: '#10B981', color: '#fff' },
  },
  {
    id: '16',
    data: { label: 'Buy Spaceport Slots\n(Generate Leaderboard Points)' },
    position: { x: 100, y: 1350 },
    style: { backgroundColor: '#F59E0B', color: '#fff' },
  },
  {
    id: '17',
    data: { label: 'Spaceport Slots Cost Crystals\nThen Crystals & Marks to Upgrade' },
    position: { x: 500, y: 1350 },
    style: { backgroundColor: '#F59E0B', color: '#fff' },
  },
  // Phase 5: Unlocking Mithrag Marks Market
  {
    id: '18',
    data: { label: 'Upgrade & Use Tools 1-3\nUnlock Region 3 (Gar\'Kura)' },
    position: { x: 300, y: 1450 },
    style: { backgroundColor: '#3B82F6', color: '#fff' },
  },
  {
    id: '19',
    data: { label: 'Unlock Region 3 (Gar\'Kura)\nMithrag Marks Market Unlocked' },
    position: { x: 300, y: 1550 },
    style: { backgroundColor: '#10B981', color: '#fff' },
  },
  {
    id: '20',
    data: { label: 'Mithrag Marks Market:\nTrade Crystals & Marks' },
    position: { x: 300, y: 1650 },
    style: { backgroundColor: '#6EE7B7', color: '#000' },
  },
  {
    id: '21',
    data: { label: 'Future Upgrades Cost\nMix of Marks & Crystals' },
    position: { x: 300, y: 1750 },
    style: { backgroundColor: '#FBBF24', color: '#fff' },
  },
  // Loop for Tools & Automations 4-10
  {
    id: '22',
    data: { label: 'Loop: Unlock Tools & Automations 4-10\nOver Next Regions' },
    position: { x: 300, y: 1850 },
    style: { backgroundColor: '#3B82F6', color: '#fff' },
  },
  {
    id: '23',
    data: { label: 'Regions: Zan\'Karad, Eltra\'Vorn, Yul\'Harad' },
    position: { x: 300, y: 1950 },
    style: { backgroundColor: '#10B981', color: '#fff' },
  },
  {
    id: '24',
    type: 'output',
    data: { label: 'Endgame: Reach Tool Automation 10' },
    position: { x: 300, y: 2050 },
    style: { backgroundColor: '#EF4444', color: '#fff' },
  },
];

// Define the initial edges with custom styles
const initialEdges = [
  // Phase 1 Edges
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', animated: true },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', animated: true },
  { id: 'e3-5', source: '3', target: '5', type: 'smoothstep', animated: true },
  { id: 'e4-5', source: '4', target: '5', type: 'smoothstep', animated: true },
  { id: 'e5-6', source: '5', target: '6', type: 'smoothstep', animated: true },
  // Phase 2 Edges
  { id: 'e6-7', source: '6', target: '7', type: 'smoothstep', animated: true },
  { id: 'e7-8', source: '7', target: '8', type: 'smoothstep', animated: true },
  { id: 'e7-9', source: '7', target: '9', type: 'smoothstep', animated: true },
  { id: 'e8-10', source: '8', target: '10', type: 'smoothstep', animated: true },
  { id: 'e9-10', source: '9', target: '10', type: 'smoothstep', animated: true },
  { id: 'e10-11', source: '10', target: '11', type: 'smoothstep', animated: true },
  // Phase 3 Edges
  { id: 'e11-12', source: '11', target: '12', type: 'smoothstep', animated: true },
  { id: 'e12-13', source: '12', target: '13', type: 'smoothstep', animated: true },
  // Phase 4 Edges
  { id: 'e13-14', source: '13', target: '14', type: 'smoothstep', animated: true },
  { id: 'e14-15', source: '14', target: '15', type: 'smoothstep', animated: true },
  { id: 'e15-16', source: '15', target: '16', type: 'smoothstep', animated: true },
  { id: 'e15-17', source: '15', target: '17', type: 'smoothstep', animated: true },
  // Phase 5 Edges
  { id: 'e16-18', source: '16', target: '18', type: 'smoothstep', animated: true },
  { id: 'e17-18', source: '17', target: '18', type: 'smoothstep', animated: true },
  { id: 'e18-19', source: '18', target: '19', type: 'smoothstep', animated: true },
  { id: 'e19-20', source: '19', target: '20', type: 'smoothstep', animated: true },
  { id: 'e20-21', source: '20', target: '21', type: 'smoothstep', animated: true },
  // Loop Edges
  { id: 'e21-22', source: '21', target: '22', type: 'smoothstep', animated: true },
  { id: 'e22-23', source: '22', target: '23', type: 'smoothstep', animated: true },
  { id: 'e23-24', source: '23', target: '24', type: 'smoothstep', animated: true },
];

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Optional: Handle node clicks to show more information
  const onNodeClick = useCallback((event, node) => {
    alert(`You clicked on node: ${node.data.label}`);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen bg-gray-100"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.id) {
              case '1':
                return '#34D399'; // Start Node
              case '24':
                return '#EF4444'; // End Node
              default:
                return '#ccc';
            }
          }}
        />
      </ReactFlow>
    </motion.div>
  );
};

export default FlowChart;
