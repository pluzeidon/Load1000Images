import React, { useState, Suspense, lazy } from 'react';
import Modal from './Modal.react.jsx';
const VirtualImageList = lazy(()=>import('./VirtualImageList.react.jsx'));

export default function ReactIsland(){
  const [open, setOpen] = useState(false);
  const config = { folder: '/imagesart1', filePrefix: '1Thumbnail', start: 1, end: 1000 };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-semibold mb-2">Art 1 (React pool)</h2>
      <button className="px-4 py-2 bg-sky-600 text-white rounded" onClick={()=>setOpen(true)}>Abrir Art 1</button>
      {open && (
        <Modal title="Art 1" onClose={()=>setOpen(false)}>
          <div style={{height:'70vh'}}>
            <Suspense fallback={<div className="p-4">Cargando...</div>}>
              <VirtualImageList folder={config.folder} filePrefix={config.filePrefix} start={config.start} end={config.end} buffer={50} itemHeight={120} pageSize={50} />
            </Suspense>
          </div>
        </Modal>
      )}
    </div>
  );
}
