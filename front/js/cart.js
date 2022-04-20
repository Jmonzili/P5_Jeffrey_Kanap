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
    
    cartEmplacement.innerHTML = `
    <article class="cart__item"> 
    <div> Votre panier est vide </div>
    </article>
    `;
}else {
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
if(selectionLocalStorage){
for (let g = 0; g < selectionLocalStorage.length; g++) {
    let prixProduitDuPanier = selectionLocalStorage[g].prix;
//----Envoie des prix dans "calculMontant"
    calculMontant.push(prixProduitDuPanier);
    console.log(calculMontant);
}};
/*
*/
//--------Addition des montant par la methode reduce----------
const initialValue = 0; 

const montantTotal = calculMontant.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  console.log("Joky");
  console.log(montantTotal);

//---Affichage du montant total------
const prixTotal = document.querySelector("#totalPrice");
prixTotal.innerHTML = `${montantTotal}`;
console.log(prixTotal);
//************************ Formulaire de commande ************/
//-------Sélection du bouton d'envoi du formulaire--------
const btnCommander = document.querySelector("#order");
console.log(btnCommander);

//----------------Ecoute du bouton commander---------------
btnCommander.addEventListener("click", (e) => {
e.preventDefault();
const formulaireValues = {
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
    const prenom = formulaireValues.firstName;
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
    const nom = formulaireValues.lastName;
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
    const ville = formulaireValues.city;
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
    const adresse = formulaireValues.address;
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
    const emailAddress = formulaireValues.email;
    if (regExEmail(emailAddress)) {
        return true;
    } else {
        document.querySelector("#emailErrorMsg").innerHTML = `
        L'email n'est pas valide `;
        return false;
    }
};

//-------------Vérification avant envois dans Local Storage---------------
if(controlePrenom() && controleNom() && controleVille() && controleAdresse() && controleEmail()) {
    //-------Envois de formulaireValues dans le localStorage--------
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
    console.log(controlePrenom());
}else {
    console.log(controlePrenom());
    alert("Veuillez remplire correctement le formulaire !" )
    
};

//*******************FIN - CONDITION DE VALIDATION DU FORMULAIRE*******************/

//Stocker les values du formulaire et les produits dans un object a envoyer au serveur
const aEnvoyer = {
    selectionLocalStorage,
    formulaireValues,
};
console.log("aEnvoyer");
console.log(aEnvoyer);

//---------------------Envoi vers le serveur-------------------
});

/*Conservé les values de formulaireValues dans les champs du formulaire */
//------------Envois de la key du localStorage vers une constante-------------
const dataLocalStorage = localStorage.getItem("formulaireValues");
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