// ==UserScript==
// @name        Ce Faci Replacer
// @description Replaces random words with "ce faci"
// @include     *
// @match       http://*/*
// @copyright   2010+, Nick Presta (http://nickpresta.ca/)
// @license     BSD License; http://creativecommons.org/licenses/BSD/
// @version     1.0.0
// ==/UserScript==


/**
 * This should work as a user script in Opera, Chrome, and Firefox
 */

// How many words to skip before a replace?
EVERY_N_WORDS = 13

addEventListener("load", function(e) {
    var alphabetical = /^[a-z]+$/i;
    replace = ""

    var all_text = document.evaluate(".//text()[normalize-space(.) != '']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0, count = 0; i < all_text.snapshotLength; ++i) {
        text = all_text.snapshotItem(i);

        /* Some nodes are sentences, so split it up */
        words = new Array();
        words = text.textContent.split(" ");
        if (words.length == 1) {
            if (!text.textContent.match(alphabetical)) {
                continue;
            }
            if (count % EVERY_N_WORDS == 0) {
                if (text.textContent.charAt(0) == text.textContent.charAt(0).toUpperCase()) {
                    replace = "Ce Faci";
                } else {
                    replace = "ce faci";
                }
                text.textContent = text.textContent.replace(text.textContent, replace);
            }
            count++;
        } else {
            /* Modify each word separately */
            for (word in words) {
                if (!words[word].match(alphabetical)) {
                    continue;
                }
                if (count % EVERY_N_WORDS == 0) {
                    if (words[word].charAt(0) == words[word].charAt(0).toUpperCase()) {
                        replace = "Ce Faci";
                    } else {
                        replace = "ce faci";
                    }
                    words[word] = words[word].replace(words[word], replace);
                }
                count++;
            }
            /* Join and replace */
            text.textContent = words.join(" ");
        }
    }

}, false);

/* Chrome doesn't let us see load event, simulate it. */
if (navigator.userAgent.indexOf("Chrome") != -1) {
    var e = document.createEvent("Event");
    e.initEvent("load", false, false);
    dispatchEvent(e);
}
