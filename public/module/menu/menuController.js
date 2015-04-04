(function () {
	'use strict';

	angular.module("menu").controller("menuController", menuController );

	function menuController () {
		
		var viewModel, winrate;
		viewModel = this;
		winrate = 30;

		viewModel.profile = {
			username : "JohhnySwag1234",
			winrate : {
				percent : winrate,
				pie : { 
					rotate_small : Math.round( 360*(winrate/100) ),
					rotate_big : Math.round( 360-(360*(winrate/100)))
				}
			},
			avatar : "http://cdn.dota2.com/apps/dota2/images/heroes/nevermore_full.png",
		};

		viewModel.activeButton = "search";
		viewModel.buttons = [
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
				name : "chat",
				notifications : 10
			}
		];
	};
})();