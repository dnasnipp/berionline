export const PRODUCT_CLASSES = Object.freeze(
    {
        productClass: 'product',
        mainContentClass: 'product__main-content',
        textClass: 'product__text',
        imgClass: 'product__img',
        imgSrcClass: 'product__img-src',
        titleClass: 'product__title',
        descriptionClass: 'product__description',
        priceClass: 'product__price',
        currentPrice: 'product__current-price',
        priceLineThrough: 'product__current-price_line',
        discountPrice: 'product__discount-price',
        catsClass: 'product__cats',
        discountsClass: 'product__discounts',
        discountsHiddenClass: 'product__discounts_hidden',
        discountsBtnClass: 'product__footer-header',
        discountsItemClass: 'product__discounts',
        discountsLinkClass: 'product__discount-link',
        promoClass: 'product__promo',
        footerClass: 'product__footer',
        footerIconClass: 'product__footer-icon' 
    }
);

const PRODUCT_MARKUP = `
    <a class="${PRODUCT_CLASSES.mainContentClass}" href="Default">
        <div class="${PRODUCT_CLASSES.imgClass}"><img class="${PRODUCT_CLASSES.imgSrcClass}" src="Default" alt="Default"/></div>
            <div class="${PRODUCT_CLASSES.textClass}">
                <h2 class="${PRODUCT_CLASSES.titleClass}">Default</h2>
                <h3 class="${PRODUCT_CLASSES.descriptionClass}">Default</h3>
                <h2 class="${PRODUCT_CLASSES.priceClass}">Цена: <span class="${PRODUCT_CLASSES.currentPrice}"></span><span class="${PRODUCT_CLASSES.discountPrice}"></span></h2>
                <h4 class="${PRODUCT_CLASSES.catsClass}" data-href="Default">Default</h4>
        </div>
    </a>
    <div class="${PRODUCT_CLASSES.footerClass}">
        <div class="btn ${PRODUCT_CLASSES.discountsBtnClass}"><span class="${PRODUCT_CLASSES.footerIconClass}">+</span> Акции</div>
        <ul class="${PRODUCT_CLASSES.discountsClass} ${PRODUCT_CLASSES.discountsHiddenClass}"></ul>
    </div>
`;

const PRODUCT_DISCOUNT_MARKUP = `
    <a class="${PRODUCT_CLASSES.discountsLinkClass}" href="Default">Default</a>
    <div class="${PRODUCT_CLASSES.promoClass}">Промокод: Не нужен</div>
`;

export type DiscountT = {
    link: string;
    title: string;
    promo?: string;
};

export type ProductProps = {
    title: string;
    description: string;
    cats: string;
    catsLink: string;
    img: string;
    price: number;
    discountPrice?: number;
    imgAlt?: string;
    productLink: string;
    discounts?: DiscountT[];
};

// Product class can to create Markup or use already created.
// For use existing markup you need to be sure of your markup is valid. Also you need to pass root element of your product
// For create markup you must to pass data object.
export class Product {

    private product: HTMLElement;
    private discountsIsOpen?: boolean;
    private data?: ProductProps;

    public constructor(product?: HTMLElement, data?: ProductProps) {
        if(product === undefined && data !== undefined) {
            this.data = data;
            this.product = this.genHTMLMarkup(data);
        } else if (product !== undefined) {
            this.product = product;
        } else {
            throw new Error('Product hasnt parent or data');
        }

        this.addEventListeners();
    }

    protected getHTMLMarkup(): HTMLElement {
        return this.product;
    }

    // Returns all needed elements for work of Product

