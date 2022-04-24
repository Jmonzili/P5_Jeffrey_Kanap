//--------Récupération du numero de commande dans le local storage--------
const numeroCommande = localStorage.getItem("numero de commande");
console.log(`numero de commande: ${numeroCommande}`);

//------------Afficher le numero de commande dans le "main"------------
document.querySelector("#orderId").innerHTML =`
${numeroCommande}`;

//--------Supprimer le contenu du local storage sauf le formulaire---------
function deleteKeyLocalStorage(key) {
    localStorage.removeItem(key);
};
deleteKeyLocalStorage("products");
deleteKeyLocalStorage("numero de commande");

//

if(numeroCommande == null || products == null) {
    window.location.href="index.html";
}
