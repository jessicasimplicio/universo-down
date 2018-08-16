var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1]; 
var friendsList = [];

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
});

$(document).ready(function(){

	database.ref('users/' + USER_ID).once('value')
		.then(function(snapshot) {
  		$(".name").append(`${snapshot.val().name}`);  		
		});

	//carrega coisas já salvas no feed 
	database.ref('posts/' + USER_ID).once('value')
		.then(function(snapshot) {
  		snapshot.forEach(function(childSnapshot) {
  			var childKey = childSnapshot.key; 
  			var childData = childSnapshot.val();
  			$(".posts-list").prepend(`
  				<p>
  					${childData.text}</br>
  					${childData.date} </br>
  					<button class="delete" data-post-id="${childKey}">Apaga</button>
  					<button class="edit" data-post-id="${childKey}">Edita</button>
  				</p>
  			`);

  			$(`button.delete[data-post-id="${childKey}"]`).click(function() {	
					database.ref('posts/' + USER_ID + "/" + childKey).remove();
					$(this).parent().remove();
				}); 	
  		});
		});

	//Salva no  DB
	$(".add-posts").click(function(event) {
		event.preventDefault();
		var newTask = $(".posts-input").val();
		var date = moment().subtract(6, 'days').calendar(); 
		var postFromDB = database.ref('posts/' + USER_ID).push({ //adiciona no banco de dados
  		text: newTask,
  		date: date
 			});
			console.log(postFromDB.key);
			$(".posts-list").prepend(`
			<p>
				${newTask} </br> 
				${date} </br>
				<button class="delete" data-post-id=${postFromDB.key}>Apaga</button>
  			<button class="edit" data-post-id=${postFromDB.key}>Edita</button>
			<p>`);

		$(`button.delete[data-post-id="${postFromDB.key}"]`).click(function() {	
			database.ref('posts/' + USER_ID + "/" + postFromDB.key).remove();
			$(this).parent().remove();
		});
		$(`button.edit[data-post-id="${postFromDB.key}"]`).click(function() {	
		});
	});

	$()

	$(".people-list").click(function(){
		window.location = "friends.html?id=" + USER_ID; 
	})
	
	//pega todos os amigos:
	database.ref('friendship/' + USER_ID).once('value')
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var myFriendId = childSnapshot.val().friendId;
				var myFriendName = childSnapshot.val().friendName;
				friendsList.push(myFriendId); // ========>>>VER o q fazer com esse arr
				showFriendPosts(myFriendId, myFriendName);
			})
		})

	//posta as publicações dos amigos:
	function showFriendPosts(myFriendId, myFriendName) {
		database.ref('posts/' + myFriendId).once('value')
		.then(function(snapshot) {
			//pega todos os amigos:
			snapshot.forEach(function(childSnapshot) {
				var myFriendTask = childSnapshot.val().text;
				var myFriendTaskDate = childSnapshot.val().date;
				$(".posts-list").append(`<li>${myFriendName}:</br>${myFriendTask} </br> ${myFriendTaskDate} </li>`); 

			});
		});
	}

	$(".logo").click(function() {
		window.location = "newsfeed.html?id=" + USER_ID;
	})

/*
///=================CHECAR ESSA PARTE =============================================
	database.ref('posts/').on('value', function(snapshot) {
			$(".posts-list").html("");
			console.log("MUDANCA")
			console.log(snapshot.val()); //situacao atual do banco: mostra o que tem dentro de tasks
			snapshot.forEach(function(childSnapshot){
				//console.log(childSnapshot.val()); //vai mostrar cada idUser dentro de task

				for (var id of friendsList) {
					if (childSnapshot.val() ===  id){
						var myFriendTask = childSnapshot.val().text;
						var myFriendTaskDate = childSnapshot.val().date;
						$(".tasks-list").append(`<li>${myFriendTask} </br> ${myFriendTaskDate} </li>`);
					}

				}
				 
			});
		});
	//=====================================================================================	
	*/
});


