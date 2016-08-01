// 创建列表视图
define(function(require){
	require("modules/list/list.css");
	var Throttle = require("tools/throttle");
	var a =0;
	var List = Backbone.View.extend({
		tpl: _.template('<a href="#layer/<%=id%>"><img style="<%=style%>" src="<%=url%>" alt="" /></a>'),
		leftHeight: 0,
		rightHeight: 0,
		events:{
			"click .search-btn":"showSearchView",
			"tap .nav li" : "chooseImgType",
			"tap .go-top" : "gotoTop"
		},
		initialize:function(){
			var that = this;			
			// 渲染初始页面
			// 第一步获取页面图片的数据
			this.getData();   
			// 获取图片容器元素
			this.initDom();
			// getData()是异步执行所以要监听集合的数据添加
			// this.collection.on("add",function(){})
			this.listenTo(this.collection,"add",function(model){
				this.render(model)
			})	
			// 绑定window scroll事件来监听页面滚到底部加载图片
			$(window).on("scroll",function(){
				Throttle(that.loadMoreData,{
					context:that
				})
			})
		},

		loadMoreData:function(){
			var h = $("body").height() - $(window).height() - $(window).scrollTop();			
				if(h<=300){
					this.getData()
				}
				this.showHide()
		},
		showHide:function(){
			if($(window).scrollTop() > 100){
				this.$(".go-top").show()
			}else{
				this.$(".go-top").hide()
			}
		},
		getData:function(){
			this.collection.fetchData()
		},
		initDom:function(){
			// 获取左边图片列表容器
			this.leftContainer = this.$(".left-list")
			// 获取右边图片列表容器
			this.rightContainer = this.$(".right-list")
		},
		render:function(model){
			// 获取json数据
			var data = {
				id:model.get("id"),
				style:'width: ' + model.get("showWidth") + "px; height: " + model.get("showHeigth") + "px",
				url:model.get("url")
			}
			// 格式化模板
			var tpl = this.tpl(data);
			// 插入到页面中
			// 判断左右两个容器哪个容器矮就向哪个容器内添加图片
			if (this.leftHeight > this.rightHeight) {
				this.renderRight(tpl, model.get('showHeight'));
			} else {
				this.renderLeft(tpl, model.get('showHeight'));
			}


			// var that = this
			// // this.$el.html("我是列表")
			// this.collection.fetchData(function(){
			// 	console.log(that.collection)
			// })
		},
		renderRight:function(tpl,height){
			this.rightHeight += height + 6;
			this.leftContainer.append($(tpl))
		},
		renderLeft:function(tpl,height){
			this.leftHeight += height + 6;
			this.rightContainer.append($(tpl))
		},
		// 显示搜索结果页
		showSearchView:function(){
			// 第一步获取搜索的内容
			var val = this.getSeachInputValue();
			// 第二步根据搜索的内容获取数据
			if(val){
				var result = this.searchDataFromCollection(val,"title"); 
				if(result.length === 0){
					alert("对不起，没找到你想要的结果")
					this.render()
				}
				this.resetView(result)
				// console.log(result)
			}
			
		},
		// 获取搜索框里面的内容
		getSeachInputValue:function(){
			var val = this.$(".search-input").val()
			if(/^\s*$/.test(val)){
				alert("请输入搜索内容")
				return;
			}
			val = val.replace(/^\s+|\s+$/g,"");
			// console.log(val)
			return val;
		},
		/**
		 * 在集合中搜索数据
		 * @val: 	搜索的query
		 * @key: 	模型的搜索属性
		 */
		searchDataFromCollection:function(val,key){
			var searchkey = key || "title"
			var data = this.collection.filter(function(model){
				// 精确的搜索匹配，判断val是不是在模型的title里面
				return model.get(searchkey).indexOf(val) >= 0;
			})
			return data
		},
		/**
		 * 重置搜搜的视图的
		 * @result 		搜索数据结果的数组
		 */ 
		resetView:function(result){
			var that = this;
			this.clearView();
			// 遍历reult中的model
			result.forEach(function(model,index){
				that.render(model)
			})
		},
		/**
		 * 清空图片容器视图
		 */
		clearView:function(){
			// 清空右边图片容器内容
			this.rightContainer.html('')
			// 清空左边容器高度
			this.rightHeight = 0;
			// 清空左边图片容器内容
			this.leftContainer.html('')
			// 清空右边容器高度
			this.leftHeight = 0;
		},
		/**
		 * 获取按钮数据
		 * @dom 	按钮元素
		 * return 	按钮上的数据
		 */ 

		 // 单击图片类别按钮回调函数
		chooseImgType:function(e){
			// console.log(e.target)
			// var dom = e.target;
			// var id = $(dom).attr("data-id")
			var id = this.getTypeBtnValue(e.target)
			// console.log(id)
			// var result = this.collection.filter(function(model){
			// 	return model.get("type") == id
			// })
			var result = this.getModelFormCollection(id,"type")
			// console.log(result)
			this.resetView(result)
		},
		getTypeBtnValue:function(dom){
			var id = $(dom).attr("data-id");
			return id
		},
		getModelFormCollection:function(id,type){
			return this.collection.filter(function(model){
				return model.get("type") == id
			})
		},
		gotoTop:function(){
			window.scrollTo(0, 0)
		}
	})
	return List
})