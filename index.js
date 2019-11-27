document.addEventListener("DOMContentLoaded", postLoad);
const banksURL = "http://localhost:3000/banks";


function postLoad() {
    const newBankForm = document.querySelector(".new-bank-form");

    fetch(banksURL)
        .then(parseJSON)
        .then(displayBanks);

    newBankForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();

    const bankForm = event.target;

    const banksContainer = document.querySelector(".banks");

    const newBankData = new FormData(bankForm);
    const newBankName = newBankData.get("bank-name");

    displayBank(newBankName, banksContainer);

    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({ bank: { name: newBankName } })

    fetchCall(banksURL, "POST", headers, body)
        .then(parseJSON)
        .catch(error => { if (error) { bankCard.remove() } })

    bankForm.reset()
}

function displayBanks(response) {
    const banksContainer = document.querySelector(".banks");

    response.data.forEach(bank => displayBank(bank.attributes.name, banksContainer));
}

function displayBank(theBanksName, banksContainer) {
    const bankCard = document.createElement("div");

    const bankName = createBankName(theBanksName);

    const node1 = document.createElement("p");
    node1.textContent = "node1"
    const node2 = document.createElement("p");
    node2.textContent = "node2"
    const node3 = document.createElement("p");
    node3.textContent = "node3"

    // bankCard.append(bankName, node1, node2, node3)
    appendItems(bankCard, bankName, node1, node2, node3);
    banksContainer.append(bankCard);
    // appendItems(banksContainer, bankCard);

    return bankCard;
}

function appendItems(parentNode, ...childNodes) {
    childNodes.forEach(node => parentNode.append(node));
}

function createBankName(theBanksName) {
    const bankName = document.createElement("h2");
    bankName.textContent = theBanksName;

    return bankName;
}

function fetchCall(url, method, headers, body) {
    return fetch(url, { method, headers, body })
}

function parseJSON(response) {
    return response.json();
}