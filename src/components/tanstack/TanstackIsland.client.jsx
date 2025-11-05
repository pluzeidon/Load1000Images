import React, { useState } from 'react';
import TanstackModal from './TanstackModal.react.jsx';

export default function TanstackIsland(){
  const [open, setOpen] = useState(false);
  const config = { folder: '/imagesart3', filePrefix: '1Thumbnail', start:1, end:2000 };
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-semibold mb-2">Art 3 (@tanstack/virtual)</h2>
      <button className="px-4 py-2 bg-violet-600 text-white rounded" onClick={()=>setOpen(true)}>Abrir Art 3</button>
      {open && (
        <TanstackModal title="Art 3" onClose={()=>setOpen(false)} config={config} />
      )}
    </div>
  );
}
