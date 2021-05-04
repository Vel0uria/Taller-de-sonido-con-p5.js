let wave, button, playing, env, song, amp, fft, spectrum, w, x, acc, vel;
let volValues = [];

function preload() {
  button = createButton("play/stop");
  song = loadSound("assets/Circlerun.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  button.mousePressed(toggle);
  wave = new p5.Oscillator();
  env = new p5.Env();
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.9, 64);
  w = width / 50;
  x = 0;
  vel = 0.1;
  frameRate(25);
  env.setADSR(0.5, 0.3, 0.6, 0.1, 0.09);
  env.setRange(1.5, 0);
  wave.setType("triangle");

  playing = false;
  wave.start();
  wave.amp(env);
  wave.freq(160);
}

function draw() {
  //  translate(width / 2, height / 2);
  background(0, 50);
  stroke(255, 100, 240);
  strokeWeight(3);

  spectrum = fft.analyze();
  vol = amp.getLevel();

  acc = map(vol, 0, 1, 0, width);
  // x += vel;
  // vel += acc;
  x += acc;
  line(x, height / 2, x + acc * 1.5, height / 2);
  //Loop que genera una gráfica linear
  // beginShape();
  // for (let i = 0; i < volValues.length; i++) {
  //   y = map(volValues[i], 0, 1, height - 150, 50);

  //   vertex(i, y);
  // }
  // endShape();
  //Loop que genera una gráfica
  // for (let i = 0; i < spectrum.length; i++) {
  //   newAmp = spectrum[i];
  //   y = map(newAmp, 0, 256, height, 0);
  //   line(i * w, height, i * w, y);
  // }
  //Loop que genera un círculo
  // beginShape();
  // for (let i = 0; i < spectrum.length; i++) {
  //   newAmp = spectrum[i];
  //   r = map(newAmp, 0, 256, 10, 600);
  //   x = r * cos(i);
  //   y = r * sin(i);
  //   vertex(x, y);
  //   vertex(-x, -y);
  // }
  // endShape();
}

function toggle() {
  env.play();
  env.mult(random(0.3, 1.6));

  x = 0;
  //song.play();
  //   if (!playing) {
  //     playing = true;
  //     wave.amp(0.3, 1);
  //   } else {
  //     wave.amp(0, 1);
  //     playing = false;
  //   }
}
