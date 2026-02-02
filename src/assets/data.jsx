const navLinksData = [
  {
    isActive: false,
    name: "Home",
  },
  {
    isActive: false,
    name: "Shop",
  },
  {
    isActive: false,
    name: "About",
  },
  {
    isActive: false,
    name: "Contact",
  },
];

const filterButtonsData = [
  {
    name: "All",
    count: 2,
    isActive: true,
  },
  {
    name: "T-Shirts",
    count: 2,
    isActive: false,
  },
  {
    name: "Shorts",
    count: 0,
    isActive: false,
  },
  {
    name: "Trousers",
    count: 0,
    isActive: false,
  },
  {
    name: "Accessories",
    count: 0,
    isActive: false,
  },
];

const productData = [
  {
    name: "T-Shirts",
    description: "Godwear Pro Solid Dry Fit T-Shirt Men Compression",
    details:
      "Precision-knit compression that sculpts the upper body, balances airflow, and stays locked during high reps.",
    price: "₹2,299",
    priceAfterDiscount: "₹676",
    discount: "70% off",
    tag: "NEW ARRIVAL",
    imgHeight: "aspect-[3/4]",
    bgUrl: "/video/product-1.mp4?updatedAt=1770004639401",
    flipkartLink: "https://www.flipkart.com/godwear-pro-solid-dry-fit-t-shirt-men-compression/p/itm8524a29e212e3?pid=CMRHGUXRXPGAXZ46&lid=LSTCMRHGUXRXPGAXZ4672QEAN&marketplace=FLIPKART&store=abc%2Fg9d&srno=b_1_4&otracker=product_breadCrumbs_godwear%20Sport%20Accessories&fm=organic&iid=ff2298e6-8b63-4b58-bd03-dffe5ebeba15.CMRHGUXRXPGAXZ46.SEARCH&ppt=browse&ppn=browse&ssid=ecfupejvi80000001769579997160",
  },
  {
    name: "T-Shirts",
    description: "Godwear Pro Dry Fit Skins T-Shirt Men Compression",
    details:
      "Dual-layer dry-fit weave that keeps you cool while amplifying mobility through every lift.",
    price: "₹2,399",
    priceAfterDiscount: "₹799",
    discount: "70% off",
    tag: "NEW ARRIVAL",
    imgHeight: "aspect-[3/4]",
    bgUrl: "/video/product-2.mp4?updatedAt=1770004746595",
    flipkartLink: "https://www.flipkart.com/godwear-pro-dry-fit-skins-t-shirt-men-compression/p/itm30f7983aef95f?pid=CMRHJ27DCXHYVJHS&lid=LSTCMRHJ27DCXHYVJHS2NGQMP&marketplace=FLIPKART&store=abc%2Fg9d&srno=b_1_7&otracker=product_breadCrumbs_godwear%20Sport%20Accessories&fm=organic&iid=ff2298e6-8b63-4b58-bd03-dffe5ebeba15.CMRHJ27DCXHYVJHS.SEARCH&ppt=browse&ppn=browse&ssid=ecfupejvi80000001769579997160",

  },
];

const productLinksData = [
  {
    title: "Product",
    links: ["Menswear", "Womenswear",],
  },
];
const buyingLinksData = [
  {
    title: "Buying",
    links: [
      "Shipping",
      "Returns",
      "Terms of Use",
      "Privacy Policy",
      "Customer Service",
    ],
  },
];
const socialLinksData = [
  {
    title: "Social",
    links: ["Instagram", "Facebook", "Twitter"],
  },
];

export {
  navLinksData,
  filterButtonsData,
  productData,
  socialLinksData,
  buyingLinksData,
  productLinksData,
};
