

function app(people){
  var searchType = prompt("Do you know the name of the person you are looking for? Enter 'yes' or 'no'.").toLowerCase();
  switch(searchType){
    case 'yes':
		searchByName(people);
    break;
    case 'no':
		var dobToAge = askAge(people);
			if (dobToAge == "pass"){
				dobToAge = askAgeRange(people);
			}
		var foundGender = askGender(dobToAge);
		var foundHeight = askHeight(foundGender);
		var foundWeight = askWeight(foundHeight);
		var foundOccupation = askOccupation(foundWeight);
		var foundEyeColor = askEyeColor(foundOccupation);
		filterTraits (foundEyeColor); 
		
    break;
    default:
		app(people); 
    break;
  }
}


function searchByName(people){
	var firstName = prompt("What is the person's first name?");
	var lastName = prompt("What is the person's last name?");
	var person = people.filter(function(el){
		if (el.firstName.toLowerCase() === firstName && el.lastName.toLowerCase() === lastName){
			return true;
		} else {
			return false;
		}
	});
	mainMenu (person[0], people);
}


function mainMenu(person, people){

  if(person.length <= 0){
		alert("Unable to find person with that name in our database, please enter another name.");
    return app(people); 
  }
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'descendants', 'family', or 'next of kin'? Type the option you want or 'restart' or 'quit'").toLowerCase();
	
  switch(displayOption){
    case "info":
		displayPerson(person);
    break;
    case "descendants":
		searchDescendants(person, people);
    break;
    case "family":
		findSpouse (person, people);
		findChildren(person, people);
		findParents (person, people);
		findSiblings (person, people);
    break;
	case "next of kin":
		findNextOfKin (person, people);
	break;
	case 'h':
    	askHeight(people);
	break;
    case "restart":
		app(people);
    break;
    case "quit":
		return;
    default:
		return mainMenu(person, people);
  }
}


function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
	personInfo += "Last Name: " + person.lastName + "\n"; 
	personInfo += "Gender: " + person.gender + "\n";
	personInfo += "Date of Birth: " + person.dob + "\n";
	personInfo += "Height: " + person.height + "\n";
	personInfo += "Weight: " + person.weight + "\n";
	personInfo += "Eye Color: " + person.eyeColor + "\n";
	personInfo += "Occupation: " + person.occupation + "\n";
	personInfo += "Parents: " + person.parents + "\n";
	personInfo += "Current Spouse: " + person.currentSpouse + "\n";
	alert(personInfo);
}


function searchDescendants (person, people, filteredNameKids = []) {
	var descendants = people.filter(function(el) {
		return el.parents.includes(person.id)
	});
	if (descendants <=0) {
		alert(person.firstName + " " + person.lastName + " has no descendants.");
		mainMenu(person, people);
		return filteredNameKids;
	}
	
	descendants.map(function(obj) {
		filteredNameKids.push(obj)
	});
	
	for (var i = 0; i < descendants.length; i++) {
		filteredNameKids = searchDescendants(descendants[i], people, filteredNameKids);
	}
	if(filteredNameKids.length === 0){
		alert(person.firstName + " " + person.lastName + " has no descendants.");
		mainMenu(person, people);
	}
	else {
		alert(filteredNameKids.map(function(filteredNameKids){
		return person.firstName + " " + person.lastName + "'s descendant: " + filteredNameKids.firstName + " " + filteredNameKids.lastName + ".";
		}).join("\n"));
	}
	return filteredNameKids;
}


function findNextOfKin (person, people) {
	findSpouse (person, people);
	findChildren(person, people);
	findParents (person, people);
	findSiblings (person, people);
	findGrandchild (person, people);
	findGrandparents (person, people);
	findNieceNephew (person, people);
	findAuntUncle (person, people);
	findGreatGrandchild (person, people);
	findGreatGrandchild (person, people);
}


function findSpouse (person, people) {
	var spouse = people.filter(function(el) {
		return el.currentSpouse === person.id
	});
	if(spouse.length === 0){
		alert(person.firstName + " " + person.lastName + " has no spouse.");
	}
	else {
		alert(spouse.map(function(spouse){
		return person.firstName + " " + person.lastName + "'s spouse: " + spouse.firstName + " " + spouse.lastName + ".";
		}).join("\n"));
	}
	return spouse;
}

	
function findChildren (person, people) {
	var children = people.filter(function(el) {
		return el.parents.includes(person.id)
	});
	if(children.length === 0){
		alert(person.firstName + " " + person.lastName + " has no children.");
	}
	else {
		alert(children.map(function(children){
		return person.firstName + " " + person.lastName + "'s child: " + children.firstName + " " + children.lastName + ".";
		}).join("\n"));
	}
	return children;
}	


