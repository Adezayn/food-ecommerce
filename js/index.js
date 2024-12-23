const allMealCategory = `https://www.themealdb.com/api/json/v1/1/categories.php`;
const selectedAddress = document.getElementById("address");
const optionsBox = document.querySelector(".options");

 const domChanges = function () {
   const imgParent = document.querySelectorAll(".opt-item");
   for (let i = 0; i < imgParent.length; i++) {
     let mainImgParent = imgParent[i]; //Getting each parent box of all the parent boxes array
    //  if (selectedAddress.value) {
       mainImgParent.onclick = function () {
         // Store the text content of the clicked element
         localStorage.setItem("categoryName", this.children[1].textContent);
         localStorage.setItem(
           "categoryImage",
           this.children[0].getAttribute("src")
         );
         // Redirect to the vendor page
         location.href = `../html/vendor.html`;
       };
    //  } 
   }
 };
 
const fetchMealCategoriesOnLoad = async () => {
  console.log("triggered fetchMealCategoriesOnLoad");
  try {
    const response = await fetch(allMealCategory);
    const data = await response.json();
    // console.log(response, "===DATA==", data);
    const categories = data?.categories;
    renderApiCategoryList(categories);
  } catch (e) {
    renderApiCategoryList([]);
  }
};
fetchMealCategoriesOnLoad();

const renderApiCategoryList = (categories) => {
  categories.forEach((meal) => {
    const { strCategory, strCategoryThumb, strCategoryDescription } = meal;

    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "opt-item");

    const newImg = document.createElement("img");
    newImg.setAttribute("class", "item-img");
    newImg.setAttribute("src", `${strCategoryThumb}`);
    newDiv.appendChild(newImg);

    const categoryParagraph = document.createElement("p");
    categoryParagraph.textContent = `${strCategory}`;

    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = `${strCategoryDescription?.split(".")[0]}.`;

    newDiv.appendChild(categoryParagraph);
    newDiv.appendChild(descriptionParagraph);

    optionsBox.appendChild(newDiv);
    domChanges()
  });
};
