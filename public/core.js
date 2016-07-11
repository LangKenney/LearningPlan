var toLearnApp = angular.module('toLearnApp', ['ngRoute','ngAnimate', 'ui.bootstrap']);

// Model
toLearnApp.config(function($routeProvider){
    
    $routeProvider
    
    .when('/',{
        templateUrl: 'pages/bio.html',
        controller: 'CarouselCtrl'
    })
    
    .when('/learning',{
        templateUrl: 'pages/tolearn.html',
        controller: 'mainController'
    })
    
    .when('/projects',{
        templateUrl: 'pages/projects.html',
        controller: 'secondController'
        
    })
    
});

//Controllers
//function mainController($scope, $http){ }
toLearnApp.controller('mainController', ['$scope', '$http', function($scope,$http){
    $http.get('/api/tolearn')
        .success(function(data){
            $scope.tolearn = data;
            console.log('---From view to learn---');
            console.log(data);
        })
        .error(function(data){
            console.log('Error:'+data);
        });
        
        //Create a new to learn
        $scope.createtolearn = function(){
            $http.post('/api/tolearn', $scope.formData)
                .success(function(data){
                    $scope.formData = {};
                    $scope.tolearn = data;
                    console.log('---From created to learn---');
                    console.log(data);
                })
                .error(function(data){
                    console.log('Error:'+data)
                });
        };
        
        //Delete a to-learn after checking it
        $scope.deletetolearn = function(id){
            $http.delete('/api/tolearn/'+id)
                .success(function(data){
                    $scope.tolearn = data;
                    console.log('---From deleted tolearn---');
                    console.log(data);
                })
                .error(function(data){
                    console.log('Error:'+data);
                });
        };
            
}]);

toLearnApp.controller('secondController', ['$scope', '$http', function($scope,$http){
  
      $http.get('/api/projects')
        .success(function(data){
            $scope.projects = data;

            console.log('---From view projects---');

        })
        .error(function(data){
            console.log('Error:'+data);
        });
        
        //Create a new to learn
        $scope.createProject = function(){
            $http.post('/api/projects', $scope.formData)
                .success(function(data){
                    $scope.formData = {};
                    $scope.projects = data;
                    console.log('---From created project---');
                    console.log(data);
                })
                .error(function(data){
                    console.log('Error:'+data)
                });
        };
        
        //Delete a to-learn after checking it
        $scope.deleteProject = function(id){
            $http.delete('/api/projects/'+id)
                .success(function(data){
                    $scope.projects = data;
                    console.log('---From deleted project---');
                    console.log(data);
                })
                .error(function(data){
                    console.log('Error:'+data);
                });
        };
        
  
}]);

toLearnApp.controller('CarouselCtrl', ['$scope', function($scope){

    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;
    var numberOfSlides = 6;
    
    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
        image: [
            'https://unsplash.it/1400/1200?image=883',
            'https://unsplash.it/1400/1200?image=908',
            'https://unsplash.it/1400/1200?image=871',
            'https://unsplash.it/1400/1200?image=826',
            'https://unsplash.it/1400/1200?image=1040',
            'https://unsplash.it/1400/1200?image=1030'
        ][slides.length % numberOfSlides],
        //   image: 'http://lorempixel.com/' + newWidth + '/300',
        text: [
            'Born in Telluride Colorado',
            'See Projects page for links to examples projects as well as Github',
            'BS: Aerocpace Engineer Sciences University of Colorado Boulder',
            'Lead Project intergrater at Lockheed Martin Space Systems Company',
            'Senior Aerospace Systems Engineer',
            'See learing Page to see my current learning project'
        ][slides.length % numberOfSlides],
        id: currIndex++
        });
      };
    
    
    for (var i = 0; i < numberOfSlides; i++) {
        $scope.addSlide();
      }
    
   $scope.randomize = function() {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
      };

      // Randomize logic below
    
      function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
          slides[i].id = indexes.pop();
        }
      }
    
      function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
          indexes[i] = i;
        }
        return shuffle(indexes);
      }
    
      // http://stackoverflow.com/questions/962802#962890
   function shuffle(array) {
        var tmp, current, top = array.length;
    
        if (top) {
          while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
          }
        }
    
        return array;
      }
}]);
