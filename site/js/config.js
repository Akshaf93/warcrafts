/* =====================================================================
   STORE SETTINGS — edit this file to change brand, contact & checkout.
   ===================================================================== */
window.STORE = {
  name: "WARCRAFTS",
  tagline: "Scale Models",
  fullName: "WARCRAFTS Scale Models",
  description:
    "Museum-grade scale models of fighter jets, warbirds, helicopters, warships and more — detailed, display-ready and built to impress.",

  // Currency shown everywhere (prices in products.js are plain numbers)
  currency: "PKR",
  locale: "en-PK",

  // Shipping
  shippingFee: 300,          // flat fee per order
  freeShippingOver: 15000,   // orders at or above this ship free (set 0 to disable)
  deliveryEstimate: "3–5 working days nationwide",

  // Contact — replace with your real details
  whatsapp: "923000000000",  // international format, digits only (no + or spaces)
  phoneDisplay: "+92 300 0000000",
  email: "orders@warcrafts.pk",
  city: "Pakistan",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",

  // Payment methods offered at checkout
  paymentMethods: [
    { id: "cod", label: "Cash on Delivery", note: "Pay when your model arrives." },
    { id: "bank", label: "Bank Transfer", note: "We'll send account details on WhatsApp." },
    { id: "wallet", label: "JazzCash / Easypaisa", note: "We'll send the wallet number on WhatsApp." }
  ]
};
