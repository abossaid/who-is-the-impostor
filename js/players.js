// ---------- Players ----------

let players = [];

function addPlayer(name) {

    name = name.trim();

    if (name === "") {
        alert("اكتب اسم اللاعب");
        return false;
    }

    if (players.includes(name)) {
        alert("الاسم موجود بالفعل");
        return false;
    }

    players.push(name);

    renderPlayers();

    validateGame();

    return true;
}

function removePlayer(index) {

    players.splice(index, 1);

    renderPlayers();

    validateGame();

}

function renderPlayers() {

    const playersList = document.getElementById("playersList");

    playersList.innerHTML = "";

    players.forEach((player, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${player}</span>
            <button class="delete-btn">❌</button>
        `;

        li.querySelector("button").addEventListener("click", () => {

            removePlayer(index);

        });

        playersList.appendChild(li);

    });

}