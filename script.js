const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const themeToggle = document.getElementById("themeToggle");

let expression = "";

/* Load saved theme */
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

/* Button Click Handling */
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) {
      expression += value;
      display.value = expression;
    }

    if (action === "clear") {
      expression = "";
      display.value = "";
    }

    if (action === "delete") {
      expression = expression.slice(0, -1);
      display.value = expression;
    }

    if (action === "calculate") {
      try {
        expression = Function("return " + expression)();
        display.value = expression;
      } catch {
        display.value = "Error";
        expression = "";
      }
    }
  });
});

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
  if ("0123456789+-*/.%".includes(e.key)) {
    expression += e.key;
    display.value = expression;
  }
  if (e.key === "Enter") {
    document.querySelector("[data-action='calculate']").click();
  }
  if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
    display.value = expression;
  }
});

/* Dark Mode Toggle */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});
