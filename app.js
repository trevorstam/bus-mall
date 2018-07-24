
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
var totalClicks = 0;

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

    return alert('No more clicks left');
  }

  console.log(e.target, 'was clicked');
  randomImages();
}

randomImages();

imageContainer.addEventListener('click', clickImage);




