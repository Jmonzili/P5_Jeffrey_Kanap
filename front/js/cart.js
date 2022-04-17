//Récupération des produits dans le LocalStorage
let selectionLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(selectionLocalStorage);
/*
const cartDisplay = async () => {
    console.log("joky")
    if (addProduct) {
        await addProduct;
        console.log(addProduct); 
    }
};
*/
//----------Tableau récapitulatif des achats-------------
const cartEmplacement = document.querySelector("#cart__items");

//--------Condition d'affichage panier----------
if(selectionLocalStorage === null || selectionLocalStorage == 0) {
    const panierVide = `
    <article class="cart__item"> 
    <div> Votre panier est vide </div>
    </article>
    `;
    cartEmplacement.innerHTML = panierVide;
} else {
cartEmplacement.innerHTML =  selectionLocalStorage
.map((eltPanier) => `
<article class="cart__item" data-id="${eltPanier.id_Select}" data-color="${eltPanier.couleur_Select}">
    <div class="cart__item__img">
        <img src="${eltPanier.photo_Select}" alt="${eltPanier.photo_Descrition}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${eltPanier.nom_Select}</h2>
            <p>${eltPanier.couleur_Select}</p>
            <p>${eltPanier.prix * eltPanier.quantité_Select}€</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté :  </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${eltPanier.quantité_Select}">
            </div>
            
            <div class="cart__item__content__settings__delete">
                <button class="deleteItem">Supprimer</button>
            </div>
        </div>
    </div>
</article>`
)};

//--------------Supprimer un article--------------
//----------------Ecouté le click-----------------
const btnDelete = document.querySelectorAll(".deleteItem");

for (let f = 0; f < btnDelete.length; f++){
    btnDelete[f].addEventListener("click", (event) =>{
        event.preventDefault();
    console.log(event);
//--------Selection de l'id du produit a supprimer---------
    let id_produit_supprimer = selectionLocalStorage[f].id_Select;
    console.log(id_produit_supprimer);
//----------Selectionner l'élément a supprimer methode filter---------------
//----methode filter inversé grace a "!=="
    selectionLocalStorage = selectionLocalStorage.filter(el => el.id_Select !== id_produit_supprimer)
        console.log(selectionLocalStorage);
//----transfert de la variable dans le localStorage-----
//-------transformation en format JSON en envoi dans le localStorage-------
    localStorage.setItem("produit", JSON.stringify(selectionLocalStorage));
//------------Confirmation de suppression------------------
    alert("Le produit a bien été supprimer du panier");
    window.location.href = "panier.html";
    });
  
}

//---------Calcul du montant total et de quantité total---------
let calculMontant = [];

//-------------------Récuperation des montant--------------
/*
for (let g = 0; g < selectionLocalStorage.length; g++) {
    let prixProduitDuPanier = selectionLocalStorage[g].prix;
//----Envoie des prix dans "calculMontant"
    calculMontant.push(prixProduitDuPanier);
    console.log(calculMontant);
};
*/
//--------Addition des montant par la methode reduce----------


//---Affichage du montant total------

//************************ Formulaire de commande ************/
//-------Sélection du bouton d'envoi du formulaire--------
const btnCommander = document.querySelector("#order");
console.log(btnCommander);

//----------------Ecoute du bouton commander---------------
btnCommander.addEventListener("click", (e) => {
e.preventDefault();

// Récuperation des données du formulaire dans le localStorage

localStorage.setItem("firstName", document.querySelector("#firstName").value);
localStorage.setItem("lastName", document.querySelector("#lastName").value);
localStorage.setItem("address", document.querySelector("#address").value);
localStorage.setItem("city", document.querySelector("#city").value);
localStorage.setItem("email", document.querySelector("#email").value);

//-------------Creation de l'objet formulaire--------------
const formulaire = {
    prenom: localStorage.getItem("firstName"),
    nom: localStorage.getItem("lastName"),
    adresse: localStorage.getItem("address"),
    ville: localStorage.getItem("city"),
    email: localStorage.getItem("email")
}
console.log("formulaire")
console.log(formulaire)
//Stocker les values du formulaire et les produits dans un object a envoyer au serveur
const aEnvoyer = {
    selectionLocalStorage,
    formulaire
}
console.log(aEnvoyer);

//---------------------Envoi vers le serveur-------------------

});