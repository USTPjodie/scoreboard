# Introduction to Leaderboard
This project is mainly for me to sharpen my UI skillz. I decided to build a leaderboard that could take periodic data, build a list, and rearrange the with each data push.
My criteria is as follows:
* Pure js - no jQuery, _, etc.
* Pure CSS3 - no pre-processors
* Minimal HTML
* periodically requests data
* builds html "list"
* orders "list" based on a sort order (given by data)
* allow coder to specify HTML in each "list" item
* CSS controls animation of transitions

##Parameters
- max
	- Default: 10
	- Indicates the number of items shown in the list
- interval
	- Default: 10
	- Time in seconds to poll new data
- elemId
	- Default: ''leaderboard''
	- The element that the leaderboard will be inserted into. If the element can not be found, an empty div will be created and attached to the end of the document.
- sort
	- Default: "sort"
	- Name of the attribute in the polled data that the list is sorted on.
- display
	- Default: function that returns a string representation of the data item
	- Use this to define a function which formats the contents of each item in the list. The function will pass in a single argument that is an item object. You may return a string or an dom element

	- return string
```js
// assume item = {id:1,name:"Derp",orrder:2,type:"Bonk"}
function(item){
	return "Text displayed " + item.name + " and is a " + item.type + "!";
}
```
	- or return elem
```js
function(item){
	var elem = document.createElement("div"),
		elName = elem.appendChild(document.createElement("span")),
		elType = elem.appendChild(document.createElement("span"));
	elName.innerHTML = item.name;
	elType.innerHTML = item.type;
	return elem;
}
```
- dataCall
	- Default: function that returns empty array
	- This is the function that is call periodically which expects a return of an array;