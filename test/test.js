//test stuff 
var doAlert = function () {
    bulmabox.alert('Hello', 'Greetings, stranger!', function () {
        document.querySelector('#result').innerText = 'Result of dialog: User was greeted by an alert.'
    })
}
var doConfirm = function () {
    bulmabox.confirm('Something Important', 'Are you sure about this?', function (data) {
        document.querySelector('#result').innerText = 'Result of dialog: User was asked to confirm something. They said: ' + data;
    })
}
var doPrompt = function () {
    bulmabox.prompt('Needs Info', 'Tell me something!', function (data) {
        document.querySelector('#result').innerText = 'Result of dialog: User was prompted for info. They said: ' + data
    })
}
var doCustom = function () {
    bulmabox.custom('A Custom Title', '<div class="is-size-1">Hi!</div>Custom stuff<br/>Yes<input type="radio" name="choice" id="custom-result" value="yes" checked><br/>No<input type="radio" name="choice" value="no">', function () {
        document.querySelector('#result').innerText = 'Result of dialog: User saw a custom dialog and picked:' + document.querySelector('#custom-result').checked;
    }, `<button class='button is-info' onclick='bulmabox.runCb(bulmabox.params.cb,true)'>Got it!</button>`)
}

var doLatin = function () {
    bulmabox.alert('Salve!', 'Loquaris Latine!', function () {
        document.querySelector('#result').innerText = 'Result of dialog: User showed strength and honor.'
    }, { lang: 'la' })
}

var doBtns = function () {
    bulmabox.confirm('Custom Buttons', 'You can customize your buttons. Do you like dogs?', function (data) {
        document.querySelector('#result').innerText = 'Result of dialog: User ' + (!!data ? 'does' : 'does not') + ' like dogs.'
    }, {
        okay: {
            txt: 'Yep! Good doggies!',
            colors:{ fg:'#00f', bg: '#090'}
        },
        cancel: {
            txt: 'No! Bad dogs!',
            colors: {fg:'#ff0', bg: '#900'}
        }
    })
}