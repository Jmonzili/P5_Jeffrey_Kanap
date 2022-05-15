//Récupération du numero de commande dans le local storage                  
const panier = localStorage
//const orderId = panier.getItem("numéro de commande")
const orderId = window.location.search.split("?").join("")
const numeroCommande = document.querySelector("#orderId")

//Afficher le numero de commande 
numeroCommande.textContent = orderId

//Supprimer le contenu du local storage
panier.clear()

/*
//Retour à la page d'accueil si local Storage vide
if(panier.length = 0) {
    window.location.href = "index.html";
}
*/