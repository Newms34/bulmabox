# Bulmabox

## Contents:
 - [About](#about)
 - [Usage](#usage)
 - [Test](#test)
 - [Future Development](#future-development)
 - [Credits](#credits)

----

## About
Bulmabox is a bare-bones dialog box helper in the style of Bootstrap's Bootbox, but written for Bulma. It's still in development, so be warned!

----

## Usage
#### Installation
Just download the index.js file and include it in your HTML with a `script` tag for now.
Please note that while I've included Bulma as an NPM dependency, you're free to include it any other way if you prefer (i.e., via a cdn).

#### Functions
Right now, Bulmabox has four separate functions that you can call:
 - `bulmabox.alert()`: Regular alerts, just like old `window.alert()`.
 - `bulmabox.confirm()`: Confirm. Requires a callback function.
 - `bulmabox.prompt()`: Prompt. Also requires a callback function.
 - `bulmabox.custom()`: Dialog with customizable body. 
#### Arguments
The arguments for the functions are as follows:
 1. Title (string): The title of your dialog box.
 2. Message (string): The message of your dialog box.
 3. Callback (function): What happens after you click a button.
 4. Buttons (HTML): (only for Custom dialog. Optional). A bunch of Bulma-formatted buttons. See the note below about custom dialogs for important information!

#### Errors
 - If you feed the functions less than one string, Bulmabox will throw an error. 
 - If you use a Confirm or Prompt function and fail to provide a callback function, Bulmabox will throw an error.

#### Note on Custom Dialogs:
 Since the custom dialog's buttons are themselves custom, if you provide said buttons, make *sure* to call either `bulmabox.runCb(callback)` if you want your button to run your callback, or `bulmabox.kill('bulmabox-diag')` if you just want the button to close the dialog.

----

## Test
I've included a sample HTML file in the `\test` folder for your convenience. 

----

## Future Development
For now, Bulmabox must be included manually by downloading it from github. Eventually, I'll include it on Bower.io and Yarn.

----

## Credits
 - Bootstrap (the source of the original Bootbox) was created by the lovely folks over at [The Bootstrap site](https://getbootstrap.com/).
 - [Bootbox](http://bootboxjs.com/) was created by the awesome [Nick Payne](http://twitter.com/makeusabrew). A lot of the credit for Bulmabox's inspiration goes to him.
 - Finally, Bulmabox itself was written by me, [David Newman](https://github.com/Newms34/)