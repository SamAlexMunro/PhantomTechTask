import { FormControl } from '@angular/forms';

export function urlExists(control: FormControl) {
  const url = control.value;
  const xhr = new XMLHttpRequest();
  /**
   * Behind restricted to using only FE this is a handy way to bypass CORS, and ping the url
   * to see if it exists.
   */
  xhr.open('GET', `https://cors-anywhere.herokuapp.com/${url}`, true);
  xhr.send();
  /**
   * Return a promise for FormControl async validation
   */
  return new Promise((resolve) => {
    xhr.onload = () => {
      if (xhr.status !== 200) {
        resolve({
          urlNonExistant: {
            errorMessage: `URL Doesn't exist!`
          }
        });
      } else {
        resolve(null);
        return null;
      }
    };
  });
}
