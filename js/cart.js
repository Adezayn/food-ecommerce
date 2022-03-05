const cartOrderContainer = document.querySelector(".cart-orders");
const selectedOrders = document.getElementsByClassName("selected-orders");
const close = document.getElementsByClassName("close");
const cartCost = document.getElementsByClassName("cost");
const finalCost = document.querySelector(".total-cost");
const addIcon = document.getElementsByClassName("plus");
const minusIcon = document.getElementsByClassName("minus");
const countSpan = document.getElementsByClassName("count");

const parser = new DOMParser();

//-----------PAGE'S CONTENT------------------//
const getItem = JSON.parse(localStorage.getItem("orders"));
let convertHTML = getItem.map((ele) =>
  parser.parseFromString(ele, "text/html").querySelector(".order")
);
convertHTML.forEach((path) => {
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

//-----------------FUNCTIONS------------------//
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

//TO CONVERT MONEY STRING TO NUMBER
const cartCostToNum = function () {
  const cost = [...cartCost];
  const reformedCost = cost.map((ele) => {
    return Number(ele.innerText.slice(1).replace(",", ""));
  });
  return reformedCost;
};
let cost = [...cartCost];
//---------------DELETE ICON ON CART PAGE------------//
let closeItems = [...close];
let ordersCart = [...selectedOrders];
for (const [index, icon] of closeItems.entries()) {
  icon.addEventListener("click", function () {
    ordersCart[index].remove();
    const costRemove = [...cartCost];
    //Removal of ordered items from the final cost
    totalFinal(costRemove);
    cost = [...cartCost];
    
//---CLOSE CART PAGE WHEN ALL ORDERED ITEM ARE DELETED---//
    if (cost.length < 2){
        location.href = `/html/vendor.html`;
    }
  });
}

//----------------INCREASING AND DECREASING ORDER--------------//
let addItems = [...addIcon];
let minusItems = [...minusIcon];
let counting = [...countSpan];
const theCost = cartCostToNum();

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
