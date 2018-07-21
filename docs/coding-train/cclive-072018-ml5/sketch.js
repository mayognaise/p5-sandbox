let video
let mobilenet
let result

function setup() {
  createCanvas(320, 320)
  video = createCapture(VIDEO)
  video.hide()
  mobilenet = ml5.imageClassifier('MobileNet', video, mobileReady)
}

function draw() {
  background(0)
  image(video, 0, 0, 320, 240)
  if (!result) { return }
  fill(255)
  textSize(24)
  text(result.className, 0, height - 24)
  text(result.probability, 0, height)
}

function mobileReady() {
  mobilenet.predict(gotResult, 1)
}

function gotResult(err, results) {
  if (err) {
    console.log(err)
    return
  }
  result = results[0]
  mobilenet.predict(gotResult, 1)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
