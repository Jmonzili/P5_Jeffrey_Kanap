// ****** recupération de l'Id via l'url *****
const product = window.location.search.split("?").join("");
console.log(product);

// ****** Ajout de L'Id à L'url du catalogue *****
let productData = [];

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
    .then((res) => res.json())
    .then((promise) => {
        productData = promise;
        console.log(productData);
    });
};

// *** transfert des données vers leur élément ou ID respectif **
const productsDisplay = async () => {
    await fetchProduct();

    let itemImg = document.getElementsByClassName("item__img");
    console.log(itemImg); 
    
// ***** Tableau donc pas oublié l'index  *****
    itemImg[0].innerHTML = `
         <img src="${productData.imageUrl}" alt="${productData.altText}"> `

    document.getElementById("title").innerHTML = `
        ${productData.name} `

    document.getElementById("price").innerHTML = `
        ${productData.price}`

    document.getElementById("description").innerHTML = `
        ${productData.description}`

    let colorSelect = document.getElementById("colors");
    console.log(colorSelect);

    console.log(productData.colors);

// ***** création d'élément 'option' pour chaque couleur  *****
    productData.colors.forEach((color) => {
        let tagColor = document.createElement("option");

        tagColor.innerHTML = `${color}`;
        tagColor.value = `${color}`;

        colorSelect.appendChild(tagColor);
        console.log(tagColor);
    });
    addPanier(productData);
};

productsDisplay();

const addPanier = () => {
    let bouton = document.querySelector("button");
    console.log(bouton);
    bouton.addEventListener("click", function() {
        let addColor = document.querySelector("#colors");
        console.log(addColor.value);

        let addQuantity = document.querySelector("#quantity");
        console.log(addQuantity.value);

        let addProduct = JSON.parse(localStorage.getItem("produit"));

        const combiColorQuantity = Object.assign({}, productData, {
            couleur: `${addColor.value}`,
            quantité: `${addQuantity.value}`
        });

        console.log(combiColorQuantity);

        if(addProduct == null) {
            addProduct = [];
            addProduct.push(productData);
            localStorage.setItem("produit", JSON.stringify(cardProduct));
        };
        console.log(addProduct);
        /*
        let addId = product;
        console.log(addId);

        let addName = productData.name;
        console.log(addName);

        let addPrice = productData.price;
        console.log(addPrice);
        */
        
    });
};