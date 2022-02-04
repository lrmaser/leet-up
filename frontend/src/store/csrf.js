import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // Set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';

  // Set options.headers to an empty object if there are no headers
  options.headers = options.headers || {};

  // If options.method is not 'GET', then set the 'Content-Type' header to 'application/json'
  // and the 'XSRF-TOKEN' header to the value of the 'XSRF-TOKEN' cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  // Call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);

  // If the res status code is 400+, then throw an error with the error being the res
  if (res.status >= 400) throw res;

  // If the res status code is under 400, then return the res to the next promise chain
  return res;
};

// Call this to get the 'XSRF-TOKEN' cookie, for development ONLY
export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
};
