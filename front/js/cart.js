let addProduct = JSON.parse(localStorage.getItem("produit"));


const cartDisplay = async () => {
    console.log("joky")
    if (addProduct) {
        await addProduct;
        console.log(addProduct); 
    }
};

cartDisplay();
