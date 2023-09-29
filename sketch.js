//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let colidiu = false

//variáveis do oponete
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente ;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda(); 
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  colisaoMinhaRaqueteBiblioteca();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteOponenteBiblioteca();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
 xBolinha +=  velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda (){
    if (xBolinha + raio > width ||  xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio  > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
 }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}


function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
  yRaquete -= 10;
  }
   if (keyIsDown(DOWN_ARROW)){
  yRaquete += 10;
 }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
  velocidadeXBolinha *= -1;

  }
}

function colisaoMinhaRaqueteBiblioteca() {
  if (
    xBolinha - raio < xRaquete + raqueteComprimento &&
    xBolinha + raio > xRaquete &&
    yBolinha - raio < yRaquete + raqueteAltura &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteOponenteBiblioteca() {
  if (
    xBolinha + raio > xRaqueteOponente &&
    xBolinha - raio < xRaqueteOponente + raqueteComprimento &&
    yBolinha + raio > yRaqueteOponente &&
    yBolinha - raio < yRaqueteOponente + raqueteAltura
  ) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}



function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha  - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente

}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(100,149,237));
  rect(150, 10, 40, 20);
  fill(color(100,149,237));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
  text(meusPontos, 170, 26);
}

function marcaPonto(){
  if (xBolinha >590){
   meusPontos += 1;
   ponto.play();
  }
  if  (xBolinha <10){
    pontosOponente += 1;
    ponto.play();
  }
}

