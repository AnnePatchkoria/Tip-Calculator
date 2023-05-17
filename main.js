const tip = document.querySelectorAll(".tip-item");
const tipTotal = document.querySelector(".total-tip");
const total = document.querySelector(".total");
const reset = document.querySelector(".reset");
const errorMessage = document.querySelector(".error-message");
let percent = 0;

tip.forEach((n) =>
  n.addEventListener("click", () => {
    percent = parseFloat(n.textContent);
    document.querySelector("#custom").value = "";
    tip.forEach((n) => n.classList.remove("active"));
    n.classList.toggle("active");
    calculateTip();
  })
);

reset.addEventListener("click", () => {
  tipTotal.innerHTML = "$0.00";
  total.innerHTML = "$0.00";
  document.querySelector("#custom").value = "";
  document.querySelector("#bill").value = 0;
  if (document.querySelector(".tip--custom").classList.contains("error")) {
    document.querySelector(".tip--custom").classList.remove("error");
  }
  if (document.querySelector(".bill").classList.contains("error")) {
    document.querySelector(".bill").classList.remove("error");
  }
  document.querySelector("#people-amount").value = 0;
  tip.forEach((n) => {
    if (n.classList.contains("active")) {
      n.classList.remove("active");
    }
  });
  if (errorMessage.classList.contains("error")) {
    errorMessage.classList.remove("error");
    document.querySelector("#people-amount").classList.remove("error");
  }
  if (!reset.classList.contains("active")) {
    reset.classList.add("active");
  }
});

function calculateTip() {
  const bill = +document.querySelector("#bill").value;
  const people = +document.querySelector("#people-amount").value;
  if ((bill === 0) | (people === 0) | (percent === 0)) {
    tipTotal.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
    if (reset.classList.contains("active")) {
      reset.classList.remove("active");
    }
  } else {
    reset.classList.remove("active");
    tipTotal.innerHTML = `$${(((bill / people) * percent) / 100).toFixed(2)}`;
    total.innerHTML = `$${(
      bill / people +
      ((bill / people) * percent) / 100
    ).toFixed(2)}`;
  }
  if (bill <= 10000) {
    if (document.querySelector(".bill").classList.contains("error")) {
      document.querySelector(".bill").classList.remove("error");
    }
  } else {
    document.querySelector(".bill").classList.add("error");
  }
  if (document.querySelector("#people-amount").value <= 0) {
    errorMessage.classList.add("error");
    document.querySelector("#people-amount").classList.remove("error");
  } else {
    errorMessage.classList.remove("error");
    document.querySelector("#people-amount").classList.remove("error");
  }
  if (document.querySelector(".tip--custom").classList.contains("error")) {
    document.querySelector(".tip--custom").classList.remove("error");
  }
}

function calculateTipCustom() {
  const bill = +document.querySelector("#bill").value;
  const people = +document.querySelector("#people-amount").value;
  const custom = +document.querySelector("#custom").value;
  percent = custom;
  if (reset.classList.contains("active")) {
    reset.classList.remove("active");
  }
  if (bill === 0 || people === 0) {
    tipTotal.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
  } else if (custom <= 100 && custom >= 0) {
    tipTotal.innerHTML = `$${(((bill / people) * percent) / 100).toFixed(2)}`;
    total.innerHTML = `$${(
      bill / people +
      ((bill / people) * percent) / 100
    ).toFixed(2)}`;
  } 
  
  if (custom > 100) {
    tipTotal.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
    console.log("Type less than 100");
    document.querySelector(".tip--custom").classList.add("error"); 
  } else {
    if (document.querySelector(".tip--custom").classList.contains("error")) {
      document.querySelector(".tip--custom").classList.remove("error");
    }
  }
}

function removeActive() {
  tip.forEach((n) => n.classList.remove("active"));
}
