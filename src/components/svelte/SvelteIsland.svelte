<script>
  import { onMount } from 'svelte';
  import Modal from './Modal.svelte';
  import VirtualImageList from './VirtualImageList.svelte';
  let open = false;
  const config = { folder: '/imagesart2', filePrefix: '1Thumbnail', start:1, end:2000 };
</script>

<style>
  .card { padding: 1rem; background: white; border-radius: .5rem; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
</style>

<div class="card">
  <h2 class="font-semibold mb-2">Art 2 (Svelte)</h2>
  <button class="px-4 py-2 bg-emerald-600 text-white rounded" on:click={()=>open=true}>Abrir Art 2</button>

  {#if open}
    <Modal title="Art 2" on:close={() => open = false}>
      <div style="height:70vh">
        <VirtualImageList folder={config.folder} filePrefix={config.filePrefix} start={config.start} end={config.end} buffer={50} itemHeight={120} pageSize={50} />
      </div>
    </Modal>
  {/if}
</div>
