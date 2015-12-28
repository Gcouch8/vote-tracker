// Kitten object constructor
function Kitten (name, photo, vote) {
  this.name = name;
  this.photo = photo;
  this.vote = vote;
}

// visitor object
var visitor = {
  id: 0,
  totalVote: 0,
  kittenVoted: []
}
// kitten objects
var k1 = new Kitten('kitten1', 'images/kitten1.jpg', 0);
var k2 = new Kitten('kitten2', 'images/kitten2.jpg', 0);
var k3 = new Kitten('kitten3', 'images/kitten3.jpg', 0);
var k4 = new Kitten('kitten4', 'images/kitten4.jpg', 0);
var k5 = new Kitten('kitten5', 'images/kitten5.jpg', 0);
var k6 = new Kitten('kitten6', 'images/kitten6.jpg', 0);
var k7 = new Kitten('kitten7', 'images/kitten7.jpg', 0);
var k8 = new Kitten('kitten8', 'images/kitten8.jpg', 0);
var k9 = new Kitten('kitten9', 'images/kitten9.jpg', 0);
var k10 = new Kitten('kitten10', 'images/kitten10.jpg', 0);
var k11 = new Kitten('kitten11', 'images/kitten11.jpg', 0);
var k12 = new Kitten('kitten12', 'images/kitten12.jpg', 0);
var k13 = new Kitten('kitten13', 'images/kitten13.jpg', 0);
var k14 = new Kitten('kitten14', 'images/kitten14.jpg', 0);
// array of kitten objects
var kittenArr = [];
kittenArr.push(k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12, k13, k14);

// JQuery variables
var $heading = $('h3');
var $firstImg = $('#firstImg');
var $secondImg = $('#secondImg');
var $firstImgChart = $('#firstImgChart');
var $secondImgChart = $('#secondImgChart');
var $voteAgain = $('#voteAgain');
var $button = $('#button');
var randomImg1;
var randomImg2;
var $firstImgCap = $('#firstImgCap');
var $secondImgCap = $('#secondImgCap');

// display 2 random kitten images
function randomKittens(){
  randomImg1 = 'kitten' + (Math.floor(Math.random() * (14 - 1 + 1)) + 1);
  randomImg2 = 'kitten' + (Math.floor(Math.random() * (14 - 1 + 1)) + 1);
  // make sure random images are not the same
  while (randomImg1 === randomImg2) {
    randomImg2 = 'kitten' + (Math.floor(Math.random() * (14 - 1 + 1)) + 1);
    }

  $firstImg.show();
  $secondImg.show();
  $voteAgain.text('');
  $firstImg.attr({src: 'images/' + randomImg1 + '.jpg', width: 200, height: 200});
  $secondImg.attr({src: 'images/' + randomImg2 + '.jpg', width: 200, height: 200});
}
randomKittens();
// add vote to
$firstImg.on('click', function(){
  $secondImg.hide();
  kittenArr.forEach(function(kitten) {
    if(randomImg1 === kitten.name) {
      kitten.vote += 1;
    }
  });
  renderChart();
  $heading.text('You cast your vote for ' + randomImg1 + '! Vote again for a new elected Meowgressman!');
  $('#next').remove();
  $button.append('<button id="next">next</button>');
  $('#next').on('click', randomKittens);
});

$secondImg.on('click', function() {
  $firstImg.hide();
  kittenArr.forEach(function(kitten) {
    if(randomImg2 === kitten.name) {
      kitten.vote += 1;
    }
  });
  renderChart();
  $heading.text('You cast your vote for ' + randomImg2 + '! Vote again for a new elected meowffiacial!');
  $('#next').remove();
  $button.append('<button id="next">next</button>');
  $('#next').on('click', randomKittens);
});

var $newCanvas = $('<canvas>');
var $kitChart = $('#kitChart');

// render bar chart with vote data
function renderChart() {
  $kitChart.remove('canvas');
  $kitChart.append($newCanvas);
  var $canvas = $('canvas').eq(0).get(0);
  var ctx = $canvas.getContext("2d");

  var data = {
      labels: ['number of votes'],
      datasets: []
      };

  var Dataset = function(label, fillColor, data) {
    this.label = label;
    this.fillColor = fillColor;
    this.data = [data];
    };

  var colors = ["#9E0204", "#015E22"];

  kittenArr.forEach(function(kitten){
    if(randomImg1 === kitten.name) {
      var color = colors[0];
      var newDataSet = new Dataset(kitten.name, color, kitten.vote);
      data.datasets.push(newDataSet);
    }

    if(randomImg2 === kitten.name) {
      var color = colors[1];
      var newDataSet = new Dataset(kitten.name, color, kitten.vote);
      data.datasets.push(newDataSet);
    }
  });

  $firstImgChart.attr({src: 'images/' + data.datasets[0].label + '.jpg', width: 100, height: 100});
  $firstImgCap.text(data.datasets[0].label);
  $secondImgCap.text(data.datasets[1].label);
  $secondImgChart.attr({src: 'images/' + data.datasets[1].label + '.jpg', width: 100, height: 100});

  var options = {
    responsive: true,
    multiTooltipTemplate: function(data) {
      return data.datasetLabel
    }
  };

  var barChart = new Chart(ctx).Bar(data, options);
  var legend = barChart.generateLegend();

  $('#legend').html(legend);

}
