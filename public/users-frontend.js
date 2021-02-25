document.addEventListener('DOMContentLoaded', bindButtons)

function bindButtons(){
  document.getElementById('userSubmit').addEventListener('click', function(event){
      var req = new XMLHttpRequest();
      var payload = {username:null, password:null, description:null, user_score:null};
      payload.username = document.getElementById('username').value;
      payload.password = document.getElementById('password').value;
      payload.description = document.getElementById('description').value;
      payload.user_score = document.getElementById('user_score').value;

      
      console.log('http://flip3.engr.oregonstate.edu:34901/insert?username=' + payload.username + '&password=' 
        + payload.password + '&description='+ payload.description + '&user_score=' + payload.user_score)

      req.open('GET', 'http://flip3.engr.oregonstate.edu:34901/insert?username=' + payload.username + '&password=' 
        + payload.password + '&description='+ payload.description + '&user_score=' + payload.user_score);
      


      req.setRequestHeader('Content-Type', 'application/json');

      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          var response = JSON.parse(req.responseText);
          // document.getElementById('temp').textContent = response.main.temp + " degrees";
          // document.getElementById('feels_like').textContent = response.main.feels_like + " degrees";
          // document.getElementById('humidity').textContent = response.main.humidity + "%";
          // document.getElementById('description').textContent = response.weather[0].description;
          // document.getElementById('temp_max').textContent = response.main.temp_max + " degrees";
          // document.getElementById('temp_min').textContent = response.main.temp_min + " degrees";
          console.log(response)
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
      req.send(null);
      // event.preventDefault();
    });
};