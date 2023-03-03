(() => {
  // src/cms/populate-external-data/index.ts
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsfilter",
    async (filtersInstances) => {
      const [filtersInstance] = filtersInstances;
      const {
        listInstance
      } = filtersInstance;
      const [firstItem] = listInstance.items;
      const itemTemplateElement = firstItem.element;
      const products = await fetchProducts();
      listInstance.clearItems();
      const newItems = products.map((product) => createItem(product, itemTemplateElement));
      await listInstance.addItems(newItems);
      const filterTemplateElement = filtersInstance.form.querySelector('[data-element="filter"]');
      if (!filterTemplateElement)
        return;
      const filtersWrapper = filterTemplateElement.parentElement;
      if (!filtersWrapper)
        return;
      filterTemplateElement.remove();
      const categories = collectCategories(products);
      for (const product_sub_category of categories) {
        const newFilter = createFilter(product_sub_category, filterTemplateElement);
        if (!newFilter)
          continue;
        filtersWrapper.append(newFilter);
      }
      filtersInstance.storeFiltersData();
    }
  ]);
  var fetchProducts = async () => {
    try {
      const response = await fetch("https://www.youniqueproducts.com/myk/bulk/US-11805-01,US-16204-06,US-16204-03,US-11601-01,US-11601-02,US-11601-03,US-12001-03,US-11102-04,US-11102-02,US-52033-01,US-13001-01,US-13001-02,US-13001-03,US-13001-04,US-52049-00,US-52042-01,US-12304-03,US-35101-04,US-91521-25,US-53011-01,US-11601-04,US-11601-05,US-11601-06,US-31201-01,US-42022-07,US-42022-09,US-91518-43,US-16204-15");
      const data = await response.json();
      const cleanData = [];
      for (let i = 0; i < data.length; i++) {
        cleanData.push(data[i]);
      }
      return cleanData;
    } catch (error) {
      return [];
    }
  };
  var createItem = (product, templateElement) => {
    const newItem = templateElement.cloneNode(true);
    const image = newItem.querySelector('[data-element="image"]');
    const swatch = newItem.querySelector('[data-element="swatch"]');
    const title = newItem.querySelector('[data-element="title"]');
    const available_date_public = newItem.querySelector('[data-element="available-date-public"]');
    const product_sub_category = newItem.querySelector('[data-element="product_sub_category"]');
    const sku = newItem.querySelector('[data-element="sku"]');
    const price = newItem.querySelector('[data-element="price');
    const link = newItem.querySelector('[data-element="link');
    if (image)
      image.src = product.image.url;
    if (swatch && product.alternate_preview && product.parent_items[0])
      swatch.src = product.parent_items[0].image.url;
    else if (swatch)
      swatch.remove();
    if (title)
      title.textContent = product.name;
    if (available_date_public)
      available_date_public.textContent = product.available_date_public;
    if (product_sub_category)
      product_sub_category.textContent = product.product_sub_category;
    if (sku)
      sku.textContent = product.sku;
    if (price)
      price.textContent = "$" + Math.round(product.price);
    if (link)
      link.textContent = product.name;
    if (link)
      link.href = "https://www.youniqueproducts.com/products/view/" + product.sku;
    return newItem;
  };
  var collectCategories = (products) => {
    const categories = /* @__PURE__ */ new Set();
    for (const {
      product_sub_category
    } of products) {
      categories.add(product_sub_category);
    }
    return [...categories];
  };
  var createFilter = (product_sub_category, templateElement) => {
    const newFilter = templateElement.cloneNode(true);
    const label = newFilter.querySelector("span");
    const radio = newFilter.querySelector("input");
    if (!label || !radio)
      return;
    label.textContent = product_sub_category;
    radio.value = product_sub_category;
    radio.id = `radio-${product_sub_category}`;
    return newFilter;
  };
})();
