export const NAVIGATION_LINK_CLASS: string = 'navigation__link';
export const NAVIGATION_ACTIVE_LINK_CLASS: string = 'navigation__link_active';

export class Navigation {
    private navElem: HTMLElement;
    private linkClass: string;
    private activeLinkClass: string;

    private removeCurrentLink(): void {
        let currentLink: HTMLLinkElement | undefined = this.getCurrentLink();

        if(currentLink === undefined) throw new Error('No active link');
        currentLink.classList.remove(this.activeLinkClass);
    } 

    private addCurrentLink(index: number): void {
        this.getLinks()[index].classList.add(this.activeLinkClass);
    }

    public constructor(root: HTMLElement, linkClass?: string, activeLinkClass?: string) {
        this.navElem = root;
        this.linkClass = linkClass || NAVIGATION_LINK_CLASS;
        this.activeLinkClass = activeLinkClass || NAVIGATION_ACTIVE_LINK_CLASS;

        if(this.navElem.querySelectorAll('.navigation__link_active').length > 1)
            throw new Error("Too many active links, navigation includes only one active link");
    }

    public getLinks(): NodeListOf<HTMLLinkElement> {
        return this.navElem.querySelectorAll(`.${this.linkClass}`);
    }

    public getCurrentLink(): HTMLLinkElement {

        for(let i: number = 0; i < this.getLinks().length; i++) {

            if(this.getLinks()[i].classList.contains(this.activeLinkClass)) return this.getLinks()[i];
        } 

        throw new Error('No active link');
    }

    public changeActiveLink(index: number): void {
        this.removeCurrentLink();
        this.addCurrentLink(index);
    }

    // Adds side effect to click on link, it will be useful for animations, popups (advertisment, for example).
    
    public addEventToAllLinks(event: string, callback: Function): void {

        this.getLinks().forEach((link: HTMLLinkElement, index: number) => {

            link.addEventListener(event, (e: Event) => {
                callback(e, link, index);
            });
        });
    }
}