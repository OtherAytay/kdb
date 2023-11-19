import { useLiveQuery } from "dexie-react-hooks"
import { db } from './db'
import { Badge } from 'react-bootstrap'
import { forwardRef } from "react"

export function BrandLink({ id }) {
  const brand = useLiveQuery(() => db.brand.get(id)) 
  if (!brand) { return }
  return (<a className="text-decoration-none text-primary-emphasis" target="blank_" rel="noopener noreferrer" href={brand.url}>{brand.name}</a>)
}

export const RatingBadge = forwardRef(function RatingBadge(props, ref) {
  return (<Badge {...props} ref={ref} as="a" bg="warning" className={"text-decoration-none " + props.className}>{props.rating}<i className="bi bi-star-fill" /></Badge>)
}) 

export function ImagePreviewModal({}) {
  return
}