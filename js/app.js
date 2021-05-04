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
const navBarList = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
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

function setSections (sections) {
    this.sections = sections;
}

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


function getSectionById (sectionId) {
    if (!this.sections) {
        throw new Error('section is not loaded/created');
    }
    const filteredSections = this.sections.filter(section => section.id === sectionId)
    return filteredSections.length > 0 ? filteredSections[0] : null
}


function setAllSectionsToInactive () {
    this.sections.forEach((section) => {
        section.classList.remove('active-section');
    });
}


function setSectionToActive (section) {
    section.classList.add('active-section');
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function main () {
    const sections = this.getSections()
    this.setSections(sections)
    this.renderNavBarList()
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener('DOMContentLoaded', () => {
    main()
});


navBarList.addEventListener('click', (event) => {
    const eventTarget = event.target
    if (eventTarget.matches('a')) {
        event.preventDefault();
        const sectionId = eventTarget.getAttribute('href').replace('#', '');
        const section = this.getSectionById(sectionId);
        const sectionOffset = section.offsetTop;
        this.setAllSectionsToInactive();
        this.setSectionToActive(section);
        this.renderNavBarList();
        scroll({
            top: sectionOffset,
            behavior: "smooth"
        });

    }
});
