(() => {
  // src/cms/populate-external-data/index.ts
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsfilter",
    async (filtersInstances) => {
      const [filtersInstance] = filtersInstances;
      const { listInstance } = filtersInstance;
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
      const response = await fetch("https://www.youniqueproducts.com/myk/bulk/US-31201-01,US-16304-06,US-16304-05,US-13001-02,US-91518-43,US-42022-06,US-91522-05,US-11010-03,US-11010-05,US-11102-09,US-42022-08,US-11102-08,US-42022-09,US-11102-13,US-11103-01,US-11806-01,US-32103-05,US-32502-01,US-82103-00,US-12002-02,US-11805-01,US-11105-04,US-31009-03,US-31009-02,US-31009-01,US-13001-01,US-17005-02,US-17004-01,US-17005-01,US-12001-03,US-12001-05,US-12001-06,US-42022-07,US-13001-04,US-11009-04,US-11009-03,US-16304-07,US-44430-01,US-91522-26,US-52033-02,US-52045-00,US-52046-00,US-53011-01,US-51061-01,US-53051-01,US-52033-01,US-51041-01,US-52044-00,US-52043-00,US-52037-02,US-51081-01,US-11105-03,US-51071-02,US-52035-02,US-53031-03,US-52048-00,US-52042-01,US-52032-01,US-52049-00,US-52034-01,US-52038-01,US-52035-06,US-51091-01,US-52035-03,US-13001-03,US-91522-36,US-16204-05,US-16305-02,US-16204-03,US-16305-01,US-36204-01,US-16304-02,US-16204-10,US-66204-06,US-66204-01,US-36204-03,US-66204-04,US-16204-06,US-16304-01,US-16204-16,US-91522-35,US-16204-13,US-16207-01,US-53021-03,US-66204-03,US-36204-04,US-66204-02,US-66204-05,US-16204-08,US-16204-15,US-36204-02,US-11601-02,US-11601-04,US-11601-06,US-11601-05,US-11601-01,US-11601-03,US-12401-01,US-12107-01,US-12107-09,US-11802-05,US-11802-04,US-11802-03,US-11802-06,US-11802-01,US-11802-02,US-11003-09,US-11003-13,US-11102-02,US-11102-04,US-11102-05,US-11803-29,US-11803-32,US-11803-31,US-11803-30,US-11803-33,US-11803-28,US-11803-21,US-11803-24,US-11803-23,US-11803-25,US-11803-22,US-11803-26,US-12103-03,US-12111-02,US-12111-04,US-12111-03,US-12111-01,US-12111-06,US-12111-05,US-12102-01,US-12102-02,US-12102-03,US-12102-05,US-12102-08,US-12102-09,US-12102-91,US-11804-02,US-11804-03,US-11804-24,US-11804-16,US-11807-08,US-11804-25,US-11804-26,US-11007-09,US-11008-10,US-11006-01,US-11008-09,US-11008-17,US-11008-02,US-11006-05,US-11006-16,US-11006-13,US-11008-04,US-11005-03,US-11007-14,US-11006-19,US-11006-24,US-12103-20,US-12103-23,US-12103-19,US-12103-21,US-12103-22,US-11405-03,US-11405-01,US-11405-02,US-17002-03,US-17002-04,US-17002-02,US-17001-04,US-11416-16,US-11416-23,US-11416-20,US-11416-12,US-11416-13,US-11416-15,US-11416-17,US-11416-08,US-11416-19,US-11416-07,US-11416-24,US-11416-21,US-11416-11,US-11416-03,US-11416-09,US-11416-04,US-11416-25,US-11416-18,US-11416-10,US-11416-01,US-11416-22,US-11416-06,US-11416-02,US-11416-05,US-11416-14,US-17009-04,US-12405-06,US-12405-02,US-12405-04,US-11417-16,US-11417-23,US-11417-20,US-11417-12,US-11417-13,US-11417-15,US-11417-17,US-11417-08,US-11417-19,US-11417-07,US-11417-24,US-11417-21,US-11417-11,US-11417-03,US-11417-09,US-11417-04,US-11417-25,US-11417-18,US-11417-10,US-11417-01,US-11417-22,US-11417-06,US-11417-02,US-11417-05,US-11417-14,US-11414-21,US-11414-25,US-11414-23,US-11414-13,US-11414-14,US-11414-16,US-11414-17,US-11414-09,US-11414-18,US-11414-08,US-11414-20,US-11414-24,US-11414-12,US-11414-04,US-11414-10,US-11414-01,US-11414-05,US-11414-26,US-11414-22,US-11414-11,US-11414-02,US-11414-19,US-11414-07,US-11414-03,US-11414-06,US-11414-15,US-11412-12,US-11412-13,US-11412-15,US-11412-16,US-11412-08,US-11412-17,US-11412-07,US-11412-19,US-11412-11,US-11412-03,US-11412-09,US-11412-04,US-11412-10,US-11412-01,US-11412-18,US-11412-06,US-11412-02,US-11412-05,US-11412-14,US-11410-20,US-11410-24,US-11410-22,US-11410-12,US-11410-13,US-11410-15,US-11410-16,US-11410-08,US-11410-17,US-11410-07,US-11410-19,US-11410-23,US-11410-11,US-11410-03,US-11410-09,US-11410-04,US-11410-25,US-11410-21,US-11410-10,US-11410-01,US-11410-18,US-11410-06,US-11410-02,US-11410-05,US-11410-14,US-11812-11,US-11812-10,US-11812-15,US-11812-17,US-11812-09,US-11812-14,US-11812-21,US-11812-08,US-11812-12,US-16204-01,US-16204-04");
      const data = await response.json();
      return data;
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
    return newItem;
  };
  var collectCategories = (products) => {
    const categories = /* @__PURE__ */ new Set();
    for (const { product_sub_category } of products) {
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
