import { useLiveQuery } from "dexie-react-hooks"
import { db } from './db'
import { Badge } from 'react-bootstrap'

export function BrandLink({ id }) {
  const brand = useLiveQuery(() => db.brand.get(id)) 
  if (!brand) { return }
  return (<a className="text-decoration-none text-primary-emphasis" target="blank_" rel="noopener noreferrer" href={brand.url}>{brand.name}</a>)
}

export function RatingBadge({rating}) {
    return (<Badge as="a" bg="warning" className="text-decoration-none">{rating}<i className="bi bi-star-fill" /></Badge>)
}

export function ImagePreviewModal({}) {
  return
}