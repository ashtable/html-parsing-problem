// HTML Parsing Problem
//
// Given an HTML string as an input argument,
//  1) If the string is nested as valid HTML, return the string 'valid' 
//  2) If the string is nested incorrectly, provide the name of the
//     element that would have to be changed to convert the string
//     to valid html.
//
//     So, for instance, if given this input:
//        <div><p>hello!</b></div>

//     We could change it to valid HTML by swapping the
//     <p> with a <b>, or vice versa. Though, for this 
//     problem we would return 'p' since that's the first
//     element that could be swapped to make the string valid.
//      
// Further, we're allowed the following assumptions:
//  1) If there is an error in nesting, it can be corrected
//     by simply substituting one element for another like this:
//        <div><p>hello!</b></div>
//     Which can be changed to something that works by swapping
//     the <p> with a <b>, or vice versa.
//
//  2) We only need to worry about the elements div, i, em, b, and p
//
//  3) We do not need to worry about any HTML attributes.


const htmlParser = function(htmlString) {
  if (!htmlString) { return; }

  let stack = [];

  let currentElement = '';
  let closingTag = false;

  for (let i = 0; i < htmlString.length; i++) {
    const char = htmlString[i];
    if (char === '<') {
      // We must be at the start of an opening or closing element.
      // So we'll clear out the cache for the new element.
      currentElement = ''
      closingTag = false;
    } else if (char === "/") {
      // We must be at the end of a closing tag so we'll set our flag
      closingTag = true; 
    } else if (char === ">") {
      // We must be at the end of an opening or closing element.
      if (closingTag) {
        // If this is a closing tag, then it's time to pop the last 
        // item off the stack and compare it to the current item to
        // validate that it was nested properly.
        const openingElement = stack.pop();
        if (openingElement !== currentElement) {
          // We know that if either of these two were swapped, it would
          // become a valid HTML string, so we'll return the openingElement
          // since it would have appeared first in the input string.
          return openingElement;
        }      
      } else {
        // If it's an opening tag, then we'll push it's value onto the
        // stack so that we can pop it off for comparison as soon as we
        // run into the next closing tag.
        stack.push(currentElement);
      }
    } else {
      currentElement = currentElement.concat(char);
    }
  }
  
  return 'valid';
}

module.exports = htmlParser;
