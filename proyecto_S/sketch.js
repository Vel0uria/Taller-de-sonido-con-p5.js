let sound, img, button, amp;
function preload() {
  sound = loadSound("assets/WarpDrive.mp3");
  chispa = loadImage("assets/chispa.png");
  button = createButton("play");
}
function setup() {
  createCanvas(windowWidth, 1300);
  imageMode(CENTER);
  sound.setVolume(0.8);
  button.mousePressed(toggle);
  fft = new p5.FFT();
  amp = new p5.Amplitude();
}

function draw() {
  background(240, 213, 185);
  const vol = amp.getLevel();
  const size = map(vol, 0, 0.8, 100, 450);

  image(chispa, width / 2, height / 2, size, size);
}

function toggle() {
  if (sound.isPlaying()) {
    sound.stop();
    buttonText = "stop";
  } else {
    // buttonText = "play";
    sound.play();
  }
}
