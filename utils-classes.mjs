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
    constructor(/**@type {any[]}*/...args) {
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
