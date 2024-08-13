export const L=console.log

/**
 * 
 * @param {Array<T> | undefined} a1 
 * @param {Array<Y> | undefined} a2 
 * @returns {Array<T|Y> | undefined}
 * @template T, Y
 */
export function arraysMerge(a1,a2) {
  if ((undefined===a1 || null===a1) && (undefined===a2 || null===a2)) {
    return undefined
  } else if (undefined===a1 || null===a1) {
    return a2
  } else if (undefined===a2 || null==a2) {
    return a1
  }
  // let a3 = []
  // a3 = a3.concat(a1)
  // a3 = a3.concat(a2)
  return [...a1,...a2]
}

/**
 * Remove duplicate elements from an array
 * 
 * @param {Array<T> | undefined} a 
 * @returns {Array<T>}
 * @template T
 */
export function arrayDeDup(a) {
  if (undefined === a) return []

  return [...new Set(a)]
}

/**
 * @param {string} s  - original string
 * @param {number} i - index
 * @param {string} extra - what to insert
 * @returns {string} - the original string with the contents of "extra" inserted
 */
export const stringInsertAt = (s,i,extra)=>s.slice(0,i)+extra+s.slice(i)

/**
 * 
 * @param {Array<T>} a 
 * @returns {T}
 * @template T
 */
export function arrayLastElement(a) {
  return a[a.length-1]
}

/**
 * Usage:
 * class A{}; class B{}; class C extends inherit(A,B){}
 * 
 * If there are duplicate function names, only the latest in the classes list will be used.
 * 
 * @typedef {new(...args:any[])=>any} class
 * 
 * @param {...class} classes 
 * @returns {class}
 */
export function inherit(...classes) {
  // Combine methods and properties
  class Combined extends classes[0] {
    constructor(...args) {
      super(...args)
      classes.slice(1).forEach(base => {
        Object.assign(this, new base())
        Object.getOwnPropertyNames(base.prototype).forEach(prop => {
          if (prop !== 'constructor') {
            const descriptor = Object.getOwnPropertyDescriptor(base.prototype, prop)
            if (undefined!==descriptor) Object.defineProperty(Combined.prototype, prop, descriptor)
          }
        })
      })
    }
  }
  // Combine static methods and properties
  classes.forEach(base => {
    Object.getOwnPropertyNames(base).forEach(prop => {
      if (prop !== 'prototype' && prop !== 'name' && prop !== 'length') {
        const descriptor = Object.getOwnPropertyDescriptor(base, prop)
        if (undefined!==descriptor) Object.defineProperty(Combined, prop, descriptor)
      }
    })
  })
  return Combined
}
