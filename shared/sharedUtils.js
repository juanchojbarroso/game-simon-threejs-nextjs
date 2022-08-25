
  export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  export function getIdFromKey(key) {
    return key.split("_").pop();
  }