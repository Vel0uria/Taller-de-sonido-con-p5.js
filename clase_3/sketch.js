let voz;
let envolvente;
let filtro;
let angulo;
let aumentoAngulo;
let cir;
let rects = [];
const numRects = 10;

function setup() {
  createCanvas(400, 400);

  voz = new p5.Oscillator();

  envolvente = new p5.Envelope(0.2, 1, 0.2, 0.3, 0.3, 0);

  filtro = new p5.LowPass();

  for (i = 0; i < numRects; i++) {
    r = new rectObj(
      random(width),
      random(height),
      random(10, 50),
      random(10, 50)
    ); // generate a rectObj
    rects.push(r); //add it to the array.
  }

  cir = new circleObj(20); // create a new circle object
  // sliderFrecuencia = createSlider(0,1,0.05,0.0001);

  // Desconexion del oscilador con el nodo principal de audio
  voz.disconnect();
  // Conexion del oscilador con el nodo de la entrada del filtro
  voz.connect(filtro);
}

function draw() {
  // Jugando con la transparencia del canvas se pude lograr un efecto de 'estela' en la animación
  // El formato de color se escribe como
  // background(color R, color G, color B, transparecia)
  // Por defecto todos los valores van de 0 a 255

  background(0, 0, 0, 20);

  for (i = 0; i < numRects; i++) {
    rects[i].disp();
    rects[i].collide(cir); //collide against the circle object
  }

  cir.disp(mouseX, mouseY); //pass the x,y pos in to the circle.
}

function keyPressed() {
  if (key == "a") {
    voz.start();
    // voz.amp();
    print("Osc start");
  }
  if (key == "s") {
    voz.stop();
    print("Osc stop");
  }

  if (key == "g") {
    envolvente.triggerAttack(filtro);
  }
  if (key == "r") {
    for (let i = 0; i < rects.length; i++) {
      rects[i].setNota(40);
    }
  }
  if (key == "1") {
    voz.setType("sine");
  }
  if (key == "2") {
    voz.setType("triangle");
  }
  if (key == "3") {
    voz.setType("square");
  }
  if (key == "4") {
    voz.setType("sawtooth");
  }
}

function keyReleased() {
  if (key == "g") {
    envolvente.triggerRelease(filtro);
  }
}

function logConv(posicion, min, max, minLog, maxLog) {
  var minp = min;
  var maxp = max;
  var minv = Math.log(minLog);
  var maxv = Math.log(maxLog);
  var scale = (maxv - minv) / (maxp - minp);

  return Math.exp(minv + scale * (posicion - minp));
}
function rectObj(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color(random(255), random(255), random(255));
  this.hit = false;
  this.nota = int(random(40, 76));
  this.collide = function(obj) {
    this.hit = collideRectCircle(
      this.x,
      this.y,
      this.w,
      this.h,
      obj.x,
      obj.y,
      obj.dia
    ); //collide the cir object into this rectangle object.

    if (this.hit) {
      f = midiToFreq(this.nota);
      voz.freq(f);
      envolvente.play(filtro);
    }
  };

  this.disp = function() {
    noStroke();
    fill(this.color);
    this.x += 3; //move to the right!
    if (this.x > width) {
      //loop to the left!
      this.x = -this.w;
    }
    rect(this.x, this.y, this.w, this.h);
  };
  this.setNota = function(n) {
    this.nota = n;
  };
}

function circleObj(dia) {
  this.dia = dia;
  this.color = color(random(255), random(255), random(255));
  this.x;
  this.y;

  this.disp = function(x, y) {
    this.x = x;
    this.y = y;
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.dia, this.dia);
  };
}
// function instrucciones() {
//   print("Interactua con;
//   print("< a > Iniciar el oscilador");
//   print("< s > Detener el oscilador");
//   print("< g > Tocar");
//   print(" //////// ondas ///////// ");
//   print("< 1 > Senoidal");
//   print("< 2 > Triangular");
//   print("< 3 > Cuadrada");
//   print("< 4 > Diente de sierra");
//   print(" //////////////////////// ");
//   print("MouseX: Corte del filtro");
//   print("MouseY: Tono");
// }
