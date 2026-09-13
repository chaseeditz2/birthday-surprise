/* =========================================
   WEBSITE NAVIGATION
========================================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateProgress(screenId);
}


/* =========================================
   PROGRESS BAR
========================================= */

function updateProgress(screenId) {

    const progressMap = {
        welcome: "progress-welcome",
        instructions: "progress-instructions",
        churrasco: "progress-churrasco",
        balloons: "progress-balloons",
        letter: "progress-letter",
        hidden: "progress-hidden",
        wish: "progress-wish"
    };

    Object.values(progressMap).forEach(id => {

        const element = document.getElementById(id);

        if (element) {
            element.classList.remove("completed");
        }

    });

    const order = [
        "welcome",
        "instructions",
        "churrasco",
        "balloons",
        "letter",
        "hidden",
        "wish"
    ];

    const currentIndex = order.indexOf(screenId);

    order.forEach((screen, index) => {

        if (index <= currentIndex) {

            const element =
                document.getElementById(progressMap[screen]);

            if (element) {
                element.classList.add("completed");
            }

        }

    });
}


/* =========================================
   CHURRASCO BUILDER
========================================= */

let selectedFoods = [];

const foodPositions = [
    { left: "20%", top: "25%" },
    { left: "40%", top: "18%" },
    { left: "60%", top: "28%" },
    { left: "25%", top: "50%" },
    { left: "50%", top: "48%" },
    { left: "70%", top: "50%" },
    { left: "35%", top: "70%" },
    { left: "60%", top: "72%" }
];


function addFood(emoji, name) {

    if (selectedFoods.length >= 8) {

        alert(
            "Your plate is full! 😭🔥\n\n" +
            "You already have enough food for a feast!"
        );

        return;
    }


    selectedFoods.push({
        emoji: emoji,
        name: name
    });


    renderPlate();
}


function renderPlate() {

    const plate = document.getElementById("plate");

    if (!plate) {
        return;
    }


    plate.innerHTML = "";


    const center = document.createElement("div");

    center.className = "plate-center";

    center.innerText = "🍽️";

    plate.appendChild(center);


    selectedFoods.forEach((food, index) => {

        const foodElement =
            document.createElement("span");

        foodElement.className = "plate-food";

        foodElement.innerText = food.emoji;

        const position =
            foodPositions[index % foodPositions.length];

        foodElement.style.left = position.left;
        foodElement.style.top = position.top;

        plate.appendChild(foodElement);

    });
}


function clearPlate() {

    selectedFoods = [];

    renderPlate();

    const result =
        document.getElementById("churrasco-result");

    if (result) {
        result.classList.remove("show");
    }
}


