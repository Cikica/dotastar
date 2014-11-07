define({

	define : {
		require : [
			"background_image",
			"eloquent",
			"bar"
		]
	},

	make : function ( define ) {

		var background_image, bar

		this.library.background_image.make({
			background : "/media/login/background/pa1.jpg",
			fade       : "4",
			class_name : {}
		})

		bar = this.library.bar.make({
			class_name                   : {},
			use_builtin_class_definition : [
				"HP",
				"EHP",
				"Magic HP"
			],
			recuperation                 : {
				value      : "0.5",
				operator   : "+",
				orientaton : "left"
			},
			bar          : {
				maximum_value : 1200,
				definition    : [
					{ 
						name        : "HP",
						value       : 600,
						description : ""
					},
					{ 
						name        : "EHP",
						value       : 700,
						description : ""
					},
					{ 
						name        : "Magic HP",
						value       : 1000,
						description : ""
					}
				]
			}
		})

		bar.append( document.body )
		console.log( bar )

		// bar.set_value([
		// 	{
		// 		"for"      : "HP",
		// 		"which_is" : 500
		// 	}
		// ])

	}
	
})