export const L=console.log

/**
 * @returns {string | undefined}
 */
export function getCallerDetails() {
  return new Error().stack?.split('\n')[2]
}
