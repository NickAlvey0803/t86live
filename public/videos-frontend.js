document.addEventListener('DOMContentLoaded', bindButtons)
document.addEventListener('DOMContentLoaded', bindButtons2)
document.addEventListener('DOMContentLoaded', bindButtons3)

function bindButtons(){
  document.getElementById('videoSubmit').addEventListener('click', function(event){
      var req = new XMLHttpRequest();
      var payload = {uid:null, title:null, video_description:null, category:null, weight:null, uploader_weight:null, light_score:null};
      payload.uid = document.getElementById('uid').value;
      payload.title = document.getElementById('title').value;
      payload.video_description = document.getElementByID('video_description').value
      payload.category = document.getElementById('category').value;
      payload.weight = document.getElementById('weight').value;
      payload.uploader_weight = document.getElementById('uploader_weight').value;
      payload.light_score = document.getElementById('light_score').value;
      

      
      console.log('http://flip3.engr.oregonstate.edu:52114/videos/insert?uid=' + payload.uid + '&title=' + payload.title + '&video_description=' + payload.video_description + '&category=' + payload.category + '&weight=' 
        + payload.weight + '&uploader_weight='+ payload.uploader_weight + '&light_score=' + payload.light_score);

      req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/videos/insert?uid=' + payload.uid + '&title=' + payload.title + '&video_description=' + payload.video_description + '&category=' + payload.category + '&weight=' 
        + payload.weight + '&uploader_weight='+ payload.uploader_weight + '&light_score=' + payload.light_score);
      


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
        var payload = {video_id:null};
        payload.video_id = document.getElementById("video_id").value;
        console.log(payload.video_id)

        req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/videos/delete?title=' + payload.video_id, true);

        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load',function(){
          if(req.status >= 200 && req.status < 400){
            
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
        req.send(null);
    // event.preventDefault();
  });
}

function bindButtons3(){
     document.getElementById('editSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {video_id:null};
        payload.video_id = document.getElementById("video_id_edit").value;
        console.log(payload.video_id)

        req.open('GET', 'http://flip3.engr.oregonstate.edu:52114/videos/edit' + payload.video_id, true);

        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load',function(){
          if(req.status >= 200 && req.status < 400){
            
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
        req.send(null);
    // event.preventDefault();
  });
}

