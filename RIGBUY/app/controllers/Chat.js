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




var chatTV;
var homeButtonSize = 50;
var adWindowHeight = 30;
var padding = 0.2;
var titleSize = 14;
var col_title = "black";
var col_back = "#ffD";var is_android = true;
var titleColor = "#fff";
var deviceWidth = Ti.Platform.displayCaps.platformWidth;
var imageSize = 60;
var descSize = 12;
var card_color = "#333";
var card_opacity = 0.5;
var rowMargin = 10;




function openChatWindow() {
	var chatContainer;
	if (OS_ANDROID) {
		chatContainer = Ti.UI.createView({
			top : 0,
			bottom : 0,
			left : 0,
			width : '100%',
			touchEnabled : true,
			backgroundColor : 'transparent'
		});
	} else {
		chatContainer = Ti.UI.createScrollView({
			top : 10,
			bottom : 0,
			left : 0,
			width : '100%',
			touchEnabled : true,
			backgroundColor : 'transparent',
			zIndex : 99,
		});
	}

	chatTV = Ti.UI.createScrollView({
		top : 0,
		left : 0,
		bottom : 60,
		right : 0,
		backgroundColor : 'white',
		width : '100%',
		layout : 'vertical',
		scrollType : "vertical"
	});
	chatContainer.add(chatTV);
	var viewTF = Ti.UI.createView({
		bottom : 0,
		left : 10,
		right:10,
		height : 60,
		
		zIndex : 99,
	});
	chatContainer.add(viewTF);
	
	var tfVW = Ti.UI.createView({
		
		width : '78%',
		left : 0,
		height : homeButtonSize - 10,
		opacity : 0.6,
		backgroundColor : 'white',
		borderColor : "gray",
		paddingLeft:10,
		borderRadius :(OS_IOS)? 20:25,
		
	});
	viewTF.add(tfVW);

	var chatBoxTF = Ti.UI.createTextField({
		
		
		left : 10,
		right:10,
		height : Ti.UI.FILL,
		
		hintText:"Type a message",
		hintTextColor:"gray",
		color : "black",
		paddingLeft:10,
		backgroundColor : 'white',
		font:{
			fontSize:14
		},
		returnKeyType : Titanium.UI.RETURNKEY_DONE
	});
	tfVW.add(chatBoxTF);

	

	var sendBtn = Ti.UI.createButton({
		title : 'Send',
		backgroundColor : 'transparent',
		right : 0,
		height : homeButtonSize - 10,
		width : '20%',
		color : titleColor,
		borderRadius : (OS_IOS)? 20:25,
		backgroundColor : "#BE3422",		
	});
	viewTF.add(sendBtn);
	
	viewTF.addEventListener('click',function(e){
		Ti.API.info("viewTF");
	}); 

	sendBtn.addEventListener('click', function(e) {
		Ti.API.info("Send button Clicked ");
		if (chatBoxTF.value == '') {
			// chatBoxTF.value = ' ';
			// chatBoxTF.hintText = 'You must enter message';
		}
		if (chatBoxTF.value != null && chatBoxTF.value.trim().length >0) {
		
			
			//var date = new Date();
			//var dateLabel = date.format("mmm d, HH:MM");

			addRow(chatBoxTF.value, "", "","", false);
			chatBoxTF.value = '';
		}
	});

	$.Chat.add(chatContainer);

}
openChatWindow();


function addRow(message, userName, date_val, emailId, config) {

	Ti.API.info("email : + "+ email + " config : "+ config);
	var email;
	userName = (userName == "" || userName == undefined || userName == null) ? "No Name" : userName;
	// if(emailId != null)
	// {
		// email = ((emailId).trim()).toLowerCase();
	// }
	 
	//var md_data = Titanium.Utils.md5HexDigest(email);
	//var gravatarUrl = "http://www.gravatar.com/avatar/" + md_data + "?s=100&r=g&d=404";
	//Ti.API.info("email : + "+ email);


	

	var row = Ti.UI.createView({
		
		backgroundColor : "transparent",
		height : Titanium.UI.SIZE,
		touchEnabled : false,
	});
	var cardViewBack = Ti.UI.createView({
		top : 5,
		height : Ti.UI.SIZE,
		width : (config && OS_ANDROID) ? "68%" : "85%",
		borderRadius : 5,
		
		
	});
	
	if (config) {
		//cardViewBack.left = deviceWidth / 10;
		cardViewBack.right = 10;
		cardViewBack.backgroundColor = "#BE3422";
		
	} else {
		cardViewBack.left = 10;
		//cardViewBack.right = deviceWidth / 10;
		cardViewBack.backgroundColor = "#E8E8E8";
		
	}
	row.add(cardViewBack);
	
	
	var profileView = Ti.UI.createView({
		width : imageSize / 1.4,
		height : imageSize / 1.4,
		borderRadius : (imageSize / 1.4) / 2,
		
		top : 5,
		bottom : 5,
		left : 10,
		zIndex : 99,
		backgroundColor : (config) ? "#6d1004" : "#303030",
	});
	cardViewBack.add(profileView);	

	var lblFL = Ti.UI.createLabel({
		text :"A",
		font : {
			fontWeight : 'bold',
			fontSize : descSize * 2
		},
		color : '#fff',
	});
	profileView.add(lblFL);
	var cardView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : "90%",
		borderRadius : padding / 2,
		layout : 'vertical',
		left : profileView.width+10, 
	});
	cardViewBack.add(cardView);

	var cardTopView = Ti.UI.createView({
		left : 0,
		right : 0,
		height : homeButtonSize / 3,
		width : cardView.width,
	});
	cardView.add(cardTopView);

	var cardBottomView = Ti.UI.createView({
		left : 0,
		right : 0,
		height : Ti.UI.SIZE,
		width : cardView.width,
	});
	cardView.add(cardBottomView);
	


	var nameLbl = Ti.UI.createLabel({
		top : 0,
		height : Titanium.UI.SIZE,
		textAlign : 'left',
		text : "Amit",
		font : {
			fontWeight : 'normal',
			fontSize : 10
		},
		color : (config) ? '#f9d6d2' : '#a4a4a4',
		left : 5,
	});

	var msgLbl = Ti.UI.createLabel({
		top : 0,
		left : 5,
		bottom : padding,
		height : Titanium.UI.SIZE,
		textAlign : 'left',
		text : message,
		font : {
			fontWeight : 'bold',
			fontSize : titleSize
		},
		color : (config) ? 'white' : 'black'
	});

	cardBottomView.add(msgLbl);

	cardTopView.add(nameLbl);
	// adjust the GUI possition
	if (config) {		 
		nameLbl.text = "Hemant";
		nameLbl.left = 15;
		profileView.right = 5;
		cardView.right = profileView.width;
		msgLbl.left = 15;
	} else {		
		nameLbl.text = "Dhiru";
		nameLbl.left = 15;
		profileView.left = 5;
		cardView.left = profileView.width;
		msgLbl.left = 15;
	}

	chatTV.add(row);
	chatTV.scrollToBottom();
}