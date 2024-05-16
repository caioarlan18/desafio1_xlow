async function fetchProducts() {
    try {
        const response = await fetch("http://desafio.xlow.com.br/search");
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

async function createProduct() {
    try {
        const container = document.querySelector('div.container');
        const products = await fetchProducts();
        const contagem = document.querySelector("div.contagem h1")
        contagem.innerHTML = `${products.length} produtos`
        products.forEach(async (product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add("container1");
            container.appendChild(productDiv);

            try {
                const response = await fetch(`http://desafio.xlow.com.br/search/${product.productId}`);
                const productDetails = await response.json();

                let imgCount = 0;
                let img1
                productDetails.forEach((details) => {
                    details.items.forEach((item) => {
                        item.images.forEach((img) => {
                            if (imgCount === 0) {
                                img1 = document.createElement("img");
                                img1.src = img.imageUrl;
                                productDiv.appendChild(img1);
                            }
                            imgCount++;
                        })
                    });
                });

            } catch (error) {
                console.error("Erro ao buscar detalhes do produto:", error);
            }
            const name = document.createElement("h1");
            name.innerHTML = product.productName
            productDiv.appendChild(name)
            const button = document.createElement('button');
            button.textContent = "Comprar";
            productDiv.appendChild(button);
        });
    } catch (error) {
        console.error("Erro ao criar produtos:", error);
    }
}

createProduct();

function ordem() {
    const productDivs = document.querySelectorAll(".container1");
    productDivs.forEach(productDiv => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            productDiv.classList.toggle("mudarCel");
        } else {
            productDiv.classList.toggle("mudarDesk");
        }
    });
}