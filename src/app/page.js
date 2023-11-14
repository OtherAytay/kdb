'use client'
import { useLiveQuery } from 'dexie-react-hooks'
import Image from 'next/image'
// import styles from './page.module.css'
import Button from 'react-bootstrap/Button'
import { db } from './db'

export default function Home() {
  const [items, setItems] = useState(false);



  return (
    <main></main>
  )
}

function fetchItems(setItemsLoaded) {
  var stores = [db.item, db.dildo, db.anal, db.bdsm, db.clothing, db.cosmetic]
  var results = []

  db.transaction('r', stores, async () => {
    const items = await db.item.toArray()

    for (const item of items) {
      switch (item.category) {
        case "dildo": var store = db.dildo; break;
        case "anal": var store = db.anal; break;
        case "bdsm": var store = db.bdsm; break;
        case "clothing": var store = db.clothing; break;
        case "cosmetic": var store = db.cosmetic; break;
      }

      const subitem =  await store.get(item.subitem_id)
      results.push({ ...item, ...subitem })
    }
  })
}

