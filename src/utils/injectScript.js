/* global document */

const injectScript = function injectScript(apiURL) {

	return new Promise((resolve, reject) => {

		const script = document.createElement("script");

		script.type = "text/javascript";	
		script.src = apiURL; 
		script.onload = resolve; 
		script.onerror = reject; 

		document.body.appendChild(script);

	}); 

};

export default injectScript;
