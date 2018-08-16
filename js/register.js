var database = firebase.database();

$(document).ready(function(){

	$(".sign-up-button").click(function(event) {
		event.preventDefault();
		var name = $(".sign-up-name").val()
		var email = $(".sign-up-email").val();
		var password = $(".sign-up-password").val();
		var USER_ID = '';

		console.log(email, password);

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(response) {
			console.log(response);
			USER_ID = response.user.uid;
			window.location = "newsfeed.html?id=" + USER_ID;

			//adiciona no banco de dados
			database.ref('users/' + USER_ID).set({
  			email: email,
  			name: name,
  			password: password
 			});

		})
		.catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(errorCode, errorMessage);
		});	

	})

})