// ---------- Recupération de l'Id via l'url -------------
const id = window.location.search.split("?").join("");
console.log(id);

// ------------ Ajout de L'Id à L'url du catalogue -----------

fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((promise) => productData(promise))

//-------Récupération des données du cataloque-----------
function productData(kanap) {
    const {colors, _id, name, price, imageUrl, description, altTxt} = kanap
    addImage(imageUrl, altTxt)
    addTitlePrice(name, price)
    addDescription(description)
    addColors(colors)
}
/******************Mise en page dans le html */
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
    const select = document.querySelector("#colors")
    if(select != null) {
//Boucle pour chaque color contenu dans "colors"
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