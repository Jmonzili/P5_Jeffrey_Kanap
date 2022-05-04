// ---------- Recupération de l'Id via l'url -------------
const product = window.location.search.split("?").join("");
//Récupération des données sur tout le fichier
if(product != null) {
    let prixProduit = 0
    let imageProduit, altProduit, nameProduit
}
// ------------ Ajout de L'Id à L'url du catalogue -----------

fetch(`http://localhost:3000/api/products/${product}`)
    .then((res) => res.json())
    .then((promise) => productData(promise))

//-------Récupération des données du cataloque-----------
function productData(kanap) {
    const {colors, _id, name, price, imageUrl, description, altTxt} = kanap
    prixProduit = price
    imageProduit = imageUrl
    altProduit = altTxt
    nameProduit = name
    addImage(imageUrl, altTxt)
    addTitlePrice(name, price)
    addDescription(description)
    addColors(colors)
}
/************** DÉBUT - Mise en page dans le html ************/
//--------------Ajout de L'image------------
function addImage(imageUrl, altTxt) {
//création de l'élément
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
//insertion dans l'html
    const itemImg = document.querySelector(".item__img")
    if(itemImg != null) itemImg.appendChild(image)
}

//-------------Ajout du Nom du produit & du prix-----------------
function addTitlePrice(name, price) {
    const productName = document.querySelector("#title")
    if(productName != null) productName.textContent = name
    const productPrice = document.querySelector("#price")
    if(productPrice != null) productPrice.textContent = price
}

//-------------Ajout de la description----------------- 
function addDescription(description) {
    const productDescription = document.querySelector("#description")
    if(productDescription != null) productDescription.textContent = description
}

//----------------Ajout de L'option colors------------------
function addColors(colors) {
//Récupération de l'élément "select"
    const select = document.querySelector("#colors")
    if(select != null) {
//Boucle pour chaque couleur dans "colors"
        colors.forEach((color) => {
//créer un élément "option" 
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
//L'élément "option" est enfant de l'élément "select"
            select.appendChild(option)
        })
    }
}
/************** FIN - Mise en page dans le html ************/

/************** DÉBUT - Ajouter au panier ***********/
//Selectionner le bouton d'ajout
const buttonAdd = document.querySelector("#addToCart")
//Ecouté le click du bouton
buttonAdd.addEventListener("click", addToCart)

function addToCart () {
//Sélection des values color et quantité
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
//Ajout des conditions d'option des données choisi et de la redirection 
    if(optionInvalid (color, quantity)) return
    infoProductSelect (color, quantity)
    redirectAfterAdd(color)
}

//----------- Local Storage Stockage des choix du client
function infoProductSelect (color, quantity) {
//----------Variable contenant les choix de l'utilisateur--------------
//Combinaison id et color dans [key]
    const key = `${product}-${color}`
    const choixUser = {
        id: product,
        nom: nameProduit,
        image: imageProduit,
        imageDescription: altProduit,
        prix: prixProduit,
        couleur: color,
        quantite: Number(quantity),
        montant: prixProduit * Number(quantity),
    };
//transformation en format JSON & envoi dans le localStorage
    localStorage.setItem(key, JSON.stringify(choixUser))
}

//------------------ Option mal remplit -----------------
function optionInvalid (color, quantity) {
//Condition en cas d'élément vide
    if(color == null || color === "" 
    || quantity == null || quantity == 0) {
//alert en cas d'élément vide
        alert("Veuillez selectionnez une couleur et ajouter une quantité");
        return true;
    };
}

//----------------- Rediriger apres l'ajout -----------------
function redirectAfterAdd(color) {
//Rediriger vers la page panier
    if(window.confirm(`L'article ${nameProduit} ${color} a été ajouter au panier.
    Consultez le panier OK ou continuez vos achats ANNULER`)){
        window.location.href = "cart.html";
    }else{
        window.location.href = "index.html";
    }
}
/*************** FIN - Btn ajouter au panier ************/