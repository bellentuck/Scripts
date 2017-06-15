$(function() {

  var model = {
        ogCats: [
          {
            name: 'Truth',
            pic: 'https://www.wired.com/wp-content/uploads/2014/10/cat-ft.jpg',
            clicks: 0,
            visible: true
          },
          {
            name: 'Justice',
            pic: 'http://blognews.am/static/news/b/2013/11/101733.jpg',
            clicks: 0,
            visible: true
          },
          {
            name: 'Altruism',
            pic: 'http://r.ddmcdn.com/s_f/o_1/APL/uploads/2014/10/how-to-put-your-cat-on-a-diet0.jpg',
            clicks: 0,
            visible: false
          },
          {
            name: 'Longing',
            pic: 'https://s-media-cache-ak0.pinimg.com/originals/1d/b2/5b/1db25b0ac3c5b2b0747a20a4a92a5906.jpg',
            clicks: 0,
            visible: false
          },
          {
            name: 'Ecstasy',
            pic: 'http://www.purringangelscattery.com/images/aSeptember30th_2009_019.jpg',
            clicks: 0,
            visible: false
          },
        ]
      };

  var octopus = {
    init: function() {
      view.init();
    }
    listAllCats: function(collection=model.ogCats) {
      var listItems = '';
      for (var i = 0; i < collection.length; i++) {
        listItems.concat('<li>'+collection[i][name]+'</li>');
      };
      var list = document.createElement('ul');
      list.innerHTML = listItems;
    }
    updateVisibleCats: function(collection=model.ogCats, ) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].visible) {
          //render collection[i]
        }
      };
    }


    // We're creating a DOM element for the cat's name,
   var elem = document.createElement('div');
   elem.textContent = num;



    scoreClicks: function(ogCats) {
      for (var i = 0; i < ogCats.length; i++) {
         var thisCat = ogCats[i];

      };
    }




    addCat: function(thisName, thisPic, thisClicks=0) {
      model.newCats.push({
        name: thisName,
        pic: thisPic,
        clicks: thisClicks,
        visible: true
      });
      view.render();
    },

    removeCat: function(thisCollection, thisName) {
      var rgis
    }

    getVisibleCats:
    getNonVisibleCats
    init: function() {
      view.init();
    }
  }

  var view = {
    init: function() {
           var addPizzaBtn = $('.add-pizza');
           addPizzaBtn.click(function() {
               octopus.addPizza();
           });

           // grab elements and html for using in the render function
           this.$pizzaList = $('.pizza-list');
           this.pizzaTemplate = $('script[data-template="pizza"]').html();

           // Delegated event to listen for removal clicks
           this.$pizzaList.on('click', '.remove-pizza', function(e) {
               var pizza = $(this).parents('.pizza').data();
               octopus.removePizza(pizza);
               return false;
           });

           this.render();
       },

    render:
  }

});



//Compendium Operations
var create = function(){
  return { };
};

var newEntry = function(catName, catImg, catClicks){
  this.catName = {'image': catImg, 'clicks': catClicks};
  return this;
};

var populate = function(population){
  for (i = 0; i < population.length; i++) {
    this.newEntry(
      population[i]['name'],
      population[i]['pic'],
      population[i]['clicks']
    );
  return this;
}

var update = function(catName, deltaClicks='+1'){
  var newClicks = parseInt([this[catName]['clicks'], deltaClicks].join());
  this[catName]['clicks'] = newClicks.toString();
  return this;
};

//Compendium Object
var compendiumOne = Compendium.create;
compendiumOne.populate(ogCats);


//name=string; cats=list of cats
var Compendium = function(name){
  this.name = name;
};

Compendium.prototype.create = create;
Compendium.prototype.populate = populate;
Compendium.prototype.update = update;

var Cat = function(name, image, score=0){
  this.name = name;
  this.image = image;
  this.score = score;
};

//Create Compendium
// var speak = function (saywhat) {
//   console.log(saywhat);
// };
// Dog.prototype.speak = speak;
// firstDog.speak('woof');


//Cat Operations
var click =



//Create Cat
var Cat = function(name, image, score=0){
  this.name = name;
  this.image = image;
  this.score = score;
};

var ogCats = [
    { name: 'Truth', pic: '#'},
    { name: 'Justice', pic: '#'},
    { name: 'Charity', pic: '#'},
    { name: 'Longing', pic: '#'},
    { name: 'Worth', pic: '#'},
];


var populate = function(population){
  for (i = 0; i < population.length; i++) {
    population[i]
    this.newEntry(
      population[i]['name'],
      population[i]['pic'],
      population[i]['clicks']
    );
  return this;





//   return compendium
// }
//
// //compendiumItem
//
// //updateItem (via click)
//
//

//
//
// // Cat constructor (class?)
// var Cat = function(){
//   var name, pic;
//   return console.dir(this);
// };
//
//
//
// var speak = function (saywhat) {
//   console.log(saywhat);
// };
//
// Dog.prototype.speak = speak;
//
// firstDog.speak('woof');
//
//
// var speak = function (saywhat) {
//   console.log(saywhat);
// };
// Dog.prototype.speak = speak;
// firstDog.speak('woof');
//
//
//
//
