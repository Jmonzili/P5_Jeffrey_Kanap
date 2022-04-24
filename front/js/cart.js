//Récupération des produits dans le LocalStorage
let selectionLocalStorage = JSON.parse(localStorage.getItem("products"));
console.log(selectionLocalStorage);

//----------Tableau récapitulatif des achats-------------
const cartEmplacement = document.querySelector("#cart__items");

//--------Condition d'affichage panier----------
if(selectionLocalStorage === null || selectionLocalStorage == 0) {
    
    cartEmplacement.innerHTML = `
    <article class="cart__item"> 
    <div> Votre panier est vide </div>
    </article>
    `;
}else {
cartEmplacement.innerHTML = selectionLocalStorage
.map((eltPanier) => `
<article class="cart__item" data-id="${eltPanier.id_Select}" data-color="${eltPanier.couleur_Select}">
    <div class="cart__item__img">
        <img src="${eltPanier.photo_Select}" alt="${eltPanier.photo_Descrition}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${eltPanier.nom_Select}</h2>
            <p>${eltPanier.couleur_Select}</p>
            <p>${eltPanier.prix}€</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté :  </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${eltPanier.quantite_Select}">
            </div>
            
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>`
)};
/*
//******************Changer la quantité depuis le panier******************
let itemQuantity = document.querySelector(".itemQuantity");
itemQuantity.addEventListener("input", console.log);
console.log("itemQuantity");
console.log(itemQuantity);
*/
//--------------Supprimer un article--------------

//----------------Ecouté le click-----------------
const btnDelete = document.querySelectorAll(".deleteItem");

for (let f = 0; f < btnDelete.length; f++){
    btnDelete[f].addEventListener("click", (event) =>{
        event.preventDefault();
    console.log(event);
//--------Selection de l'id du produit a supprimer---------
    let id_produit_supprimer = selectionLocalStorage[f].id_Select && selectionLocalStorage[f].couleur_Select.value;
    console.log(id_produit_supprimer);
//----------Selectionner l'élément a supprimer methode filter---------------
//----methode filter inversé grace a "!=="
    selectionLocalStorage = selectionLocalStorage.filter(el => el.id_Select !== id_produit_supprimer)
        console.log(selectionLocalStorage);
//----transfert de la variable dans le localStorage-----
//-------transformation en format JSON en envoi dans le localStorage-------
    localStorage.setItem("products", JSON.stringify(selectionLocalStorage));
//------------Confirmation de suppression------------------
    alert("Le produit a bien été supprimer du panier");
    window.location.href = "cart.html";
    });
  
}

//---------Calcul du montant total et de quantité total---------
let calculMontant = [];
let calculQuantity =[];

//-------------------Récuperation des montant--------------
if(selectionLocalStorage){
for (let g = 0; g < selectionLocalStorage.length; g++) {
    let prixProduitDuPanier = selectionLocalStorage[g].prix;
//----Envoie des prix dans "calculMontant"
    calculMontant.push(prixProduitDuPanier);
    console.log(calculMontant);
}};

//-------------------Récuperation des quantité--------------
if(selectionLocalStorage){
    for (let h = 0; h < selectionLocalStorage.length; h++) {
        let quantiteDuPanier = selectionLocalStorage[h].quantite_Select;
    //----Envoie des quantité dans "calculQuantity"
        calculQuantity.push(quantiteDuPanier);
        console.log(quantiteDuPanier);
    }};
//--------Addition des montant par la methode reduce----------
const initialValue = 0; 

const montantTotal = calculMontant.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
//--------Addition des quantité par la methode reduce----------
const quantityTotal = calculQuantity.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

//---Affichage du montant total du panier------
const prixTotal = document.querySelector("#totalPrice");
prixTotal.innerHTML = `${montantTotal}`;
console.log(prixTotal);

//---Affichage de la quantité total du panier------
const allQuantity = document.querySelector("#totalQuantity");
allQuantity.innerHTML = `${quantityTotal}`;
console.log(allQuantity);

//************************ Formulaire de commande ************/
//-------Sélection du bouton d'envoi du formulaire--------
const btnCommander = document.querySelector("#order");
console.log(btnCommander);

