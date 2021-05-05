/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sections = null
let sectionHeaders = null
const navBarList = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * get all sections from main HTML tag and return them
 * @returns [Elements]
 */
function getSections () {

    const main = document.querySelector('main');
    const mainChildrens = main.children;
    let result = []
    for (let i = 1; i < mainChildrens.length; i++) {
        result.push(mainChildrens.item(i));
    }
    return result;

}

/**
 * caches sections
 * @param {*} sections 
 */
function setSections (sections) {
    this.sections = sections;
}


/**
 * caches section headers
 * @param {*} sections 
 */
function setSectionHeaders (sections) {
    this.sectionHeaders = sections.map((section) => {
        const sectionId = section.id
        return document.querySelector(`#${sectionId}>div>h2`)
    });
}

/**
 * Render navbar links by first clearing the narbar,
 * it uses fargment to append the navbar for a better performance,
 * also adds active class to the navbar link if it's section is active
 */
function renderNavBarList () {
    const navBarList = document.querySelector('#navbar__list');
    navBarList.innerHTML = ''
    const navBarFragment = document.createDocumentFragment();
    this.sections.forEach((section) => {
        const navbarLinkText = section.dataset.nav;
        const sectionId = section.id;
        const isActive = section.classList.contains('active-section');
        const listItem = document.createElement('li');
        const linkItem = document.createElement('a');
        if (isActive) {
            linkItem.classList.add('active_menu_link')
        }
        linkItem.classList.add('menu__link');
        linkItem.setAttribute('href', `#${sectionId}`);
        linkItem.innerHTML = navbarLinkText;
        listItem.appendChild(linkItem);
        navBarFragment.appendChild(listItem);
    })
    navBarList.appendChild(navBarFragment);
}


/**
 * get section by an html id and returns an HTML element
 * @param {*} sectionId 
 * @returns Element
 */
function getSectionById (sectionId) {
    if (!this.sections) {
        throw new Error('section is not loaded/created');
    }
    const filteredSections = this.sections.filter(section => section.id === sectionId)
    return filteredSections.length > 0 ? filteredSections[0] : null
}


/**
 * Mark all cached sections as inactive
 */
function setAllSectionsToInactive () {
    this.sections.forEach((section) => {
        section.classList.remove('active-section');
    });
}


/**
 * mark section as active by adding active-section class to it
 * @param {*} section 
 */
function setSectionToActive (section) {
    if (section) {
        section.classList.add('active-section');
    }
}

/**
 * check if an Elemnet is partially visible in the viewport
 * @param {*} element 
 * @returns Bool
 */
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    return elemTop < window.innerHeight && elemBottom >= 0;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function main () {
    const sections = this.getSections();
    this.setSections(sections);
    this.setSectionHeaders(sections);
    this.renderNavBarList();
}


/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener('DOMContentLoaded', () => {
    main()
});


/**
 *  Listen on navBarLinks click events using delegation to handle it,
 *  and determine which section has been choosed and navigate/scroll to this section
 */
navBarList.addEventListener('click', (event) => {
    const eventTarget = event.target
    if (eventTarget.matches('a')) {
        event.preventDefault();
        const sectionId = eventTarget.getAttribute('href').replace('#', '');
        const section = this.getSectionById(sectionId);
        const sectionOffset = section.offsetTop;
        scroll({
            top: sectionOffset,
            behavior: "smooth"
        });

    }
});


/**
 * This event is fired on scrolling was it done on choosing a section from the navigation bar
 *  or manually scrolled to, it determine which section header is visible and mark it's section as active 
 *  and render the navbar to reflect this update
 */
document.addEventListener('scroll', () => {
    let activeSection = null;
    for (let sectionHeader of this.sectionHeaders){
        const sectionIsVisible = this.isInViewport(sectionHeader);
        if (sectionIsVisible) {
            activeSection = sectionHeader.parentNode.parentNode;
            break;
        }

    }
    this.setAllSectionsToInactive();
    this.setSectionToActive(activeSection);
    this.renderNavBarList();
});
