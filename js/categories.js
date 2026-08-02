// ---------- Categories ----------

let selectedCategories = Object.keys(CATEGORIES);

function updateSelectedCategories() {

    const container = document.getElementById("categoriesContainer");

    selectedCategories =
        [...container.querySelectorAll("input:checked")]
        .map(item => item.value);

    validateGame();

}

function setAllCategories(isSelected) {

    const container = document.getElementById("categoriesContainer");

    container.querySelectorAll("input").forEach(input => {
        input.checked = isSelected;
    });

    updateSelectedCategories();

}

function renderCategories() {

    const container = document.getElementById("categoriesContainer");

    container.innerHTML = "";

    Object.keys(CATEGORIES).forEach(key => {

        const label = document.createElement("label");

        label.className = "category-card";

        label.innerHTML = `
            <input type="checkbox" value="${key}" ${selectedCategories.includes(key) ? "checked" : ""}>
            <span>${CATEGORIES[key].name}</span>
        `;

        container.appendChild(label);

    });

    container.querySelectorAll("input").forEach(box => {

        box.addEventListener("change", () => {

            updateSelectedCategories();

        });

    });

}

document.getElementById("selectAllCategoriesButton").addEventListener("click", () => {

    setAllCategories(true);

});

document.getElementById("clearAllCategoriesButton").addEventListener("click", () => {

    setAllCategories(false);

});
