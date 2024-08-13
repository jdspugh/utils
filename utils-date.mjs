/**@typedef {number} ms*/

/**@type {number[]}*/const monthDays                = [ 31,   29,   31,   30,   31,   30,   31,   31,   30,   31,   30,   31  ]
/**@type {string[]}*/const monthNamesShortTitlecase = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
/**@type {string[]}*/const monthNamesShortLowercase = monthNamesShortTitlecase.map(m=>m.toLocaleLowerCase())
/**@type {string  }*/const lang                     = navigator.language// navigator.language is the browser's language

/**@type {ms}*/export const msInDay = 1000*60*60*24// 1 day in ms

/**
 * TODO: add year param so we can handle leap years (i.e. 28,29 feb)
 * 
 * @param {number | undefined} day 
 * @param {number | undefined} monthNumber 
 * @returns {boolean}
 */
export function isValidDayInMonth(day,monthNumber) {
  return undefined!==day && undefined!==monthNumber && // day and month defined?
         day>=1 && day<=monthDays[monthNumber]         // day in month range?
}

/**
 * Takes a "Date object" or "number" parameter in ms. Always returns a "Date object" (by converting any numbers).
 * 
 * @param {Date | ms} dateOrMs
 * @returns {Date} - always return a Date object
 */
function toDate(dateOrMs) {
  return 'number'===typeof dateOrMs ? new Date(dateOrMs) : dateOrMs
}

/**
 * Time, format dependant on the user's browser settings e.g. "10:17 AM"
 * 
 * @param {Date | ms} dateOrMs
 * @returns {string}
 */
export function toLocalUTCTimeString(dateOrMs) {
  return toDate(dateOrMs).toLocaleTimeString(lang,{timeStyle:'short',timeZone:'UTC'})// lang is the browser's language
}

/**
 * Date, format dependant on the user's browser settings e.g. "July 25, 2024"
 * 
 * @param {Date | ms} dateOrMs
 * @returns {string}
 */
export function toLocalUTCDateString(dateOrMs) {
  return toDate(dateOrMs).toLocaleDateString(lang,{dateStyle:'long',timeZone:'UTC'})// lang is the browser's language
}

/**
 * Day of month, format dependant on the user's browser settings e.g. "25"
 * 
 * @param {Date | ms} dateOrMs
 * @returns {string}
 */
export function toLocalUTCDayString(dateOrMs) {
  // return toDate(dateOrMs).toLocaleDateString(lang,{dateStyle:'long',timeZone:'UTC'})// lang is the browser's language
  return formatDay.format(dateOrMs)
}
const formatDay = new Intl.DateTimeFormat(lang,{
  timeZone : 'UTC',
  day      : 'numeric',
})

/**
 * Date & Time formats dependant on the user's browser settings e.g. "July 25, 2024, 10:17 AM"
 * 
 * @param {Date | ms} dateOrMs
 * @returns {string}
 */
export function toLocalUTCDateTimeString(dateOrMs) {
  // return toLocalUTCDateString(dateOrMs) + ', ' + toLocalUTCTimeString(dateOrMs)
  return formatDateTime.format(toDate(dateOrMs))
}
const formatDateTime = new Intl.DateTimeFormat(lang, {
  timeZone : 'UTC',
  year     : 'numeric',
  month    : 'short',
  day      : 'numeric',
  hour     : 'numeric',
  minute   : 'numeric',
})

/**
 * Returns a UTC timezone Date object from the given timestamp in ms.
 * 
 * @param {ms} t - ms
 * @returns {Date}
 */
export function dateUTC(t) {
  return new Date(t-new Date().getTimezoneOffset()*6e4)
}

/**
 * Returns a UTC timezone Date object containing the date and time now (ms accuracy).
 * 
 * @returns {Date}
 */
export function dateUTCNow() {
  return dateUTC(Date.now())
}

/**
 * Timestamp of now in ms (UTC timezone).
 * 
 * @returns {ms} - ms
 */
export function msUTCNow() {
  return Date.now()
}

/**
 * Returns the timestamp of the start of this UTC day.
 * 
 * @param {ms | undefined} t - ms (ms now, if undefined)
 * @returns {ms} - ms
 */
export function truncateToUTCDay(t) {
  if (undefined===t) t=msUTCNow()
  return dateUTC(t).setUTCHours(0,0,0,0)
}

/**
 * Returns the timestamp of the start of this UTC minute.
 * 
 * @param {ms} t - ms
 * @returns {ms} - ms
 */
export function truncateToUTCMinute(t) {
  return dateUTC(t).setUTCSeconds(0,0)
}

/**
 * @param {string | undefined} month - e.g. 'Feb' or 'February'
 * @returns {number | undefined} - 0..11
 */
export function monthStringToNumber(month) {
  if (undefined===month) return undefined

  let i
  for(i=0; i<monthNamesShortLowercase.length; i++) {
    if (month.toLowerCase().slice(0,3) === monthNamesShortLowercase[i]) break
  }
  return i<monthNamesShortLowercase.length ? i : undefined
}

/**
 * @param {number} number - 0..11
 * @returns {string} short title-case month string - e.g. 'Feb'
 */
export function monthNumberToString(number) {
  return monthNamesShortTitlecase[number]
}
