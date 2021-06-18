function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
    window.location="index.html"
}
var firebaseConfig = {
    apiKey: "AIzaSyDjGHSwDTAi1PGtU6pSC941--hRCZSdPf8",
    authDomain: "kwitter-app-96439.firebaseapp.com",
    databaseURL: "https://kwitter-app-96439-default-rtdb.firebaseio.com",
    projectId: "kwitter-app-96439",
    storageBucket: "kwitter-app-96439.appspot.com",
    messagingSenderId: "1001898403013",
    appId: "1:1001898403013:web:b195167857227cbd3a7cac"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

roomname=localStorage.getItem("roomname")
username=localStorage.getItem("username")
function send(){
    message=document.getElementById("message").value;
    firebase.database().ref(roomname).push({
        name:username,
        message:message,
        like:0
    })
    document.getElementById("message").value="";
}
function getData(){
    firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") { firebase_message_id = childKey; message_data = childData;
    console.log(firebase_message_id);
    console.log(message_data)
    names=message_data['name']
    message=message_data['message']
    like=message_data['like']
    namewithtag="<h4>"+names+"<img class='user_tick' src='tick.png'></h4>";
    messagewithtag="<h4>"+message+"</h4>";
    likebutton="<button class='btn btn-warning' id="+firebase_message_id+"value="+like+" onclick='updateLike(this.id)'>";
    spanwidthtag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+" </span> </button><hr>"
    row=namewithtag+messagewithtag+likebutton+spanwidthtag;
    document.getElementById("output").innerHTML+=row
    }

}); }); } getData();

function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
    window.location="index.html";
}
function updateLike(message_id){
    console.log("clickedonthelikebutton"+message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updateLikes=Number(likes)+1
    console.log(updateLikes);
    firebase.database().ref(roomname).child(message_id).update({
        like:updateLikes
    })
}