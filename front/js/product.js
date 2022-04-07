
const product = window.location.search.split("?").join("");

console.log(product);

let productsData = [];

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
    .then((res) => res.json())
    .then((promise) => {
        productsData = promise;
        console.log(promise);
    });
};

fetchProduct();
