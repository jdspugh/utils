import { irregularPluralsToSingulars, irregularSingularsToPlurals } from './plurals.mjs'
import { L } from './utils-js.mjs'
import { assertEquals } from './utils-test.mjs'

/**
 * Parses floats that contain a ',' or '.' as the decimal separator.
 * 
 * @param {string | undefined} s
 * @returns {number | undefined}
 */
export function parseFloatIntl(s) {
  // L('parser.mjs parseFloatIntl()')
  if (undefined === s) return undefined

  s.replace(',','.')
  return parseFloat(s)
}

/**
 * If the reference contains a capital as the first letter, the returned version of src will also have one.
 * 
 * @param {string} ref - reference case
 * @param {string} src - string to transform
 * @returns {string} - src, but transformed to match the case of ref
 */
function replicateCase(ref, src) {
  if (/\p{Lu}/u.test(ref[0])) {
    return src[0].toLocaleUpperCase() + src.slice(1)
  } else {
    return src[0].toLocaleLowerCase() + src.slice(1)
  }
}

function singularize(word) {
  const lowercaseWord = word.toLocaleLowerCase()

  // handle irregulars
  //   already singular
  if (undefined !== irregularSingularsToPlurals[lowercaseWord]) return word// <--!!!
  //   convert plural to singular
  const result = irregularPluralsToSingulars[lowercaseWord]
  if (undefined !== result) return replicateCase(word,result)

  // handle regulars
  if (lowercaseWord.endsWith('ies') && word.length > 3) {
    word = word.substring(0, word.length - 3) + 'y'// cities -> city
  } else if (lowercaseWord.endsWith('s') && !lowercaseWord.endsWith('ss')) {
    word = word.substring(0, word.length - 1)// eggs -> egg, but leaves words ending in 'ss' unchanged (e.g., 'class')
  }
  return word// Return the word if it doesn't match the above cases or needs no change
}

/**
 * Convert an array of strings to the form "a, b, c and d"
 * 
 * @param {Array<string>} a 
 * @param {string | undefined} prefix
 * @param {string | undefined} postfix
 * @returns {string}
 */
export function arrayToLang(a, prefix=undefined, postfix=undefined) {
  let s=''
  let l=a.length // cache this value for the loop
  let ll=l-2     // cache this value for the loop
  for (let i=0; i<l; i++) {
    if (undefined!==prefix) s+=prefix
    s += a[i]
    if (undefined!==postfix) s+=postfix

    if (i===ll) s+= ' and '
    if (i<ll) s+=', '
  }// for
  return s
}

export function removeAccents(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
}
