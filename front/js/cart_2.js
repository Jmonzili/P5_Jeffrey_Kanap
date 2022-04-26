//*******Récupération des produits dans le LocalStorage********
const panier= JSON.parse(localStorage.getItem("products"));
const nombreItems = panier.length;
console.log(panier);

panier.forEach((item) => productDisplay(item))

function productDisplay(item) {
    const product = createArticle(item)
    panierDisplay(product)
    console.log(product)
    const divImage = createImage(item)
    product.appendChild(divImage)
    const cartItemContent = createCartItemContent(item)
    product.appendChild(cartItemContent)
}
function createCartItemContent(item) {
    const content = document.createElement("div")
    content.classList.add("cart__item__content")

    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const nameProduct = document.createElement("h2")
    nameProduct.textContent = item.nom
    const color = document.createElement("p")
    color.textContent = item.couleur
    const price = document.createElement("p")
    price.textContent = item.montant +" €"

    content.appendChild(description)
    description.appendChild(nameProduct)
    description.appendChild(color)
    description.appendChild(price)
    return content
}

function panierDisplay(product) {
    document.querySelector("#cart__items").appendChild(product)
}

function createArticle(item) {
    const product = document.createElement("article")
    product.classList.add("cart__item")
    product.dataset.id = item.id
    product.dataset.color = item.couleur
    return product
}

function createImage(item) {
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.image
    image.alt = item.imageDescription
    divImage.appendChild(image)
    return divImage
}