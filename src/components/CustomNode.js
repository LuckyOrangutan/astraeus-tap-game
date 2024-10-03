// src/components/CustomNode.js

import React from 'react';
import { Handle } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: data.backgroundColor,
        color: data.color,
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #222138',
        textAlign: 'center',
        minWidth: '150px',
      }}
    >
      <strong>{data.label}</strong>
      {/* Top Handle for incoming connections */}
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
      />
      {/* Bottom Handle for outgoing connections */}
      <Handle
        type="source"
        position="bottom"
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default CustomNode;