    public getHtmlElems() {
        const obj = {
            mainContent: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.mainContentClass}`),
            img: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.imgClass}`),
            imgSrc: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.imgSrcClass}`),
            title: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.titleClass}`),
            description: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.descriptionClass}`),
            price: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.priceClass}`),
            currentPrice: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.currentPrice}`),
            discountPrice: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.discountPrice}`),
            cats: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.catsClass}`),
            discounts: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.discountsClass}`),
            discountsBtn: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.discountsBtnClass}`),
            discountsItems: this.product.querySelectorAll(`.${PRODUCT_CLASSES.discountsItemClass}`) as NodeListOf<HTMLElement>,
            discountLinks: this.product.querySelectorAll(`.${PRODUCT_CLASSES.discountsLinkClass}`) as NodeListOf<HTMLElement>,
            promo: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.promoClass}`),
            footer: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.footerClass}`),
            footerIcon: this.product.querySelector<HTMLElement>(`.${PRODUCT_CLASSES.footerIconClass}`)
        }

        return obj;
    }

    // Sets discountsIsOpen value

    public changeDiscountsIsOpen(value?: boolean): void {

        if(this.getHtmlElems().discounts !== null) {
            this.discountsIsOpen = value ? value : !this.discountsIsOpen;

            if(!this.discountsIsOpen) {
                this.getHtmlElems().footerIcon!.innerHTML = '+';
            } else if (this.discountsIsOpen) {
                this.getHtmlElems().footerIcon!.innerHTML = '-';
            }

            this.getHtmlElems().discounts!.classList.toggle(PRODUCT_CLASSES.discountsHiddenClass);
        }
    }

    // Returns HTML Markup of Product from data

    private genHTMLMarkup(data: ProductProps): HTMLElement {
        const root: HTMLElement = document.createElement('section');
        root.classList.add('product');
        root.innerHTML = PRODUCT_MARKUP;
        this.product = root;

        this.getHtmlElems().mainContent!.setAttribute('href', data.productLink);
        this.getHtmlElems().imgSrc!.setAttribute('src', data.img);

        if(data.imgAlt !== undefined) {
            this.getHtmlElems().imgSrc!.setAttribute('alt', data.imgAlt);
        }

        this.getHtmlElems().title!.innerHTML = data.title;
        this.getHtmlElems().description!.innerHTML = data.description;
        this.getHtmlElems().cats!.innerHTML = data.cats;
        this.getHtmlElems().cats!.setAttribute('data-href', data.catsLink);

        this.getHtmlElems().currentPrice!.innerHTML = data.price.toString();

        if(data.discountPrice) {
            this.getHtmlElems().currentPrice!.classList.add(`${PRODUCT_CLASSES.priceLineThrough}`);
            this.getHtmlElems().discountPrice!.innerHTML = data.discountPrice.toString();
        }

        if(data.discounts !== undefined) {

            // Creates html Markup of discount item

            data.discounts.forEach((i: DiscountT) => {
                let newDiscount = document.createElement('li');
                newDiscount.classList.add(PRODUCT_CLASSES.discountsItemClass);
                newDiscount.innerHTML = PRODUCT_DISCOUNT_MARKUP;

                newDiscount.querySelector(`.${PRODUCT_CLASSES.discountsLinkClass}`)!.innerHTML = i.title;
                newDiscount.querySelector(`.${PRODUCT_CLASSES.discountsLinkClass}`)!.setAttribute('href', i.link);
                newDiscount.querySelector(`.${PRODUCT_CLASSES.promoClass}`)!.innerHTML = `Промокод: ${i.promo? i.promo : 'Не нужен'}`;

                this.getHtmlElems().discounts!.appendChild(newDiscount);
            });
        } else {
            // Remove product footer if discounts arent

            this.getHtmlElems().footer!.remove();
        }

        return root;
    }

    private addEventListeners(): void {
        let catElm: HTMLElement | null = this.getHtmlElems().cats;
        let discountsBtn: HTMLElement | null = this.getHtmlElems().discountsBtn;
        let discounts: HTMLElement | null = this.getHtmlElems().discounts;

        // Listeners for cats needed because tag <a> () cant include other <a> tags. It emulates behaviour of <a> tag by javascript way

        if(catElm !== null) {
            catElm.addEventListener('mouseover', (e: MouseEvent) => {
                let target: HTMLElement = e.target as HTMLElement;
                target.style.textDecoration = 'underline';
            });
    
            catElm.addEventListener('mouseleave', (e: MouseEvent) => {
                let target: HTMLElement = e.target as HTMLElement;
                target.style.textDecoration = 'none';
            });
    
            catElm.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();
                let target: HTMLElement = e.target as HTMLElement;
                let dataHref: string | null = target.getAttribute('data-href');
    
                if(dataHref) location.assign(dataHref);
            });
        }

        // Changes visibility of discounts block

        if(discountsBtn !== null && discounts !== null) {

            discountsBtn.addEventListener('click', () => {
                this.changeDiscountsIsOpen();
            });
        }
    }
}