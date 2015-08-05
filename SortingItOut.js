//Ball Sort

var Rack = function(){
	var balls = [];
	
	this.add = function(inputNum){
		if(balls.length < 1){
			balls.push(inputNum);
		}
		else{
			for(i = 0; i < balls.length; i++){
				if(inputNum <= balls[i]){
					balls.splice(i, 0, inputNum);
					return true;
				}
			}
			balls.push(inputNum);
			return true;
		}
	}
	
	this.print = function(){
		for(j = 0; j < balls.length; j++){
			console.log(balls[j]);
		}
	}
}


//Sorting Characters

var charSort = function(inputStr){
	var rawStr = inputStr.toLowerCase();
	rawStr = rawStr.replace(/[^a-z]/g, "");
	var rawLetters = rawStr.split("");
	var sorted = [];
	for(x = 0; x < rawLetters.length; x++){
		if(sorted.length < 1){
			sorted.push(rawLetters[x]);
		}
		else{
			for(y = 0; y < sorted.length; y++){
				if(rawLetters[x] <= sorted[y]){
					sorted.splice(y, 0, rawLetters[x]);
					break;
				}
			}
			if(rawLetters[x] > sorted[sorted.length-1]){
				sorted.push(rawLetters[x]);
			}
		}
	}
	console.log(sorted);
}


//Testing

testRack = new Rack();
for(z = 0; z < 5; z++){
	testRack.add(Math.ceil(Math.random() * 100));
}
testRack.print();

var userInput = prompt("Type something");
charSort(userInput);