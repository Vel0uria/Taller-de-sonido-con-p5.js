let voz, sliderAmp, sliderFrec, env, filter, fft, angle;
let t1 = 0.1; // attack time in seconds
let l1 = 0.7; // attack level 0.0 to 1.0
let t2 = 0.3; // decay time in seconds
let l2 = 0.1;
function preload() {
  song = loadSound("assets/Circlerun.mp3");
}

function setup() {
  createCanvas(800, 800);
  // env = new p5.Envelope(t1, l1, t2, l2);
  voz = new p5.Oscillator();
  filter = new p5.Filter();
  fft = new p5.FFT();
  voz.amp(0.5);
  //svoz.disconect();
  sliderAmp = createSlider(0, 1, 0, 0.001);
  sliderFrec = createSlider(20, 20000, 1000, 1);
  angle = 0;
}

function draw() {
  background(0);
  angle = angle + 0.01;
  r = 100 * sin(angle);
  r = map(r, -100, 100, 0.001, 1000);

  voz.freq(sliderFrec.value());
  voz.connect(filter);
  cut = map(mouseX, 0, width, 20, 20000);
  ancho = map(r, 0.001, 1000, 50, 150);
  if (angle > 2 * PI) {
    angle = 0;
  }
  filter.freq(cut);
  ellipse(width / 2, height / 2, ancho, ancho);
  keyPressed();
  keyReleased();
  //let onda = fft.waveform();
  // for (var i = 0; i < onda.length; i++) {
  //   let amp = onda[i];
  //   let x = map(i, 0, onda.length, 0, width);
  //   let y = map(amp, -1, 1, -height / 2, height / 2);
  //   y = y + height / 2;
  //   strokeWeight(3);
  //   stroke(255, 0, 0);
  //   point(x, y);
  // }
}

function keyPressed() {
  //cambiar por switch!!
  if (key == "p") {
    voz.start();
    console.log("funciona");
  }
  if (key == "s") {
    voz.stop();
  }
  // if (key == "g") {
  //   envolvente.triggerAttack(voz);
  // }
}

function keyReleased() {
  if (key == "g") {
    envolvente.triggerRelease(voz);
  }
}
