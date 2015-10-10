  var app = angular.module('myApp', [
            'ngRoute',
            ]
  );

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'stateController'
      })
     
  });

  // create the controller and inject Angular's $scope
  app.controller('stateController', function($scope, $http) {
  	$scope.title = "State Information";
  	$scope.isStateselected = false;
  	$scope.highlightClass = false;
    var url = "http://pos.idtretailsolutions.com/countytest/states";
    $http.get(url).success( function(response) {
      $scope.states = response.data;
    });
    $scope.stateDetail = function(state)
      {
      	$scope.sumPopulation = 0;
      	$scope.matchPopulation = false;
      	$scope.selectedState = state;
      	$http.get(state.detail).success( function(response) {
      	  $scope.selectedState.countydetails = response.data;
      	});

      	$scope.isStateselected = true;
      		console.log(state.population +':'+ $scope.sumPopulation)
      	
      	$scope.addPopulation = function(population)
	    {
	     	$scope.sumPopulation += population;
	     	if(state.population == $scope.sumPopulation)
      		{
      			$scope.matchPopulation = true;
      		}
	    }

     }
     $scope.toggleCLick = function(state)
	{
		state.highlightClass = !state.highlightClass;
		console.log(state.highlightClass);
		if(!state.highlightClass) $scope.isStateselected = false;
		
	} 
  });