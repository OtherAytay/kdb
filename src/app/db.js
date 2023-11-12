import Dexie from 'dexie';

export const db = new Dexie('KinkDB');
db.version(1).stores({
  item: '++id, name, type, brand_id, subitem_id', // description, url, image, purchase_date, price, rating, rating_note, material, mf_size, mf_color, user_size, user_color
  brand: '++id, &name', // website_url, note, rating, rating_note
  dildo: '++id', // appearance, structure, texture, firmness, alignment, balls, suction, vibration, thrusting, e_stim, battery_life, squirting, inflatable, vac_u_lock, harness_compatible, ovipositor, dimensions[total_length, insertable_length, head_diameter, shaft_diameter, feature_diameter], weight
  anal: '++id', // base, texture, firmness, alignment, suction, tunnel, expanding, tail, vibration, thrusting, e_stim, power_source, battery_life, inflatable, vac_u_lock, lockable, harness_compatible, other_features, dimensions[total_length, insertable_length, head_diameter, shaft_diameter, feature_diameter], weight
  bdsm: '++id', // subtype
  clothing: '++id', // subtype, texture, style, fit
  cosmetic: '++id', // subtype, style,

  dimension: '++id, name', // description
  dimension_item: '[dimension_id+item_id]', // value
  feature: '++id, name', // description
  feature_item: '[feature_id+item_id]',
  label_category: '++id, name', // default_color, description
  label: '++id, category_id, name', // color, description
  label_item: '[label_id+item_id]',
  group: '++id, name', // description
  group_item: '[group_id+item_id]',

  user_color: '++id, name',
  user_size: '++id, name',
});