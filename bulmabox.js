'use strict';

const bulmabox = {
    currParams: null
},
    fgColorOpts = ['has-text-white', 'has-text-black', 'has-text-light', 'has-text-dark', 'has-text-primary', 'has-text-link', 'has-text-info', 'has-text-success', 'has-text-warning', 'has-text-danger'],
    bgColorOpts = ['is-white', 'is-black', 'is-light', 'is-dark', 'is-primary', 'is-link', 'is-info', 'is-success', 'is-warning', 'is-danger'],
    allLangs = {
        "ar": {
            "OK": "موافق",
            "CANCEL": "الغاء"
        },
        "az": {
            "OK": "OK",
            "CANCEL": "İmtina et"
        },
        "bg_BG": {
            "OK": "Ок",
            "CANCEL": "Отказ"
        },
        "br": {
            "OK": "OK",
            "CANCEL": "Cancelar"
        },
        "cs": {
            "OK": "OK",
            "CANCEL": "Zrušit"
        },
        "da": {
            "OK": "OK",
            "CANCEL": "Annuller"
        },
        "dov":{
            "OK":"Geh",
            "Cancel":"Nid"
        },
        "de": {
            "OK": "OK",
            "CANCEL": "Abbrechen"
        },
        "el": {
            "OK": "Εντάξει",
            "CANCEL": "Ακύρωση"
        },
        "en": {
            "OK": "OK",
            "CANCEL": "Cancel"
        },
        "es": {
            "OK": "OK",
            "CANCEL": "Cancelar"
        },
        "eu": {
            "OK": "OK",
            "CANCEL": "Ezeztatu"
        },
        "et": {
            "OK": "OK",
            "CANCEL": "Katkesta"
        },
        "fa": {
            "OK": "قبول",
            "CANCEL": "لغو"
        },
        "fi": {
            "OK": "OK",
            "CANCEL": "Peruuta"
        },
        "fr": {
            "OK": "OK",
            "CANCEL": "Annuler"
        },
        "he": {
            "OK": "אישור",
            "CANCEL": "ביטול"
        },
        "hu": {
            "OK": "OK",
            "CANCEL": "Mégsem"
        },
        "hr": {
            "OK": "OK",
            "CANCEL": "Odustani"
        },
        "id": {
            "OK": "OK",
            "CANCEL": "Batal"
        },
        "it": {
            "OK": "OK",
            "CANCEL": "Annulla"
        },
        "ja": {
            "OK": "OK",
            "CANCEL": "キャンセル"
        },
        "ko": {
            "OK": "OK",
            "CANCEL": "취소"
        },
        "la":{
            "OK":"Sic",
            "Cancel":"Non"
        },
        "lt": {
            "OK": "Gerai",
            "CANCEL": "Atšaukti"
        },
        "lv": {
            "OK": "Labi",
            "CANCEL": "Atcelt"
        },
        "nl": {
            "OK": "OK",
            "CANCEL": "Annuleren"
        },
        "no": {
            "OK": "OK",
            "CANCEL": "Avbryt"
        },
        "pl": {
            "OK": "OK",
            "CANCEL": "Anuluj"
        },
        "pt": {
            "OK": "OK",
            "CANCEL": "Cancelar"
        },
        "ru": {
          "OK": "OK",
            "CANCEL": "Отмена"
        },
        "sk": {
            "OK": "OK",
            "CANCEL": "Zrušiť"
        },
        "sl": {
            "OK": "OK",
            "CANCEL": "Prekliči"
        },
        "sq": {
            "OK": "OK",
            "CANCEL": "Anulo"
        },
        "sv": {
            "OK": "OK",
            "CANCEL": "Avbryt"
        },
        "th": {
            "OK": "ตกลง",
            "CANCEL": "ยกเลิก"
        },
        "tr": {
            "OK": "Tamam",
            "CANCEL": "İptal"
        },
        "uk": {
            "OK": "OK",
            "CANCEL": "Відміна"
        },
        "zh_CN": {
            "OK": "OK",
            "CANCEL": "取消"
        },
        "zh_TW": {
            "OK": "OK",
            "CANCEL": "取消"
        }
    };

//arg order: first string is title. second string (if present) is main 'body' message. function is callback

