var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1]; 
var friendsList = [];

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
});

$(document).ready(function(){

	//carrega coisas já salvas no feed 
	database.ref('posts/' + USER_ID).once('value')
		.then(function(snapshot) {
  		//console.log(snapshot.val()); //Pega as tarefas do usuario
  		snapshot.forEach(function(childSnapshot) {
  			var childKey = childSnapshot.key; 
  			var childData = childSnapshot.val();
  			$(".tasks-list").prepend(`<textarea>${childData.text} </br> ${childData.date}</textarea>`); 
  			
  		})
		});

	//Salva no  DB
	$(".add-tasks").click(function(event) {
		event.preventDefault();
		var newTask = $(".tasks-input").val();
		var date = moment().subtract(6, 'days').calendar(); 
		database.ref('tasks/' + USER_ID).push({ //adiciona no banco de dados
  		text: newTask,
  		date: date
 		});
		$(".tasks-list").prepend(`<li>${newTask} </br> ${date} </li>`); //mostra na tela assim que adiciona
	})

	/*$(".people-list").click(function(){
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
		database.ref('tasks/' + myFriendId).once('value')
		.then(function(snapshot) {
			//pega todos os amigos:
			snapshot.forEach(function(childSnapshot) {
				var myFriendTask = childSnapshot.val().text;
				var myFriendTaskDate = childSnapshot.val().date;
				$(".tasks-list").append(`<li>${myFriendName}:</br>${myFriendTask} </br> ${myFriendTaskDate} </li>`); 

			});
		});
	}


///=================CHECAR ESSA PARTE =============================================
	database.ref('tasks/').on('value', function(snapshot) {
			$(".tasks-list").html("");
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


