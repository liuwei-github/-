define(function(require){

	require("modules/layer/layer.css");

	var height = $(window).height();
	var Layer = Backbone.View.extend({

		tpl:_.template($("#template").html()),
		modelId : 0, 
		events:{
			"swipeLeft .img-container img" : "showNextImage",
			"swipeRight .img-container img" : "showPreImgage"
		},
		showNextImage:function(){
			// console.log(1)
			var model = this.collection.get(++this.modelId);
			// console.log(model)
			if(model){
				this.getModelData(model);
			}else{
				this.modelId--
			}
			
		},
		showPreImgage:function(){
			var model = this.collection.get(--this.modelId);
			// console.log(model)
			if(model){
				this.getModelData(model);
			}else{
				this.modelId++
			}
		},
		getModelData:function(model){
			this.$(".img-container img").attr("src",model.get("url"));
			this.$(".title").html(model.get("title"))
		},
		render:function(id){
			//console.log(id)
			//console.log(this.collection)
			var model = this.getModelFormCollection(id);
			if(!model){
				location.hash = "#";
				return
			}
			var data = model.pick("title","url");
			data.styles = 'line-height: ' + height + "px";
			// console.log(data)
			var tpl = this.tpl(data);
			this.$el.html(tpl);
			this.$el.show()
		},
		getModelFormCollection:function(id){
			this.modelId = id;
			var model = this.collection.get(id)
			// console.log(model)
			return model
		}
	})
	return Layer
})