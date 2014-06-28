define({

	define : {
		require : ["node_maker", "morphism"]
	},

	make : function (make) {

		var hero
		hero = make.current.hero
		this.library.node_maker.make_node({
			type      : "div",
			attribute : { 
				"class" : "hero_view"
			},
			children : [
				{
					type : "div",
					attribute : { 
						"class" : "hero_view_navigation"
					},
					children : [
						{
							type     : "div",
							property : { 
								textContent : "Make Build For Hero",
							},
							attribute : {
								"class" : "hero_button"
							},
						},
						{
							type : "select",
							attribute : { 
								"class" : "hero_select"
							},
							children : this.library.morphism.index_loop({
								array   : make.current.heroes,
								else_do : function (loop) {
									var option = {
										type     : "option",
										property : {
											textContent : loop.indexed
										},
										attribute : { 
											value    : "/hero/"+ loop.indexed
										}
									}
									if ( loop.indexed === hero.alias ) { 
										option.attribute.selected = "selected"
									}
									return loop.into.concat(option)
								}
							})
						},
					]
				},
				// windows
				{
					type      : "div",
					attribute : {
						"class" : "hero_wrap"
					},
					children : [
						{	
							type      : "div",
							attribute : {
								"class" : "hero_details"
							},
							children  : [
								this.components.spell_definition.make(hero),
								// this.components.stats_definition.make(hero)
							]
						},
						{
							type      : "div",
							attribute : {
								"class" : "hero"
							},
							children : [
								{
									type      : "div",
									property : { 
										textContent : hero.name
									},
									attribute : {
										"class" : "hero_name"
									},
								},
								{
									type      : "div",
									attribute : {
										"class" : "hero_class"
									},
									property : { 
										textContent : hero.class
									},
								},
								{
									type      : "div",
									attribute : {
										"class" : "hero_quote"
									},
									property : { 
										textContent : '"'+ hero.quote +'"'
									},
								},
								{
									type      : "img",
									property  : {
										src : "/media/hero-view/"+ hero.alias +"/portrait.png"
									},
									attribute : {
										"class" : "hero_image"
									},
								},
								this.components.stats_definition.make(hero)
							]
						}
					]
				},
			]
		}).append(make.current.inside)
	},

	// define components that are part of it # think will change this so anything is requirable
	// add_component : [],
	components : {},
})