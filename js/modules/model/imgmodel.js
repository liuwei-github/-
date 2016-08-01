// 图片模型模块
define(function(){

	var imgwidth = parseInt(($(window).width() - 3 * 6) / 2)
	
	var ImgModel = Backbone.Model.extend({
		initialize:function(){
			this.on("add",function(model){
				var imgheight = parseInt(model.get("height") * imgwidth / model.get("width"))
				model.set({
					showWidth: imgwidth,
					showHeight: imgheight
				})
				// console.log(model)
			})
		}
	})

	return ImgModel;
})