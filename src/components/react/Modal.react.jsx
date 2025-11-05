import React, { useEffect, useRef } from 'react';

export default function Modal({ title, children, onClose }){
  const ref = useRef();
  useEffect(()=>{
    const onKey = e => { if(e.key==='Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.activeElement;
    ref.current?.focus();
    return ()=> { document.removeEventListener('keydown', onKey); prev?.focus(); };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={title}>
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div tabIndex={-1} ref={ref} className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button aria-label="Cerrar" onClick={onClose} className="px-2 py-1">✕</button>
        </div>
        <div className="p-2 overflow-auto" style={{height:'calc(80vh - 56px)'}}>
          {children}
        </div>
      </div>
    </div>
  );
}
