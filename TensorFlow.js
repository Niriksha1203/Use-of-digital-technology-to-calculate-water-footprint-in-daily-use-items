<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Water Footprint Predictor</title>
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.0.0/dist/tf.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet"></script>
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier"></script>
</head>
<body>

<h1>Water Footprint Predictor</h1>
<img id="product-img" src="coffee.jpg" width="224">
<button onclick="predict()">Predict Water Usage</button>

<script>
let net;
const classifier = knnClassifier.create();
let waterConsumption = {};

// Load water consumption data
fetch('waterConsumption.json')
  .then(response => response.json())
  .then(data => {
    waterConsumption = data;
    console.log('Water data loaded:', waterConsumption);
  });

// Load MobileNet
async function app() {
  net = await mobilenet.load();
  console.log('MobileNet loaded');

  // Example: Add training images manually
  const imgCoffee = document.getElementById('product-img');
  const activation = net.infer(imgCoffee, true);
  classifier.addExample(activation, 'coffee'); // You can add more examples for each product
  console.log('Training example added');
}

// Prediction function
async function predict() {
  const img = document.getElementById('product-img');
  const activation = net.infer(img, true);
  const result = await classifier.predictClass(activation);

  const product = result.label;
  const waterUsed = waterConsumption[product] || "Unknown";

  alert(`Product: ${product}\nWater used: ${waterUsed} liters`);
}

app();
</script>

</body>
</html>
