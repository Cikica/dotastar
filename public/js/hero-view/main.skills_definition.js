define({
	make : function (hero) { 
		return {
			type      : "div",
			attribute : {
				"class" : "hero_spells"
			},
			children : [
				{
					type      : "div",
					property : { 
						textContent : hero.story
					},
					attribute : {
						"class" : "hero_story"
					},
				},
			]
		}
	}
})