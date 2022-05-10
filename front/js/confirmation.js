//Récupération du numero de commande dans le local storage                  
const panier = localStorage
const orderId = panier.getItem("numéro de commande")
const numeroCommande = document.querySelector("#orderId")

//Afficher le numero de commande 
numeroCommande.textContent = orderId

//Supprimer le contenu du local storage
panier.clear()

//Retour à la page d'accueil si local Storage vide
if(orderId == null ) {
    window.location.href="index.html";
}