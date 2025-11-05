export const errorLog = [];
export function logError(info){
  const entry = { ...info, ts: Date.now() };
  errorLog.push(entry);
  console.error('VirtualImageList error:', entry);
}
export function getErrors(){ return errorLog.slice(); }
