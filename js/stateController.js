
  // create the controller and inject Angular's $scope , restCall Factory
  app.controller('stateController', function($scope, restCallFactory) {
  	$scope.title = "State Information";
  	$scope.isStateselected = false;
  	$scope.highlightClass = false;
    
    // Display statelist callback function
    $scope.displayList = function(response)
    {
      $scope.states = response.data;
    }

    // Display state detail callback function
    $scope.displayDetail = function(response)
    {
      $scope.selectedState.countydetails = response.data;
    }
    // Erro callback function
    $scope.errorMessage = function(data)
    {
      console.log('Error');
    }
        // rest call factory to get state details
    var url = "http://pos.idtretailsolutions.com/countytest/states";
    response = restCallFactory.get(url, $scope.displayList, $scope.errorMessage);
    
   
    $scope.stateDetail = function(state)
      {
      	$scope.sumPopulation = 0;
      	$scope.matchPopulation = false;
      	$scope.selectedState = state;

        // rest call factory to get state details
        response = restCallFactory.get(state.detail, $scope.displayDetail, $scope.errorMessage);
       
      	$scope.isStateselected = true;
      	
        // Sum total population of county
        $scope.addPopulation = function()
        {
          var sumPopulation = 0;
          angular.forEach($scope.selectedState.countydetails, function(value, key) {
            sumPopulation += value.population;
          });
          if(sumPopulation == state.population)
          {
            $scope.matchPopulation = true;
          }
          return sumPopulation;
        }

     }

     // double click event 
     $scope.toggleCLick = function(state)
  	{
  		state.highlightClass = !state.highlightClass;
  		console.log(state.highlightClass);
  		if(!state.highlightClass) $scope.isStateselected = false;
  		
  	} 


  });