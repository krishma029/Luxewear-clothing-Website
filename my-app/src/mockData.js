// src/mockData.js

export const mockProducts = {
  dresses: [
    { 
      id: 104, 
      name: 'Odessa Silk Maxi Dress', 
      price: 320, 
      imageUrl: '/images/D1.jpg', 
      description: 'A flowing maxi dress...', 
      category: 'dresses',
    
    },
    { id: 2, name: 'Verona Velvet Gown', price: 450, imageUrl: '/images/D3.jpg', description: 'A luxurious deep-red velvet gown...', category: 'dresses' },
    { id: 3, name: 'Amalfi Linen Sundress', price: 180, imageUrl: '/images/D4.jpg', description: 'A light and airy linen sundress...', category: 'dresses' },
   { 
  id: 4, 
  name: 'Metro Chic Blazer Dress', 
  price: 280, 
  imageUrl: '/images/D5.jpeg', 
  description: 'A sophisticated and modern blazer dress...', 
  category: 'dresses',
  
  // ADD THIS BLOCK BELOW
  manualRecommendations: {
    footwear: {
      image_url: '/images/dress D5.png', // Replace with your desired shoe image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    accessory: {
      image_url: '/images/A D5.png', // Replace with your desired purse/jewelry image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    styling_prompts: {
      footwear_prompt: 'Pair with pointed-toe boots to maintain the sharp, professional silhouette.',
      accessory_prompt: 'A structured leather clutch adds to the "Metro Chic" aesthetic.'
    }
  }
},
    { 
      id: 101, 
      name: 'Floral Garden Party Dress', 
      price: 210, 
      imageUrl: '/images/D10.jpg',
       description: 'A beautiful dress for any garden party.', 
       category: 'dresses' ,

         manualRecommendations: {
    footwear: {
      image_url: '/images/F 101.png', // Replace with your desired shoe image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    accessory: {
      image_url: '/images/A 101.png', // Replace with your desired purse/jewelry image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    styling_prompts: {
      footwear_prompt: 'Pair with pointed-toe boots to maintain the sharp, professional silhouette.',
      accessory_prompt: 'A structured leather clutch adds to the "Metro Chic" aesthetic.'
    }
  }
      
      
    },
    { id: 102, name: 'Midnight Sparkle Gown',
       price: 550, imageUrl: '/images/D7.jpg', 
       description: 'A stunning gown for a night out.', 
       category: 'dresses',


             manualRecommendations: {
    footwear: {
      image_url: '/images/F 102.png', // Replace with your desired shoe image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    accessory: {
      image_url: '/images/A 102.png', // Replace with your desired purse/jewelry image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    styling_prompts: {
      footwear_prompt: 'Pair with pointed-toe boots to maintain the sharp, professional silhouette.',
      accessory_prompt: 'A structured leather clutch adds to the "Metro Chic" aesthetic.'
    }
  } 

       },
    { id: 103, name: 'Casual Denim Shirtdress', price: 160, imageUrl: '/images/D2.jpg', description: 'Perfect for a casual weekend.', category: 'dresses' },
    { id: 105, name: 'Sleek Office Sheath', price: 230, imageUrl: '/images/D9.jpg', description: 'A professional and stylish choice for the office.', category: 'dresses' ,
      manualRecommendations: {
    footwear: {
      image_url: '/images/manual D104.png', // Replace with your desired shoe image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    accessory: {
      image_url: '/images/A 102.png', // Replace with your desired purse/jewelry image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    styling_prompts: {
      footwear_prompt: 'Pair with pointed-toe boots to maintain the sharp, professional silhouette.',
      accessory_prompt: 'A structured leather clutch adds to the "Metro Chic" aesthetic.'
    }
  } 

     },
    { id: 106 , name: 'Sleek Office Sheath', price: 230, imageUrl: '/images/D12.jpeg', description: 'A professional and stylish choice for the office.', category: 'dresses',
        manualRecommendations: {
    footwear: {
      image_url: '/images/F 106.png', // Replace with your desired shoe image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    accessory: {
      image_url: '/images/A 106.png', // Replace with your desired purse/jewelry image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    styling_prompts: {
      footwear_prompt: 'Pair with pointed-toe boots to maintain the sharp, professional silhouette.',
      accessory_prompt: 'A structured leather clutch adds to the "Metro Chic" aesthetic.'
    }
  } 
     },
    { id: 107 , name: 'Sleek Office Sheath', price: 230, imageUrl: '/images/D13.jpeg', description: 'A professional and stylish choice for the office.', category: 'dresses',
       manualRecommendations: {
    footwear: {
      image_url: '/images/F 107.png', // Replace with your desired shoe image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    accessory: {
      image_url: '/images/A 107 .png', // Replace with your desired purse/jewelry image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    styling_prompts: {
      footwear_prompt: 'Pair with pointed-toe boots to maintain the sharp, professional silhouette.',
      accessory_prompt: 'A structured leather clutch adds to the "Metro Chic" aesthetic.'
    }
  } 
     },
    { id: 108 , name: 'Sleek Office Sheath', price: 230, imageUrl: '/images/D14.jpeg', description: 'A professional and stylish choice for the office.', category: 'dresses',
      manualRecommendations: {
    footwear: {
      image_url: '/images/F 108.png', // Replace with your desired shoe image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    accessory: {
      image_url: '/images/A 108.png', // Replace with your desired purse/jewelry image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    styling_prompts: {
      footwear_prompt: 'Pair with pointed-toe boots to maintain the sharp, professional silhouette.',
      accessory_prompt: 'A structured leather clutch adds to the "Metro Chic" aesthetic.'
    }
  } 
     },
    { id: 109 , name: 'Sleek Office Sheath', price: 230, imageUrl: '/images/D15.jpeg', description: 'A professional and stylish choice for the office.', category: 'dresses',
       manualRecommendations: {
    footwear: {
      image_url: '/images/F 109.png', // Replace with your desired shoe image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    accessory: {
      image_url: '/images/A 109.png', // Replace with your desired purse/jewelry image
      product_link: '#',
      photographer: 'Stylist Pick',
      photographer_profile: '#'
    },
    styling_prompts: {
      footwear_prompt: 'Pair with pointed-toe boots to maintain the sharp, professional silhouette.',
      accessory_prompt: 'A structured leather clutch adds to the "Metro Chic" aesthetic.'
    }
  } 
     },
  ],
  tops: [
    { id: 5, name: '', price: 150, imageUrl: '/images/A D5.png', description: 'A timeless silk blouse...', category: 'tops' },
    { id: 6, name: '', price: 120, imageUrl: '/images/A 101.png', description: 'A comfortable and stylish knit top...', category: 'tops' },
    { id: 11, name: '', price: 120, imageUrl: '', description: 'A comfortable and stylish knit top...', category: 'tops' },
    { id: 13, name: '', price: 120, imageUrl: '/images/A 106.png', description: 'A comfortable and stylish knit top...', category: 'tops' },
    { id: 12, name: '', price: 120, imageUrl: '/images/A 107 .png', description: 'A comfortable and stylish knit top...', category: 'tops' },
    { id: 201, name: '', price: 95, imageUrl: '/images/A 109.png', description: 'Festival-ready crochet crop top.', category: 'tops' },
    { id: 202, name: '', price: 110, imageUrl: '/images/A 108.png  ', description: 'Delicate silk camisole for layering.', category: 'tops' },
    { id: 203, name: 'Oversized White Shirt', price: 140, imageUrl: '/images/A104.png', description: 'Relaxed, versatile oversized shirt.', category: 'tops' },
  ],
  accessories: [
    { id: 7, name: '', price: 85, imageUrl: '/images/A 101.png', category: 'accessories', description: 'Elegant gold hoop earrings.' },
    { id: 8, name: '', price: 120, imageUrl: '/images/A 102.png', category: 'accessories', description: 'A bold pearl necklace for evening looks.' },
     { id: 9, name: '', price: 120, imageUrl: '/images/A 106.png', category: 'accessories', description: 'A bold pearl necklace for evening looks.' },
     { id: 123, name: '', price: 120, imageUrl: '/images/A 107 .png', category: 'accessories', description: 'A bold pearl necklace for evening looks.' },
     { id: 145, name: '', price: 120, imageUrl: '/images/A 108.png', category: 'accessories', description: 'A bold pearl necklace for evening looks.' },
     { id: 459, name: '', price: 120, imageUrl: '/images/A 109.png', category: 'accessories', description: 'A bold pearl necklace for evening looks.' },
         
         { id: 459, name: '', price: 120, imageUrl: '/images/A D5.png', category: 'accessories', description: 'A bold pearl necklace for evening looks.' },
  ],
  footwear: [
  ],
  footwear: [
  ],
  footwear: [
  ],
  footwear: [
  ],
  footwear: [
    { id: 10, name: 'Milan Stiletto Heels', price: 250, imageUrl: '/images/Foot.jpg', category: 'footwear', description: 'Classic high stiletto heels.' },
    { id: 10, name: 'Milan Stiletto Heels', price: 250, imageUrl: '/images/F10.webp', category: 'footwear', description: 'Classic high stiletto heels.' },
    { id: 10, name: 'Milan Stiletto Heels', price: 250, imageUrl: '/images/F11.jpg', category: 'footwear', description: 'Classic high stiletto heels.' },
    { id: 10, name: 'Milan Stiletto Heels', price: 250, imageUrl: '/images/F14.jpg', category: 'footwear', description: 'Classic high stiletto heels.' },
  ],
};

// --- RESTORED EXPORTS FOR CATEGORY PAGE ---

export const fullDressCollection = [
  ...mockProducts.dresses,
];

export const fullTopsCollection = [
  ...mockProducts.tops,
];

export const fullAccessoriesCollection = [
  ...mockProducts.accessories,
  
];

export const allProducts = [
  ...mockProducts.dresses,
  ...mockProducts.tops,
  ...mockProducts.accessories,
  ...mockProducts.footwear,
];