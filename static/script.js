// JavaScript Document
// Set touchend handler because the body isn't clickable on the iPad.
function load() {
	document.body.addEventListener("click", hideMenuFromEvent, false);
	document.body.addEventListener("touchend", hideMenuFromEvent, false);
	
	// Set up event handlers for expanding menus.
	var menu = document.getElementById("navigation-menu");
	var menuItems = menu.children;
	for(var i = 0; i < menuItems.length; i++) {
		menuItems[i].addEventListener("click", showMenuFromEvent, true);
		// Prevent the touchend handler on the body from firing when a button is clicked.
	   menuItems[i].addEventListener("click", function(e) {e.stopPropagation();}, true);
	}
}



function showMenuFromEvent(event) {
    var currentlyExpandedMenuItem = document.getElementsByClassName("touched")[0];
	var subitems = currentlyExpandedMenuItem.children;
	for (var i = 0; i < subitems.length; i++) {
		subitems[i].style.pointerEvents = "auto";
	}
    if (currentlyExpandedMenuItem == this)
        return;
    else if (currentlyExpandedMenuItem) // Only allow one menu to be expanded at a time.
        currentlyExpandedMenuItem.removeClassName("touched");

    this.addClassName("touched");
    event.stopPropagation();
}

/* Collapse the currently open menu and return the menu bar to its original appearance.
 */
function hideMenuFromEvent(event) {
    var currentlyExpandedMenuItem = document.getElementsByClassName("touched")[0];
	var subitems = currentlyExpandedMenuItem.children;
	for (var i = 0; i < subitems.length; i++) {
		subitems[i].style.pointerEvents = "none";
	}
    if (!currentlyExpandedMenuItem)
        return;

    currentlyExpandedMenuItem.removeClassName("touched");
}




/**
 *  Indicates whether the element has a given class name within its class attribute.
 */
Element.prototype.hasClassName = function (className) {
  return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(this.className);
};

/**
 *  Adds the given class name to the element's class attribute if it's not already there.
 */
Element.prototype.addClassName = function (className) {
  if (!this.hasClassName(className)) {
    this.className = [this.className, className].join(' ').replace(/^\s*|\s*$/g, "");
  }
};

/**
 *  Removes the given class name from the element's class attribute if it's there.
 */
Element.prototype.removeClassName = function (className) {
  if (this.hasClassName(className)) {
    var curClasses = this.className;
    this.className = curClasses.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g'), ' ').replace(/^\s*|\s*$/g, "");
  }
};