function findParents (person, people) {
	var parents = people.filter(function(el) {		
		return el.id === person.parents[0] || el.id === person.parents[1]
	});
	if(parents.length === 0){
		alert(person.firstName + " " + person.lastName + " doesn't know their parents.");
	}
	else {
		alert(parents.map(function(parents){
		return person.firstName + " " + person.lastName + "'s parent: " + parents.firstName + " " + parents.lastName + ".";
		}).join("\n"));
	}
	return parents;
}	


function findSiblings (person, people) {
	var siblings = people.filter(function(el) {
		if ( el.id === person.id){
		return false;
		}
		return el.parents.includes(person.parents[0]) || el.parents.includes(person.parents[1])
		});
	if(siblings.length === 0){
		alert(person.firstName + " " + person.lastName + " has no siblings.");
	}
	else{
		alert(siblings.map(function(siblings){
		return person.firstName + " " + person.lastName + "'s sibling: " + siblings.firstName + " " + siblings.lastName + ".";
		}).join("\n"));
	}
	return siblings;
}


function findGrandchild (person, people) {
	var child = [];
	var grandchild = [];
	child = people.filter(function(el) {
		return el.parents.includes(person.id)
	});
	for (var i = 0; i < child.length; i++) {		
		grandchild.push(...people.filter(function(obj) {
		return obj.parents.includes(child[i].id)
	}));
	}
	if(grandchild.length === 0){
		alert(person.firstName + " " + person.lastName + " has no grandchildren.");
	}
	else {
		alert(grandchild.map(function(grandchild){
		return person.firstName + " " + person.lastName + "'s grandchild: " + grandchild.firstName + " " + grandchild.lastName + ".";
		}).join("\n"));
	}
	return grandchild;
}		
		
			
function findGrandparents (person, people) {
	var momDad = [];
	var grandparents = [];
	momDad = people.filter(function(el) {
		return person.parents.includes(el.id)
	});
	for (var i = 0; i < momDad.length; i++) {		
		grandparents.push(...people.filter(function(obj) {
		return momDad[i].parents.includes(obj.id)
	}));
	}
	if(grandparents.length === 0){
		alert(person.firstName + " " + person.lastName + " doesn't know their grandparents.");
	}
	else{
		alert(grandparents.map(function(grandparents){
		return person.firstName + " " + person.lastName + "'s grandparent: " + grandparents.firstName + " " + grandparents.lastName + ".";
		}).join("\n"));
	}
	return grandparents;
}	


function findNieceNephew (person, people) {
	var siblings = people.filter(function (el) {
		if ( el.id === person.id){
		return false;
		}
		return el.parents.includes(person.parents[0]) || el.parents.includes(person.parents[1]) 
	});
	var nieceNephew = [];
	for (var i = 0; i < siblings.length; i++) {
		nieceNephew.push(...people.filter(function(el) {
		return el.parents.includes(siblings[i].id)
		}));
	}
	if(nieceNephew.length === 0){
		alert(person.firstName + " " + person.lastName + " has no nieces or nephews.");
	}
	else {
		alert(nieceNephew.map(function(nieceNephew){
		return person.firstName + " " + person.lastName + "'s niece/nephew: " + nieceNephew.firstName + " " + nieceNephew.lastName + ".";
		}).join("\n"));
	}
	return nieceNephew;
}


function findAuntUncle (person, people) {
	var parents = people.filter(function(el) {
		return person.parents.includes(el.id);
	})
	var auntsUncles = [];
	for (var i = 0; i < parents.length; i++) {
		auntsUncles.push(...people.filter(function(el) {	
			if ( el.id === parents[i].id){
			return false;
			}
			return el.parents.includes(parents[i].parents[0]) || el.parents.includes(parents[i].parents[1]);
		}));
	}
	if(auntsUncles.length === 0){
		alert(person.firstName + " " + person.lastName + " has no aunts or uncles.");
	}
	else {
		alert(auntsUncles.map(function(auntsUncles){
		return person.firstName + " " + person.lastName + "'s aunt/uncle: " + auntsUncles.firstName + " " + auntsUncles.lastName + ".";
		}).join("\n"));
	}
	return auntsUncles;
}


