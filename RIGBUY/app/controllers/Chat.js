// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
function openFunc(e){
	
if (OS_ANDROID) {

	if (this.getActivity()) {
		// need to explicitly use getXYZ methods
		var actionBar = this.getActivity().getActionBar();

		if (actionBar) {
			// Now we can do stuff to the actionbar
			actionBar.setTitle('Chat');

			actionBar.setDisplayHomeAsUp(true);
			// show an angle bracket next to the home icon,
			// indicating to users that the home icon is tappable
			

			// toggle the left window when the home icon is selected
			actionBar.setOnHomeIconItemSelected(function() {
				$.Chat.close();
			});
		}
	}
}
}