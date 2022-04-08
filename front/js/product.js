const product = window.location.search.split("?").join("");
console.log(product);

let productData = [];

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
    .then((res) => res.json())
    .then((promise) => {
        productData = promise;
        console.log(productData);
    });
};

const productsDisplay = async () => {
    await fetchProduct();

    let itemImg = document.getElementsByClassName("item__img");
    console.log(itemImg); 
    // = tableau donc ajouter index meme si contient un seul élément

    itemImg[0].innerHTML = `
         <img src="${productData.imageUrl}" alt="${productData.altText}"> `

    document.getElementById("title").innerHTML = `
        ${productData.name} `

    document.getElementById("price").innerHTML = `
        ${productData.price}`

    document.getElementById("description").innerHTML = `
        ${productData.description}`

    let colorSelect = document.getElementById("colors");
    console.log(colorSelect);

    console.log(productData.colors);
    
    productData.colors.forEach((color) => {
        let tagColor = document.createElement("option");

        tagColor.innerHTML = `${color}`;
        tagColor.value = `${color}`;

        colorSelect.appendChild(tagColor);
        console.log(tagColor);
    });

/*
    let colorSelect = document.getElementById("colors");
    console.log(colorSelect);
    console.log(productData.colors);

    productData.colors.forEach((color) => {
<option value="vert">vert</option>
    })
*/
    
};

productsDisplay();

