let modelesData = [];

const fetchModeles = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        modelesData = promise;
        console.log(modelesData);
    });
};

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
    .join('');
/*
    let idLinks = 
    document.querySelectorAll(".link-modele");
    console.log(idLinks);

    idLinks.forEach((link) =>
    link.addEventListener("click", () => {
        console.log(link);
        
        window.location.search = `./product.html?id${modele._id}`;
    }),
    );   
*/
};

modelesDisplay();
