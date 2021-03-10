// Total Balance
const balanceElement = document.getElementById("balance");

// Value input
const valueInputElement = document.querySelector("input");

// Income/expense
const selectElement = document.querySelector("select");

// Addition button
const additionButtonElement = document.querySelector("footer button");

// Entry list
const entryListElement = document.querySelector("section ul");

// Description
const description = document.getElementById("description")

function addEntry(amount, operation) {
    const listEntry = document.createElement("li");
    listEntry.classList.add(operation);

    const listEntryValue = document.createElement("strong");
    listEntryValue.innerText = amount + "$";

    const listEntryDescription = document.createElement("em");
    if (description.value !== "") {
        listEntryDescription.innerText = description.value;
    } else {
        listEntryDescription.innerText = "Description";
    }

    const listEntryOperator = document.createElement("span");
    if (operation === "income") {
        listEntryOperator.innerText = "+";
    } else if (operation === "expense") {
        listEntryOperator.innerText = "-";
    }

    const removeButton = document.createElement("div");
    removeButton.classList.add("remove");
    removeButton.innerText = "X";
    removeButton.setAttribute("onclick","remove()");

    listEntry.appendChild(listEntryDescription);
    listEntry.appendChild(listEntryOperator);
    listEntry.appendChild(listEntryValue);
    listEntry.appendChild(removeButton);

    entryListElement.appendChild(listEntry);
}

function updateBalance() {
    let total = 0;

    for (let item of entryListElement.children) {
        const valueElement = item.querySelector("strong");
        const operationElement = item.querySelector("span");

        const value = parseFloat(parseFloat(valueElement.innerText).toFixed(2));
        const operation = operationElement.innerText;

        if (operation === "+") {
            total += value;
        } else if (operation === "-") {
            total -= value;
        }
    }

    balanceElement.innerText = total + "$";
}

additionButtonElement.onclick = function () {
  const amount = valueInputElement.value;
  const operation = selectElement.value;

  if (amount !== "") {
    addEntry(amount, operation);

    valueInputElement.value = "";
    description.value = "";

    updateBalance();
    }
};

function remove() {
    const clickedTarget = event.target;
    clickedTarget.parentNode.remove();
    updateBalance();
}