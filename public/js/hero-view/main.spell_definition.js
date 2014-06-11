define({
	
	define : {
		require : ["morphism"]
	},

	make : function (hero) { 
		var self = this
		return {
			type      : "div",
			attribute : {
				"class" : "hero_spells"
			},
			children : this.library.morphism.homomorph({
				object : hero.spells,
				set    : "array",
				with   : function (member) {
					return { 
						type      : "div",
						attribute : { 
							"class" : "hero_spell"
						},
						children : [
							{
								type      : "div",
								attribute : {
									"class" : "hero_spell_icon_wrap"
								},
								children : [
									{
										type      : "div",
										property  : { 
											textContent : member.value.name
										},
										attribute : { 
											"class" : "hero_spell_name"
										}
									},
									{
										type      : "img",
										attribute : { 
											src     : "/media/hero-view/"+ hero.alias +"/"+ member.property_name +".png",
											"class" : "hero_spell_icon"
										}
									},
								]
							},
							{
								type      : "div",
								attribute : { 
									"class" : "hero_spell_details"
								},
								children : [
									{
										type      : "div",
										attribute : { 
											"class" : "hero_spell_stats"
										},
										children : self.library.morphism.homomorph({
											object : member.value.stats,
											set    : "array",
											with   : function (stats) { 
												return {
													type      : "div",
													attribute : { 
														"class" : "hero_spell_stat"
													}, 
													children : [
														{
															type      : "div",
															property : {
																textContent : self.capitalise(stats.property_name.replace(/\_/g, " ")) + " -"
															},
															attribute : { 
																"class" : "hero_spell_stat_name"
															}
														},
														{
															type      : "div",
															property : {
																textContent : stats.value
															},
															attribute : { 
																"class" : "hero_spell_stat_value"
															}
														}
													]
												}
											}
										})
									},
									{
										type      : "div",
										attribute : { 
											"class" : "hero_spell_description"
										},
										children : function () {
											var children = [
												{
													type      : "div",
													property : {
														textContent : member.value.description
													},
													attribute : { 
														"class" : "hero_spell_story"
													},		
												}
											]
											if ( member.value.notes ) {
												children = children.concat({
													type      : "div",
													property : {
														textContent : member.value.notes
													},
													attribute : { 
														"class" : "hero_spell_notes"
													},		
												})
											}
											return children
										}
									}
								]								
							},
						]
					}
				}
			})
		}
	},

	capitalise : function (string) { 
		return this.library.morphism.index_loop({
			array   : string.split(" "),
			else_do : function (loop) { 
				return loop.into.concat(loop.indexed.charAt(0).toUpperCase() + loop.indexed.slice(1))
			}
		}).join(" ")
	},
})