import { queryOne, execute } from './db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export async function seedDatabase() {
  console.log('Seeding MySQL database with live Dori Handcrafts catalog...');

  try {
    // Check if categories exist
    const existing = await queryOne('SELECT COUNT(*) as count FROM categories');
    if (existing && existing.count > 0) {
      console.log('Database already seeded.');
      return;
    }

    // 1. Create Admin & Customer Users
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const adminId = crypto.randomUUID();
    const userId = crypto.randomUUID();

    await execute(
      `INSERT INTO users (id, email, password, name, role, phone)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [adminId, 'admin@dorihandcrafts.com', adminPassword, 'Dori Handcrafts Admin', 'ADMIN', '+91 9876543210']
    );

    await execute(
      `INSERT INTO users (id, email, password, name, role, phone)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, 'customer@example.com', userPassword, 'Aarav Sharma', 'USER', '+91 9812345678']
    );

    // 2. Insert Categories
    const categoriesData = [
  {
    "name": "Handbags",
    "slug": "handbags",
    "description": "Premium handcrafted handbags by Dori Handcrafts artisans.",
    "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0b85b839-9895-4d6f-aa75-6856e3ac8d11.png?v=1786098129"
  },
  {
    "name": "Wall hanging shelf",
    "slug": "wall-hanging-shelf",
    "description": "Premium handcrafted wall hanging shelf by Dori Handcrafts artisans.",
    "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_47738342-b756-4369-8939-05420cd0455f.png?v=1782630910"
  },
  {
    "name": "Hanging Lights",
    "slug": "hanging-lights",
    "description": "Premium handcrafted hanging lights by Dori Handcrafts artisans.",
    "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_529b1fed-29ad-467a-bcf0-331d1312be27.png?v=1781882551"
  },
  {
    "name": "Crochet toy",
    "slug": "crochet-toy",
    "description": "Premium handcrafted crochet toy by Dori Handcrafts artisans.",
    "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_21a9190d-dfe0-4d73-98b3-2fc59310c213.png?v=1781371820"
  },
  {
    "name": "Storage",
    "slug": "storage",
    "description": "Premium handcrafted storage by Dori Handcrafts artisans.",
    "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_11bbb51b-159a-46bb-bd72-34d79781935c.png?v=1779902854"
  },
  {
    "name": "Tent",
    "slug": "tent",
    "description": "Premium handcrafted tent by Dori Handcrafts artisans.",
    "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/front-1.jpg?v=1779297396"
  },
  {
    "name": "Swing",
    "slug": "swing",
    "description": "Premium handcrafted swing by Dori Handcrafts artisans.",
    "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0f0a9742-15fd-4d29-a180-548f01275699.png?v=1779256152"
  },
  {
    "name": "Wall hanging",
    "slug": "wall-hanging",
    "description": "Premium handcrafted wall hanging by Dori Handcrafts artisans.",
    "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_d2b9b6da-9fc7-4d90-b73f-6f168c93205f.png?v=1778545712"
  },
  {
    "name": "Table runner",
    "slug": "table-runner",
    "description": "Premium handcrafted table runner by Dori Handcrafts artisans.",
    "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_12cbf869-8f48-424e-b143-da9108cd6762.png?v=1778509488"
  },
  {
    "name": "Cushion cover",
    "slug": "cushion-cover",
    "description": "Premium handcrafted cushion cover by Dori Handcrafts artisans.",
    "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_b79d9d53-41af-4f45-b00b-3a24c449b0f4.png?v=1778507880"
  }
];
    const createdCategories: Record<string, string> = {};

    for (const cat of categoriesData) {
      const catId = crypto.randomUUID();
      await execute(
        `INSERT INTO categories (id, name, slug, description, image)
         VALUES (?, ?, ?, ?, ?)`,
        [catId, cat.name, cat.slug, cat.description, cat.image]
      );
      createdCategories[cat.slug] = catId;
    }

    // 3. Load & Insert Products
    const productsData = [
  {
    "id": "9422310310140",
    "title": "Aveline Handbag",
    "slug": "aveline-handbag",
    "description": "<p class=\"PDq2pG_selectionAnchorContainer\">Elevate your everyday style with the <strong>Aveline Woven Sling Bag</strong> by <strong>Dori Handcrafts</strong>. Thoughtfully handcrafted using premium T-shirt yarn, this statement piece showcases an elegant woven design that blends timeless craftsmanship with modern sophistication. Every bag is meticulously handmade by skilled women artisans, making each piece truly unique.<span class=\"PDq2pG_selectionAnchor\"></span></p>\n<p>Designed for both style and functionality, the Aveline features a spacious interior for your daily essentials, a premium gold-tone chain strap, and a detachable handcrafted tassel that adds a refined finishing touch. Whether you're heading to brunch, a party, a vacation, or an evening out, this versatile sling effortlessly complements both ethnic and western outfits.</p>\n<h3><span role=\"text\"><strong>Key Features</strong></span></h3>\n<ul>\n<li>✨ 100% Handcrafted by Skilled Women Artisans</li>\n<li>🧶 Premium Soft T-Shirt Yarn Construction</li>\n<li>👜 Elegant Handwoven Design</li>\n<li>🔗 Luxury Gold-Tone Chain Strap</li>\n<li>🎀 Detachable Handmade Tassel</li>\n<li>📱 Spacious Enough for Phone, Wallet, Keys &amp; Essentials</li>\n<li>🌿 Lightweight, Durable &amp; Comfortable to Carry</li>\n<li>🇮🇳 Proudly Handmade in India</li>\n</ul>\n<p>Carry more than just a handbag—carry a story of craftsmanship, empowerment, and timeless design with <strong>Dori Handcrafts</strong>. Every purchase supports talented women artisans while bringing handcrafted luxury to your wardrobe.</p>",
    "shortDescription": "Aveline Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 1899,
    "compareAtPrice": 2399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9422310310140",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "clutch bag",
      "crochet",
      "dori handcrafts",
      "fashion",
      "handbag",
      "handbags",
      "handmade",
      "mettalic bag"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0b85b839-9895-4d6f-aa75-6856e3ac8d11.png?v=1786098129",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_bf4789d3-5e08-452c-a4e0-7fd83a77658c.png?v=1786099103",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_d9232339-b291-4c1b-8cb8-43a6e1bcbbe1.png?v=1786099054",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_d0a09499-64c0-4425-8891-ab5805dbeb41.png?v=1786098742",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_0dddbf78-ab2e-4f75-8fa4-a74629f89e3b.png?v=1786099070"
    ],
    "variants": [
      {
        "id": "50928516628732",
        "name": "Green",
        "price": 1899,
        "compareAtPrice": 2399,
        "optionName": "Color",
        "optionValue": "Green",
        "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0b85b839-9895-4d6f-aa75-6856e3ac8d11.png?v=1786098129"
      },
      {
        "id": "50928512336124",
        "name": "Pink",
        "price": 1899,
        "compareAtPrice": 2399,
        "optionName": "Color",
        "optionValue": "Pink",
        "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_bf4789d3-5e08-452c-a4e0-7fd83a77658c.png?v=1786099103"
      },
      {
        "id": "50928512368892",
        "name": "Purple",
        "price": 1899,
        "compareAtPrice": 2399,
        "optionName": "Color",
        "optionValue": "Purple",
        "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_d9232339-b291-4c1b-8cb8-43a6e1bcbbe1.png?v=1786099054"
      },
      {
        "id": "50928512401660",
        "name": "Navy",
        "price": 1899,
        "compareAtPrice": 2399,
        "optionName": "Color",
        "optionValue": "Navy",
        "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_d0a09499-64c0-4425-8891-ab5805dbeb41.png?v=1786098742"
      },
      {
        "id": "50928512434428",
        "name": "Black",
        "price": 1899,
        "compareAtPrice": 2399,
        "optionName": "Color",
        "optionValue": "Black",
        "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_0dddbf78-ab2e-4f75-8fa4-a74629f89e3b.png?v=1786099070"
      }
    ]
  },
  {
    "id": "9420455805180",
    "title": "Rainbow Lotus Tote",
    "slug": "rainbow-lotus-tote",
    "description": "<p class=\"PDq2pG_selectionAnchorContainer\">Inspired by the elegance of a blooming lotus, the <strong>Rainbow Lotus Tote</strong> is beautifully handcrafted using premium-quality yarn in a soft pastel palette. Its unique crochet design, spacious interior, and elegant gold-tone chain make it the perfect blend of style and functionality.<span class=\"PDq2pG_selectionAnchor\"></span></p>\n<p>Whether you're heading to a brunch, festive celebration, vacation, or evening outing, this statement handbag effortlessly complements both ethnic and western outfits. Carefully handcrafted by skilled women artisans, every bag reflects exceptional craftsmanship and timeless elegance.</p>\n<h3>Product Dimensions</h3>\n<div class=\"TyagGW_tableContainer\">\n<div class=\"group TyagGW_tableWrapper flex flex-col-reverse w-fit\" tabindex=\"-1\">\n<table class=\"w-fit min-w-(--thread-content-width)\">\n<thead>\n<tr>\n<th class=\"last:pe-10\"><strong>Dimension</strong></th>\n<th class=\"last:pe-10\"><strong>Size</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Length</strong></td>\n<td><strong>14 in (35.6 cm)</strong></td>\n</tr>\n<tr>\n<td><strong>Height</strong></td>\n<td><strong>8 in (20.3 cm)</strong></td>\n</tr>\n<tr>\n<td><strong>Width</strong></td>\n<td><strong>3 in (7.6 cm)</strong></td>\n</tr>\n</tbody>\n</table>\n</div>\n</div>",
    "shortDescription": "Rainbow Lotus Tote - Handcrafted luxury by Dori Handcrafts",
    "price": 3799,
    "compareAtPrice": 4499,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9420455805180",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "crochet",
      "dori handcrafts",
      "handbag",
      "handbags",
      "handmade",
      "macrame"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_fd7838b2-f9f0-4bf9-a055-d415ec81c407.png?v=1785945097",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_27de91a3-bd3c-423a-bdb7-036d5a717d03.png?v=1785945097",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_4c3735b7-d828-4e8f-8794-b3a5b36a8b36.png?v=1785945097",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_3eaa3ad4-1e9d-4f03-a650-8ab258317a19.png?v=1785945097",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_fed697a6-89ef-4097-b59c-e566990ea4b7.png?v=1785945097"
    ],
    "variants": [
      {
        "id": "50921758949628",
        "name": "Default Title",
        "price": 3799,
        "compareAtPrice": 4499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9368592548092",
    "title": "Golden Drape Shelf",
    "slug": "golden-drape-shelf",
    "description": "<h3><strong>Product Description</strong></h3>\n<p>Enhance your walls with the <strong>Gold Drape</strong><strong> Macrame Wall Hanging Shelf</strong>, handcrafted from premium cotton rope and a sturdy pine wood shelf. Designed to combine elegant boho aesthetics with practical storage, it's perfect for displaying plants, candles, books, or decorative accents while adding warmth and texture to your living space.</p>\n<h3><strong>Product Specifications</strong></h3>\n<table>\n<thead>\n<tr>\n<th><strong>Specification</strong></th>\n<th><strong>Details</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>White with Yellow</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Rectangular</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>18 × 30 × 5 Inches (W × H × D)</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Premium Cotton Rope with Pine Wood</td>\n</tr>\n<tr>\n<td><strong>Usage</strong></td>\n<td>Wall Decoration with Storage</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>1 Piece</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Golden Drape Shelf - Handcrafted luxury by Dori Handcrafts",
    "price": 1999,
    "compareAtPrice": 2499,
    "categorySlug": "wall-hanging-shelf",
    "categoryName": "wall hanging shelf",
    "SKU": "DORI-9368592548092",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "shelf",
      "wall hanging shelf"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_47738342-b756-4369-8939-05420cd0455f.png?v=1782630910",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_2f91fda0-f126-43af-a212-f1258aa70e9a.png?v=1782630910",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_827a9f5e-704c-4cd5-9350-662620e7f3f6.png?v=1782630910",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_b746aaae-9f22-4f7c-9a54-836dccc96ff3.png?v=1782630910"
    ],
    "variants": [
      {
        "id": "49231282962684",
        "name": "Default Title",
        "price": 1999,
        "compareAtPrice": 2499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9362599575804",
    "title": "Boho Crest Chandelier",
    "slug": "boho-crest-chandelier",
    "description": "<h1>Boho Crest Chandelier</h1>\n<p>Transform your interiors with the timeless charm of the <strong>Boho Crest Chandelier</strong>, a handcrafted macrame lighting piece designed to bring warmth, texture, and elegance to any space. Expertly woven using premium cotton rope over a sturdy iron frame, this chandelier showcases intricate knotwork and flowing tassels that embody the essence of modern bohemian décor.</p>\n<p>Its soft off-white tone blends effortlessly with contemporary, Scandinavian, coastal, rustic, and boho-inspired interiors. Whether suspended above a dining table, reading nook, bedroom, café, resort, or living room, the Boho Crest Chandelier creates a cozy and inviting ambiance while serving as a stunning statement piece.</p>\n<p>Each chandelier is carefully handcrafted by skilled artisans, making every piece unique and celebrating the beauty of traditional craftsmanship.</p>\n<h2>Product Specifications</h2>\n<table>\n<thead>\n<tr>\n<th>Attribute</th>\n<th>Details</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Product Name</strong></td>\n<td>Boho Crest Chandelier</td>\n</tr>\n<tr>\n<td><strong>Color</strong></td>\n<td>Off-White</td>\n</tr>\n<tr>\n<td><strong>Diameter</strong></td>\n<td>12 Inches</td>\n</tr>\n<tr>\n<td><strong>Height</strong></td>\n<td>30 Inches</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Iron Frame</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Round</td>\n</tr>\n<tr>\n<td><strong>Usage</strong></td>\n<td>Decorative</td>\n</tr>\n<tr>\n<td><strong>Weight</strong></td>\n<td>0.5 kg</td>\n</tr>\n</tbody>\n</table>\n<h2></h2>\n<h2>Key Features</h2>\n<p>✓ Handcrafted macrame design with intricate knot detailing<br>✓ Premium cotton rope woven over a durable iron frame<br>✓ Elegant off-white finish complements various interior styles<br>✓ Lightweight yet sturdy construction<br>✓ Creates a warm and inviting decorative accent<br>✓ Perfect for living rooms, bedrooms, cafés, resorts, restaurants, and creative spaces<br>✓ Handmade by skilled artisans with exceptional attention to detail</p>\n<p><strong>Care Instructions:</strong> Dust gently with a soft dry cloth or feather duster. Keep away from excessive moisture to preserve its beauty and longevity.</p>\n<p><strong>Customization Available:</strong> Contact Dori Handcrafts for custom sizes and designs tailored to your space.</p>",
    "shortDescription": "Boho Crest Chandelier - Handcrafted luxury by Dori Handcrafts",
    "price": 1999,
    "compareAtPrice": 2499,
    "categorySlug": "hanging-lights",
    "categoryName": "hanging Lights",
    "SKU": "DORI-9362599575804",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "boho",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "hanging lamp",
      "jute",
      "lights",
      "macrame"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_529b1fed-29ad-467a-bcf0-331d1312be27.png?v=1781882551",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_c0d1c731-2ecc-41b2-936e-6c71baab615f.png?v=1781882551",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_ecb3f132-7eb5-476b-80df-6ed3c8312ec1.png?v=1781882551",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_716ae40e-e08c-404b-9a38-cfe83cb6945e.png?v=1781882551",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_2e614898-e0a9-4986-9bd0-b50d7baa45f8.png?v=1781882551"
    ],
    "variants": [
      {
        "id": "49211590050044",
        "name": "Default Title",
        "price": 1999,
        "compareAtPrice": 2499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9360820764924",
    "title": "Dori Ivory Fringe Chandelier",
    "slug": "dori-ivory-fringe-chandelier",
    "description": "<p>Elevate your interiors with the timeless beauty of the Dori Aarna Macrame Chandelier. Handcrafted by skilled artisans using traditional macrame knotting techniques, this elegant pendant light combines intricate craftsmanship with contemporary bohemian design. Made from premium cotton rope wrapped around a durable iron frame, it creates a soft, textured look that adds warmth and character to any space.</p>\n<p>Whether suspended above a dining table, in a cozy living room, bedroom, café, or reading nook, this handcrafted chandelier serves as both a functional light fixture and a striking decorative statement. Its off-white finish and artisanal detailing blend effortlessly with modern, rustic, boho, and minimalist interiors.</p>\n<table>\n<thead>\n<tr>\n<th>Specification</th>\n<th>Details</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Off-White</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Iron Frame</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Round</td>\n</tr>\n<tr>\n<td><strong>Diameter</strong></td>\n<td>12 Inches</td>\n</tr>\n<tr>\n<td><strong>Height</strong></td>\n<td>24 Inches</td>\n</tr>\n<tr>\n<td><strong>Weight</strong></td>\n<td>Approx. 0.5 kg</td>\n</tr>\n<tr>\n<td><strong>Usage</strong></td>\n<td>Decorative Lighting</td>\n</tr>\n<tr>\n<td><strong>Style</strong></td>\n<td>Handmade • Bohemian • Contemporary</td>\n</tr>\n</tbody>\n</table>\n<p> </p>\n<p><strong>Ideal For:</strong> Living Rooms • Bedrooms • Dining Areas • Cafés • Restaurants • Reading Corners • Boutique Spaces</p>\n<p><em>Each chandelier is individually handcrafted, making every piece unique with slight variations that enhance its authentic handmade appeal.</em></p>",
    "shortDescription": "Dori Ivory Fringe Chandelier - Handcrafted luxury by Dori Handcrafts",
    "price": 1499,
    "compareAtPrice": 2199,
    "categorySlug": "hanging-lights",
    "categoryName": "hanging Lights",
    "SKU": "DORI-9360820764924",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "hanging lamp",
      "jute",
      "lights",
      "macrame"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_4e5289f3-1d8c-44ee-804f-5cc5c3a086d0.png?v=1781629067",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_bc7e3e94-fdbd-43e4-926b-be39a81f292d.png?v=1781629067",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_a4fced01-39f1-48f2-a1c9-56a2471a763b.png?v=1781629067",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_77933f6a-b111-48b8-b7ae-39693fbba97b.png?v=1781629067"
    ],
    "variants": [
      {
        "id": "49205005451516",
        "name": "Default Title",
        "price": 1499,
        "compareAtPrice": 2199,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9360808116476",
    "title": "Aaranya Jute Tassel Chandelier",
    "slug": "aaranya-jute-tassel-chandelier",
    "description": "<p>Add warmth and natural elegance to your space with this handcrafted Macrame Jute Hanging Lamp. Expertly made by skilled artisans using cotton rope and a sturdy iron frame, this decorative lamp brings a timeless bohemian charm to homes, cafés, restaurants, and boutique interiors.</p>\n<table>\n<thead>\n<tr>\n<th>Specification</th>\n<th>Details</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Iron Frame</td>\n</tr>\n<tr>\n<td><strong>Color</strong></td>\n<td>Natural Jute &amp; Ivory</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Round</td>\n</tr>\n<tr>\n<td><strong>Diameter</strong></td>\n<td>16 Inches</td>\n</tr>\n<tr>\n<td><strong>Height</strong></td>\n<td>10 Inches</td>\n</tr>\n<tr>\n<td><strong>Weight</strong></td>\n<td>Approx. 0.5 kg</td>\n</tr>\n<tr>\n<td><strong>Usage</strong></td>\n<td>Decorative Lighting</td>\n</tr>\n<tr>\n<td><strong>Style</strong></td>\n<td>Handmade • Bohemian • Rustic</td>\n</tr>\n</tbody>\n</table>\n<p> </p>\n<p><strong>Each piece is individually handcrafted, making every lamp unique.</strong></p>",
    "shortDescription": "Aaranya Jute Tassel Chandelier - Handcrafted luxury by Dori Handcrafts",
    "price": 2799,
    "compareAtPrice": 3499,
    "categorySlug": "hanging-lights",
    "categoryName": "hanging Lights",
    "SKU": "DORI-9360808116476",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "hanging lamp",
      "jute",
      "lights",
      "macrame"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_875e5994-078c-4ee8-91d5-6a5c9faf16cd.png?v=1781627715",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_cd541624-556f-4777-b489-70d2322835d4.png?v=1781627716",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_8b193534-c45a-4beb-9e6c-9a5c4307e771.png?v=1781627715",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/ChatGPT_Image_Jun_16_2026_09_51_02_PM.png?v=1781629190",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_bdc682ce-963c-466b-a887-2985f39bd7f7.png?v=1781627715"
    ],
    "variants": [
      {
        "id": "49204919599356",
        "name": "Default Title",
        "price": 2799,
        "compareAtPrice": 3499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9358829879548",
    "title": "Gigi the Crochet Giraffe",
    "slug": "gigi-the-crochet-giraffe",
    "description": "<p>Meet <strong>Gigi the Crochet Giraffe™</strong>, a cheerful handmade companion crafted with premium cotton yarn by the skilled women artisans of <strong>Dori Handcrafts</strong>. With her adorable long neck, colorful outfit, and playful personality, Gigi is designed to spark imagination and bring joy to little ones.</p>\n<p>Soft, lightweight, and lovingly handcrafted, Gigi is perfect for cuddles, nursery decor, playtime adventures, baby showers, and thoughtful gifting. Every stitch showcases the beauty of handmade craftsmanship and creates a keepsake to cherish for years.</p>\n<table>\n<thead>\n<tr>\n<th>Feature</th>\n<th>Details</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Product Name</td>\n<td>Gigi the Crochet Giraffe</td>\n</tr>\n<tr>\n<td>Material</td>\n<td>Premium Cotton Yarn</td>\n</tr>\n<tr>\n<td>Height</td>\n<td>Approx. 10 Inches</td>\n</tr>\n<tr>\n<td>Handmade</td>\n<td>100% Handcrafted</td>\n</tr>\n<tr>\n<td>Features</td>\n<td>Soft, Lightweight &amp; Child-Friendly</td>\n</tr>\n<tr>\n<td>Ideal For</td>\n<td>Gifting, Nursery Decor &amp; Playtime</td>\n</tr>\n<tr>\n<td>Brand</td>\n<td>Dori Handcrafts</td>\n</tr>\n<tr>\n<td>Origin</td>\n<td>Handmade in India</td>\n</tr>\n</tbody>\n</table>\n<p><strong>\"A lovable safari friend, handcrafted to inspire smiles, cuddles, and endless adventures.\"</strong> 🦒🧶💛</p>",
    "shortDescription": "Gigi the Crochet Giraffe - Handcrafted luxury by Dori Handcrafts",
    "price": 1799,
    "compareAtPrice": 2499,
    "categorySlug": "crochet-toy",
    "categoryName": "crochet toy",
    "SKU": "DORI-9358829879548",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "baby",
      "baby care",
      "clutch bag",
      "cozy",
      "cradle",
      "crochet",
      "dori handcrafts",
      "handmade",
      "macrame",
      "storage",
      "toys"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_21a9190d-dfe0-4d73-98b3-2fc59310c213.png?v=1781371820",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_2409cf7b-35ae-4a5d-816a-abb68bc57834.png?v=1781371817",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_17f1e115-94a5-428a-adba-57cfe139d969.png?v=1781371817",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_5c254bc9-e9cf-4c24-b33b-a4b0e2df4920.png?v=1781371817",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_7f292ab8-2a5e-4a7f-83ac-72158fd57e06.png?v=1781371817"
    ],
    "variants": [
      {
        "id": "49194676420860",
        "name": "Default Title",
        "price": 1799,
        "compareAtPrice": 2499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9358823489788",
    "title": "Luna the Crochet Bunny",
    "slug": "luna-the-crochet-bunny",
    "description": "<p>Meet <strong>Luna the Crochet Bunny™</strong>, a beautifully handcrafted companion made with premium cotton yarn by the skilled women artisans of <strong>Dori Handcrafts</strong>. With her soft texture, adorable floppy ears, and minimalist design, Luna brings comfort, warmth, and charm to every nursery and playroom.</p>\n<p>Lightweight, child-friendly, and thoughtfully handmade, Luna is perfect for cuddles, imaginative play, baby showers, birthdays, and meaningful gifting. Every stitch reflects the artistry of traditional craftsmanship and the love poured into its creation.</p>\n<table>\n<thead>\n<tr>\n<th>Feature</th>\n<th>Details</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Product Name</td>\n<td>Luna the Crochet Bunny</td>\n</tr>\n<tr>\n<td>Material</td>\n<td>Premium Cotton Yarn</td>\n</tr>\n<tr>\n<td>Height</td>\n<td>Approx. 10 Inches</td>\n</tr>\n<tr>\n<td>Handmade</td>\n<td>100% Handcrafted</td>\n</tr>\n<tr>\n<td>Features</td>\n<td>Soft, Lightweight &amp; Child-Friendly</td>\n</tr>\n<tr>\n<td>Ideal For</td>\n<td>Gifting, Nursery Décor &amp; Playtime</td>\n</tr>\n<tr>\n<td>Brand</td>\n<td>Dori Handcrafts</td>\n</tr>\n<tr>\n<td>Origin</td>\n<td>Handmade in India</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Luna the Crochet Bunny - Handcrafted luxury by Dori Handcrafts",
    "price": 1799,
    "compareAtPrice": 2499,
    "categorySlug": "crochet-toy",
    "categoryName": "crochet toy",
    "SKU": "DORI-9358823489788",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "baby",
      "baby care",
      "clutch bag",
      "cozy",
      "cradle",
      "crochet",
      "dori handcrafts",
      "handmade",
      "macrame",
      "storage",
      "toys"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_9e887dc2-0b90-4719-b34d-0d2326beecd9.png?v=1781371672",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_e020f99d-b310-4ef2-bac9-173b3af12069.png?v=1781371669",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_878a2fe7-ca0d-40a2-abc0-6e0f72f46016.png?v=1781371669",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_05f85ab0-a8b0-4c09-9993-e9ee073c09e4.png?v=1781371669",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_31eae91f-cffe-4096-b8f7-8a3c6ba63228.png?v=1781371669"
    ],
    "variants": [
      {
        "id": "49194662199548",
        "name": "Default Title",
        "price": 1799,
        "compareAtPrice": 2499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9358808318204",
    "title": "Milo the Crochet Cat",
    "slug": "milo-the-crochet-cat",
    "description": "<p>Meet <strong>Milo the Crochet Cat</strong>, a lovable handmade companion crafted with care by the women artisans of <strong>Dori Handcrafts</strong>. Made from premium cotton yarn and detailed with charming handcrafted features, Milo is designed to bring comfort, joy, and endless smiles to little ones.</p>\n<p>Soft, lightweight, and thoughtfully handmade, Milo is perfect for playtime, nursery décor, baby showers, birthdays, and meaningful gifts. Every stitch reflects the beauty of traditional craftsmanship and the love of the artisan who created it.</p>\n<table>\n<thead>\n<tr>\n<th>Feature</th>\n<th>Details</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Product Name</td>\n<td>Milo the Crochet Cat</td>\n</tr>\n<tr>\n<td>Material</td>\n<td>Premium Cotton Yarn</td>\n</tr>\n<tr>\n<td>Height</td>\n<td>Approx. 10 Inches</td>\n</tr>\n<tr>\n<td>Handmade</td>\n<td>100% Handcrafted</td>\n</tr>\n<tr>\n<td>Features</td>\n<td>Soft, Lightweight &amp; Child-Friendly</td>\n</tr>\n<tr>\n<td>Ideal For</td>\n<td>Gifting, Nursery Decor &amp; Playtime</td>\n</tr>\n<tr>\n<td>Brand</td>\n<td>Dori Handcrafts</td>\n</tr>\n<tr>\n<td>Origin</td>\n<td>Handmade in India</td>\n</tr>\n</tbody>\n</table>\n<p><strong>\"More than a toy, Milo is a handmade friend crafted to inspire joy, comfort, and imagination.\"</strong> 🧶🐱💛</p>",
    "shortDescription": "Milo the Crochet Cat - Handcrafted luxury by Dori Handcrafts",
    "price": 1799,
    "compareAtPrice": 2499,
    "categorySlug": "crochet-toy",
    "categoryName": "crochet toy",
    "SKU": "DORI-9358808318204",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "baby",
      "baby care",
      "clutch bag",
      "cozy",
      "cradle",
      "crochet",
      "dori handcrafts",
      "handmade",
      "macrame",
      "storage",
      "toys"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_4db9a13e-fdfe-4c43-9ddb-ec21cf428137.png?v=1781370426",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_3d34dcb2-3d18-45f5-9cb0-f04477d81885.png?v=1781370426",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_d6fd61bf-4754-42d9-8884-d564000ba351.png?v=1781370426",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_a85e2c2d-b800-416d-b715-d919609b394c.png?v=1781370426",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_df96ca70-906c-4c4f-a566-d7a8dba6ebb5.png?v=1781370426"
    ],
    "variants": [
      {
        "id": "49194636706044",
        "name": "Default Title",
        "price": 1799,
        "compareAtPrice": 2499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9350415089916",
    "title": "The Mocha Blossom Handbag",
    "slug": "the-mocha-blossom-handbag",
    "description": "<p data-path-to-node=\"3\">Elevate your ensemble with The Lavender Bloom Satchel, a masterpiece of sustainable luxury. Expertly handcrafted with intricate crochet detailing, this piece seamlessly blends modern elegance with artisanal charm. Adorned with delicate pearls and gold-toned chains, it serves as the ultimate statement accessory for both sophisticated soirées and elevated everyday looks.</p>\n<p data-path-to-node=\"4\"><b data-path-to-node=\"4\" data-index-in-node=\"0\">Artisanal Highlights:</b></p>\n<ul data-path-to-node=\"5\">\n<li>\n<p data-path-to-node=\"5,0,0\"><b data-path-to-node=\"5,0,0\" data-index-in-node=\"0\">Exquisite Craftsmanship:</b> Each bag is meticulously woven using premium, soft-touch yarn.</p>\n</li>\n<li>\n<p data-path-to-node=\"5,1,0\"><b data-path-to-node=\"5,1,0\" data-index-in-node=\"0\">Luxury Accents:</b> Features sophisticated pearl and gold chain embellishments, paired with a signature braided handle.</p>\n</li>\n<li>\n<p data-path-to-node=\"5,2,0\"><b data-path-to-node=\"5,2,0\" data-index-in-node=\"0\">Distinctive Detail:</b> Includes two custom decorative crochet keychains for a unique, feminine touch.</p>\n</li>\n<li>\n<p data-path-to-node=\"5,3,0\"><b data-path-to-node=\"5,3,0\" data-index-in-node=\"0\">Purposeful Design:</b> Lightweight and durable, yet thoughtfully spacious to carry your daily essentials—from phone to evening makeup.</p>\n</li>\n<li>\n<p data-path-to-node=\"5,4,0\"><b data-path-to-node=\"5,4,0\" data-index-in-node=\"0\">Conscious Fashion:</b> A perfect choice for the eco-conscious individual who refuses to compromise on style.</p>\n</li>\n</ul>\n<p data-path-to-node=\"6\"><b data-path-to-node=\"6\" data-index-in-node=\"0\">Style Profile:</b></p>\n<ul data-path-to-node=\"7\">\n<li>\n<p data-path-to-node=\"7,0,0\"><b data-path-to-node=\"7,0,0\" data-index-in-node=\"0\">Category:</b> Editorial Handbag / Luxury Crochet Clutch.</p>\n</li>\n<li>\n<p data-path-to-node=\"7,1,0\"><b data-path-to-node=\"7,1,0\" data-index-in-node=\"0\">Occasion:</b> Ideal for festive celebrations, upscale parties, or adding a chic flair to casual outings.</p>\n</li>\n</ul>\n<p data-path-to-node=\"8\"><i data-path-to-node=\"8\" data-index-in-node=\"0\">A seamless fusion of sustainable artistry and timeless elegance. 💫</i></p>",
    "shortDescription": "The Mocha Blossom Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 2499,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9350415089916",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "dori handcrafts",
      "fashion",
      "handbag",
      "handbags",
      "handmade",
      "jute",
      "macrame",
      "metalic bag",
      "mettalic bag",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_55ef0d3f-83dc-459a-9b66-c08af12af4da.png?v=1780633488",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_831eb0e3-90cf-46ff-ba88-13b427ad936d.png?v=1780633488",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_385c5422-e382-40f6-ad49-40cd23959cfa.png?v=1780633488",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_5bbb9e84-e8b4-41cd-b0c8-3bddb9ee0637.png?v=1780633488",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_71d347a4-38a2-4aa6-b4a8-0a15c2144819.png?v=1780633488"
    ],
    "variants": [
      {
        "id": "49165329334524",
        "name": "Default Title",
        "price": 2499,
        "compareAtPrice": 3399,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9350414598396",
    "title": "Serene Crochet Handbag",
    "slug": "serene-crochet-handbag",
    "description": "<p data-path-to-node=\"3\">Elevate your ensemble with The Lavender Bloom Satchel, a masterpiece of sustainable luxury. Expertly handcrafted with intricate crochet detailing, this piece seamlessly blends modern elegance with artisanal charm. Adorned with delicate pearls and gold-toned chains, it serves as the ultimate statement accessory for both sophisticated soirées and elevated everyday looks.</p>\n<p data-path-to-node=\"4\"><b data-path-to-node=\"4\" data-index-in-node=\"0\">Artisanal Highlights:</b></p>\n<ul data-path-to-node=\"5\">\n<li>\n<p data-path-to-node=\"5,0,0\"><b data-path-to-node=\"5,0,0\" data-index-in-node=\"0\">Exquisite Craftsmanship:</b> Each bag is meticulously woven using premium, soft-touch yarn.</p>\n</li>\n<li>\n<p data-path-to-node=\"5,1,0\"><b data-path-to-node=\"5,1,0\" data-index-in-node=\"0\">Luxury Accents:</b> Features sophisticated pearl and gold chain embellishments, paired with a signature braided handle.</p>\n</li>\n<li>\n<p data-path-to-node=\"5,2,0\"><b data-path-to-node=\"5,2,0\" data-index-in-node=\"0\">Distinctive Detail:</b> Includes two custom decorative crochet keychains for a unique, feminine touch.</p>\n</li>\n<li>\n<p data-path-to-node=\"5,3,0\"><b data-path-to-node=\"5,3,0\" data-index-in-node=\"0\">Purposeful Design:</b> Lightweight and durable, yet thoughtfully spacious to carry your daily essentials—from phone to evening makeup.</p>\n</li>\n<li>\n<p data-path-to-node=\"5,4,0\"><b data-path-to-node=\"5,4,0\" data-index-in-node=\"0\">Conscious Fashion:</b> A perfect choice for the eco-conscious individual who refuses to compromise on style.</p>\n</li>\n</ul>\n<p data-path-to-node=\"6\"><b data-path-to-node=\"6\" data-index-in-node=\"0\">Style Profile:</b></p>\n<ul data-path-to-node=\"7\">\n<li>\n<p data-path-to-node=\"7,0,0\"><b data-path-to-node=\"7,0,0\" data-index-in-node=\"0\">Category:</b> Editorial Handbag / Luxury Crochet Clutch.</p>\n</li>\n<li>\n<p data-path-to-node=\"7,1,0\"><b data-path-to-node=\"7,1,0\" data-index-in-node=\"0\">Occasion:</b> Ideal for festive celebrations, upscale parties, or adding a chic flair to casual outings.</p>\n</li>\n</ul>\n<p data-path-to-node=\"8\"><i data-path-to-node=\"8\" data-index-in-node=\"0\">A seamless fusion of sustainable artistry and timeless elegance. 💫</i></p>",
    "shortDescription": "Serene Crochet Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 2499,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9350414598396",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "dori handcrafts",
      "fashion",
      "handbag",
      "handbags",
      "handmade",
      "jute",
      "macrame",
      "metalic bag",
      "mettalic bag",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_a31b8468-d4c0-422b-93d5-4629911b18ef.png?v=1780632635",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_94f1a82c-7ed6-4f7f-abd2-fa61df5f6566.png?v=1780632635",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_76d16a21-372d-4b51-863a-9a9a931cbc4c.png?v=1780632634",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_3d56c38c-586e-4973-aa49-f1098caf9382.png?v=1780632635",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_df5eec08-6c72-4dc1-81a2-a2fd4cd0b9ab.png?v=1780632634"
    ],
    "variants": [
      {
        "id": "49165327925500",
        "name": "Default Title",
        "price": 2499,
        "compareAtPrice": 3399,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9350118703356",
    "title": "Lilac Bloom Handbag",
    "slug": "lilac-bloom-handbag",
    "description": "<p>Discover the beauty of <strong>handcrafted luxury</strong> with this stunning metallic crochet handbag from <strong>Dori Handcrafts</strong>. Expertly handmade by <strong>skilled rural women artisans</strong>, each piece reflects exceptional craftsmanship, intricate detailing, and timeless elegance. The shimmering metallic weave, premium finish, and graceful tassel accent create a sophisticated accessory that effortlessly complements <strong>festive celebrations, weddings, parties, and special occasions</strong>.</p>\n<p>Designed with both <strong>style and functionality</strong> in mind, it features a <strong>secure turn-lock closure</strong>, a beautifully <strong>handwoven handle</strong>, and a <strong>detachable chain strap</strong> for versatile carrying options. More than just a handbag, every piece is a celebration of <strong>artisan craftsmanship, women empowerment, and conscious luxury</strong>.</p>\n<table>\n<thead>\n<tr>\n<th><strong>Product Details</strong></th>\n<th><strong>Description</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Material</strong></td>\n<td>Premium Metallic Crochet Weave</td>\n</tr>\n<tr>\n<td><strong>Closure</strong></td>\n<td>Secure Turn-Lock Closure</td>\n</tr>\n<tr>\n<td><strong>Strap</strong></td>\n<td>Detachable Chain Strap</td>\n</tr>\n<tr>\n<td><strong>Handle</strong></td>\n<td>Handwoven Top Handle</td>\n</tr>\n<tr>\n<td><strong>Accent</strong></td>\n<td>Elegant Metallic Tassel</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Approx. 10 × 9 Inches</td>\n</tr>\n<tr>\n<td><strong>Colors</strong></td>\n<td>Available in Multiple Colors</td>\n</tr>\n<tr>\n<td><strong>Craftsmanship</strong></td>\n<td>Handcrafted by Skilled Artisans</td>\n</tr>\n<tr>\n<td><strong>Brand</strong></td>\n<td>Dori Handcrafts</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Lilac Bloom Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 2999,
    "compareAtPrice": 2799,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9350118703356",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "dori handcrafts",
      "fashion",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "metalic bag",
      "mettalic bag",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_f297a230-175d-4575-b920-64ead4e87832.png?v=1780589536",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_4f00e4b9-504a-4f21-a4db-d8c5e1b2f207.png?v=1780589536",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_b336b5f0-6a07-4f3c-b892-e773dadfa620.png?v=1780589536",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_4f463af7-1512-4c91-8397-238022f79cb0.png?v=1780589536",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_2c971795-183c-49b3-baee-65f1da935c8c.png?v=1780589536"
    ],
    "variants": [
      {
        "id": "49164039258364",
        "name": "Default Title",
        "price": 2999,
        "compareAtPrice": 2799,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9350116999420",
    "title": "Rosabelle Metallic Bag",
    "slug": "rosabelle-metallic-bag",
    "description": "<p>Discover the beauty of <strong>handcrafted luxury</strong> with this stunning metallic crochet handbag from <strong>Dori Handcrafts</strong>. Expertly handmade by <strong>skilled rural women artisans</strong>, each piece reflects exceptional craftsmanship, intricate detailing, and timeless elegance. The shimmering metallic weave, premium finish, and graceful tassel accent create a sophisticated accessory that effortlessly complements <strong>festive celebrations, weddings, parties, and special occasions</strong>.</p>\n<p>Designed with both <strong>style and functionality</strong> in mind, it features a <strong>secure turn-lock closure</strong>, a beautifully <strong>handwoven handle</strong>, and a <strong>detachable chain strap</strong> for versatile carrying options. More than just a handbag, every piece is a celebration of <strong>artisan craftsmanship, women empowerment, and conscious luxury</strong>.</p>\n<table>\n<thead>\n<tr>\n<th><strong>Product Details</strong></th>\n<th><strong>Description</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Material</strong></td>\n<td>Premium Metallic Crochet Weave</td>\n</tr>\n<tr>\n<td><strong>Closure</strong></td>\n<td>Secure Turn-Lock Closure</td>\n</tr>\n<tr>\n<td><strong>Strap</strong></td>\n<td>Detachable Chain Strap</td>\n</tr>\n<tr>\n<td><strong>Handle</strong></td>\n<td>Handwoven Top Handle</td>\n</tr>\n<tr>\n<td><strong>Accent</strong></td>\n<td>Elegant Metallic Tassel</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Approx. 10 × 9 Inches</td>\n</tr>\n<tr>\n<td><strong>Colors</strong></td>\n<td>Available in Multiple Colors</td>\n</tr>\n<tr>\n<td><strong>Craftsmanship</strong></td>\n<td>Handcrafted by Skilled Artisans</td>\n</tr>\n<tr>\n<td><strong>Brand</strong></td>\n<td>Dori Handcrafts</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Rosabelle Metallic Bag - Handcrafted luxury by Dori Handcrafts",
    "price": 2999,
    "compareAtPrice": 2799,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9350116999420",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "dori handcrafts",
      "fashion",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "metalic bag",
      "mettalic bag",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_a0de8c75-6b80-4ac4-aa5c-aa8e9d9818dd.png?v=1780589239",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_34f0e1c2-2df1-49af-8c07-e8a6955d96b8.png?v=1780589239",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_53e8691e-7639-4cf8-a961-013cba2ed337.png?v=1780589239",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_8bdf978d-b380-41a4-9e86-4dd253467cc4.png?v=1780589240",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_2b3e8523-f8d1-4a64-92e1-29168d2c6028.png?v=1780589240"
    ],
    "variants": [
      {
        "id": "49164034965756",
        "name": "Default Title",
        "price": 2999,
        "compareAtPrice": 2799,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9350115524860",
    "title": "The Gold Knot Handbag",
    "slug": "the-gold-knot-handbag",
    "description": "<p>Discover the beauty of <strong>handcrafted luxury</strong> with this stunning metallic crochet handbag from <strong>Dori Handcrafts</strong>. Expertly handmade by <strong>skilled rural women artisans</strong>, each piece reflects exceptional craftsmanship, intricate detailing, and timeless elegance. The shimmering metallic weave, premium finish, and graceful tassel accent create a sophisticated accessory that effortlessly complements <strong>festive celebrations, weddings, parties, and special occasions</strong>.</p>\n<p>Designed with both <strong>style and functionality</strong> in mind, it features a <strong>secure turn-lock closure</strong>, a beautifully <strong>handwoven handle</strong>, and a <strong>detachable chain strap</strong> for versatile carrying options. More than just a handbag, every piece is a celebration of <strong>artisan craftsmanship, women empowerment, and conscious luxury</strong>.</p>\n<table>\n<thead>\n<tr>\n<th><strong>Product Details</strong></th>\n<th><strong>Description</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Material</strong></td>\n<td>Premium Metallic Crochet Weave</td>\n</tr>\n<tr>\n<td><strong>Closure</strong></td>\n<td>Secure Turn-Lock Closure</td>\n</tr>\n<tr>\n<td><strong>Strap</strong></td>\n<td>Detachable Chain Strap</td>\n</tr>\n<tr>\n<td><strong>Handle</strong></td>\n<td>Handwoven Top Handle</td>\n</tr>\n<tr>\n<td><strong>Accent</strong></td>\n<td>Elegant Metallic Tassel</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Approx. 10 × 9 Inches</td>\n</tr>\n<tr>\n<td><strong>Colors</strong></td>\n<td>Available in Multiple Colors</td>\n</tr>\n<tr>\n<td><strong>Craftsmanship</strong></td>\n<td>Handcrafted by Skilled Artisans</td>\n</tr>\n<tr>\n<td><strong>Brand</strong></td>\n<td>Dori Handcrafts</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "The Gold Knot Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 2999,
    "compareAtPrice": 3999,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9350115524860",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "dori handcrafts",
      "fashion",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "metalic bag",
      "mettalic bag",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_4c952220-e524-4c1f-8e24-61455ec9cb8f.png?v=1780588062",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_0fe0d385-beab-4832-8137-3e9fb91f2ab0.png?v=1780588063",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_35a377d2-e55c-4cbe-82c9-db5b5d17f102.png?v=1780588062",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_838ad6ba-718e-40ac-bf87-184bf8b537ed.png?v=1780588062",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_97455cee-572d-40e1-a56b-baeb51a7638d.png?v=1780588062"
    ],
    "variants": [
      {
        "id": "49164030509308",
        "name": "Default Title",
        "price": 2999,
        "compareAtPrice": 3999,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9345020133628",
    "title": "Luxurious Set of 2 Macrame Storage Boxes",
    "slug": "luxurious-set-of-2-macrame-storage-boxes",
    "description": "<p>Macrame storage baskets with cotton lining are a perfect solution for stylishly organizing your home. These baskets can be used in different areas of your home, such as dorm rooms, apartments, laundry rooms, craft rooms, or bathrooms, to add a boho touch to your decor. They are not only functional but also visually appealing.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Off-White</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Big: 13.5 x 6.5 x 4 inches (LxBxH)<br>Small: 12 x 5.5 x 4 inches (LxBxH)</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope With MetalFrame And Wooden Handle</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>2 Pcs</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Luxurious Set of 2 Macrame Storage Boxes - Handcrafted luxury by Dori Handcrafts",
    "price": 1299,
    "compareAtPrice": 1899,
    "categorySlug": "storage",
    "categoryName": "storage",
    "SKU": "DORI-9345020133628",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "jute",
      "jute basket",
      "macrame",
      "outdoor",
      "outdoor decor",
      "shelf",
      "storage",
      "storage box"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_11bbb51b-159a-46bb-bd72-34d79781935c.png?v=1779902854",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_2f5d3bf3-5448-49fa-abda-6a7ea4113cae.png?v=1779902854",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_bce1afd0-9767-4a7f-ac8d-fad5624b8aa6.png?v=1779902854",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_b9c1b302-14e0-4ce5-aeda-cc39bf8f361f.png?v=1779902854"
    ],
    "variants": [
      {
        "id": "49139719667964",
        "name": "Default Title",
        "price": 1299,
        "compareAtPrice": 1899,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9345016168700",
    "title": "Set of 3 Boho Decor Baskets with Removable Linen",
    "slug": "set-of-3-boho-decor-baskets-with-removable-linen",
    "description": "<p>Macrame boho decor baskets with cotton lining are a perfect solution for stylishly organizing your home. These baskets can be used in different areas of your home, such as dorm rooms, apartments, laundry rooms, craft rooms, or bathrooms, to add a boho touch to your decor. They are not only functional but also visually appealing.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Off-White</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Rectangular</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Big: 10 x 14 x 4 inches – 1 Unit<br>Small: 6 x 9 x 4 inches – 2 Units</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Metal Frame And Wooden Handle</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>3 Pcs</td>\n</tr>\n</tbody>\n</table>\n<p><br><br></p>",
    "shortDescription": "Set of 3 Boho Decor Baskets with Removable Linen - Handcrafted luxury by Dori Handcrafts",
    "price": 1999,
    "compareAtPrice": 2999,
    "categorySlug": "storage",
    "categoryName": "storage",
    "SKU": "DORI-9345016168700",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "jute",
      "jute basket",
      "macrame",
      "outdoor",
      "outdoor decor",
      "shelf",
      "storage",
      "storage box",
      "tissue box"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_60f41f81-0c33-4a01-bf67-8bf5f7aae28a.png?v=1779902676",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_eea3e828-1f18-474e-b210-47cc390ec67a.png?v=1779902676",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_97bfa9ba-f363-4916-ab80-9277d3237255.png?v=1779902676",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_28c1d32f-a36a-4e4b-b8e9-be431d53b8ee.png?v=1779902676",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_996e7804-dd9e-4738-9a67-173926596b6e.png?v=1779902676",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/6_2174e21b-d9ea-4d92-9d6e-cfe1aca98993.png?v=1779902676"
    ],
    "variants": [
      {
        "id": "49139699712252",
        "name": "Default Title",
        "price": 1999,
        "compareAtPrice": 2999,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9345013383420",
    "title": "Macrame Tissue Box",
    "slug": "macrame-tissue-box",
    "description": "<p>A macrame tissue box is a decorative cover made from knotted cord or yarn that fits over a standard tissue box. The cover typically features intricate patterns created using various macrame knots, giving it a unique and handcrafted appearance.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Off-White</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Cubic</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>6 x 6 x 4 inches</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Metal Frame</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>1 Pcs</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Macrame Tissue Box - Handcrafted luxury by Dori Handcrafts",
    "price": 1299,
    "compareAtPrice": 1699,
    "categorySlug": "storage",
    "categoryName": "storage",
    "SKU": "DORI-9345013383420",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "jute",
      "jute basket",
      "macrame",
      "outdoor",
      "outdoor decor",
      "shelf",
      "storage",
      "storage box",
      "tissue box"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_048886f4-401a-4602-ab5a-c76e23e18921.png?v=1779902548",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_7334b742-2990-4e2b-85bc-d5777bd415e3.png?v=1779902547",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_b9abd49e-6fd1-479a-8fab-47d81cb57c59.png?v=1779902548",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_4fb84183-6b71-4239-bf26-7fecb388cb07.png?v=1779902548"
    ],
    "variants": [
      {
        "id": "49139691618556",
        "name": "Default Title",
        "price": 1299,
        "compareAtPrice": 1699,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9345011876092",
    "title": "Set of 2 Jute Macrame Baskets",
    "slug": "set-of-2-jute-macrame-baskets",
    "description": "<p>Jute macrame shelf baskets with cotton lining are a perfect solution for stylishly organizing your home. These baskets can be used in different areas of your home, such as dorm rooms, apartments, laundry rooms, craft rooms, or bathrooms, to add a boho touch to your decor. They are not only functional but also visually appealing.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Brown</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Big: 13.5 x 6.5 x 4 inches (LxBxH)<br>Small: 12 x 5.5 x 4 inches (LxBxH)</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Jute With MetalFrame And Wooden Handle</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>2 Pcs</td>\n</tr>\n</tbody>\n</table>\n<p><br><br></p>",
    "shortDescription": "Set of 2 Jute Macrame Baskets - Handcrafted luxury by Dori Handcrafts",
    "price": 3499,
    "compareAtPrice": 4499,
    "categorySlug": "storage",
    "categoryName": "storage",
    "SKU": "DORI-9345011876092",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "jute",
      "jute basket",
      "macrame",
      "outdoor",
      "outdoor decor",
      "shelf",
      "storage",
      "storage box"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_396eb56d-f18c-470c-bc68-5a119b0642ad.png?v=1779902438",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_be8e4353-31e6-425e-b533-d367c25c2f85.png?v=1779902438",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_76550487-63c2-4489-bd5f-3332b50b0a5d.png?v=1779902438",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_da6e42af-feaa-4246-b5a7-2d1830e36a46.png?v=1779902438",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_4f9b65dd-1b87-481a-9f29-188eef5af0e1.png?v=1779902438",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/6_625c3e67-bc36-4ed8-9b09-c7d8849e3b0e.png?v=1779902438"
    ],
    "variants": [
      {
        "id": "49139688079612",
        "name": "Default Title",
        "price": 3499,
        "compareAtPrice": 4499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9345011253500",
    "title": "Cotton Pearl Round Handmade Storage Laundry Basket",
    "slug": "cotton-pearl-round-handmade-storage-laundry-basket",
    "description": "<p>Macrame storage baskets with cotton lining are a perfect solution for stylishly organizing your home. These baskets can be used in different areas of your home, such as dorm rooms, apartments, laundry rooms, craft rooms, or bathrooms, to add a boho touch to your decor. They are not only functional but also visually appealing.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Off-White</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Cylinder</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Diameter- 14 inches, Height – 21 inches</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Metal Frame</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>1 Pcs</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Cotton Pearl Round Handmade Storage Laundry Basket - Handcrafted luxury by Dori Handcrafts",
    "price": 3499,
    "compareAtPrice": 4499,
    "categorySlug": "storage",
    "categoryName": "storage",
    "SKU": "DORI-9345011253500",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "macrame",
      "outdoor",
      "outdoor decor",
      "shelf",
      "storage",
      "storage box"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_54082137-e86a-4eb8-94dc-1b4c6ac04d08.png?v=1779902291",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_12babe4d-5306-4419-ba08-518213f697c1.png?v=1779902291",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_8c8bb16d-0508-4ced-889b-598d13f54664.png?v=1779902291",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_17e64bb7-5721-4832-9ce8-521c48e63001.png?v=1779902291",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_daba6367-7c02-4bb0-ab71-39d9e6487abe.png?v=1779902291",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/6_cb90b6e4-a63f-4e49-9496-efacadb02621.png?v=1779902291"
    ],
    "variants": [
      {
        "id": "49139687227644",
        "name": "Default Title",
        "price": 3499,
        "compareAtPrice": 4499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9345010991356",
    "title": "Set of 2 Macrame Storage Baskets – Off-white",
    "slug": "set-of-2-macrame-storage-baskets-off-white",
    "description": "<p>Macrame storage baskets with cotton lining are a perfect solution for stylishly organizing your home. These baskets can be used in different areas of your home, such as dorm rooms, apartments, laundry rooms, craft rooms, or bathrooms, to add a boho touch to your decor. They are not only functional but also visually appealing.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Grey</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Rectangular</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>13 x 10 x 5 inches</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Metal Frame</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>2 Pcs</td>\n</tr>\n</tbody>\n</table>\n<p><br><br></p>",
    "shortDescription": "Set of 2 Macrame Storage Baskets – Off-white - Handcrafted luxury by Dori Handcrafts",
    "price": 1699,
    "compareAtPrice": 1999,
    "categorySlug": "storage",
    "categoryName": "storage",
    "SKU": "DORI-9345010991356",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "macrame",
      "outdoor",
      "outdoor decor",
      "shelf",
      "storage",
      "storage box"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_b046c064-f518-452b-9956-2ee811d8155d.png?v=1779902185",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_05b58c56-110b-41ec-a182-fa73614cea07.png?v=1779902185",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_38a04000-529e-412d-afbe-597dadeeda8f.png?v=1779902185",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_7b5e783a-ff97-4dde-90ba-12c8cc298687.png?v=1779902185",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_81680f0f-d0cb-4f78-846c-811382d468a5.png?v=1779902185"
    ],
    "variants": [
      {
        "id": "49139686703356",
        "name": "Default Title",
        "price": 1699,
        "compareAtPrice": 1999,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9345010499836",
    "title": "Set of 2 Macrame Storage Baskets",
    "slug": "set-of-2-macrame-storage-baskets",
    "description": "<p>Macrame storage baskets with cotton lining help you organize your home in a decorative way. This is a great organization tool for any area in the home; use in dorm room, apartment, laundry room, craft room or bathroom for instant boho flair.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Grey</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Rectangular</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Big: 13.5 x 6.5 x 4 inches<br>Small: 12 x 5.5 x 4 inches</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Metal Frame And Wooden Handle</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>2 Pcs</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Set of 2 Macrame Storage Baskets - Handcrafted luxury by Dori Handcrafts",
    "price": 1699,
    "compareAtPrice": 1999,
    "categorySlug": "storage",
    "categoryName": "storage",
    "SKU": "DORI-9345010499836",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "macrame",
      "outdoor",
      "outdoor decor",
      "shelf",
      "storage",
      "storage box"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_18c440de-cbd3-47ea-8724-1862fb33ad63.png?v=1779901683",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_87e03484-dd2b-41c6-a1df-d95c70a1757d.png?v=1779901683",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_12dc72ee-bc1e-4a28-bb4b-b0003d84f659.png?v=1779901683",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_03a8236e-32e5-4296-9a7f-8c8496af01a2.png?v=1779901683",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_943e9a39-7606-485b-b92f-a3733aa5720d.png?v=1779901683"
    ],
    "variants": [
      {
        "id": "49139685622012",
        "name": "Default Title",
        "price": 1699,
        "compareAtPrice": 1999,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9340700033276",
    "title": "The Pastel Dream Handbag",
    "slug": "the-pastel-dream-handbag",
    "description": "<p data-path-to-node=\"1\">Elevate your accessory game with this eye-catching, handcrafted statement purse. Featuring a chunky, pillowy braided design made from premium t-shirt yarn, this bag effortlessly blends playful color-blocking with sophisticated details.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Artisanal Craftsmanship:</b> Hand-crocheted using thick, sturdy cotton yarn for a unique tactile finish.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Vibrant Palette:</b> A striking gradient of violet, pastel blue, blush pink, and magenta, framed by a clean cream border.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Dual Styling:</b> Carry it by the chunky top handle or use the elegant gold-chain crossbody strap.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,3,0\"><b data-path-to-node=\"2,3,0\" data-index-in-node=\"0\">Premium Accents:</b> Secured with a sleek, gold-toned triangular turn-lock clasp and finished with a playful side tassel.</p>\n</li>\n</ul>\n<p data-path-to-node=\"3\"><b data-path-to-node=\"3\" data-index-in-node=\"0\">The perfect blend of modern texture and everyday luxury.</b></p>",
    "shortDescription": "The Pastel Dream Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 2099,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9340700033276",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_9934e86c-799b-4bd3-a3ac-02d5a0727685.png?v=1779381665",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_0e534a14-36cc-4c6e-aa41-f2e4849c68a7.png?v=1779381665",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_74f1a794-519f-4e1e-a910-f64c8e9569e4.png?v=1779381665",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_4c774251-f6f6-4418-9ff4-0c34e4568d88.png?v=1779381665"
    ],
    "variants": [
      {
        "id": "49122530754812",
        "name": "Default Title",
        "price": 2099,
        "compareAtPrice": 3399,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9340699345148",
    "title": "The Tuxedo Braided Purse",
    "slug": "the-tuxedo-braided-purse",
    "description": "<p data-path-to-node=\"1\">Elevate your accessory game with this eye-catching, handcrafted statement purse. Featuring a chunky, pillowy braided design made from premium t-shirt yarn, this bag effortlessly blends playful color-blocking with sophisticated details.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Artisanal Craftsmanship:</b> Hand-crocheted using thick, sturdy cotton yarn for a unique tactile finish.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Vibrant Palette:</b> A striking gradient of violet, pastel blue, blush pink, and magenta, framed by a clean cream border.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Dual Styling:</b> Carry it by the chunky top handle or use the elegant gold-chain crossbody strap.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,3,0\"><b data-path-to-node=\"2,3,0\" data-index-in-node=\"0\">Premium Accents:</b> Secured with a sleek, gold-toned triangular turn-lock clasp and finished with a playful side tassel.</p>\n</li>\n</ul>\n<p data-path-to-node=\"3\"><b data-path-to-node=\"3\" data-index-in-node=\"0\">The perfect blend of modern texture and everyday luxury.</b></p>",
    "shortDescription": "The Tuxedo Braided Purse - Handcrafted luxury by Dori Handcrafts",
    "price": 2499,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9340699345148",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_ea3abbb6-7a6d-4e5b-8fae-0c58dd64e2e8.png?v=1779381578",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_9b4e7444-7b94-49fd-b024-e9071f519561.png?v=1779381578",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_2e89a491-602e-4248-b775-ba2739dbf4c3.png?v=1779381578",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_560c27a1-ab06-4512-8470-aeee9a33461f.png?v=1779381578",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/ChatGPT_Image_May_29_2026_08_51_07_PM.png?v=1780068136",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/ChatGPT_Image_May_29_2026_08_47_44_PM.png?v=1780068164"
    ],
    "variants": [
      {
        "id": "49145559548156",
        "name": "Black",
        "price": 2499,
        "compareAtPrice": 3399,
        "optionName": "Color",
        "optionValue": "Black",
        "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_ea3abbb6-7a6d-4e5b-8fae-0c58dd64e2e8.png?v=1779381578"
      },
      {
        "id": "49145559482620",
        "name": "Gray",
        "price": 2499,
        "compareAtPrice": 3399,
        "optionName": "Color",
        "optionValue": "Gray",
        "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/ChatGPT_Image_May_29_2026_08_51_07_PM.png?v=1780068136"
      },
      {
        "id": "49145559515388",
        "name": "Brown",
        "price": 2499,
        "compareAtPrice": 3399,
        "optionName": "Color",
        "optionValue": "Brown",
        "image": "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/ChatGPT_Image_May_29_2026_08_47_44_PM.png?v=1780068164"
      }
    ]
  },
  {
    "id": "9340698886396",
    "title": "Ocean Breeze Handbag",
    "slug": "ocean-breeze-handbag",
    "description": "<p data-path-to-node=\"1\">Elevate your accessory game with this eye-catching, handcrafted statement purse. Featuring a chunky, pillowy braided design made from premium t-shirt yarn, this bag effortlessly blends playful color-blocking with sophisticated details.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Artisanal Craftsmanship:</b> Hand-crocheted using thick, sturdy cotton yarn for a unique tactile finish.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Vibrant Palette:</b> A striking gradient of violet, pastel blue, blush pink, and magenta, framed by a clean cream border.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Dual Styling:</b> Carry it by the chunky top handle or use the elegant gold-chain crossbody strap.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,3,0\"><b data-path-to-node=\"2,3,0\" data-index-in-node=\"0\">Premium Accents:</b> Secured with a sleek, gold-toned triangular turn-lock clasp and finished with a playful side tassel.</p>\n</li>\n</ul>\n<p data-path-to-node=\"3\"><b data-path-to-node=\"3\" data-index-in-node=\"0\">The perfect blend of modern texture and everyday luxury.</b></p>",
    "shortDescription": "Ocean Breeze Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 2499,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9340698886396",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_5159928e-ffd6-4e67-9882-eca7ef709231.png?v=1779381452",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_b6ae3b4a-bccd-4ecb-826e-79aa925733cd.png?v=1779381452",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_e429c590-8051-477a-a26b-c98579423490.png?v=1779381452",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_17cde39b-b2ea-4c65-b3ec-7b2d92507e07.png?v=1779381452"
    ],
    "variants": [
      {
        "id": "49122527740156",
        "name": "Default Title",
        "price": 2499,
        "compareAtPrice": 3399,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9340696920316",
    "title": "Rainbow Weave Bag",
    "slug": "rainbow-weave-bag",
    "description": "<p data-path-to-node=\"1\">Elevate your accessory game with this eye-catching, handcrafted statement purse. Featuring a chunky, pillowy braided design made from premium t-shirt yarn, this bag effortlessly blends playful color-blocking with sophisticated details.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Artisanal Craftsmanship:</b> Hand-crocheted using thick, sturdy cotton yarn for a unique tactile finish.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Vibrant Palette:</b> A striking gradient of violet, pastel blue, blush pink, and magenta, framed by a clean cream border.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Dual Styling:</b> Carry it by the chunky top handle or use the elegant gold-chain crossbody strap.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,3,0\"><b data-path-to-node=\"2,3,0\" data-index-in-node=\"0\">Premium Accents:</b> Secured with a sleek, gold-toned triangular turn-lock clasp and finished with a playful side tassel.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,4,0\"><b data-path-to-node=\"2,4,0\" data-index-in-node=\"0\">Perfect Compact Size:</b> Measuring <b data-path-to-node=\"2,4,0\" data-index-in-node=\"32\">9\" x 9\"</b>, it's the ideal size to hold your everyday essentials (phone, keys, cardholder, and lipstick) without weighing you down.</p>\n</li>\n</ul>\n<p data-path-to-node=\"3\"><b data-path-to-node=\"3\" data-index-in-node=\"0\">The perfect blend of modern texture and everyday luxury.</b></p>",
    "shortDescription": "Rainbow Weave Bag - Handcrafted luxury by Dori Handcrafts",
    "price": 2099,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9340696920316",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_a4a0ba4d-a1f8-4db2-9be9-6fa8cb89da09.png?v=1779381125",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_f91b134f-82cb-412d-9864-b314c7cb8b40.png?v=1779381125",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_ad771d64-3d2b-4484-85a4-4643da7ab69a.png?v=1779381125",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_0fd5e35c-6353-4a5c-9917-1ae74eff830f.png?v=1779381125"
    ],
    "variants": [
      {
        "id": "49122523316476",
        "name": "Default Title",
        "price": 2099,
        "compareAtPrice": 3399,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9340693610748",
    "title": "Espresso Twist Handbag",
    "slug": "espresso-twist-handbag",
    "description": "<p data-path-to-node=\"1\">Elevate your accessory game with this eye-catching, handcrafted statement purse. Featuring a chunky, pillowy braided design made from premium t-shirt yarn, this bag effortlessly blends playful color-blocking with sophisticated details.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Artisanal Craftsmanship:</b> Hand-crocheted using thick, sturdy cotton yarn for a unique tactile finish.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Vibrant Palette:</b> A striking gradient of violet, pastel blue, blush pink, and magenta, framed by a clean cream border.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Dual Styling:</b> Carry it by the chunky top handle or use the elegant gold-chain crossbody strap.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,3,0\"><b data-path-to-node=\"2,3,0\" data-index-in-node=\"0\">Premium Accents:</b> Secured with a sleek, gold-toned triangular turn-lock clasp and finished with a playful side tassel.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,4,0\"><b data-path-to-node=\"2,4,0\" data-index-in-node=\"0\">Perfect Compact Size:</b> Measuring <b data-path-to-node=\"2,4,0\" data-index-in-node=\"32\">9\" x 9\"</b>, it's the ideal size to hold your everyday essentials (phone, keys, cardholder, and lipstick) without weighing you down.</p>\n</li>\n</ul>\n<p data-path-to-node=\"3\"><b data-path-to-node=\"3\" data-index-in-node=\"0\">The perfect blend of modern texture and everyday luxury.</b></p>",
    "shortDescription": "Espresso Twist Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 2099,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9340693610748",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_8f90ebea-bf84-4f4a-b6c8-721462e13338.png?v=1779380986",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_7b41c924-dc18-4ee3-a242-1e696887d4e3.png?v=1779380986",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_a3df7529-072e-427f-846a-f0dcf4801618.png?v=1779380986",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_4d9e409b-2d0b-4547-8055-444947ac2f48.png?v=1779380986"
    ],
    "variants": [
      {
        "id": "49122516730108",
        "name": "Default Title",
        "price": 2099,
        "compareAtPrice": 3399,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9340688990460",
    "title": "Chunky Rainbow Clutch",
    "slug": "chunky-rainbow-clutch",
    "description": "<p data-path-to-node=\"1\">Elevate your accessory game with this eye-catching, handcrafted statement purse. Featuring a chunky, pillowy braided design made from premium t-shirt yarn, this bag effortlessly blends playful color-blocking with sophisticated details.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Artisanal Craftsmanship:</b> Hand-crocheted using thick, sturdy cotton yarn for a unique tactile finish.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Vibrant Palette:</b> A striking gradient of violet, pastel blue, blush pink, and magenta, framed by a clean cream border.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Dual Styling:</b> Carry it by the chunky top handle or use the elegant gold-chain crossbody strap.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,3,0\"><b data-path-to-node=\"2,3,0\" data-index-in-node=\"0\">Premium Accents:</b> Secured with a sleek, gold-toned triangular turn-lock clasp and finished with a playful side tassel.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,4,0\"><b data-path-to-node=\"2,4,0\" data-index-in-node=\"0\">Perfect Compact Size:</b> Measuring <b data-path-to-node=\"2,4,0\" data-index-in-node=\"32\">9\" x 9\"</b>, it's the ideal size to hold your everyday essentials (phone, keys, cardholder, and lipstick) without weighing you down.</p>\n</li>\n</ul>\n<p data-path-to-node=\"3\"><b data-path-to-node=\"3\" data-index-in-node=\"0\">The perfect blend of modern texture and everyday luxury.</b></p>",
    "shortDescription": "Chunky Rainbow Clutch - Handcrafted luxury by Dori Handcrafts",
    "price": 2099,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9340688990460",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_e5624290-b8ea-42f3-a7d5-4f50b9463e01.png?v=1779380339",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_5047865a-8868-43bf-a864-e2af12e354af.png?v=1779380339",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_091aefb2-1b8d-4eda-991e-c7ef2597cb42.png?v=1779380339",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_2967dd59-afe0-4bfd-b758-49ad4f4c502a.png?v=1779380339"
    ],
    "variants": [
      {
        "id": "49122493595900",
        "name": "Default Title",
        "price": 2099,
        "compareAtPrice": 3399,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9340647080188",
    "title": "Pearl Knot Luxe Bag",
    "slug": "1",
    "description": "<p data-path-to-node=\"1\">Elevate your accessory game with this eye-catching, handcrafted statement purse. Featuring a chunky, pillowy braided design made from premium t-shirt yarn, this bag effortlessly blends playful color-blocking with sophisticated details.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Artisanal Craftsmanship:</b> Hand-crocheted using thick, sturdy cotton yarn for a unique tactile finish.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Vibrant Palette:</b> A striking gradient of violet, pastel blue, blush pink, and magenta, framed by a clean cream border.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Dual Styling:</b> Carry it by the chunky top handle or use the elegant gold-chain crossbody strap.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,3,0\"><b data-path-to-node=\"2,3,0\" data-index-in-node=\"0\">Premium Accents:</b> Secured with a sleek, gold-toned triangular turn-lock clasp and finished with a playful side tassel.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,4,0\"><b data-path-to-node=\"2,4,0\" data-index-in-node=\"0\">Perfect Compact Size:</b> Measuring <b data-path-to-node=\"2,4,0\" data-index-in-node=\"32\">9\" x 9\"</b>, it's the ideal size to hold your everyday essentials (phone, keys, cardholder, and lipstick) without weighing you down.</p>\n</li>\n</ul>\n<p data-path-to-node=\"3\"><b data-path-to-node=\"3\" data-index-in-node=\"0\">The perfect blend of modern texture and everyday luxury.</b></p>",
    "shortDescription": "Pearl Knot Luxe Bag - Handcrafted luxury by Dori Handcrafts",
    "price": 2199,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9340647080188",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_6db28e62-c8c9-4ac4-b43b-721f1238b8cf.png?v=1779376527",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_60434cd5-c62d-48af-8b70-e4492de367cd.png?v=1779376527",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_e3af8454-9f46-4929-8424-4157bf7ecae0.png?v=1779376527",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_a3df9238-9dbf-4aa5-9fdd-ab3fd6cac03c.png?v=1779376527",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_55f57a9c-8698-4d05-89a4-4a4ac87e0737.png?v=1779376527"
    ],
    "variants": [
      {
        "id": "49122280603900",
        "name": "Default Title",
        "price": 2199,
        "compareAtPrice": 3399,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9340642853116",
    "title": "Orchid Charm Handbag",
    "slug": "orchid-charm-handbag",
    "description": "<p data-path-to-node=\"1\">Elevate your accessory game with this eye-catching, handcrafted statement purse. Featuring a chunky, pillowy braided design made from premium t-shirt yarn, this bag effortlessly blends playful color-blocking with sophisticated details.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Artisanal Craftsmanship:</b> Hand-crocheted using thick, sturdy cotton yarn for a unique tactile finish.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Vibrant Palette:</b> A striking gradient of violet, pastel blue, blush pink, and magenta, framed by a clean cream border.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Dual Styling:</b> Carry it by the chunky top handle or use the elegant gold-chain crossbody strap.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,3,0\"><b data-path-to-node=\"2,3,0\" data-index-in-node=\"0\">Premium Accents:</b> Secured with a sleek, gold-toned triangular turn-lock clasp and finished with a playful side tassel.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,4,0\"><b data-path-to-node=\"2,4,0\" data-index-in-node=\"0\">Perfect Compact Size:</b> Measuring <b data-path-to-node=\"2,4,0\" data-index-in-node=\"32\">9\" x 9\"</b>, it's the ideal size to hold your everyday essentials (phone, keys, cardholder, and lipstick) without weighing you down.</p>\n</li>\n</ul>\n<p data-path-to-node=\"3\"><b data-path-to-node=\"3\" data-index-in-node=\"0\">The perfect blend of modern texture and everyday luxury.</b></p>",
    "shortDescription": "Orchid Charm Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 1999,
    "compareAtPrice": 2699,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9340642853116",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_b22e6e68-0762-485b-9adb-a6e1a6d8b324.png?v=1779375373",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_ed1492b9-542f-48a4-aefc-1234904aefa6.png?v=1779375373",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_7806415c-de17-4051-819a-63cc1c20e0f4.png?v=1779375373",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_7cc555c0-53b6-42b4-8e9b-cd2a0796365c.png?v=1779375373",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_469fc2d9-1880-4502-af04-bdf672ecc301.png?v=1779375373"
    ],
    "variants": [
      {
        "id": "49122258190588",
        "name": "Default Title",
        "price": 1999,
        "compareAtPrice": 2699,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9340178170108",
    "title": "Midnight Emerald Handbag",
    "slug": "the-candy-braid-bag-copy-1",
    "description": "<p data-path-to-node=\"1\">Elevate your accessory game with this eye-catching, handcrafted statement purse. Featuring a chunky, pillowy braided design made from premium t-shirt yarn, this bag effortlessly blends playful color-blocking with sophisticated details.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Artisanal Craftsmanship:</b> Hand-crocheted using thick, sturdy cotton yarn for a unique tactile finish.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Vibrant Palette:</b> A striking gradient of violet, pastel blue, blush pink, and magenta, framed by a clean cream border.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Dual Styling:</b> Carry it by the chunky top handle or use the elegant gold-chain crossbody strap.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,3,0\"><b data-path-to-node=\"2,3,0\" data-index-in-node=\"0\">Premium Accents:</b> Secured with a sleek, gold-toned triangular turn-lock clasp and finished with a playful side tassel.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,4,0\"><b data-path-to-node=\"2,4,0\" data-index-in-node=\"0\">Perfect Compact Size:</b> Measuring <b data-path-to-node=\"2,4,0\" data-index-in-node=\"32\">9\" x 9\"</b>, it's the ideal size to hold your everyday essentials (phone, keys, cardholder, and lipstick) without weighing you down.</p>\n</li>\n</ul>\n<p data-path-to-node=\"3\"><b data-path-to-node=\"3\" data-index-in-node=\"0\">The perfect blend of modern texture and everyday luxury.</b></p>",
    "shortDescription": "Midnight Emerald Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 2099,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9340178170108",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_13dcb50e-2174-4449-81c3-161432234194.png?v=1779306817",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_34fe819a-0c68-460a-9816-33563a64f04c.png?v=1779306816",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_91466f4e-24f0-4034-b34f-bb734e06816c.png?v=1779306817",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_86adcfce-42a3-4822-80c9-bf89af5d0bb1.png?v=1779306817",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_111bc8db-fb83-4aba-b01a-46d50b9a35fd.png?v=1779306817"
    ],
    "variants": [
      {
        "id": "49120678215932",
        "name": "Default Title",
        "price": 2099,
        "compareAtPrice": 3399,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9340162932988",
    "title": "Desert Rose Handbag",
    "slug": "the-candy-braid-bag-copy",
    "description": "<p data-path-to-node=\"1\">Elevate your accessory game with this eye-catching, handcrafted statement purse. Featuring a chunky, pillowy braided design made from premium t-shirt yarn, this bag effortlessly blends playful color-blocking with sophisticated details.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Artisanal Craftsmanship:</b> Hand-crocheted using thick, sturdy cotton yarn for a unique tactile finish.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Vibrant Palette:</b> A striking gradient of violet, pastel blue, blush pink, and magenta, framed by a clean cream border.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Dual Styling:</b> Carry it by the chunky top handle or use the elegant gold-chain crossbody strap.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,3,0\"><b data-path-to-node=\"2,3,0\" data-index-in-node=\"0\">Premium Accents:</b> Secured with a sleek, gold-toned triangular turn-lock clasp and finished with a playful side tassel.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,4,0\"><b data-path-to-node=\"2,4,0\" data-index-in-node=\"0\">Perfect Compact Size:</b> Measuring <b data-path-to-node=\"2,4,0\" data-index-in-node=\"32\">9\" x 9\"</b>, it's the ideal size to hold your everyday essentials (phone, keys, cardholder, and lipstick) without weighing you down.</p>\n</li>\n</ul>\n<p data-path-to-node=\"3\"><b data-path-to-node=\"3\" data-index-in-node=\"0\">The perfect blend of modern texture and everyday luxury.</b></p>",
    "shortDescription": "Desert Rose Handbag - Handcrafted luxury by Dori Handcrafts",
    "price": 2099,
    "compareAtPrice": 3399,
    "categorySlug": "handbags",
    "categoryName": "handbags",
    "SKU": "DORI-9340162932988",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "clutch bag",
      "cozy",
      "handbag",
      "handbags",
      "handmade",
      "macrame",
      "t shirt yarn"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_db132a11-30a7-4e12-bb0c-0f7f714539df.png?v=1779304009",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_7b7cb475-c617-48b5-ada8-b060dc83b785.png?v=1779304009",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_0c53db83-c544-45ed-a74e-2b6115107811.png?v=1779304010",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_ae091365-c6bf-49b7-978f-e7777a630b3e.png?v=1779304009",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_f26df6bb-1503-43c9-9e89-d069615ec2a9.png?v=1779304009"
    ],
    "variants": [
      {
        "id": "49120646398204",
        "name": "Default Title",
        "price": 2099,
        "compareAtPrice": 3399,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9340071117052",
    "title": "Mini Retreat Tent",
    "slug": "tribal-luxe-macrame-tent-copy",
    "description": "<p>A macrame teepee, also known as a macrame tent or canopy, is a stylish and bohemian-inspired structure made from wooden poles, draped with intricately knotted macrame fabric. These teepees are often used as decorative elements in indoor or outdoor spaces, serving as cozy retreats or aesthetic focal points.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Off-White</td>\n</tr>\n<tr>\n<td><strong>Weight</strong></td>\n<td>8kg – 10kg</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>2×3 | 4×6 | 4×8 feet</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton, Metal Frame, Wood Handle</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Mini Retreat Tent - Handcrafted luxury by Dori Handcrafts",
    "price": 3499,
    "compareAtPrice": 5499,
    "categorySlug": "tent",
    "categoryName": "Tent",
    "SKU": "DORI-9340071117052",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cozy",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "lights",
      "macrame",
      "matt",
      "outdoor decor",
      "tapestry",
      "tent"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/front-1.jpg?v=1779297396",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/ChatGPT_Image_May_20_2026_10_42_39_PM.png?v=1779297468",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/close-1-768x768.jpg?v=1779297396",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/back-768x768.jpg?v=1779297395",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/measurement-8-300x300.jpg?v=1779297396",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/side.jpg?v=1779297396"
    ],
    "variants": [
      {
        "id": "49120476266748",
        "name": "2X3 Feet",
        "price": 3499,
        "compareAtPrice": 5499,
        "optionName": "size",
        "optionValue": "2X3 Feet",
        "image": null
      },
      {
        "id": "49120476299516",
        "name": "4X6 Feet",
        "price": 6999,
        "compareAtPrice": 8999,
        "optionName": "size",
        "optionValue": "4X6 Feet",
        "image": null
      },
      {
        "id": "49120476332284",
        "name": "4X8 Feet",
        "price": 9999,
        "compareAtPrice": 11999,
        "optionName": "size",
        "optionValue": "4X8 Feet",
        "image": null
      }
    ]
  },
  {
    "id": "9340065349884",
    "title": "Tribal Luxe Tent",
    "slug": "tribal-luxe-macrame-tent",
    "description": "<p>A macrame teepee, also known as a macrame tent or canopy, is a stylish and bohemian-inspired structure made from wooden poles, draped with intricately knotted macrame fabric. These teepees are often used as decorative elements in indoor or outdoor spaces, serving as cozy retreats or aesthetic focal points.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Off-White</td>\n</tr>\n<tr>\n<td><strong>Weight</strong></td>\n<td>8kg – 10kg</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>2×3 | 4×6 | 4×8 feet</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton, Metal Frame, Wood Handle</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Tribal Luxe Tent - Handcrafted luxury by Dori Handcrafts",
    "price": 3499,
    "compareAtPrice": 5499,
    "categorySlug": "tent",
    "categoryName": "Tent",
    "SKU": "DORI-9340065349884",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cozy",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "lights",
      "macrame",
      "matt",
      "outdoor decor",
      "tapestry",
      "tent"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/front.jpg?v=1779296059",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/upper-close_fe59261a-963a-4e57-8bd2-0f5c203b7ea8.jpg?v=1779296060",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/close.jpg?v=1779296060",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/main-11.jpg?v=1779296059"
    ],
    "variants": [
      {
        "id": "49120469680380",
        "name": "2X3 Feet",
        "price": 3499,
        "compareAtPrice": 5499,
        "optionName": "size",
        "optionValue": "2X3 Feet",
        "image": null
      },
      {
        "id": "49120469713148",
        "name": "4X6 Feet",
        "price": 6999,
        "compareAtPrice": 9999,
        "optionName": "size",
        "optionValue": "4X6 Feet",
        "image": null
      },
      {
        "id": "49120469745916",
        "name": "4X8 Feet",
        "price": 9999,
        "compareAtPrice": 11999,
        "optionName": "size",
        "optionValue": "4X8 Feet",
        "image": null
      }
    ]
  },
  {
    "id": "9339861205244",
    "title": "Forest Luxe Swing Chair",
    "slug": "the-boho-cloud-swing-copy",
    "description": "<p><strong>This beautiful handmade macrame swing chair is handcrafted with love and care by experienced artisans</strong><span>. This macrame swing can hold a weight of up to 200 kg, making it a fantastic choice addition to a living room, or a balcony. This macrame swing chair will add a touch of luxury and class to any area it is placed in. This chair is perfect for relieving your tiredness after a long day at work.</span></p>\n<p><span><strong>More details:</strong></span></p>\n<ul>\n<li><span><strong>Dimensions(In Inches)</strong>: Large – H 70 x W 40 x D 40  Medium – H 70 x W 33 x D 33  (All Dimensions Are In Inches)</span></li>\n<li><span><strong>Weight</strong>: 15 KG<br></span></li>\n<li><span><strong>Assembly</strong>: Self Assembly<br></span></li>\n<li><span><strong>Installation hardware</strong>: 1 swing, 2 S shape hooks and 1 Rod</span></li>\n<li><span><strong>Primary materials</strong>: Cotton, velvet and iron<br></span></li>\n<li><span><strong>Suitable for</strong>: Living Room and Balcony.</span></li>\n</ul>",
    "shortDescription": "Forest Luxe Swing Chair - Handcrafted luxury by Dori Handcrafts",
    "price": 9999,
    "compareAtPrice": null,
    "categorySlug": "swing",
    "categoryName": "swing",
    "SKU": "DORI-9339861205244",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cozy",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "macrame swing",
      "outdoor",
      "swing"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0f0a9742-15fd-4d29-a180-548f01275699.png?v=1779256152",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_f39e4fd4-3441-45bb-9258-1d0e3fc01e34.png?v=1779256152",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_8b5a8a88-1a73-49b4-8e2f-b5b9646f2203.png?v=1779256154",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_10bce4f9-3b6f-4dcc-8c5d-b763b706303c.png?v=1779256152"
    ],
    "variants": [
      {
        "id": "49119764087036",
        "name": "Medium - 33\" inches diameter",
        "price": 9999,
        "compareAtPrice": null,
        "optionName": "Size",
        "optionValue": "Medium - 33\" inches diameter",
        "image": null
      },
      {
        "id": "49119764119804",
        "name": "Large - 40\" inches diameter",
        "price": 11999,
        "compareAtPrice": null,
        "optionName": "Size",
        "optionValue": "Large - 40\" inches diameter",
        "image": null
      },
      {
        "id": "49119764152572",
        "name": "Extra Large - 50\" inches diameter",
        "price": 14999,
        "compareAtPrice": null,
        "optionName": "Size",
        "optionValue": "Extra Large - 50\" inches diameter",
        "image": null
      },
      {
        "id": "49119764185340",
        "name": "Large Swing Bed - 60\" inches diameter",
        "price": 17999,
        "compareAtPrice": null,
        "optionName": "Size",
        "optionValue": "Large Swing Bed - 60\" inches diameter",
        "image": null
      },
      {
        "id": "49119764218108",
        "name": "Extra Large Swing Bed - 70\" inches diameter",
        "price": 20999,
        "compareAtPrice": null,
        "optionName": "Size",
        "optionValue": "Extra Large Swing Bed - 70\" inches diameter",
        "image": null
      }
    ]
  },
  {
    "id": "9339536769276",
    "title": "The Boho Cloud Swing",
    "slug": "the-boho-cloud-swing",
    "description": "<p><strong>This beautiful handmade macrame swing chair is handcrafted with love and care by experienced artisans</strong><span>. This macrame swing can hold a weight of up to 200 kg, making it a fantastic choice addition to a living room, or a balcony. This macrame swing chair will add a touch of luxury and class to any area it is placed in. This chair is perfect for relieving your tiredness after a long day at work.</span></p>\n<p><span><strong>More details:</strong></span></p>\n<ul>\n<li><span><strong>Dimensions(In Inches)</strong>: Large – H 70 x W 40 x D 40  Medium – H 70 x W 33 x D 33  (All Dimensions Are In Inches)</span></li>\n<li><span><strong>Weight</strong>: 15 KG<br></span></li>\n<li><span><strong>Assembly</strong>: Self Assembly<br></span></li>\n<li><span><strong>Installation hardware</strong>: 1 swing, 2 S shape hooks and 1 Rod</span></li>\n<li><span><strong>Primary materials</strong>: Cotton, velvet and iron<br></span></li>\n<li><span><strong>Suitable for</strong>: Living Room and Balcony.</span></li>\n</ul>",
    "shortDescription": "The Boho Cloud Swing - Handcrafted luxury by Dori Handcrafts",
    "price": 9999,
    "compareAtPrice": null,
    "categorySlug": "swing",
    "categoryName": "swing",
    "SKU": "DORI-9339536769276",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cozy",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "macrame swing",
      "outdoor",
      "swing"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0cafca5d-890e-4bee-95e8-0bbdffe1cf44.png?v=1779209160",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_bfa3df7f-bb4b-439d-9176-4e933ccb66a9.png?v=1779209160",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_9eba1ba5-b8ff-4814-9707-f6a7a8680842.png?v=1779209160",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_89fd59d1-5ee5-489c-9fd6-9ca02c0265c4.png?v=1779209160",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_57d06a27-e1de-4741-bc2b-f4c067012448.png?v=1779209160",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/ChatGPTImageMay19_2026_10_04_58PM.png?v=1779209645"
    ],
    "variants": [
      {
        "id": "49118685724924",
        "name": "Medium - 33\" inches diameter",
        "price": 9999,
        "compareAtPrice": null,
        "optionName": "1",
        "optionValue": "Medium - 33\" inches diameter",
        "image": null
      },
      {
        "id": "49118712398076",
        "name": "Large - 40\" inches diameter",
        "price": 11999,
        "compareAtPrice": null,
        "optionName": "1",
        "optionValue": "Large - 40\" inches diameter",
        "image": null
      },
      {
        "id": "49118712430844",
        "name": "Extra Large - 50\" inches diameter",
        "price": 14999,
        "compareAtPrice": null,
        "optionName": "1",
        "optionValue": "Extra Large - 50\" inches diameter",
        "image": null
      },
      {
        "id": "49118712463612",
        "name": "Large Swing Bed - 60\" inches diameter",
        "price": 17999,
        "compareAtPrice": null,
        "optionName": "1",
        "optionValue": "Large Swing Bed - 60\" inches diameter",
        "image": null
      },
      {
        "id": "49118712496380",
        "name": "Extra Large Swing Bed - 70\" inches diameter",
        "price": 20999,
        "compareAtPrice": null,
        "optionName": "1",
        "optionValue": "Extra Large Swing Bed - 70\" inches diameter",
        "image": null
      }
    ]
  },
  {
    "id": "9333858402556",
    "title": "Roselle Eclipse Raffia Light",
    "slug": "solara-wave-jute-hanging-light-copy-1",
    "description": "<p>A handcrafted trio of cotton pendant lamps in deep green – featuring two circular open-ring designs and one layered dome pendant for a modern, artistic touch.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Pink &amp; White</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>2 × Circular Ring + 1 × Layered Dome</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Ring: Diameter – 14”<br>Dome: Diameter – 22” | Height – 16”</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Metal Frame</td>\n</tr>\n<tr>\n<td><strong>Uses</strong></td>\n<td>Decoration &amp; Lighting</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>3 Pcs Set</td>\n</tr>\n</tbody>\n</table>\n<p><br><br></p>",
    "shortDescription": "Roselle Eclipse Raffia Light - Handcrafted luxury by Dori Handcrafts",
    "price": 4499,
    "compareAtPrice": 5999,
    "categorySlug": "hanging-lights",
    "categoryName": "hanging Lights",
    "SKU": "DORI-9333858402556",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "hanging lamp",
      "lights",
      "macrame"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/Untitled-12-1.jpg?v=1778608311",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/Untitled-7.jpg?v=1778608310",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/Untitled-7-1.jpg?v=1778608310",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/Untitled-5-1.jpg?v=1778608311"
    ],
    "variants": [
      {
        "id": "49090533261564",
        "name": "Default Title",
        "price": 4499,
        "compareAtPrice": 5999,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9333854535932",
    "title": "Terra Bloom Raffia Pendant Light",
    "slug": "luna-aura-jute-hanging-light-copy",
    "description": "<p data-start=\"26\" data-end=\"292\">Bring warmth and natural elegance to your interiors with our Terra Bloom Raffia Pendant Light. Handcrafted with beautifully layered raffia detailing and flowing organic curves, this statement lighting piece creates a soft ambient glow and a refined boho aesthetic.</p>\n<p data-start=\"294\" data-end=\"453\">Perfect for dining areas, cafes, villas, resorts, and modern spaces, its earthy texture and sculptural form add a luxurious handcrafted charm to any setting.</p>\n<p data-start=\"455\" data-end=\"660\">• Handmade with premium raffia material<br data-start=\"494\" data-end=\"497\">• Elegant layered wave design<br data-start=\"526\" data-end=\"529\">• Warm ambient lighting effect<br data-start=\"559\" data-end=\"562\">• Perfect for homes, cafes, villas &amp; resorts<br data-start=\"606\" data-end=\"609\">• Lightweight, aesthetic &amp; timeless craftsmanship</p>\n<p data-start=\"662\" data-end=\"745\" data-is-last-node=\"\" data-is-only-node=\"\">• Care Instructions: Dust gently with a soft dry cloth and keep away from moisture.</p>\n<p><br><br></p>",
    "shortDescription": "Terra Bloom Raffia Pendant Light - Handcrafted luxury by Dori Handcrafts",
    "price": 2499,
    "compareAtPrice": 2999,
    "categorySlug": "hanging-lights",
    "categoryName": "hanging Lights",
    "SKU": "DORI-9333854535932",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "hanging lamp",
      "lights",
      "macrame"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1.jpg?v=1778607454",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_3.jpg?v=1778607454",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_1_1.jpg?v=1778607454",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_1.jpg?v=1778607454",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/6_2.jpg?v=1778607454",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/7_2.jpg?v=1778607454"
    ],
    "variants": [
      {
        "id": "49090522087676",
        "name": "Default Title",
        "price": 2499,
        "compareAtPrice": 2999,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9333849784572",
    "title": "Luna Aura Jute Hanging Light",
    "slug": "sage-bloom-jute-pendant-light-copy",
    "description": "<p>A handcrafted trio of cotton pendant lights in green and Ivory color – featuring two circular open-ring designs and one layered dome pendant for a modern, artistic touch.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Green &amp; Ivory</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>2 × Circular Ring + 1 × Layered Dome</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Ring: Diameter – 12”<br>Dome: Diameter – 15” | Height – 10”</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Metal Frame</td>\n</tr>\n<tr>\n<td><strong>Uses</strong></td>\n<td>Decoration &amp; Lighting</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>3 Pcs Set</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Luna Aura Jute Hanging Light - Handcrafted luxury by Dori Handcrafts",
    "price": 3999,
    "compareAtPrice": 4499,
    "categorySlug": "hanging-lights",
    "categoryName": "hanging Lights",
    "SKU": "DORI-9333849784572",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "hanging lamp",
      "lights",
      "macrame"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/new1.jpg?v=1778607262",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/new-2.jpg?v=1778607262",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/new-3.jpg?v=1778607262"
    ],
    "variants": [
      {
        "id": "49090489221372",
        "name": "Default Title",
        "price": 3999,
        "compareAtPrice": 4499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9333844508924",
    "title": "Sage Bloom Jute Pendant Light",
    "slug": "solara-wave-jute-hanging-light-copy",
    "description": "<p>A beautifully paired set of sculptural pendant lamps—featuring one single-layer and one double-layer handwoven cotton rope design. Their botanical, petal-inspired shapes bring natural elegance to modern, Japandi, and boho interiors.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Sage Green</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Single Bloom &amp; Double Bloom Combo</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Large (Double Layer): 22″ W × 16″ H<br>Small (Single Layer): 18″ W × 16″ H</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Cotton Rope with Metal Frame</td>\n</tr>\n<tr>\n<td><strong>Uses</strong></td>\n<td>Ambient Lighting, Decorative Hanging Light</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>Set of 2 Pieces</td>\n</tr>\n</tbody>\n</table>\n<p><br><br></p>",
    "shortDescription": "Sage Bloom Jute Pendant Light - Handcrafted luxury by Dori Handcrafts",
    "price": 3499,
    "compareAtPrice": 3999,
    "categorySlug": "hanging-lights",
    "categoryName": "hanging Lights",
    "SKU": "DORI-9333844508924",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "hanging lamp",
      "lights",
      "macrame"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/Untitled-15-1.jpg?v=1778607014",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/Untitled-16_1.jpg?v=1778607014",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/Untitled-15.jpg?v=1778607014",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/Untitled-16-1.jpg?v=1778607014",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/Untitled-17-1.jpg?v=1778607014"
    ],
    "variants": [
      {
        "id": "49090445705468",
        "name": "Default Title",
        "price": 3499,
        "compareAtPrice": 3999,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9333842804988",
    "title": "Solara Wave Jute Hanging Light",
    "slug": "solara-wave-jute-hanging-light",
    "description": "<p>A handcrafted asymmetric jute pendant lamp with a black ceiling mount, featuring an airy woven texture and warm ambient glow – ideal for boho, modern, or coastal spaces.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Natural Jute</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Asymmetric Wave</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Diameter: 18 inches<br>Height: 16 inches</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Jute Rope with Metal Frame</td>\n</tr>\n<tr>\n<td><strong>Uses</strong></td>\n<td>Decoration</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>1 Pcs</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Solara Wave Jute Hanging Light - Handcrafted luxury by Dori Handcrafts",
    "price": 1999,
    "compareAtPrice": 2199,
    "categorySlug": "hanging-lights",
    "categoryName": "hanging Lights",
    "SKU": "DORI-9333842804988",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "hanging lamp",
      "lights",
      "macrame"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/Untitled-3-4.jpg?v=1778606638",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/ChatGPT-Image-Aug-11-2025-12_56_46-PM.png?v=1778606638",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/ChatGPT-Image-Aug-11-2025-12_59_57-PM.png?v=1778606638",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/ChatGPT-Image-Aug-11-2025-12_59_12-PM.png?v=1778606638"
    ],
    "variants": [
      {
        "id": "49090437349628",
        "name": "Default Title",
        "price": 1999,
        "compareAtPrice": 2199,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9333837103356",
    "title": "Jute Handmade Ceiling Lamp",
    "slug": "jute-handmade-ceiling-lamp",
    "description": "<p>Add natural warmth and texture to your space with this handcrafted jute pendant lamp. Featuring a tapered design and soft ambient glow, it’s perfect for boho, rustic, or minimalist interiors.</p>\n<table>\n<tbody>\n<tr>\n<td><strong>Color</strong></td>\n<td>Brown</td>\n</tr>\n<tr>\n<td><strong>Shape</strong></td>\n<td>Tapered drum</td>\n</tr>\n<tr>\n<td><strong>Size</strong></td>\n<td>Diameter: 10 inches<br>Height: 16 inches</td>\n</tr>\n<tr>\n<td><strong>Material</strong></td>\n<td>Jute with Metal Frame</td>\n</tr>\n<tr>\n<td><strong>Uses</strong></td>\n<td>Decoration</td>\n</tr>\n<tr>\n<td><strong>Quantity</strong></td>\n<td>1 Pcs</td>\n</tr>\n</tbody>\n</table>",
    "shortDescription": "Jute Handmade Ceiling Lamp - Handcrafted luxury by Dori Handcrafts",
    "price": 1999,
    "compareAtPrice": 2999,
    "categorySlug": "hanging-lights",
    "categoryName": "hanging Lights",
    "SKU": "DORI-9333837103356",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/off-main.jpg?v=1778606177",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/main-2_1.jpg?v=1778606177",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/close-shot_2.jpg?v=1778606177",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/live-2_2.jpg?v=1778606177",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/upper-close.jpg?v=1778606259"
    ],
    "variants": [
      {
        "id": "49090397077756",
        "name": "Default Title",
        "price": 1999,
        "compareAtPrice": 2999,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332808843516",
    "title": "The Diamond Loom Macrame Tiered Hanger",
    "slug": "the-diamond-loom-macrame-tiered-hanger",
    "description": "<p data-path-to-node=\"4\">Maximize your vertical space with this unique, <b data-path-to-node=\"4\" data-index-in-node=\"47\">multi-level macrame plant hanger</b>. Featuring a stunning diamond-patterned weave on the upper support, this piece transitions into a dual-functional design: a <b data-path-to-node=\"4\" data-index-in-node=\"204\">solid wood floating shelf</b> for small pots and a classic <b data-path-to-node=\"4\" data-index-in-node=\"259\">knotted basket</b> below for a second planter.</p>\n<p data-path-to-node=\"5\">Suspended from a natural wooden ring and finished with a thick, hand-tied tassel, this creamy cotton hanger creates a beautiful \"floating\" effect. It is the perfect choice for narrow wall spaces, corners, or adding a layered, botanical look to your home decor.</p>",
    "shortDescription": "The Diamond Loom Macrame Tiered Hanger - Handcrafted luxury by Dori Handcrafts",
    "price": 1299,
    "compareAtPrice": 1499,
    "categorySlug": "wall-hanging-shelf",
    "categoryName": "wall hanging shelf",
    "SKU": "DORI-9332808843516",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "shelf",
      "storage",
      "wall hanging shelf"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_67c4fb2c-6d7a-409c-b2f4-56b83e61742d.png?v=1778546970",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_1517fbb2-e424-4a1e-b3d2-97fb5179cbfd.png?v=1778546970",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_132d53ba-c278-4042-959e-fd7f103772a5.png?v=1778546970",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_3649eeaa-213c-4559-bd08-d9a3964c625d.png?v=1778546970",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_62c91ef8-8eed-446f-954b-731c950d1cdb.png?v=1778546970"
    ],
    "variants": [
      {
        "id": "49085282681084",
        "name": "Default Title",
        "price": 1299,
        "compareAtPrice": 1499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332807532796",
    "title": "The Terracotta Flare Macrame Wall Shelf",
    "slug": "the-nordic-diamond-macrame-floating-shelf-copy",
    "description": "<p data-path-to-node=\"4\">Add a vibrant splash of color to your home with this stunning <b data-path-to-node=\"4\" data-index-in-node=\"62\">dual-tone macrame hanging shelf</b>. Featuring a beautiful contrast between natural cream cord and rich <b data-path-to-node=\"4\" data-index-in-node=\"162\">terracotta-orange accents</b>, this piece is designed to be both a work of art and a practical storage solution.</p>\n<p data-path-to-node=\"5\">The intricate open-weave knotting leads down to a <b data-path-to-node=\"5\" data-index-in-node=\"50\">sturdy wooden platform</b>, perfect for showcasing your favorite houseplants, candles, or decorative jars. Hand-finished with a long, elegant fringe and braided hanging supports, it brings a warm, earthy energy to any bedroom, balcony, or living area.</p>",
    "shortDescription": "The Terracotta Flare Macrame Wall Shelf - Handcrafted luxury by Dori Handcrafts",
    "price": 849,
    "compareAtPrice": 1199,
    "categorySlug": "wall-hanging-shelf",
    "categoryName": "wall hanging shelf",
    "SKU": "DORI-9332807532796",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "shelf",
      "wall hanging shelf"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_73afccf3-b189-4af7-b505-50af09345ae6.png?v=1778546700",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_87b22ffe-dadf-46a1-8783-698fda3d96b7.png?v=1778546700",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_3c46f2aa-1221-4536-bac9-81e150dc814d.png?v=1778546700",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_7538d94a-0ce3-412d-b6d9-f4fd2d486de8.png?v=1778546700",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_62ede141-e964-425d-bc3d-fbcbef6234db.png?v=1778546700"
    ],
    "variants": [
      {
        "id": "49085240574204",
        "name": "Default Title",
        "price": 849,
        "compareAtPrice": 1199,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332807303420",
    "title": "The Nordic Diamond Macrame Floating Shelf",
    "slug": "the-nordic-diamond-macrame-floating-shelf",
    "description": "<p data-path-to-node=\"4\">Bring functional artistry to your walls with this stunning <b data-path-to-node=\"4\" data-index-in-node=\"59\">hand-knotted macrame shelf</b>. Crafted from premium off-white cotton cord, it features a central large diamond motif flanked by intricate geometric patterns and elegant braided supports.</p>\n<p data-path-to-node=\"5\">The integrated <b data-path-to-node=\"5\" data-index-in-node=\"15\">natural wood floating shelf</b> is perfect for displaying small succulents, indoor plants, or cherished keepsakes. Finished with a delicate fringed hem, this versatile piece blends <b data-path-to-node=\"5\" data-index-in-node=\"192\">modern storage</b> with timeless bohemian craft, making it an ideal accent for a minimalist living room, cozy nursery, or creative workspace.</p>",
    "shortDescription": "The Nordic Diamond Macrame Floating Shelf - Handcrafted luxury by Dori Handcrafts",
    "price": 1799,
    "compareAtPrice": 1999,
    "categorySlug": "wall-hanging-shelf",
    "categoryName": "wall hanging shelf",
    "SKU": "DORI-9332807303420",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "shelf",
      "wall hanging shelf"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_a04d8bd2-0dd4-44fe-9aa4-876b7dc87d80.png?v=1778546232",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_89aa0ec1-56de-46b2-865e-29b7ffdc665b.png?v=1778546232",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_453205ed-3c6c-4fa3-a26d-d33f594cdc5c.png?v=1778546233",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_94448083-ac1d-4049-a056-53ceb865e5e5.png?v=1778546232",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_03d736ba-0c94-4bff-a975-50f73a1d4db0.png?v=1778546232"
    ],
    "variants": [
      {
        "id": "49085236609276",
        "name": "Default Title",
        "price": 1799,
        "compareAtPrice": 1999,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332805140732",
    "title": "The Bohemian V-Cascade Macrame Wall Hanging",
    "slug": "the-bohemian-v-cascade-macrame-wall-hanging",
    "description": "<p data-path-to-node=\"4\">Elevate your living space with this exquisite, handcrafted macrame wall art. Featuring a sophisticated <b data-path-to-node=\"4\" data-index-in-node=\"103\">dual-tone palette</b> of cream and toasted almond, this piece showcases intricate <b data-path-to-node=\"4\" data-index-in-node=\"181\">geometric knotting</b> and a striking V-shaped silhouette.</p>\n<p data-path-to-node=\"5\">Adorned with <b data-path-to-node=\"5\" data-index-in-node=\"13\">lush, oversized tassels</b> and delicate braided detailing, it is suspended from a natural wooden dowel to bring a warm, organic texture to any room. Perfect for adding a touch of modern bohemian elegance to your bedroom, lounge, or entryway.</p>",
    "shortDescription": "The Bohemian V-Cascade Macrame Wall Hanging - Handcrafted luxury by Dori Handcrafts",
    "price": 1799,
    "compareAtPrice": 1999,
    "categorySlug": "wall-hanging",
    "categoryName": "wall hanging",
    "SKU": "DORI-9332805140732",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_d2b9b6da-9fc7-4d90-b73f-6f168c93205f.png?v=1778545712",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_66f18ee6-af52-406f-bc2b-e2159daa3968.png?v=1778545712",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_b11c23cb-ac32-4c4c-a2ab-9c78d173d423.png?v=1778545713",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_2983ab11-6635-4f3f-8e9f-7143efb70c75.png?v=1778545712",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_39bb96c5-da6c-4546-b09f-7df4d92e4331.png?v=1778545712"
    ],
    "variants": [
      {
        "id": "49085219209468",
        "name": "Default Title",
        "price": 1799,
        "compareAtPrice": 1999,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332544504060",
    "title": "Macrame Magazine Holder",
    "slug": "macrame-magazine-holder",
    "description": "<p data-path-to-node=\"1\"><b data-path-to-node=\"1\" data-index-in-node=\"0\">Keep your space organized with a touch of artisanal charm.</b> This handcrafted magazine rack features intricate, hand-knotted cream cotton cord on a sturdy, collapsible natural wood frame. Perfect for holding your favorite journals, tabloids, or books, its compact \"X\" design blends seamlessly into any boho, rustic, or modern interior.</p>\n<ul data-path-to-node=\"2\">\n<li>\n<p data-path-to-node=\"2,0,0\"><b data-path-to-node=\"2,0,0\" data-index-in-node=\"0\">Materials:</b> Natural wood &amp; 100% cotton cord.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,1,0\"><b data-path-to-node=\"2,1,0\" data-index-in-node=\"0\">Design:</b> Foldable for easy storage and space-saving.</p>\n</li>\n<li>\n<p data-path-to-node=\"2,2,0\"><b data-path-to-node=\"2,2,0\" data-index-in-node=\"0\">Style:</b> Hand-woven textures for a cozy, organic feel.</p>\n</li>\n</ul>",
    "shortDescription": "Macrame Magazine Holder - Handcrafted luxury by Dori Handcrafts",
    "price": 1199,
    "compareAtPrice": 1499,
    "categorySlug": "storage",
    "categoryName": "storage",
    "SKU": "DORI-9332544504060",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "magazine holder"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_57f750e1-5b96-41ae-9075-3775f6988432.png?v=1778511217",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_39dfcf58-1e11-498a-a5f9-75835b3d2d74.png?v=1778511217",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_7ead7639-b971-4749-a61b-6aabf661f468.png?v=1778511217",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_8b1a819e-5c42-41b8-95c7-b4849ddb0072.png?v=1778511217"
    ],
    "variants": [
      {
        "id": "49084130590972",
        "name": "Default Title",
        "price": 1199,
        "compareAtPrice": 1499,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332543521020",
    "title": "Macrame Storage Boxes set of 2",
    "slug": "macrame-storage-boxes-set-of-2",
    "description": "<p data-start=\"86\" data-end=\"321\">Organize your space beautifully with our handcrafted Dusty Sage Macrame Storage Basket Set. Designed with intricate geometric knot detailing and elegant wooden handles, these baskets combine functionality with modern boho aesthetics.</p>\n<p data-start=\"323\" data-end=\"505\">Perfect for organizing dining essentials, toiletries, accessories, magazines, or decor items, they add a warm handcrafted touch to homes, cafes, villas, and contemporary interiors.</p>\n<p data-start=\"507\" data-end=\"646\">Handwoven by skilled women artisans using premium cotton cords, this versatile basket set is both stylish and practical for everyday use.</p>\n<p data-start=\"648\" data-end=\"867\">• Handmade with premium cotton cord<br data-start=\"683\" data-end=\"686\">• Elegant geometric macramé detailing<br data-start=\"723\" data-end=\"726\">• Wooden handles for easy carrying<br data-start=\"760\" data-end=\"763\">• Ideal for storage, styling &amp; table organization<br data-start=\"812\" data-end=\"815\">• Perfect for homes, cafes, villas &amp; Airbnb spaces</p>\n<p data-start=\"869\" data-end=\"925\" data-is-last-node=\"\" data-is-only-node=\"\">• Care Instructions: Spot clean gently and dry in shade.</p>",
    "shortDescription": "Macrame Storage Boxes set of 2 - Handcrafted luxury by Dori Handcrafts",
    "price": 1299,
    "compareAtPrice": null,
    "categorySlug": "storage",
    "categoryName": "storage",
    "SKU": "DORI-9332543521020",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "cushion cover",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "macrame",
      "storage",
      "storage box"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_671fde23-f89d-4133-bb31-67b2f9c92946.png?v=1778510821",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_530c9ed0-4f13-47aa-a36d-7126c84f2250.png?v=1778510820",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_e4baf317-d007-4fc2-ae70-c50a9696184f.png?v=1778510820",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_84397215-bee4-4369-8f05-5f0d789b8671.png?v=1778510820"
    ],
    "variants": [
      {
        "id": "49084123087100",
        "name": "Default Title",
        "price": 1299,
        "compareAtPrice": null,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332537458940",
    "title": "Weave Macrame Table Runner",
    "slug": "serene-weave-macrame-table-runner-copy",
    "description": "<div class=\"\" data-turn-id-container=\"request-69ff5884-46c0-8323-8577-e932338da8d0-5\" data-is-intersecting=\"true\">\n<div class=\"relative w-full overflow-visible\">\n<section class=\"text-token-text-primary w-full focus:outline-none [--shadow-height:45px] has-data-writing-block:pointer-events-none has-data-writing-block:-mt-(--shadow-height) has-data-writing-block:pt-(--shadow-height) [&amp;:has([data-writing-block])&gt;*]:pointer-events-auto R6Vx5W_threadScrollVars scroll-mb-[calc(var(--scroll-root-safe-area-inset-bottom,0px)+var(--thread-response-height))] scroll-mt-[calc(var(--header-height)+min(200px,max(70px,20svh)))]\" dir=\"auto\" data-turn-id=\"request-69ff5884-46c0-8323-8577-e932338da8d0-5\" data-turn-id-container=\"request-69ff5884-46c0-8323-8577-e932338da8d0-5\" data-testid=\"conversation-turn-26\" data-scroll-anchor=\"false\" data-turn=\"assistant\">\n<div class=\"text-base my-auto mx-auto pb-10 [--thread-content-margin:var(--thread-content-margin-xs,calc(var(--spacing)*4))] @w-sm/main:[--thread-content-margin:var(--thread-content-margin-sm,calc(var(--spacing)*6))] @w-lg/main:[--thread-content-margin:var(--thread-content-margin-lg,calc(var(--spacing)*16))] px-(--thread-content-margin)\">\n<div class=\"[--thread-content-max-width:40rem] @w-lg/main:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1 group/turn-messages focus-visible:outline-hidden relative flex w-full min-w-0 flex-col agent-turn\">\n<div class=\"flex max-w-full flex-col gap-4 grow\">\n<div data-message-author-role=\"assistant\" data-message-id=\"93a8340b-8366-4fa5-a6a6-965954268a2f\" dir=\"auto\" data-message-model-slug=\"gpt-5-5\" class=\"min-h-8 text-message relative flex w-full flex-col items-end gap-2 text-start break-words whitespace-normal outline-none keyboard-focused:focus-ring [.text-message+&amp;]:mt-1\" data-turn-start-message=\"true\" tabindex=\"0\">\n<div class=\"flex w-full flex-col gap-1 empty:hidden\">\n<div class=\"markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling\">\n<p data-start=\"76\" data-end=\"341\">Add a warm and elegant handcrafted touch to your space with our Aurora Macrame Table Runner. Featuring <strong>intricate geometric knot detailing and soft fringe accents</strong>, this piece is designed to elevate <strong>dining tables, coffee tables, cafes, villas, and modern interiors.</strong></p>\n<p data-start=\"343\" data-end=\"481\">Handwoven using <strong>premium cotton cords by skilled women artisans,</strong> it blends beautifully with boho, minimal, and contemporary decor styles.</p>\n<p data-start=\"483\" data-end=\"656\">• Handmade with premium cotton cord<br data-start=\"518\" data-end=\"521\">• Elegant geometric macrame design<br data-start=\"555\" data-end=\"558\">• Perfect for homes, cafes, villas &amp; Airbnb spaces<br data-start=\"608\" data-end=\"611\">• Soft, durable &amp; sustainable craftsmanship</p>\n<p data-start=\"658\" data-end=\"733\" data-is-last-node=\"\" data-is-only-node=\"\">• Care Instructions: Hand wash <strong>gently with mild detergent</strong> and dry in shade.</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</section>\n<div class=\"contents\"><br></div>\n</div>\n</div>",
    "shortDescription": "Weave Macrame Table Runner - Handcrafted luxury by Dori Handcrafts",
    "price": 1999,
    "compareAtPrice": 2599,
    "categorySlug": "table-runner",
    "categoryName": "table runner",
    "SKU": "DORI-9332537458940",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "macrame",
      "matt",
      "table matt",
      "table runner"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_12cbf869-8f48-424e-b143-da9108cd6762.png?v=1778509488",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_68edbd51-2ad6-4d87-9fce-39f4e2cf97e1.png?v=1778509488",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_c2f81061-e9df-4fad-b27d-647cd8e986e0.png?v=1778509488",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_35febdb2-cff8-4246-b7da-999f095e05bb.png?v=1778509488"
    ],
    "variants": [
      {
        "id": "49084070035708",
        "name": "Default Title",
        "price": 1999,
        "compareAtPrice": 2599,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332537131260",
    "title": "Serene Weave Macramé Table Runner",
    "slug": "aurora-macrame-table-runner-copy",
    "description": "<div class=\"\" data-turn-id-container=\"request-69ff5884-46c0-8323-8577-e932338da8d0-5\" data-is-intersecting=\"true\">\n<div class=\"relative w-full overflow-visible\">\n<section class=\"text-token-text-primary w-full focus:outline-none [--shadow-height:45px] has-data-writing-block:pointer-events-none has-data-writing-block:-mt-(--shadow-height) has-data-writing-block:pt-(--shadow-height) [&amp;:has([data-writing-block])&gt;*]:pointer-events-auto R6Vx5W_threadScrollVars scroll-mb-[calc(var(--scroll-root-safe-area-inset-bottom,0px)+var(--thread-response-height))] scroll-mt-[calc(var(--header-height)+min(200px,max(70px,20svh)))]\" dir=\"auto\" data-turn-id=\"request-69ff5884-46c0-8323-8577-e932338da8d0-5\" data-turn-id-container=\"request-69ff5884-46c0-8323-8577-e932338da8d0-5\" data-testid=\"conversation-turn-26\" data-scroll-anchor=\"false\" data-turn=\"assistant\">\n<div class=\"text-base my-auto mx-auto pb-10 [--thread-content-margin:var(--thread-content-margin-xs,calc(var(--spacing)*4))] @w-sm/main:[--thread-content-margin:var(--thread-content-margin-sm,calc(var(--spacing)*6))] @w-lg/main:[--thread-content-margin:var(--thread-content-margin-lg,calc(var(--spacing)*16))] px-(--thread-content-margin)\">\n<div class=\"[--thread-content-max-width:40rem] @w-lg/main:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1 group/turn-messages focus-visible:outline-hidden relative flex w-full min-w-0 flex-col agent-turn\">\n<div class=\"flex max-w-full flex-col gap-4 grow\">\n<div data-message-author-role=\"assistant\" data-message-id=\"93a8340b-8366-4fa5-a6a6-965954268a2f\" dir=\"auto\" data-message-model-slug=\"gpt-5-5\" class=\"min-h-8 text-message relative flex w-full flex-col items-end gap-2 text-start break-words whitespace-normal outline-none keyboard-focused:focus-ring [.text-message+&amp;]:mt-1\" data-turn-start-message=\"true\" tabindex=\"0\">\n<div class=\"flex w-full flex-col gap-1 empty:hidden\">\n<div class=\"markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling\">\n<p data-start=\"76\" data-end=\"341\">Add a warm and elegant handcrafted touch to your space with our Aurora Macrame Table Runner. Featuring <strong>intricate geometric knot detailing and soft fringe accents</strong>, this piece is designed to elevate <strong>dining tables, coffee tables, cafes, villas, and modern interiors.</strong></p>\n<p data-start=\"343\" data-end=\"481\">Handwoven using <strong>premium cotton cords by skilled women artisans,</strong> it blends beautifully with boho, minimal, and contemporary decor styles.</p>\n<p data-start=\"483\" data-end=\"656\">• Handmade with premium cotton cord<br data-start=\"518\" data-end=\"521\">• Elegant geometric macrame design<br data-start=\"555\" data-end=\"558\">• Perfect for homes, cafes, villas &amp; Airbnb spaces<br data-start=\"608\" data-end=\"611\">• Soft, durable &amp; sustainable craftsmanship</p>\n<p data-start=\"658\" data-end=\"733\" data-is-last-node=\"\" data-is-only-node=\"\">• Care Instructions: Hand wash <strong>gently with mild detergent</strong> and dry in shade.</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</section>\n<div class=\"contents\"><br></div>\n</div>\n</div>",
    "shortDescription": "Serene Weave Macramé Table Runner - Handcrafted luxury by Dori Handcrafts",
    "price": 1999,
    "compareAtPrice": 2599,
    "categorySlug": "table-runner",
    "categoryName": "table runner",
    "SKU": "DORI-9332537131260",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "macrame",
      "matt",
      "table matt",
      "table runner"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_627456de-6ef7-404c-b26c-df74e24b44dd.png?v=1778509058",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_1c6aae07-a3b6-49b2-9157-6545aa553f99.png?v=1778509058",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_99e83d6f-480e-4577-8d03-9aa2cae3aba3.png?v=1778509058",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_0913c35e-701f-4aaa-b4b2-7a6dc3232be7.png?v=1778509058"
    ],
    "variants": [
      {
        "id": "49084069380348",
        "name": "Default Title",
        "price": 1999,
        "compareAtPrice": 2599,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332537098492",
    "title": "Aurora Macrame Table Runner",
    "slug": "aurora-macrame-table-runner",
    "description": "<div class=\"\" data-turn-id-container=\"request-69ff5884-46c0-8323-8577-e932338da8d0-5\" data-is-intersecting=\"true\">\n<div class=\"relative w-full overflow-visible\">\n<section class=\"text-token-text-primary w-full focus:outline-none [--shadow-height:45px] has-data-writing-block:pointer-events-none has-data-writing-block:-mt-(--shadow-height) has-data-writing-block:pt-(--shadow-height) [&amp;:has([data-writing-block])&gt;*]:pointer-events-auto R6Vx5W_threadScrollVars scroll-mb-[calc(var(--scroll-root-safe-area-inset-bottom,0px)+var(--thread-response-height))] scroll-mt-[calc(var(--header-height)+min(200px,max(70px,20svh)))]\" dir=\"auto\" data-turn-id=\"request-69ff5884-46c0-8323-8577-e932338da8d0-5\" data-turn-id-container=\"request-69ff5884-46c0-8323-8577-e932338da8d0-5\" data-testid=\"conversation-turn-26\" data-scroll-anchor=\"false\" data-turn=\"assistant\">\n<div class=\"text-base my-auto mx-auto pb-10 [--thread-content-margin:var(--thread-content-margin-xs,calc(var(--spacing)*4))] @w-sm/main:[--thread-content-margin:var(--thread-content-margin-sm,calc(var(--spacing)*6))] @w-lg/main:[--thread-content-margin:var(--thread-content-margin-lg,calc(var(--spacing)*16))] px-(--thread-content-margin)\">\n<div class=\"[--thread-content-max-width:40rem] @w-lg/main:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1 group/turn-messages focus-visible:outline-hidden relative flex w-full min-w-0 flex-col agent-turn\">\n<div class=\"flex max-w-full flex-col gap-4 grow\">\n<div data-message-author-role=\"assistant\" data-message-id=\"93a8340b-8366-4fa5-a6a6-965954268a2f\" dir=\"auto\" data-message-model-slug=\"gpt-5-5\" class=\"min-h-8 text-message relative flex w-full flex-col items-end gap-2 text-start break-words whitespace-normal outline-none keyboard-focused:focus-ring [.text-message+&amp;]:mt-1\" data-turn-start-message=\"true\" tabindex=\"0\">\n<div class=\"flex w-full flex-col gap-1 empty:hidden\">\n<div class=\"markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling\">\n<p data-start=\"76\" data-end=\"341\">Add a warm and elegant handcrafted touch to your space with our Aurora Macrame Table Runner. Featuring <strong>intricate geometric knot detailing and soft fringe accents</strong>, this piece is designed to elevate <strong>dining tables, coffee tables, cafes, villas, and modern interiors.</strong></p>\n<p data-start=\"343\" data-end=\"481\">Handwoven using <strong>premium cotton cords by skilled women artisans,</strong> it blends beautifully with boho, minimal, and contemporary decor styles.</p>\n<p data-start=\"483\" data-end=\"656\">• Handmade with premium cotton cord<br data-start=\"518\" data-end=\"521\">• Elegant geometric macrame design<br data-start=\"555\" data-end=\"558\">• Perfect for homes, cafes, villas &amp; Airbnb spaces<br data-start=\"608\" data-end=\"611\">• Soft, durable &amp; sustainable craftsmanship</p>\n<p data-start=\"658\" data-end=\"733\" data-is-last-node=\"\" data-is-only-node=\"\">• Care Instructions: Hand wash <strong>gently with mild detergent</strong> and dry in shade.</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</section>\n<div class=\"contents\"><br></div>\n</div>\n</div>",
    "shortDescription": "Aurora Macrame Table Runner - Handcrafted luxury by Dori Handcrafts",
    "price": 1999,
    "compareAtPrice": 2599,
    "categorySlug": "table-runner",
    "categoryName": "table runner",
    "SKU": "DORI-9332537098492",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "dinning setup",
      "dori handcrafts",
      "handmade",
      "macrame",
      "matt",
      "table matt",
      "table runner"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_d1bbc146-45f0-443c-8a67-cd61da70ca9a.png?v=1778508572",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_c52d3e0f-4ba8-46ee-9cce-611fa19ab60f.png?v=1778508571",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_f0096d68-4ba3-4144-95dc-9dafa6131edd.png?v=1778508571",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_86cf8c12-647e-4df1-a745-51a09abe7935.png?v=1778508571",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_d1c5a480-b889-4ead-a2db-93993132fc08.png?v=1778508571"
    ],
    "variants": [
      {
        "id": "49084069347580",
        "name": "Default Title",
        "price": 1999,
        "compareAtPrice": 2599,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332536312060",
    "title": "Purple Macrame Cushion Cover",
    "slug": "brown-macrame-cushion-cover-copy",
    "description": "<p data-start=\"0\" data-end=\"335\">Bring warmth and handcrafted elegance to your space with our premium Macrame Cushion Cover, thoughtfully handmade by skilled women artisans. Designed with<strong> intricate knot detailing and a timeless boho aesthetic,</strong> this piece adds texture, comfort, and a luxurious handcrafted touch to <strong>sofas, chairs, cafes, villas, and modern interiors.</strong></p>\n<p data-start=\"337\" data-end=\"535\">Crafted using <strong>high-quality cotton cord</strong> in earthy neutral tones, it blends beautifully with contemporary, rustic, and minimalist decor styles. Perfect for creating cozy and Instagram-worthy spaces.</p>\n<p data-start=\"537\" data-end=\"732\">• Handmade with premium cotton cord<br data-start=\"572\" data-end=\"575\">• Elegant boho &amp; modern aesthetic<br data-start=\"608\" data-end=\"611\">• Soft, durable &amp; sustainable craftsmanship<br data-start=\"654\" data-end=\"657\">• Ideal for homes, cafes, villas &amp; Airbnb spaces<br data-start=\"705\" data-end=\"708\">• Size: <strong>16 × 16 inches</strong></p>\n<p data-start=\"734\" data-end=\"810\" data-is-last-node=\"\" data-is-only-node=\"\">A statement piece that transforms any corner into a warm and artistic space.</p>",
    "shortDescription": "Purple Macrame Cushion Cover - Handcrafted luxury by Dori Handcrafts",
    "price": 849,
    "compareAtPrice": 1049,
    "categorySlug": "cushion-cover",
    "categoryName": "cushion cover",
    "SKU": "DORI-9332536312060",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "pillow"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_b79d9d53-41af-4f45-b00b-3a24c449b0f4.png?v=1778507880",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_3b050f43-0480-45ec-a7bc-1a3d731089ae.png?v=1778507880",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_3ee67869-9b68-48f1-9d4a-80bf8b8aac38.png?v=1778507880",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_dddeb564-5c60-4446-b172-490e135f9236.png?v=1778507880"
    ],
    "variants": [
      {
        "id": "49084064268540",
        "name": "Default Title",
        "price": 849,
        "compareAtPrice": 1049,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332536148220",
    "title": "Brown Macrame Cushion Cover",
    "slug": "black-macrame-cushion-cover-copy",
    "description": "<p data-start=\"0\" data-end=\"335\">Bring warmth and handcrafted elegance to your space with our premium Macrame Cushion Cover, thoughtfully handmade by skilled women artisans. Designed with<strong> intricate knot detailing and a timeless boho aesthetic,</strong> this piece adds texture, comfort, and a luxurious handcrafted touch to <strong>sofas, chairs, cafes, villas, and modern interiors.</strong></p>\n<p data-start=\"337\" data-end=\"535\">Crafted using <strong>high-quality cotton cord</strong> in earthy neutral tones, it blends beautifully with contemporary, rustic, and minimalist decor styles. Perfect for creating cozy and Instagram-worthy spaces.</p>\n<p data-start=\"537\" data-end=\"732\">• Handmade with premium cotton cord<br data-start=\"572\" data-end=\"575\">• Elegant boho &amp; modern aesthetic<br data-start=\"608\" data-end=\"611\">• Soft, durable &amp; sustainable craftsmanship<br data-start=\"654\" data-end=\"657\">• Ideal for homes, cafes, villas &amp; Airbnb spaces<br data-start=\"705\" data-end=\"708\">• Size: <strong>16 × 16 inches</strong></p>\n<p data-start=\"734\" data-end=\"810\" data-is-last-node=\"\" data-is-only-node=\"\">A statement piece that transforms any corner into a warm and artistic space.</p>",
    "shortDescription": "Brown Macrame Cushion Cover - Handcrafted luxury by Dori Handcrafts",
    "price": 849,
    "compareAtPrice": 1049,
    "categorySlug": "cushion-cover",
    "categoryName": "cushion cover",
    "SKU": "DORI-9332536148220",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "pillow"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_ae7955e3-b091-4e1f-aa94-c52865e37681.png?v=1778507723",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_91fb956d-8140-413c-9416-0948a04759c8.png?v=1778507722",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_c2a65389-3781-41df-9ad3-0587df6d958c.png?v=1778507722",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_4608b817-5990-4ff2-acf4-f17e4219466d.png?v=1778507723",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/yellow-macrame-cushion-cover.png?v=1778548380"
    ],
    "variants": [
      {
        "id": "49084063777020",
        "name": "Default Title",
        "price": 849,
        "compareAtPrice": 1049,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332535984380",
    "title": "Black Macrame Cushion Cover",
    "slug": "snow-white-macrame-cushion-cover-copy",
    "description": "<p data-start=\"0\" data-end=\"335\">Bring warmth and handcrafted elegance to your space with our premium Macrame Cushion Cover, thoughtfully handmade by skilled women artisans. Designed with<strong> intricate knot detailing and a timeless boho aesthetic,</strong> this piece adds texture, comfort, and a luxurious handcrafted touch to <strong>sofas, chairs, cafes, villas, and modern interiors.</strong></p>\n<p data-start=\"337\" data-end=\"535\">Crafted using <strong>high-quality cotton cord</strong> in earthy neutral tones, it blends beautifully with contemporary, rustic, and minimalist decor styles. Perfect for creating cozy and Instagram-worthy spaces.</p>\n<p data-start=\"537\" data-end=\"732\">• Handmade with premium cotton cord<br data-start=\"572\" data-end=\"575\">• Elegant boho &amp; modern aesthetic<br data-start=\"608\" data-end=\"611\">• Soft, durable &amp; sustainable craftsmanship<br data-start=\"654\" data-end=\"657\">• Ideal for homes, cafes, villas &amp; Airbnb spaces<br data-start=\"705\" data-end=\"708\">• Size: <strong>16 × 16 inches</strong></p>\n<p data-start=\"734\" data-end=\"810\" data-is-last-node=\"\" data-is-only-node=\"\">A statement piece that transforms any corner into a warm and artistic space.</p>",
    "shortDescription": "Black Macrame Cushion Cover - Handcrafted luxury by Dori Handcrafts",
    "price": 849,
    "compareAtPrice": 1049,
    "categorySlug": "cushion-cover",
    "categoryName": "cushion cover",
    "SKU": "DORI-9332535984380",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "pillow"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_d8ba88ef-8719-4ef5-8a0f-46e8d44f21bd.png?v=1778507652",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_840105c1-8eb2-4864-9b26-563baf2d508c.png?v=1778507652",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_7eaa626a-f51b-485c-a5f5-86cbb9411e9d.png?v=1778507653",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_737d9fc7-efde-4658-94ba-278e97ff57cc.png?v=1778507654"
    ],
    "variants": [
      {
        "id": "49084051095804",
        "name": "Default Title",
        "price": 849,
        "compareAtPrice": 1049,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332534935804",
    "title": "Snow White Macrame Cushion Cover",
    "slug": "baby-pink-macrame-cushion-cover",
    "description": "<p data-start=\"0\" data-end=\"335\">Bring warmth and handcrafted elegance to your space with our premium Macrame Cushion Cover, thoughtfully handmade by skilled women artisans. Designed with<strong> intricate knot detailing and a timeless boho aesthetic,</strong> this piece adds texture, comfort, and a luxurious handcrafted touch to <strong>sofas, chairs, cafes, villas, and modern interiors.</strong></p>\n<p data-start=\"337\" data-end=\"535\">Crafted using <strong>high-quality cotton cord</strong> in earthy neutral tones, it blends beautifully with contemporary, rustic, and minimalist decor styles. Perfect for creating cozy and Instagram-worthy spaces.</p>\n<p data-start=\"537\" data-end=\"732\">• Handmade with premium cotton cord<br data-start=\"572\" data-end=\"575\">• Elegant boho &amp; modern aesthetic<br data-start=\"608\" data-end=\"611\">• Soft, durable &amp; sustainable craftsmanship<br data-start=\"654\" data-end=\"657\">• Ideal for homes, cafes, villas &amp; Airbnb spaces<br data-start=\"705\" data-end=\"708\">• Size: <strong>16 × 16 inches</strong></p>\n<p data-start=\"734\" data-end=\"810\" data-is-last-node=\"\" data-is-only-node=\"\">A statement piece that transforms any corner into a warm and artistic space.</p>",
    "shortDescription": "Snow White Macrame Cushion Cover - Handcrafted luxury by Dori Handcrafts",
    "price": 849,
    "compareAtPrice": 1049,
    "categorySlug": "cushion-cover",
    "categoryName": "cushion cover",
    "SKU": "DORI-9332534935804",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "pillow"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_732420eb-3459-4f2f-92d1-c1dc4787e1ce.png?v=1778507581",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_e5cbe7e8-d527-4df4-a231-53ce44dd4109.png?v=1778507581",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_a1a7339d-62c0-4491-9c77-c35e2a671bd1.png?v=1778507584",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_68e9cee3-3ef8-4938-aefd-e559cbf3d9d6.png?v=1778507581"
    ],
    "variants": [
      {
        "id": "49084047327484",
        "name": "Default Title",
        "price": 849,
        "compareAtPrice": 1049,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332534837500",
    "title": "Baby Pink Macrame Cushion Cover",
    "slug": "dusty-sage-macrame-cushion-cover-copy",
    "description": "<p data-start=\"0\" data-end=\"335\">Bring warmth and handcrafted elegance to your space with our premium Macrame Cushion Cover, thoughtfully handmade by skilled women artisans. Designed with<strong> intricate knot detailing and a timeless boho aesthetic,</strong> this piece adds texture, comfort, and a luxurious handcrafted touch to <strong>sofas, chairs, cafes, villas, and modern interiors.</strong></p>\n<p data-start=\"337\" data-end=\"535\">Crafted using <strong>high-quality cotton cord</strong> in earthy neutral tones, it blends beautifully with contemporary, rustic, and minimalist decor styles. Perfect for creating cozy and Instagram-worthy spaces.</p>\n<p data-start=\"537\" data-end=\"732\">• Handmade with premium cotton cord<br data-start=\"572\" data-end=\"575\">• Elegant boho &amp; modern aesthetic<br data-start=\"608\" data-end=\"611\">• Soft, durable &amp; sustainable craftsmanship<br data-start=\"654\" data-end=\"657\">• Ideal for homes, cafes, villas &amp; Airbnb spaces<br data-start=\"705\" data-end=\"708\">• Size: <strong>16 × 16 inches</strong></p>\n<p data-start=\"734\" data-end=\"810\" data-is-last-node=\"\" data-is-only-node=\"\">A statement piece that transforms any corner into a warm and artistic space.</p>",
    "shortDescription": "Baby Pink Macrame Cushion Cover - Handcrafted luxury by Dori Handcrafts",
    "price": 849,
    "compareAtPrice": 1049,
    "categorySlug": "cushion-cover",
    "categoryName": "cushion cover",
    "SKU": "DORI-9332534837500",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "pillow"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_824b7a9d-1479-4b42-a70d-3deca0c2bcc9.png?v=1778507487",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_1cdb6b51-3ad5-4e31-b58a-367c87c84e24.png?v=1778507487",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_87d67fe7-62e0-4048-8f3a-d6e82eab58fa.png?v=1778507487",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_a59ddb17-1bac-4929-b9c0-7ea889d94920.png?v=1778507487"
    ],
    "variants": [
      {
        "id": "49084047098108",
        "name": "Default Title",
        "price": 849,
        "compareAtPrice": 1049,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332534509820",
    "title": "Dusty Sage Macrame Cushion Cover",
    "slug": "pink-macrame-cushion-cover-copy",
    "description": "<p data-start=\"0\" data-end=\"335\">Bring warmth and handcrafted elegance to your space with our premium Macrame Cushion Cover, thoughtfully handmade by skilled women artisans. Designed with<strong> intricate knot detailing and a timeless boho aesthetic,</strong> this piece adds texture, comfort, and a luxurious handcrafted touch to <strong>sofas, chairs, cafes, villas, and modern interiors.</strong></p>\n<p data-start=\"337\" data-end=\"535\">Crafted using <strong>high-quality cotton cord</strong> in earthy neutral tones, it blends beautifully with contemporary, rustic, and minimalist decor styles. Perfect for creating cozy and Instagram-worthy spaces.</p>\n<p data-start=\"537\" data-end=\"732\">• Handmade with premium cotton cord<br data-start=\"572\" data-end=\"575\">• Elegant boho &amp; modern aesthetic<br data-start=\"608\" data-end=\"611\">• Soft, durable &amp; sustainable craftsmanship<br data-start=\"654\" data-end=\"657\">• Ideal for homes, cafes, villas &amp; Airbnb spaces<br data-start=\"705\" data-end=\"708\">• Size: <strong>16 × 16 inches</strong></p>\n<p data-start=\"734\" data-end=\"810\" data-is-last-node=\"\" data-is-only-node=\"\">A statement piece that transforms any corner into a warm and artistic space.</p>",
    "shortDescription": "Dusty Sage Macrame Cushion Cover - Handcrafted luxury by Dori Handcrafts",
    "price": 849,
    "compareAtPrice": 1049,
    "categorySlug": "cushion-cover",
    "categoryName": "cushion cover",
    "SKU": "DORI-9332534509820",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "pillow"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_92b9886d-e1fb-4775-b81f-b689de100877.png?v=1778507315",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_db5add6d-8b1c-416d-a889-d18a824bf912.png?v=1778507315",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_054b0452-3b49-4d47-949a-f07255d6b17d.png?v=1778507314",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_45bcfaef-5072-4a63-956a-5974f5a8a341.png?v=1778507315",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_f3a6a92a-c3b7-45fb-bf40-c0a5cf0d8f5f.png?v=1778507314"
    ],
    "variants": [
      {
        "id": "49084046344444",
        "name": "Default Title",
        "price": 849,
        "compareAtPrice": 1049,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332534411516",
    "title": "Pink Macrame Cushion Cover",
    "slug": "pink-macrame-cushion-cover",
    "description": "<p data-start=\"0\" data-end=\"335\">Bring warmth and handcrafted elegance to your space with our premium Macrame Cushion Cover, thoughtfully handmade by skilled women artisans. Designed with<strong> intricate knot detailing and a timeless boho aesthetic,</strong> this piece adds texture, comfort, and a luxurious handcrafted touch to <strong>sofas, chairs, cafes, villas, and modern interiors.</strong></p>\n<p data-start=\"337\" data-end=\"535\">Crafted using <strong>high-quality cotton cord</strong> in earthy neutral tones, it blends beautifully with contemporary, rustic, and minimalist decor styles. Perfect for creating cozy and Instagram-worthy spaces.</p>\n<p data-start=\"537\" data-end=\"732\">• Handmade with premium cotton cord<br data-start=\"572\" data-end=\"575\">• Elegant boho &amp; modern aesthetic<br data-start=\"608\" data-end=\"611\">• Soft, durable &amp; sustainable craftsmanship<br data-start=\"654\" data-end=\"657\">• Ideal for homes, cafes, villas &amp; Airbnb spaces<br data-start=\"705\" data-end=\"708\">• Size: <strong>16 × 16 inches</strong></p>\n<p data-start=\"734\" data-end=\"810\" data-is-last-node=\"\" data-is-only-node=\"\">A statement piece that transforms any corner into a warm and artistic space.</p>",
    "shortDescription": "Pink Macrame Cushion Cover - Handcrafted luxury by Dori Handcrafts",
    "price": 849,
    "compareAtPrice": 1049,
    "categorySlug": "cushion-cover",
    "categoryName": "cushion cover",
    "SKU": "DORI-9332534411516",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [
      "bohemian",
      "cushion cover",
      "dori handcrafts",
      "handmade",
      "macrame",
      "pillow"
    ],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_ba297b15-18bf-4207-b041-6c88fdb2b71b.png?v=1778506849",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2_76e01ff2-d5a8-41ce-bbb5-504f527da024.png?v=1778506850",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3_cf18fe5d-a1bc-4fde-bb3e-b37d3c8c6a77.png?v=1778506850",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4_cbacad5e-f531-4de0-a3ce-b340741da522.png?v=1778506849",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5_8f15293b-d648-44a8-83c6-6b53029af78c.png?v=1778506850"
    ],
    "variants": [
      {
        "id": "49084046147836",
        "name": "Default Title",
        "price": 849,
        "compareAtPrice": 1049,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  },
  {
    "id": "9332431061244",
    "title": "Yellow Macrame Cushion Cover",
    "slug": "yellow-macrame-cushion-cover",
    "description": "<div class=\"\" data-turn-id-container=\"request-69ff5884-46c0-8323-8577-e932338da8d0-2\" data-is-intersecting=\"true\">\n<div class=\"relative w-full overflow-visible\">\n<section class=\"text-token-text-primary w-full focus:outline-none [--shadow-height:45px] has-data-writing-block:pointer-events-none has-data-writing-block:-mt-(--shadow-height) has-data-writing-block:pt-(--shadow-height) [&amp;:has([data-writing-block])&gt;*]:pointer-events-auto R6Vx5W_threadScrollVars scroll-mb-[calc(var(--scroll-root-safe-area-inset-bottom,0px)+var(--thread-response-height))] scroll-mt-[calc(var(--header-height)+min(200px,max(70px,20svh)))]\" dir=\"auto\" data-turn-id=\"request-69ff5884-46c0-8323-8577-e932338da8d0-2\" data-turn-id-container=\"request-69ff5884-46c0-8323-8577-e932338da8d0-2\" data-testid=\"conversation-turn-18\" data-scroll-anchor=\"false\" data-turn=\"assistant\">\n<div class=\"text-base my-auto mx-auto pb-10 [--thread-content-margin:var(--thread-content-margin-xs,calc(var(--spacing)*4))] @w-sm/main:[--thread-content-margin:var(--thread-content-margin-sm,calc(var(--spacing)*6))] @w-lg/main:[--thread-content-margin:var(--thread-content-margin-lg,calc(var(--spacing)*16))] px-(--thread-content-margin)\">\n<div class=\"[--thread-content-max-width:40rem] @w-lg/main:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1 group/turn-messages focus-visible:outline-hidden relative flex w-full min-w-0 flex-col agent-turn\">\n<div class=\"flex max-w-full flex-col gap-4 grow\">\n<div data-message-author-role=\"assistant\" data-message-id=\"e6734a01-9dd5-4ed9-abe3-acc735cba877\" dir=\"auto\" data-message-model-slug=\"gpt-5-5\" class=\"min-h-8 text-message relative flex w-full flex-col items-end gap-2 text-start break-words whitespace-normal outline-none keyboard-focused:focus-ring [.text-message+&amp;]:mt-1\" data-turn-start-message=\"true\" tabindex=\"0\">\n<div class=\"flex w-full flex-col gap-1 empty:hidden\">\n<div class=\"markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling\">\n<p data-start=\"35\" data-end=\"294\">Add warmth, texture, and timeless craftsmanship to your space with our handcrafted macramé cushion cover by Dori Handcrafts. Carefully woven by skilled women artisans using premium cotton cords, this piece blends boho elegance with modern earthy aesthetics.</p>\n<p data-start=\"296\" data-end=\"559\">Its intricate knot detailing and rich natural tones make it a perfect accent for sofas, lounge chairs, cafes, villas, Airbnb stays, and cozy corners. Designed to elevate interiors effortlessly, this cushion cover brings a handcrafted luxury feel to any setting.</p>\n<p data-start=\"561\" data-end=\"743\">✨ Handcrafted with precision<br data-start=\"589\" data-end=\"592\">✨ Premium cotton macrame work<br data-start=\"621\" data-end=\"624\">✨ Boho &amp; modern aesthetic<br data-start=\"649\" data-end=\"652\">✨ Perfect for homes, cafes &amp; hospitality spaces<br data-start=\"699\" data-end=\"702\">✨ Made by rural women artisans in India</p>\n<p data-start=\"745\" data-end=\"829\" data-is-last-node=\"\" data-is-only-node=\"\">Bring home a piece of artisanal craftsmanship that tells a story through every knot.</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</section>\n<div class=\"contents\"><br></div>\n</div>\n</div>",
    "shortDescription": "Yellow Macrame Cushion Cover - Handcrafted luxury by Dori Handcrafts",
    "price": 849,
    "compareAtPrice": 1049,
    "categorySlug": "cushion-cover",
    "categoryName": "cushion cover",
    "SKU": "DORI-9332431061244",
    "stock": 15,
    "material": "Organic Cotton Cord & Natural Fibers",
    "vendor": "Dori Handcrafts",
    "tags": [],
    "images": [
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/2.png?v=1778486706",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/3.png?v=1778486706",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/4.png?v=1778486706",
      "https://cdn.shopify.com/s/files/1/0804/2863/0268/files/5.png?v=1778486706"
    ],
    "variants": [
      {
        "id": "49083585265916",
        "name": "Default Title",
        "price": 849,
        "compareAtPrice": 1049,
        "optionName": "Title",
        "optionValue": "Default Title",
        "image": null
      }
    ]
  }
];

    for (let i = 0; i < productsData.length; i++) {
      const p = productsData[i];
      const catId = createdCategories[p.categorySlug] || createdCategories['decor'] || Object.values(createdCategories)[0];
      const prodId = crypto.randomUUID();

      const isFeatured = i < 8 ? 1 : 0;
      const isNewArrival = i < 12 ? 1 : 0;
      const isBestSeller = i % 3 === 0 ? 1 : 0;
      const isSale = p.compareAtPrice && p.compareAtPrice > p.price ? 1 : 0;

      await execute(
        `INSERT INTO products (
          id, slug, name, description, shortDescription, price, compareAtPrice,
          categoryId, SKU, stock, material, dimensions, color, careInstructions,
          shippingInformation, tags, featured, newArrival, bestSeller, sale
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          prodId,
          p.slug,
          p.title,
          p.description,
          p.shortDescription,
          p.price,
          p.compareAtPrice || null,
          catId,
          p.SKU,
          p.stock || 15,
          p.material || 'Natural Hand-Woven Fibers',
          'Standard Size',
          'Natural',
          'Spot clean only with soft damp cloth.',
          'Handcrafted with love. Ships within 3-5 business days across India & worldwide.',
          JSON.stringify(p.tags || []),
          isFeatured,
          isNewArrival,
          isBestSeller,
          isSale,
        ]
      );

      // Product Images
      if (p.images && p.images.length > 0) {
        for (let idx = 0; idx < p.images.length; idx++) {
          await execute(
            `INSERT INTO product_images (id, productId, url, isPrimary, isSecondary, type, \`order\`)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              crypto.randomUUID(),
              prodId,
              p.images[idx],
              idx === 0 ? 1 : 0,
              idx === 1 ? 1 : 0,
              idx === 0 ? 'primary' : 'gallery',
              idx,
            ]
          );
        }
      }

      // Product Variants
      if (p.variants && p.variants.length > 0) {
        for (const v of p.variants) {
          await execute(
            `INSERT INTO product_variants (id, productId, name, optionName, optionValue, stock, price)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [crypto.randomUUID(), prodId, v.name, v.optionName || 'Option', v.optionValue || v.name, 10, v.price]
          );
        }
      }

      // Add verified review
      await execute(
        `INSERT INTO reviews (id, productId, userName, rating, comment, verifiedPurchase)
         VALUES (?, ?, ?, 5, 'Exceptional quality and exquisite handcrafting! Exactly as shown on the Dori store.', 1)`,
        [crypto.randomUUID(), prodId, 'Ananya M.']
      );
    }

    // 4. Insert Coupons
    await execute(
      `INSERT INTO coupons (id, code, discountType, discountValue, minOrderValue, isActive)
       VALUES (?, 'WELCOME10', 'PERCENTAGE', 10, 1000, 1), (?, 'DORI500', 'FIXED', 500, 2500, 1)`,
      [crypto.randomUUID(), crypto.randomUUID()]
    );

    // 5. Insert Journal / Blog Posts
    await execute(
      `INSERT INTO journal_posts (id, slug, title, excerpt, content, image, author, category, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        crypto.randomUUID(),
        'artisanal-heritage-of-dori-handcrafts',
        'Artisanal Heritage: Empowering Rural Women Through Craft',
        'Discover the journey of handwoven macrame, crochet toys, and bags created by rural women artisans across India.',
        'At Dori Handcrafts, every knot tells a story of independence, dignity, and artistic heritage...',
        productsData[0]?.images[0] || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
        'Dori Handcrafts Team',
        'Artisan Stories',
        'August 2026',
      ]
    );

    console.log(`Successfully seeded MySQL database with ${productsData.length} Dori Handcrafts products!`);
  } catch (err) {
    console.error('Seeding error:', err);
  }
}
