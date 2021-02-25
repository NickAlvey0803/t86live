

document.addEventListener('DOMContentLoaded', bindButtons)

function bindButtons(){
  document.getElementById('workoutSubmit').addEventListener('click', function(event){
      var req = new XMLHttpRequest();
      var payload = {category:null, weight:null, uploader_weight:null, light_score:null};
      payload.category = document.getElementById('category').value;
      payload.weight = document.getElementById('weight').value;
      payload.uploader_weight = document.getElementById('uploader_weight').value;
      payload.light_score = document.getElementById('light_score').value;

      
      console.log('http://flip3.engr.oregonstate.edu:34901/insert?name=' + payload.name + '&reps=' 
        + payload.reps + '&weight='+ payload.weight + '&date=' + payload.date + '&lbs=' + payload.lbs)

      req.open('GET', 'http://flip3.engr.oregonstate.edu:34901/insert?name=' + payload.name + '&reps=' 
        + payload.reps + '&weight='+ payload.weight + '&date=' + payload.date + '&lbs=' + payload.lbs, true);
      


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
      event.preventDefault();
    });
};