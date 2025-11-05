import React, { useRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

const PLACEHOLDER = '/placeholder.png';

export default function VirtualTan({ folder='/imagesart3', filePrefix='1Thumbnail', start=1, end=2000 }){
  const total = Math.max(0, end - start + 1);
  const parentRef = useRef();
  const rowVirtualizer = useVirtualizer({
    count: total,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 50,
  });

  const items = useMemo(()=> new Array(total).fill(null).map((_,i)=> start + i), [total, start]);

  return (
    <div ref={parentRef} className="overflow-auto h-full border rounded">
      <div style={{height: rowVirtualizer.getTotalSize(), width: '100%', position: 'relative'}}>
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const index = virtualRow.index;
          const absolute = items[index];
          const top = virtualRow.start;
          const src = `${folder}/${filePrefix}${absolute}.jpg`;
          return (
            <div key={virtualRow.key} className="absolute left-0 right-0 flex items-center gap-3 p-2" style={{top, height: virtualRow.size}}>
              <div style={{width:160, height: virtualRow.size - 16, flex:'0 0 160px'}}>
                <img src={src} alt={`Thumb ${absolute}`} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={(e)=>{ e.currentTarget.src = PLACEHOLDER; }} />
              </div>
              <div>
                <div className="font-medium">Imagen {absolute}</div>
                <div className="text-sm text-gray-500">Carpeta: {folder}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
