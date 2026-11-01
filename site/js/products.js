/* =====================================================================
   PRODUCT CATALOG
   ---------------------------------------------------------------------
   • price        → number in the store currency (see config.js)
   • compareAt    → optional "was" price (shows a sale tag), or null
   • build        → "display" (ready to display) or "kit" (requires assembly)
   • scale        → e.g. "1:72" — set to null if unknown (it will be hidden)
   • stock        → number available; 0 shows "Sold out"
   • images       → number of photos in assets/products/<id>/ (1.jpg, 2.jpg …)
   • featured     → show on the home page
   ===================================================================== */

window.CATEGORIES = [
  { id: "fighters",    name: "Fighter Jets",        blurb: "Stealth, speed & air superiority", cover: "j-20-mighty-dragon/1.jpg" },
  { id: "warbirds",    name: "Warbirds & Bombers",  blurb: "Legends of the propeller age",     cover: "b-25-mitchell/1.jpg" },
  { id: "recon",       name: "Recon & Drones",      blurb: "Eyes in the sky",                 cover: "mq-1-predator/1.jpg" },
  { id: "helicopters", name: "Helicopters",         blurb: "Rotary-wing firepower",           cover: "z-10-fierce-thunderbolt/1.jpg" },
  { id: "naval",       name: "Naval & Carriers",    blurb: "Command the seas",                cover: "liaoning-cv-16/1.jpg" },
  { id: "armor",       name: "Tanks & Armor",       blurb: "Main battle tanks & APCs",        cover: null, comingSoon: true },
  { id: "space",       name: "Space & Satellites",  blurb: "Orbital hardware in miniature",   cover: null, comingSoon: true }
];