function finishChurrasco() {

    if (selectedFoods.length === 0) {

        alert(
            "You need some food first! 😭\n\n" +
            "Pick at least one thing for your churrasco."
        );

        return;
    }


    const result =
        document.getElementById("churrasco-result");

    if (result) {
        result.classList.add("show");

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

}


/* =========================================
   BALLOON GAME
========================================= */

let balloonsPopped = 0;


function popBalloon(balloon) {

    if (balloon.classList.contains("popped")) {
        return;
    }


    balloon.classList.add("popped");

    balloonsPopped++;


    const counter =
        document.getElementById("balloon-count");

    if (counter) {
        counter.innerText = balloonsPopped;
    }


    createPopEffect(balloon);


    if (balloonsPopped >= 10) {

        setTimeout(() => {

            const complete =
                document.getElementById("balloon-complete");

            if (complete) {
                complete.classList.add("show");

                complete.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

        }, 400);

    }

}


function createPopEffect(balloon) {

    const rect =
        balloon.getBoundingClientRect();


    const pop = document.createElement("div");

    pop.innerText = "💥";

    pop.style.position = "fixed";

    pop.style.left =
        `${rect.left + rect.width / 2}px`;

    pop.style.top =
        `${rect.top + rect.height / 2}px`;

    pop.style.transform = "translate(-50%, -50%)";

    pop.style.fontSize = "2rem";

    pop.style.pointerEvents = "none";

    pop.style.zIndex = "9999";

    pop.style.animation =
        "popEffect 0.5s ease forwards";


    document.body.appendChild(pop);


    setTimeout(() => {
        pop.remove();
    }, 500);

}


/* =========================================
   HIDDEN MESSAGE
========================================= */

function findSecret() {

    const button =
        document.querySelector(".secret-button");

    const message =
        document.getElementById("secret-message");


    if (button) {

        button.style.transform =
            "scale(0) rotate(360deg)";

        button.style.opacity = "0";

    }


    setTimeout(() => {

        if (message) {
            message.classList.add("show");

            message.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

    }, 350);

}


/* =========================================
   MAKE A WISH
========================================= */

function makeWish() {

    const button =
        document.getElementById("wish-button");

    const result =
        document.getElementById("wish-result");


    if (button) {

        button.disabled = true;

        button.style.transform =
            "scale(1.6)";

        button.style.boxShadow =
            "0 0 100px rgba(255, 230, 120, 1)";

    }


    createWishStars();


    setTimeout(() => {

        if (result) {
            result.classList.add("show");

            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

    }, 1000);

}


/* =========================================
   WISH STAR EFFECT
========================================= */

function createWishStars() {

    for (let i = 0; i < 30; i++) {

        const star =
            document.createElement("span");

        star.innerText =
            Math.random() > 0.5 ? "✨" : "⭐";


        star.style.position = "fixed";

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.fontSize =
            `${Math.random() * 20 + 15}px`;

        star.style.pointerEvents =
            "none";

        star.style.zIndex =
            "20";

        star.style.animation =
            "wishStar 1.5s ease forwards";


        document.body.appendChild(star);


        setTimeout(() => {
            star.remove();
        }, 1500);

    }

}


/* =========================================
   FINAL CONFETTI
========================================= */

function createConfetti() {

    const container =
        document.getElementById("confetti-container");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const confettiCharacters = [
        "🎉",
        "✨",
        "❤️",
        "⭐",
        "🎊",
        "🔥",
        "🇧🇷"
    ];


    for (let i = 0; i < 80; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";


        piece.innerText =
            confettiCharacters[
                Math.floor(
                    Math.random() *
                    confettiCharacters.length
                )
            ];


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.fontSize =
            `${Math.random() * 15 + 12}px`;


        piece.style.animationDelay =
            `${Math.random() * 1.5}s`;


        container.appendChild(piece);

    }

}


/* =========================================
   FINAL SCREEN
========================================= */

function prepareFinalScreen() {

    const finalFood =
        document.getElementById("final-food");


    if (!finalFood) {
        return;
    }


    if (selectedFoods.length === 0) {

        finalFood.innerText = "🍽️";

        return;
    }


    finalFood.innerHTML = "";


    selectedFoods.forEach(food => {

        const item =
            document.createElement("span");

        item.innerText =
            food.emoji;

        finalFood.appendChild(item);

    });

}


/* =========================================
   RESTART EVERYTHING
========================================= */

function restartExperience() {

    selectedFoods = [];

    balloonsPopped = 0;


    /* Reset plate */

    renderPlate();


    /* Reset balloons */

    const balloons =
        document.querySelectorAll(".balloon");


    balloons.forEach(balloon => {

        balloon.classList.remove("popped");

    });


    const counter =
        document.getElementById("balloon-count");


    if (counter) {
        counter.innerText = "0";
    }


    /* Hide completion messages */

    const churrascoResult =
        document.getElementById("churrasco-result");


    const balloonComplete =
        document.getElementById("balloon-complete");


    const secretMessage =
        document.getElementById("secret-message");


    const wishResult =
        document.getElementById("wish-result");


    if (churrascoResult) {
        churrascoResult.classList.remove("show");
    }


    if (balloonComplete) {
        balloonComplete.classList.remove("show");
    }


    if (secretMessage) {
        secretMessage.classList.remove("show");
    }


    if (wishResult) {
        wishResult.classList.remove("show");
    }


    /* Reset secret button */

    const secretButton =
        document.querySelector(".secret-button");


    if (secretButton) {

        secretButton.style.transform =
            "";

        secretButton.style.opacity =
            "1";

    }


    /* Reset wish button */

    const wishButton =
        document.getElementById("wish-button");


    if (wishButton) {

        wishButton.disabled = false;

        wishButton.style.transform =
            "";

        wishButton.style.boxShadow =
            "";

    }


    showScreen("welcome");

}


/* =========================================
   WHEN PAGE LOADS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateProgress("welcome");

    renderPlate();

});


/* =========================================
   SPECIAL ANIMATIONS
========================================= */

const animationStyles =
document.createElement("style");


animationStyles.innerHTML = `

    @keyframes popEffect {

        0% {
            opacity: 1;
            transform:
                translate(-50%, -50%)
                scale(0.5);
        }

        100% {
            opacity: 0;
            transform:
                translate(-50%, -50%)
                scale(2);
        }

    }


    @keyframes wishStar {

        0% {
            opacity: 0;
            transform: scale(0);
        }

        50% {
            opacity: 1;
            transform: scale(1.5);
        }

        100% {
            opacity: 0;
            transform:
                scale(0.5)
                translateY(-100px);
        }

    }

`;


document.head.appendChild(animationStyles);


/* =========================================
   WATCH FOR FINAL SCREEN
========================================= */

const originalShowScreen = showScreen;


showScreen = function(screenId) {

    originalShowScreen(screenId);


    if (screenId === "final") {

        prepareFinalScreen();

        setTimeout(() => {
            createConfetti();
        }, 200);

    }

};
