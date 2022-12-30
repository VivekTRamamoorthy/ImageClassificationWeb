
let mobilenet
let img 
let video
let label = ''
let modelLoaded = false
let videoMode = false
let imageMode = false
let drawMode = false
let stopMode = false
let canvas

function setup(){
    let canvasWidth = Math.min(640,window.innerWidth-5)
    let canvasHeight = Math.min(480,window.innerHeight - 300)
    let p5canvas = createCanvas(canvasWidth,canvasHeight);
   

    background(0)
    p5canvas.parent('content')
    canvas = p5canvas.canvas
    canvas.addEventListener('touchmove',(event)=>{
        event.preventDefault();
    })

    displayStatus('Loading model... Please wait.')
    
    mobilenet = ml5.imageClassifier('MobileNet',video,modelReady);
    
}

function draw(){
    if(stopMode){
        return
    }
    
    if(imageMode){
       
        return
    }
    
    if( videoMode){
        image(video,0,0)
        mobilenet.predict(video, processPrediction)
        .then((result)=>{
            // console.log(result);
            displayStatus("Prediction: " + result[0].label+ "\n Probability: " + result[0].confidence.toPrecision(2))
            
        },(error)=>{
            displayStatus("Error. Prediction failed. ")
            console.error(error)
        })
        return
    } 
    
    if (drawMode){
        stroke(255);
        strokeWeight(3)
        if (mouseIsPressed === true) {
            line(mouseX, mouseY, pmouseX, pmouseY);
        }
        let imageElem = document.getElementById("imageToPredict");
        let dataURL = canvas.toDataURL();
        imageElem.src = dataURL
        mobilenet.predict(imageElem, processPrediction)
        .then((result)=>{
            displayStatus("Prediction: " + result[0].label+ "\n Probability: " + result[0].confidence.toPrecision(2))
            
        },(error)=>{
            displayStatus("Error. Prediction failed. ")
            console.error(error)
        })
        return
    }
    
}


function modelReady(){
    modelLoaded = true
    displayStatus('Mobilenet is loaded. Select a mode to begin.')
}


function processPrediction(error, results){
    if(error){
        console.error(error)
    }else{
        // console.log(results)
    }
}


function predictFromVideoStream(){
    let canvas = document.getElementById("canvas");
    
    
    
    
}

function displayStatus(text){
    document.getElementById('statusbar').innerText = text;
}



