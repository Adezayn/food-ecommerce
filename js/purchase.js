const clickAnchor = document.querySelectorAll(".button");
const notify = document.querySelector(".notification");
const cart = document.querySelector(".cart");
const ordered = document.querySelectorAll(".order");
const checkoutBox = document.querySelector(".checkout-box");
const checkout = document.querySelector(".checkout");
const purchaseMade = document.getElementsByClassName("purchase");
const foodItem = document.querySelectorAll(".food-item");
const foodCost = document.querySelectorAll(".food-cost");
const result = document.querySelector(".total-result");
const vendorPage = document.querySelector(".vendor-only");
const toCartPage = document.querySelector(".cart-out");
const cartPage = document.querySelector(".cart-only");
const cartOrderContainer = document.querySelector(".cart-orders");
const selectedOrders = document.getElementsByClassName("selected-orders");
const close = document.getElementsByClassName("close");
const addIcon = document.getElementsByClassName("plus");
const minusIcon = document.getElementsByClassName("minus");
const countSpan = document.getElementsByClassName("count");
const cartCost = document.getElementsByClassName("cost");
const finalCost = document.querySelector(".total-cost");

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

////------------------------------------TOTAL-----------------------////
//TO GET THE TOTAL COST OF THE ITEMS
const totalCost = function () {
  const costArray = [...purchaseMade];
  const reformed = costArray
    .map((ele) =>
      Number(ele.lastElementChild.innerText.slice(1).replace(",", ""))
    )
    .reduce((acc, ele) => {
      acc += ele;
      return acc;
    }, 0)
    .toLocaleString();
  return (result.innerText = `#${reformed}`);
};

//TO GET THE FINAL TOTAL COST OF ALL ITEMS
const totalFinal = function (cost) {
  const reformed = cost
    .map((ele) => {
      return Number(ele.innerText.slice(1).replace(",", ""));
    })
    .reduce((acc, ele) => {
      acc += ele;
      return acc;
    }, 0)
    .toLocaleString();
  return (finalCost.innerText = `#${reformed}`);
};
//////-------------------------------------------------//////////////////

//ADDING FOR THE MENU LIST
const appearMenu = function (check = false) {
  if (check && notifyCount > 0) {
    checkoutBox.style.display = `inline-block`;
  } else {
    checkoutBox.style.display = `none`;
  }
  return check;
};

//TO CONVERT MONEY STRING TO NUMBER
const cartCostToNum = function () {
  const cost = [...cartCost];
  const reformedCost = cost.map((ele) => {
    return Number(ele.innerText.slice(1).replace(",", ""));
  });
  return reformedCost;
};

//GET ORDERED ITEMS TO THE CART PAGE
const allOrderedItems = function () {
  const totalArray = [...purchaseMade];
  const totalOrders = [...ordered];
  const getNames = totalArray.map((ele) => ele.firstElementChild.innerText);
  const getSrc = getNames.flatMap((ele) => {
    const srcValues = totalOrders
      .filter((order) => {
        let orderNames = order.children[1].children[0].innerText;
        if (ele === orderNames) {
          return order;
        }
      })
      .map((order) => {
        return order;
      });
    return srcValues;
  });

  getSrc.forEach((path) => {
    let orderImg = path.children[0].attributes.src.textContent;
    let orderName = path.children[1].children[0].innerText;
    let orderPrice = path.children[1].children[1].innerText;

    const html = ` <div class="selected-orders">
    <div class="item">
      <img src="../assets/close.svg" alt="close" class="close">
      <img src="${orderImg}" class="c-img">
      <div class="counter-info">
        <p class="order-name">${orderName}</p>
        <div class="counter">
          <img src="/assets/plus.svg" alt="plus" class="plus">
          <span class="count">${Number(1)}</span>
          <img src="/assets/Minus.svg" alt="minus" class="minus">
        </div>
      </div>
    </div>
    <div class="cost">${orderPrice}</div>
    </div>
    `;

    cartOrderContainer.insertAdjacentHTML("afterbegin", html);
  });
};

//----------------------------EVENTLISTENERS---------------------------//
//VENDOR PAGE AND MENU LIST
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

//OPENING AND CLOSING OF MENU LIST
let openCheckout = false;
cart.addEventListener("click", function () {
  //{add state variable}
  appearMenu(!openCheckout);
  openCheckout = !openCheckout;
});

//CART PAGE
toCartPage.addEventListener("click", function () {
  vendorPage.style.display = `none`;
  checkoutBox.style.display = `none`;
  notify.style.display = `none`;
  cartPage.style.display = `block`;
  cart.setAttribute("id", "this_cart");
  allOrderedItems();

  let closeItems = [...close];
  let ordersCart = [...selectedOrders];
  //DELETE ICON ON CART PAGE
  for (const [index, icon] of closeItems.entries()) {
    icon.addEventListener("click", function () {
      ordersCart[index].remove();
      const costRemove = [...cartCost];
      //Removal of ordered items from the final cost
      totalFinal(costRemove);
    });
  }

  let addItems = [...addIcon];
  let minusItems = [...minusIcon];
  let counting = [...countSpan];
  const cost = [...cartCost];
  const theCost = cartCostToNum();
  //INCREASING AND DECREASING ORDER
  for (
    let i = 0;
    i < counting.length, i < addItems.length, i < minusItems.length;
    i++
  ) {
    let defaultCost = theCost[i];
    let spanCount = 1;
    let eachCost;
    totalFinal(cost);
    // INCREASE NUMBER OF ITEMS AND COST
    addItems[i].addEventListener("click", function () {
      if (spanCount < 10) {
        spanCount++;
        counting[i].innerText = spanCount;
        addItems[i].style.cursor = `pointer`;
        eachCost = defaultCost * spanCount;
        cost[i].innerText = `#${eachCost.toLocaleString()}`;
        totalFinal(cost);
      } else {
        addItems[i].style.cursor = `auto`;
      }
    });
 // DECREASE NUMBER OF ITEMS AND COST
    minusItems[i].addEventListener("click", function () {
      if (spanCount > 1) {
        spanCount--;
        counting[i].innerText = spanCount;
        minusItems[i].style.cursor = `pointer`;
        eachCost = eachCost - defaultCost;
        cost[i].innerText = `#${eachCost.toLocaleString()}`;
        totalFinal(cost);
      } else {
        minusItems[i].style.cursor = `auto`;
      }
    });
  }
});
