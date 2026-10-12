import type { Product, Category, StoryItem } from '../types';

export const products: Product[] = [
  {
    id: 'studio-desk-mat-pro',
    name: 'AXELO Studio Desk Mat Pro',
    category: 'desk-mats',
    categoryLabel: 'Desk Mat',
    tagline: 'Dual-surface precision mat with magnetic cable anchor',
    description: 'Designed as the foundational layer for high-focus desks. Crafted from high-density Merino wool felt backed with pebble-grain vegan leather. Features an integrated neodymium magnetic anchor for zero-slip cable docking.',
    price: 68,
    originalPrice: 84,
    rating: 4.9,
    ratingCount: 142,
    badge: 'Flagship Essential',
    isNew: false,
    isFeatured: true,
    colors: [
      { name: 'Onyx Black', hex: '#1C1C1E', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Slate Gray', hex: '#4A4D52', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Electric Cobalt', hex: '#0052FF', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85',
    specs: [
      { label: 'Dimensions', value: '900 × 400 × 4 mm' },
      { label: 'Material', value: 'Recycled Wool Felt & Vegan Leather' },
      { label: 'Coating', value: 'Hydrophobic Nanotech Shield' },
      { label: 'Base', value: 'Non-Slip Hexagonal Silicone Mesh' }
    ],
    details: [
      'Dual-texture reversibility for changing seasons or workflows',
      'Integrated hidden magnetic channel for AXELO cable guides',
      'Ultra-dense precision stitched edge prevents peeling and fraying',
      'Micro-textured tracking surface tested with optical 26,000 DPI sensors'
    ]
  },
  {
    id: 'apex-75-keyboard',
    name: 'AXELO Apex 75 Mechanical Keyboard',
    category: 'keyboards',
    categoryLabel: 'Mechanical Keyboard',
    tagline: 'Gasket-mounted CNC aluminum chassis with tactile acoustics',
    description: 'An acoustic-tuned 75% mechanical keyboard designed for coders and writers. Features hot-swappable tactile switches, double-shot PBT keycaps with crisp legends, and ultra-low latency wireless Tri-Mode connectivity.',
    price: 189,
    originalPrice: 219,
    rating: 5.0,
    ratingCount: 98,
    badge: 'Acoustic Tuned',
    isNew: true,
    isFeatured: true,
    colors: [
      { name: 'Matte Charcoal', hex: '#1F2023', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Anodized Silver', hex: '#D2D4D8', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=1200&q=85' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85',
    specs: [
      { label: 'Layout', value: '75% Compact (82 Keys + Rotary Dial)' },
      { label: 'Chassis', value: '6063 Anodized CNC Aluminum' },
      { label: 'Connectivity', value: '2.4GHz / Bluetooth 5.3 / USB-C' },
      { label: 'Battery Life', value: 'Up to 240 Hours (RGB Off)' }
    ],
    details: [
      'Poron multi-layer sound dampening with IXPE switch pads for a deep, thocky sound profile',
      'Hot-swappable 5-pin PCB supports all MX-style switches without soldering',
      'Rotary encoder dial for tactile media & zoom controls',
      'Compatible with macOS, Windows, Linux, and iOS'
    ]
  },
  {
    id: 'contour-wireless-mouse',
    name: 'AXELO Contour Wireless Precision Mouse',
    category: 'mice',
    categoryLabel: 'Precision Mouse',
    tagline: 'Ultralight 58g ergonomic form with dual sensor modes',
    description: 'Sculpted to eliminate wrist fatigue during 12-hour engineering and design sessions. Boasts the PixArt 3395 flagship sensor, instant-response optical switches, and zero-drag pure PTFE glide skates.',
    price: 89,
    originalPrice: 105,
    rating: 4.8,
    ratingCount: 76,
    badge: 'Ultralight 58g',
    isNew: true,
    isFeatured: true,
    colors: [
      { name: 'Stealth Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Lunar White', hex: '#EBEBEB', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85',
    specs: [
      { label: 'Sensor', value: 'PixArt PAW3395 (26,000 DPI, 650 IPS)' },
      { label: 'Weight', value: '58 grams' },
      { label: 'Polling Rate', value: 'True 4000Hz Wireless' },
      { label: 'Switches', value: 'Optical Huano 80M clicks' }
    ],
    details: [
      'Ergonomic asymmetry tailored for palm and claw grips',
      'Sub-1ms wireless latency with custom Nordic RF transceiver',
      'Rapid USB-C fast charge: 15 minutes provides 35 hours of usage',
      'Onboard memory profiles for DPI, lift-off distance, and custom macros'
    ]
  },
  {
    id: 'modular-desk-shelf',
    name: 'AXELO Modular Aluminum Desk Shelf',
    category: 'organization',
    categoryLabel: 'Desk Organization',
    tagline: 'Architectural monitor riser with modular under-deck storage',
    description: 'Elevates dual displays or an ultra-wide monitor to ergonomic eye level while reclaiming 60% of lost desk real estate. Solid extruded aluminum profile with dark American walnut accent blocks.',
    price: 139,
    originalPrice: 165,
    rating: 4.9,
    ratingCount: 114,
    badge: 'Structural Craft',
    isNew: false,
    isFeatured: true,
    colors: [
      { name: 'Matte Black / Walnut', hex: '#171717', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Raw Aluminum / Oak', hex: '#D6D6D6', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85',
    specs: [
      { label: 'Weight Capacity', value: '60 kg (Supports 2x 32" screens)' },
      { label: 'Dimensions', value: '1100 × 240 × 115 mm' },
      { label: 'Structure', value: 'Aircraft-grade 6061 Extruded Aluminum' },
      { label: 'Finish', value: 'Bead-blasted anodized anti-scratch' }
    ],
    details: [
      'Continuous underside magnetic slot for dock, hub, and cable mounting',
      'Soft felt-lined slide tray for pens, notebooks, and hardware tokens',
      'Integrated rear cable pass-through channel',
      'Solid non-slip silicone feet protect desk finishes'
    ]
  },
  {
    id: 'magnetic-cable-kit',
    name: 'AXELO Magnetic Cable Routing System',
    category: 'organization',
    categoryLabel: 'Cable Management',
    tagline: 'Precision weighted anchors with snapping magnetic collars',
    description: 'Eliminates dropped cables, tangled adapters, and chaotic desk edges. Set of four CNC-machined steel weighted anchors with snap-fit silicone cable collars.',
    price: 36,
    originalPrice: 45,
    rating: 4.9,
    ratingCount: 204,
    badge: 'Best Seller',
    isNew: false,
    isFeatured: false,
    colors: [
      { name: 'Space Gray', hex: '#2C2D30', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Pure Silver', hex: '#E5E7EB', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85',
    specs: [
      { label: 'Pack Quantity', value: '4 Magnetic Anchors + 6 Collars' },
      { label: 'Cable Compatibility', value: '2.5mm to 6.5mm diameter' },
      { label: 'Base Weight', value: '110g per solid anchor' },
      { label: 'Magnet', value: 'N52 Neodymium rare-earth core' }
    ],
    details: [
      'Heavy weighted core stays in place without sticky adhesive residues',
      'Micro-suction silicone base can be repositioned infinitely',
      'Universal collars fit Thunderbolt, USB-C, Braided, and MagSafe cords',
      'Color-matched to the AXELO Studio Desk Mat Pro magnetic channel'
    ]
  },
  {
    id: 'studio-numpad-dial',
    name: 'AXELO Dial & Macropad Studio',
    category: 'keyboards',
    categoryLabel: 'Creator Hardware',
    tagline: 'Programmable rotary dial with 9 hot-swap mechanical keys',
    description: 'Fine-tuned scrub control for timelines, audio gain, CAD navigation, and developer macros. Solid solid-block brass weight encased in matte anodized aluminum.',
    price: 74,
    originalPrice: 89,
    rating: 4.8,
    ratingCount: 52,
    badge: 'Creator Tool',
    isNew: true,
    isFeatured: false,
    colors: [
      { name: 'Midnight Charcoal', hex: '#18191B', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Electric Cobalt Ring', hex: '#0052FF', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=85' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=85',
    specs: [
      { label: 'Knob Encoder', value: 'Alps Stepped / Smooth Click Switchable' },
      { label: 'Firmware', value: 'QMK & VIA Open Source Support' },
      { label: 'Illumination', value: 'Per-key south-facing white LED' },
      { label: 'Weight', value: '380g weighted desktop stay' }
    ],
    details: [
      'Instant toggle between scrubbing, scroll, brush sizing, and volume',
      'Full layer mapping via browser-based configurator without installs',
      'Tactile stepped detents or smooth cinematic free-spin',
      'Matches the height profile of the AXELO Apex 75 keyboard'
    ]
  }
];

export const categories: Category[] = [
  {
    id: 'desk-mats',
    title: 'Desk Mats & Surfaces',
    subtitle: 'Tactile foundation',
    description: 'Precision wool felt and micro-grain leather pads engineered for effortless gliding and acoustic dampening.',
    count: 6,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=85',
    featured: true
  },
  {
    id: 'keyboards',
    title: 'Keyboards & Dials',
    subtitle: 'Haptic feedback',
    description: 'Acoustically tuned gasket-mounted mechanical keyboards and precision rotary controllers.',
    count: 4,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=85',
    featured: false
  },
  {
    id: 'mice',
    title: 'Precision Mice',
    subtitle: 'Ergonomic speed',
    description: 'Sub-60g ultralight wireless peripherals with pixel-perfect tracking for work and high-dexterity tasks.',
    count: 3,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=85',
    featured: false
  },
  {
    id: 'organization',
    title: 'Desk Organization',
    subtitle: 'Zero clutter',
    description: 'Architectural aluminum shelves, magnetic cable routes, and weighted device risers.',
    count: 8,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=85',
    featured: false
  }
];

export const stories: StoryItem[] = [
  {
    id: 'anatomy-of-focus',
    eyebrow: 'EDITORIAL ESSAY — 01',
    title: 'The Architecture of an Uncluttered Mind',
    summary: 'Why intentional tactile friction, acoustic dampening, and clean visual horizons produce measurably deeper flow states for developers and designers.',
    quote: 'When your setup holds nothing extraneous, every gesture becomes intentional.',
    author: 'AXELO Industrial Design Lab',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[16/10]'
  },
  {
    id: 'materials-first',
    eyebrow: 'CRAFT & MATERIALS — 02',
    title: 'From Aircraft 6063 Aluminum to High-Density Felt',
    summary: 'We discard synthetic coatings that degrade after six months. Explore the raw material choices behind AXELO hardware.',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/3]'
  }
];

export const trustPoints = [
  {
    number: '01',
    title: 'Engineered Precision',
    description: 'Tolerances measured in microns. Every chamfer, magnetic snap, and switch stem undergoes rigorous acoustic and mechanical calibration.'
  },
  {
    number: '02',
    title: 'Architectural Simplicity',
    description: 'Zero loud logos, zero unnecessary RGB clutter. Quiet physical tools designed to recede into your room and amplify your focus.'
  },
  {
    number: '03',
    title: 'Enduring Materiality',
    description: 'Machined 6063 aerospace aluminum, genuine Merino wool felt, and pebble vegan leather that patinas gracefully with daily touch.'
  },
  {
    number: '04',
    title: 'Tested by Builders',
    description: 'Field-tested in software engineering studios, industrial design workshops, and remote creative workstations worldwide.'
  }
];
