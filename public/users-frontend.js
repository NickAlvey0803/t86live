document.addEventListener('DOMContentLoaded', bindButtons)
document.addEventListener('DOMContentLoaded', bindButtons2)
document.addEventListener('DOMContentLoaded', bindButtons3)

function bindButtons(){
  document.getElementById('userSubmit').addEventListener('click', function(event){
      var req = new XMLHttpRequest();
      var payload = {username:null, password:null, description:null, user_score:null};
      payload.username = document.getElementById('username').value;
      payload.password = document.getElementById('password').value;
      payload.description = document.getElementById('description').value;
      payload.user_score = document.getElementById('user_score').value;

      
      console.log('http://flip3.engr.oregonstate.edu:52114/users/insert?username=' + payload.username + '&password=' 
        + payload.password + '&description='+ payload.description + '&user_score=' + payload.user_score);

      req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/users/insert?username=' + payload.username + '&password=' 
        + payload.password + '&description='+ payload.description + '&user_score=' + payload.user_score);
      


      req.setRequestHeader('Content-Type', 'application/json');

      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
      req.send(null);
      //event.preventDefault();
    });
};

// if(document.getElementById('deleteSubmit') !== null){
function bindButtons2(){
     document.getElementById('deleteSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {user_id:null};
        payload.user_id = getElementById("user_id").value;
        console.log(payload.user_id)

        req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/users/delete?username=' + payload.user_id, true);

        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load',function(){
          if(req.status >= 200 && req.status < 400){
            
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
        req.send(null);
    //event.preventDefault();
  });
}


function bindButtons3(){
     document.getElementById('editSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {user_id_edit:null, password_edit:null, description_edit:null, user_score_edit:null};
        payload.user_id_edit = getElementById("user_id_edit").value;
        payload.password_edit = document.getElementById('password_edit').value;
        payload.description_edit = document.getElementById('description_edit').value;
        payload.user_score_edit = document.getElementById('user_score_edit').value;


        req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/users/edit?username=' + payload.user_id_edit + '&password=' 
        + payload.password_edit + '&description='+ payload.description_edit + '&user_score=' + payload.user_score_edit, true);

        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load',function(){
          if(req.status >= 200 && req.status < 400){
            
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
        req.send(null);
    //event.preventDefault();
  });
}