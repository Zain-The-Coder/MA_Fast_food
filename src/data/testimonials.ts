export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  date: string;
  favoriteDish: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "review-1",
    name: "Hamza Tariq",
    role: "Food Critic & Blogger",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    content: "Hands down the crispiest smash patties in the entire city. The caramelization on the edges is pure perfection, and the MA flame sauce is liquid gold. Not your average burger spot—this is world class.",
    rating: 5,
    date: "2 days ago",
    favoriteDish: "The Double Smash Beast",
  },
  {
    id: "review-2",
    name: "Ayesha Khan",
    role: "Verified Dine-in Customer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    content: "The pizza cheese pull is totally legit! We ordered the Pepperoni Feast and Volcano Fries for a family movie night. Delivery was blazing fast, piping hot, and packaging kept the fries super crunchy.",
    rating: 5,
    date: "1 week ago",
    favoriteDish: "Overloaded Pepperoni Feast",
  },
  {
    id: "review-3",
    name: "Bilal Sheikh",
    role: "Local Foodie",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    content: "Five Guys and Shake Shack vibes right here. The vibe inside the shop is energetic, smells incredible the moment you walk in, and the Zinger Burger actually has real spice and massive crunch.",
    rating: 5,
    date: "3 weeks ago",
    favoriteDish: "Firehouse Crunchy Zinger",
  },
  {
    id: "review-4",
    name: "Zainab Malik",
    role: "Regular Customer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    content: "The Shawarma wrap blew my mind! You can taste the genuine charcoal grill flavor. Plus, ordering via WhatsApp took literally 20 seconds. 10/10 recommend to anyone craving real quality food.",
    rating: 5,
    date: "Just yesterday",
    favoriteDish: "Gourmet Charcoal Shawarma",
  },
];

export const shopStats = [
  { label: "Happy Customers", value: 50, suffix: "k+", icon: "👥" },
  { label: "Burgers Smashed", value: 120, suffix: "k+", icon: "🍔" },
  { label: "Secret Recipe Spices", value: 18, suffix: "+", icon: "🌶️" },
  { label: "Google Rating", value: 4.9, suffix: "★", icon: "⭐" },
];
