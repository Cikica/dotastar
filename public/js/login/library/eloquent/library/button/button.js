define({

	define : {
		allow   : "*",
		require : []
	},

	make : function () {
		// console.log( this.library )
		console.log("entrude young messenger")
	},

	define_body : function ( define ) {
		console.log( define )
		return { 
			"class"       : define.class_name.body,
			"data-button" : define.name,
			"text"        : define.with.text
		}
	},

	define_state : function ( define ) {
		return {}
	},

	define_event : function ( define ) {
		return [
			{
				called       : "button click",
				that_happens : [
					{ 
						on : define.with.body,
						is : [ "click" ]
					}
				],
				only_if : function ( heard ) { 
					return ( heard.event.target.getAttribute("data-button") )
				}
			}
		]
	},

	define_listener : function ( define ) {
		return [
			{ 
				for       : "button click",
				that_does : function ( heard ) {
					console.log("click")
					return heard
				}
			}
		]
	}	
})