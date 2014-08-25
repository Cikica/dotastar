define({

	define : {
		allow   : "*",
		require : [
			"transistor"
		]
	},

	make : function ( define ) {
		
		var body, background_fade, tbody
		background_fade = this.calculate_fade({
			given : define.fade,
			base  : 10
		})
		body            = this.library.transistor.make({
			height             : "100%",
			width              : "100%",
			position           : "fixed",
			"z-index"          : "-1",
			"background-color" : "#111",
			child              : [
				{
					type   : "img",
					width  : "100%",
					height : "auto",
					opacity: background_fade,
					src    : define.background,
				}
			]
		})

		body.append(
			document.body 
		)
	},

	calculate_fade : function ( fade ) {
		var result 
		result = ( ( fade.base - fade.given ) * 0.1 )
		if ( result < 0.1 ) { 
			return 0.1
		} else { 
			return result
		}
	},
	
})