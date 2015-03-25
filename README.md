# tomcatStatusPretty
Handy bookmarklet for prettifying tomcat manager status page.

I've always had trouble parsing the tomcat status page. It's so difficult to actually analyze the request times on a busy instance. I googled around being sure there was some plugin out there to clean it up, but shockingly found nothing. In frustration, I wrote this bookmarklet. 

It has the following features:

* Removes all non-service requests from the requests table (keepalive, ready, prepare, etc.)
* Color codes requests based on the following rules:

|  Color |Request Time   |
|---|---|
| Green  | 0-1000ms  |
| Yellow  | 5000-10,000ms  |
| Red  | > 10,000ms  |

Feel free to play with the colors or the color-coding rules to suit your needs.

* Left justifies URL's so that long requests don't mess up the page with scrollbars
* Decodes URL's to you can actually read more complex requests
* Shows the average request time for the current requests on the page to get an instantaneous snapshot

# Installation

Just copy the contents of tomcatStatusPretty.js into the address field of a new bookmark in your browser. Then load the tomcat manager status page and click on the bookmark - voila! Pretty color coded, and cleaned up request entries.

Tested on latest Chrome and Firefox for tomcat versions 6 & 7.

# Credits

http://benalman.com/code/test/jquery-run-code-bookmarklet/

for bookmarklet skeleton with jquery.
