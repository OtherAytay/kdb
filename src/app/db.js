import Dexie from 'dexie';

export const db = new Dexie('KinkDB');
db.version(1).stores({
  item: '++id, name, type, brand, subitem_id', // description, url, image, purchase_date, price, rating, rating_note, material, mf_size, mf_color, user_size, user_color
  dildo: '++id', // appearance, structure, texture, firmness, alignment, balls, suction, vibration, thrusting, e_stim, battery_life, squirting, inflatable, vac_u_lock, harness_compatible, ovipositor, head_diameter, shaft_diameter, feature_diameter 

  feature: '++id, name, item_id', // description
  label: '++id, name, item_id', // color, description
});