

function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
		searchByName(people);
    break;
    case 'no':
		//search through a trait
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
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', 'descendants', or 'next of kin'? Type the option you want or 'restart' or 'quit'").toLowerCase();
	
  switch(displayOption){
    case "info":
		displayPerson(person);
    break;
    case "family":
		spouse = findSpouse (person, people);
		children = findChildren(person, people);
		parents = findParents (person, people);
		siblings = findSiblings (person, people);
		displayPeople(children);
		displayPeople(spouse);
		displayPeople(parents);
		displayPeople(siblings);
    break;
    case "descendants":
		var descendantsAll = searchDescendants(person, people);
		displayPeople(descendantsAll);
    break;
	case "next of kin":
		greatGrandchild = findGreatGrandchild (person, people);
		displayPeople(greatGrandchild);
		//findNextOfKin (person, people);
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
		return filteredNameKids;
	}
	
	descendants.map(function(obj) {
		filteredNameKids.push(obj)
	});
	
	for (var i = 0; i < descendants.length; i++) {
		filteredNameKids = searchDescendants(descendants[i], people, filteredNameKids);
	}
	return filteredNameKids;
}
	
	
function findChildren (person, people) {
	var children = people.filter(function(el) {
		return el.parents.includes(person.id)
	});
	return children;
}	


function findSpouse (person, people) {
	var spouse = people.filter(function(el) {
		return el.currentSpouse === person.id
	});
	return spouse;
}


function findParents (person, people) {
	var parents = people.filter(function(el) {
		return el.id === person.parents[0] || el.id === person.parents[1]
	});
	return parents;
}


function findSiblings (person, people) {
	var siblings = people.filter(function(el) {
		return el.parents.includes(person.parents[0]) || el.parents.includes(person.parents[1])
		});
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
	return grandparents;
}	

function findGreatGrandchild (person, people, greatGrandchild = []) {
	var child = [];
	var grandchil = [];
	var greatGrandchild = [];
	child = people.filter(function(el) {
		return el.parents.includes(person.id)
	});
	for (var i = 0; i < child.length; i++) {		
		grandchild = people.filter(function(obj) {
		return obj.parents.includes(child[i].id)
	});
	}
	for (var i = 0; i < grandchild.length; i++) {		
		greatGrandchild.push(...people.filter(function(ele) {
		return ele.parents.includes(grandchild[i].id)
	}));
	}
	return greatGrandchild;
}

/*
function searchDescendants (person, people, filteredNameKids = []) {
	var descendants = people.filter(function(el) {
		return el.parents.includes(person.id)
	});
	if (descendants <=0) {
		return filteredNameKids;
	}
	
	descendants.map(function(obj) {
		filteredNameKids.push(obj)
	});
	
	for (var i = 0; i < descendants.length; i++) {
		filteredNameKids = searchDescendants(descendants[i], people, filteredNameKids);
	}
	return filteredNameKids;
}
*/










function findNextOfKin (person, people) {
	spouse = findSpouse (person, people);
	children = findChildren(person, people);
	parents = findParents (person, people);
	siblings = findSiblings (person, people);
	grandchild = findGrandchild (person, people);
	grandparents = findGrandparents (person, people);
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
