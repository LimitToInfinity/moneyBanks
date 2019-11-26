document.addEventListener("DOMContentLoaded", postLoad);
const banksURL = "http://localhost:3000/banks";


function postLoad() {
    fetch(banksURL)
        .then(parseJSON)
        .then(displayBanks)

}

function displayBanks(response) {
    const banksContainer = document.querySelector(".banks");

    response.data.forEach(bank => createBanks(bank, banksContainer));
}

function createBanks(bank, banksContainer) {
    const bankCard = document.createElement("div");

    const bankName = document.createElement("h2");
    bankName.textContent = bank.attributes.name;

    const bankMoney = document.createElement("p");
    bankMoney.textContent = bank.attributes.money[0].amount

    bankCard.append(bankName, bankMoney);
    banksContainer.append(bankCard);
}

function parseJSON(response) {
    return response.json();
}