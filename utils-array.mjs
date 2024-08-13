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
 * 
 * @param {Array<T>} a 
 * @returns {T}
 * @template T
 */
export function arrayLast(a) {
  return a[a.length-1]
}

/**
 * Insert "item" at position "index" in "a".
 * 
 * @param {Array<T>} inOutA 
 * @param {number} index 
 * @param {T} item
 * @template T
 */
export function arrayInsert(inOutA, index, item) {
  inOutA.splice(index, 0, item)
}

/**
 * Different to Array.fill() because each value will be a new instance.
 * 
 *   i.e.
 * 
 *   > a = arrayFill(new Array(100),{ a:1, b:2, c:3 })
 *   > a[0].c = 9
 *   > a[1]
 *   { a:1, b:2, c:3 }
 * 
 *   vs
 *
 *   > a = new Array(100).fill({ a:1, b:2, c:3 })
 *   > a[0].c = 9
 *   > a[1]
 *   { a:1, b:2, c:9 }
 * 
 * @param {Array<any>} aInOut
 * @param {new(...args:Array<T>)=>P} myClass
 * @param {Array<T>} constructorParams
 * @template T
 * @template P
 */
export function arrayFillWithClassInstances(aInOut, myClass, constructorParams=[]) {
  for(let i=aInOut.length-1; i>=0; i--){aInOut[i]=new myClass(...constructorParams)}// more than 2x faster than Array.from(new Array(100),_=>{return{ a:1, b:2, c:3 }})
  // return aInOut
}

/**
 * @param {number} qty
 * @param {new(...args:Array<T>)=>P} myClass
 * @param {Array<T>} constructorParams
 * @returns {Array<P>}
 * @template T 
 * @template P
 */
export function arrayNewWithClassInstances(qty, myClass, constructorParams=[]) {
  const a = new Array(qty)
  for(let i=qty-1; i>=0; i--){a[i]=new myClass(...constructorParams)}// more than 2x faster than Array.from(new Array(100),_=>{return{ a:1, b:2, c:3 }})
  return a
}
