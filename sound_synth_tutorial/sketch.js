let wave, button, playing, env;
function preload() {
  button = createButton("play/stop");
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  button.mousePressed(toggle);
  wave = new p5.Oscillator();
  env = new p5.Env();
  env.setADSR(0.5, 0.1, 0.6, 0.5, 0.1);
  env.setRange(0.8, 0);
  wave.setType("square");

  playing = false;
  wave.start();
  wave.amp(env);
  wave.freq(100);
}

function draw() {}

function toggle() {
  env.play();
  //   if (!playing) {
  //     playing = true;
  //     wave.amp(0.3, 1);
  //   } else {
  //     wave.amp(0, 1);
  //     playing = false;
  //   }
}
