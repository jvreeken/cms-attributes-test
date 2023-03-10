import type {
    CMSFilters
} from '../../types/CMSFilters';
import type {
    Product
} from './types';
/**
 * Populate CMS Data from an external API.
 */
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push(['cmsfilter',
    async (filtersInstances: CMSFilters[]) => {
        // Get the filters instance
        const [filtersInstance] = filtersInstances;
        // Get the list instance
        const {
            listInstance
        } = filtersInstance;
        // Save a copy of the template
        const [firstItem] = listInstance.items;
        const itemTemplateElement = firstItem.element;
        // Fetch external data
        const products = await fetchProducts();
        // Remove existing items
        listInstance.clearItems();
        // Create the new items
        const newItems = products.map((product) => createItem(product, itemTemplateElement));
        // Populate the list
        await listInstance.addItems(newItems);
        // Get the template filter
        const filterTemplateElement = filtersInstance.form.querySelector < HTMLLabelElement > ('[data-element="filter"]');
        if (!filterTemplateElement) return;
        // Get the parent wrapper
        const filtersWrapper = filterTemplateElement.parentElement;
        if (!filtersWrapper) return;
        // Remove the template from the DOM
        filterTemplateElement.remove();
        // Collect the categories
        const categories = collectCategories(products);
        // Create the new filters and append the to the parent wrapper
        for (const product_sub_category of categories) {
            const newFilter = createFilter(product_sub_category, filterTemplateElement);
            if (!newFilter) continue;
            filtersWrapper.append(newFilter);
        }
        // Sync the CMSFilters instance with the new created filters
        filtersInstance.storeFiltersData();
    },
]);
/**
 * Fetches products.
 * @returns An array of {@link Product}.
 */
const fetchProducts = async () => {
    try {
        const response = await fetch('https://www.youniqueproducts.com/myk/bulk/US-11805-01,US-16204-06,US-16204-03,US-11601-01,US-11601-02,US-11601-03,US-12001-03,US-11102-04,US-11102-02,US-52033-01,US-13001-01,US-13001-02,US-13001-03,US-13001-04,US-52049-00,US-52042-01,US-12304-03,US-35101-04,US-91521-25,US-53011-01,US-11601-04,US-11601-05,US-11601-06,US-31201-01,US-42022-07,US-42022-09,US-91518-43,US-16204-15');
        const data: Product[] = await response.json();
        const cleanData = [];
        //PUSH OUT OF STOCK TO THE BOTTOM OF THE LIST
        for (let i = 0; i < data.length; i++) {
            // if ((data[i].status === 'active') && (data[i].enabled === 1) && (data[i].price != "0.00") && (data[i].product_sub_category != "Variant Master") && (data[i].product_sub_category != "BFCM") && (data[i].product_sub_category != "Kudos")) {
            //     cleanData.push(data[i]);
            // }
            if (data[i].item_availability.item_availability_id != 11){
                cleanData.push(data[i]);
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].item_availability.item_availability_id === 11){
                cleanData.push(data[i]);
            }
        }
        console.log(cleanData);
        return cleanData;
    } catch (error) {
        return [];
    }
};
/**
 * Creates an item from the template element.
 * @param product The product data to create the item from.
 * @param templateElement The template element.
 *
 * @returns A new Collection Item element.
 */
const createItem = (product: Product, templateElement: HTMLDivElement) => {
    // Clone the template element
    const newItem = templateElement.cloneNode(true) as HTMLDivElement;
    // Query inner elements
    const image = newItem.querySelector < HTMLImageElement > ('[data-element="image"]');
    const swatch = newItem.querySelector < HTMLImageElement > ('[data-element="swatch"]');
    const title = newItem.querySelector < HTMLDivElement > ('[data-element="title"]');
    const available_date_public = newItem.querySelector < HTMLDivElement > ('[data-element="available-date-public"]');
    const product_sub_category = newItem.querySelector < HTMLDivElement > ('[data-element="product_sub_category"]');
    const sku = newItem.querySelector < HTMLParagraphElement > ('[data-element="sku"]');
    const price = newItem.querySelector < HTMLParagraphElement > ('[data-element="price');
    const link = newItem.querySelector < HTMLDivElement > ('[data-element="link');
    // Populate inner elements
    if (image) image.src = product.image.url;
    if (swatch && product.alternate_preview && product.parent_items[0]) swatch.src = product.parent_items[0].image.url;
    else if (swatch) swatch.remove();
    if (title) title.textContent = product.name;
    if (available_date_public) available_date_public.textContent = product.available_date_public;
    if (product_sub_category) product_sub_category.textContent = product.product_sub_category;
    if (sku) sku.textContent = product.sku;
    if (price) price.textContent = "$" + Math.round(product.price);
    if (link) link.textContent = product.name;
    if (link) link.href = "https://www.youniqueproducts.com/products/view/" + product.sku;
    if (product.item_availability.item_availability_id === 11) {
        console.log(newItem);
        newItem.classList.add("out-of-stock");
    }
    return newItem;
};
/**
 * Collects all the categories from the products' data.
 * @param products The products' data.
 *
 * @returns An array of {@link Product} categories.
 */
const collectCategories = (products: Product[]) => {
    const categories: Set < Product['product_sub_category'] > = new Set();
    for (const {
            product_sub_category
        } of products) {
        categories.add(product_sub_category);
    }
    return [...categories];
};
/**
 * Creates a new radio filter from the template element.
 * @param product_sub_category The filter value.
 * @param templateElement The template element.
 *
 * @returns A new product_sub_category radio filter.
 */
const createFilter = (product_sub_category: Product['product_sub_category'], templateElement: HTMLLabelElement) => {
    // Clone the template element
    const newFilter = templateElement.cloneNode(true) as HTMLLabelElement;
    // Query inner elements
    const label = newFilter.querySelector('span');
    const radio = newFilter.querySelector('input');
    if (!label || !radio) return;
    // Populate inner elements
    label.textContent = product_sub_category;
    radio.value = product_sub_category;
    radio.id = `radio-${product_sub_category}`;
    return newFilter;
};