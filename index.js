/*Firebase Section*/ 
const firebaseConfig = {
  apiKey: "AIzaSyA9lmndMfQONCD_nGsZmHKlD8rgL_tdwuU",
  authDomain: "vahid-8b90c.firebaseapp.com",
  databaseURL: "https://vahid-8b90c-default-rtdb.firebaseio.com",
  projectId: "vahid-8b90c",
  storageBucket: "vahid-8b90c.appspot.com",
  messagingSenderId: "566522669377",
  appId: "1:566522669377:web:0ade4c1dbddfba417c59c0",
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();
var yoxlama = [];
var users=[]
var usersKey=[]
var keyCounter=0
db.ref("/").on('value', function(snapshot){
  var n = Object.values(snapshot.val())
  for(let i=0;i<n.length;i++){
    users.push(n[i])
  }
})
/*Register Section */
$(`.register`).on('click', function(){
  $(`.first-section`).css({display: 'none'})
  $(`.register-section`).css({display: 'flex'})
})
$(`.register-button`).on('click', function(){
    var UserName = $(`.register-name-input`).val()
    var UserPassword = $(`.register-password-input`).val()
    for(let i=0;i<users.length;i++){
      if(users[i].UserName==UserName){
        return $(`.warning-p`).text(`This name is used! Please use another name.`);
      }
      
    }
    var z = db.ref("/").push({
      UserName,
      UserPassword,
      message: ""
    })
    localStorage.setItem("u-key",z.key)
    localStorage.setItem("Name", UserName)
    (window.location = `./message.html`)
})

/*Sign-in Section*/
$(`.sign-in-button`).on("click", function () {
  var nameInpValue = $(`.name-input`).val();
  localStorage.setItem("Name", nameInpValue);
  var passwordInpValue = $(`.password-input`).val();
  for(let i=0;i<users.length;i++){
    if(users[i].UserName==nameInpValue && users[i].UserPassword==passwordInpValue){
      return ([window.location = `./message.html`, localStorage.setItem('key-value',i)]
      )
    }
  }
  $(`.warning-p`).text(`User Name or Password is wrong! Please try again.`);
});
db.ref("/").on('value', function(snapshot){
  var j = Object.keys(snapshot.val())
  var t = Object.values(j)
  if(localStorage.getItem("u-key")){
  }
  else{
    localStorage.setItem('u-key',t[localStorage.getItem("key-value")])
  }
})
/*Emojis Section*/ 
var message;
var m = localStorage.getItem("u-key");
$(`.smile-button`).on("click", function(){
  $('.sticker-section').css({display: 'flex'})
})
$(`.sticker-exit`).on('click', function(){
  $('.sticker-section').css({display: 'none'})
})
$(`.stickers`).on('click', function(){
  message =this.dataset.text
  db.ref("/" + m + "/message").set(message);
})
/*Send Message Section */
$(`.send-button`).on("click", function () {
  message = $(`#text-input`).val();
    db.ref("/" + m + "/message").set(message);
  $(`#text-input`).val("");
  $("#text-input").attr("placeholder", "");
});
db.ref("/").on("value", function (snapshot) {
  var arr = Object.values(snapshot.val());
  var scrollElement = document.querySelector(".message-div");
  
  for (let i = 0; i < arr.length; i++) {
    if (yoxlama.includes(arr[i].message) !== true) {
      if(arr[i].message!==""){
        var p = $(
        `<div class="message-p"><h3>${arr[i].UserName}</h3> <p>${arr[i].message}</p></div><br>`
      );
      $(`.message-div`).append(p);
      }
      yoxlama.push(arr[i].message);
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }
});
yoxlama = [];
