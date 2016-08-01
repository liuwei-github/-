// 该模块是图片的集合容器
define(function(require){
	// 获取图片模型的类
	var ImgModel = require("modules/model/imgmodel")
	// 创建了一个集合类
	var ImgCollection = Backbone.Collection.extend({
		
		model:ImgModel,
		imgId:0,
		// 用来拉去服务器端的数据，添加到集合中
		fetchData:function(success){
			var that = this;
			$.get("data/imageList.json",function(res){
				if(res.errno === 0){
					// console.log(res.data);
					res.data.map(function(obj){
						obj.id = that.imgId++;
					})
					that.add(res.data)
					success && success()
				}			
			})
		}
	})

	// var img = new ImgCollection()
	// img.fetchData(function(){
	// 	console.log(img)
	// })
	// img.add({
	// 	"title": "精彩建筑摄影作品",
	// 	"url": "img/01.jpg",
	// 	"width": 640,
	// 	"height": 400
	// })
	
	return ImgCollection;
})