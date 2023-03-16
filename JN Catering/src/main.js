let shop = document.getElementById('shop');
if (!shop) {
  shop = document.createElement('div');
  shop.id = 'shop';
  document.body.appendChild(shop);
}

let basket = JSON.parse(localStorage.getItem("data")) || [];

  // Slideshow on hero section
  let slides = document.querySelectorAll('.slideshow img');
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide,3000);
  
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].classList.add('active');
  }
  // Get a reference to the "Order Now" button and the order form section
  let orderNowButton = document.querySelector('#order-now-button');
  let orderFormSection = document.querySelector('#shop');
  
  // Add an event listener to the "Order Now" button that scrolls to the order form section when clicked
  orderNowButton.addEventListener('click', () => {
    rto.scrollIntoView({ behavior: 'smooth' });
  });
 

  let generateShop = () => {
    return (shop.innerHTML = `
      <div class="meat-grid">
        ${shopItemsData
          .filter((x) => x.type === "meat")
          .map((x) => {
            let { id, name, price, desc, img } = x;
            let search = basket.find((x) => x.id === id) || {};
            return `            
              <div id="meat-product-id-${id}">
                <img width="220" height="220" src="${img}" alt="default-one">
                <div class="details">
                  <h3>${name}</h3>
                  <p>${desc}</p>
                  <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                      <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                      <div id="meat-quantity-${id}" class="quantity">${search.item || 0}</div>
                      <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                  </div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
      <div class="side-grid">
        ${shopItemsData
          .filter((x) => x.type === "side")
          .map((x) => {
            let { id, name, price, desc, img } = x;
            let search = basket.find((x) => x.id === id) || {};
            return `
              <div id="side-product-id-${id}">
                <img width="220" height="220" src="${img}" alt="default-one">
                <div class="details">
                  <h3>${name}</h3>
                  <p>${desc}</p>
                  <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                      <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                      <div id="side-quantity-${id}" class="quantity">${search.item || 0}</div>
                      <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                  </div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `);
  };
  generateShop();
  
  
  let increment = (id) => {
    let search = basket.find((x) => x.id === id);
  
    if (search === undefined) {
      basket.push({
        id: id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
  
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
  };
  let decrement = (id) => {
    let search = basket.find((x) => x.id === id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
  };
  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(`meat-quantity-${id}`).innerHTML = search.item;
    calculation();
  };
   
  let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  calculation();




