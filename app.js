

function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
		var filteredNames = searchByName(people);
		mainMenu(filteredNames, people);
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
	var firstName = promptFor("What is the person's first name?", chars);
	var lastName = promptFor("What is the person's last name?", chars);
	var filteredName = people.filter(function(el){
		if (el.firstName.toLowerCase() === firstName && el.lastName.toLowerCase() === lastName){
			return true;
		} else {
			return false;
		}
	});
	return filteredName;
}

function mainMenu(filteredName, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(filteredName.length <= 0){
    alert("Unable to find person with that name in our database, please enter another name.");
    return app(people); 
  }
  var displayOption = prompt("Found " + filteredName[0].firstName + " " + filteredName[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'").toLowerCase();
	
  switch(displayOption){
    case "info":
		displayPerson(filteredName);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
		searchDescendants(filteredName, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(filteredName, people); // ask again
  }
}

function displayPerson(filteredName){
  var personInfo = "First Name: " + filteredName[0].firstName + "\n";
  personInfo += "Last Name: " + filteredName[0].lastName + "\n"; 
  personInfo += "Gender: " + filteredName[0].gender + "\n";
  personInfo += "Date of Birth: " + filteredName[0].dob + "\n";
  personInfo += "Height: " + filteredName[0].height + "\n";
  personInfo += "Weight: " + filteredName[0].weight + "\n";
  personInfo += "Eye Color: " + filteredName[0].eyeColor + "\n";
  personInfo += "Occupation: " + filteredName[0].occupation + "\n";
  personInfo += "Parents: " + filteredName[0].parents + "\n";
  personInfo += "Current Spouse: " + filteredName[0].currentSpouse + "\n";
  alert(personInfo);
}

function searchDescendants (filteredName, people) {
	var filteredNameKids = [];
	for (var i = 0; i < people.length; i++) {
			if (people[i].parents.includes(filteredName[0].id)) {
				filteredNameKids.push(people[i].firstName + " " + people[i].lastName);
			}	
	}
		if(filteredNameKids.length <= 0){
			alert(filteredName[0].firstName + " " + filteredName[0].lastName + " has no descendants. Please begin a new search.");
			return mainMenu(filteredName, people); 
  }
	alert("The descendants of " + filteredName[0].firstName + " " + filteredName[0].lastName + ": " + filteredNameKids + "." );
	return app(people);
}
	





				/*
	filteredNameKids = people[i].parents.filter(function(o){
			if (o === filteredName[0].id) {
				filteredNameKids.push(people[i]);
			} else {
				return false;
		}
	});	
				*/
	
				/*
				
var filteredNameKids = people.filter(function(el){
		if (el.parents === filteredName[0].id) {
			return true;
			console.log(el.firstName[0] + " " + el.lastName[0]);
			return el.firstName[i] + " " + el.lastName[i]
		} else {
			return false;
		}
	});
	alert("The descendants of " + filteredName[0].firstName + " " + filteredName[0].lastName + ": " + filteredNameKids + ".");
	return filteredNameKids;

				*/
	
	
	





					
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
