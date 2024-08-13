import './utils-test.mjs'// required to init gTest before and assert functions are called 
import { assertEquals } from './utils-test.mjs'

/**
 * @param {{}} o 
 * @returns 
 */
export function objectIsEmpty(o) {
  return 0 === Object.keys(o).length
}

/**
 * @param {any} o1 
 * @param {any} o2 
 * @param {Map<any,any>} seen 
 * @returns {boolean}
 */
export function objectDeepEqual(o1, o2, seen = new Map()) {
  if (o1 === o2) return true

  if (
    typeof o1 !== 'object' || o1 === null ||
    typeof o2 !== 'object' || o2 === null
  ) return false // Different types or one is null

  if (seen.has(o1) && seen.get(o1) === o2) return true

  seen.set(o1, o2)

  if (Array.isArray(o1) && Array.isArray(o2)) {
    if (o1.length !== o2.length) return false
    for (let i = 0; i < o1.length; i++) {
      if (!objectDeepEqual(o1[i], o2[i], seen)) return false
    }
    return true
  } else if (Array.isArray(o1) || Array.isArray(o2)) return false // One is an array, the other is not

  const keys1 = Object.keys(o1)
  const keys2 = new Set(Object.keys(o2))

  if (keys1.length !== keys2.size) return false // Different number of properties

  for (let key of keys1) {
    if (!keys2.has(key) || !objectDeepEqual(o1[key], o2[key], seen)) return false
  }

  return true
}
