export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  threeDLink: string;
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  category: string;
  salesCount?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export const categories: Category[] = [
  {
    id: 'birthday',
    name: 'Birthday / Celebration Cakes',
    description: 'Perfect for birthdays, milestones, and joyous celebrations',
    emoji: '🎂',
  },
  {
    id: 'anniversary',
    name: 'Anniversary Cakes',
    description: 'Celebrate your special milestones with love',
    emoji: '💕',
  },
  {
    id: 'wedding',
    name: 'Wedding / Special Occasion Cakes',
    description: 'For the moments that happen once in a lifetime',
    emoji: '👰',
  },
  {
    id: 'flavours',
    name: 'Special Flavour / Pastries',
    description: 'Unique flavours and indulgent pastry creations',
    emoji: '🍓',
  },
  {
    id: 'specialty',
    name: 'Specialty Cakes',
    description: 'Artistic, one-of-a-kind showstopper cakes',
    emoji: '✨',
  },
];

export const products: Product[] = [
  // Birthday / Celebration Cakes — Signature cake only
  {
    id: "6",
    name: "Pink Name Cake",
    slug: "pink-name-cake",
    description: "An elegant blush-pink cake with delicate piped rosettes, a satin bow, and a hand-lettered name — a beautifully personal touch for any birthday celebration.",
    price: 1600,
    badge: "Signature",
    image: "/products/pink-name-cake.jpg",
    threeDLink: "https://mywebar.com/p/Project_3_fybavv2anb",
    category: "birthday",
  },

  // Anniversary Cakes
  {
    id: "8",
    name: "Pink Heart Cake",
    slug: "pink-heart-cake",
    description: "A romantic pink heart-shaped cake to celebrate your love and togetherness.",
    price: 1800,
    badge: "Romantic",
    image: "/products/image8.jpg",
    threeDLink: "https://mywebar.com/p/Project_3_rghnnu9sr5",
    category: "anniversary",
  },
  {
    id: "9",
    name: "Chocolate Teddy Anniversary Cake",
    slug: "chocolate-teddy-anniversary",
    description: "Rich chocolate cake with adorable teddy decorations, perfect for celebrating milestones together.",
    price: 1900,
    image: "/products/image9.jpg",
    threeDLink: "https://mywebar.com/p/Project_2_ttew2deo54",
    category: "anniversary",
  },

  // Wedding / Special Occasion Cakes — Signature cake only
  {
    id: "10",
    name: "Bride to Be Cake",
    slug: "bride-to-be-cake",
    description: "A romantic ivory cake cascading with deep red rose petals, finished with an elegant 'Bride to Be' topper — perfect for bridal showers and pre-wedding celebrations.",
    price: 2800,
    badge: "Premium",
    image: "/products/bride-to-be-cake.jpg",
    threeDLink: "https://mywebar.com/p/Project_0_26pw95eg82",
    category: "wedding",
  },

  // Special Flavour / Pastries
  {
    id: "12",
    name: "Strawberry Cheesecake",
    slug: "strawberry-cheesecake",
    description: "Creamy strawberry cheesecake with a fresh berry topping on a buttery biscuit base.",
    price: 900,
    badge: "New",
    image: "/products/image12.jpg",
    threeDLink: "https://mywebar.com/p/Project_4_vlug2v6l1b",
    category: "flavours",
  },
  {
    id: "13",
    name: "Lotus Biscoff / Caramel Cheesecake",
    slug: "lotus-biscoff-caramel-cheesecake",
    description: "Indulgent Lotus Biscoff and caramel cheesecake with crushed Biscoff crumble on top.",
    price: 950,
    image: "/products/image13.jpg",
    threeDLink: "https://mywebar.com/p/Project_4_saquy4v1p8",
    category: "flavours",
  },
  {
    id: "14",
    name: "Red Velvet Pastry",
    slug: "red-velvet-pastry",
    description: "Classic red velvet pastry with smooth cream cheese frosting — pure indulgence in every bite.",
    price: 600,
    image: "/products/image14.jpg",
    threeDLink: "https://mywebar.com/p/Project_3_vqvwu4ho9c",
    category: "flavours",
  },
  {
    id: "15",
    name: "Butterscotch Ruffled Cake",
    slug: "butterscotch-ruffled-cake",
    description: "Butterscotch cake with elegant ruffled buttercream design and caramel drizzle.",
    price: 1200,
    image: "/products/image15.jpg",
    threeDLink: "https://mywebar.com/p/Project_1_s14f6sjpro",
    category: "flavours",
  },
  {
    id: "16",
    name: "Chocolate Cake with Chocolate Decoration",
    slug: "chocolate-decoration-cake",
    description: "Decadent chocolate cake with intricate chocolate decorations for the true chocolate lover.",
    price: 1100,
    image: "/products/image16.jpg",
    threeDLink: "https://mywebar.com/p/Project_1_qf951dah0v",
    category: "flavours",
  },

  // Specialty Cakes — Signature cake only
  {
    id: "17",
    name: "Mermaid Cake",
    slug: "mermaid-cake",
    description: "An enchanting two-tier ocean-inspired cake with hand-sculpted seashells, mermaid tails, and delicate sail-like chocolate fins — a true showstopper for magical celebrations.",
    price: 3200,
    badge: "Showstopper",
    image: "/products/mermaid-cake.jpg",
    threeDLink: "https://mywebar.com/p/Project_3_c93qudgb30",
    category: "specialty",
  },
];
