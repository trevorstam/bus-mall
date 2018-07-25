
'use strict';

//BUSMALL refactoring
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum',
  'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark',
  'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var allProducts = [];

var leftImage = document.getElementById('left');
var centerImage = document.getElementById('center');
var rightImage = document.getElementById('right');
var imageContainer = document.getElementById('image-container');
var unorderedList = document.getElementById('results');
var totalClicks = 0;
var voteTotal = [];

//constructor function
function Product(name){
  this.name = name;
  // this.path = 'img/' + name + '.jpg';
  this.path = `images/${name}.jpg`;//use backticks instead of ' '.
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

for (var i = 0; i < productNames.length; i++){
  new Product(productNames[i]);
}

//create random function
function generateRandom(){
  return Math.floor(Math.random() * allProducts.length);
}

//create three random images
function randomImages(){

  var randIndexes = [];

  randIndexes[0] = (generateRandom());

  randIndexes[1] = (generateRandom());


  //CHECK FOR DUPLICATE STEP 1
  console.log('check loop', randIndexes);
  while(randIndexes[0] === randIndexes[1]){
    randIndexes[1] = generateRandom();
    console.log('duplicate prevented');
  }

  randIndexes[2] = generateRandom();

  //CHECK FOR DUPLICATES STEP 2
  while (randIndexes[2] === randIndexes[0] || randIndexes[2] ===randIndexes[1]){
    randIndexes[2] = generateRandom();
    console.log('duplicate checker #2 caught a dupe');
  }

  //for each of the empty img tags, assign a random source attribute and a name.
  leftImage.src = allProducts[randIndexes[0]].path;
  centerImage.src = allProducts[randIndexes[1]].path;
  rightImage.src = allProducts[randIndexes[2]].path;
  leftImage.title = allProducts[randIndexes[0]].name;
  centerImage.title = allProducts[randIndexes[1]].name;
  rightImage.title = allProducts[randIndexes[2]].name;

  allProducts[randIndexes[0]].views += 1;
  allProducts[randIndexes[1]].views += 1;
  allProducts[randIndexes[2]].views += 1;
}

//DON'T CALL FUNCTION randomImages HERE!! THROWS INFINITE LOOP

//add event listener

function clickImage(e){
  e.preventDefault();
  //you don't want users to click on background but on images.
  if (e.target.id === 'image-container'){
    return alert('click on images, not on background');
  }
  console.log(e.target.title);
  for (var i =0; i < allProducts.length; i++){
    if (e.target.title === allProducts[i].name){
      allProducts[i].votes += 1;
    }
  }

  totalClicks++;
  console.log('totalclicks', totalClicks);

  if (totalClicks > 24){
    imageContainer.removeEventListener('click', clickImage);
    showResults();

    renderChart();

    return alert('No more clicks left');
  }


  console.log(e.target, 'was clicked');
  randomImages();
}
function showResults() {
  for (var i in allProducts) {
    var listElement = document.createElement('li');
    listElement.innerHTML = allProducts[i].votes + ' clicks for ' + allProducts[i].name;
    unorderedList.appendChild(listElement);
    //push all the votes into the voteTotal array to use for the chart. After all this will be displayed
    voteTotal.push(allProducts[i].votes);

  }
}


randomImages();




imageContainer.addEventListener('click', clickImage);


//create chart function

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

function renderChart(){

  var context = document.getElementById('myChart').getContext('2d');

  var chart = new Chart(context,{
    type: 'bar',
    data: {
      labels: productNames,
      datasets:[{
        label: 'Number of votes',
        data: voteTotal,
        backgroundColor: colorArray,
        borderWidth: 1,

      }],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  });
}





