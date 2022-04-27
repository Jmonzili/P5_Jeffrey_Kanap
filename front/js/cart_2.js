//*******Récupération des produits dans le LocalStorage********
//Création de la constante "panier"
const panier= JSON.parse(localStorage.getItem("products"));
//const nombreItems = panier.length;

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
    addDelete(settings)
    return settings
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
    itemQuantity.addEventListener("change", () => changeQuantity(item.id, itemQuantity.value, item))
    quantity.appendChild(itemQuantity)
    settings.appendChild(divQuantity)
}

//Envois de la mise a jours de quantite dans le local storage
function changeQuantity(id, newValue, item) {
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
//Sauvegarde dans le local storage
    localStorage.setItem(item.id, dataForSave)
}

//Insertion du btn supprimer
function addDelete(settings) {
    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    const buttonDelete = document.createElement("p")
    buttonDelete.classList.add("deleteItem")
    buttonDelete.textContent = "Supprimer"
    divDelete.appendChild(buttonDelete)
    settings.appendChild(divDelete)
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