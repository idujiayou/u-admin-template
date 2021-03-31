//是否全连接
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}