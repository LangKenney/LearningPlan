var todoApp = angular.module('todoApp', ['ngRoute']);

todoApp.config(function($routeProvider){
    
    $routeProvider
    .when('/',{
        templateUrl: 'pages/todo.html',
        controller: 'mainController'
    })
    
    .when('/tobuy',{
        templateUrl: 'pages/tobuy.html',
        controller: 'secondController'
        
    })
    
});

//function mainController($scope, $http){ }
todoApp.controller('mainController', ['$scope', '$http', function($scope,$http){
    $http.get('/api/todos')
        .success(function(data){
            $scope.todos = data;
            console.log('---From view todos---');
            console.log(data);
        })
        .error(function(data){
            console.log('Error:'+data);
        });
        
        $scope.createTodo = function(){
            $http.post('/api/todos', $scope.formData)
                .success(function(data){
                    $scope.formData = {};
                    $scope.todos = data;
                    console.log('---From created todo---');
                    console.log(data);
                })
                .error(function(data){
                    console.log('Error:'+data)
                });
        };
        
        //Delete a to-do after checking it
        $scope.deleteTodo = function(id){
            $http.delete('/api/todos/'+id)
                .success(function(data){
                    $scope.todos = data;
                    console.log('---From deleted todo---');
                    console.log(data);
                })
                .error(function(data){
                    console.log('Error:'+data);
                });
        };
            
}]);

todoApp.controller('secondController', ['$scope', '$http', function($scope,$http){
        $http.get('/api/tobuys')
        .success(function(data){
            $scope.tobuys = data;
            console.log('---From view to buys---');
            console.log(data);
        })
        .error(function(data){
            console.log('Error:'+data);
        });
        
        $scope.createTobuy = function(){
            $http.post('/api/tobuys', $scope.formData)
                .success(function(data){
                    $scope.formData = {};
                    $scope.tobuys = data;
                    console.log('---From created to buys---');
                    console.log(data);
                })
                .error(function(data){
                    console.log('Error:'+data)
                });
        };
        
        //Delete a to-do after checking it
        $scope.deleteTobuy = function(id){
            $http.delete('/api/tobuys/'+id)
                .success(function(data){
                    $scope.tobuys = data;
                    console.log('---From deleted to buys---');
                    console.log(data);
                })
                .error(function(data){
                    console.log('Error:'+data);
                });
        };
            
}]);