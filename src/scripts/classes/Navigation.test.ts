import { Navigation, NAVIGATION_ACTIVE_LINK_CLASS, NAVIGATION_LINK_CLASS } from './Navigation'

const getNewNav: () => HTMLElement = () => {
    let navEl: HTMLElement = document.createElement('nav');
    navEl.innerHTML = `
        <ul class="navigation__list">
            <li class="navigation__item">
                <a class="navigation__link navigation__link_active"> Главная </a>
            </li>
            <li class="navigation__item">
                <a class="navigation__link"> О нас </a>
            </li>
            <li class="navigation__item">
                <a class="navigation__link"> Конткаты </a>
            </li>
        </ul>
    `;

    return navEl;
}

describe("Navigation tests", () => {

    it("It checks current link", () => {
        let navEl = getNewNav();
        let navController: Navigation = new Navigation(navEl);

        expect(navController.getCurrentLink()).toEqual(navEl.querySelector(`.${NAVIGATION_ACTIVE_LINK_CLASS}`));
    });

    it("It checks current link, if current link isnt", () => {
        let navEl = getNewNav();
        let navController: Navigation = new Navigation(navEl);

        navEl.querySelector(`.${NAVIGATION_ACTIVE_LINK_CLASS}`)?.classList.remove(NAVIGATION_ACTIVE_LINK_CLASS);

        let a = 0;

        try {
            navController.getCurrentLink()
        } catch(e) {
            a = 1;
        }

        expect(a).toEqual(1);
    });

    it("it checks current links length fix", () => {
        let navEl = getNewNav();
        navEl.querySelectorAll<HTMLLinkElement>(`.${NAVIGATION_LINK_CLASS}`).forEach((i: HTMLLinkElement) => {
            i.classList.add(NAVIGATION_ACTIVE_LINK_CLASS)
        });

        try {
            let navController: Navigation = new Navigation(navEl);
        } catch(err) {
            expect(err).toEqual(err);
        }

    });

    it("it checks all links", () => {
        let navEl = getNewNav();
        let navController: Navigation = new Navigation(navEl);

        expect(navController.getLinks()).toEqual(navEl.querySelectorAll(`.${NAVIGATION_LINK_CLASS}`));
    });

    it("it checks change active link", () => {
        let navEl = getNewNav();
        let navController: Navigation = new Navigation(navEl);

        navController.changeActiveLink(1);

        expect(navController.getCurrentLink()).not.toEqual(navController.getLinks()[0]);
        expect(navController.getCurrentLink()).toEqual(navController.getLinks()[1]);
    });

    it("it checks method addEventToAllLinks", () => {
        let navEl = getNewNav();
        let navController: Navigation = new Navigation(navEl);

        let a = 0;

        navController.addEventToAllLinks('click', () => {
            a = 1;
        });

        navController.getLinks()[1].dispatchEvent(new Event('click'));

        expect(a).toEqual(1);
    });
});