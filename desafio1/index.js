async function fetchProducts() {
    try {
        const response = await fetch("https://desafio.xlow.com.br/search");
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('erro ', error);
    }
}

async function createProduct() {
    try {
        const container = document.querySelector('div.container');
        const products = await fetchProducts();
        const contagem = document.querySelector("div.contagem h1");
        contagem.innerHTML = `${products.length} produtos`;

        products.forEach(async (product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add("container1");
            container.appendChild(productDiv);


            //pegar imagens alternativas
            const imagens = [];
            try {
                const response = await fetch(`https://desafio.xlow.com.br/search/${product.productId}`);
                const productDetails = await response.json();
                productDetails.forEach((details) => {
                    details.items.forEach((item) => {
                        item.images.forEach((url) => {
                            imagens.push(url.imageUrl);

                        });
                    });
                });
            } catch (error) {
                console.error("erro ", error);
            }

            //pegar preço
            let price, promoprice;
            try {
                const response = await fetch(`https://desafio.xlow.com.br/search/${product.productId}`);
                const productDetails = await response.json();
                productDetails.forEach((details) => {
                    details.items.forEach((item) => {
                        item.sellers.forEach((preco) => {
                            price = preco.commertialOffer.PriceWithoutDiscount;
                            promoprice = preco.commertialOffer.Price;
                        })

                    });
                });
            } catch (error) {
                console.error("erro ", error);
            }

            //imagem principal do produto
            let mainImg = imagens[0];
            const tagImg = document.createElement("img");
            tagImg.src = mainImg;
            productDiv.appendChild(tagImg);
            //nome do produto
            const name = document.createElement("h1");
            name.innerHTML = product.productName;
            productDiv.appendChild(name);

            //imagens secundarias do produto 
            const divImg = document.createElement("div");
            divImg.classList.add("divimg");
            for (let x = 0; x < 3; x++) {
                const img1 = document.createElement("img");
                img1.src = imagens[x];
                img1.addEventListener("click", () => {
                    tagImg.src = img1.src;
                })
                if (imagens[x]) {
                    divImg.appendChild(img1);
                    productDiv.appendChild(divImg);

                }
            }

            //preço do produto
            if (price > promoprice) {
                const priceTag = document.createElement("h2");
                priceTag.classList.add("price");
                priceTag.innerHTML = `R$ ${price}`;
                productDiv.appendChild(priceTag)
                const promopriceTag = document.createElement("h2");
                promopriceTag.classList.add("promoprice");
                promopriceTag.innerHTML = `R$ ${promoprice}`;
                productDiv.appendChild(promopriceTag);
            } else {
                const promopriceTag = document.createElement("h2");
                promopriceTag.classList.add("promoprice");
                promopriceTag.innerHTML = `R$ ${promoprice}`;
                productDiv.appendChild(promopriceTag);
            }



            //botao de comprar do produto
            const button = document.createElement('button');
            button.textContent = "Comprar";
            productDiv.appendChild(button);

        });
    } catch (error) {
        console.error("erro ", error);
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