//********************ECOUTE DU BOUTON COMMANDER**************************/
btnCommander.addEventListener("click", (e) => {
e.preventDefault();
const contact = {
    firstName : document.querySelector("#firstName").value,
    lastName : document.querySelector("#lastName").value,
    address : document.querySelector("#address").value,
    city : document.querySelector("#city").value,
    email : document.querySelector("#email").value
}

//*******************CONDITION DE VALIDATION DU FORMULAIRE*******************/
const textAlert = (value) => {
    return `Chiffre et symbole ne sont pas autorisé. \n Seulement entre 3 et 20 caractères`;
}
const regExPrenom = (value) => {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
};

const regExNomVille = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
};

const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
}

const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

function controlePrenom() {
    //-----------------Contrôle de la validité du prenom ---------------
    const prenom = contact.firstName;
    if(regExPrenom(prenom)) {
        return true;
    } else {
        document.querySelector("#firstNameErrorMsg").innerHTML = `
        ${textAlert()}`;
        return false;
    }
};

function controleNom() {
    //-----------------Contrôle de la validité du nom ---------------
    const nom = contact.lastName;
    if (regExNomVille(nom)) {
        return true;
    } else {
        document.querySelector("#lastNameErrorMsg").innerHTML = `
        ${textAlert()}`;
        return false;
    }
};

function controleVille() {
    //-----------------Contrôle de la validité du champ "ville" ---------------
    const ville = contact.city;
    if (regExNomVille(ville)) {
        return true;
    } else {
        document.querySelector("#cityErrorMsg").innerHTML = `
        ${textAlert()}`;
        return false;
    }
};

function controleAdresse() {
    //-----------------Contrôle de la validité du champ "Adresse" ---------------
    const adresse = contact.address;
    if (regExAdresse(adresse)) {
        return true;
    } else {
        document.querySelector("#addressErrorMsg").innerHTML = `
        Ne doit contenir uniquement des lettres sans ponctuation et des chiffres`;
        return false;
    }
};

function controleEmail() {
    //-----------------Contrôle de la validité du champ "Email" ---------------
    const emailAddress = contact.email;
    if (regExEmail(emailAddress)) {
        return true;
    } else {
        document.querySelector("#emailErrorMsg").innerHTML = `
        L'email n'est pas valide `;
        return false;
    }
};
//Stocker l'Id des produits dans un array a envoyer au serveur
let products = [];
for (let i = 0; i < selectionLocalStorage.length; i++) {
    let productsId = selectionLocalStorage[i].id_Select;
    products.push(productsId);
};
console.log("products");
console.log(products);

//-------------Vérification avant envois dans Local Storage---------------
if(controlePrenom() && controleNom() && controleVille() && controleAdresse() && controleEmail()) {
    //-------Envois de formulaireValues dans le localStorage--------
    localStorage.setItem("contact", JSON.stringify(contact));
    envoieVersServeur();
}else {
    alert("Veuillez remplire correctement le formulaire !" )
};
//*******************FIN - CONDITION DE VALIDATION DU FORMULAIRE*******************/
function envoieVersServeur() {
    //---------------------Envoi vers le serveur-------------------
const sendToServer = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify({contact, products}),
    headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
    },
});

//----------Afficher le résultat du serveur dans la console------------
sendToServer.then(async(response) => {
    //Gestion de l'envoie en cas d'erreur
    try{
        const contenu = await response.json();
        console.log("contenu response");
        console.log(contenu);
        if(response.ok) {
            console.log(`Résultat de reponse.ok : ${response.ok}`);
            // Récupération de "orderId" 
            console.log(contenu.orderId);
            //Envoie de "orderId" dans le local storage
            localStorage.setItem("numero de commande", contenu.orderId);
            //Transfert vers la page de confirmation
            window.location = "confirmation.html";
        }else {
            console.log(`Réponse du serveur : ${response.status}`);
        }
    
    }catch(e) {
        console.log(e);
    }
});
};
});
//********************FIN - ECOUTE DU BOUTON COMMANDER*********************/

/*Conservé les values de formulaireValues dans les champs du formulaire */
//------------Envois de la key du localStorage vers une constante-------------
const dataLocalStorage = localStorage.getItem("contact");
if(dataLocalStorage) {
//--------------------Conversion en objet Javascript-------------------
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//----Fonction de remplissange du formulaire par données du localStorage------
function saveFormulaire(input) {
    document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
};

saveFormulaire("firstName");
saveFormulaire("lastName");
saveFormulaire("address");
saveFormulaire("city");
saveFormulaire("email");
};