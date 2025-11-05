import React from 'react';
import Modal from '../react/Modal.react.jsx';
import VirtualTan from './VirtualTan.react.jsx';

export default function TanstackModal({ title, onClose, config }){
  return (
    <Modal title={title} onClose={onClose}>
      <div style={{height:'70vh'}}>
        <VirtualTan folder={config.folder} filePrefix={config.filePrefix} start={config.start} end={config.end} />
      </div>
    </Modal>
  );
}
