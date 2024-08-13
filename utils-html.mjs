import { L } from './utils-js.mjs'

/**
 * @param {string} e
 * @returns {HTMLElement}
 */
export const $=e=>/**@type {HTMLElement}*/(document.querySelector(e))

/**
 * @param {string} e
 * @returns {NodeListOf<HTMLElement>}
 */
export const $$=e=>document.querySelectorAll(e)

/**
 * Searches through the DOM, and any attached shadow DOMs.
 * 
 * NOTE: Doesn't support nested selectors e.g. 'title-bar .back'
 * 
 * @param {string} selector
 * @param {Document | DocumentFragment | HTMLElement} base
 * @returns {Array<HTMLElement>}
 */
export function $$shadow(selector, base=document) {
  let els = [...base.querySelectorAll(selector)]
  // base.querySelectorAll('*').forEach(e=>e.shadowRoot && (els=[...els,...$$(selector,e.shadowRoot)]))
  base.querySelectorAll('*').forEach(e=>e.shadowRoot && (els=els.concat($$shadow(selector,e.shadowRoot))))
  return /**@type {Array<HTMLElement>}*/(els)
}

/**
 * @param {string} e
 * @returns {HTMLInputElement} - hack type so doesn't show errors if elements are missing
 */
export const $input=e=>/**@type {HTMLInputElement}*/(document.querySelector(e))

/**
 * @param {string} e
 * @returns {HTMLFormElement} - hack type so doesn't show errors if elements are missing
 */
export const $form=e=>/**@type {HTMLFormElement}*/(document.querySelector(e))

/**
 * @param {string} e
 * @returns {NodeListOf<HTMLInputElement>}
 */
export const $$input=e=>document.querySelectorAll(e)

/**
 * @param {string} str 
 * @returns {string}
 */
export function escapeHtmlAttribute(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
}

/**
 * Position cursor after end of text in el
 * 
 * @param {HTMLInputElement} el 
 */
export function cursorEnd(el) {
  L('utils-html.mjs cursorEnd()')
  // el.focus()
  if ('INPUT'===el.nodeName || 'TEXTAREA'===el.nodeName) {
    // input & textarea elements
    const l = el.value.length
    el.setSelectionRange(l, l)
  } else if (el.contentEditable === 'true') {
    // contenteditable div
    const r = document.createRange()
    const s = window.getSelection()
    r.selectNodeContents(el)
    r.collapse(false)
    s?.removeAllRanges()
    s?.addRange(r)
  }
}

/**
 * True if child is contained within parent. Also if the child IS the parent, hmmm.
 * 
 * @param {HTMLElement} child 
 * @param {string} parentSelector 
 * @returns {HTMLElement} - parent
 */
export function getParent(child, parentSelector) {
  while (child && child !== document.body) {
    if (child && child.matches(parentSelector)) return child
    child = child.parentElement
  }
  return undefined
}
