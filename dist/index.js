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
      const response = await fetch("https://www.youniqueproducts.com/myk/bulk/US-11102-13,US-11102-08,US-11102-09,US-21102-00,US-11102-02,US-11102-04,US-11103-01,US-22103-00,US-12103-01,US-12103-02,US-12103-03,US-11009-06,US-72103-00,US-12103-14,US-12103-15,US-12103-16,US-12103-17,US-12103-18,US-62103-00,US-12103-19,US-12103-20,US-12103-21,US-12103-22,US-12103-23,US-21105-00,US-11105-01,US-11105-02,US-22107-00,US-12107-01,US-12107-09,US-22102-00,US-12102-02,US-12102-09,US-12112-01,US-11105-04,US-21003-00,US-11003-09,US-11003-13,US-11003-14,US-31014-00,US-11014-04,US-11014-05,US-11014-06,US-11014-07,US-11019-01,US-11019-02,US-11019-03,US-11019-04,US-11010-03,US-11010-05,US-11009-03,US-31009-02,US-11009-02,US-21007-00,US-11005-02,US-11005-03,US-11005-04,US-11005-06,US-11005-08,US-11005-09,US-11006-01,US-11006-03,US-11006-04,US-11006-05,US-11006-08,US-11006-13,US-11006-16,US-11006-17,US-11006-18,US-11006-19,US-11006-21,US-11006-23,US-11006-24,US-11007-02,US-11007-04,US-11007-05,US-11007-06,US-11007-09,US-11007-11,US-11008-01,US-11008-02,US-11008-03,US-11008-04,US-11008-05,US-11008-06,US-11008-07,US-11008-09,US-11008-10,US-11008-14,US-11008-17,US-11008-18,US-11008-19,US-11007-15,US-11007-14,US-31009-01,US-11009-01,US-51020-00,US-11020-04,US-11020-05,US-11020-07,US-11020-10,US-11020-13,US-11020-14,US-11020-15,US-12002-02,US-11803-00,US-11803-21,US-11803-22,US-11803-23,US-11803-24,US-11803-25,US-11803-26,US-11803-35,US-11803-36,US-21814-00,US-11814-01,US-11814-02,US-11814-03,US-11814-04,US-11814-05,US-11814-06,US-11814-07,US-11814-08,US-11814-09,US-11814-10,US-31815-00,US-11815-01,US-11815-02,US-11803-34,US-11803-28,US-11803-29,US-11803-30,US-11803-31,US-11803-32,US-11803-33,US-11806-01,US-11802-00,US-11802-01,US-11802-02,US-11802-03,US-11802-04,US-11802-05,US-11802-06,US-11802-09,US-11812-13,US-11812-08,US-11812-09,US-11812-10,US-11812-11,US-11812-12,US-11812-14,US-11812-17,US-11812-21,US-11812-15,US-11812-23,US-11812-24,US-11812-25,US-22111-00,US-12111-07,US-12111-08,US-12111-09,US-12111-01,US-12111-02,US-12111-03,US-12111-04,US-12111-05,US-12111-06,US-21412-00,US-11412-01,US-11412-02,US-11412-03,US-11412-04,US-11412-05,US-11412-06,US-11412-07,US-11412-08,US-11412-09,US-11412-10,US-11412-11,US-11412-12,US-11412-13,US-11412-14,US-11412-15,US-11412-16,US-11412-17,US-11412-18,US-11412-19,US-11412-20,US-11412-21,US-11412-22,US-11412-23,US-11412-24,US-11412-25,US-21410-00,US-11410-01,US-11410-02,US-11410-03,US-11410-04,US-11410-05,US-11410-06,US-11410-07,US-11410-08,US-11410-09,US-11410-10,US-11410-11,US-11410-12,US-11410-13,US-11410-14,US-11410-15,US-11410-16,US-11410-17,US-11410-18,US-11410-19,US-11410-25,US-11410-24,US-11410-23,US-11410-22,US-11410-21,US-11410-20,US-21418-00,US-11418-01,US-11418-02,US-11418-03,US-11418-04,US-11418-05,US-11418-06,US-11418-07,US-11418-08,US-11418-09,US-11418-10,US-11418-11,US-11418-12,US-11418-13,US-11418-14,US-11418-15,US-11418-16,US-11418-17,US-11418-18,US-11418-19,US-11418-20,US-11418-21,US-11418-22,US-11418-23,US-11418-24,US-11418-25,US-11416-00,US-11416-01,US-11416-02,US-11416-03,US-11416-04,US-11416-05,US-11416-06,US-11416-07,US-11416-08,US-11416-09,US-11416-10,US-11416-11,US-11416-12,US-11416-13,US-11416-14,US-11416-15,US-11416-16,US-11416-17,US-11416-18,US-11416-19,US-11416-20,US-11416-21,US-11416-22,US-11416-23,US-11416-24,US-11416-25,US-21600-00,US-11601-01,US-11601-02,US-11601-03,US-11601-04,US-11601-05,US-11601-06,US-17009-00,US-17009-01,US-17009-04,US-17009-02,US-17009-03,US-12001-05,US-12001-03,US-12001-06,US-31301-00,US-11301-09,US-11301-10,US-11301-11,US-11301-12,US-11301-13,US-11301-14,US-12405-00,US-12405-02,US-12405-03,US-12405-04,US-12405-05,US-12405-06,US-21606-00,US-11606-01,US-11606-02,US-11606-03,US-11606-04,US-17005-02,US-17004-02,US-21414-00,US-11414-01,US-11414-02,US-11414-03,US-11414-04,US-11414-05,US-11414-06,US-11414-07,US-11414-08,US-11414-09,US-11414-10,US-11414-11,US-11414-12,US-11414-13,US-11414-14,US-11414-15,US-11414-16,US-11414-17,US-11414-18,US-11414-19,US-11414-20,US-11414-21,US-11414-22,US-11414-23,US-11414-24,US-11414-25,US-11414-26,US-66204-01,US-66204-02,US-66204-03,US-66204-04,US-66204-05,US-66204-06,US-16304-02,US-16204-10,US-53021-03,US-36204-01,US-16204-03,US-16204-13,US-16204-14,US-16204-06,US-16208-01,US-36208-01,US-91522-35,US-16204-16,US-16208-03,US-26207-00,US-16207-01,US-16208-02,US-36204-03,US-36204-04,US-26204-00,US-16204-04,US-16204-01,US-36204-02,US-16204-05,US-16305-02,US-16305-01,US-16405-03,US-91522-36,US-16304-01,US-16304-07,US-44430-01,US-42022-06,US-21102-08,US-42022-07,US-42022-08,US-42022-09,US-32103-05,US-31201-01,US-53011-01,US-91522-25,US-91522-27,US-51071-02,US-51091-01,US-51081-01,US-52043-00,US-52048-00,US-52044-00,US-51041-01,US-52045-00,US-51061-01,US-52046-00,US-52042-01,US-52032-01,US-52034-01,US-52035-01,US-52031-01,US-52033-01,US-52035-03,US-52035-02,US-52035-06,US-11009-04,US-53051-01,US-52037-02,US-11105-03,US-53041-03,US-53031-03,US-13001-04,US-13001-01,US-13001-02,US-13001-03,US-91518-43,US-16307-01,US-16304-06,US-16304-00,US-16304-05,US-16304-10,US-16304-11,US-16304-12,US-12407-01");
      const data = await response.json();
      console.log(data);
      const cleanData = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === "active" && data[i].enabled === 1 && data[i].price != "0.00" && data[i].product_sub_category != "Variant Master" && data[i].product_sub_category != "BFCM" && data[i].product_sub_category != "Kudos") {
          cleanData.push(data[i]);
        }
      }
      console.log(cleanData);
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
