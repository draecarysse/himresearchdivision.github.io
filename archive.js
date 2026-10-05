/* =========================================================
   HEAVENLY IRREGULARITY MONITORING
   ARCHIVE TERMINAL SYSTEM
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const ARCHIVE_CONFIG = {

    firstPassword: "morningstar",

    nextArchive:
        "files/morning-star.html"

};


/* =========================================================
   ELEMENTS
   ========================================================= */

const passwordInput =
    document.getElementById("password");

const accessButton =
    document.getElementById("accessButton");

const terminalMessage =
    document.getElementById("terminalMessage");

const systemStatus =
    document.getElementById("systemStatus");

const sessionCode =
    document.getElementById("sessionCode");

const terminal =
    document.querySelector(".terminal");


/* =========================================================
   SESSION ID
   ========================================================= */

function generateSessionID() {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = "";

    for (let i = 0; i < 8; i++) {

        result +=
            characters.charAt(
                Math.floor(
                    Math.random() *
                    characters.length
                )
            );

    }

    return result;

}


sessionCode.textContent =
    generateSessionID();


/* =========================================================
   NORMALIZE PASSWORD
   ========================================================= */

function normalizePassword(value) {

    return value
        .trim()
        .toUpperCase()
        .replace(/\s+/g, " ");

}


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(message, type) {

    terminalMessage.textContent =
        message;

    terminalMessage.className =
        "terminal-message";

    if (type === "error") {

        terminalMessage.classList.add(
            "message-error"
        );

    }

    if (type === "success") {

        terminalMessage.classList.add(
            "message-success"
        );

    }

}


/* =========================================================
   ACCESS DENIED
   ========================================================= */

function denyAccess() {

    showMessage(
        "> ACCESS DENIED — INVALID ARCHIVE KEY.",
        "error"
    );

    systemStatus.textContent =
        "REJECTED";

    passwordInput.value = "";

    passwordInput.focus();

}


/* =========================================================
   ACCESS GRANTED
   ========================================================= */

function grantAccess() {

    showMessage(
        "> KEY ACCEPTED — ARCHIVE RECOGNIZED.",
        "success"
    );

    systemStatus.textContent =
        "AUTHORIZED";

    terminal.classList.add(
        "access-granted"
    );

    accessButton.disabled = true;

    passwordInput.disabled = true;


    /*
       Small delay to make the transition
       feel like a real archive system.
    */

    setTimeout(() => {

        showMessage(
            "> OPENING ARCHIVE...",
            "success"
        );

    }, 900);


    setTimeout(() => {

        window.location.href =
            ARCHIVE_CONFIG.nextArchive;

    }, 1800);

}


/* =========================================================
   CHECK PASSWORD
   ========================================================= */

function checkPassword() {

    const entered =
        normalizePassword(
            passwordInput.value
        );


    if (!entered) {

        showMessage(
            "> ERROR — NO KEY DETECTED.",
            "error"
        );

        return;

    }


    const correct =
        normalizePassword(
            ARCHIVE_CONFIG.firstPassword
        );


    if (entered === correct) {

        grantAccess();

    } else {

        denyAccess();

    }

}


/* =========================================================
   BUTTON
   ========================================================= */

accessButton.addEventListener(
    "click",
    checkPassword
);


/* =========================================================
   ENTER KEY
   ========================================================= */

passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            checkPassword();

        }

    }
);


/* =========================================================
   INITIAL STATE
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            passwordInput.focus();

        }, 2200);

    }
);
