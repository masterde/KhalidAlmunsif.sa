/* ===========================================================
# Lockscreen - v0.1.0
# ==============================================================
# Copyright (c) 2017 Baker Shamlan
# Licensed MIT.
*/

// Create an immediately invoked functional expression to wrap our code
(function () {

		// Define our constructor
		this.Lockscreen = function () {

				// Create global element references
				this.lockscreen = null;
				this.triggerButton = null;
				this.targetDiv = null;

				// Define option defaults
				var defaults = {
						password: 'password',
						promptText: 'Enter your private beta code to unlock the website',
						buttonText: 'Unlock Content',
						autoPrompt: false,
						autoLock: true,
						containerId: 'wrapper',
						maxWidth: '100%',
						minWidth: '100%'
				};
				// Create options by extending defaults with the passed in arugments
				if (arguments[0] && typeof arguments[0] === "object") {
						this.options = extendDefaults(defaults, arguments[0]);
				} else {
						this.options = defaults;
				}
				this.options.password = this.options.password.hashCode();

				buildOut.call(this);
				initializeEvents.call(this);

				if (this.options.autoPrompt === true) {
					this.ask();
				}

				if (this.options.autoLock === true) {
					this.lock();
				}


				if (this.options.containerId) {
						this.targetDiv = document.getElementById(this.options.containerId);
				} else {
						this.targetDiv = document.body;
				}

		}

		// Public Methods

		Lockscreen.prototype.ask = function() {
				var passwordAttempt = '';
				console.log('Ask called');
				var field = document.getElementById('lockscreenInput');
				if (field.value != '') {
						passwordAttempt = field.value;
				} else {
						passwordAttempt = String(prompt(this.options.promptText, ' '));
				}
				console.log(passwordAttempt);
				console.log(document.getElementById('lockscreenInput').value);
				this.unlock(passwordAttempt.hashCode());
				console.log('Ask ended');
		}

		// Lockscreen.prototype.input = function(el) {
		//     var passwordAttempt = '';
		//     // console.log('Ask called');
		//     if (document.getElementById('lockscreenInput')) {
		//         passwordAttempt = document.getElementById(el).value.hashCode();
		//     }
		//     passwordAttempt = document.getElementById(el).value.hashCode();
		//     console.log(passwordAttempt);
		//     this.unlock(passwordAttempt);
		//     // console.log('Ask ended');
		// }

		Lockscreen.prototype.unlock = function(passwordAttempt) {
			console.log('Unlock called');
				if (passwordAttempt === this.options.password) {
						// document.getElementById(this.options.targetDiv).style.display = '';
						this.targetDiv.style.display = '';
						this.lockscreen.style.display = 'none';
						// removeChild(this.lockscreen);
						console.log('Correct password');
				} else {
						document.getElementById('ERROR').innerHTML = "Incorrect code";
						console.log('Incorrect password');
				}
				console.log('Unlock ended');
		}

		// Modal.prototype.open = function() {
		Lockscreen.prototype.lock = function() {
			console.log('Lock called');
				console.log(this.options.password);
				this.lockscreen.style.display = '';
				// document.getElementById(this.options.targetDiv).style.display = 'none';
				this.targetDiv.style.display = 'none';
				console.log('Lock ended');
		}

		// Private Methods

		function buildOut() {

				var lockscreenFragment,
						lockscreenDiv,
						lockscreenButton,
						lockscreenButtonText;

				/*
		 * If content is an HTML string, append the HTML string.
		 * If content is a domNode, append its content.
		 */

				// Create a DocumentFragment to build with
				lockscreenFragment = document.createDocumentFragment();

				// Create lockscreen container element
				this.lockscreen = document.createElement("div");
				this.lockscreen.id = "lockscreen";
				this.lockscreen.style.minWidth = this.options.minWidth + "px";
				this.lockscreen.style.maxWidth = this.options.maxWidth + "px";

				// Create lockscreen div element
				var lockscreenDiv = document.createElement("div"); //.setAttribute();
				// lockscreenDiv.className = this.options.className;
				lockscreenDiv.style.margin = "0";
				lockscreenDiv.style.position = "absolute";
				lockscreenDiv.style.top = "50%";
				lockscreenDiv.style.left = "50%";
				lockscreenDiv.style.transform = "translate(-50%, -50%)";
				lockscreenDiv.className = "align-center";

				var lockscreenInput = document.createElement('div');
				lockscreenInput.appendChild(document.createElement('p')).setAttribute('id', 'ERROR');
				lockscreenInput.appendChild(document.createElement('input')).setAttribute('id', 'lockscreenInput');
				lockscreenInput.lastChild.setAttribute('type', 'text');
				lockscreenInput.lastChild.className = "align-center";
				lockscreenInput.lastChild.setAttribute('placeholder', this.options.promptText);
				lockscreenInput.lastChild.style = "width: 100%;";
				// console.log(lockscreenInput);
				lockscreenInput.className = "field";

				// Create lockscreen button and buttonText and appened to lockscreenDiv
				this.triggerButton = document.createElement("button");
				this.triggerButton.id = "lockscreenTrigger";
				this.triggerButton.type = "button";
				this.triggerButton.setAttribute("style", "width: 100%;");
				// var lockscreenButtonText = document.createTextNode(this.options.buttonText);
				this.triggerButton.appendChild(document.createTextNode(this.options.buttonText));
				// lockscreenDiv.appendChild(this.triggerButton);

				lockscreenInput.appendChild(this.triggerButton);
				lockscreenDiv.appendChild(lockscreenInput);

				// append lockscreenDiv to lockscreen container
				this.lockscreen.appendChild(lockscreenDiv);
				lockscreenFragment.appendChild(this.lockscreen);
				document.body.appendChild(lockscreenFragment);

				this.targetDiv = document.getElementById(this.options.targetDiv);
				// this.targetDiv.style.display = '';

		}

		function extendDefaults(source, properties) {
				var property;
				for (property in properties) {
						if (properties.hasOwnProperty(property)) {
								source[property] = properties[property];
						}
				}
				return source;
		}

		function initializeEvents() {

				this.targetDiv = document.getElementById(this.options.containerId);
				if (this.triggerButton) {
						this.triggerButton.addEventListener('click', this.ask.bind(this));
						this.lockscreenInput.addEventListener('keyup', function(e) {
							if (e.keyCode == 13)
								this.unlock();
						});
				}
				document.getElementById('lockscreenInput').addEventListener('onkeyup', this.ask.bind(this));
				// document.addEventListener("keyup", keyUpTextField, false);
		}


function keyUpTextField(e) {
	var keyCode = e.keyCode;
		if (keyCode==13) {
			Lockscreen.unlock(e.value);
		}
		else {
		e.preventDefault();
		}
}

}());

String.prototype.hashCode = function() {
		var hash = 0;
		if (this.length == 0)
				return hash;
		for (var i = 0; i < this.length; i++) {
				var character = this.charCodeAt(i);
				hash = ((hash << 5) - hash) + character;
				hash = hash & hash;
				// Convert to 32bit integer
		}
		return hash;
}
// var myContent = document.getElementById('wrapper');
BetaLockscreen = new Lockscreen({
	password: '504813424',
	promptText: 'Enter your private code',
	buttonText: 'Unlock Website'
});
