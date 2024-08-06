const API = fetch('https://fakestoreapi.com/products');
let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");
let localStorageData = JSON.parse(localStorage.getItem("data")) || [];
let emptyCart = document.getElementById("empty-cart");
function count() {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = localStorageData.map((x) => x.item).reduce((x, y) => x + y, 0);

};
count()
function generateCartItems() {
    API.then(response => response.clone().json())
        .then(data => {
            if (localStorageData.length !== 0) {
                return (ShoppingCart.innerHTML = localStorageData
                    .map((x) => {
                        console.log(x);
                        let { id, item } = x;
                        console.log(x.id);
                        let search = data.find((x) => x.id === id) || [];
                        let { title, image, price } = search;
                        return `
                        <div class="cart-item">
                           <div class="card-data">
                           <div class="me-4">
                           
                           <img width="100" src=${image} alt="" />
                           </div>
                           <div class="w-100">
                            <div class="details">
                            <div class="title-price-x">
                               <div class="d-flex  justify-content-between align-items-center">
                               <h5>${title}</h5>
                            <div>
                                <i onclick="removeItem(${id})" class="bi bi-x-lg">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.25 4.5H16.5V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5H9.75C9.15326 1.5 8.58097 1.73705 8.15901 2.15901C7.73705 2.58097 7.5 3.15326 7.5 3.75V4.5H3.75C3.55109 4.5 3.36032 4.57902 3.21967 4.71967C3.07902 4.86032 3 5.05109 3 5.25C3 5.44891 3.07902 5.63968 3.21967 5.78033C3.36032 5.92098 3.55109 6 3.75 6H4.5V19.5C4.5 19.8978 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21 6 21H18C18.3978 21 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8978 19.5 19.5V6H20.25C20.4489 6 20.6397 5.92098 20.7803 5.78033C20.921 5.63968 21 5.44891 21 5.25C21 5.05109 20.921 4.86032 20.7803 4.71967C20.6397 4.57902 20.4489 4.5 20.25 4.5ZM10.5 15.75C10.5 15.9489 10.421 16.1397 10.2803 16.2803C10.1397 16.421 9.94891 16.5 9.75 16.5C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V9.75C9 9.55109 9.07902 9.36032 9.21967 9.21967C9.36032 9.07902 9.55109 9 9.75 9C9.94891 9 10.1397 9.07902 10.2803 9.21967C10.421 9.36032 10.5 9.55109 10.5 9.75V15.75ZM15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5C14.0511 16.5 13.8603 16.421 13.7197 16.2803C13.579 16.1397 13.5 15.9489 13.5 15.75V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V15.75ZM15 4.5H9V3.75C9 3.55109 9.07902 3.36032 9.21967 3.21967C9.36032 3.07902 9.55109 3 9.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z" fill="#FF3333"/>
                                    </svg>
                                </i>
                            </div>
                               </div>

                               <h3 class="cart-item-price">Size: Large</h3>
                               <h3 class="cart-item-price mt-2">Color: White</h3>
                                <div class="d-flex  justify-content-between align-items-center">
                                <h3 class="cart-item-price">$ ${price}</h3>
                                 <div class="cart-buttons">
                                <div class="buttons d-flex">
                                <i onclick="decrement(${id})" class="bi bi-dash-lg">
                                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.8125 10.0001C17.8125 10.2488 17.7137 10.4872 17.5379 10.663C17.3621 10.8388 17.1236 10.9376 16.875 10.9376H3.125C2.87636 10.9376 2.6379 10.8388 2.46209 10.663C2.28627 10.4872 2.1875 10.2488 2.1875 10.0001C2.1875 9.75148 2.28627 9.51302 2.46209 9.33721C2.6379 9.16139 2.87636 9.06262 3.125 9.06262H16.875C17.1236 9.06262 17.3621 9.16139 17.5379 9.33721C17.7137 9.51302 17.8125 9.75148 17.8125 10.0001Z" fill="black"/>
</svg>

                                </i>
                                <div id=${id} class="quantity">${item}</div>
                                <i onclick="increment(${id})" class="bi bi-plus-lg">
                                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z" fill="black"/>
</svg>

                                </i>
                                </div>
                            </div>
                                </div>

                    </div>

                            </div>
                    </div
                            
                            </div>
                        </div>
                        `;
                    })
                    .join(""));
            }
            else {
                ShoppingCart.style.display = 'none';
                label.style.display = 'none';
                emptyCart.style.display = 'grid';

            }
        }).catch(error => console.error('Error:', error));
};
generateCartItems();
function increment(id) {
    let selectedItem = id;
    let search = localStorageData.find((x) => x.id === selectedItem) || [];

    if (search === undefined) {
        localStorageData.push({
            id: selectedItem,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    generateCartItems();
    TotalAmount();
    count()
    localStorage.setItem("data", JSON.stringify(localStorageData));
};

function decrement(id) {
    let selectedItem = id;
    let search = localStorageData.find((x) => x.id === selectedItem) || [];

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    localStorageData = localStorageData.filter((x) => x.item !== 0);
    generateCartItems();
    TotalAmount();
    count()
    localStorage.setItem("data", JSON.stringify(localStorageData));
};
function TotalAmount() {
    API.then(response => response.clone().json())
        .then(data => {
            if (localStorageData.length !== 0) {
                let Delivery = 15
                let amount = localStorageData
                    .map((x) => {
                        let { id, item } = x;
                        let filterData = data.find((x) => x.id === id) || [];
                        return filterData.price * item;
                    })
                    .reduce((x, y) => x + y);
                return (label.innerHTML = `
                    <div class="total">
                    <h5>Order Summary</h5>
                    <div class="d-flex justify-content-between align-items-center">
                        <p>Subtotal</p>
                        <h6>$ ${amount}</h6>
                   </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p>Delivery</p>
                        <h6>$ ${Delivery}</h6>
                   </div>
                   <div class="cards-total">
                    <div class="d-flex justify-content-between align-items-center">
                        <p>Total</p>
                        <h6>$ ${amount + Delivery}</h6>
                   </div>
                   </div>
                   <div class="apply">
                   <div class="w-100">
                        <input type="text" placeholder="Add promo code">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M23.0766 12.4857L13.7653 3.17444C13.5917 2.9997 13.3851 2.86115 13.1576 2.76685C12.93 2.67254 12.686 2.62435 12.4397 2.62507H3.75001C3.45164 2.62507 3.16549 2.7436 2.95451 2.95457C2.74353 3.16555 2.62501 3.4517 2.62501 3.75007V12.4398C2.62429 12.6861 2.67248 12.9301 2.76679 13.1576C2.86109 13.3852 2.99963 13.5918 3.17438 13.7654L12.4856 23.0766C12.8372 23.4281 13.3141 23.6256 13.8113 23.6256C14.3084 23.6256 14.7853 23.4281 15.1369 23.0766L23.0766 15.1369C23.4281 14.7853 23.6255 14.3085 23.6255 13.8113C23.6255 13.3141 23.4281 12.8373 23.0766 12.4857ZM13.8113 21.2204L4.87501 12.2813V4.87507H12.2813L21.2175 13.8113L13.8113 21.2204ZM9.37501 7.87507C9.37501 8.17174 9.28703 8.46175 9.12221 8.70842C8.95739 8.9551 8.72312 9.14736 8.44903 9.26089C8.17494 9.37442 7.87334 9.40412 7.58237 9.34625C7.2914 9.28837 7.02413 9.14551 6.81435 8.93573C6.60457 8.72595 6.46171 8.45868 6.40383 8.1677C6.34595 7.87673 6.37566 7.57513 6.48919 7.30104C6.60272 7.02695 6.79498 6.79269 7.04165 6.62786C7.28833 6.46304 7.57834 6.37507 7.87501 6.37507C8.27283 6.37507 8.65436 6.5331 8.93567 6.81441C9.21697 7.09571 9.37501 7.47724 9.37501 7.87507Z" fill="black" fill-opacity="0.4"/>
</svg>
                        </div>
                        <button class="">Apply
                   </div>
      <button class="checkout">Go to Checkout
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
<path d="M14.7959 4.4541L21.5459 11.2041C21.6508 11.3086 21.734 11.4328 21.7908 11.5696C21.8476 11.7063 21.8768 11.8529 21.8768 12.001C21.8768 12.149 21.8476 12.2957 21.7908 12.4324C21.734 12.5691 21.6508 12.6933 21.5459 12.7979L14.7959 19.5479C14.5846 19.7592 14.2979 19.8779 13.9991 19.8779C13.7002 19.8779 13.4135 19.7592 13.2022 19.5479C12.9908 19.3365 12.8721 19.0499 12.8721 18.751C12.8721 18.4521 12.9908 18.1654 13.2022 17.9541L18.0313 13.125L4.25 13.125C3.95163 13.125 3.66548 13.0065 3.4545 12.7955C3.24353 12.5846 3.125 12.2984 3.125 12C3.125 11.7017 3.24353 11.4155 3.45451 11.2045C3.66548 10.9936 3.95163 10.875 4.25 10.875L18.0313 10.875L13.2013 6.04598C12.9899 5.83463 12.8712 5.54799 12.8712 5.2491C12.8712 4.95022 12.9899 4.66357 13.2013 4.45223C13.4126 4.24088 13.6992 4.12215 13.9981 4.12215C14.297 4.12215 14.5837 4.24088 14.795 4.45223L14.7959 4.4541Z"/>
</svg>
      </button>
      </div>
      `);
            } else return;
        }).catch(error => console.error('Error:', error));
};

TotalAmount();
function removeItem(id) {
    let selectedItem = id;
    localStorageData = localStorageData.filter((x) => x.id !== selectedItem) || [];
    console.log(localStorageData);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(localStorageData));
    TotalAmount();
    count()

};
