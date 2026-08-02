// ---------- Game ----------

let impostorCount = 1;
let game = null;
let discussionStarted = false;

function getRandomItem(items) {

    return items[Math.floor(Math.random() * items.length)];

}

function getRandomPlayers(count) {

    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

    return shuffledPlayers.slice(0, count);

}

function createGame() {

    const categoryKey = getRandomItem(selectedCategories);
    const category = CATEGORIES[categoryKey];
    const impostors = getRandomPlayers(impostorCount);

    game = {
        category: category.name,
        word: getRandomItem(category.words),
        players: [...players],
        impostors,
        currentRevealIndex: 0,
        startingPlayer: getRandomItem(players)
    };

    discussionStarted = false;
    document.getElementById("startDiscussionButton").textContent = "ابدأ النقاش";

    showPassPhoneScreen();

}

function showPassPhoneScreen() {

    const player = game.players[game.currentRevealIndex];

    document.getElementById("passPhoneMessage").textContent =
        `مرر الهاتف إلى ${player}`;

    showScreen("create-game-screen", "pass-phone-screen");

}

function showRoleScreen() {

    const player = game.players[game.currentRevealIndex];
    const isImpostor = game.impostors.includes(player);
    const roleTitle = document.getElementById("roleTitle");
    const roleMessage = document.getElementById("roleMessage");
    const impostorSubtitle = document.getElementById("impostorSubtitle");

    roleTitle.textContent = isImpostor ? "" : "الكلمة";
    roleMessage.textContent = isImpostor ? "أنت المحتال" : game.word;
    roleMessage.classList.toggle("impostor-role", isImpostor);
    impostorSubtitle.classList.toggle("hidden", !isImpostor);

    showScreen("pass-phone-screen", "role-screen");

}

function hideRole() {

    game.currentRevealIndex += 1;

    if (game.currentRevealIndex < game.players.length) {
        showScreen("role-screen", "pass-phone-screen");
        showPassPhoneScreen();
        return;
    }

    showDiscussionScreen();

}

function showDiscussionScreen() {

    document.getElementById("startingPlayerMessage").textContent =
        `${game.startingPlayer} يبدأ`;

    showScreen("role-screen", "discussion-screen");

}

function handleDiscussionButton() {

    const button = document.getElementById("startDiscussionButton");

    if (!discussionStarted) {
        discussionStarted = true;
        button.textContent = "كشف المحتالين";
        return;
    }

    showImpostorsScreen();

}

function showImpostorsScreen() {

    const title = document.getElementById("impostorRevealTitle");
    const impostorsList = document.getElementById("impostorsList");

    title.textContent = game.impostors.length === 1
        ? "🎭 المحتال هو"
        : "🎭 المحتالون هم";

    impostorsList.innerHTML = "";

    game.impostors.forEach(impostor => {
        const card = document.createElement("div");

        card.className = "impostor-card";
        card.textContent = impostor;

        impostorsList.appendChild(card);
    });

    showScreen("discussion-screen", "impostor-reveal-screen");

}

function resetGame() {

    game = null;
    discussionStarted = false;
    players = [];
    selectedCategories = [];
    impostorCount = 1;

    document.getElementById("playerName").value = "";
    document.getElementById("impostorCount").textContent = impostorCount;
    document.querySelectorAll("#categoriesContainer input").forEach(input => {
        input.checked = false;
    });

    renderPlayers();
    validateGame();
    showScreen("impostor-reveal-screen", "home-screen");

}

function validateGame() {

    const startButton = document.getElementById("startGameButton");

    startButton.disabled =
        players.length < 3 ||
        selectedCategories.length === 0 ||
        impostorCount >= players.length;

}
