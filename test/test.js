//test stuff 
const doAlert = () => {
    bulmabox.alert('Hello', 'Greetings, stranger!', () => {
        document.querySelector('#result').innerText = 'Result of dialog: User was greeted by an alert.'
    })
}, doConfirm = () => {
    bulmabox.confirm('Something Important', 'Are you sure about this?', (data) => {
        document.querySelector('#result').innerText = 'Result of dialog: User was asked to confirm something. They said: ' + data;
    })
}, doPrompt = () => {
    bulmabox.prompt('Needs Info', 'Tell me something!', (data) => {
        document.querySelector('#result').innerText = 'Result of dialog: User was prompted for info. They said: ' + data
    })
}, doCustom = () => {
    bulmabox.custom('A Custom Title', '<div class="is-size-1">Hi!</div>Custom stuff<br/>Yes<input type="radio" name="choice" id="custom-result" value="yes" checked><br/>No<input type="radio" name="choice" value="no">', () => {
        document.querySelector('#result').innerText = 'Result of dialog: User saw a custom dialog and picked:' + document.querySelector('#custom-result').checked;
    }, `<button class='button is-info' onclick='bulmabox.runCb(bulmabox.params.cb,true)'>Got it!</button>`)
}, doLatin = () => {
    bulmabox.alert('Salve!', 'Loquaris Latine!', () => {
        document.querySelector('#result').innerText = 'Result of dialog: User showed strength and honor.'
    }, { lang: 'la' })
}, doBtns = () => {
    bulmabox.confirm('Custom Buttons', 'You can customize your buttons. Do you like dogs?', (data) => {
        document.querySelector('#result').innerText = 'Result of dialog: User ' + (!!data ? 'does' : 'does not') + ' like dogs.'
    }, {
        okay: {
            txt: 'Indeed!',
            colors: { fg: '#00f', bg: '#090' }
        },
        cancel: {
            txt: 'No! Bad dogs!',
            colors: { fg: '#ff0', bg: '#900' }
        }
    })
}, doFont = () => {
    bulmabox.alert('Custom Font', `Sometimes the default font-family is boring. Don't worry; we got you covered!`, {
        okay: {
            font:'Papyrus'
        }
    })
}, doGlobal = () => {
    bulmabox.opts({ globalAlert: true });
    alert('This message was produced with bulmabox! Try it in the console if you want: alert("some text")!')
}, doGlobalFrench = () => {
    bulmabox.opts({ lang: 'fakeFrench' });
    bulmabox.alert('Set Global language', 'The global button language is now (fake) French!!')
}, doGlobalHFBg = () => {
    bulmabox.opts({ hfBg: '#bbf' });
    bulmabox.alert('Set Global Header/Footer Background', 'The global header and footer backgrounds are now blue!')
}, doGlobalMBg = () => {
    bulmabox.opts({ mainBg: '#bfb' });
    bulmabox.alert('Set Global Main Background', 'The global main background is now green!')
}, doGlobalReset = () => {
    bulmabox.opts({ reset: true });
    bulmabox.alert('Reset Globals', "Everything's back to normal!")
};