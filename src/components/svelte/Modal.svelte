<script>
  import { createEventDispatcher, onMount } from 'svelte';
  export let title = '';
  const dispatch = createEventDispatcher();
  function close(){ dispatch('close'); }
  onMount(()=>{ const onKey = e => { if(e.key === 'Escape') close(); }; window.addEventListener('keydown', onKey); return ()=> window.removeEventListener('keydown', onKey); });
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={title}>
  <div class="fixed inset-0 bg-black/40" on:click={close}></div>
  <div class="relative bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
    <div class="flex items-center justify-between p-4 border-b">
      <h3 class="text-lg font-semibold">{title}</h3>
      <button aria-label="Cerrar" on:click={close}>✕</button>
    </div>
    <div class="p-2 overflow-auto" style="height:calc(80vh - 56px)">
      <slot />
    </div>
  </div>
</div>