window.PRODUCTS = [
  {
    id: "j-20-mighty-dragon",
    name: "J-20 Mighty Dragon",
    subtitle: "Chengdu J-20 · 5th-Gen Stealth Fighter",
    category: "fighters", origin: "China", era: "Modern",
    price: 5999, compareAt: null, scale: null, build: "display", stock: 8, images: 9, featured: true,
    badge: "Bestseller",
    description:
      "China's premier stealth air-superiority fighter, captured with its distinctive canard-delta planform, canted twin tails and dark low-observable finish. Shown in-flight on a sculpted stand or wheels-down on its deployed landing gear.",
    features: ["Canard-delta stealth airframe", "Deployable landing gear", "Branded display stand (歼-20)", "Crisp national insignia & panel lines"]
  },
  {
    id: "su-57-felon",
    name: "Su-57 Felon",
    subtitle: "Sukhoi Su-57 · Russian Stealth Fighter",
    category: "fighters", origin: "Russia", era: "Modern",
    price: 5999, compareAt: null, scale: null, build: "display", stock: 6, images: 7, featured: true,
    badge: null,
    description:
      "Russia's fifth-generation multirole fighter in its striking pixel-digital splinter camouflage. Every angle shows off the wide lifting-body fuselage, widely spaced engines and all-moving tails.",
    features: ["Digital splinter camouflage", "Separated twin-engine nacelles", "Swept stand + flat-display gear", "Red-star markings"]
  },
  {
    id: "f-22-raptor",
    name: "F-22 Raptor",
    subtitle: "Lockheed Martin F-22 · Air Dominance Fighter",
    category: "fighters", origin: "USA", era: "Modern",
    price: 5999, compareAt: 6999, scale: null, build: "display", stock: 7, images: 5, featured: true,
    badge: "Sale",
    description:
      "The benchmark of air dominance. This Raptor features an open side weapons bay with missile detail, two-tone stealth grey camouflage and a clear bubble canopy — the definitive desk piece for any aviation fan.",
    features: ["Open weapons-bay detail", "Two-tone stealth grey scheme", "Clear canopy with cockpit detail", "Curved display stand"]
  },
  {
    id: "f-35c-lightning-ii",
    name: "F-35C Lightning II",
    subtitle: "Lockheed Martin F-35C · Carrier Variant",
    category: "fighters", origin: "USA", era: "Modern",
    price: 5499, compareAt: null, scale: null, build: "display", stock: 9, images: 6, featured: true,
    badge: null,
    description:
      "The naval variant of the Joint Strike Fighter with its larger carrier wings, red-trimmed squadron tail art and an under-wing weapons load-out. Display it in flight on the stand or parked on its gear.",
    features: ["Squadron tail markings", "Under-wing stores", "Landing gear for parked display", "Stand engraved “F-35C”"]
  },
  {
    id: "f-14-tomcat",
    name: "F-14 Tomcat “Jolly Rogers”",
    subtitle: "Grumman F-14 · Swing-Wing Interceptor",
    category: "fighters", origin: "USA", era: "Cold War",
    price: 6499, compareAt: null, scale: "1:144", build: "display", stock: 5, images: 6, featured: true,
    badge: "Movable wings",
    description:
      "Top Gun royalty. The iconic Tomcat in the famous skull-and-crossbones Jolly Rogers livery — with variable-sweep wings you can set fully forward, mid or swept back, just like the real jet.",
    features: ["Variable-sweep (movable) wings", "Jolly Rogers skull & crossbones tail", "Detailed underside & weapons stations", "Stand engraved “F-14 Tomcat 1/144 Scale”"]
  },
  {
    id: "f-16-thunderbirds",
    name: "F-16 Thunderbirds",
    subtitle: "F-16 Fighting Falcon · USAF Demo Team",
    category: "fighters", origin: "USA", era: "Modern",
    price: 4999, compareAt: null, scale: "1:100", build: "display", stock: 10, images: 4, featured: false,
    badge: null,
    description:
      "The USAF Thunderbirds' red, white and blue Viper — one of the most recognisable paint schemes in the world, with the eagle belly art and bold USAF lettering reproduced cleanly.",
    features: ["Official-style Thunderbirds livery", "Belly eagle artwork", "Stand engraved “F-16 Fighting Falcon 1/100 Scale”", "Tilted in-flight pose"]
  },
  {
    id: "f-16-black-viper",
    name: "F-16 Black Viper",
    subtitle: "F-16 Fighting Falcon · Special Scheme",
    category: "fighters", origin: "USA", era: "Modern",
    price: 4999, compareAt: null, scale: null, build: "display", stock: 6, images: 3, featured: false,
    badge: null,
    description:
      "A menacing all-black Fighting Falcon with red pinstripe detailing. Fully armed with wingtip and under-wing missiles — a bold contrast piece for any collection.",
    features: ["Gloss-black special livery", "Red accent pinstripes", "Wingtip & pylon missiles", "Curved display stand"]
  },
  {
    id: "j-10-vigorous-dragon",
    name: "J-10 Vigorous Dragon",
    subtitle: "Chengdu J-10 · Multirole Fighter",
    category: "fighters", origin: "China", era: "Modern",
    price: 5499, compareAt: null, scale: null, build: "display", stock: 8, images: 4, featured: false,
    badge: null,
    description:
      "The agile canard-delta J-10 in air-superiority grey, loaded with a full set of air-to-air missiles across its pylons. Detailed landing gear and a sleek curved stand included.",
    features: ["Fully loaded missile pylons", "Canard-delta configuration", "Detailed landing gear", "Curved display stand"]
  },
  {
    id: "j-10-camo",
    name: "J-10 Camouflage Edition",
    subtitle: "Chengdu J-10 · Desert-Splinter Camo",
    category: "fighters", origin: "China", era: "Modern",
    price: 5999, compareAt: null, scale: null, build: "display", stock: 4, images: 3, featured: false,
    badge: "Limited",
    description:
      "A premium J-10 finished in a striking grey-and-tan splinter camouflage, presented on an elegant black round pedestal with gold lettering — made for the executive desk.",
    features: ["Splinter camouflage finish", "Black pedestal with gold lettering", "Slim rod mount", "Gift-ready presentation"]
  },
  {
    id: "sr-71-blackbird",
    name: "SR-71 Blackbird",
    subtitle: "Lockheed SR-71 · Mach 3 Strategic Recon",
    category: "recon", origin: "USA", era: "Cold War",
    price: 6499, compareAt: null, scale: null, build: "display", stock: 5, images: 4, featured: true,
    badge: "Icon",
    description:
      "The fastest air-breathing manned aircraft ever built. This Blackbird captures the long chined fuselage, enormous engine nacelles and matte-black titanium finish that made it a Cold War legend.",
    features: ["Matte black titanium-style finish", "Signature chined fuselage", "Landing gear + display stand", "Red-trim detailing"]
  },
  {
    id: "mq-1-predator",
    name: "MQ-1 Predator",
    subtitle: "General Atomics MQ-1 · Combat UAV",
    category: "recon", origin: "USA", era: "Modern",
    price: 4499, compareAt: null, scale: null, build: "display", stock: 7, images: 3, featured: false,
    badge: null,
    description:
      "The drone that changed modern warfare. Long glider-like wings, inverted-V tail, pusher propeller and under-wing Hellfire rails — all reproduced in USAF grey.",
    features: ["Pusher propeller detail", "Under-wing Hellfire rails", "Tail markings", "Stand engraved “MQ-1 Predator”"]
  },
  {
    id: "b-25-mitchell",
    name: "B-25 Mitchell",
    subtitle: "North American B-25 · WWII Medium Bomber",
    category: "warbirds", origin: "USA", era: "WWII",
    price: 7999, compareAt: null, scale: null, build: "display", stock: 4, images: 6, featured: true,
    badge: null,
    description:
      "The twin-engine bomber of Doolittle Raid fame, in olive drab with period US star-and-bar roundels. Twin tails, glazed nose and turret detail make it a showpiece for WWII collectors.",
    features: ["Twin-engine, twin-tail airframe", "Olive drab WWII scheme", "Glazed nose & turret detail", "Landing gear + display stand"]
  },
  {
    id: "p-51d-mustang",
    name: "P-51D Mustang “Old Crow”",
    subtitle: "North American P-51D · WWII Fighter",
    category: "warbirds", origin: "USA", era: "WWII",
    price: 4499, compareAt: null, scale: "1:72", build: "display", stock: 6, images: 3, featured: false,
    badge: null,
    description:
      "Bud Anderson's famous “Old Crow” — arguably the finest piston fighter of WWII. Olive drab with white ID bands, a red spinner and crisp nose art.",
    features: ["“Old Crow” nose art", "White ID bands & red spinner", "Four-blade propeller", "Stand engraved “P-51D Mustang 1/72 Scale”"]
  },
  {
    id: "uh-60-black-hawk",
    name: "UH-60 Black Hawk",
    subtitle: "Sikorsky UH-60 · Utility Helicopter",
    category: "helicopters", origin: "USA", era: "Modern",
    price: 7499, compareAt: null, scale: null, build: "display", stock: 5, images: 4, featured: true,
    badge: null,
    description:
      "The legendary US Army workhorse in olive drab, with open cabin doors revealing crew seats, high-visibility orange window panels and a four-blade main rotor.",
    features: ["Open cabin with interior detail", "Four-blade main rotor", "US Army markings", "Display stand + wheeled gear"]
  },
  {
    id: "z-10-fierce-thunderbolt",
    name: "Z-10 Fierce Thunderbolt",
    subtitle: "CAIC Z-10 · Attack Helicopter",
    category: "helicopters", origin: "China", era: "Modern",
    price: 6999, compareAt: null, scale: null, build: "display", stock: 5, images: 5, featured: false,
    badge: null,
    description:
      "A purpose-built gunship with tandem stepped cockpit, chin cannon and stub wings bristling with rocket pods and anti-tank missiles. Dark green camouflage with fine stencilling.",
    features: ["Tandem stepped cockpit", "Rocket pods & ATGM rails", "Chin-mounted cannon", "Stand or wheeled display"]
  },
  {
    id: "z-19-black-whirlwind",
    name: "Z-19 Black Whirlwind",
    subtitle: "Harbin Z-19 · Armed Reconnaissance Helicopter",
    category: "helicopters", origin: "China", era: "Modern",
    price: 6499, compareAt: null, scale: null, build: "display", stock: 4, images: 3, featured: false,
    badge: null,
    description:
      "A slender recon-attack helicopter with fenestron tail and stub-wing rocket pods, finished in a three-tone woodland camouflage. Compact, aggressive and beautifully detailed.",
    features: ["Woodland camouflage", "Enclosed fenestron tail rotor", "Stub wings with rocket pods", "Curved display stand"]
  },
  {
    id: "liaoning-cv-16",
    name: "Liaoning CV-16 Aircraft Carrier",
    subtitle: "PLAN Type 001 · Carrier with Air Wing",
    category: "naval", origin: "China", era: "Modern",
    price: 24999, compareAt: null, scale: null, build: "display", stock: 2, images: 6, featured: true,
    badge: "Flagship",
    description:
      "Our flagship piece. The full carrier with a complete air wing of J-15 fighters and helicopters spotted across a fully marked flight deck and ski-jump bow. Supplied on a branded blue base inside a clear acrylic display case.",
    features: ["Complete deck air wing (fighters + helicopters)", "Detailed island & ski-jump bow", "Clear acrylic display case", "Branded presentation base"]
  }
];
