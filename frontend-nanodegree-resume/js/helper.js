/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/


/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<h1 id="name" class="gray-text">%data%</h1>';
var HTMLheaderRole = '<span class="text-uppercase magenta-text">%data%</span><hr/>';
var HTMLWelcomeMsg = '<span id="welcome-message-id" class="welcome-message">%data%</span>';

/* contact section */
var HTMLcontactGeneric = '<li class="flex-item"><span class="gray-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="green-text">mobile:</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="green-text">twitter:</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="green-text">email:</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="green-text">github:</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="green-text">location:</span><span class="white-text">%data%</span></li>';

/* skill section */
var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLskillsStart = '<dt><h3 class="skills-h3 magenta-text">Skills at a glance:</h3></dt><dt id="skills" class="gray-text skill"></dt>';
var HTMLskills = "<dd>%data%</dd>";


/* work section */
var HTMLworkpic = '<img src="%data%" class="workpic span2">';
var HTMLworkStart = '<div class="work-entry container-fluid"></div>';
var HTMLworkDescriptionStart = '<div class="work-description span8"></div>';
var HTMLworkEmployer = '<dt class="description"><a href="%link%" class="magenta-text">%data%';
var HTMLworkTitle = ' - %data%</a></dt>';
var HTMLworkDates = '<dd class="date-text description">%data%</dd>';
var HTMLworkLocation = '<dd class="location-text">%data%</dd>';
var HTMLworkDescription = '<dd class="description"><br>%data%</dd>';

/* project section */
var HTMLprojectStart = '<div class="project-entry container-fluid"></div>';
var HTMLprojectImage = '<img src="%data%" class="projectpic span2">';
var HTMLprojectDescriptionStart = '<div class="project-description span8"></div>';
var HTMLprojectTitle = '<dt class="description"><a href="%link%" class="magenta-text">%data%</a></dt>';
var HTMLprojectDates = '<dd class="date-text description">%data%</dd>';
var HTMLprojectDescription = '<dd class="description"><br>%data%</dd>';


/* education section */
var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<dt class="description"><a href="%link%" class="magenta-text">%data%';
var HTMLschoolDegree = ' -- %data%</a></dt>';
var HTMLschoolDates = '<dd class="date-text description">%data%</dd>';
var HTMLschoolLocation = '<dd class="location-text description">%data%</dd>';
var HTMLschoolMajor = '<dd class="description"><em><br>Major: %data%</em></dd>';

/* onlineclasses section */
var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineStart = '<div class="online-entry"></div>';
var HTMLonlineTitle = '<dt class="description"><a href="%link%" class="magenta-text">%data%';
var HTMLonlineSchool = ' -- %data%</a></dt>';
var HTMLonlineDates = '<dd class="date-text">%data%</dd>';


/* location map */
var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';


/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var oldName = $('#name').html() || ''; 
    var iName = inName(oldName) || function(){}; 
    $('#name').html(iName);  
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  // your code goes here!
  logClicks(loc.pageX,loc.pageY);
});



/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: false
  };

  // This next line makes `map` a new Google Map JavaScript Object and attaches it to
  // <div id="map">, which is appended as part of an exercise late in the course.
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    for (var contact in bio.contacts) {
      locations.push(bio.contacts[contact].location);
    }

    // iterates through school locations and appends each location to
    // the locations array
    for (var school in education.schools) {
      locations.push(education.schools[school].location);
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
    }

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!

      infoWindow.open(map,marker);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = { query: locations[place] };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  // Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});