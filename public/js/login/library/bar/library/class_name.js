define({
	define : {
		allow   : "*",
		require : [
			"morph"
		]
	},

	make : function ( for_bar ) { 
		var general_bar_class_names, specific_bar_class_names
		general_bar_class_names  = { 
			"main_wrap" : "bar_wrap"
		}
		specific_bar_class_names = {
			"Magic HP"  : {
				"wrap"                : "bar_for_magic_hp_wrap",
				"body"                : "bar_for_magic_hp_body",
				"name_and_value_wrap" : "bar_for_magic_hp_name_and_value_wrap",
				"name_text"           : "bar_for_magic_hp_name_text",
				"value_text"          : "bar_for_magic_hp_value_text",
				"indicator"           : "bar_for_magic_hp_indicator"
			},
			"EHP" : {
				"wrap"                : "bar_for_ehp_wrap",
				"body"                : "bar_for_ehp_body",
				"name_and_value_wrap" : "bar_for_ehp_name_and_value_wrap",
				"name_text"           : "bar_for_ehp_name_text",
				"value_text"          : "bar_for_ehp_value_text",
				"indicator"           : "bar_for_ehp_indicator"
			},
			"HP"  : {
				"wrap"                : "bar_for_hp_wrap",
				"body"                : "bar_for_hp_body",
				"name_and_value_wrap" : "bar_for_hp_name_and_value_wrap",
				"name_text"           : "bar_for_hp_name_text",
				"value_text"          : "bar_for_hp_value_text",
				"indicator"           : "bar_for_hp_indicator"
			}
		}

		if ( for_bar.constructor === Array ) { 
			return this.library.morph.index_loop({
				subject : for_bar,
				into    : general_bar_class_names,
				else_do : function ( loop ) {
					loop.into[loop.indexed] = specific_bar_class_names[loop.indexed]
					return loop.into
				}
			})
		} else {
			return class_name[for_bar]
		}
	}
})