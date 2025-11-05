<script>
  import { onMount } from 'svelte';
  export let folder='/imagesart2', filePrefix='1Thumbnail', start=1, end=2000, buffer=50, itemHeight=120, pageSize=50;
  let container;
  let viewportHeight = 0;
  let scrollTop = 0;
  const totalItems = Math.max(0, end - start + 1);
  const totalHeight = totalItems * itemHeight;
  let existence = new Map();

  function urlFor(index){ return `${folder}/${filePrefix}${index}.jpg`; }

  onMount(()=>{
    const onResize = ()=> viewportHeight = container.clientHeight;
    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    const onScroll = ()=> scrollTop = container.scrollTop;
    container.addEventListener('scroll', onScroll, {passive:true});
    return ()=> { ro.disconnect(); container.removeEventListener('scroll', onScroll); };
  });

  $: visibleCount = Math.ceil(viewportHeight / itemHeight);
  $: firstIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  $: lastIndex = Math.min(totalItems - 1, Math.floor((scrollTop + viewportHeight) / itemHeight) + buffer);
  $: renderItems = [];
  for(let i=firstIndex;i<=lastIndex;i++){
    const absoluteIndex = start + i;
    renderItems.push({ i, absoluteIndex, exists: existence.get(absoluteIndex) });
    // lazy check existence
    if(!existence.has(absoluteIndex)){
      const img = new Image();
      img.onload = ()=> { existence.set(absoluteIndex, true); };
      img.onerror = ()=> { existence.set(absoluteIndex, false); };
      img.src = urlFor(absoluteIndex);
    }
  }
</script>

<div bind:this={container} class="relative overflow-auto border rounded" style="height:100%">
  <div style="height:{totalHeight}px; position:relative;">
    {#each renderItems as item (item.i)}
      <div class="virtual-item absolute left-0 right-0 flex items-center gap-3 p-2" style="top:{item.i * itemHeight}px; height:{itemHeight}px; box-sizing:border-box;">
        <div style="width:160px; height:{itemHeight - 16}px; flex:0 0 160px;">
          <img src={item.exists === false ? '/placeholder.png' : urlFor(item.absoluteIndex)} alt="Thumbnail" loading="lazy" style="width:100%;height:100%;object-fit:cover" on:error={(e)=>{ existence.set(item.absoluteIndex,false); }} />
        </div>
        <div>
          <div class="font-medium">Imagen {item.absoluteIndex}</div>
          <div class="text-sm text-gray-500">Carpeta: {folder}</div>
          <div class="text-xs text-gray-400">Estado: {item.exists === undefined ? 'verificando' : (item.exists ? 'ok' : 'missing')}</div>
        </div>
      </div>
    {/each}
  </div>
</div>
