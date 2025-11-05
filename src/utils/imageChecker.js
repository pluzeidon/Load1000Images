export function checkImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;
    const timeout = setTimeout(()=> {
      if(settled) return;
      settled = true;
      resolve(false);
    }, 5000);
    img.onload = ()=> {
      if(settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve(true);
    };
    img.onerror = ()=> {
      if(settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve(false);
    };
    img.src = url;
  });
}

export async function checkImagesBatch(folder, filePrefix, indices) {
  const promises = indices.map(idx => {
    const url = `${folder}/${filePrefix}${idx}.jpg`;
    return checkImage(url).then(exists => ({ index: idx, exists }));
  });
  return Promise.all(promises);
}
