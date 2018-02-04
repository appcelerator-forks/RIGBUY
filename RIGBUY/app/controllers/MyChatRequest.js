// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;
function openFunc(e) {
	if (OS_ANDROID) {
		if (this.getActivity()) {
			// need to explicitly use getXYZ methods
			var actionBar = this.getActivity().getActionBar();

			if (actionBar) {
				// Now we can do stuff to the actionbar
				actionBar.setTitle('My Chat Request');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.MyChatRequest.close();
				});
			}
		}
	}
}

var index = 0;
var tableRowObj;
function tableClickFunc(e) {
	tableRowObj= e.row;
	if(e.source.name == "accept"){
		approvedChatService(e.row.detail,1);
	}else if(e.source.name == "delete"){
		approvedChatService(e.row.detail,0);
	}else if(e.source.name == "chat"){
		var obj ={};
		obj.from = "chatList";
		obj.data = e.row.detail;
		var chatScreen = Alloy.createController("Chat",obj).getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(chatScreen);
		} else {
			chatScreen.open();
		}
		chatScreen.oldWin = $.MyChatRequest;
		Alloy.Globals.currentWindow = chatScreen;
	}

}

var productRow = function(detail) {
	tableData = [];
	for (var i = 0; i < detail.length; i++) {

		var tableRow = Ti.UI.createTableViewRow({
			touchEnabled : true,

			height : Ti.UI.SIZE,
			layout : "vertical",
			detail : detail[i],
			selectedBackgroundColor : "#F8F8F9"
		});

		tableRow.add(Ti.UI.createLabel({
			top : 6,
			left : 10,
			right : 10,

			text : detail[i].first_name,
			color : "black",
			font : {
				fontSize : 15 * Alloy.Globals.scaleFactor
			},

			textAlign : "left",

		}));

		tableRow.add(Ti.UI.createLabel({
			top : 6,

			left : 10,
			right : 10,
			text : detail[i].product_name,
			color : "gray",
			font : {
				fontSize : 13 * Alloy.Globals.scaleFactor
			},

			textAlign : "left",

		}));
		tableRow.add(Ti.UI.createLabel({
			top : 6,

			left : 10,
			right : 10,
			text : detail[i].msg,
			color : "gray",
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},

			textAlign : "left",

		}));

		tableRow.add(Ti.UI.createView({
			top : 6,
			left : 10,
			right : 10,
			height : (OS_ANDROID) ? 35 * Alloy.Globals.scaleFactor : 30 * Alloy.Globals.scaleFactor,

		}));
		//3-0

		tableRow.getChildren()[3].add(Ti.UI.createButton({
			left : 0,
			width : "42%",
			name : "accept",
			height : Ti.UI.FILL,
			title : "Accept",
			visible : (detail[i].status == 0) ? true : false,
			borderColor : "#f54224",
			borderWidth : 1,
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},
			color : "#f54224",
			selectedColor : "black",
			backgroundImage : "none"
		}));
		//3-1
		tableRow.getChildren()[3].add(Ti.UI.createButton({
			right : 0,
			width : "42%",
			name : "delete",
			height : Ti.UI.FILL,
			visible : (detail[i].status == 0) ? true : false,
			title : "Declined",
			borderColor : "#f54224",
			borderWidth : 1,
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},
			color : "#f54224",
			selectedColor : "black",
			backgroundImage : "none"
		}));

		//3-2
		tableRow.getChildren()[3].add(Ti.UI.createButton({
			left : 0,
			right : 0,
			name : "chat",
			visible : (detail[i].status == 0) ? false : true,
			height : Ti.UI.FILL,
			title : "Chat",
			borderColor : "#f54224",
			borderWidth : 1,
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},
			color : "#f54224",
			selectedColor : "black",
			backgroundImage : "none"
		}));

		tableRow.add(Ti.UI.createLabel({
			top : 6,
			text : "",
			height : 0

		}));

		tableData.push(tableRow);
	}
	$.myChatTable.setData(tableData);
};
productRow(args);
var chatStatus = 0;
function approvedChatService(detail,status) {
	var obj = {};
	obj.toId = detail.toId;
	obj.fromId = detail.fromId;
	obj.itemId = detail.itemId;
	obj.status = status;
	chatStatus = status;
	Ti.API.info('OBJ : ' + JSON.stringify(obj));
	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=chat&actionMethod=approveChatRequest", approvedChatServiceCallback, obj);
		
	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

function approvedChatServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					if(chatStatus ==0){
						Alloy.Globals.Alert("Chat request denied succefully");
					}else if(chatStatus==1){
						Alloy.Globals.Alert("Chat request accepted succefully");
						tableRowObj.getChildren()[3].getChildren()[0].visible = false;
						tableRowObj.getChildren()[3].getChildren()[1].visible = false;
						tableRowObj.getChildren()[3].getChildren()[2].visible = true;
					}
					
				} else {
					Alloy.Globals.Alert(response.msg);
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error approvedChatServiceCallback :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

	Alloy.Globals.LoadingScreen.close();

}

