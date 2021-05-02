//Acepta exctensiones .mp3, .wav, .oct

let song, sliderRate, button, stopButton, wave, fft, amplitude;
function preload() {
  song = loadSound("assets/Circlerun.mp3");
  sliderRate = createSlider(0, 1.5, 1, 0.01);
}

function setup() {
  createCanvas(800, 800);
  //blendMode(LIGHTEST);
  song.setVolume(0.8);
  stopButton = createButton("stop");
  button = createButton("jump");
  stopButton.mousePressed(toggle);
  button.mousePressed(jumpSong);
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
}

function draw() {
  background(0);
  strokeWeight(3);

  stroke(220);
  // fill(220, 255, 0);
  noFill();
  song.rate(sliderRate.value());
  wave = fft.waveform();
  a = amplitude.getLevel();
  diameter = map(a, 0, 1, 10, width);
  // ellipse(width / 2, height / 2, diameter);
  for (let i = 0; i < wave.length; i++) {
    const amp = wave[i];
    x = map(i, 0, wave.length, 0, width);
    y = map(amp, -1, 1, -height / 2, height / 2);
    y = y + height / 2;
    //vertex(x, y);
    point(x, y);
  }
}

function jumpSong() {
  len = song.duration();
  t = random(len);
  song.jump(t);
}

function toggle() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
