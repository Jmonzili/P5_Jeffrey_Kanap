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

// ***** création d'élément 'option' pour chaque couleur  *****
    productData.colors.forEach((color) => {
        let tagColor = document.createElement("option");

        tagColor.innerHTML = `${color}`;
        tagColor.value = `${color}`;

        colorSelect.appendChild(tagColor);
    });
    addPanier(productData);
};

productsDisplay();

let addColor = document.querySelector("#colors");

let addQuantity = document.querySelector("#quantity");

//---------------selectionner le bouton d'ajout---------------
const addPanier = () => {
    let bouton = document.querySelector("button");
//----------------Ecouté le click du bouton--------------------
    bouton.addEventListener("click", (e) => {
        e.preventDefault();
        
        let choixUser = {
            id: `${productData._id}`,
            nom: `${productData.name}`,
            prix: `${productData.price}€`,
            couleur: `${addColor.value}`,
            quantité: `${addQuantity.value}`   
        };
        
        const infoProductSelect = Object.assign({}, choixUser);

        console.log(infoProductSelect);

//------------------Local Storage---------------------
//-----------------Stockage des valeurs---------------

//----Création de variable "selectionLocalStorage"-----
        let selectionLocalStorage = JSON.parse(localStorage.getItem("produit"));
//Conversion des objets JavaScript du local storage en JSON via "JSON.parse"
        console.log(selectionLocalStorage);
//fenetre pour continué les achats ou pour ce rendre au panier
        const fenetreConfirmation = () => {
            if(window.confirm(`L'article ${productData.name} , ${addColor.value} a été ajouter au panier.
            Consultez le panier OK ou continuez vos achats ANNULER`)){
                window.location.href = "cart.html";
            }else{
                window.location.href = "index.html";
            }
        }
//----------Fonction d'ajout dans le localStorage
    const sendLocalStorage = () => {
        selectionLocalStorage.push(infoProductSelect);
        localStorage.setItem("produit", JSON.stringify(selectionLocalStorage));
    };

//-----------Condition d'ajout dans le local storage-------------
        if(selectionLocalStorage){
            sendLocalStorage();
            fenetreConfirmation();
            }
        else{
            selectionLocalStorage = [];
            sendLocalStorage();
            fenetreConfirmation();
            
        }
    });
};
