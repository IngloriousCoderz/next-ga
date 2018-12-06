import ReactGA from 'react-ga'

const IS_BROWSER = typeof window !== 'undefined'
const GA_LOCAL_STORAGE_KEY = 'ga:clientId'

export function init(code) {
  if (IS_BROWSER && !window.GA_INITIALIZED && code) {
    if (window.localStorage) {
      const ga = ReactGA.ga()

      // @see https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id
      ga('create', code, {
        storage: 'none',
        clientId: localStorage.getItem(GA_LOCAL_STORAGE_KEY),
      })

      ga(function(tracker) {
        localStorage.setItem(GA_LOCAL_STORAGE_KEY, tracker.get('clientId'))
      })
      // NOTE: There is no else, a browser with no local storage will not be supported.
      // } else {
      //   ReactGA.initialize(code)
    }
  }
}

export function pageview() {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export function event(category = '', action = '') {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export function exception(description = '', fatal = false) {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
