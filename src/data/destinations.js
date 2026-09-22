// src/data/destinations.js
//
// Experiment 3 keeps all data in a plain JavaScript array (no database yet).
// Each object represents one destination. The "id" is used to build the
// dynamic route  /destination/:id   (see App.jsx and DestinationDetails.jsx).

const destinations = [
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    category: "Beach",
    rating: 4.5,
    image: "https://picsum.photos/seed/goa-beach/900/600",
    shortDescription: "Golden beaches, Portuguese heritage and a buzzing nightlife on India's west coast.",
    description:
      "Goa is India's smallest state and its most famous beach destination. Once a Portuguese colony, it blends whitewashed churches and spice-scented old towns with palm-fringed beaches, beach shacks and a lively nightlife scene. Whether you want quiet sunrise walks or all-night beach parties, Goa has a stretch of sand for every mood.",
    attractions: ["Baga Beach", "Basilica of Bom Jesus", "Fort Aguada", "Dudhsagar Falls", "Anjuna Flea Market"],
    activities: ["Water sports (parasailing, jet-ski)", "Beach hopping", "Sunset river cruise", "Spice plantation tour"],
    budget: "Rs. 6,000 - Rs. 15,000 per person (3 days)",
    bestTimeToVisit: "November to February",
  },
  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    category: "Mountain",
    rating: 4.6,
    image: "https://picsum.photos/seed/manali-mountain/900/600",
    shortDescription: "Snow-capped peaks, pine forests and adventure sports in the Himalayas.",
    description:
      "Manali sits in the Kullu Valley of Himachal Pradesh, framed by snow-covered peaks and thick deodar forests. It's a favourite base for trekkers, honeymooners and adventure seekers alike, with easy access to high mountain passes, riverside campsites and quaint cafe-lined streets in Old Manali.",
    attractions: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali", "Jogini Waterfall"],
    activities: ["Paragliding", "River rafting", "Skiing (winter)", "Trekking"],
    budget: "Rs. 8,000 - Rs. 18,000 per person (4 days)",
    bestTimeToVisit: "March to June, and October to February for snow",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    category: "Heritage",
    rating: 4.4,
    image: "https://picsum.photos/seed/jaipur-fort/900/600",
    shortDescription: "The Pink City - royal palaces, hilltop forts and vibrant bazaars.",
    description:
      "Jaipur, the capital of Rajasthan, is called the Pink City for the terracotta-hued buildings of its old quarter. It is a showcase of Rajput architecture, with grand forts, ornate palaces and markets selling textiles, jewellery and handicrafts. It forms part of India's famous Golden Triangle circuit.",
    attractions: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Nahargarh Fort"],
    activities: ["Heritage walks", "Elephant/jeep ride at Amber Fort", "Bazaar shopping", "Local Rajasthani thali food tour"],
    budget: "Rs. 5,000 - Rs. 12,000 per person (3 days)",
    bestTimeToVisit: "October to March",
  },
  {
    id: "kerala",
    name: "Kerala",
    state: "Kerala",
    category: "Backwaters",
    rating: 4.7,
    image: "https://picsum.photos/seed/kerala-backwaters/900/600",
    shortDescription: "God's Own Country - tranquil backwaters, tea hills and beaches.",
    description:
      "Kerala, known as God's Own Country, is famous for its network of calm backwaters, houseboat cruises, misty tea plantations in Munnar, and Ayurvedic wellness retreats. Its lush greenery and slower pace make it a favourite for relaxed, nature-focused holidays.",
    attractions: ["Alleppey Backwaters", "Munnar Tea Gardens", "Fort Kochi", "Periyar Wildlife Sanctuary", "Varkala Beach"],
    activities: ["Houseboat stay", "Ayurvedic spa", "Wildlife safari", "Kathakali dance show"],
    budget: "Rs. 9,000 - Rs. 20,000 per person (5 days)",
    bestTimeToVisit: "September to March",
  },
  {
    id: "kashmir",
    name: "Kashmir",
    state: "Jammu & Kashmir",
    category: "Snow",
    rating: 4.8,
    image: "https://picsum.photos/seed/kashmir-valley/900/600",
    shortDescription: "Paradise on Earth - alpine lakes, snow peaks and houseboats on Dal Lake.",
    description:
      "Often called Paradise on Earth, Kashmir offers snow-dusted valleys, alpine meadows and the iconic shikara rides and houseboats of Dal Lake in Srinagar. Gulmarg and Pahalgam add skiing, cable-car rides and pine-forest trekking to the mix.",
    attractions: ["Dal Lake", "Gulmarg", "Pahalgam", "Mughal Gardens", "Betaab Valley"],
    activities: ["Shikara ride", "Skiing & gondola ride", "Houseboat stay", "Valley trekking"],
    budget: "Rs. 12,000 - Rs. 25,000 per person (5 days)",
    bestTimeToVisit: "April to June, and December to February for snow",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    category: "City",
    rating: 4.2,
    image: "https://picsum.photos/seed/mumbai-city/900/600",
    shortDescription: "The City of Dreams - colonial landmarks, Bollywood and a buzzing seafront.",
    description:
      "Mumbai is India's financial capital and the home of Bollywood. It mixes colonial-era landmarks with a fast-paced modern skyline, a lively street-food scene and the iconic Marine Drive seafront promenade. There's always something happening in the City of Dreams.",
    attractions: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Chhatrapati Shivaji Terminus", "Juhu Beach"],
    activities: ["Bollywood studio tour", "Street food walk", "Ferry to Elephanta Caves", "Heritage building walk"],
    budget: "Rs. 6,000 - Rs. 14,000 per person (3 days)",
    bestTimeToVisit: "November to February",
  },
];

export default destinations;

// Handy helper used by CategoryFilter to build the list of unique categories.
export const categories = ["All", ...new Set(destinations.map((d) => d.category))];
