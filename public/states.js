angular.module("dotastrat").config([
	"$stateProvider", 
	"$urlRouterProvider",
	function ( $stateProvider, $urlRouterProvider ) {

		$urlRouterProvider.otherwise("/login");

		$stateProvider.state("login", {
			url : "/login",
			templateUrl : "templates/login.html",
		});

		$stateProvider.state("use", {
			url : "/use",
			templateUrl : "templates/use.html",
			controller : "menuController",
			controllerAs : "menu",
		});

		$stateProvider.state("use.team", {
			url : "/team",
			parent : "use",
			template : "<h1>Team Stuff</h2>"
		});

		$stateProvider.state("use.search", {
			url : "/search",
			parent : "use",
			template : "<h1>Hi mom</h2>"
		});

		$stateProvider.state("use.settings", {
			url : "/settings",
			parent : "use",
			template : "<h1>Set your shit</h2>"
		});

		$stateProvider.state("use.saved", {
			url : "/saved",
			parent : "use",
			template : "<h1>Save your life</h2>"
		});

		$stateProvider.state("use.chat", {
			url : "/chat",
			parent : "use",
			template : "<h1>Chat away</h2>"
		});
	}
]);