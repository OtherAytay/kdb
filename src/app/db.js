import Dexie from 'dexie';

export var db = new Dexie('KinkDB');
// db.delete().then() // PURGE DB FOR DEBUGGING
// db = new Dexie('KinkDB');
db.version(1).stores({
  item: '++id, &name, category, brand_id, subitem_id', // description, url, image, purchase_date, price, currency, rating, rating_note, material, mf_size, mf_color, user_size, user_color
  brand: '++id, &name', // website_url, note, rating, rating_note
  dildo: '++id, &item_id', // appearance, texture, firmness, alignment, balls, suction, vibration, thrusting, e_stim, battery_life, squirting, inflatable, vac_u_lock, harness_compatible, ovipositor, dimensions[total_length, insertable_length, head_diameter, shaft_diameter, feature_diameter], weight
  anal: '++id, &item_id', // base, texture, firmness, alignment, suction, tunnel, expanding, tail, vibration, thrusting, e_stim, power_source, battery_life, inflatable, vac_u_lock, lockable, harness_compatible, other_features, dimensions[total_length, insertable_length, head_diameter, shaft_diameter, feature_diameter], weight
  bdsm: '++id, &item_id', // subtype
  clothing: '++id, &item_id', // subtype, texture, style, fit
  cosmetic: '++id, &item_id', // subtype, style,

  property: '++id, name, category, &[name+category]', // description, placeholder
  property_item: '[property_id+item_id]', // value
  dimension: '++id, name, category, &[name+category]', // description
  dimension_item: '[dimension_id+item_id]', // value, unit
  feature: '++id, name, category, &[name+category]', // description
  feature_item: '[feature_id+item_id]', // value
  label_category: '++id, &name', // default_color, description
  label: '++id, &name, category_id', // color, description
  label_item: '[label_id+item_id]',
  group: '++id, &name', // description
  group_item: '[group_id+item_id]',

  user_color: '++id, name',
  user_size: '++id, name',
});

