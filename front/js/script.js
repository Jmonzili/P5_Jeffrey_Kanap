// **** Création de tableau des différent modeles ****
let modelesData = [];
 
// *** Envoi des données du catalogue vers le tableau via L'API ***
const fetchModeles = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        modelesData = promise;
        console.log(modelesData);
    });
};

// ***** Création des éléments HTML dans L'Id "#items" *****
async function modelesDisplay() {
    await fetchModeles();

    document.getElementById("items").innerHTML = modelesData
    .map(
        (modele) => `
    <a href="./product.html?${modele._id}">
    <article>
    <img src="${modele.imageUrl}" alt="${modele.altTxt}">
    <h3 class="productName">${modele.name}</h3>
    <p class="productDescription">${modele.description}</p>
    </article>
    </a>`,
    )

    // **.join('') pour la suppression des virgules ***
    .join(''); 
};

modelesDisplay();
