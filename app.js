

function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
		searchByName(people);
    break;
    case 'no':
		var age = askAgeAndAgeRange(people);
		//var height = askHeight(people);
		//var weight = askWeight(people);
		//var occupation = askOccupation(people);
		//var eyeColor = askEyeColor(people);
		
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
		app(people); // restart
    break;
    case "quit":
		return; // stop execution
    default:
		return mainMenu(person, people); // ask again
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


function askAgeAndAgeRange (people){
	var ageOrAgeRange = prompt("Do you know either the 'age' or 'age range' of the person you're seraching for? If you do, type the option you're looking for. If you don't, type 'pass'.").toLowerCase();
		switch(ageOrAgeRange){
			case "age":
				var age = askAge();
			break;
			case "age range":
				var ageRange = askAgeRange();
			break;
			case "pass":
				return;
			break;
			default:
				return askAgeAndAgeRange (people);
		}
}
	

function askAge() {
	age = prompt("Please enter the age of the person you're looking for. (Use number format: 23 or 30 or 40 etc.)");
		if (age < 0 || age > 200) {
			alert("No results found, please try a different search.");
			return askAge();
		}
		else if (age > 0 && age < 200) {
			return age;
		}
		else {
			alert("No results found, please try a different search.");
			return askAge();
		}
	return age;
}



function askAgeRange() {
	ageRange = [];
	var ageRangeLow = prompt("Please enter THE YOUNGEST AGE that the person could be. (Use number format: 23 or 30 or 40 etc.)");
		if (ageRangeLow < 0 || ageRangeLow > 200) {
			alert("No results found, please try a different search.");
			return askAgeRange();
		}
		else if (ageRangeLow > 0 && ageRangeLow < 200) {
			ageRange.push(ageRangeLow);
		}
		else {
			alert("No results found, please try a different search.");
			return askAgeRange();
		}
	var ageRangeHigh = prompt("Please enter THE OLDEST AGE that the person could be. (Use number format: 23 or 30 or 40 etc.)");
		if (ageRangeHigh < 0 || ageRangeHigh > 200) {
			alert("No results found, please try a different search.");
			return askAgeRange();
		}
		else if (ageRangeHigh > 0 && ageRangeHigh < 200) {
			ageRange.push(ageRangeHigh);
		}
		else {
			alert("No results found, please try a different search.");
			return askAgeRange();
		}
	return ageRange;
}

					
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function askHeight(people) {
	var height = [];
	var heightInput = prompt("Enter the height of the person you're looking for. Enter data the as inches'feet\"");
	heightInput = heightInput.replace("\"", "");
	heightInput = heightInput.split("'");
	heightInput[0] = parseInt(heightInput[0]);
	heightInput[1] = parseInt(heightInput[1]);
	height.push((heightInput[0]*12) + heightInput[1]);
	if (height < 0 || height > 130) {
		prompt("Please enter a height under 10 feet.")
		return askHeight();
	}
		return height;	
}
