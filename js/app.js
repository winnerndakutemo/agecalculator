const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");
const errorParagraphs = document.querySelectorAll(".error");

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (areEmptyFields(inputs)) {
      e.target.parentElement.parentElement.dispatchEvent(
        new CustomEvent("emptyFields")
      );
      //avoiding extra validation
      if (!e.target.value.trim()) {
        return;
      }
    } else {
      errorParagraphs.forEach((paragraph) => {
        paragraph.classList.add("error-hidden");
        paragraph.innerHTML = "This Field is required";
      });
      inputs.forEach((input) => {
        input.classList.remove("input-error");
      });
    }
    if (!areEmptyFields(inputs) && isValid(e.target)) {
      //Calculate date
      const [day, month, year] = [
        inputs[0].value,
        inputs[1].value,
        inputs[2].value,
      ];
      const age = getAge(year, month, day);
      insertAge(age);
    } else if (!isValid(e.target)) {
      const paragraph = e.target.parentElement.querySelector(".error");
      paragraph.classList.remove("error-hidden");
      paragraph.innerHTML = "Enter a valid " + e.target.id;
      e.target.classList.add("input-error");
      insertAge({
        years: "--",
        months: "--",
        days: "--",
      });
      return;
    }
  });
});

form.addEventListener("emptyFields", (e) => {
  errorParagraphs.forEach((paragraph) => {
    if (!paragraph.parentElement.querySelector("input").value.trim()) {
      paragraph.classList.remove("error-hidden");
      paragraph.innerHTML = "This Field is required";
    } else {
      paragraph.classList.add("error-hidden");
    }
  });
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("input-error");
    } else {
      input.classList.remove("input-error");
    }
  });
});
/**
 *
 * @param {DOMTokenList} inputs
 * @returns {Boolean} TRUE if all given inputs are NOT empty otherwise FALSE
 */
function areEmptyFields(inputs) {
  for (let input of inputs) {
    if (!input.value.trim()) {
      return true;
    }
  }

  return false;
}

/**
 * Checks if the value of the input element is in a valide date format!
 * @param {HTMLInputElement} input
 * @returns {Boolean} TRUE if the value is correct otherwise, FALSE
 */
function isValid(input) {
  if (input.id === "day") {
    return input.value <= 31 && input.value >= 1 ? true : false;
  } else if (input.id === "month") {
    return input.value <= 12 && input.value >= 1 ? true : false;
  } else if (input.id === "year") {
    return input.value >= 1000 ? true : false;
  }
}

/**
 * Function that calculates an age based on given year, month, day value.
 * @param {Number | String} year
 * @param {Number | String} month
 * @param {Number | String} day
 * @returns {Object} An Object containing the  age's years, months and days.
 */
function getAge(year, month, day) {
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0) {
    age--;
    monthDiff += 12;
  }

  if (dayDiff < 0) {
    monthDiff--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    dayDiff += lastMonth.getDate();
  }
  return {
    years: age,
    months: monthDiff,
    days: dayDiff,
  };
}
/**
 * Function that inserts the age Object and each value inside, Into the HTML DOM. With predetermined Elements.
 * @param {Object} age Object containing the age's years, months and days
 */
function insertAge(age) {
  const yearsOutput = document.querySelector(".years-output");
  const monthsOutpout = document.querySelector(".months-output");
  const daysOutput = document.querySelector(".days-output");
  daysOutput.innerHTML = age.days;
  monthsOutpout.innerHTML = age.months;
  yearsOutput.innerHTML = age.years;
}
