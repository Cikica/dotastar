define({

	define : {
		allow   : "*",
		require : [
			"transistor",
			"morph",
			"class_name"
		]
	},

	make : function ( define ) {
		
		var bar_body, class_name, self

		self       = this
		class_name = ( define.use_builtin_class_definition ?
			this.library.class_name.make( define.use_builtin_class_definition ) :
			define.class_name
		)
		console.log( class_name )
		if ( define.bar.definition.constructor === Array ) {

			bar_body = this.library.transistor.make({
				"class" : class_name.main_wrap,
				"child" : this.library.morph.index_loop({
					subject : define.bar.definition,
					else_do : function ( loop ) { 
						return loop.into.concat( 
							self.define_bar_body({
								"class_name" : class_name[loop.indexed.name],
								"bar"        : loop.indexed
							})
						)
					}
				})
			})
		}

		if ( define.bar.definition.constructor === Object ) {

			bar_body = this.library.transistor.make({
				"class" : class_name.main_wrap,
				"child" : [].concat(
					this.define_bar_body({
						"class_name" : class_name,
						"bar"        : define.bar.definition
					})
				)
			})
		}

		return {
			body   : bar_body.body,
			append : bar_body.append
		}
	},

	define_bar_body : function ( define ) { 
		var bar_body_definition
		bar_body_definition = {
			"class" : define.class_name.wrap,
			"child" : [
				{
					"class" : define.class_name.name_and_value_wrap,
					"child" : [
						{ 
							"class" : define.class_name.name_text,
							"text"  : define.bar.name
						},
						{ 
							"class" : define.class_name.value_text,
							"text"  : define.bar.value
						}
					]
				},
				{ 
					"class" : define.class_name.indicator
				},
				{ 
					"class" : define.class_name.body
				}
			]
		}
		return bar_body_definition
	}
})