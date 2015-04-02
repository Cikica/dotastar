<!DOCTYPE html>
<html>
<head>
	
	<meta charset="UTF-8">
	
	<link rel="stylesheet" href="/style/main.css">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:700,400' rel='stylesheet' type='text/css'>

	<script src="/bower_components/angular/angular.js"></script>
	<script src="/bower_components/angular-ui-router/release/angular-ui-router.js"></script>

	<script src="main.js"></script>
	<script src="states.js"></script>
	<script src="module/menu/menu.js"></script>

</head>

<body class="wrap" ng-app="dotastrat">
	<?php //echo View::make("menu"); ?>
	<div ui-view></div>
</body>

</html>