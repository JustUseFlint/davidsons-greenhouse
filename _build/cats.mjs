export const CATS = [
  { id: 'houseplants', name: 'Houseplants & Tropicals', short: 'Houseplants', img: 'hoya', line: 'Pothos, philodendrons, hoyas, peperomias and the rare stuff, all year.' },
  { id: 'succulents', name: 'Succulents & Cacti', short: 'Succulents & cacti', img: 'cactus-collection', line: 'Sun-lovers for windowsills, dish gardens and forgetful waterers.' },
  { id: 'annuals', name: 'Annuals & Bedding Flowers', short: 'Annuals', img: 'annual-display', line: 'Season-long color for beds, pots and hanging baskets.' },
  { id: 'perennials', name: 'Perennials', short: 'Perennials', img: 'perennial-bench', line: 'Plants that come back stronger every Indiana spring.' },
  { id: 'herbs', name: 'Herbs', short: 'Herbs', img: 'seed-starting', line: 'Kitchen herbs, tea herbs and fragrant oddities.' },
  { id: 'vegetables', name: 'Vegetables', short: 'Vegetables', img: 'herb-bundles', line: 'Transplants, seed potatoes, onion sets and bulk seed.' },
  { id: 'fruit', name: 'Berries & Small Fruit', short: 'Berries & fruit', img: 'garden-supplies', line: 'Strawberries, blueberries, brambles, grapes and more.' },
  { id: 'fruit-trees', name: 'Fruit Trees', short: 'Fruit trees', img: 'nursery-trees', line: 'Apples, cherries, peaches, pears and plums for home orchards.' },
  { id: 'trees', name: 'Shade & Ornamental Trees', short: 'Trees', img: 'nursery-trees', line: 'Maples, redbuds, magnolias, evergreens and specimen trees.' },
  { id: 'shrubs', name: 'Shrubs & Roses', short: 'Shrubs & roses', img: 'greenhouse-panorama', line: 'Hydrangeas, lilacs, roses, boxwood and hedging.' },
  { id: 'grasses-vines', name: 'Grasses, Vines & Groundcovers', short: 'Grasses & vines', img: 'ice-plant-basket', line: 'Movement, height and living carpets.' },
  { id: 'water', name: 'Water Garden Plants', short: 'Water plants', img: 'water-garden', line: 'Lilies, marginals and floaters for ponds and tubs.' },
  { id: 'seasonal', name: 'Seasonal Favorites', short: 'Seasonal', img: 'fall-display', line: 'Mums, ornamental kale, pumpkins and poinsettias.' },
];
export const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));
