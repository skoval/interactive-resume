var bio = {
	"name" : "Stephanie Kovalchik",
	"role" : "Statistician & Data Artist",
	"biopic" : "images/icon-stats-figures.png",
	"contacts" : [{
		"mobile" : "310-555-5555", 
		"twitter" : "@the_breaking_point", 
		"location" : "Santa Monica, California, USA",
		"email" : "skovalch@rand.org",
		"github" : "skoval"
	}],	
	"skills" : ["Statistics","Data visualization","Web design"],
	"welcomeMessage": "" 
};

var work = {
	"jobs" : [
	{
		"employer" : "RAND Corporation", 
		"title" : "Statistician",
		"dates" : "2013 - 2015",
		"location" : "1776 Main Street, Santa Monica, California, USA",
		"description" : "Design and Implement Statistical Analyses",
		"url": "http://www.rand.org/about/people/k/kovalchik_stephanie_ann.html",
		"images" : "images/rand-logo.png"
	}]
};

var projects = {
	"project" : [{
		"title" : "The Breaking Point",
		"dates" : "2015", 
		"description" : "Tennis analytics website",
		"images" : ["images/Facility_Placeholder.jpg"],
		"url": "skovalchik.shinyapps.io/point_duration"
	},
	{
		"title" : "deuce",
		"dates" : "2014", 
		"description" : "An R package for tennis data web scraping",
		"images" : ["images/tennis-ball.jpg"],
		"url": "www.github.com/skoval/deuce"
	}]
};

var education = {
	"schools" : [
	{
		"name" : "Caltech",
		"location" : "	1200 E California Blvd, Pasadena, California",
		"degree" : "bachelor", 
		"majors" : ["biology", "literature"], 
		"dates" : 2003,
		"url" : "www.caltech.edu"
	},
	{
		"name" : "UCLA",
		"location" : "405 Hilgard Avenue, Los Angeles, California",
		"degree" : "doctorate", 
		"majors" : ["biostatistics"],
		"dates" : 2010, 
		"url" : "www.ucla.edu"
	}],
	"onlineCourses" : [{
		"title" : "Front-end Web Developer Nanodegree",
		"school" : "Udacity",
		"dates" : "In Progress",
		"url" : "https://profiles.udacity.com/u/stephaniekovalchik"
 	}]
};

bio.display = function() {
	var formattedName = HTMLheaderName.replace("%data%", bio.name);
	var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
	var formattedMessage = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
	var formattedImage = HTMLbioPic.replace("%data%", bio.biopic);

	$("#header").prepend(formattedRole).prepend(formattedName).append(formattedMessage).append(formattedImage);
	$("#header").append(HTMLskillsStart);

	for(skill in bio.skills) {
		var formattedSkills = HTMLskills.replace("%data%", bio.skills[skill]);
		$("#skills").append(formattedSkills);
	};

	for(contact in bio.contacts) {
		var formattedMobile = HTMLmobile.replace("%data%", bio.contacts[contact].mobile);
		var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts[contact].twitter);
		var formattedLocation = HTMLlocation.replace("%data%", bio.contacts[contact].location);
		var formattedEmail = HTMLemail.replace("%data%", bio.contacts[contact].email);
		var formattedGithub = HTMLgithub.replace("%data%", bio.contacts[contact].github);
		$("#footerContacts").append(formattedMobile, formattedTwitter, formattedLocation, formattedEmail, formattedGithub);
	};
};

education.display = function() {

	for(school in education.schools) {
		$("#education").append(HTMLschoolStart);
		
		var formattedName = HTMLschoolName.replace("%data%", education.schools[school].name).replace("%link%", education.schools[school].url);
		var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
		var formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
		var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);

		var Majors = '';

		for(major in education.schools[school].majors)	{
			if(major == education.schools[school].majors.length - 1)
	 			Majors += education.schools[school].majors[major];
	 		else
	 			Majors += (education.schools[school].majors[major] + "/");
		}
		
		var formattedMajor = HTMLschoolMajor.replace("%data%", Majors);

		$(".education-entry:last").append(formattedName + formattedDegree, formattedDates, formattedLocation, formattedMajor);
	}

	$("#education").append(HTMLonlineClasses);

	for(course in education.onlineCourses) {
		$("#education").append(HTMLonlineStart);
		
		var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title).replace("%link%", education.onlineCourses[course].url);
		var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
		var formattedDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
		$(".online-entry:last").append(formattedTitle + formattedSchool, formattedDates);

	}

};

work.display = function() {

	for(job in work.jobs) {
		$("#workExperience").append(HTMLworkStart);
		
		var formattedImage = HTMLworkpic.replace("%data%", work.jobs[job].images);
		var formattedEmployer = HTMLworkEmployer.replace("%data%",work.jobs[job].employer).replace("%link%", work.jobs[job].url);
		var formattedTitle = HTMLworkTitle.replace("%data%",work.jobs[job].title);
		var formattedDates = HTMLworkDates.replace("%data%",work.jobs[job].dates);
		var formattedDescription = HTMLworkDescription.replace("%data%",work.jobs[job].description);
	
		$(".work-entry:last").append(formattedImage);
		$("#workExperience").append(HTMLworkDescriptionStart);
		$(".work-entry:last").append(formattedEmployer + formattedTitle, formattedDates, formattedDescription);
	}
};

projects.display = function(){

	for(item in projects.project){

		$("#projects").append(HTMLprojectStart);

		var formattedImage = HTMLprojectImage.replace("%data%",projects.project[item].images);
		var formattedTitle = HTMLprojectTitle.replace("%data%",projects.project[item].title).replace("%link%", projects.project[item].url);;
		var formattedDates = HTMLprojectDates.replace("%data%",projects.project[item].dates);
		var formattedDescription = HTMLprojectDescription.replace("%data%",projects.project[item].description);
	
		$(".project-entry:last").append(formattedImage);
		$("#projects").append(HTMLprojectDescriptionStart);
		$(".project-entry:last").append(formattedTitle, formattedDates, formattedDescription);	
	}
};

function inName(name){
	console.log(name);
	var newName = name;
	newName = newName[0].toUpperCase() + newName.slice(1,newName.indexOf(" ") + 1).toLowerCase() + newName.slice(newName.indexOf(" ") + 1).toUpperCase(); 

	return newName;
};


work.display();
projects.display();
education.display();
bio.display();

$("#mapDiv").append(googleMap);