function findGreatGrandchild (person, people) {
	var child = [];
	var grandchild = [];
function findGreatGrandchild (person, people, greatGrandchild = []) {
	var parents = [];
	var grandchild = [];
	var greatGrandchild = [];
	parents = people.filter(function(el) {
		return el.id.includes(person.parents)
	});
	for (var i = 0; i < child.length; i++) {		
		grandchild = people.filter(function(obj) {
		return obj.parents.includes(parents[i].id)
	});
	}
	for (var i = 0; i < grandchild.length; i++) {		
		greatGrandchild.push(...people.filter(function(ele) {
		return ele.grandchild.includes(parents[i].id)
	}));
	}
	if(greatGrandchild.length === 0){
		alert(person.firstName + " " + person.lastName + " has no great grandchildren.");
	}
	else {
		alert(greatGrandchild.map(function(greatGrandchild){
		return person.firstName + " " + person.lastName + "'s great grandchild: " + greatGrandchild.firstName + " " + greatGrandchild.lastName + ".";
		}).join("\n"));
	}
	return greatGrandchild;
}}



function findGreatGrandparents(person, people) {
	var parents = [];
	var grandparents = [];
	var greatGrandparents = [];
	parents = people.filter(function(el) {
		return person.parents.includes(el.id)
	});
	for (var i = 0; i < parents.length; i++) {
		grandparents.push(...people.filter(function(obj) {
		return parents[i].parents.includes(obj.id) 
	}))};
	for (var j = 0; j < grandparents.length; j++){
		greatGrandparents.push(...people.filter(function(ele) {
		return grandparents[j].parents.includes(ele.id)
	}))}
	console.log (greatGrandparents);
	return greatGrandparents
}
	

function askAge(people) {
	var dobToAge = [];
	var age = prompt("Do you know the exact age of the person you're seraching for? If you do, please input it below. If you don't know the exact age but only an age range, type 'pass'. If you don't know the age at all, type 'pass'. (Use number format: 23 or 30 or 40 etc.)").toLowerCase();
		if (age < 0 || age > 200) {
			alert("No results found, please try a different search.");
			return askAge();
		}
		else if (age > 0 && age < 200) {
			dobToAge = findAge (people, age);
			return dobToAge;
		}
		else if (age === "pass"){
			dobToAge = "pass";
			return dobToAge;
		}
		else {
			alert("No results found, please try a different search.");
			return askAge();
		}
		
}


function findAge(people, age){
	var today = new Date();
	var dobToAge = people.filter(function(el) {
		var birthDate = new Date(el.dob);
		var ageToCheck = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
		{
			ageToCheck--;
		}
		if (ageToCheck == age) {
			return true;
		}
		else {
			return false;
		}
	});
	return dobToAge;
}


function askAgeRange(people) {
	var dobToAge = prompt("Do you know the the age range of the person you're searching for? If you do, please input it below. If you don't know the age at all, type 'pass'. (Use number format: '23-27' or '30-40' etc.)").toLowerCase();
	if (dobToAge == "pass") {
		dobToAge = people;
		return dobToAge;
	}
	dobToAge = dobToAge.split("-");
	dobToAge[0] = parseInt(dobToAge[0]);
	dobToAge[1] = parseInt(dobToAge[1]);
	if (dobToAge[0] < 0 || dobToAge[0] > 200) {
		alert("No results found, please try a different search.");
		return askAgeRange();
	}
	else if (dobToAge[1] < 0 || dobToAge[1] > 200) {
		alert("No results found, please try a different search.");
		return askAgeRange();
	}
	else if (dobToAge[0] > 0 && dobToAge[1] < 200) {
		dobToAge = findAgeRange(people, dobToAge);
		return dobToAge;
	}
	else {
		alert("No results found, please try a different search.");
		return askAgeRange();
	}
}


function findAgeRange(people, dobToAge){
	var today = new Date();
	dobToAge = people.filter(function(el) {
		var birthDate = new Date(el.dob);
		var ageToCheck = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
		{
			ageToCheck--;
		}
		if (ageToCheck >= dobToAge[0] && ageToCheck <= dobToAge[1]) {
			return true;
		}
		else {
			return false;
		}
	});
	return dobToAge;
}






