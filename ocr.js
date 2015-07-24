var rawNumbers = [
" _ " +
"| |" +
"|_|",

"   " +
"  |" +
"  |",

" _ " +
" _|" +
"|_ ",

" _ " +
" _|" +
" _|",

"   " +
"|_|" +
"  |",

" _ " +
"|_ "  +
" _|",

" _ " +
"|_ " +
"|_|",

" _ " +
"  |"+
"  |",

" _ " +
"|_|" +
"|_|",

" _ " +
"|_|" +
" _|"];

var reader = function(line1,line2,line3){
	var outputCaptcha = "";
	for(i = 0; i < 27; i += 3){
		var compareDigit = line1.substring(i, i+3) + line2.substring(i, i+3) + line3.substring(i, i+3);
		if(rawNumbers.indexOf(compareDigit) > -1){
			for (var digit in rawNumbers){
				if (compareDigit == rawNumbers[digit]){
					outputCaptcha += digit;
				}
			
			}
		}
		else{
			outputCaptcha += "?";
		}
	}
	return outputCaptcha;
}

var tester = function(inputCaptcha){
	var digitSum = 0;
	for(i = 0; i < inputCaptcha.length; i++){
		if (isNaN(parseInt(inputCaptcha[i], 10))){
			return false;
		}
		digitSum = digitSum + (9 - i) * (parseInt(inputCaptcha[i],10));
	}
	if(digitSum % 11 === 0){
		return true;
	}
	else{
		return false;
			}
	};
	
var printCaptcha = function(line1,line2,line3){
	var output = reader(line1, line2, line3);
	if (output.indexOf("?") > -1){
		output += " ILL";
	}
	else if(!tester(output)){
		output += " ERR";
	}
	return output;
};

var correctCaptcha = function(line1,line2,line3){
	console.log(line1);
	console.log(line2);
	console.log(line3);
	var captcha = reader(line1, line2, line3);
	var counter = 0;
	var changedCaptcha;
	var tempCaptcha = "";
	var tempRaw = "";
	var changed;
	if (!tester(captcha)){
		var rawLines = line1+line2+line3;
		for(x = 0; x < rawLines.length; x++){
			if(rawLines[x]==="|" || rawLines[x] === "_"){
				tempRaw = rawLines.substring(0,x) + " " + rawLines.substring(x+1,rawLines.length);
				changed = reader(tempRaw.substring(0,27),tempRaw.substring(27,54),tempRaw.substring(54,tempRaw.length));
				if(tester(changed)){
					counter++;
					changedCaptcha = changed;
				}
			}
			else{
				tempRaw = rawLines.substring(0,x) + "|" + rawLines.substring(x+1,rawLines.length);
				changed = reader(tempRaw.substring(0,27),tempRaw.substring(27,54),tempRaw.substring(54,tempRaw.length));
				if(tester(changed)){
					counter++;
					changedCaptcha = changed;
				}
				tempRaw = rawLines.substring(0,x) + "_" + rawLines.substring(x+1,rawLines.length);
				changed = reader(tempRaw.substring(0,27),tempRaw.substring(27,54),tempRaw.substring(54,tempRaw.length));
				if(tester(changed)){
					counter++;
					changedCaptcha = changed;
				}
			}
		}
		if(counter > 1){
			console.log(captcha + " AMB");
		}
		else if(counter === 1){
			console.log(changedCaptcha);
		}
		else if(counter === 0 && captcha.indexOf("?") > -1){
			console.log(captcha + " ILL");
		}
		else{
			console.log(captcha + " ERR")
		}
	}
	else{
		console.log(captcha);
	}
};

//various tests
correctCaptcha(" _  _  _  _  _  _  _  _  _ ",
			   "| || || || || || || || || |",
			   "|_||_||_||_||_||_||_||_||_|");
			   
correctCaptcha(" _  _  _  _  _  _  _  _  _ ",
			   "|_||_||_||_||_||_||_||_||_|",
			   "|_||_||_||_||_||_||_||_||_|");
correctCaptcha("    _  _     _  _  _  _  _ ",
			   "  | _| _||_| _ |_   ||_||_|",
			   "  ||_  _|  | _||_|  ||_| _ ");
correctCaptcha("    _  _  _  _  _  _     _ ",
			   "|_||_|| ||_||_   |  |  | _ ",
			   "  | _||_||_||_|  |  |  | _|");