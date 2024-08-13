import { getCallerDetails } from './utils-debug.mjs'
import { L } from './utils-js.mjs'
import { objectDeepEqual } from './utils-object.mjs'

/**@type {boolean}*/const gTest = true// true = run tests, false = don't run tests

/**
 * If fn evaluates to false, msg is output to the console.
 * 
 * @param {function} fn - require a function input so we can choose to not evaluate them if testing is turned off
 * @param {any} expectedResult
 * @returns 
 */
export function assertEquals(fn, expectedResult) {
  if (false === gTest) return

  const l = fn()
  const r = expectedResult

  const ls = JSON.stringify(l,null,2)
  const rs = JSON.stringify(r,null,2)

  const d = getCallerDetails()

  L()
  L(d)
  L('assertEquals() computed:'+ls)
  L('assertEquals() expected:'+rs)
  if (!objectDeepEqual(l,r)) throw new Error(`${d}\nactual--> ${ls} !== ${rs} <--expected`)
}
