/*
 * @Author: saber2pr
 * @Date: 2019-04-27 23:30:07
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-27 23:48:57
 */
export function frame(callback: Function) {
  callback()
  return requestAnimationFrame(() => frame(callback))
}

export function interval(
  callback: Function,
  delta: number,
  metaKey: symbol | string | number = Symbol()
) {
  const clear = throttle(callback, delta, metaKey)
  const handle = frame(() => throttle(callback, delta, metaKey))
  return () => clear() && cancelAnimationFrame(handle)
}

export const throttle = (
  callback: Function,
  delta = 500,
  metaKey: symbol | string | number = Symbol()
) => {
  const next = () => Reflect.set(throttle, metaKey, Date.now() + delta)
  Reflect.has(throttle, metaKey) || next()
  if (Date.now() > Reflect.get(throttle, metaKey)) {
    next()
    callback()
  }
  return () => Reflect.deleteProperty(throttle, metaKey)
}
