let produitsData = [];

const fetchProduit = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        produitsData = promise;
        console.log(produitsData);
    });
};

async function produitDisplay() {
    await fetchProduit();

    document
        .getElementById("items").innerHTML = produitsData.map(
            (produit) =>
            `<a href="./product.html?id='${produit._id}'">
            <article>
            <img src="${produit.imageUrl}" alt="${produit.altTxt}">
            <h3 class="productName">${produit.name}</h3>
            <p class="productDescription">${produit.description}</p>
            </article>
            </a>`
            )
            .join('')
            ;
            
}

produitDisplay();
