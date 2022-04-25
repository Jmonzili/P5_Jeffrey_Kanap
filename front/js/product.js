// ---------- Recupération de l'Id via l'url -------------
const product = window.location.search.split("?").join("");
console.log(product);

// ------------ Ajout de L'Id à L'url du catalogue -----------
let productData = [];

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
    .then((res) => res.json())
    .then((promise) => {
        productData = promise;
        console.log(productData);
    });
};
//**************** DÉBUT - Création du contenu HTML ****************/
// -------- transfert des données vers leur élément ou ID respectif -------
const productsDisplay = async () => {
    await fetchProduct();

    let itemImg = document.getElementsByClassName("item__img");
    
// --------------- Tableau donc pas oublié l'index  ------------
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

//-------- Création d'élément 'option' pour chaque couleur  -----------
    productData.colors.forEach((color) => {
        let tagColor = document.createElement("option");

        tagColor.innerHTML = `${color}`;
        tagColor.value = `${color}`;

        colorSelect.appendChild(tagColor);
    });
    addPanier(productData);
};

productsDisplay();
//**************** FIN - Création du contenu HTML ****************/


let addColor = document.querySelector("#colors");

let addQuantity = document.querySelector("#quantity");

//---------------selectionner le bouton d'ajout---------------
const addPanier = () => {
    let boutonAjoutPanier = document.querySelector("button");
//----------------Ecouté le click du bouton--------------------
    boutonAjoutPanier.addEventListener("click", (e) => {
        e.preventDefault();

//----------Variable contenant les choix de l'utilisateur--------------
let choixUser = {
    id_Select: `${productData._id}`,
    nom_Select: `${productData.name}`,
    photo_Select: `${productData.imageUrl}`,
    photo_Description: `${productData.altTxt}`,
    description_Select: `${productData.description}`,
    prix: productData.price,
    couleur_Select: `${addColor.value}`,
    quantite_Select: Number(addQuantity.value),
    montant: productData.price * addQuantity.value,
};
        const infoProductSelect = Object.assign({}, choixUser,);
        console.log("infoProductSelect");
        console.log(infoProductSelect);

//-------Alert si aucune couleur et/ou quantité sont selectionner-------
        if(addColor.value == null || addColor.value === "" 
        || addQuantity.value == null || addQuantity.value == 0) {
            alert("Veuillez selectionnez un couleur et ajouter une quantité");
            return;
        }; 

//------------------Local Storage---------------------
//-----------------Stockage des valeurs---------------
//----Création de variable "selectionLocalStorage"-----
        let selectionLocalStorage = JSON.parse(localStorage.getItem("products"));
//Conversion des objets JSON du local storage en JavaScript via "JSON.parse"

//fenetre pour continué les achats ou pour ce rendre au panier
        const fenetreConfirmation = () => {
            if(window.confirm(`L'article ${productData.name}, ${addColor.value} a été ajouter au panier.
            Consultez le panier OK ou continuez vos achats ANNULER`)){
                window.location.href = "cart.html";
            }else{
                window.location.href = "index.html";
            }
        }
//----------Fonction d'ajout dans le localStorage
    const sendLocalStorage = () => {
        selectionLocalStorage.push(infoProductSelect);
//-------transformation en format JSON en envoi dans le localStorage-------
        localStorage.setItem("products", JSON.stringify(selectionLocalStorage));
    };

//-----------Condition d'ajout dans le local storage-------------
        if(selectionLocalStorage) {
            //sendLocalStorage();
            fenetreConfirmation();
//------Augmenter la quantité si le produit ajouter a le -------
//------------------meme id et la meme couleur------------------
            for (i = 0; i < selectionLocalStorage.length; i++) {
                if (selectionLocalStorage[i].id_Select == productData._id &&
                    selectionLocalStorage[i].couleur_Select == addColor.value
                ) {
                    return(
        //Continué de travailler sur le calcul des quantité a l'ajout
                        selectionLocalStorage[i].quantite_Select += addQuantity.value,
                        selectionLocalStorage[i].prix += choixUser.prix,
                        localStorage.setItem("products",JSON.stringify(selectionLocalStorage)),
                        (selectionLocalStorage = JSON.parse(localStorage.getItem("products")))
                    );
                }
            }
//-------------------Si couleur ou ID different------------------
            for (i = 0; i < selectionLocalStorage.length; i++) {
                if (
                    (selectionLocalStorage[i].id_Select ==  productData._id &&
                    selectionLocalStorage[i].couleur_Select != addColor.value) || 
                    selectionLocalStorage[i].id_Select != productData._id
                ) { return(
                    sendLocalStorage()
                    );
                }
            }
        }else {
            selectionLocalStorage = [];
            sendLocalStorage();
            fenetreConfirmation(); 
        }
    });
    return (selectionLocalStorage = JSON.parse(localStorage.getItem("products")));
};
