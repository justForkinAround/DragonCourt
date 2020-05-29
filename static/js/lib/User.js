var User = {
	id: 0,
	name: '',
	firstRun: 1,
	hasChar: 0,
	chat: 0,
	token: '',
	init: () => {
		Socket.on("login-success", (data) => {
			console.log("login-success processed");
			console.log(data);
			
			User.id = data.user.id;
			User.name = data.user.name;
			User.firstRun = data.user.firstRun;
			User.hasChar = data.user.hasChar;
			User.chat = data.user.chat;
			User.token = data.token;
			
			localStorage.setItem('userId', User.id);
			localStorage.setItem('userName', User.name);
			localStorage.setItem('userFirstRun', User.firstRun);
			localStorage.setItem('userHasChar', User.hasChar);
			localStorage.setItem('userChat', User.chat);
			localStorage.setItem('userToken', User.token);
			
			setCookie('uid', User.id, 365);
			
			window.location = "http://"+DC.host+":"+DC.port+"/game";
		});
		
		Socket.on("login-failed", (data) => {
			window.location = "http://"+DC.host+":"+DC.port+data.redirect;
		});
		
		Socket.on("register-success", (data) => {
			window.location = "http://"+DC.host+":"+DC.port+data.redirect;
		});
		
		Socket.on("logout-success", (data) => {
			localStorage.removeItem("userId");
			localStorage.removeItem("userName");
			localStorage.removeItem("userFirstRun");
			localStorage.removeItem("userHasChar");
			localStorage.removeItem("userChat");
			localStorage.removeItem("userToken");
		});
		
		Socket.on("user-update-incoming", (data) => {
		
		});
		
		Socket.on("user-get-success", (data) => {
			User.id = data.user.u_id;
			User.name = data.user.u_name;
			User.firstRun = data.user.u_first_run;
			User.hasChar = data.user.u_has_char;
			User.chat = data.user.u_chat;
			User.token = data.token;
		});
	},
	load: () => {
		User.id = localStorage.userId;
		User.name = localStorage.userName;
		User.firstRun = localStorage.userFirstRun;
		User.hasChar = localStorage.userHasChar;
		User.chat = localStorage.userChat;
		User.token = localStorage.userToken;
	}
};