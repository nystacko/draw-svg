/* 
***********************************
Author: Steven Stackle
Week 10: Portfolio Assignment - Showcase XML Project
ICT-4540, Autumn 2020, Faculty: Dr. Greg O'Toole, B.Sc., M.A., Ph.D.
Last Revision: November 15, 2020

Description: This web page built with HTML, CSS, and JavaScript 
demonstrates the construction of Scalable Vector Graphics (SVG) shapes.
The user enters parameters into a form, the script processes the form and
converts the data into JSON. The script then reads the JSON and uses the data
to append an SVG object (a shape) to the page using the page HTML DOM.
The script also displays the shape JSON in a div near the bottom of the page.

The form logic and styling is based on a tutorial by Jason Lengstorf
on the Learn with Jason website,
https://www.learnwithjason.dev/blog/get-form-values-as-json/.
************************************/

// Function to build an SVG node
function getNode(node, attrs) {
    node = document.createElementNS("http://www.w3.org/2000/svg", node);
    for (var p in attrs)
        node.setAttributeNS(null, p.replace(/[A-Z]/g, function (m, p, o, s) { return "-" + m.toLowerCase(); }), attrs[p]);
    return node;
}


/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                  form data as an object literal
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    // Make sure the element has the required properties.
    if (isValidElement(element)) {
        data[element.name] = element.value;
    }
    return data;
}, {});


/**
 * A handler function to prevent default submission and run a custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
const handleFormSubmit = event => {
    // Stop the form from submitting.
    event.preventDefault();
    // Call the formToJSON function to get the form data.
    const data = formToJSON(form.elements);
    // Print the form data onscreen as a formatted JSON object.
    const dataContainer = document.getElementsByClassName('results__display')[0];
    // Use `JSON.stringify()` to make the output valid, human-readable JSON.
    dataContainer.textContent = JSON.stringify(data, null, "  ");
    // Call the getNode function using the JSON 'data' object.
    // The first form field gives the qualified SVG name.
    var r = getNode(data["shape-name"], data);
    // Append the SVG node to the DOM
    svg.appendChild(r);
};

/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}       true if the element is an input, false if not
 */
const isValidElement = element => {
    return element.name && element.value;
};

/*
     * Find the form element using its class name, then attach the
     * `handleFormSubmit()` function to the `submit` event.
    */
const form = document.getElementsByClassName('shape-form')[0];
window.onload = function () {
    form.addEventListener('submit', handleFormSubmit);
}

// Create the svg node and append it to the 'canvas' div
var svg = getNode("svg");
svg.setAttribute("width", "800");
svg.setAttribute("height", "250");
document.getElementById("canvas").appendChild(svg);

