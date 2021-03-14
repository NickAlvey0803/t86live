document.addEventListener('DOMContentLoaded', bindButtons)
document.addEventListener('DOMContentLoaded', bindButtons2)
document.addEventListener('DOMContentLoaded', bindButtons3)

function bindButtons(){
  document.getElementById('competitionSubmit').addEventListener('click', function(event){
      var req = new XMLHttpRequest();
      var payload = {competition_name:null, lift_type:null, weight_class:null, lift_reps:null};
      payload.competition_name = document.getElementById('competition_name').value;
      payload.lift_type = document.getElementById('lift_type').value;
      payload.weight_class = document.getElementById('weight_class').value;
      payload.lift_reps = document.getElementById('lift_reps').value;

      
      console.log('http://flip3.engr.oregonstate.edu:52114/competitions/insert?competition_name=' + payload.competition_name + '&lift_type=' 
        + payload.lift_type + '&weight_class='+ payload.weight_class + '&lift_reps=' + payload.lift_reps);

      req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/competitions/insert?competition_name=' + payload.competition_name + '&lift_type=' 
        + payload.lift_type + '&weight_class='+ payload.weight_class + '&lift_reps=' + payload.lift_reps);
      


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
        var payload = {competition_id:null};
        payload.competition_id = getElementById("competition_id").value;

        req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/competitions/delete?competition_name=' + payload.competition_id, true);

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
        var payload = {competition_id_edit:null, lift_type_edit:null, weight_class_edit:null, lift_reps_edit:null};
        payload.competition_id_edit = getElementById("competition_id_edit").value;
        payload.lift_type_edit = document.getElementById('lift_type_edit').value;
        payload.weight_class_edit = document.getElementById('weight_class_edit').value;
        payload.lift_reps_edit = document.getElementById('lift_reps_edit').value;


        req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/competitions/edit?competition_name=' + payload.competition_id_edit + '&lift_type=' 
        + payload.lift_type_edit + '&weight_class='+ payload.weight_class_edit + '&lift_reps=' + payload.lift_reps_edit, true);

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