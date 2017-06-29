(function () {

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
				containerId: 'wrapper'
		};
		// Create options by extending defaults with the passed in arugments
		if (arguments[0] && typeof arguments[0] === "object") {
				this.options = extendDefaults(defaults, arguments[0]);
		} else {
				this.options = defaults;
		}

		console.log(this.options);
		this.options.password = this.options.password.hashCode();
		this.targetDiv = this.containerId ? document.getElementById(this.containerId)
		: document.body;

	}

	Lockscreen.prototype.lock = function() {
		this.targetDiv.style.display = 'none';
		console.log(this);
		document.getElementById('lockscreen').style.display = '';
	}

	function buildLockscreen() {

		// create our markup
		var markup = `
		 <div style="margin: 0; position: absolute; top: 50%; left: 50%; translate(-50%, -50%);" class="align-center" >
		    <div class="field">
					<p class="error"></p>
					<input type="text" name="lockscreenInput" id="lockscreenInput" placeholder=${this.options.promptText}>
					<button type="button" name="lockscreenTrigger" id="lockscreenTrigger">
							${this.options.buttonText}
					</button>
		    </div>
		 </div>
		`;

		// Create a DocumentFragment to build with
		var fragment = document.createDocumentFragment();

		// Create lockscreen container element
		this.lockscreen = document.createElement("div");
		this.lockscreen.id = "lockscreen";
		fragment.appendChild(this.lockscreen);
		this.lockscreen.innerHTML = markup;

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

PrivateBeta = new Lockscreen({
	password: '1',
	promptText: 'Enter your beta code',
	buttonText: 'Unlock!'
});
