export const categoryDisplayName = {
    "dildo": "Dildo",
    "anal": "Anal Toy",
    "bdsm": "BDSM Gear",
    "clothing": "Clothing",
    "cosmetic": "Cosmetic",
}

export function displayDate(date) {
    return `${date.slice(5,7)}/${date.slice(8,10)}/${date.slice(0,4)}`
}

export function toDBName(displayName) {
    return displayName.trim().replaceAll(" ", "_").replaceAll("-", "_").toLowerCase()
}

export function toDisplayName(dbName) {
    return dbName.trim().replaceAll("_", " ").split(" ").map((word) => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ')
}

export function saveAs(content, fileName) {
    const a = document.createElement("a");
    const isBlob = content.toString().indexOf("Blob") > -1;
    let url = content;
    if (isBlob) {
        url = window.URL.createObjectURL(content);
    }
    a.href = url;
    a.download = fileName;
    a.click();
    if (isBlob) {
        window.URL.revokeObjectURL(url);
    }
}