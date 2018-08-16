var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1]; 

$(document).ready(function(){

	database.ref('users').once('value')
		.then(function(snapshot) {
			var people = [];
			//console.log(snapshot.val());
			snapshot.forEach(function(childSnapshot) {
				//console.log(childSnapshot.val());
				if(USER_ID !== childSnapshot.key ){
					var peopleId = childSnapshot.key;
					var childData = childSnapshot.val();
					$(".show-people").append(`<li><a>${childData.name}</a></li>`);
					$(".show-people").append(`<button class="follow" people-id=${peopleId}>Follow</button>`);

					$(`button.follow[people-id="${peopleId}"]`).click(function() {	
						storeInDB(peopleId, childData.name);
					});
				}
			});	
		});

	//Salva amigo no DB
	function storeInDB(peopleId, name) {
		database.ref('friendship/' + USER_ID).push({
			friendName: name,
			friendId: peopleId
		});		
	}
		

});
