//Kata originally titled "Tom Smith Under the Milkwood."

var builder = function(inputStr){
	var rawWords = inputStr.split(" ");
	var trigram = [];
	for(i=0; i<rawWords.length; i++){
		if(trigram.length < 1){
			trigram.push([]);
			trigram[0].push(rawWords[i]);
			trigram[0].push(rawWords[i+1]);
		}
		else{
			var placeholder = false;
			for (j=0; j<trigram.length; j++){
				if(trigram[j][0] === rawWords[i]){
					placeholder = true;
					for(k=0; k<trigram[j].length; k++){
						if(i<rawWords.length-1){
							var placeholder2 = false;
							for(l=0; l<trigram[j].length; l++){
								if(rawWords[i+1] === trigram[j][l]){
									placeholder2 = true;
								}
							}
							if(placeholder2 === false){
								trigram[j].push(rawWords[i+1]);
							}
						}
					}
				}
			}
			if(placeholder === false){
				trigram.push([]);
				trigram[trigram.length-1].push(rawWords[i]);
				if(i<rawWords.length-1){
					trigram[trigram.length-1].push(rawWords[i+1]);
				}
			}
		}
	}
	var output = [];
	var startWord = Math.floor(Math.random() * trigram.length);
	output.push(trigram[startWord][0]);
	var looping = true;
	while(looping){
		if(output.length>250){
			looping = false;
		}
		for(x=0; x<trigram.length;x++){
			if(output[output.length-1] == trigram[x][0]){
				if(trigram[x].length>1){
					var placeholder3 = Math.ceil(Math.random() * (trigram[x].length-1));
					output.push(trigram[x][placeholder3]);
				}
				else{
					looping = false;
				}
			}
		}
	}
	return(output.join(" "));
}

console.log(builder("I wish I may, I wish I might."));
console.log(builder("Star light, star bright, the first star I see tonight. I wish I may, I wish I might, have the wish I wish tonight."));