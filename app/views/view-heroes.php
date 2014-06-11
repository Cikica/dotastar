<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Chose Your Hero</title>
	<script data-directory="/js/hero-view" src="/js/hero-view/require_package.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/hero-view/main.css">
</head>
<body>
	<div id="hero-view" class="hero_main"></div>
	<script>
		window.hero_view.make({
			hero        : JSON.parse( '<?php echo $hero; ?>' ),
			heroes      : JSON.parse( '<?php echo $heroes; ?>' ),
			inside      : document.getElementById("hero-view"),
			class_names : {}
		})
	</script>
</body>
</html>