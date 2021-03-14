document.addEventListener('DOMContentLoaded', bindButtons)
document.addEventListener('DOMContentLoaded', bindButtons2)
document.addEventListener('DOMContentLoaded', bindButtons3)

function bindButtons(){
  document.getElementById('commentSubmit').addEventListener('click', function(event){
      var req = new XMLHttpRequest();
      var payload = {uid:null, vid:null, description:null, light_score:null};
      payload.uid = document.getElementById('uid').value;
      payload.vid = document.getElementById('vid').value;
      payload.description = document.getElementById('description').value;
      payload.light_score = document.getElementById('light_score').value;

      
      console.log('http://flip3.engr.oregonstate.edu:52114/comments/insert?uid=' + payload.uid + '&vid=' 
        + payload.vid + '&description='+ payload.description + '&light_score=' + payload.light_score);

      req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/comments/insert?uid=' + payload.uid + '&vid=' 
        + vid + '&description='+ payload.description + '&light_score=' + payload.light_score);
      


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
        var payload = {commment_uid:null,commment_vid:null};
        payload.comment_uid = getElementById("comment_uid").value;
        payload.comment_vid = getElementById("comment_vid").value;

        req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/comments/delete?uid=' + payload.comment_uid + '&vid=' + payload.comment_vid, true);

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
        var payload = {commment_uid_edit:null,commment_vid_edit:null, description_edit:null, light_score_edit:null};
        payload.comment_uid_edit = getElementById("comment_uid_edit").value;
        payload.comment_vid_edit = getElementById("comment_vid_edit").value;
        payload.description_edit = document.getElementById('description_edit').value;
      	payload.light_score_edit = document.getElementById('light_score_edit').value;

        req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/comments/edit?uid=' + payload.comment_uid_edit + '&vid=' + payload.comment_vid_edit + '&description='+ payload.description_edit + '&light_score=' + payload.light_score_edit, true);

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