//*******Récupération des produits dans le LocalStorage********
//Création de la constante "panier"
const panier = []
retrieveItem()

//Fonction de récupération
function retrieveItem() {
    const nombreItems = localStorage.length;
    for (let i = 0; i < nombreItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
//transfert de JSON a JavaScript
        const itemObjet = JSON.parse(item)
        panier.push(itemObjet)
    }
}
//**************** DÉBUT - Mise en page du panier *************/
//Boucle for pour répété la fonction à chaque article
panier.forEach((item) => productDisplay(item))

//Insertion de l'article entier
function productDisplay(item) {
    const product = createArticle(item)
    const divImage = createImage(item)
    product.appendChild(divImage)
    //createContent(item)
    const content = createContent(item)
    content
    product.appendChild(content)
    panierDisplay(product)
    totalQuantityDisplay(item)
    montantTotalDisplay(item)
}

//Ciblé le lieu de l'insertion du html
function panierDisplay(product) {
    document.querySelector("#cart__items").appendChild(product)
}

//Insertion de la grande div".cart__item__content"
function createContent(item) {
    const content = document.createElement("div")
    content.classList.add("cart__item__content")

    const description = createDescription(item)
    const settings = createSettings(item)

    content.appendChild(description)
    content.appendChild(settings)
    return content
}
//Insertion de la div contennant quantité & bouton delete
function createSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantity(settings, item)
    addDelete(settings, item)
    return settings
}

//Insertion du btn supprimer
function addDelete(settings, item) {
    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    const buttonDelete = document.createElement("p")
    buttonDelete.classList.add("deleteItem")
    buttonDelete.textContent = "Supprimer"
    buttonDelete.addEventListener("click", () => deleteProduct(item))
    divDelete.appendChild(buttonDelete)
    settings.appendChild(divDelete)
}

//--------- Supprimer un produit du panier -----------
function deleteProduct(item) {
//Trouver l'index du produit a supprimer par l'id et la couleur
    const productToDelete = panier.findIndex(
        (product) => product.id === item.id 
        && product.couleur == item.couleur
    )
//Suppression par la methode splice
    panier.splice(productToDelete, 1)
    totalQuantityDisplay()
    montantTotalDisplay()
    deleteDataFromCache(item)
    deleteArticleFormPage(item)
    console.log(panier)
}

//Suppression de l'article du produit dans la page
function deleteArticleFormPage(item) {
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.couleur}"]`
    )
    articleToDelete.remove()
}

//--------------- Supprimer le produit du local storage ------------
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.couleur}`
    localStorage.removeItem(key)
}

//Insertion de la quantité
function addQuantity(settings, item) {
    const divQuantity = document.createElement("div")
    divQuantity.classList.add("cart__item__content__settings__quantity")
    const quantity = document.createElement("p")
    quantity.textContent = "Qté : "
    divQuantity.appendChild(quantity)
    const itemQuantity = document.createElement("input")
    itemQuantity.type = "number"
    itemQuantity.classList.add("itemQuantity")
    itemQuantity.name = "itemQuantity"
    itemQuantity.min = "1"
    itemQuantity.max = "100"
    itemQuantity.value = item.quantite;
    itemQuantity.addEventListener("change", () => updateQuantity(item.id, itemQuantity.value, item))
    quantity.appendChild(itemQuantity)
    settings.appendChild(divQuantity)
}

//Envois de la mise a jours de quantite dans le local storage
function updateQuantity(id, newValue, item) {
//récupération du produit a changer via l'id
    const itemToChange = panier.find(item => item.id === id)
//Récupération de la nouvelle quantité
    itemToChange.quantite = Number(newValue)
//Ajout des fonctions total pour la prise en compte de new value 
    totalQuantityDisplay()
    montantTotalDisplay()
    saveNewDataToCache(item)
}

//Fonction de sauvegarde des nouvelles données
function saveNewDataToCache(item) {
//Récupération des nouvelles données
    const dataForSave = JSON.stringify(item)
//Ajout de key pour la cohérence des ajouts
    const key = `${item.id}-${item.couleur}`
//Sauvegarde dans le local storage
    localStorage.setItem(key, dataForSave)
}

//Insertion de la description produit
function createDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const nameProduct = document.createElement("h2")
    nameProduct.textContent = item.nom
    const color = document.createElement("p")
    color.textContent = item.couleur
    const price = document.createElement("p")
    price.textContent = item.prix +" €"

    description.appendChild(nameProduct)
    description.appendChild(color)
    description.appendChild(price)
    return description
}

//Insertion de l'article entier
function createArticle(item) {
    const product = document.createElement("article")
    product.classList.add("cart__item")
    product.dataset.id = item.id
    product.dataset.color = item.couleur
    return product
}
//Insertion de l'image dans le html
function createImage(item) {
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.image
    image.alt = item.imageDescription
    divImage.appendChild(image)
    return divImage
}

//--------------------TOTAL PANIER--------------------
//totalQuantite
function totalQuantityDisplay(item) {
    const totalQuantity = document.querySelector("#totalQuantity")
// Calcul de l'ensemble des quantités du panier
    const calculQuantity = panier.reduce(
        (previousValue, item) => previousValue + item.quantite, 0)
        totalQuantity.textContent = calculQuantity
}

//montant total
function montantTotalDisplay(item) {
    const montantTotal = document.querySelector("#totalPrice")
//Calcul du montant via la methode reduce
    const calculMontant = panier.reduce(
        (previousValue, item) => previousValue + item.prix 
        * item.quantite, 0)
    montantTotal.textContent = calculMontant
}
//**************** Fin - Mise en page du panier *************/