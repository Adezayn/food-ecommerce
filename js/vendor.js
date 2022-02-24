const clickAnchor = document.querySelectorAll(".button");
const notify = document.querySelector(".notification");
const cart = document.querySelector(".cart");
const checkout = document.querySelector(".checkout");
const total = document.querySelector(".total-result")
let notifyCount = 0;

for (let button of clickAnchor) {
  console.log(button);

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
      //OR use prefix plus plus operator:  notify.innerText = ++notifyCount;
    } else if (button.innerText === "Remove") {
      button.style.backgroundColor = "#fff";
      button.style.color = "#ad4c4c";
      button.style.border = "1px solid #ad4c4c";
      button.innerText = "Add to Cart";
      notifyCount--;
      notify.innerText = notifyCount;
    }
    if (notifyCount <= 0) {
      notify.style.display = `none`;
    }
  });
}

let openCheckout = false;
cart.addEventListener("click", function () {
  checkout.style.display = `inline-block`;
  //{add state variable}
});
