export default component => {

		/*----------  Save reference to original setState() method  ----------*/
		
		component._superSetState = component.setState.bind(component); 

		/*----------  Override setState() to be promisified  ----------*/
		
		return nextState => {

			return new Promise(resolve => {

				component._superSetState(nextState, resolve); 

			}); 

		}; 

};
