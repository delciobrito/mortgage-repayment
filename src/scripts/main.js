const form = document.querySelector(".form");
const formInputAmount = document.querySelector(".form__amount-input");
const formInputTerm = document.querySelector(".form__term-input");
const formInputRate = document.querySelector(".form__rate-input");
const formInputTypeRepayment = document.querySelector("#repayment");
const formInputTypeInterestOnly = document.querySelector("#interestOnly");
const formMortgageType = document.querySelector(".form__mortgageType");
const spanError = document.querySelectorAll(".error");
const spanSymbol = document.querySelectorAll(".symbol");
const buttonClearAll = document.querySelector(".form__header-buttonClearAll");
const result = document.querySelector(".result");
const repayments = document.querySelector(".repayments");

// const span símbolos
let amountSymbol;
let termSymbol;
let rateSymbol;

for (let span of spanSymbol) {
  switch (span.textContent) {
    case "£":
      amountSymbol = span;
      break;
    case "years":
      termSymbol = span;
      break;
    case "%":
      rateSymbol = span;
      break;
  }
}

// efeito de mouseover
formInputAmount.addEventListener("mouseover", () => {
  amountSymbol.addEventListener("mouseover", () => {
    amountSymbol.style.background = "hsl(61, 70%, 52%)";
  });
  amountSymbol.style.background = "hsl(61, 70%, 52%)";
});

formInputTerm.addEventListener("mouseover", () => {
  termSymbol.addEventListener("mouseover", () => {
    termSymbol.style.background = "hsl(61, 70%, 52%)";
  });
  termSymbol.style.background = "hsl(61, 70%, 52%)";
});

formInputRate.addEventListener("mouseover", () => {
  rateSymbol.addEventListener("mouseover", () => {
    rateSymbol.style.background = "hsl(61, 70%, 52%)";
  });
  rateSymbol.style.background = "hsl(61, 70%, 52%)";
});

// efeito de mouseout
formInputAmount.addEventListener("mouseout", () => {
  amountSymbol.addEventListener("mouseout", () => {
    amountSymbol.style.background = "";
  });
  amountSymbol.style.background = "";
});

formInputTerm.addEventListener("mouseout", () => {
  termSymbol.addEventListener("mouseout", () => {
    termSymbol.style.background = "";
  });
  termSymbol.style.background = "";
});

formInputRate.addEventListener("mouseout", () => {
  rateSymbol.addEventListener("mouseout", () => {
    rateSymbol.style.background = "";
  });
  rateSymbol.style.background = "";
});

// validação de entrada, aceitar somente números
const inputRegExp = /^[0-9]+$/;

const isValidInputAmount = () => {
  const validity =
    formInputAmount.value.length !== 0 &&
    inputRegExp.test(formInputAmount.value);
  return validity;
};

const isValidInputTerm = () => {
  const validity =
    formInputTerm.value.length !== 0 && inputRegExp.test(formInputTerm.value);
  return validity;
};

const isValidInputRate = () => {
  const validity =
    formInputRate.value.length !== 0 && inputRegExp.test(formInputRate.value);
  return validity;
};

const isValidInputTypeRepayment = () => {
  const validity = formInputTypeRepayment.checked;
  return validity;
};

const isValidInputTypeInterestOnly = () => {
  const validity = formInputTypeInterestOnly.checked;
  return validity;
};

const setInputClass = (isValid, input, spanSymbol) => {
  isValid ? input.classList.remove("invalid") : input.classList.add("invalid");
  isValid
    ? (input.textContent = "")
    : (input.textContent = "This field is required");
  isValid
    ? spanSymbol.classList.remove("invalid")
    : spanSymbol.classList.add("invalid");
};

const setInputRadioClass = (isValidRepayment, isValidInterestOnly, input) => {
  if (!isValidRepayment && !isValidInterestOnly) {
    input.className = "error invalid";
    input.textContent = "This field is required";
  } else {
    input.className = "error valid";
    input.textContent = "";
  }
};

const handleClearAll = () => {
  repayments.style.display = "none";
  result.style.display = "flex";
};

const showResult = (
  inputAmount,
  inputTerm,
  inputRate,
  inputTypeRepayment,
  inputTypeInterestOnly
) => {
  if (
    inputAmount &&
    inputTerm &&
    inputRate &&
    (inputTypeRepayment || inputTypeInterestOnly)
  ) {
    repayments.style.display = "flex";
    result.style.display = "none";
  } else {
    repayments.style.display = "none";
    result.style.display = "flex";
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  const inputAmount = isValidInputAmount();
  const inputTerm = isValidInputTerm();
  const inputRate = isValidInputRate();
  const inputTypeRepayment = isValidInputTypeRepayment();
  const inputTypeInterestOnly = isValidInputTypeInterestOnly();

  setInputClass(
    inputAmount,
    formInputAmount.parentNode.nextElementSibling, // parentNode é o nó pai, e nextElementSibling é o próximo nó (irmão)
    amountSymbol
  );
  setInputClass(
    inputTerm,
    formInputTerm.parentNode.nextElementSibling,
    termSymbol
  );
  setInputClass(
    inputRate,
    formInputRate.parentNode.nextElementSibling,
    rateSymbol
  );
  setInputRadioClass(
    inputTypeRepayment,
    inputTypeInterestOnly,
    formMortgageType.nextElementSibling
  );

  showResult(
    inputAmount,
    inputTerm,
    inputRate,
    inputTypeRepayment,
    inputTypeInterestOnly
  );
};

buttonClearAll.addEventListener("click", handleClearAll);
form.addEventListener("submit", handleSubmit);
