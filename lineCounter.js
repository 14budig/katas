var isOutOfQuotes = function(line, index){
	var chars = line.split("");
	var numSingle=0; 
	numDouble = 0;
	for(x=0;x<index;x++){
		if(chars[x] === "'" && numDouble % 2 === 0){
			numSingle++;
		}
		else if(chars[x] === '"' && numSingle % 2 === 0){
			numDouble++;
		}
	}
	return(numSingle % 2 === 0 && numDouble % 2 == 0);
}

var allIndexOf = function(line, char){
	var tempLine = line.slice(0);
	var index = 0;
	var output = [];
	var temp;
	do{
		temp = tempLine.indexOf(char);
		if(temp == -1 && output.length === 0){
			output.push(-1);
			index = -1;
		}
		else if(temp != -1){
			index += temp;
			if(output.length>0){
				index++;
			}
			output.push(index);
			tempLine = line.slice(index+1, line.length-1);
		}
	}
	while(temp != -1);
	return output;
};

//openFile is borrowed from http://www.javascripture.com/FileReader
var openFile = function(event) {
	var input = event.target;
	var text;
	var reader = new FileReader();
	reader.onload = function(){
		text = reader.result.split('\n');
		alert(lineCounter(text));
	};
	reader.readAsText(input.files[0]);
};

var lineCounter = function(lines){
	var counter = 0;
	var commented = false;
	for(i=0; i<lines.length; i++){
		currentLine = lines[i].trim();
		if(currentLine.length>0){
			var startComment = allIndexOf(currentLine, "/*");
			var endComment = allIndexOf(currentLine, "*/");
			if(commented){
				if(endComment[0] != -1){
					var subCount = 0;
					for(j = 0; j < endComment.length; j++){
						var str = currentLine.substr(endComment[j]+1, currentLine.length-1);
						commented = false;
						if(str.indexOf("/*") != -1){
							commented = true;
						}
						if(str.indexOf("//") != 0 && str.indexOf("/*") != 0){
							subCount++
						}
					
					}
					if(subCount > 0){
						counter++;
					}
				}
			}
			else if(currentLine.indexOf("//")!==0){
				for(k = startComment.length-1; k>=0; k--){
					if(isOutOfQuotes(currentLine, startComment[k])){
						var finalEndComment = 0;
						for(l=endComment.length-1; l>0; l--){
							if(isOutOfQuotes(currentLine, endComment[l]) && endComment[l] > finalEndComment){
								finalEndComment = endComment[l];
							}
						}
						if(startComment[k] > finalEndComment){
							commented = true;
						}
					}
				}
				if(startComment.indexOf(0) == -1){
					counter++;
				}
				else{
					commented = true;
					if(endComment[0] != -1){
						var subCount = 0;
						for(m = 0; m < endComment.length; m++){
							var str = currentLine.substr(endComment[j]+1, currentLine.length-1);
							commented = false;
							if(str.indexOf("/*") != -1){
								commented = true;
							}
							if(str.indexOf("//") != 0 && str.indexOf("/*") != 0){
								subCount++
							}
						}
						if(subCount > 0){
							counter++;
						}
					}
				}
			}
		}
	}
	return counter;
}