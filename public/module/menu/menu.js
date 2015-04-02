angular.module( "menu", [] );
angular.module("menu").controller("menuController", function ($scope) {

	$scope.profile = {
		username : "JoohnyBiigballs1234",
		winrate : 60,
		avatar : "http://cdn.dota2.com/apps/dota2/images/heroes/nevermore_full.png",
	};

	$scope.buttons = [
		{
			name : "search",
			notifications : 0
		},
		{
			name : "team",
			notifications : 5
		},
		{
			name : "saved",
			notifications : 0
		},
		{
			name : "settings",
			notifications : 0
		}
	];
});