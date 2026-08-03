// ---------- App ----------

const playButton = document.getElementById("playButton");

const addPlayerButton = document.getElementById("addPlayerButton");

const playerInput = document.getElementById("playerName");

const startGameButton = document.getElementById("startGameButton");

const minusButton = document.getElementById("minusButton");

const plusButton = document.getElementById("plusButton");

const impostorCountElement = document.getElementById("impostorCount");

playButton.addEventListener("click", () => {

    showScreen(
        "home-screen",
        "create-game-screen"
    );

});

addPlayerButton.addEventListener("click", () => {

    if (addPlayer(playerInput.value)) {

        playerInput.value = "";

    }

});

playerInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {

        if (addPlayer(playerInput.value)) {

            playerInput.value = "";

        }

    }

});

minusButton.addEventListener("click", () => {

    if (impostorCount > 1) {
        impostorCount -= 1;
        impostorCountElement.textContent = impostorCount;
        validateGame();
    }

});

plusButton.addEventListener("click", () => {

    if (impostorCount < players.length - 1) {
        impostorCount += 1;
        impostorCountElement.textContent = impostorCount;
        validateGame();
    }

});

startGameButton.addEventListener("click", createGame);

document.getElementById("readyButton").addEventListener("click", showRoleScreen);

document.getElementById("hideRoleButton").addEventListener("click", hideRole);

document.getElementById("startDiscussionButton").addEventListener("click", handleDiscussionButton);

document.getElementById("newGameButton").addEventListener("click", startNewRound);

document.getElementById("editSettingsButton").addEventListener("click", editSettings);

renderCategories();

validateGame();
