//*******Récupération des produits dans le LocalStorage********
//Création de la constante "panier"
const panier= JSON.parse(localStorage.getItem("products"));
//const nombreItems = panier.length;

//**************** DÉBUT - Mise en page du panier *************/
//Boucle for pour répété la fonction à chaque article
panier.forEach((item) => productDisplay(item))

//Insertion de 
function productDisplay(item) {
    const product = createArticle(item)
    const divImage = createImage(item)
    product.appendChild(divImage)
    createContent(item)
    const content = createContent(item)
    product.appendChild(content)
    panierDisplay(product)
    totalQuantityDisplay(item)
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
    quantity.appendChild(itemQuantity)
    settings.appendChild(divQuantity)
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
    price.textContent = item.montant +" €"

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
//total quantité
function totalQuantityDisplay(item) {
    const totalQuantity = document.querySelector("#totalQuantity")
    totalQuantity.textContent = item.quantite
}

//**************** Fin - Mise en page du panier *************/