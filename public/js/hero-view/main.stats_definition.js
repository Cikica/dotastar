define({
	make : function (hero) { 
		return {
			type      : "div",
			attribute : {
				"class" : "hero_stats"
			},
			children : [
				{
					type : "div",
					attribute : {
						"class" : "hero_attributes"
					},
					children : [
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "|"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : "Starting"
									},
									attribute : {
										"class" : "hero_attribute_side_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : "Gain"
									},
									attribute : {
										"class" : "hero_attribute_side_title"
									}
								},

							]
						},
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Strength"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.strength.starting
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : "+"+ hero.strength.gain
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								}
							]
						},
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Agility"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.agility.starting
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : "+"+ hero.agility.gain
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								}
							]
						},
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Inteligence"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.inteligence.starting
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : "+"+ hero.inteligence.gain
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								}
							]
						}
					]
				},
				{
					type : "div",
					attribute : {
						"class" : "hero_attributes"
					},
					children : [
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Speed"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.speed
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								},
							]
						},
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Armor"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.armor
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								}
							]
						},
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Damage"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.damage
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								},
							]
						},
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Mana"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.mana
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								}
							]
						}
					]
				},
				{
					type : "div",
					attribute : {
						"class" : "hero_attributes"
					},
					children : [
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Health"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.health
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								},
							]
						},
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Attack Range"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.range
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								},
							]
						},
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Sight"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.sight
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								},
							]
						},
						{
							type : "div",
							attribute : {
								"class" : "hero_attribute_wrap"
							},
							children : [
								{
									type     : "div",
									property : { 
										textContent : "Missle Speed"
									},
									attribute : {
										"class" : "hero_attribute_title"
									}
								},
								{
									type     : "div",
									property : { 
										textContent : hero.missle
									},
									attribute : {
										"class" : "hero_attribute_field"
									}
								},
							]
						},
					]
				}
			]
		}
	}
})