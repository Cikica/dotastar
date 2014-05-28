define({

	define : {
		require : ["node_maker", "morphism"]
	},

	make : function (make) {

		var hero

		hero = this.components.heroes[make.current.for_hero]
		this.library.node_maker.make_node({
			type      : "div",
			attribute : { 
				"class" : "hero_view"
			},
			children : [
				// naviagtion
				{
					type : "div",
					attribute : { 
						"class" : "hero_view_navigation"
					},
					children : [
						{
							type : "select",
							attribute : { 
								"class" : "hero_select"
							},
							children : this.library.morphism.homomorph({
								object : this.components.heroes,
								set    : "array",
								with   : function (member) {
									return {
										type : "option",
										property : {
											textContent : member.value.name
										},
										attribute : { 
											value : member.property_name
										}
									}
								}
							})
						},
					]
				},
				// buttons
				{
					type : "div",
					attribute : {
						"class" : "hero_buttons"
					},
					children : [
						{
							type     : "div",
							property : { 
								textContent : "Spells",
							},
							attribute : {
								"class" : "hero_button"
							},
						},
						{
							type     : "div",
							property : { 
								textContent : "Stats",
							},
							attribute : {
								"class" : "hero_button"
							},
						},
						{
							type     : "div",
							property : { 
								textContent : "Make Build For Hero",
							},
							attribute : {
								"class" : "hero_button"
							},
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
								this.components.stats_definition.make(hero)
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
										src : hero.portrait
									},
									attribute : {
										"class" : "hero_image"
									},
								},
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