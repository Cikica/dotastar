define({

	define : {
		require : [
			"background_image",
			"eloquent"
		]
	},

	make : function () {
		this.library.background_image.make({
			background : "/media/login/background/pa1.jpg",
			fade       : "4",
			class_name : {}
		})
		this.library.eloquent.make({
			append_to  : document.body,
			class_name : {
				wrap   : "box_wrap",
				button : {
					"body" : "button"
				}
			},
			part       : [
				{
					type : "button",
					name : "sign in with steam",
					with : {
						text  : "Sign In With Steam",
						event : { 
							click : function () {}
						}
					}
				}
			]
		})
		console.log("entrude young messenger")
	}
	
})