function askGender(dobToAge) {
	var foundGender = [];
	gender = prompt("Do you know the gender of the person you're searching for? If you do, please input here. If you don't, type 'pass'.").toLowerCase();
		if (gender === "pass") {
			foundGender = dobToAge;
			return foundGender;
		}
		else if (gender === "male" || gender === "female") {
			foundGender = findGender(dobToAge, gender);
			return foundGender;
		}
		else {
			alert("No results found, please try a different search.");
			return askGender();
		}
	return foundGender;
}


function findGender(dobToAge, gender){
	var foundGender = dobToAge.filter(function(el) {
		return el.gender == gender
	});
	return foundGender;
}






		

function askHeight(foundGender) {
	var height = [];
	var foundHeight = [];
	var heightInput = prompt("Do you know the height of the person you're looking for? If you do enter data the as feet'inches\". If you don't, type 'pass' to skip.").toLowerCase();
	if (heightInput === "pass") {
		foundHeight = foundGender;
		return foundHeight;
	}
	heightInput = heightInput.replace("\"", "");
	heightInput = heightInput.split("'");
	heightInput[0] = parseInt(heightInput[0]);
	heightInput[1] = parseInt(heightInput[1]);
	height.push((heightInput[0]*12) + heightInput[1]);
	if (height > 0 && height < 130) {
		var foundHeight = findHeight(foundGender, height);
		return foundHeight;
	} 
	else if (height < 0 || height > 130) {
		prompt("Please enter a height under 10 feet.")
		return askHeight();
	} 
	else {alert("No results found, please try a different search.")
		return askHeight();
	}	
}


function findHeight(foundGender, height){
	foundHeight = foundGender.filter(function(el) {
		return el.height == height
	});
	return foundHeight;
}


function askWeight(foundHeight) {
	var foundWeight = [];
	weight = prompt("Do you know the weight in pounds of the person you're searching for? If you do, please input here. If you don't, type 'pass'. (Use number format: 100 or 125 etc.)").toLowerCase();
		if (weight < 0 || weight > 1000) {
			alert("No results found, please try a different search.");
			return askWeight();
		}
		else if (weight > 0 && weight < 1000) {
			foundWeight = findWeight(foundHeight, weight);
			return foundWeight;
		}
		else if(weight === "pass"){
			foundWeight = foundHeight
			return foundWeight;
		}
		else {
			alert("No results found, please try a different search.");
			return askWeight();
		}
}


function findWeight(foundHeight, weight){
	var foundWeight = foundHeight.filter(function(el) {
		return el.weight == weight
	});
	return foundWeight;
}


function askOccupation(foundWeight) {
	var foundOccupation = [];
	occupation = prompt("Do you know the occupation of the person you're searching for? If you do, please input here. If you don't, type 'pass'.").toLowerCase();
		if (occupation === "pass") {
			foundOccupation = foundWeight;
			return foundOccupation;
		}
		else if (occupation === "programmer" || occupation === "assistant" || occupation === "landscaper" || occupation === "nurse" || occupation === "student" || occupation === "architect" || occupation === "doctor" || occupation === "politician") {
			foundOccupation = findOccupation(foundWeight, occupation);
			return foundOccupation;
		}
		else {
			alert("No results found, please try a different search.");
			return askOccupation();
		}
	return occupation;
}

function findOccupation(foundWeight, occupation){
	var foundOccupation = foundWeight.filter(function(el) {
		return el.occupation == occupation
	});
	return foundOccupation;
}


function askEyeColor(foundOccupation) {
	var foundEyeColor = [];
	eyeColor = prompt("Do you know the eye color of the person you're searching for? If you do, please input here. If you don't, type 'pass'.").toLowerCase();
		if (eyeColor === "pass") {
			foundEyeColor = foundOccupation;
			return foundEyeColor;
		}
		else if (eyeColor === "brown" || eyeColor === "green" || eyeColor === "hazel" || eyeColor === "blue" || eyeColor === "black") {
			foundEyeColor = findEyeColor(foundOccupation, eyeColor);
			return foundEyeColor;
		}
		else {
			alert("No results found, please try a different search.");
			return askEyeColor();
		}
	return eyeColor;
}


function findEyeColor(foundOccupation, eyeColor){
	var foundEyeColor = foundOccupation.filter(function(el) {
		return el.eyeColor == eyeColor
	});
	return foundEyeColor;
}


function filterTraits (foundEyeColor) {
	alert("We are calculating the results of your search currently. The people in our database that meet the criteria you provided will show shortly.");
	alert(foundEyeColor.map(function(foundEyeColor){
    return foundEyeColor.firstName + " " + foundEyeColor.lastName;
  }).join("\n"));
}
				

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}