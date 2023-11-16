export const categoryDisplayName = {
  "dildo": "Dildo",
  "anal": "Anal Toy",
  "bdsm": "BDSM Gear",
  "clothing": "Clothing",
  "cosmetic": "Cosmetic",
}

export function displayDate(date) {
    return (new Date(date)).toLocaleDateString().slice(0, 10)
}

export function toDBName(displayName) {
    return displayName.trim().replaceAll(" ", "_").replaceAll("-", "_").toLowerCase()
}

export function toDisplayName(dbName) {
    return dbName.trim().replaceAll("_", " ").split(" ").map((word) => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ')
}