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

//Mise en place du recap produit
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
        localStorage.setItem(item.key, dataForSave)
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
    totalQuantityDisplay()
    montantTotalDisplay()
    deleteArticleFormPage(item)
    deleteDataFromCache(item)
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
//Actualisation de la page apres suppression
    window.location.href = "cart.html"
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
//**************** Fin - Mise en page du panier *************/

//**************** Début - Du Formulaire ********************/

//Séléction et écoute du bouton commander
const btnCommander = document.querySelector("#order")
btnCommander.addEventListener("click", (e) => submitForm(e))

function submitForm(e) {
    e.preventDefault()
//Alerte en cas de panier vide
    if (panier.length === 0) {
        alert("Veuillez ajouté un article a commander")
        return
    }

//Envoie des fonctions de controle d'erreur du formulaire
if(controlePrenom() || controleNom() || controleVille() || controleAdresse() || controleEmail()) {
    return
}

    const body = envoieVersServeur()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        const orderId = data.orderId
//Envois du numéro de commande dans le localStorage
        //localStorage.setItem("numéro de commande", JSON.stringify(orderId));
//Redirection vers la page confirmation
        window.location.href = `confirmation.html?${orderId}`
        return console.log(data)
    })
    .catch((err) => console.log(err))
}

//----------------- Controle des erreurs -------------------
//Contrôle de la validité du champ "prenom"
function controlePrenom() {
    const prenom = document.querySelector("#firstName")
    const regExPrenom = /^[A-Za-z]{3,20}$/
    if (regExPrenom.test(prenom.value) === false || prenom.value === "") {
        document.querySelector("#firstNameErrorMsg").innerHTML = `
        Chiffre et symbole ne sont pas autorisé.
        @ \n Seulement entre 3 et 20 caractères`
        alert('Veuillez remplire correctement le formulaire !')
        return true
    }
    return false
}

//Contrôle de la validité du champ "nom"
function controleNom() {
    const nom = document.querySelector("#lastName")
    const regExNom = /^[A-Za-z]{3,20}$/
    if (regExNom.test(nom.value) === false || nom.value === "") {
        document.querySelector("#lastNameErrorMsg").innerHTML = `
        Chiffre et symbole ne sont pas autorisé.
        @ \n Seulement entre 3 et 20 caractères`
        alert('Veuillez remplire correctement le formulaire !')
        return true
    }
    return false
}

//Contrôle de la validité du champ "ville"
function controleVille() {
    const ville = document.querySelector("#city")
    const regExVille = /^[A-Za-z]{3,20}$/
    if (regExVille.test(ville.value) === false || ville.value === "") {
        document.querySelector("#cityErrorMsg").innerHTML = `
        Chiffre et symbole ne sont pas autorisé.
        @ \n Seulement entre 3 et 20 caractères`
        alert('Veuillez remplire correctement le formulaire !')
        return true
    }
    return false
}

//Contrôle de la validité du champ "Adresse" 
function controleAdresse() {
    const adresse = document.querySelector("#address")
    const regExAdresse = /^[A-Za-z0-9\s]{5,50}$/
    if (regExAdresse.test(adresse.value) === false || adresse.value === "") {
        document.querySelector("#addressErrorMsg").innerHTML = `
        Ne doit contenir uniquement des lettres sans ponctuation et des chiffres`;
        alert('Veuillez remplire correctement le formulaire !')
        return true;
    } 
        return false;
};

//Contrôle de la validité du champ "Email"
function controleEmail() {
    const email = document.querySelector("#email")
    const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (regExEmail.test(email.value) === false || email.value === "") {
        document.querySelector("#emailErrorMsg").innerHTML = `
        L'email n'est pas valide `;
        alert('Veuillez remplire correctement le formulaire !')
        return true;
    }
    return false;
};

//fonction d'envois des données vers le serveur
function envoieVersServeur() {
    const formulaire = document.querySelector(".cart__order__form")
//Stockage de l'object contact et des produits dans un constante
    const body = { 
//stockage du formulaire dans l'object "contact" 
        contact: {
            firstName : document.querySelector("#firstName").value,
            lastName : document.querySelector("#lastName").value,
            address : document.querySelector("#address").value,
            city : document.querySelector("#city").value,
            email : document.querySelector("#email").value
        },
//stockage des produits récupérer dans l'object "products" 
        products: getIdsFromCache()
    }
    return body 
}

//fonction de récupération des id à envoyer dans la commmande
function getIdsFromCache() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
//".split()" pour séparé la key en 2 parties & select la 1er via "[0]"
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}
