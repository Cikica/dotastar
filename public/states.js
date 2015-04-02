angular.module("dotastrat").config([
	"$stateProvider", 
	"$urlRouterProvider",
	function ( $stateProvider, $urlRouterProvider ) {

		$urlRouterProvider.otherwise("/use");

		$stateProvider.state("use", {
			url : "/use",
			templateUrl : "templates/use.html",
			controller : "menuController"
		});
	}
]);