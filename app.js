
'use strict';

//create global variables
var images = ['images/bag.jpg', 'images/banana.jpg', 'images/bathroom.jpg', 'images/boots.jpg', 'images/breakfast.jpg', 'images/bubblegum.jpg',
  'images/chair.jpg', 'images/cthulhu.jpg', 'images/dog-duck.jpg', 'images/dragon.jpg', 'images/pen.jpg', 'images/pet-sweep.jpg', 'images/scissors.jpg', 'shark.jpg',
  'images/sweep.jpg', 'images/tauntaun.jpg', 'images/unicorn.jpg', 'images/usb.gif', 'images/water-can.jpg', 'images/wine-glass.jpg'];

var productList = [];


// construct object for products
function Product(image, filePath){
  this.image = image.split('.')[0];
  this.filePath = filePath;
  this.clickNum = 0;
  this.votes = 0;
  productList.push(this);
}


function objectMaker(){
  for (var i = 0; i < images.length; i++) {
    productList.push(new Product(images[i]));
  }
}

objectMaker();

//write random number generator
function generateRandom(){
  Math.floor(Math.random() * images.length);
}

// get element of image-container
var imageLeft = document.getElementById('img1');
var imageCenter = document.getElementById('img2');
var imageRight = document.getElementById('img3');
//use that to generate random image to page
//make three random images for page
function threeImageGenerator(Product){
  //create random image 1
  var img1 = generateRandom(Product);
  console.log('img1', img1);
  
  var img2 = generateRandom(Product);

  if (img1 === img2) {
    return img2 = generateRandom(Product);
  } else {
    var imgEleTwo = document.createElement('img2');
    imgEleTwo.innerHTML = '<img src=' + images[img2].filePath + '>';

  }

  var img3



}

threeImageGenerator();




//put event listener images

//make sure there are no duplicates

//store previous one and compare to next --> if true than generate new



//generate random combinations of picture
//use for loop to go through images array

//use another for loop --> for j = i + 1 ; j < images.length; j ++
//if images[i] === images[j]; --> return true
//else return false

//publish images to image container in html

//add event listeners to picture id's to trigger functions




