/**@import { hex } from './utils-types.mjs'*/

/**
 * @param {string | hex} color - <rgb color> | <hex color> | #<hex color>
 * @returns {hex} - '#<hex color>'
 */
export function normaliseColorToHex(color) {
  color = color.toLowerCase()

  // rgb to hex
  if (color.startsWith('rgb')) {
    let [r, g, b] = color.match(/\d+/g).map(Number)
    color = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)  
  }
  else if (6===color.length) {
    color = '#' + color
  }

  return color
}
