export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Wedding Order · Rishikesh",
    text: "The 3D view feature is incredible! I could see exactly what my wedding cake would look like before ordering. And the taste? Absolutely divine. 100% eggless and you couldn't tell at all!",
    rating: 5,
    avatar: "P",
  },
  {
    name: "Rajesh Kumar",
    role: "Birthday Order · Rishikesh",
    text: "Ordered the Pink Name Cake for my daughter's birthday. It was the most beautiful and delicious cake we've had in Rishikesh. Bakery is our go-to now for every celebration!",
    rating: 5,
    avatar: "R",
  },
  {
    name: "Ananya Gupta",
    role: "Specialty Order · Rishikesh",
    text: "The Mermaid Cake was unlike anything I've tasted or seen. The details, the colors, the flavors... pure art. And being able to view it in 3D beforehand was so helpful!",
    rating: 5,
    avatar: "A",
  },
];