db.on("populate", (transaction) => {
  // Example item + brand
  transaction.item.add({id: 1, "name":"Neo Elite 7.5","category":"dildo","brand_id":1,"description":"","url":"https://blushvibe.com/products/neo-elite-neon-pink-7-5-inch-dildo-suction-cup-base-by-blush-bl-82200?variant=41964900188331","image":"","price":24.04,"currency":"$","purchase_date":"2023-11-14","rating":5,"rating_note":"Dual density firmness is very comfortable, comfortable intermediate size","mf_size":"","mf_color":"","user_size":"Medium","user_color":"Neon Pink","subitem_id": 1})
  transaction.dildo.add({id: 1, "item_id":1,"material":"Silicone","appearance":"Realistic","texture":"Smooth","firmness":"Dual Density","alignment":"P-Spot","suction":true,"harnessable":true,"total_length":7.5,"insertable_length":7,"head_diameter":1.5,"body_diameter":1.5,"knot_diameter":null})
  transaction.brand.add({id: 1, "name":"Blush","url":"https://blushvibe.com/","note":"","rating":4,"rating_note":"Cheap but respectable quality sex toys"})

  // Properties
  transaction.property.add({name: "type", description: "e.g. Collar, mouth gag, nipple toy", category: "bdsm", placeholder: "Chastity"})
  transaction.property.add({name: "subtype", description: "e.g. Ball gag, dildo gag, open gag", category: "bdsm", placeholder: "Bar gag"})
  transaction.property.add({name: "type", description: "e.g. Top, bottom, panties, bra", category: "clothing", placeholder: "Bodysuit"})
  transaction.property.add({name: "subtype", description: "e.g. Shorts, skirt, leggings", category: "clothing", placeholder: "Skirt"})
  transaction.property.add({name: "type", description: "e.g. Eye, Lip, Face, Fragrance", category: "cosmetic", placeholder: "Hygiene"})
  transaction.property.add({name: "subtype", description: "e.g. Eyeliner, eye shadow, mascara, primer", category: "cosmetic", placeholder: "Mascara"})
  transaction.property.add({name: "material", description: "e.g. Silicone, glass, metal", category: "dildo", placeholder: "Silicone"})
  transaction.property.add({name: "material", description: "e.g. Silicone, glass, metal", category: "anal", placeholder: "Silicone"})
  transaction.property.add({name: "material", description: "e.g. Leather, metal, silicone", category: "bdsm", placeholder: "Leather"})
  transaction.property.add({name: "material", description: "e.g. Cotton, spandex, wool", category: "clothing", placeholder: "Cotton"})
  transaction.property.add({name: "appearance", description: "e.g. Realistic, fantasy, animal", category: "dildo", placeholder: "Realistic"})
  transaction.property.add({name: "base", description: "e.g. Circle, T-bar, Heart", category: "anal", placeholder: "T-Bar"})
  transaction.property.add({name: "texture", description: "e.g. Smooth, veiny, ribbed", category: "dildo", placeholder: "Smooth"})
  transaction.property.add({name: "texture", description: "e.g. Smooth, veiny, ribbed", category: "anal", placeholder: "Smooth"})
  transaction.property.add({name: "texture", description: "e.g. Smooth, ribbed, rough", category: "clothing", placeholder: "Smooth"})
  transaction.property.add({name: "firmness", description: "e.g. Soft, firm, dual density", category: "dildo", placeholder: "Dual Density"})
  transaction.property.add({name: "firmness", description: "e.g. Soft, firm, dual density", category: "anal", placeholder: "Dual Density"})
  transaction.property.add({name: "alignment", description: "e.g. Straight, curved, a-spot", category: "dildo", placeholder: "P-Spot"})
  transaction.property.add({name: "alignment", description: "e.g. Straight, curved, a-spot", category: "anal", placeholder: "P-Spot"})
  transaction.property.add({name: "style", description: "e.g. Ruffled, skater", category: "clothing", placeholder: "Ruffled"})
  transaction.property.add({name: "style", description: "e.g. Heavy, sheer", category: "cosmetic", placeholder: "Sheer"})
  transaction.property.add({name: "fit", description: "e.g. Bodycon, midi, maxi", category: "clothing", placeholder: "Bodycon"})
  transaction.property.add({name: "neckline", description: "e.g. V, square, halter", category: "clothing", placeholder: "Round"})

  // Features
  transaction.feature.add({name: "balls", description: "Has testicles", category: "dildo"})
  transaction.feature.add({name: "suction", description: "Has suction cup base", category: "dildo"})
  transaction.feature.add({name: "suction", description: "Has suction cup base", category: "anal"})
  transaction.feature.add({name: "vibration", description: "Can vibrate", category: "anal"})
  transaction.feature.add({name: "vibration", description: "Can vibrate", category: "dildo"})
  transaction.feature.add({name: "thrusting", description: "Can thrust", category: "dildo"})
  transaction.feature.add({name: "thrusting", description: "Can thrust", category: "anal"})
  transaction.feature.add({name: "e_stim", description: "Is e-stim compatible", category: "dildo"})
  transaction.feature.add({name: "e_stim", description: "Is e-stim compatible", category: "anal"})
  transaction.feature.add({name: "squirting", description: "Has squirting cum tube", category: "dildo"})
  transaction.feature.add({name: "inflatable", description: "Van be inflated", category: "dildo"})
  transaction.feature.add({name: "inflatable", description: "Van be inflated", category: "anal"})
  transaction.feature.add({name: "vac_u_lock", description: "Is Vac-U-Lock compatible", category: "dildo"})
  transaction.feature.add({name: "vac_u_lock", description: "Is Vac-U-Lock compatible", category: "anal"})
  transaction.feature.add({name: "harnessable", description: "Is harness compatible", category: "dildo"})
  transaction.feature.add({name: "harnessable", description: "Is harness compatible", category: "anal"})
  transaction.feature.add({name: "ovipositor", description: "Can deposit eggs", category: "dildo"})
  transaction.feature.add({name: "tunnel", description: "Has a hollow center", category: "anal"})
  transaction.feature.add({name: "expanding", description: "Expands when inserted", category: "anal"})
  transaction.feature.add({name: "tail", description: "Has a tail attached", category: "anal"})
  transaction.feature.add({name: "lockable", description: "Can be locked to prevent removal", category: "anal"})
  transaction.feature.add({name: "lockable", description: "Can be locked to prevent removal", category: "bdsm"})
  transaction.feature.add({name: "lockable", description: "Can be locked to prevent removal", category: "clothing"})
  transaction.feature.add({name: "breathable", description: "Has holes for breathability", category: "bdsm"})

  // Dimensions
  transaction.dimension.add({name: "total_length", description: "Length including base", category: "dildo"})
  transaction.dimension.add({name: "total_length", description: "Length including base", category: "anal"})
  transaction.dimension.add({name: "insertable_length", description: "Length excluding base", category: "dildo"})
  transaction.dimension.add({name: "insertable_length", description: "Length excluding base", category: "anal"})
  transaction.dimension.add({name: "head_diameter", description: "Diameter at widest point of dildo head", category: "dildo"})
  transaction.dimension.add({name: "body_diameter", description: "Diameter at widest point, excluding knots", category: "dildo"})
  transaction.dimension.add({name: "body_diameter", description: "Diameter at widest point, excluding knots", category: "anal"})
  transaction.dimension.add({name: "knot_diameter", description: "Diameter at knot / bead", category: "dildo"})
  transaction.dimension.add({name: "knot_diameter", description: "Diameter at knot / bead", category: "anal"})
  transaction.dimension.add({name: "gag_length", description: "Length of mouth gag", category: "bdsm"})
  transaction.dimension.add({name: "gag_diameter", description: "Diameter of mouth gag", category: "bdsm"})
  transaction.dimension.add({name: "band_circumference", description: "Max circumference of collar / cuff band", category: "bdsm"})
  transaction.dimension.add({name: "band_height", description: "Max height of collar / cuff band", category: "bdsm"})
  
  // Label Categories & Labels
  transaction.label_category.add({id: 1, name: "Kinks", description: "Organize items by their associated kinks", default_color: "#d63384"})
  transaction.label.add({name: "Slave", description: "Give up control", category_id: 1})
  transaction.label.add({name: "Sissy", description: "Good girl for daddy", category_id: 1})
  transaction.label_category.add({id: 2, name: "Clothing Styles", description: "Organize clothing by their styles", default_color: "#d63384"})
  transaction.label.add({name: "Slutty", description: "Revealing and promiscuous", category_id: 2})
  transaction.label.add({name: "Modest", description: "Concealing and traditional", category_id: 2})
  transaction.label.add({name: "Fetishwear", description: "Kinky!", category_id: 2})
})