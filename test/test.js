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