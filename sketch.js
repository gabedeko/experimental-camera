// Credits
/*===========
// Duplicated from https://editor.p5js.org/kylemcdonald/sketches/H1OoUd9h7
// Author:  kylemcdonald
// Title: ml5 Example

// Color effect method adopted from https://editor.p5js.org/js6450/sketches/KV-8wB80O
// Author: Jiwon
// Title: Load Pixel shape random
=============*/


let cam;
let poseNet;
// Color
let poses = [];
let skeletons = [];

let right_on = false;
let left_on = false;
let mario_on = false;
let chef_on = false;

let sceneNum = -1;
//intro scene -1
let intro;
let intro_button_accept;
let intro_button_deny;
let intro_button_more;

let deny;


//Images to be used for if statements triggers by keypoitns
function preload() {
  fontRegular = loadFont('assets/fonts/Roboto-Regular.ttf');
  hat_1 = loadImage('img/minion_eyes.png');
  hat_2 = loadImage('img/da_bob.png');
  fire = loadImage('img/fire.png');
  food = loadImage('img/food.png');
  banana = loadImage('img/Banana.png');
}

function setup() {
  textFont(fontRegular);
  createCanvas(640, 480);

  cam = createCapture(VIDEO);
  cam.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(cam, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  cam.hide();
  noStroke();
  
    intro = new Intro();
  deny = new Deny();

  //Consent BUttons
  intro_button_accept = createButton("Accept"); //whatever text you want the button to say
  intro_button_accept.position(200, 400); //where you want the button to be
  intro_button_accept.mousePressed(initiateCamera); //pass a function that you want to run when we click button

  intro_button_deny = createButton("Deny"); //whatever text you want the button to say
  intro_button_deny.position(300, 400); //where you want the button to be
  intro_button_deny.mousePressed(deny.scene); //pass a function that you want to run when we click button

  intro_button_more = createButton("More Info"); //whatever text you want the button to say
  intro_button_more.position(380, 400); //where you want the button to be
  intro_button_more.mousePressed(openLink); //pass a function that you want to run when we click button
  
  deny_back = createButton("Go Back"); //whatever text you want the button to say
  deny_back.position(240, 400); //where you want the button to be
  deny_back.mousePressed(intro.scene); //pass a function that you want to run when we click button
  
  deny_close = createButton("End Sketch"); //whatever text you want the button to say
  deny_close.position(320, 400); //where you want the button to be
  deny_close.mousePressed(closeTab); //pass a function that you want to run when we click button
  
}

function modelReady() {
  //this founction must exist in order for ml5.poseNet to run
}

function draw() {

  //mirror camera so face doesn't look weird
  translate(width, 0);
  scale(-1, 1);
  //set up cam to capture entire canvas
  image(cam, 0, 0, width, height);

  //load pixels of the camera feed
  cam.loadPixels();
  // We can call both functions to draw all keypoints and the skeletons

  if (sceneNum >= 1) {
    drawKeypoints();
    drawSkeleton();
    
    intro_button_accept.hide();
    intro_button_deny.hide();
    intro_button_more.hide();
    
    deny_back.hide();
    deny_close.hide();

  } else if (sceneNum == -1) {
    intro.scene();
    intro_button_accept.show();
    intro_button_deny.show();
    intro_button_more.show();
    
    deny_back.hide();
    deny_close.hide();
  } else if (sceneNum == -2) {
    deny.scene();
    intro_button_accept.hide();
    intro_button_deny.hide();
    intro_button_more.hide();
    
    deny_back.show();
    deny_close.show();
  }




}

class Intro { //Intro message and song
  constructor(c) {}
  scene() {
    
    sceneNum = -1;
    
    if (sceneNum == -1) {
      push();
      fill(0, 0, 0, 200);
      rect(0, 0, width, height);
      pop();

      push();
      stroke(255);
      strokeWeight(2);
      noFill();
      rect(25, 25, width - 50, height - 50);
      pop();

      push();
      translate(width, 0);
      scale(-1, 1);
      textSize(32);
      fill(255);
      text('EXPERIMENTAL CAMERA', 130, 80);
      textSize(20);
      text('This sketch requires the use of your camera', 120, 200);
      text('Everything captured in the canvas may be recorded', 90, 240);
      text('Please confirm you understand the consequences of being', 60, 280);
      text('recorded and that this sketch has permission to do so', 75, 320);
      pop();



    }
  }
}
class Deny { //Intro message and song
  constructor(c) {}

  scene() {

    sceneNum = -2;
    intro_button_accept.hide();
    if (sceneNum == -2) {

      push();
      fill(0, 0, 0);
      rect(0, 0, width, height);
      pop();

      push();
      stroke(255);
      strokeWeight(2);
      noFill();
      rect(25, 25, width - 50, height - 50);
      pop();

      push();
      translate(width, 0);
      scale(-1, 1);
      textSize(32);
      fill(255);
      text('DENIED', 270, 80);
      textSize(20);
      text('You have chosen not to use the camera', 140, 200);
      text('You can close this window', 200, 240);
      pop();
    }
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      let part = poses[i].pose.keypoints[j].part;
      let position = poses[i].pose.keypoints[j].position;

      let px1 = poses[i].pose.keypoints[j].position.x; //position x part 1
      let py1 = poses[i].pose.keypoints[j].position.y; //position y part 1

      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        //// Parts of face detected by poseNet
        // leftEye
        // leftEar
        // nose
        // rightEar
        //rightEye
        /////We're only using nose

        //duplicated from  Load Pixel Shape Random: https://editor.p5js.org/js6450/sketches/KV-8wB80O
        //get a random x & y coordinate on the camera feed image
        let randomX = int(random(cam.width));
        let randomY = int(random(cam.height));

        //calculate the index of the pixel on the (randomX, randomY) coordinate
        //Why do we times it by 4?
        //WHY / HOW DO WE CALCULATE THIS?
        let randomIndex = (randomY * cam.width + randomX) * 4;

        let r = cam.pixels[randomIndex];
        let g = cam.pixels[randomIndex + 1];
        let b = cam.pixels[randomIndex + 2];
        let a = cam.pixels[randomIndex + 3];

        stroke(r, g, b, a);

        if (part == "nose") {
          //console.log("Part: " + part + ", " + "Position: " + position.x + ", " + position.y);
          //Create visual representation of enery above head
          push();
          strokeWeight(4);
          line(px1, py1 - 110, px1, py1 - 150);
          pop();
          if (position.x >= 500 && position.y >= 50 && position.y <= 430) {
            //If head is left of the screen add Mario hat and hold flame
            mario_on = true;
            image(hat_1, keypoint.position.x - 80, keypoint.position.y - 120, 150, 150);

          } else if (position.x <= 140 && position.y >= 50 && position.y <= 430) {
            //If head is right of the screen add chef hat and hold burger
            chef_on = true;
            image(hat_2, keypoint.position.x - 80, keypoint.position.y - 200, 150, 150);
          } else {
            setInterval(function() {
              mario_on = false;
              chef_on = false;
              //console.log("right off"); 
            }, 1000);
          }
        }
        //Create visual representation of enery above head
        else if (part == "leftEye") {
          push();
          strokeWeight(4);
          line(px1 + 40, py1 - 40, px1 + 70, py1 - 70);
          pop();
        } else if (part == "rightEye") {
          push();
          strokeWeight(4);
          line(px1 - 40, py1 - 40, px1 - 70, py1 - 70);
          pop();
        } else if (part == "leftEar") {
          push();
          strokeWeight(4);
          line(px1 + 40, py1, px1 + 70, py1 - 20);
          pop();
        } else if (part == "rightEar") {
          push();
          strokeWeight(4);
          line(px1 - 40, py1, px1 - 70, py1 - 20);
          pop();
        }

        if (part == "rightWrist" && position.y <= 490 || part == "leftWrist" && position.y <= 490) {


          for (let i = 0; i < 50; i++) {

            //duplicated from  Load Pixel Shape Random: https://editor.p5js.org/js6450/sketches/KV-8wB80O
            let randomX = int(random(cam.width));
            let randomY = int(random(cam.height));
            let randomIndex = (randomY * cam.width + randomX) * 4;
            let r = cam.pixels[randomIndex];
            let g = cam.pixels[randomIndex + 1];
            let b = cam.pixels[randomIndex + 2];
            let a = cam.pixels[randomIndex + 3];

            fill(r, g, b, a);
            stroke(-r, -g, -b, -a);

            //Create "enery" above hands
            ellipse(random(keypoint.position.x - 35, keypoint.position.x + 35), random(keypoint.position.y - 100, keypoint.position.y - 150), (keypoint.position.y - height) / 5, (keypoint.position.y - height) / 5);

            if (part == "rightWrist" && position.y <= 200 && position.x <= 200) {
              //if wrist hits top of canvas, create half of "frame of energy"
              right_on = true;
              ellipse(random(0, 20), random(0, height), 10, 10);
              ellipse(random(0, width), random(0, 20), 10, 10);
            } else {
              //Timer needs to be set so case with both wrists hitting top at same time is possible
              setInterval(function() {
                right_on = false;
              }, 1000);
            }
            if (part == "leftWrist" && position.y <= 200 && position.x >= 440) {
              //if wrist hits top of canvas, create half of "frame of energy"
              left_on = true;
              ellipse(random(width, width - 20), random(0, height), 10, 10);
              ellipse(random(0, width), random(height, height - 20), 10, 10);
            } else {
              //Timer needs to be set so case with both wrists hitting top at same time is possible
              setInterval(function() {
                left_on = false;
              }, 1000);
            }
            if (left_on == true && right_on == true) {
              //if both hands are at top of canvas create fill canvas frame effect
              push();
              fill(random(255), random(255), random(255));
              //right
              ellipse(random(0, 30), random(0, height), 15, 15);
              //bottom
              ellipse(random(0, width), random(0, 30), 15, 15);
              //left
              ellipse(random(width, width - 30), random(0, height), 15, 15);
              //right
              ellipse(random(0, width), random(height, height - 30), 15, 15);
              pop();
            }
          }
        }


        //If in Mario or chef mode add images to hand
        if (part == "rightWrist" && position.y <= 490 && mario_on == true) {
          image(banana, keypoint.position.x - 120, keypoint.position.y - 220, 200, 200);
        } else if (part == "leftWrist" && position.y <= 490 && chef_on == true) {
          image(food, keypoint.position.x - 120, keypoint.position.y - 220, 200, 200);
        }
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {

  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      //beginning and end of skeleton
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      //beginning of and end of skeleton x coordinate
      let x1 = partA.position.x;
      let x2 = partB.position.x;
      //beginning of and end of skeleton y coordinate
      let y1 = partA.position.y;
      let y2 = partB.position.y;

      //duplicated from  Load Pixel Shape Random: https://editor.p5js.org/js6450/sketches/KV-8wB80O
      let randomX = int(random(cam.width));
      let randomY = int(random(cam.height));
      let randomIndex = (randomY * cam.width + randomX) * 4;
      let r = cam.pixels[randomIndex];
      let g = cam.pixels[randomIndex + 1];
      let b = cam.pixels[randomIndex + 2];
      let a = cam.pixels[randomIndex + 3];

      //Create visual representation of emission of enery above skeleton
      stroke(r, g, b, a);
      strokeWeight(4);
      if (partB.part == "rightShoulder" && partA.part == "leftShoulder") {
        line(((x1 + x2) * 0.30) - 10, ((y1 + y2) / 2) + 20, ((x1 + x2) * 0.30) - 40, ((y1 + y2) / 2) - 30);
        line(((x1 + x2) * 0.35), ((y1 + y2) / 2) - 50, ((x1 + x2) * 0.35) - 20, ((y1 + y2) / 2) - 80);
        //line(((x1+x2)/2), ((y1+y2)/2)-200, ((x1+x2)/2), ((y1+y2)/2)-250);
        line(((x1 + x2) * 0.65), ((y1 + y2) / 2) - 50, ((x1 + x2) * 0.65) + 20, ((y1 + y2) / 2) - 80);
        line(((x1 + x2) * 0.70) + 10, ((y1 + y2) / 2) + 20, ((x1 + x2) * 0.70) + 40, ((y1 + y2) / 2) - 30);
      } else if (partB.part == "rightShoulder" && partA.part == "rightElbow") {
        line(((x1 + x2) / 2) - 40, ((y1 + y2) / 1.8), ((x1 + x2) / 2) - 80, ((y1 + y2) / 1.8) - 40);
      } else if (partB.part == "leftShoulder" && partA.part == "leftElbow") {
        line(((x1 + x2) / 2) + 40, ((y1 + y2) / 1.8), ((x1 + x2) / 2) + 80, ((y1 + y2) / 1.8) - 40);
      }

    }
  }
}

/*
//click canvas to save image
function mouseClicked() {
  saveCanvas('myCanvas', 'jpg');
}
*/
function initiateCamera() {
  sceneNum = 1;
}
function openLink() {
  //Open tab with more info about camera permissions
  window.open("https://support.mozilla.org/en-US/kb/how-manage-your-camera-and-microphone-permissions"); 
}

function closeTab() {
  //Close tab
  //window.close();
  remove();
}