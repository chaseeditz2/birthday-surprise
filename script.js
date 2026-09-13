/* ================================= */
/* ZAZAS SURPRISE EXPERIENCE ❤️ */
/* ================================= */


/* ================================= */
/* SCREEN SYSTEM */
/* ================================= */

const screens = [
    "welcome",
    "instructions",
    "churrasco",
    "balloons",
    "letter",
    "hidden",
    "wish",
    "final"
];

function showScreen(id) {

    screens.forEach(screen => {

        const element = document.getElementById(screen);

        if (element) {
            element.classList.remove("active");
        }

    });


    const selected = document.getElementById(id);

    if (selected) {
        selected.classList.add("active");
    }


    updateProgress(id);


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (id === "wish") {
        createWishStars();
    }


    if (id === "final") {
        prepareFinalScreen();
    }

}


/* ================================= */
/* PROGRESS */
/* ================================= */

function updateProgress(current) {

    const dots = document.querySelectorAll(".progress-dot");

    const index = screens.indexOf(current);

    dots.forEach((dot, i) => {

        dot.classList.remove("active");

        if (i <= index && i < dots.length) {
            dot.classList.add("active");
        }

    });

}


/* ================================= */
/* WELCOME */
/* ================================= */

function openGift() {

    const gift = document.querySelector(".gift");

    if (gift) {

        gift.style.animation = "none";

        gift.style.transform =
            "scale(1.25) rotate(5deg)";

    }


    createConfetti(35);

    setTimeout(() => {

        showScreen("instructions");

    }, 700);

}


/* ================================= */
/* CHURRASCO */
/* ================================= */

let selectedFoods = [];

function addFood(emoji, name) {

    if (selectedFoods.length >= 12) {

        showFoodMessage(
            "😳 Nossa! Your plate is FULL!"
        );

        return;
    }


    selectedFoods.push({
        emoji: emoji,
        name: name
    });


    renderPlate();


    showFoodMessage(
        `🔥 ${name}! Boa escolha! 🇧🇷`
    );


    const buttons =
        document.querySelectorAll(".food-btn");

    buttons.forEach(button => {

        if (button.innerText.includes(name)) {

            button.style.transform =
                "scale(1.08)";

            setTimeout(() => {

                button.style.transform =
                    "";

            }, 250);

        }

    });

}


function renderPlate() {

    const plate =
        document.getElementById("plate");

    if (!plate) return;


    if (selectedFoods.length === 0) {

        plate.innerHTML = `
            <span class="plate-placeholder">
                Escolha alguma comida! 👀
            </span>
        `;

        return;
    }


    plate.innerHTML = "";


    selectedFoods.forEach(food => {

        const item =
            document.createElement("span");

        item.className = "plate-food";

        item.innerText = food.emoji;

        item.title = food.name;

        plate.appendChild(item);

    });

}


function showFoodMessage(message) {

    const box =
        document.getElementById("food-message");

    if (!box) return;

    box.innerText = message;

}


function clearPlate() {

    selectedFoods = [];

    renderPlate();

    showFoodMessage(
        "🗑️ Plate cleared!"
    );

}


function finishChurrasco() {

    if (selectedFoods.length === 0) {

        showFoodMessage(
            "👀 Você precisa escolher alguma coisa primeiro!"
        );

        return;
    }


    showFoodMessage(
        "🔥 CHURRASCO CONCLUÍDO! Tá pronto! 🇧🇷"
    );


    createConfetti(25);


    setTimeout(() => {

        showScreen("balloons");

    }, 1200);

}


/* ================================= */
/* BALLOONS */
/* ================================= */

let balloonsPopped = 0;

function popBalloon(balloon) {

    if (balloon.classList.contains("popped")) {
        return;
    }


    balloonsPopped++;


    balloon.classList.add("popped");


    createPopEffect(
        balloon.getBoundingClientRect()
    );


    updateBalloonCounter();


    if (balloonsPopped >= 10) {

        setTimeout(() => {

            const completion =
                document.getElementById(
                    "balloon-complete"
                );

            if (completion) {
                completion.classList.remove("hidden");
            }

            createConfetti(50);

        }, 500);

    }

}


function updateBalloonCounter() {

    const counter =
        document.getElementById(
            "balloon-counter"
        );

    if (counter) {

        counter.innerText =
            `${balloonsPopped} / 10`;

    }

}


function createPopEffect(rect) {

    const emojis = [
        "💥",
        "✨",
        "🎉",
        "⭐"
    ];


    for (let i = 0; i < 4; i++) {

        const effect =
            document.createElement("div");

        effect.className =
            "pop-effect";

        effect.innerText =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        effect.style.left =
            `${rect.left + rect.width / 2}px`;

        effect.style.top =
            `${rect.top + rect.height / 2}px`;


        effect.style.transform =
            `translate(
                ${(Math.random() - 0.5) * 80}px,
                ${(Math.random() - 0.5) * 80}px
            )`;


        document.body.appendChild(effect);


        setTimeout(() => {

            effect.remove();

        }, 800);

    }

}


/* ================================= */
/* LETTER */
/* ================================= */

function openLetter() {

    const envelope =
        document.getElementById(
            "envelope"
        );

    const paper =
        document.getElementById(
            "letter-paper"
        );

    const envelopeText =
        document.getElementById(
            "envelope-text"
        );


    if (envelope) {
        envelope.classList.add("open");
    }


    setTimeout(() => {

        if (envelopeText) {
            envelopeText.classList.add(
                "hidden"
            );
        }

        if (paper) {
            paper.classList.remove(
                "hidden"
            );
        }

    }, 700);

}