bulmabox.sortParams = function (a, b, c, d, e) {
    /*sort parameters:
    cb:callback function
    tt:title
    ms:message
    op:options
    */
    const p = {
        cb: null,
        tt: null,
        ms: null,
        op: null
    };
    let i = 0,
        needsCb = false;
    //calback first
    for (i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'function') {
            p.cb = arguments[i];
            break;
        }
    }
    //now strings. First string is title. Second string (if present) is message
    for (i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'string' && !p.tt) {
            p.tt = arguments[i];
        } else if (typeof arguments[i] == 'string' && !p.ms) {
            p.ms = arguments[i];
        }
    }
    /*callback req check.
    For alerts, this is false (they just close on OKAY). 
    For confirms and prompts, this is true (we need something to DO with the info we're prompting/confirming)
    For customs, this is actually false (up to user whether they want a cb or not)
    */
    for (i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'boolean') {
            needsCb = arguments[i];
            break;
        }
    }
    /* Miscellaneous options stuff */
    for (i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'object') {
            p.op = arguments[i];
        }
    }
    p.op = p.op || {
        lang: 'en'
    };
    //now error handling
    if (!p.tt) {
        throw new Error('Bulmabox Dialogs require at least one string parameter for the title.');
    }
    if (!p.cb && needsCb) {
        throw new Error('Bulmabox Confirms and Prompts require a callback.');
    }
    console.log(p, needsCb)
    return p;
};
bulmabox.getBtnData = (op, btnStr, type) => {
    //this fn most importantly gets the appropriate language translation for each button 
    //secondly, it gives us the option to pick the button color (other than defaults)
    //text first
    //firstly, if we specify the custom text, use that.
    let hasCustTxt = false;
    if (op.okay && op.okay.txt) {
        btnStr = btnStr.replace('Okay', op.okay.txt)
        hasCustTxt =true;
    }
    if (op.cancel && op.cancel.txt) {
        btnStr = btnStr.replace('Cancel', op.cancel.txt)
        hasCustTxt =true;
    }
    //now if we dont have custom text, and we have a language:
    if(!hasCustTxt && op.lang && allLangs[op.lang]){
        btnStr = btnStr.replace('Okay',allLangs[op.lang].OK).replace('Cancel',allLangs[op.lang].CANCEL)
    }

    //now colors:
    //okay btn
    if (op.okay && op.okay.colors) {
        //foreground
        const defCol = type == 'confirm' || type == 'prompt' ? 'success' : 'info'
        if (op.okay.colors.fg && fgColorOpts.includes(op.okay.colors.fg)) {
            //user specified a color option the fg color for Okay btn, and it's one of the bulma classes
            btnStr = btnStr.replace(`has-text-okay-REPL`, op.okay.colors.fg)
        } else if (op.okay.colors.fg) {
            btnStr = btnStr.replace('cust-fg-style', `color:${op.okay.colors.fg}`)
        }
        if (op.okay.colors.bg && bgColorOpts.includes(op.okay.colors.bg)) {
            //user specified a color option the bg color for Okay btn, and it's one of the bulma classes
            btnStr = btnStr.replace(`is-${defCol}-REPL`, op.okay.colors.bg)
        } else if (op.okay.colors.bg) {
            console.log('replacing bg color!', op.okay.colors.bg)
            btnStr = btnStr.replace(`cust-bg-style`, `background:${op.okay.colors.bg}`)
        }
    }
    if (op.cancel && op.cancel.colors) {
        //foreground
        if (op.cancel.colors.fg && fgColorOpts.includes(op.cancel.colors.fg)) {
            //user specified a color option the fg color for cancel btn, and it's one of the bulma classes
            btnStr = btnStr.replace(`has-text-danger-REPL`, op.cancel.colors.fg)
        } else if (op.cancel.colors.fg) {
            btnStr = btnStr.replace('cust-fg-style', `color:${op.cancel.colors.fg}`)
        }
        if (op.cancel.colors.bg && bgColorOpts.includes(op.cancel.colors.bg)) {
            //user specified a color option the bg color for cancel btn, and it's one of the bulma classes
            btnStr = btnStr.replace(`is-danger-REPL`, op.cancel.colors.bg)
        } else if (op.cancel.colors.bg) {
            console.log('replacing bg color!', op.cancel.colors.bg)
            btnStr = btnStr.replace(`cust-bg-style`, `background:${op.cancel.colors.bg}`)
        }
    }
    btnStr = btnStr.replace(/cust-fg-style/g,'').replace(/cust-bg-style/g,'').replace(/-REPL/g,'').replace(/has-text-okay/g,'').replace(/has-text-cancel/g,'')
    console.log(op, btnStr)
    return btnStr;
}
bulmabox.alert = (a, b, c, e) => {
    bulmabox.params = bulmabox.sortParams(a, b, c, false, e);
    if (!bulmabox.params.cb) {
        bulmabox.params.cb = function () { };
    }
    const btns = bulmabox.getBtnData(bulmabox.params.op, `<button class='button is-info-REPL has-text-okay-REPL' onclick='bulmabox.runCb(bulmabox.params.cb,true)' style='cust-bg-style;cust-fg-style;'>Okay</button>`, 'alert');
    bulmabox.dialog(bulmabox.params.tt, bulmabox.params.ms, btns);
};

