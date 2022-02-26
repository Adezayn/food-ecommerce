const clickAnchor = document.querySelectorAll(".button");
const notify = document.querySelector(".notification");
const cart = document.querySelector(".cart");
const checkoutBox = document.querySelector(".checkout-box");
const checkout = document.querySelector(".checkout");
const purchaseMade = document.getElementsByClassName("purchase");
const foodItem = document.querySelectorAll(".food-item");
const foodCost = document.querySelectorAll(".food-cost");
const result = document.querySelector(".total-result");
let notifyCount = 0;

////////FUNCTIONS FOR FEATURES
//TO ADD PURCHASES TO THE MENU LIST
const purchase = function (item, cost) {
  const html = `<div class="purchase">
  <div class="purchase-item">${item.textContent}</div>
  <div class="purchase-cost">${cost.textContent}</div>
  </div>`;
  checkout.insertAdjacentHTML("afterbegin", html);
};

//TO REMOVE ALREADY SELECTED PURCHASES FROM THE MENU LIST
const removePurchase = function (foodItem) {
  //converting updated HTMLCollection list to an Array
  const purchaseArray = [...purchaseMade];
  const selectedItem = purchaseArray.findIndex((ele) => {
    //looping through the array to return the selected item using the food-item name
    return ele.firstElementChild.innerText === foodItem.innerText;
  });
  //returns the food item selected to be removed
  return selectedItem;
};

//TO GET THE TOTAL COST OF THE ITEMS
const totalCost = function () {
  const costArray = [...purchaseMade];
  const reformed = costArray
    .map((ele) => Number(ele.lastElementChild.innerText.slice(1).replace(",",""))).reduce((acc, ele) =>{
      acc += ele;
      return acc;
    },0 ).toLocaleString();
 return result.innerText = `#${reformed}`
};

//ADDING FOR THE MENU LIST
const appearMenu = function (check = false) {
  if (check && notifyCount > 0) {
    checkoutBox.style.display = `inline-block`;
  } else {
    checkoutBox.style.display = `none`;
  }
  return check;
};

for (
  let i = 0;
  i < clickAnchor.length, i < foodItem.length, i < foodCost.length;
  i++
) {
  clickAnchor[i].addEventListener("click", function () {
    if (clickAnchor[i].innerText === "Add to Cart") {
      clickAnchor[i].style.backgroundColor = "#A5A5A5";
      clickAnchor[i].style.color = "rgba(255, 255, 255, 1)";
      clickAnchor[i].style.border = "none";
      clickAnchor[i].innerHTML =
        '<img src = "../assets/remove.svg" class = "remove"/>Remove';
      notify.style.display = `inline-block`;
      notifyCount++;
      notify.innerText = notifyCount;
      //adding the food items and cost to the menu-list
      purchase(foodItem[i], foodCost[i]);
      //total
      totalCost();
    } else if (clickAnchor[i].innerText === "Remove") {
      clickAnchor[i].style.backgroundColor = "#fff";
      clickAnchor[i].style.color = "#ad4c4c";
      clickAnchor[i].style.border = "1px solid #ad4c4c";
      clickAnchor[i].innerText = "Add to Cart";
      notifyCount--;
      notify.innerText = notifyCount;
      //passing the index of the selected item to the HTMLCollection to be removed.
      purchaseMade[removePurchase(foodItem[i])].remove();
      //total
      totalCost();
    }
    if (notifyCount <= 0) {
      notify.style.display = `none`;
      checkoutBox.style.display = `none`;
    }
  });
}
let openCheckout = false;
cart.addEventListener("click", function () {
  //{add state variable}
  appearMenu(!openCheckout);
  openCheckout = !openCheckout;
});
