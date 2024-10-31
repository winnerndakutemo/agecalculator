const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");
const errorParagraphs = document.querySelectorAll(".error");

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (areEmptyFields(inputs)) {
      e.target.parentElement.parentElement.dispatchEvent(
        new CustomEvent("emptyFields")
      );
    } else {
      errorParagraphs.forEach((paragraph) => {
        paragraph.classList.add("error-hidden");
        paragraph.innerHTML = "This Field is required";
      });
      inputs.forEach((input) => {
        input.classList.remove("input-error");
      });
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
 * @param {HTMLInputElement} inputs
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
