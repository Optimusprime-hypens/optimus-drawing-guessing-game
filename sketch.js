let clearButton;
let canvas;

let doodleClassifier;
let resultsDiv;

function setup() {
  canvas = createCanvas(750, 400);
  clearButton = createButton('clear');
  clearButton.mousePressed(clearCanvas);
  background(255);
  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  resultsDiv = createDiv('model loading');
}

function modelReady() {
  console.log('model loaded');
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // console.log(results);
  let content = `<p> I am ${nf(100 * results[0].confidence, 2, 1)}% condifent that it is a drawing of a ${results[0].label}. </p>
                 <p> I believe ${nf(100 * results[1].confidence, 2, 1)}% condifent that is a drawing of a ${results[1].label}. <br/>
                  <p> no it ${nf(100 * results[1].confidence, 2, 1)}% that is a ${results[2].label} <br/>
                 <p> you all wrong ${nf(100 * results[1].confidence, 2, 1)}%
                 it a ${results[3].label} 
                 
                 `;

  resultsDiv.html(content);
  doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
  background(210);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(5);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
