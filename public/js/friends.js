var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){

	database.ref('users').once('value')
		.then(function(snapshot) {
			var people = []; 
			snapshot.forEach(function(childSnapshot) {
				if(USER_ID !== childSnapshot.key ){
					var peopleId = childSnapshot.key;
					var childData = childSnapshot.val();
					$(".show-people").append(`<li class="list-group list-group-flush"><a>${childData.name}</a></li>`);
					$(".show-people").append(`<button class="follow" people-id=${peopleId}>Follow</button>`);

					$(`button.follow[people-id="${peopleId}"]`).click(function() {
						storeInDB(peopleId, childData.name);
						$(`button.follow[people-id="${peopleId}"]`).toggle();

					});
				}
			});
		});

	function storeInDB(peopleId, name) {
		database.ref('friendship/' + USER_ID).push({
			friendName: name,
			friendId: peopleId
		});
	}

	$(".logo").click(function() {
		window.location = "newsfeed.html?id=" + USER_ID;
	})

});
