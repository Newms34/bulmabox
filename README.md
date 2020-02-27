# Bulmabox

## Contents:
 - [About](#about)
 - [Updates](#updates)
 - [Usage](#usage)
 - [Arguments](#arguments)
 - [Errors](#errors)
 - [Special Notes](#special-notes)
 - [Tests](#tests)
 - [Credits](#credits)

----

## About
Bulmabox is a bare-bones dialog box helper in the style of Bootstrap's Bootbox, but written for Bulma. It's still in development, so be warned!

----

## Updates
You may notice that bulmabox has recently been updated to version 7+. Despite the big semantic version change (6 to 7), there shouldn't be any *major* differences on your end. However, a lot of stuff in the machinery has been replaced/reorganized to make bulmabox more stream-lined. Stuff you *should* know:
 - You can now specify fonts. See below under `Special Notes` --> `Options` for details.
 - Button creation has been centralized. This *shouldn't* mean anything for you, but if anything breaks, please let me know via creating an issue!
 - NOTE: I've removed `bower.json` from the repo, since practically no one uses that anymore (and neither should you!). 
 - I've also included a `gulpfile.js` for those that wanna mess with bulmabox.
 - Small update: now exports as an ES6 module, so you can use it in build processes like `webpack` or `vue-cli`.

----

## Usage
#### Installation
Just download the index.js file and include it in your HTML with a `script` tag for now.
Please note that while I've included Bulma as an NPM dependency, you're free to include it any other way if you prefer (i.e., via a cdn).

#### Available Functions
Right now, Bulmabox has four separate functions that you can call:
 - `bulmabox.alert()`: Regular alerts, just like old `window.alert()`.
 - `bulmabox.confirm()`: Confirm. Requires a callback function.
 - `bulmabox.prompt()`: Prompt. Also requires a callback function.
 - `bulmabox.custom()`: Dialog with customizable body. 

---

## Arguments
The arguments for the bulmabox functions are listed below. Anything that isn't marked "required" is... not required. Surprise!
 * **Title** (string): The title of your dialog box. *Required!*
 * **Message** (string): The message of your dialog box. Note: the *second* string provided will *always* be treated as the message. If you only provide one string, you'll just have a title and no message.
 * **Callback** (function): What happens after you click a button. See `Errors` below for which functions require callbacks.
 * **Buttons** (HTML): (only for Custom dialog). A bunch of Bulma-formatted buttons. See the note below about custom dialogs for important information!
 * **Options** (object): Generally, this controls "appearance" of each button. See section "Options" under `Special Notes` below.

---

## Errors
 (that hopefully aren't *my* fault)
 - If you feed the functions less than one string, Bulmabox will throw an error. I can't make an alert if there's nothing to say!
 - If you use a Confirm or Prompt function and fail to provide a callback function, Bulmabox will throw an error. Both of these expect to *do* something with whatever you're confirming/prompting for, so we need a callback for that. Alert and Custom do not require callbacks.

---

## Special Notes:
##### Options:
The "options" object passed to the functions has a few options itself:
* **Button Language**: `lang:"fr"`.This allows you to pick the language of the buttons, from 40-ish available languages. Please note that I only speak Latin and English, so I cannot guarantee the translations (which I stole from bootbox. Thanks guys!) are correct. 
Also, note that the button language is per-dialog box. You cannot, for example, do `{okay:french,cancel:chinese}` or something; you'd have to specify the button text manually in that case (see `buttons` - `text` below)
* **Okay and Cancel Options (`{okay:{//stuff}, cancel: {//stuff}}`)**: Passed as two separate objects, `okay` and `cancel`. Each of these has a bunch of properties:
    * **Colors (`colors`):** Passed as a single object, `colors`. This object has two properties`fg` and `bg`, which are, as you'd guess, foreground and background. The colors themselves are either:
        * Bulma class names (i.e., `is-success` for background, or `has-text-success` for foreground).
        * Regular old color codes (i.e., `#fcb340` or `rgb(252,179,64)`)
    * **Text (`txt`):** The text displayed on each button. Note that if you do this, it will take precedence over custom language settings. So doing `{lang:'fr',cancel:{txt:'Nah Im good!'}}` will create a dialog with a cancel button that says "Nah Im good", *not* "Annuler".
    * **Font (`font`):** The default Bulma font is easy to read, but what if you don't want easy? What if you want your buttons in Klingon or Quenya? You can do that! Just pass a `font` property to any buttons you wanna re-style (e.g., `{okay:{font:'Comic Sans MS'}}`). Please note that this is fed directly to the CSS `font-family` property, so doing stuff like `'24pt italic Comic Sans MS'`... won't work.

##### Custom Dialogs:
 Since the custom dialog's buttons are themselves custom (you can do whatever you want with them), you'll need to manually run some functions if you choose to include said buttons:
 - `bulmabox.runCb(callback,data,[keepAlive])`: Basically, your "Okay" function. This itself has a few parameters:
    - **callback** is the name of the function you wanna run. Normally, this'll just be `bulmabox.params.cb`, which is the callback passed to Bulmabox. 
    - **data** is any data you wanna pass to the callback. If you don't need any data, just pass `true`. 
    - **keepAlive** (boolean) will prevent the custom dialog box from closing on running this callback. If *not* truthy, this will run `bulmabox.kill`, thus closing the modal.
 - `bulmabox.kill('bulmabox-diag')` if you just want the button to close the dialog. You can also substitute another DOM id for `'bulmabox-diag'`, but that'll close whatever that is and *not* the bulmabox modal. Note that if you run `bulmabox.runCb` without a `keepAlive` parameter, that will in turn run this, this closing the dialog box.

##### Global Options:
You can set global options for four parameters:
 * The language: `bulmabox.opts({lang:'fr'})`
 * The header and footer background: `bulmabox.opts({hfBg:'red'})`
 * The main background: `bulmabox.opts({mainBg:'blue'})`
 * Centering the text in the header and footer: `bulmabox.opts({centr:true})`
 * Verbose mode: Will log out a bunch of debug info to the console. Off by default: `bulmabox.opts({vb:true})` 
 You can reset all of this by just running `bulmabox.opts({reset:true})`. 

 Finally, you can override the global `window.alert()` method by running `bulmabox.opts({globalAlert:true})`.
 
 If you're wondering, similar constructions do *not* work for any of the other dialogs (i.e., `window.confirm=bulmabox.confirm`), since that would require essentially pausing the browser script engine (or worse, crashing it!), which even the WHATWG people say is a bad idea (see [this link](https://html.spec.whatwg.org/multipage/webappapis.html#pause) on "pausing" as part of the `window.confirm` spec).

--- 
##### **_Examples:_**
Dialog with an okay button of "Sic" and a cancel button of "Non"

    op = {
        lang:'la'
    }

Dialog with an okay button of "Got it!" and a cancel button of "İptal" (Turkish):

    op = {
        lang:'tr',
        okay:{
            txt:'Got it!'
        }
    }

Dialog with an okay button with blue fg, `is-success` bg, Comic Sans font (...sorry) and Latin buttons:
    
    op = {
        lang:'la',
        okay:{
            colors:{
                bg:"is-success",
                fg:"#009"
            },
            font:'Comic Sans MS'
        }
    }
----

## Tests
I've included a sample HTML file in the `\test` folder for your convenience. It's also got some nice tables to explain all the nitty-gritty details.

----

## Credits
 - Bulma. The dudes that made this possible, by, you know, *creating* Bulma. Thanks guys! Go check em out over at [their site](https://bulma.io/). 
 - Bootstrap (the source of the original Bootbox) was created by the lovely folks over at [The Bootstrap site](https://getbootstrap.com/).
 - [Bootbox](http://bootboxjs.com/) was created by the awesome [Nick Payne](http://twitter.com/makeusabrew). A lot of the credit for Bulmabox's inspiration goes to him. As mentioned, I also stole the i18n stuff from him.
 - Finally, Bulmabox itself was written by me, [David Newman](https://github.com/Newms34/). Hi!
