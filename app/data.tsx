import { Spot } from "./types/spot";

export const mockSpots: Spot[] = [
  {
    id: "1",
    title: "The Cozy Corner Cafe",
    description:
      "Best coffee in town with amazing pastries! The atmosphere is warm and welcoming, perfect for working or meeting friends.",
    location: "Portland, Oregon",
    latitude: 45.5231,
    longitude: -122.6765,
    imageUrl:
      "https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc4MDIxNTAwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Sarah Mitchell",
      avatar: "SM",
    },
    category: "Food & Drink",
    createdAt: "2026-05-28",
    likes: 127,
  },
  {
    id: "2",
    title: "Eagle Peak Viewpoint",
    description:
      "Breathtaking panoramic views of the valley below. A moderate 2-hour hike that's absolutely worth it for sunrise.",
    location: "Boulder, Colorado",
    latitude: 40.015,
    longitude: -105.2705,
    imageUrl:
      "https://images.unsplash.com/photo-1723635139551-020422f094a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2VuaWMlMjBtb3VudGFpbiUyMHZpZXdwb2ludHxlbnwxfHx8fDE3ODAzMjM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Alex Rivera",
      avatar: "AR",
    },
    category: "Nature",
    createdAt: "2026-05-25",
    likes: 243,
  },
  {
    id: "3",
    title: "Downtown Street Art District",
    description:
      "Vibrant murals and graffiti art by local and international artists. The artwork changes every few months!",
    location: "Austin, Texas",
    latitude: 30.2672,
    longitude: -97.7431,
    imageUrl:
      "https://images.unsplash.com/photo-1530406831759-15c5c0cbce8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN0cmVldCUyMGFydCUyMG11cmFsfGVufDF8fHx8MTc4MDMyMzU5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Jordan Lee",
      avatar: "JL",
    },
    category: "Art & Culture",
    createdAt: "2026-05-30",
    likes: 189,
  },
  {
    id: "4",
    title: "Sunset Beach",
    description:
      "The most beautiful sunsets you'll ever see. Quiet, peaceful, and perfect for evening walks along the shore.",
    location: "Santa Monica, California",
    latitude: 34.0195,
    longitude: -118.4912,
    imageUrl:
      "https://images.unsplash.com/photo-1647962431451-d0fdaf1cf21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3ODAzMjM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Maya Patel",
      avatar: "MP",
    },
    category: "Nature",
    createdAt: "2026-05-27",
    likes: 312,
  },
  {
    id: "5",
    title: "The Grand Library",
    description:
      "Historic library with stunning architecture and an incredible collection. The reading room is absolutely magnificent.",
    location: "Boston, Massachusetts",
    latitude: 42.3601,
    longitude: -71.0589,
    imageUrl:
      "https://images.unsplash.com/photo-1579097380689-4351e0a200ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGxpYnJhcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3ODAzMjM1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Emma Wilson",
      avatar: "EW",
    },
    category: "Art & Culture",
    createdAt: "2026-05-26",
    likes: 156,
  },
  {
    id: "6",
    title: "Zen Garden Sanctuary",
    description:
      "A peaceful Japanese garden in the heart of the city. Perfect for meditation and finding inner peace.",
    location: "Seattle, Washington",
    latitude: 47.6062,
    longitude: -122.3321,
    imageUrl:
      "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGdhcmRlbiUyMHBlYWNlZnVsfGVufDF8fHx8MTc4MDMyMzU5OHww&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Kenji Tanaka",
      avatar: "KT",
    },
    category: "Nature",
    createdAt: "2026-05-29",
    likes: 201,
  },
];
