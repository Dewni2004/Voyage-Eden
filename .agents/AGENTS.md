# Voyage Eden Workspace Rules

## Itinerary URLs
When generating URLs or routes for itineraries, **do not** use raw UUIDs. Instead, use SEO-friendly URL slugs generated from the itinerary title.

- **Slug Utility**: Use the `generateSlug` function from `src/utils/slugify.js`.
- **Usage**: `generateSlug(itinerary.title, itinerary.id)`
- **Routing**: The `ItineraryDetail.jsx` page is designed to lookup itineraries by checking if the URL param matches either the UUID or the generated slug. Always fallback to the UUID if a title isn't available, but prioritize the generated slug for better user experience.

*Added per user request to maintain this convention across sessions.*
