/**
 * 
 * @param {string} s 
 * @returns 
 */
export function stringToTitleCase(s) {
  return s.
    split(' ').// split into words
    map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).// title case each word
    join(' ')// rejoin
}

/**
 * @param {string} s  - original string
 * @param {number} i - index
 * @param {string} extra - what to insert
 * @returns {string} - the original string with the contents of "extra" inserted
 */
export const stringInsertAt = (s,i,extra)=>s.slice(0,i)+extra+s.slice(i)
