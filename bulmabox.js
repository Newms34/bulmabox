'use strict';

var bulmabox = {
    currParams: null
};

//arg order: first string is title. second string (if present) is main 'body' message. function is callback

bulmabox.sortParams = function (a, b, c, d) {
    var p = {
        cb: null,
        tt: null,
        ms: null
    },
        needsCb = false,
        i = 0;
    //calback first
    for (i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'function') {
            p.cb = arguments[i];
            break;
        }
    }
    //now strings
    for (i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'string' && !p.tt) {
            p.tt = arguments[i];
        } else if (typeof arguments[i] == 'string' && !p.ms) {
            p.ms = arguments[i];
        }
    }
    //and callback req check
    for (i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'boolean') {
            needsCb = arguments[i];
            break;
        }
    }
    //now error handling
    if (!p.tt) {
        throw new Error('Bulmabox Dialogs require at least one string parameter for the title.');
    }
    if (!p.cb && needsCb) {
        throw new Error('Bulmabox Confirms and Prompts require a callback.');
    }
    return p;
};

bulmabox.alert = function (a, b, c) {
    bulmabox.params = bulmabox.sortParams(a, b, c);
    if (!bulmabox.params.cb) {
        bulmabox.params.cb = function () {};
    }
    var btns = '<button class=\'button is-info\' onclick=\'bulmabox.runCb(bulmabox.params.cb,true)\'>Okay</button>';
    bulmabox.dialog(bulmabox.params.tt, bulmabox.params.ms, btns);
};

bulmabox.confirm = function (a, b, c) {
    bulmabox.params = bulmabox.sortParams(a, b, c, true);
    var btns = '<button class=\'button is-success\' onclick=\'bulmabox.runCb(bulmabox.params.cb,true)\'>Okay</button><button class=\'button is-danger\' onclick=\'bulmabox.runCb(bulmabox.params.cb,false)\'>Cancel</button>';
    bulmabox.dialog(bulmabox.params.tt, bulmabox.params.ms, btns);
};

bulmabox.prompt = function (a, b, c) {
    bulmabox.params = bulmabox.sortParams(a, b, c, true);
    bulmabox.params.ms += '<br>\n    <div class=\'field\'>\n        <div class=\'control\'>\n            <input type="text" id="bulmabox-diag-txt" class=\'input\'>\n        </div>\n    </div>';
    var btns = '<button class=\'button is-success\' onclick=\'bulmabox.runCb(bulmabox.params.cb,document.querySelector("#bulmabox-diag-txt").value)\'>Okay</button><button class=\'button is-danger\' onclick=\'bulmabox.runCb(bulmabox.params.cb,false)\'>Cancel</button>';
    bulmabox.dialog(bulmabox.params.tt, bulmabox.params.ms, btns);
};

bulmabox.custom = function (a, b, c, d) {
    bulmabox.params = bulmabox.sortParams(a, b, c);
    if (!d) {
        d = '<button class=\'button is-info\' onclick=\'bulmabox.runCb(bulmabox.params.cb,true)\'>Okay</button>';
    }
    var btns = d;
    bulmabox.dialog(bulmabox.params.tt, bulmabox.params.ms, btns);
};
bulmabox.kill = function (id) {
    var el = document.querySelector('#' + id);
    el.parentNode.removeChild(el);
};
bulmabox.runCb = function (cb, data) {
    cb(data);
    bulmabox.kill('bulmabox-diag');
};

bulmabox.dialog = function (tt, msg, btns) {
    var diagDiv = document.createElement('div');
    diagDiv.className = 'modal is-active';
    diagDiv.id = 'bulmabox-diag';
    diagDiv.innerHTML = '\n<div class="modal-background" onclick=\'bulmabox.kill("' + diagDiv.id + '")\'></div>\n    <div class="modal-card">\n        <header class="modal-card-head">\n            <p class="modal-card-title">' + tt + '</p>\n            <button class="delete" aria-label="close" onclick=\'bulmabox.kill("' + diagDiv.id + '")\'></button>\n        </header>\n        <section class="modal-card-body">\n            ' + (msg || '') + '\n        </section>\n        <footer class="modal-card-foot">\n            ' + btns + '\n        </footer>\n    </div>\n\t';
    document.body.append(diagDiv);
};

module.exports = bulmabox;