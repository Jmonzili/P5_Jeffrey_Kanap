//*******Récupération des produits dans le LocalStorage********
const cart = [];
retrieveItemsfromCache()

function retrieveItemsfromCache () {
    const nombreItems = cart.length;
    for (let i = 0; i < nombreItems; i++) {
        const selectionLocalStorage = JSON.parse(localStorage.getItem("products"));
        cart.push(selectionLocalStorage)
    } console.log(nombreItems);
}