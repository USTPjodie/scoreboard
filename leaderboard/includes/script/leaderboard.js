// request a list periodically
// Build the html frame work
// allow for  custom transitions
// allow for custom sorts
// allow for custom click/hover events
"use strict";
(function(BFG){

	var Leaderboard = function(o){
		this.config = BFG.extend({
			max:10,
			interval:10,
			elemId:'leaderboard',
			sort:'sort',
			margin:0,
			transitionClass:'move',
			display:function(data){
				return data.toString();
			},
			dataCallback:function(){return [];}
		},o);
		this.data = [];
		this.uiList = [];
		this.ul = document.createElement("ul");
	};
	Leaderboard.prototype = {
		constructor:Leaderboard,
		start:function(){
			var 	that = this,
				tStart = 0,
				progress = 0,
				interval = that.config.interval * 1000;

			(function run(timestamp){ //This should be moved into it's own .. passing in something like {startTime:0,interval:1000,callback:fn,endOnly:true}
				progress = timestamp - tStart ;
				if (progress > interval || progress === 0){
					tStart = timestamp;
					that.getData();
					that.doTransition();
				}
				requestAnimationFrame( run );
			})(0);
		},
		stop:function(){
			//This no worky
			console.log(this.animationRequestId);
			cancelAnimationFrame(0);
		},
		getData:function(){
			var that = this;
			this.data = this.config.dataCallback();
			this.data.sort(function(a,b){
				return b[that.config.sort] - a[that.config.sort];
			});
			this.data =  this.config.max > this.data.length?this.data: this.data.slice(0, this.config.max);
			//do something about the uiList when it's shorter than max
			if (this.data.length !== this.uiList.length){
				this.buildUI();
			}
			return this;
		},
		buildUI:function(){
			var 	elem = this.elem || document.getElementById(this.config.elemId) || document.body.appendChild(document.createElement("div"));
			elem.innerHTML = this.ul.innerHTML = ""; // Is there a better way?
			elem.appendChild(this.ul);
			for (var i = 0;i < this.config.max;i++){
				this.uiList.push({
					elem:this.ul.appendChild(document.createElement("li")),
					id:null,
					content:'',
					sort:0
				});
				// this.uiList[i].elem.addEventListener('webkitTransitionEnd',function(){
				// 	this.className = "";
				// }); // I can not get this to fire on all elements as some of them do not move.. therefore do not trigger
				this.uiList[i].elem.style.top = "0px";
				this.uiList[i].elem.innerHTML = "Loading...";
			}
			return this;
		},
		doTransition:function(){
			// *find all ui that no longer exist in data and change (fadein/out) to outstanding data
			// *animate ui to new positions based on data sort
			var 	oldElem = [],
				heights = [],
				replaceElem = [],
				that = this;

			replaceElem = this.data.difference(this.uiList,function(a,b){
				return a.id === b.id;
			});
			this.uiList.forEach(function(v,i,a){
				var	uiIndex,nextAvailable;

				uiIndex = BFG.ArrayIndexOf(that.data,v.id,function(a,b){
					return a === b.id;
				});

				if (uiIndex >= 0){
					v.elem.classList.add("move");
					v.sort = that.data[uiIndex][that.config.sort];
					that.display(v.elem,that.data[uiIndex]);
				}else{
					v.elem.classList.add("replace");
					nextAvailable = replaceElem.shift();
					v.id = nextAvailable.id;
					that.display(v.elem,nextAvailable);
					v.sort =nextAvailable[that.config.sort];
				}
			});
			this.uiList.sort(function(a,b){
				return b.sort - a.sort;
			});
			this.uiList.forEach(function(v,i,a){
				heights .push(i>0?that.uiList[i-1].elem.offsetHeight + heights[i-1] + that.config.margin :0);
				v.elem.style.top = heights[i] + "px";
				setTimeout(function(){ // terrible hack.. my attempted transistionEnd event does not fire on all elements
					v.elem.className = "";
				},2000);
			});
			this.ul.style.height = (heights[heights.length - 1] + this.uiList[this.uiList.length - 1].elem.offsetHeight  + that.config.margin)+ "px";
			return this;
		},
		display:function(elem,data){
			var display = this.config.display(data);
			elem.innerHTML = ""; // Is this the best way to empty?
			if (typeof display === "object"){
				elem.appendChild(display);
			}else if (typeof display === "string"){
				elem.innerHTML = display;
			}
		}
	};

	BFG.Leaderboard = Leaderboard;
	window.BFG = BFG;
})(window.BFG || {});



var test = new BFG.Leaderboard({
	interval:10,
	max:10,
	margin:5,
	display:function(item){
		var 	content = document.createElement('div'),
			a = content.appendChild(document.createElement('a')),
			span = document.createElement('span');
		a.innerHTML = item.title;
		a.href = "#";
		span.innerHTML = item.count;
		a.appendChild(span);
		return content;
	},
	sort:'count',
	dataCallback:function(){
		return [//simulates incoming data
			{id:1,title:"Arya Stark",count:BFG.rnd(1,800)},
			{id:2,title:"Sandor Clegane",count:BFG.rnd(1,800)},
			{id:3,title:"Robb Stark",count:BFG.rnd(1,800)},
			{id:4,title:"Bronn",count:BFG.rnd(1,800)},
			{id:5,title:"Tyrion Lannister",count:BFG.rnd(1,800)},
			{id:6,title:"Jon Snow",count:BFG.rnd(1,800)},
			{id:7,title:"Daenerys Targaryen",count:BFG.rnd(1,800)},
			{id:8,title:"Samwell Tarly",count:BFG.rnd(1,800)},
			{id:9,title:"Eddard Stark",count:BFG.rnd(1,800)},
			{id:10,title:"Cersei Lannister",count:BFG.rnd(1,800)},
			{id:11,title:"Catelyn Stark",count:BFG.rnd(1,800)},
			{id:12,title:"Ygritte",count:BFG.rnd(1,800)},
			{id:13,title:"Jaime Lannister",count:BFG.rnd(1,800)},
			{id:14,title:"Bran Stark",count:BFG.rnd(1,800)},
			{id:15,title:"Varys",count:BFG.rnd(1,800)}
		];
	}
});
test.start();
