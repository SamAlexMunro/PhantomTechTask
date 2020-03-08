import { FormControl } from '@angular/forms';

export function urlValidator(control: FormControl) {
  let url = control.value;
  const urlValidCharacters = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  if (!url) {
    return {
      invalidUrl: {
        errorMessage: 'Please enter a URL'
      }
    };
  }
  if (url) {
    /**
     * Trim and lowercase the URL to prevent any strange edge cases.
     */
    url = url.toLowerCase();
    url = url.trim();
    const prefix = url.slice(0, 8);
    if (!url.match(urlValidCharacters)) {
      return {
        invalidUrl: {
          errorMessage: 'Please enter a valid URL'
        }
      };
    }
    if (!prefix.includes('https://') && !prefix.includes('http://')) {
      return {
        invalidUrl: {
          errorMessage: 'Please prefix with http:// or https://'
        }
      };
    }
  }

  return null;
}
