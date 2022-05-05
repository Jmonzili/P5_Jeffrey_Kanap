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

//Ciblé le lieu de l'insertion du html
function panierDisplay(article) {
    document.querySelector("#cart__items").appendChild(article)
}


function productDisplay(item) {
//Insertion de l'article entier
    const article = createArticle(item)
//Insertion de L'image dans larticle
    const divImage = createImage(item)
    article.appendChild(divImage)
//Insertion du contenu des détails dans l'article
    const content = createContent(item)
    article.appendChild(content)
    panierDisplay(article)
    totalQuantityDisplay()
    montantTotalDisplay()
}

//Création de l'article entier
function createArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.couleur
    return article
}
//Creation de l'image dans le html
function createImage(item) {
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.image
    image.alt = item.imageDescription
    divImage.appendChild(image)
    return divImage
}

//Création de la div".cart__item__content"
function createContent(item) {
    const content = document.createElement("div")
    content.classList.add("cart__item__content")
//Ajout des partie Description et Settings 
    const description = createDescription(item)
    const settings = createSettings(item)
    content.appendChild(description)
    content.appendChild(settings)
    return content
}

//Creation de la description produit
function createDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
//Création des éléments
    const nameProduct = document.createElement("h2")
    nameProduct.textContent = item.nom
    const color = document.createElement("p")
    color.textContent = item.couleur
    const price = document.createElement("p")
    price.textContent = item.prix +" €"
//Ajout des éléments dans la div déscription
    description.appendChild(nameProduct)
    description.appendChild(color)
    description.appendChild(price)
    return description
}

//Création de la div contenant quantité & bouton delete
function createSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
//Ajout de la quantité et du bouton supprimer dans le settings
    addQuantity(settings, item)
    addDelete(settings, item)
    return settings
}

//Création de la quantité
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
    itemQuantity.value = item.quantite
    settings.appendChild(divQuantity)
    quantity.appendChild(itemQuantity)
// Eventlistener
    itemQuantity.addEventListener("input", () => updateQuantity(item.key, itemQuantity.value, item))
}

//Envois de la mise a jours de quantite dans le local storage
function updateQuantity(key, newValue, item) {
//récupération du produit a changer via la key=(id-color)
    const itemToChange = panier.find(item => item.key === key)
//Récupération de la nouvelle quantité
    itemToChange.quantite = Number(newValue)
    console.log(panier)
//Ajout des fonctions total pour la prise en compte de new value 
    totalQuantityDisplay()
    montantTotalDisplay()
}

//Création du btn supprimer
function addDelete(settings, item) {
    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    const buttonDelete = document.createElement("p")
    buttonDelete.classList.add("deleteItem")
    buttonDelete.textContent = "Supprimer"
    settings.appendChild(divDelete)
    divDelete.appendChild(buttonDelete)
    buttonDelete.addEventListener("click", () => deleteProduct(item))
}

//--------- Supprimer un produit du panier -----------
function deleteProduct(item) {
//Trouver l'index du produit a supprimer par l'id et la couleur
    const productToDelete = panier.find(
        (product) => product.key === item.key
    )
//Suppression par la methode splice
    panier.splice(productToDelete, 1)
    console.log(panier)
    totalQuantityDisplay()
    montantTotalDisplay()
    deleteDataFromCache(item)
    deleteArticleFormPage(item)
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
    console.log("produit supprimer", key)
}

//Fonction de sauvegarde des nouvelles données
function saveNewDataToCache(item) {
//Récupération des nouvelles données
    const dataForSave = JSON.stringify(item)
//Sauvegarde dans le local storage
    localStorage.setItem(item.key, dataForSave)
}

//--------------------TOTAL PANIER--------------------
//totalQuantite
function totalQuantityDisplay() {
    const totalQuantity = document.querySelector("#totalQuantity")
// Calcul de l'ensemble des quantités du panier
    const calculQuantity = panier.reduce(
        (previousValue, item) => previousValue + item.quantite, 0)
        totalQuantity.textContent = calculQuantity
}

//montant total
function montantTotalDisplay() {
    const montantTotal = document.querySelector("#totalPrice")
//Calcul du montant total via la methode reduce
    const calculMontant = panier.reduce(
        (previousValue, item) => previousValue + item.prix 
        * item.quantite, 0)
    montantTotal.textContent = calculMontant
}