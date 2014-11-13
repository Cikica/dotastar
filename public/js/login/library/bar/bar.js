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
				"child" : [
					this.define_bar_container_and_bodies({
						define     : define,
						class_name : class_name 
					})
				]
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

		return this.define_interface({
			body : bar_body,
			with : define
		})
	},

	define_bar_container_and_bodies : function ( bar ) {
		var self = this
		return {
			"float" : "left",
			"width" : "100%",
			"child" : this.library.morph.index_loop({
				subject : this.order_bar_definition_from_lowest_value_to_highest({
					definition : bar.define.bar.definition
				}),
				else_do : function ( loop ) {
					return loop.into.concat( 
						self.define_bar_body({
							"class_name"        : bar.class_name[loop.indexed.name],
							"bar"               : loop.indexed,
							"bar_index"         : loop.index,
							"number_of_bars"    : bar.define.bar.definition.length,
							"maximum_bar_value" : bar.define.bar.maximum_value,
							"bar_pixel_width"   : 500,
							"bar_height"        : 40
						})
					)
				}
			})
		}
	},

	define_interface : function ( define ) {
		var self
		self = this
		return { 
			body      : define.body.body,
			append    : define.body.append,
			set_value : function ( set ) {
				
				var new_definition, new_bar_container_and_bars

				if ( set.for.constructor === Array ) {
					new_definition = self.library.morph.index_loop({
						subject : define.with.bar.definition,
						into    : self.library.morph.index_loop({
							subject : set.for,
							else_do : function ( loop ) { 
								return loop.into.concat({
									name  : loop.indexed.bar,
									value : loop.indexed.which_is
								})
							}
						}),
						else_do : function ( loop ) {
							
							return loop.into
						}
					})
				}

				// new_bar_container_and_bars = this.library.transistor.make()
				define.body.body.removeChild( define.body.body.firstChild )

				console.log( "setting value ")
			}
		}
	},

	calculate_bar_body_dimensions : function ( bar ) { 

		var bar_body_definition, pixels_needed_to_align_bar_body_with_others, 
		number_of_pixels_to_move_body_down_by, multiplier, indicator_height, bar_width_in_percent

		multiplier                                  = bar.multiplier
		indicator_height                            = ( bar.bar_index * multiplier ) + multiplier
		number_of_pixels_to_move_body_down_by       = ( bar.number_of_bars-bar.bar_index ) * 25
		pixels_needed_to_align_bar_body_with_others = multiplier * bar.bar_index
		bar_width_in_percent                        = Math.round( bar.value / ( bar.maximum_bar_value/100 ) )

		return {
			"indicator_height"                            : indicator_height,
			"number_of_pixels_to_move_body_down_by"       : number_of_pixels_to_move_body_down_by,
			"pixels_needed_to_align_bar_body_with_others" : pixels_needed_to_align_bar_body_with_others,
			"bar_width_in_percent"                        : bar_width_in_percent,
			"bar_z_index"                                 : bar.number_of_bars-bar.bar_index,
			"bar_top_offset"                              : ( ( bar.bar_height * bar.number_of_bars ) * bar.bar_index )
		}
	},

	define_bar_body : function ( define ) {


		var bar_body_definition, calculated

		calculated = this.calculate_bar_body_dimensions({
			"multiplier"        : 25,
			"bar_index"         : define.bar_index,
			"number_of_bars"    : define.number_of_bars,
			"value"             : define.bar.value,
			"maximum_bar_value" : define.maximum_bar_value,
			"bar_height"        : define.bar_height
		})

		bar_body_definition = {
			"class"      : define.class_name.wrap,
			"position"   : "relative",
			"clear"      : "both",
			"data-value" : define.bar.value,
			"data-name"  : define.bar.name,
			"width"      : calculated.bar_width_in_percent + "%",
			"top"        : "-" + calculated.bar_top_offset +"px",
			"z-index"    : calculated.bar_z_index,
			"child"    : [
				{
					"class"         : define.class_name.name_and_value_wrap,
					"margin-top"    : calculated.number_of_pixels_to_move_body_down_by + "px",
					"margin-bottom" : calculated.pixels_needed_to_align_bar_body_with_others +"px",
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
					"margin-top" : calculated.number_of_pixels_to_move_body_down_by +"px",
					"height"     : calculated.indicator_height +"px",
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
		console.log( bar.definition )
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