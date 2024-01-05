const globalData = {}

export function setStore(key: string, val: any) {
  globalData[key] = val
}

export function getStore(key: string) {
  return globalData[key]
}
