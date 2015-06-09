javascript:(function(e,a,g,h,f,c,b,d){if(!(f=e.jQuery)||g>f.fn.jquery||h(f)){c=a.createElement("script");c.type="text/javascript";c.src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";c.onload=c.onreadystatechange=function(){if(!b&&(!(d=this.readyState)||d=="loaded"||d=="complete")){h((f=e.jQuery).noConflict(1),b=1);f(c).remove()}};a.documentElement.childNodes[0].appendChild(c)}})(window,document,"1.3.2",function($,L){

// Remove all non-service request rows
$("td > strong:contains('K')").closest('tr').remove();
$("td > strong:contains('R')").closest('tr').remove();
$("td > strong:contains('F')").closest('tr').remove();
$("td > strong:contains('P')").closest('tr').remove();

// remove service request for status page itself
$("td:contains('manager')").closest('tr').remove();

// left align all requests and decode their URI's for readability
$("td:contains('HTTP')").css("text-align", "left").text(function(index, value) { return decodeURIComponent(value); });

var totalNumRequests = 0;
var totalRequestTime = 0;
var greens = {};
var yellows = {};
var reds = {};

var GREEN_COLOR = "#66CC66";
var YELLOW_COLOR = "#FFCC66";
var RED_COLOR = "#FF9999";

var STATS_LEGEND_COLOR = "#6E6E6E";

var GREEN_PERFORMANCE_MAX_THRESHOLD = 1000;
var YELLOW_PERFORMANCE_MIN_THRESHOLD = 5000;
var YELLOW_PERFORMANCE_MAX_THRESHOLD = 10000;
var RED_PERFORMANCE_MIN_THRESHOLD = 10000;

// Parse current request times from each service request and put it in the appropriate color codes performance bucket based on elapsed time
$("td > strong:contains('S')").parent().next().text(function(index, value) {
  var millis = parseInt(value.replace(" ms", ""));
  
  totalNumRequests++;
  totalRequestTime += millis;
  
  if(millis <= GREEN_PERFORMANCE_MAX_THRESHOLD) {
	greens[index] = true;	
  } else if(millis > YELLOW_PERFORMANCE_MIN_THRESHOLD && millis < YELLOW_PERFORMANCE_MAX_THRESHOLD) {
	yellows[index] = true;
  } else if(millis > RED_PERFORMANCE_MIN_THRESHOLD) {
	reds[index] = true;
  }
});

// Update request row colors based on buckets
$.each(greens, function(key, value) { $("td:contains(' ms')").eq(key).parent().css("background-color", GREEN_COLOR); });
$.each(yellows, function(key, value) { $("td:contains(' ms')").eq(key).parent().css("background-color", YELLOW_COLOR); });
$.each(reds, function(key, value) { $("td:contains(' ms')").eq(key).parent().css("background-color", RED_COLOR); });

// compute statistics legend based on current service requests on the page
var avgRequestTime = (totalRequestTime / totalNumRequests);
var $statsLegend = $("<h1></h1>").css("background-color", STATS_LEGEND_COLOR).html("Total Requests: " + totalNumRequests +", Average Request Time: " + (Math.round(avgRequestTime * 100) / 100) + " ms");
$("table td > strong").closest("table").before($statsLegend);

});
