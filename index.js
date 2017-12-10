//test stuff 
var doAlert = function() {
    bulmabox.alert('Hello', 'Greetings, stranger!', function() {
        document.querySelector('#result').innerText = 'Result of dialog: User was greeted by an alert.'
    })
}
var doConfirm = function() {
    bulmabox.confirm('Something Important', 'Are you sure about this?', function(data) {
        document.querySelector('#result').innerText = 'Result of dialog: User was asked to confirm something. They said: ' + data;
    })
}
var doPrompt = function() {
    bulmabox.prompt('Needs Info', 'Tell me something!', function(data) {
        document.querySelector('#result').innerText = 'Result of dialog: User was prompted for info. They said: ' + data
    })
}
var doCustom = function() {
    bulmabox.custom('A Custom Title','<div class="is-size-1">Hi!</div>Custom stuff<br/>Yes<input type="radio" name="choice" id="custom-result" value="yes" checked><br/>No<input type="radio" name="choice" value="no">',function(){
    	 document.querySelector('#result').innerText = 'Result of dialog: User saw a custom dialog and picked:'+document.querySelector('#custom-result').checked;
    },`<button class='button is-info' onclick='bulmabox.runCb(params.cb,true)'>Got it!</button>`)
}

//actual bulmabox stuff
var bulmabox = {};

//arg order: first string is title. second string (if present) is main 'body' message. function is callback

bulmabox.sortParams = function(a, b, c, d) {
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
        throw new Error('Bulmabox Dialogs require at least one string parameter for the title.')
    }
    if (!p.cb && needsCb) {
        throw new Error('Bulmabox Confirms and Prompts require a callback.')
    }
    console.log('final params:', p, needsCb)
    return p;
}

bulmabox.alert = function(a, b, c) {
    params = bulmabox.sortParams(a, b, c);
    if(!params.cb){
    	params.cb = function(){

    	};
    }
    var btns = `<button class='button is-info' onclick='bulmabox.runCb(params.cb,true)'>Okay</button>`;
    bulmabox.dialog(params.tt,params.ms,btns);
};

bulmabox.confirm = function(a, b, c) {
    params = bulmabox.sortParams(a, b, c, true);
    var btns = `<button class='button is-success' onclick='bulmabox.runCb(params.cb,true)'>Okay</button><button class='button is-danger' onclick='bulmabox.runCb(params.cb,false)'>Cancel</button>`;
    bulmabox.dialog(params.tt,params.ms,btns);
};

bulmabox.prompt = function(a, b, c) {
    params = bulmabox.sortParams(a, b, c, true);
    params.ms+=`<br>
    <div class='field'>
        <div class='control'>
            <input type="text" id="bulmabox-diag-txt" class='input'>
        </div>
    </div>`
    var btns = `<button class='button is-success' onclick='bulmabox.runCb(params.cb,document.querySelector("#bulmabox-diag-txt").value)'>Okay</button><button class='button is-danger' onclick='bulmabox.runCb(params.cb,false)'>Cancel</button>`;
    bulmabox.dialog(params.tt,params.ms,btns);
};

bulmabox.custom = function(a, b, c, d) {
    params = bulmabox.sortParams(a, b, c);
    if(!d){
    	d=`<button class='button is-info' onclick='bulmabox.runCb(params.cb,true)'>Okay</button>`
    }
    var btns=d;
    bulmabox.dialog(params.tt,params.ms,btns)
};
bulmabox.kill = function(id){
	var el = document.querySelector('#'+id);
	el.parentNode.removeChild(el);
}
bulmabox.runCb = function(cb,data){
	cb(data);
	bulmabox.kill('bulmabox-diag');
}

bulmabox.dialog = function(tt,msg,btns) {
    var diagDiv = document.createElement('div');
    diagDiv.className = 'modal is-active';
    diagDiv.id = 'bulmabox-diag';
    diagDiv.innerHTML = `
<div class="modal-background" onclick='bulmabox.kill("${diagDiv.id}")'></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">${tt}</p>
            <button class="delete" aria-label="close" onclick='bulmabox.kill("${diagDiv.id}")'></button>
        </header>
        <section class="modal-card-body">
            ${msg||''}
        </section>
        <footer class="modal-card-foot">
            ${btns}
        </footer>
    </div>
	`;
	document.body.append(diagDiv);
};

module.exports=bulmabox