/* ================================= */
/* SECRET MESSAGE */
/* ================================= */

let secretFound = false;

function findSecret() {

    if (secretFound) return;

    secretFound = true;


    const message =
        document.getElementById(
            "secret-message"
        );


    if (message) {
        message.classList.remove(
            "hidden"
        );
    }


    createConfetti(25);


    const card =
        document.querySelector(
            ".secret-card"
        );


    if (card) {

        card.animate(
            [
                {
                    transform:
                        "scale(1)"
                },

                {
                    transform:
                        "scale(1.05)"
                },

                {
                    transform:
                        "scale(1)"
                }
            ],

            {
                duration: 500
            }
        );

    }

}


/* ================================= */
/* WISH */
/* ================================= */

function createWishStars() {

    const container =
        document.getElementById(
            "wish-stars"
        );

    if (!container) return;


    container.innerHTML = "";


    for (let i = 0; i < 70; i++) {

        const star =
            document.createElement("span");

        star.className =
            "wish-particle";

        star.innerText =
            Math.random() > 0.7
                ? "✦"
                : "•";


        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.fontSize =
            `${Math.random() * 15 + 5}px`;

        star.style.animationDelay =
            `${Math.random() * 3}s`;


        container.appendChild(star);

    }

}


function makeWish() {

    const screen =
        document.getElementById(
            "wish"
        );


    if (!screen) return;


    screen.classList.add(
        "wished"
    );


    createConfetti(80);


    createWishExplosion();


    setTimeout(() => {

        showScreen("final");

    }, 1500);

}


function createWishExplosion() {

    for (let i = 0; i < 30; i++) {

        const star =
            document.createElement("div");

        star.innerText = "✨";

        star.style.position =
            "fixed";

        star.style.left =
            "50%";

        star.style.top =
            "50%";

        star.style.fontSize =
            `${Math.random() * 25 + 10}px`;

        star.style.zIndex =
            "9999";

        star.style.pointerEvents =
            "none";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 400 + 100;


        star.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            ${Math.cos(angle) * distance}px,
                            ${Math.sin(angle) * distance}px
                        ) scale(1.5)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    1000 + Math.random() * 500,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        );


        document.body.appendChild(star);


        setTimeout(() => {

            star.remove();

        }, 1600);

    }

}


/* ================================= */
/* CONFETTI */
/* ================================= */

function createConfetti(amount = 40) {

    const container =
        document.getElementById(
            "confetti"
        );


    if (!container) return;


    const symbols = [
        "🎉",
        "✨",
        "❤️",
        "⭐",
        "🇧🇷",
        "🎊"
    ];


    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";


        piece.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.fontSize =
            `${Math.random() * 15 + 10}px`;


        piece.style.animationDuration =
            `${Math.random() * 3 + 2}s`;


        piece.style.animationDelay =
            `${Math.random() * 0.5}s`;


        container.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, 6000);

    }

}


/* ================================= */
/* FINAL SCREEN */
/* ================================= */

function prepareFinalScreen() {

    const finalPlate =
        document.getElementById(
            "final-food-plate"
        );


    if (!finalPlate) return;


    finalPlate.innerHTML = "";


    selectedFoods.forEach(food => {

        const item =
            document.createElement("span");

        item.innerText =
            food.emoji;

        item.title =
            food.name;

        finalPlate.appendChild(item);

    });


    createConfetti(80);

}


/* ================================= */
/* BACKGROUND PARTICLES */
/* ================================= */

function createBackgroundParticles() {

    const container =
        document.getElementById(
            "particles"
        );


    if (!container) return;


    const symbols = [
        "✨",
        "❤️",
        "⭐",
        "🇧🇷"
    ];


    for (let i = 0; i < 25; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "particle";


        particle.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.fontSize =
            `${Math.random() * 15 + 8}px`;


        particle.style.animationDuration =
            `${Math.random() * 15 + 10}s`;


        particle.style.animationDelay =
            `${Math.random() * 10}s`;


        container.appendChild(particle);

    }

}


/* ================================= */
/* RESTART */
/* ================================= */

function restartExperience() {

    selectedFoods = [];

    balloonsPopped = 0;

    secretFound = false;


    renderPlate();

    updateBalloonCounter();


    document
        .querySelectorAll(".balloon")
        .forEach(balloon => {

            balloon.classList.remove(
                "popped"
            );

        });


    const completion =
        document.getElementById(
            "balloon-complete"
        );


    if (completion) {

        completion.classList.add(
            "hidden"
        );

    }


    const secret =
        document.getElementById(
            "secret-message"
        );


    if (secret) {

        secret.classList.add(
            "hidden"
        );

    }


    const paper =
        document.getElementById(
            "letter-paper"
        );


    if (paper) {

        paper.classList.add(
            "hidden"
        );

    }


    const envelope =
        document.getElementById(
            "envelope"
        );


    if (envelope) {

        envelope.classList.remove(
            "open"
        );

    }


    const envelopeText =
        document.getElementById(
            "envelope-text"
        );


    if (envelopeText) {

        envelopeText.classList.remove(
            "hidden"
        );

    }


    const wish =
        document.getElementById(
            "wish"
        );


    if (wish) {

        wish.classList.remove(
            "wished"
        );

    }


    showScreen("welcome");

}


/* ================================= */
/* STARTUP */
/* ================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createBackgroundParticles();

        renderPlate();

        updateBalloonCounter();

    }
);
