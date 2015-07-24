var books = [2,2,2,1,1];
var discounts = [1,0.95,0.9,0.8,0.75];

var pricePackage = function(numBooks){
	return (8 * numBooks * discounts[numBooks-1]);
};

var totalPrice = function(shoppingCart){
	var price = 0;
	for(i=0;i<shoppingCart.length;i++){
		if(shoppingCart[i]>0){
			price += pricePackage(shoppingCart[i]);
		}
	}
	//following code is to remove rounding errors from floating point number precision
	price = price * 100;
	price = Math.round(price);
	price = price/100;
	return price;
}

var buildPackage = function(shoppingCart){
	var counter = 0;
	var looping = true;
	var output = [];
	while(looping){
		for(i = 0; i < shoppingCart.length; i++){
			if(shoppingCart[i] > 0){
				shoppingCart[i]--;
				counter++;
			}
		}
		if(counter>0){
			output.push(counter);
			counter = 0;
		}
		else{looping = false};
	}
	return output;
};

var optimalPackage = function(bookPacks){
	bookPacks.sort(function(a, b){return b-a});
	tempPack = bookPacks.slice(0) || [];
	console.log("books:" + bookPacks);
	var tempPrice = totalPrice(bookPacks);
	for (x = tempPack.length-1; x>0; x--){
		for(y = 0; y<=x; y++){
			if(tempPack[x]<discounts.length && tempPack[y] > tempPack[x]){
				tempPack[y]--;
				tempPack[x]++;
			}
			if (totalPrice(tempPack) < tempPrice){
				bookPacks = optimalPackage(tempPack);
			}
		}
		tempPack = bookPacks.slice(0);
	}
	return bookPacks;
}

//various tests
var test = buildPackage(books);
console.log(totalPrice(test));
test = optimalPackage(test);
console.log(totalPrice(test));
test = buildPackage([3,2,2,1,1]);
test = optimalPackage(test);
console.log(totalPrice(test));
test = optimalPackage([5,5,3,3]);
console.log(totalPrice(test));
test = optimalPackage([5,1]);
console.log(totalPrice(test));
test = optimalPackage([4,3,2]);
console.log(totalPrice(test));
test = optimalPackage([1,1,1]);
console.log(totalPrice(test));