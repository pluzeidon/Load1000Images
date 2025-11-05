import React, { useEffect, useRef, useState, useCallback } from 'react';
import { checkImagesBatch } from '../../utils/imageChecker.js';
import { Cache } from '../../utils/cache.js';
import { logError } from '../../utils/errorLogger.js';

const PLACEHOLDER = '/placeholder.png';

export default function VirtualImageList({
  folder = '/imagesart1', filePrefix='1Thumbnail', start=1, end=1000,
  buffer=50, itemHeight=120, pageSize=50, onErrorLog=()=>{}
}){
  const containerRef = useRef();
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const totalItems = Math.max(0, end - start + 1);
  const totalHeight = totalItems * itemHeight;
  const visibleCount = Math.ceil(viewportHeight / itemHeight);
  const poolSize = Math.min(totalItems, visibleCount + buffer*2 + 10);
  const poolRef = useRef([]);
  const [renderTrigger, setRenderTrigger] = useState(0);
  const existenceCache = useRef(new Cache());

  const firstIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const lastIndex = Math.min(totalItems - 1, Math.floor((scrollTop + viewportHeight) / itemHeight) + buffer);

  useEffect(()=>{
    const el = containerRef.current;
    if(!el) return;
    const onResize = ()=> setViewportHeight(el.clientHeight);
    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    return ()=> ro.disconnect();
  },[]);

  useEffect(()=>{
    const el = containerRef.current;
    if(!el) return;
    const onScroll = ()=> setScrollTop(el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });
    return ()=> el.removeEventListener('scroll', onScroll);
  },[]);

  useEffect(()=>{
    if(poolRef.current.length === 0) {
      poolRef.current = new Array(poolSize).fill(null).map((_,i)=>({poolIndex:i}));
      setRenderTrigger(t=>t+1);
    } else if(poolRef.current.length !== poolSize) {
      poolRef.current.length = poolSize;
      setRenderTrigger(t=>t+1);
    }
  }, [poolSize]);

  useEffect(()=>{
    if(firstIndex > lastIndex) return;
    const indicesToCheck = [];
    for(let i=firstIndex;i<=lastIndex;i++){
      const idx = start + i;
      if(existenceCache.current.get(idx) === undefined) indicesToCheck.push(idx);
    }
    if(indicesToCheck.length===0) return;
    let i=0;
    const throttle = async ()=>{
      const batch = indicesToCheck.slice(i, i+pageSize);
      try {
        const results = await checkImagesBatch(folder, filePrefix, batch);
        results.forEach(r=> existenceCache.current.set(r.index, r.exists));
        setRenderTrigger(t=>t+1);
      } catch(err){
        console.error('Batch check failed', err);
      }
      i += pageSize;
      if(i < indicesToCheck.length) setTimeout(throttle, 50);
    };
    throttle();
  }, [firstIndex, lastIndex, folder, filePrefix, start, end, pageSize]);

  const urlFor = (index)=> `${folder}/${filePrefix}${index}.jpg`;
  const handleImageError = useCallback((index, e)=>{
    existenceCache.current.set(index, false);
    const info = { folder, filePrefix, index, message: e?.message || 'error loading image' };
    onErrorLog(info);
    logError(info);
    setRenderTrigger(t=>t+1);
  }, [folder, filePrefix, onErrorLog]);

  useEffect(()=>{
    window.scrollToIndex = (n) => {
      const idx = Math.max(0, Math.min(totalItems-1, n - start));
      if(containerRef.current) containerRef.current.scrollTop = idx * itemHeight;
    };
  }, [totalItems, itemHeight, start]);

  const renderItems = [];
  for(let i=firstIndex;i<=lastIndex;i++){
    const poolSlot = ((i - firstIndex) % poolSize + poolSize) % poolSize;
    const absoluteIndex = start + i;
    const exists = existenceCache.current.get(absoluteIndex);
    renderItems.push({ i, poolSlot, absoluteIndex, exists });
  }

  return (
    <div ref={containerRef} className="relative overflow-auto border rounded" style={{height:'100%'}}>
      <div style={{height: totalHeight + 'px', position:'relative'}}>
        {renderItems.map(({i, poolSlot, absoluteIndex, exists})=>{
          const top = i * itemHeight;
          const key = poolSlot;
          const src = exists === false ? PLACEHOLDER : urlFor(absoluteIndex);
          return (
            <div key={key} className="virtual-item absolute left-0 right-0 flex items-center gap-3 p-2" style={{top, height: itemHeight, boxSizing:'border-box'}} data-index={absoluteIndex}>
              <div style={{width:160, height: itemHeight - 16, flex:'0 0 160px'}}>
                <img src={src} alt={`Thumbnail ${absoluteIndex}`} loading="lazy" style={{width:'100%', height:'100%', objectFit:'cover'}} onError={(e)=>handleImageError(absoluteIndex, e)} />
              </div>
              <div>
                <div className="font-medium">Imagen {absoluteIndex}</div>
                <div className="text-sm text-gray-500">Carpeta: {folder}</div>
                <div className="text-xs text-gray-400">Estado: {exists === undefined ? 'verificando' : (exists ? 'ok' : 'missing')}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
