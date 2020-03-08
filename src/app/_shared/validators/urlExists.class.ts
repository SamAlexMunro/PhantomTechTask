import { FormControl } from '@angular/forms';

export function urlExists(control: FormControl) {
  const url = control.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://cors-anywhere.herokuapp.com/${url}`, true);
  xhr.send();
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
