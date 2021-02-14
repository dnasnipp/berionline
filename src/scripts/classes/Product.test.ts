import { ProductProps, Product, PRODUCT_CLASSES } from './Product'

let productProp: ProductProps = {
    title: '1',
    description: '1',
    cats: 'sdasd > a',
    catsLink: 'dsad',
    img: '',
    price: 100,
    discountPrice: 999,
    productLink: 'sdasd'
}

let productPropDiscounts: ProductProps = {
    title: '1',
    description: '1',
    cats: 'sdasd > a',
    catsLink: 'dsad',
    img: '',
    price: 100,
    discountPrice: 999,
    productLink: 'sdasd',
    discounts: [
        {
            title: 'sdasd',
            link: 'dasd'
        }
    ]
}

describe('Product tests', () => {

    it('It hecks markup valid', () => {
        let validMarkup: string = `
            <a class="product__main-content" href="sdasd">
                <div class="product__img"><img class="product__img-src" src="" alt="Default"></div>
                    <div class="product__text">
                        <h2 class="product__title">1</h2>
                        <h3 class="product__description">1</h3>
                        <h2 class="product__price">Цена:<span class="product__old-price">100</span><span class="product__current-price">999</span></h2>
                        <h4 class="product__cats" data-href="dsad">sdasd &gt; a</h4>
                </div>
            </a>
        `;

        let product = new Product(undefined, productProp);
        expect(product.getHTMLMarkup().innerHTML.replace(/\s/g, "")).toEqual(validMarkup.replace(/\s/g, ""));
    });

    it('It checks create object without props', () => {
        let a: number = 0;

        try {
            let product: Product = new Product();
        } catch (e) {
            a = 1;
        }

        expect(a).toEqual(1);
    });

    it('It checks create object using both markup and data obj', () => {
        let a: number = 0;
        let elm: HTMLElement = document.createElement('div');

        try {
            let product: Product = new Product(elm, productProp);
        } catch (e) {
            a = 1;
        }

        expect(a).toEqual(1);
    });

    it('It checks changeDiscountsIsOpen', () => {
        let product = new Product(undefined, productPropDiscounts);
        product.getHtmlElems().discountsBtn!.dispatchEvent(new Event('click'));

        expect(product.getHtmlElems().discounts!.classList.contains(PRODUCT_CLASSES.discountsHiddenClass)).toEqual(false);
    });
});