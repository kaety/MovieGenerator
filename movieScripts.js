key=config.key;
var movies=[];


function movieController($scope,$http,$window) {
  $scope.i=0;
  $scope.test=genres;

  $scope.generateResult= function(){

    $scope.movie={title:"",poster:"",desc:"",rat:null, id:""};

    $http.get('http://api.themoviedb.org/3/discover/movie?api_key='+key+'&with_genres='+
    $scope.genre1+','+$scope.genre2).
    success(function(data, status, headers, config) {
      //debugging
      console.log(data);
      nResults=Object.keys(data.results).length;
      if(nResults==0){
        $scope.result="No results found!";
      }
      else{
        var r=Math.floor(Math.random() * nResults);
        var movieObj=data.results[r];
        
        $scope.result=movieObj.original_title;
        $scope.movie.title=$scope.result;

        posterPath=movieObj.paster_path;
        $scope.poster="http://image.tmdb.org/t/p/w185"+movieObj.poster_path;
        $scope.movie.poster=$scope.poster;
        var resultId=movieObj.id;
        $http.get('http://api.themoviedb.org/3/movie/'+resultId+'?api_key='+key).
        success(function(data,status,headers,config){

          $scope.imdbId=data.imdb_id;
          $scope.movie.id=$scope.imdbId;
          httpGetImdb($scope,$http);
        }).
        error(function(data, status, headers, config) {
          //TODO
          alert(status);
        });
        }
    }).
    error(function(data, status, headers, config) {
      //TODO
      alert(status);
    });
    
  }

$scope.goToImdb=function(){
  $window.open('http://www.imdb.com/title/'+$scope.imdbId, '_blank');
}

$scope.previousMovie=function(){
  console.log($scope.i);
  console.log(movies);
  $scope.result=movies[$scope.i-2].title;
  $scope.poster=movies[$scope.i-2].poster;
  $scope.description=movies[$scope.i-2].desc;
  $scope.rating=movies[$scope.i-2].rat;
  $scope.imdbId=movies[$scope.i-2].id;
  $scope.i--;
  movies.pop($scope.i);
}

}


function httpGetImdb($scope,$http){
  $http.get('http://www.omdbapi.com/?i='+$scope.imdbId).
        success(function(data,status,headers,config){
          //debugging
          console.log(data);
          $scope.description=data.Plot;
          $scope.movie.desc=$scope.description;
          $scope.rating=data.imdbRating;
          $scope.movie.rat=$scope.rating;
          movies.push($scope.movie);
          $scope.i++;
        }).
        error(function(data, status, headers, config) {
          //TODO
          alert(status);
        });

}


