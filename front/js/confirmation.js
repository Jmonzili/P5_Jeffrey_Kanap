//Récupération du numero de commande dans le local storage
const orderId = localStorage.getItem("numéro de commande");
console.log(`numéro de commande: ${orderId}`);

//Afficher le numero de commande dans le "main"
document.querySelector("#orderId").innerHTML =`
${orderId}`;

//Supprimer le contenu du local storage sauf le formulaire
localStorage.clear();

//Retour à la page d'accueil une fois le local Storage vide
if(orderId == null ) {
    window.location.href="index.html";
}