export class SessionStorageClass {

  setItems(object) { for (const property in object) { sessionStorage.setItem(`${property}`, `${object[property]}`) } }

  removeItems(keys) { keys.forEach(e => sessionStorage.removeItem(e)) }

  clearItems() { sessionStorage = null }

  isExist(key) { return sessionStorage[key] }
}