bulmabox.confirm = (a, b, c, e) => {
    bulmabox.params = bulmabox.sortParams(a, b, c, true, e);
    const btns = bulmabox.getBtnData(bulmabox.params.op, `<button class='button is-success-REPL has-text-okay-REPL' onclick='bulmabox.runCb(bulmabox.params.cb,true)' style='cust-bg-style;cust-fg-style;'>Okay</button><button class='button is-danger-REPL has-text-cancel-REPL' onclick='bulmabox.runCb(bulmabox.params.cb,false)' style='cust-bg-style;cust-fg-style;'>Cancel</button>`, 'confirm');
    bulmabox.dialog(bulmabox.params.tt, bulmabox.params.ms, btns);
};

bulmabox.prompt = (a, b, c, e) => {
    bulmabox.params = bulmabox.sortParams(a, b, c, true, e);
    bulmabox.params.ms += `<br>\n    <div class='field'>\n        <div class='control'>\n            <input type="text" id="bulmabox-diag-txt" class='input'>\n        </div>\n    </div>`;
    const btns = bulmabox.getBtnData(bulmabox.params.op, `<button class='button is-success-REPL has-text-okay-REPL' onclick='bulmabox.runCb(bulmabox.params.cb,document.querySelector("#bulmabox-diag-txt").value)' style='cust-bg-style;cust-fg-style;'>Okay</button><button class='button is-danger-REPL has-text-cancel-REPL' onclick='bulmabox.runCb(bulmabox.params.cb,false)' style='cust-bg-style;cust-fg-style;'>Cancel</button>`, 'prompt');
    bulmabox.dialog(bulmabox.params.tt, bulmabox.params.ms, btns);
};

bulmabox.custom = (a, b, c, d, e) => {
    d = d || {};
    bulmabox.params = bulmabox.sortParams(a, b, c, false, e);
    if (!d) {
        d = bulmabox.getBtnData(bulmabox.params.op, `<button class='button is-info-REPL has-text-okay-REPL' onclick='bulmabox.runCb(bulmabox.params.cb,true)' style='cust-bg-style;cust-fg-style;'>Okay</button>`, 'custom');
    }
    const btns = d;
    bulmabox.dialog(bulmabox.params.tt, bulmabox.params.ms, btns);
};
bulmabox.kill = (id) => {
    const el = document.querySelector('#' + id);
    bulmabox.params = null;
    el.parentNode.removeChild(el);
};
bulmabox.runCb = (cb, data, keepAlive) => {
    cb(data);
    if (keepAlive) return false;
    bulmabox.kill('bulmabox-diag');
};

bulmabox.dialog = (tt, msg, btns) => {
    //actual function to draw the dialog box, used by all 4(?) dialog generators including the custom one
    const diagDiv = document.createElement('div');
    diagDiv.className = 'modal is-active';
    diagDiv.id = 'bulmabox-diag';
    diagDiv.innerHTML = '\n<div class="modal-background" onclick=\'bulmabox.kill("' + diagDiv.id + '")\'></div>\n    <div class="modal-card">\n        <header class="modal-card-head">\n            <p class="modal-card-title">' + tt + '</p>\n            <button class="delete" aria-label="close" onclick=\'bulmabox.kill("' + diagDiv.id + '")\'></button>\n        </header>\n        <section class="modal-card-body">\n            ' + (msg || '') + '\n        </section>\n        <footer class="modal-card-foot">\n            ' + btns + '\n        </footer>\n    </div>\n\t';
    document.body.append(diagDiv);
};