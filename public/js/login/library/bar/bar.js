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

		if ( define.bar.definition.constructor === Array ) {
			
			bar_body = this.library.transistor.make({
				"class" : class_name.main_wrap,
				"width" : "300px",
				"child" : this.library.morph.index_loop({
					subject : this.order_bar_definition_from_lowest_value_to_highest({
						definition : define.bar.definition
					}),
					else_do : function ( loop ) {
						return loop.into.concat( 
							self.define_bar_body({
								"class_name"        : class_name[loop.indexed.name],
								"bar"               : loop.indexed,
								"bar_index"         : loop.index,
								"number_of_bars"    : define.bar.definition.length,
								"maximum_bar_value" : define.bar.maximum_value,
								"bar_pixel_width"   : 300,
								"bar_height"        : 40
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


		var bar_body_definition, pixels_needed_to_align_bar_body_with_others, 
		number_of_pixels_to_move_body_down_by, multiplier, indicator_height, bar_width_in_percent

		multiplier                                  = 25
		indicator_height                            = ( define.bar_index * multiplier ) + multiplier
		number_of_pixels_to_move_body_down_by       = ( define.number_of_bars-define.bar_index ) * 25
		pixels_needed_to_align_bar_body_with_others = multiplier * define.bar_index
		bar_width_in_percent                        = Math.round( define.bar.value / ( define.maximum_bar_value/100 ) )

		bar_body_definition             = {
			"class"    : define.class_name.wrap,
			"width"    : bar_width_in_percent + "%",
			"position" : "relative",
			"clear"    : "both",
			"top"      : "-" + ( ( define.bar_height * define.number_of_bars ) * define.bar_index ) +"px",
			"z-index"  : ( define.number_of_bars-define.bar_index ),
			"child"    : [
				{
					"class"         : define.class_name.name_and_value_wrap,
					"margin-top"    : number_of_pixels_to_move_body_down_by + "px",
					"margin-bottom" : pixels_needed_to_align_bar_body_with_others +"px",
					"child"         : [
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
					"margin-top" : number_of_pixels_to_move_body_down_by +"px",
					"height"     : indicator_height +"px",
					"class"      : define.class_name.indicator
				},
				{ 	
					
					"class"      : define.class_name.body
				}
			]
		}
		return bar_body_definition
	},

	order_bar_definition_from_lowest_value_to_highest : function ( bar ) {

		var value_of_bars_from_lowest_to_highest, value_of_bar_to_definition

		value_of_bar_to_definition           = this.library.morph.index_loop({
			subject : bar.definition,
			into    : {},
			else_do : function ( loop ) { 
				loop.into[loop.indexed.value] = loop.indexed
				return loop.into
			} 
		})
		value_of_bars_from_lowest_to_highest = this.library.morph.index_loop({
			subject : bar.definition,
			else_do : function ( loop ) { 
				return loop.into.concat( loop.indexed.value )
			} 
		}).sort(function ( current_number, any_following_number ) {
			return ( current_number < any_following_number ? -1 : 1 )
		})

		return this.library.morph.index_loop({
			subject : value_of_bars_from_lowest_to_highest,
			else_do : function ( loop ) {
				return loop.into.concat( value_of_bar_to_definition[loop.indexed] )
			}
		})
	}
})