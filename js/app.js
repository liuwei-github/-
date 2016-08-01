define(function(require){

	var ImgCollection = require("modules/collection/imgcollection")
	var Layer = require("modules/layer/layer");
	var List = require("modules/list/list");
	// 创建图片的集合
	var imgCollection  = new ImgCollection();

	var layerView = new Layer({
		collection : imgCollection,
		el:$("#layer")
	})

	var listView = new List({
		collection :imgCollection,
		el:$("#list")
	})

	var Router = Backbone.Router.extend({
		routes:{
			"layer/:num":"showLayer",
			'*other':"showList"
		},
		showLayer:function(id){
			//console.log(id)
			// console.log("layer")
			// var view = new Layer({
			// 	el:$("#layer"),
			// 	collection:imgCollection
			// })
			layerView.render(id);
			$("#list").hide();
			$("#layer").show();

		},
		showList:function(){
			// console.log("list")
			// // console.log(1)
			// // view.render()
			// var view = new List({
			// 	el:$("#list"),
			// 	collection:imgCollection
			// })
			$("#layer").hide();
			$("#list").show();
		}
	})

	// return {
	// 	install:function(){
	// 		var router = new Router();
	// 		Backbone.history.start()
	// 	}
	// }
	return function(){
		var router = new Router();
		Backbone.history.start()
	}
})