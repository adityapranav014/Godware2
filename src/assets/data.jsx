// Product Data
const productData = [
  {
    name: "T-Shirts",
    description: "Godwear Pro Solid Dry Fit T-Shirt Men Compression",
    details:
      "Precision-knit compression that sculpts the upper body, balances airflow, and stays locked during high reps.",
    price: "₹2,299",
    priceAfterDiscount: "₹697",
    discount: "69% off",
    tag: "NEW ARRIVAL",
    badge: "BESTSELLER",
    rating: 4.5,
    reviewCount: 523,
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
    priceAfterDiscount: "₹820",
    discount: "65% off",
    tag: "NEW ARRIVAL",
    badge: "LIMITED STOCK",
    rating: 4.3,
    reviewCount: 348,
    imgHeight: "aspect-[3/4]",
    bgUrl: "/video/product-2.mp4?updatedAt=1770004746595",
    flipkartLink: "https://www.flipkart.com/godwear-pro-dry-fit-skins-t-shirt-men-compression/p/itm30f7983aef95f?pid=CMRHJ27DCXHYVJHS&lid=LSTCMRHJ27DCXHYVJHS2NGQMP&marketplace=FLIPKART&store=abc%2Fg9d&srno=b_1_7&otracker=product_breadCrumbs_godwear%20Sport%20Accessories&fm=organic&iid=ff2298e6-8b63-4b58-bd03-dffe5ebeba15.CMRHJ27DCXHYVJHS.SEARCH&ppt=browse&ppn=browse&ssid=ecfupejvi80000001769579997160",
  },
];

