function imageButton(event){
    imageMode = true; 
    videoMode = false; 
    drawMode = false; 
    stopMode = false; 
    document.getElementById('imageBtn').classList.add("isactive")
    document.getElementById('videoBtn').classList.remove("isactive")
    document.getElementById('drawBtn').classList.remove("isactive")
    document.getElementById('stopBtn').classList.remove("isactive")
    onFileSelected(event)
    let imageElem = document.getElementById('imageToPredict')
    imageElem.onload = ()=>{
        let ctx = canvas.getContext('2d');
        ctx.drawImage(imageElem,0,0,width,height)
        // let img  = createImg(imgElem, ()=>{
        //     imageButton(img,0,0,width,height)
        // })

        mobilenet.predict(imageElem, processPrediction)
        .then((result)=>{
            displayStatus("Prediction: " + result[0].label+ "\n Probability: " + result[0].confidence.toPrecision(2))
            
        },(error)=>{
            displayStatus("Error. Prediction failed. ")
            console.error(error)
        })
    }

}

function videoButton(){
    imageMode = false; 
    videoMode = !videoMode; 
    drawMode = false; 
    stopMode = false;
    if(videoMode === true){
        document.getElementById('imageBtn').classList.remove("isactive")
        document.getElementById('videoBtn').classList.add("isactive")
        document.getElementById('drawBtn').classList.remove("isactive")
        document.getElementById('stopBtn').classList.add("isactive")
        video = createCapture(VIDEO)
        video.hide()
    }
}

function drawButton(){
    imageMode = false; 
    videoMode = false; 
    drawMode = !drawMode; 
    stopMode = false;
    if(drawMode === true){
        document.getElementById('imageBtn').classList.remove("isactive")
        document.getElementById('videoBtn').classList.remove("isactive")
        document.getElementById('drawBtn').classList.add("isactive")
        document.getElementById('stopBtn').classList.remove("isactive")
        background(0)
    }
    
}

function stopButton(){
    imageMode = false; 
    videoMode = false; 
    drawMode = false; 
    stopMode = false;
    
    document.getElementById('imageBtn').classList.remove("isactive")
    document.getElementById('videoBtn').classList.remove("isactive")
    document.getElementById('drawBtn').classList.remove("isactive")
    document.getElementById('stopBtn').classList.remove("isactive")
    background(0)
    fill(255)
    strokeWeight(2)
    textAlign('center')
    textSize(32)
    text('Select a mode to continue', width/2,height/2)
    
}

function onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
  
    var imgtag = document.getElementById("imageToPredict");
    imgtag.title = selectedFile.name;
  
    reader.onload = function(event) {
      imgtag.src = event.target.result;
    };
  
    reader.readAsDataURL(selectedFile);
  }