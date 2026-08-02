// ---------- UI ----------

function showScreen(hideId, showId) {

    document
        .getElementById(hideId)
        .classList
        .add("hidden");

    document
        .getElementById(showId)
        .classList
        .remove("hidden");

}