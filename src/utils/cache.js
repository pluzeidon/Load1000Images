export class Cache {
  constructor(){ this.map = new Map(); }
  get(k){ return this.map.get(k); }
  set(k,v){ this.map.set(k,v); }
  has(k){ return this.map.has(k); }
  clear(){ this.map.clear(); }
}
