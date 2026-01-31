/**
 * Product data and inventory
 */

export const PRODUCTS = [
  {
    id: 'tshirt-solid-compression-1',
    name: 'T-Shirts',
    description: 'Godwear Pro Solid Dry Fit T-Shirt Men Compression',
    price: '₹2,299',
    priceAfterDiscount: '₹676',
    discount: '70% off',
    tag: 'NEW ARRIVAL',
    imgHeight: 'aspect-[3/4]',
    bgUrl: 'bg-[url(/images/hero-1.webp)]',
    flipkartLink: 'https://www.flipkart.com/godwear-pro-solid-dry-fit-t-shirt-men-compression/p/itm8524a29e212e3?pid=CMRHGUXRXPGAXZ46&lid=LSTCMRHGUXRXPGAXZ4672QEAN&marketplace=FLIPKART&store=abc%2Fg9d&srno=b_1_4&otracker=product_breadCrumbs_godwear%20Sport%20Accessories&fm=organic&iid=ff2298e6-8b63-4b58-bd03-dffe5ebeba15.CMRHGUXRXPGAXZ46.SEARCH&ppt=browse&ppn=browse&ssid=ecfupejvi80000001769579997160'
  },
  {
    id: 'tshirt-skins-compression-1',
    name: 'T-Shirts',
    description: 'Godwear Pro Dry Fit Skins T-Shirt Men Compression',
    price: '₹2,399',
    priceAfterDiscount: '₹799',
    discount: '70% off',
    tag: 'NEW ARRIVAL',
    imgHeight: 'aspect-[3/4]',
    bgUrl: 'bg-[url(/images/hero-2.webp)]',
    flipkartLink: 'https://www.flipkart.com/godwear-pro-dry-fit-skins-t-shirt-men-compression/p/itm30f7983aef95f?pid=CMRHJ27DCXHYVJHS&lid=LSTCMRHJ27DCXHYVJHS2NGQMP&marketplace=FLIPKART&store=abc%2Fg9d&srno=b_1_7&otracker=product_breadCrumbs_godwear%20Sport%20Accessories&fm=organic&iid=ff2298e6-8b63-4b58-bd03-dffe5ebeba15.CMRHJ27DCXHYVJHS.SEARCH&ppt=browse&ppn=browse&ssid=ecfupejvi80000001769579997160'
  },
  {
    id: 'tshirt-solid-compression-2',
    name: 'T-Shirts',
    description: 'Godwear Pro Solid Dry Fit T-Shirt Men Compression',
    price: '₹2,299',
    priceAfterDiscount: '₹676',
    discount: '70% off',
    tag: 'NEW ARRIVAL',
    imgHeight: 'aspect-[3/4]',
    bgUrl: 'bg-[url(/images/hero-1.webp)]',
    flipkartLink: 'https://www.flipkart.com/godwear-pro-solid-dry-fit-t-shirt-men-compression/p/itm8524a29e212e3?pid=CMRHGUXRXPGAXZ46&lid=LSTCMRHGUXRXPGAXZ4672QEAN&marketplace=FLIPKART&store=abc%2Fg9d&srno=b_1_4&otracker=product_breadCrumbs_godwear%20Sport%20Accessories&fm=organic&iid=ff2298e6-8b63-4b58-bd03-dffe5ebeba15.CMRHGUXRXPGAXZ46.SEARCH&ppt=browse&ppn=browse&ssid=ecfupejvi80000001769579997160'
  },
  {
    id: 'tshirt-skins-compression-2',
    name: 'T-Shirts',
    description: 'Godwear Pro Dry Fit Skins T-Shirt Men Compression',
    price: '₹2,399',
    priceAfterDiscount: '₹799',
    discount: '70% off',
    tag: 'NEW ARRIVAL',
    imgHeight: 'aspect-[3/4]',
    bgUrl: 'bg-[url(/images/hero-2.webp)]',
    flipkartLink: 'https://www.flipkart.com/godwear-pro-dry-fit-skins-t-shirt-men-compression/p/itm30f7983aef95f?pid=CMRHJ27DCXHYVJHS&lid=LSTCMRHJ27DCXHYVJHS2NGQMP&marketplace=FLIPKART&store=abc%2Fg9d&srno=b_1_7&otracker=product_breadCrumbs_godwear%20Sport%20Accessories&fm=organic&iid=ff2298e6-8b63-4b58-bd03-dffe5ebeba15.CMRHJ27DCXHYVJHS.SEARCH&ppt=browse&ppn=browse&ssid=ecfupejvi80000001769579997160'
  }
];

/**
 * Filter products by category
 * @param {string} category - Category name to filter by
 * @returns {Array} Filtered products
 */
export const filterProductsByCategory = (category) => {
  if (category === 'All') {
    return PRODUCTS;
  }
  return PRODUCTS.filter(product => product.name === category);
};

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Object|undefined} Product object
 */
export const getProductById = (id) => {
  return PRODUCTS.find(product => product.id === id);
};