// Testimonials Data
const testimonialsData = [
  {
    name: "Dhruv Sharma",
    role: "Strength Coach",
    text: "The fit and durability are unreal. After heavy sessions, the compression tee still holds its shape perfectly.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Tarun Thakur",
    role: "CrossFit Athlete",
    text: "Finally, a compression shirt that handles high-intensity intervals without riding up or losing tension.",
    image: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    name: "Rohan Gupta",
    role: "Marathon Runner",
    text: "Breathable and light. The compression reduces muscle fatigue significantly during my long training blocks.",
    image: "https://randomuser.me/api/portraits/men/68.jpg"
  },
  {
    name: "Arjun Malik",
    role: "Bodybuilder",
    text: "The stitching and cut are premium. This compression gear makes my physique look sharp in and out of the gym.",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Karan Mehta",
    role: "Functional Athlete",
    text: "This compression T-shirt locks my torso in place without restricting movement—ideal for stabilizing heavy lifts.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    name: "Aarav Joshi",
    role: "Fast Bowler (Cricket)",
    text: "Bowling long spells in heat demands sweat control. This gear keeps my shoulders loose and recovery fast.",
    image: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    name: "Aniket Rao",
    role: "Triathlete",
    text: "The moisture-wicking on this compression top is top-tier. Keeps me dry and supported mile after mile.",
    image: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    name: "Yash Kulkarni",
    role: "Batsman (Cricket)",
    text: "Running between wickets feels effortless. The shirt moves with my body during drives and pulls.",
    image: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    name: "Devansh Patel",
    role: "HIIT Specialist",
    text: "Hugs the right places so my form stays locked during plyometric drills. Best compression layer I've owned.",
    image: "https://randomuser.me/api/portraits/men/76.jpg"
  },
  {
    name: "Pranav Chauhan",
    role: "Football Winger",
    text: "Under my jersey, this base layer is essential. Keeps my core engaged during sprints and tackles.",
    image: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    name: "Nikhil Kapoor",
    role: "Circuit Racer",
    text: "I wear this under my race suit. The compressive feel keeps my muscles warm and responsive on track days.",
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    name: "Gaurav Tanwar",
    role: "Kabaddi Defender",
    text: "Grip and durability are key. This fabric survives the mat burns and holds me tight during raids.",
    image: "https://randomuser.me/api/portraits/men/62.jpg"
  },
  {
    name: "Lakshya Tiwari",
    role: "Weightlifting Coach",
    text: "My clients ask about this gear constantly. It stays locked in for every snatch and provides excellent core support.",
    image: "https://randomuser.me/api/portraits/men/88.jpg"
  },
  {
    name: "Kartik Menon",
    role: "Tennis Player",
    text: "Serve motion feels unrestricted. The compression helps with arm fatigue deep in the third set.",
    image: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    name: "Aryan Desai",
    role: "Fitness Model",
    text: "Perfect for shoots. It never creases, and the compression accentuates muscle definition like nothing else.",
    image: "https://randomuser.me/api/portraits/men/29.jpg"
  },
  {
    name: "Rajveer Chahal",
    role: "Pro Boxer",
    text: "Sparring puts gear to the test. This shirt stays intact and protects my skin during clinches.",
    image: "https://randomuser.me/api/portraits/men/58.jpg"
  },
  {
    name: "Himanshu Dixit",
    role: "Trail Runner",
    text: "Heat and humidity are no match; the tee moves with me while supporting my midsection on uneven terrain.",
    image: "https://randomuser.me/api/portraits/men/66.jpg"
  },
  {
    name: "Deepak Rathore",
    role: "Javelin Thrower",
    text: "Explosive power needs stability. This compression top supports my rotation perfectly during throws.",
    image: "https://randomuser.me/api/portraits/men/71.jpg"
  },
  {
    name: "Kabir Seth",
    role: "Powerlifter",
    text: "Compression panels feel like a second skin. The tightness gives me that extra confidence under the heavy bar.",
    image: "https://randomuser.me/api/portraits/men/90.jpg"
  },
  {
    name: "Piyush Yadav",
    role: "Wrestler",
    text: "Grappling requires freedom of movement. This shirt shows off the gains and supports the grind.",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
  {
    name: "Saurabh Nair",
    role: "Cyclist",
    text: "Aerodynamics matter. This fits perfectly under my kit and wicks sweat on long rides.",
    image: "https://randomuser.me/api/portraits/men/25.jpg"
  }
];

// Comparison Features Data
const comparisonFeaturesData = [
  {
    title: "Engineered Fit",
    description: "Compression grade structure that adapts to your body's movement.",
    iconName: "Scaling",
    colSpan: "md:col-span-2",
  },
  {
    title: "Thermal Control",
    description: "Premium fabric blends optimize heat and sweat regulation.",
    iconName: "Thermometer",
    colSpan: "md:col-span-1",
  },
  {
    title: "Elite Durability",
    description: "Reinforced stitching designed for heavy training cycles.",
    iconName: "ShieldCheck",
    colSpan: "md:col-span-1",
  },
  {
    title: "Athlete Tested",
    description: "Patterns refined by pro athletes for peak performance.",
    iconName: "Trophy",
    colSpan: "md:col-span-2",
  },
  {
    title: "Performance Community",
    description: "Join a network of athletes dedicated to pushing limits.",
    iconName: "Users",
    colSpan: "md:col-span-1",
  },
  {
    title: "Impact Resistant",
    description: "Materials built to withstand high-intensity friction.",
    iconName: "Dumbbell",
    colSpan: "md:col-span-1",
  },
  {
    title: "Reactive Power",
    description: "Fabric that snaps back, enhancing your natural power output.",
    iconName: "Zap",
    colSpan: "md:col-span-1",
  }
];

// Tagline Items Data
const taglineItemsData = [
  { text: "Free Shipping", iconName: "Truck" },
  { text: "Premium Quality", iconName: "Gem" },
  { text: "10K+ Athletes", iconName: "Users" },
  { text: "Sweat-Wicking", iconName: "Droplet" },
  { text: "Money-Back Guarantee", iconName: "RotateCcw" },
  { text: "Selling Fast", iconName: "Flame" },
  { text: "Breathable Fabric", iconName: "Wind" },
  { text: "Peak Performance", iconName: "Zap" }
];

// Stats Data
const statsData = [
  { iconName: "Users", value: "10,000", suffix: "+", label: "Athletes", highlight: false },
  { iconName: "Star", value: "4.5", suffix: "★", label: "Avg Rating", highlight: true },
  { iconName: "Truck", value: "Free", suffix: "", label: "Shipping", highlight: false, isText: true },
  { iconName: "Zap", value: "69", suffix: "%", label: "Off Sale", highlight: true },
];

// About Features Data
const aboutFeaturesData = [
  {
    iconName: "Zap",
    title: "Sustainability",
    description: "Working alongside international groups of athletes, we create high-performance gym wear from premium materials."
  },
  {
    iconName: "Landmark",
    title: "Mission",
    description: "We're on a mission to empower people to push their limits and achieve their fitness goals with confidence and style."
  }
];

// Contact Form Trust Indicators Data
const trustIndicatorsData = [
  { iconName: "ShieldCheck", text: "Your data is safe" },
  { iconName: "Clock3", text: "3h response time" }
];

// Contact Info Labels Data
const contactInfoLabelsData = {
  businessHours: "Business Hours",
  reachUs: "Reach Us",
  call: "Call",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  email: "Email",
  businessLocation: "Business Location",
  hours: "24/7 Available",
  address: "New Delhi, India",
  schedule: [
    { day: "Monday – Friday", time: "9 AM – 8 PM" },
    { day: "Saturday", time: "10 AM – 6 PM" },
    { day: "Sunday", time: "Closed" }
  ]
};

// Contact Form Labels Data
const contactFormLabelsData = {
  formHeading: "Send a Message",
  nameLabel: "Full Name",
  emailLabel: "Email Address",
  phoneLabel: "Phone Number",
  messageLabel: "Tell us about your order",
  nameRequired: "Full Name *",
  emailRequired: "Email Address *",
  phoneOptional: "Phone Number (Optional)",
  messageRequired: "Tell us about your order *",
  submitButton: "Send",
  required: "*",
  optional: "(Optional)"
};

// Footer Content Data
const footerContentData = {
  copyright: "All rights reserved.",
  copyrightBrand: "GOD WEAR",
  craftedBy: "Crafted in India with love.",
  sectionLabels: {
    connect: "Connect",
    shop: "Shop",
    company: "Company"
  },
  products: {
    primaryLine: "Compression T-Shirts"
  },
  paymentMethods: [
    { label: "Secure Checkout", icon: "ShieldCheck" },
    { label: "COD", icon: null },
    { label: "UPI", icon: null },
    { label: "Card", icon: null }
  ],
  productLine: "We create premium compression wear for athletes",
  brandDescription: "Premium fitness and lifestyle brand for those who train with discipline and live with confidence, built with powerful compression, bold design, and lasting comfort.",
  crafatedByLabel: "Crafted by"
};

// Contact Reach Us Items Data  
const contactReachUsItemsData = [
  { label: "Call", iconName: "Phone" },
  { label: "WhatsApp", iconName: "MessageCircle" },
  { label: "Instagram", iconName: "Instagram" },
  { label: "Email", iconName: "Mail" }
];

// UI Configuration Data
const uiConfigData = {
  testimonials: {
    starRatingMax: 5,
    autoScrollSpeed: 0.5,
    swipeThreshold: 50,
    swipeHint: "Swipe to explore",
    verifiedBadge: "Verified"
  },
  animations: {
    imagePlaceholderBg: "bg-dark-900",
    cardGap: "gap-4 sm:gap-6"
  },
  hero: {
    mainHeading: "Your Second Layer of Skin",
    ctaButton: "Shop Now"
  }
};

export {
  productData,
  testimonialsData,
  comparisonFeaturesData,
  taglineItemsData,
  statsData,
  aboutFeaturesData,
  trustIndicatorsData,
  contactInfoLabelsData,
  contactFormLabelsData,
  footerContentData,
  contactReachUsItemsData,
  uiConfigData,
};

