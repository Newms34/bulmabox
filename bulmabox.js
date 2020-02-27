'use strict';

const bulmabox = {
    params: [],
    config: {
        lang: 'en',
        hfBg: '#f5f5f5',
        centr: false,
        mainBg: '#fff', 
        vb:false,
    },
    vrb:function(){
        if(!this.config || !this.config.vb){
            return;
        }
        console.log(...arguments);
    },
    fgColorOpts: ['has-text-white', 'has-text-black', 'has-text-light', 'has-text-dark', 'has-text-primary', 'has-text-link', 'has-text-info', 'has-text-success', 'has-text-warning', 'has-text-danger'],
    bgColorOpts: ['is-white', 'is-black', 'is-light', 'is-dark', 'is-primary', 'is-link', 'is-info', 'is-success', 'is-warning', 'is-danger'],
    allLangs: {
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
        "dov": {
            "OK": "Geh",
            "CANCEL": "Nid"
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
        "fakeFrench": {
            "OK": "Oui",
            "CANCEL": "Non"
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
        "la": {
            "OK": "Sic",
            "CANCEL": "Non"
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
        op: null,
        needsCb: false
    };
    let i = 0;
    //calback first
    for (i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'function') {
            p.cb = arguments[i];
            break;
        }
    }
    bulmabox.vrb('arguments', arguments);
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
            p.needsCb = arguments[i];
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
        lang: bulmabox.config.lang
    };
    //now error handling
    if (!p.tt) {
        throw new Error('Bulmabox dialogs require at least one string parameter for the title.');
    }
    if (!p.cb && p.needsCb) {
        throw new Error('Bulmabox Confirms and Prompts require a callback.');
    }
    p.id = Math.floor(Math.random() * 999999999).toString(32);
    return p;
};
bulmabox.getBtnData = (params, type) => {
    //this fn most importantly gets the appropriate language translation for each button 
    //secondly, it gives us the option to pick the button color (other than defaults)
    //finally, it gets font choice(s), if specified
    //text first
    //firstly, if we specify the custom text, use that.
    /* Get btn data using options (op), type */
    const { op, id } = params,
    btns = {
        okay: `<button class='button is-success-REPL has-text-okay-REPL' onclick='bulmabox.runCb("${id}",true)' style='cust-bg-style;cust-fg-style;cust-font-style;'>Okay</button>`,
        cancel: null,
        btnList: ['okay']
    };
    bulmabox.vrb('GET BTN DATA', op, type, bulmabox.config);
    if (type == 'confirm' || type == 'prompt') {
        btns.cancel = `<button class='button is-danger-REPL has-text-cancel-REPL' onclick='bulmabox.runCb("${id}",false)' style='cust-bg-style;cust-fg-style;cust-font-style;'>Cancel</button>`;
        btns.btnList.push('cancel');
    }
    if (type == 'prompt') {
        //prompt uses a text-input value instead of just "true" as its data
        btns.okay = btns.okay.replace(`bulmabox.runCb("${id}",true)`, `bulmabox.runCb("${id}",document.querySelector("#bulmabox-diag-txt").value)`);
        bulmabox.vrb('PARAMS',params,'type',type,'op',op,'id',id);
    } else if (type == 'alert') {
        btns.okay = btns.okay.replace('is-success-REPL', 'is-info-REPL');
    }
    let hasCustTxt = false;
    if (op.okay && op.okay.txt) {
        btns.okay = btns.okay.replace('Okay', op.okay.txt);
        hasCustTxt = true;
    }
    if (op.cancel && btns.cancel && op.cancel.txt) {
        btns.cancel = btns.cancel.replace('Cancel', op.cancel.txt);
        hasCustTxt = true;
    }
    //now if we dont have custom text, and we have a language:
    if (!hasCustTxt && op.lang && bulmabox.allLangs[op.lang]) {
        btns.okay = btns.okay.replace('Okay', bulmabox.allLangs[op.lang].OK);
        if (!!btns.cancel) {
            btns.cancel.replace('Cancel', bulmabox.allLangs[op.lang].CANCEL);
        }
    }

    //now colors and fonts:
    //okay btn

    if (op.okay) {
        //colors
        if (op.okay.colors) {
            const defCol = type == 'confirm' || type == 'prompt' ? 'success' : 'info';
            if (op.okay.colors.fg && bulmabox.fgColorOpts.includes(op.okay.colors.fg)) {
                //user specified a color option the fg color for Okay btn, and it's one of the bulma classes
                btns.okay = btns.okay.replace(`has-text-okay-REPL`, op.okay.colors.fg);
            } else if (op.okay.colors.fg) {
                btns.okay = btns.okay.replace('cust-fg-style', `color:${op.okay.colors.fg}`);
            }
            if (op.okay.colors.bg && bulmabox.bgColorOpts.includes(op.okay.colors.bg)) {
                //user specified a color option the bg color for Okay btn, and it's one of the bulma classes
                btns.okay = btns.okay.replace(`is-${defCol}-REPL`, op.okay.colors.bg);
            } else if (op.okay.colors.bg) {
                btns.okay = btns.okay.replace(`cust-bg-style`, `background:${op.okay.colors.bg}`);
            }
        }
        if (op.okay && op.okay.font) {
            btns.okay = btns.okay.replace(`cust-font-style;`, `font-family:${op.okay.font}`);
        }
    }

    //cancel btn
    if (!!btns.cancel) {
        if (op.cancel && op.cancel.colors) {
            //foreground
            if (op.cancel.colors.fg && bulmabox.fgColorOpts.includes(op.cancel.colors.fg)) {
                //user specified a color option the fg color for cancel btn, and it's one of the bulma classes
                btns.cancel = btns.cancel.replace(`has-text-danger-REPL`, op.cancel.colors.fg);
            } else if (op.cancel.colors.fg) {
                btns.cancel = btns.cancel.replace('cust-fg-style', `color:${op.cancel.colors.fg}`);
            }
            if (op.cancel.colors.bg && bulmabox.bgColorOpts.includes(op.cancel.colors.bg)) {
                //user specified a color option the bg color for cancel btn, and it's one of the bulma classes
                btns.cancel = btns.cancel.replace(`is-danger-REPL`, op.cancel.colors.bg);
            } else if (op.cancel.colors.bg) {
                btns.cancel = btns.cancel.replace(`cust-bg-style`, `background:${op.cancel.colors.bg}`);
            }
        }
        if (op.cancel && op.cancel.font) {
            btns.cancel = btns.cancel.replace(`cust-font-style;`, `font-family:${op.cancel.font}`);
        }
    }
    // bulmabox.vrb('replacing bg color!', op.cancel.colors.bg)

    //finally, get rid of any remaining "custom" placeholders
    let btnStr = '';
    btns.btnList.forEach(bn => {
        btnStr += btns[bn].replace(/cust-fg-style;/g, '').replace(/cust-bg-style;/g, '').replace(/-REPL/g, '').replace(/has-text-okay/g, '').replace(/has-text-cancel/g, '');
    });
    // btnStr = btnStr.replace(/cust-fg-style;/g, '').replace(/cust-bg-style;/g, '').replace(/-REPL/g, '').replace(/has-text-okay/g, '').replace(/has-text-cancel/g, '')
    return btnStr;
};

bulmabox.alert = (a, b, c, e) => {
    const theseParams = bulmabox.sortParams(a, b, c, false, e);
    if (!theseParams.cb) {
        theseParams.cb = function () { };
        // bulmabox.vrb(op, btnStr)
    }
    bulmabox.params.push(theseParams);
    const btns = bulmabox.getBtnData(theseParams, 'alert');
    bulmabox.dialog(theseParams, btns);
};

bulmabox.confirm = (a, b, c, e) => {
    const theseParams = bulmabox.sortParams(a, b, c, true, e);
    bulmabox.params.push(theseParams);
    const btns = bulmabox.getBtnData(theseParams, 'confirm');
    bulmabox.dialog(theseParams, btns);
};

bulmabox.prompt = (a, b, c, e) => {
    const theseParams = bulmabox.sortParams(a, b, c, true, e);
    theseParams.ms += `<br>\n    <div class='field'>\n        <div class='control'>\n            <input type="text" id="bulmabox-diag-txt" class='input'>\n        </div>\n    </div>`;
    bulmabox.params.push(theseParams);
    const btns = bulmabox.getBtnData(theseParams, 'prompt');
    bulmabox.dialog(theseParams, btns);
};

bulmabox.custom = (a, b, c, d, e) => {
    d = d || {};
    const theseParams = bulmabox.sortParams(a, b, c, false, e);
    bulmabox.params.push(theseParams);
    if (!d) {
        //no button(s) specified; create one
        d = bulmabox.getBtnData(theseParams, 'custom-default');
    }
    const btns = d.replace('bulmabox.params.cb',`"${theseParams.id}"`);
    bulmabox.vrb('prompt btns',btns);
    // bulmabox.vrb('custom d param',d)
    bulmabox.dialog(theseParams, btns);
};
bulmabox.kill = (id) => {
    const el = document.querySelector('#bulmabox-diag-' + id);
    bulmabox.params = bulmabox.params.filter(q => q.id != id);
    el.parentNode.removeChild(el);
};
bulmabox.runCb = (id,data, keepAlive) => {
    const params = bulmabox.params.find(q => q.id == id);
    // const cb = params;
    bulmabox.vrb('attempting to kill', id);
    if (!!params.cb) {
       params.cb(data);
    }
    //if keepAlive is true, we let the dialog stay open.
    if (keepAlive) return false;
    bulmabox.kill(id);
};

bulmabox.opts = (o) => {
    if (o && !!o.globalAlert) {
        // bulmabox.vrb('ran (maybe) cb for',params,id);
        window.alert = bulmabox.alert;
    }
    if (o && o.hfBg) {
        bulmabox.config.hfBg = o.hfBg;
    } else if (o && o.hfBg == null) {
        bulmabox.config.hfBg = '#f5f5f5';
    }
    if (o && o.mainBg) {
        bulmabox.config.mainBg = o.mainBg;
    } else if (o && o.hfBg === null) {
        bulmabox.config.mainBg = '#fff';
    }
    if (o.lang && Object.keys(bulmabox.allLangs).includes(o.lang)) {
        bulmabox.config.lang = o.lang;
    }
    if (o.centr || o.centr === false) {
        bulmabox.config.centr = o.centr;
    }
    if (o && !!o.reset) {
        //override and reset overrides
        bulmabox.config.lang = 'en';
        bulmabox.config.hfBg = '#f5f5f5';
        bulmabox.config.centr = false;
        bulmabox.config.mainBg = '#fff';
        bulmabox.config.vb=false;
    }
    if(o && !!o.vb){
        bulmabox.config.vb=true;
    }
};

bulmabox.dialog = (params, btns) => {
    //actual function to draw the dialog box, used by all 4(?) dialog generators including the custom one
    // const theParams = bulmabox.params.find(q=>q.id==id);
    const { tt, ms, id } = params;
    const diagDiv = document.createElement('div');
    diagDiv.className = 'modal is-active';
    diagDiv.id = 'bulmabox-diag-' + id;
    const headr = ms ? `<header class="modal-card-head" style='background:${bulmabox.config.hfBg};${bulmabox.config.centr ? "text-align:center" : ''}'>
    <p class="modal-card-title">${tt}</p>
    <button class="delete" aria-label='close' onclick="bulmabox.kill('${diagDiv.id}')"></button>
    </header>`: `<header class="modal-card-head has-background-white" style='background:${bulmabox.config.hfBg};${bulmabox.config.centr ? "text-align:center" : ''}'>
    bulmabox.vrb('tt', tt, 'ms', ms, 'btns', btns, 'id', id, 'params', params)
<p class="modal-card-title has-background-white"></p>
<button class="delete" aria-label='close' onclick="bulmabox.kill('${diagDiv.id}')"></button>
</header>`;
    diagDiv.innerHTML = `<div class="modal-background" onclick="bulmabox.kill('${diagDiv.id}')"></div>
    <div class="modal-card" style='top:10%;'>
    ${headr}
    <section class="modal-card-body" style='background: ${bulmabox.config.mainBg}'>
        ${ms ? ms : tt}
    </section>
    <footer class="modal-card-foot" style='background:${bulmabox.config.hfBg};${bulmabox.config.centr ? "text-align:center" : ''}'>
        ${btns}
    </footer>
</div>`;
    document.body.append(diagDiv);
};

if(!!module){
    module.exports = bulmabox;
}