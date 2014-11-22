define({
	name    : "main",
	main    : "main",
	start   : { 
		test : { 
			with : {}
		}
	},
	module  : [
		"library/event_master",
		"library/morphism"
	],
	package : [
		"library/background_image",
		"library/bar"
	]
})