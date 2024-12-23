const categoryName = localStorage.getItem("categoryName");
const categoryImage = localStorage.getItem("categoryImage");
const mealsByCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
const apiName = document.querySelector(".api-name");
const apiImage = document.querySelector(".api-img");
const notify = document.querySelector(".notification");
const cart = document.querySelector(".cart");
const checkoutBox = document.querySelector(".checkout-box");
const checkout = document.querySelector(".checkout");
const result = document.querySelector(".total-result");
const vendorPage = document.querySelector(".vendor-only");
const toCartPage = document.querySelector(".cart-out");
const apiListDom = document.querySelector(".api-list");
let notifyCount = 0;

apiName.textContent = categoryName;
apiImage.setAttribute("src", categoryImage);
const addDynamicButtonListeners = () => {
  const buttons = document.querySelectorAll(".button"); // Select all buttons, including newly added ones
  const foodItem = document.querySelectorAll(".food-item");
  const foodCost = document.querySelectorAll(".food-cost");
  const purchaseMade = document.getElementsByClassName("purchase");
  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      if (button.innerText === "Add to Cart") {
        button.style.backgroundColor = "#A5A5A5";
        button.style.color = "rgba(255, 255, 255, 1)";
        button.style.border = "none";
        button.innerHTML =
          '<img src = "../assets/remove.svg" class = "remove"/>Remove';
        notify.style.display = `inline-block`;
        notifyCount++;
        notify.innerText = notifyCount;
        // Add the food items and cost to the menu-list
        purchase(foodItem[index], foodCost[index]);
      } else if (button.innerText === "Remove") {
        button.style.backgroundColor = "#fff";
        button.style.color = "#ad4c4c";
        button.style.border = "1px solid #ad4c4c";
        button.innerText = "Add to Cart";
        notifyCount--;
        notify.innerText = notifyCount;
        // Remove the selected item
        purchaseMade[removePurchase(foodItem[index])].remove();
      }
      if (notifyCount <= 0) {
        notify.style.display = `none`;
        checkoutBox.style.display = `none`;
      }
    });
  });
};

const renderApiMealList = (categories) => {
  categories.forEach((meal) => {
    const { strMeal, strMealThumb } = meal;

    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "order");

    const newImg = document.createElement("img");
    newImg.setAttribute("src", `${strMealThumb}`);
    newDiv.appendChild(newImg);

    const newFoodItemParagraph = document.createElement("p");
    newFoodItemParagraph.setAttribute("class", "food-item");
    newFoodItemParagraph.textContent = `${strMeal}`;

    const newFoodCostParagraph = document.createElement("p");
    newFoodCostParagraph.setAttribute("class", "food-cost");
    newFoodCostParagraph.textContent = `#2,000`;

    const newPriceDiv = document.createElement("div");
    newPriceDiv.setAttribute("class", "price");
    newPriceDiv.appendChild(newFoodItemParagraph);
    newPriceDiv.appendChild(newFoodCostParagraph);
    newDiv.appendChild(newPriceDiv);

    const newButton = document.createElement("button");
    newButton.setAttribute("class", "button");
    newButton.textContent = "Add to Cart";
    newDiv.appendChild(newButton);

    apiListDom.appendChild(newDiv);
  });
  // Add event listeners to new buttons after rendering
  addDynamicButtonListeners();
};

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
  const purchaseMade = document.getElementsByClassName("purchase");
  const purchaseArray = [...purchaseMade];
  const selectedItem = purchaseArray.findIndex((ele) => {
    //looping through the array to return the selected item using the food-item name
    return ele.firstElementChild.innerText === foodItem.innerText;
  });
  //returns the food item selected to be removed
  return selectedItem;
};

////------------------------------------TOTAL-----------------------////

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
  const purchaseMade = document.getElementsByClassName("purchase");
  const ordered = document.querySelectorAll(".order");
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

  let allOutPath = [];
  getSrc.forEach((path) => {
    let outPath = path.outerHTML;
    allOutPath.push(outPath);
  });
  localStorage.setItem("orders", JSON.stringify(allOutPath));
};

//----------------------------EVENTLISTENERS---------------------------//
//VENDOR PAGE AND MENU LIST

const fetchMealCategoriesOnLoad = async () => {
  console.log("triggered");
  try {
    const response = await fetch(mealsByCategory);
    const data = await response.json();
   // console.log(response, "===DATA==", data);
    const meals = data?.meals
    renderApiMealList(meals);
  } catch (e) {
    renderApiMealList([]);
  }
};
fetchMealCategoriesOnLoad();

//OPENING AND CLOSING OF MENU LIST
let openCheckout = false;
cart.addEventListener("click", function () {
  //{add state variable}
  appearMenu(!openCheckout);
  openCheckout = !openCheckout;
});

//CART PAGE
toCartPage.addEventListener("click", function () {
  allOrderedItems();
  location.href = `/html/cart.html`;
});
