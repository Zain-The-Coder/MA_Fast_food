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
    content: "Hands down the crispiest broast in the entire area! The crunch is audible, the meat is juicy right to the bone, and the house garlic mayo dip is absolute perfection. 10/10 every single visit.",
    rating: 5,
    date: "2 days ago",
    favoriteDish: "Broast Full",
  },
  {
    id: "review-2",
    name: "Ayesha Khan",
    role: "Verified Dine-in Customer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    content: "Their Chicken Shashlik with Rice and Singaporean Rice are top-tier! Perfect balance of sweet, tangy, and spicy sauces. Piping hot delivery and super clean packaging.",
    rating: 5,
    date: "1 week ago",
    favoriteDish: "Chicken Shashlik with Rice",
  },
  {
    id: "review-3",
    name: "Bilal Sheikh",
    role: "Local Foodie",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    content: "The Jumbo Zinger Burger is an absolute beast! Double crispy fillets with generous cheese and sauce. The vibe inside the shop is lively and service is super fast.",
    rating: 5,
    date: "3 weeks ago",
    favoriteDish: "Jumbo Zinger",
  },
  {
    id: "review-4",
    name: "Zainab Malik",
    role: "Regular Customer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    content: "Their Club Sandwich and Chicken Chowmein never disappoint! Fresh bread, generous egg and chicken filling, and ordering via WhatsApp took literally 30 seconds.",
    rating: 5,
    date: "Just yesterday",
    favoriteDish: "Club Sandwich",
  },
];

export const shopStats = [
  { label: "Happy Customers", value: 50, suffix: "k+", icon: "👥" },
  { label: "Broast & Burgers Served", value: 120, suffix: "k+", icon: "🍗" },
  { label: "Secret Recipe Spices", value: 18, suffix: "+", icon: "🌶️" },
  { label: "Customer Rating", value: 4.9, suffix: "★", icon: "⭐" },
];
