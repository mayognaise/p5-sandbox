let video
let mobilenet

function setup() {
  createCanvas(windowWidth, windowHeight)
  video = createCapture(VIDEO)
  video.hide()
  // Create the classifier with MobileNet
  mobilenet = ml5.imageClassifier('MobileNet', mobileReady)
  // Make a prediction
  // let prediction = mobilenet.predict(video, mobileReady)
  // console.log(prediction)
}

function draw() {
  image(video, 0, 0, 320, 240)
}

// Log the results
function mobileReady() {
  console.log('mobile ready!')
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
