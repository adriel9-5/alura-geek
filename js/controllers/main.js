import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");






function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card")

    card.innerHTML = `
    <div class="imagen-container">
        <img src="${image}" alt="${name}">
     </div>

     <div class="informacion">
        <p class="car-titulo"> ${name}</p>  
    </div>

    <div class="value">
        <p>$ ${price}</p> 
        <button class="delete-button" data-id="${id}">
             <img class="borrar" src="assets/borrar.png" data-remove="true">
        </button>
    </div>`
    ;

    const botonBorrar = card.querySelector(".delete-button");

    botonBorrar.addEventListener("click", ()=> {
        servicesProducts.deleteProducts(id).then(()=> {
            card.remove();
        }).catch((err) => console.log(err));
    });
   

    productContainer.appendChild(card)
    return card;

}

const render = async ()=>{
    try {
        const listProducts = await servicesProducts.productList();

        listProducts.forEach(product => {
            productContainer.appendChild(createCard(
              product.name,
              product.price,
              product.image,
              product.id  
            ))
        });
        
    } catch (error) {
        console.log(error);
    }
    
}






form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name,price,image).then((res) => console.log(res)).catch((err) => console.log(err));
})




 render()

 

