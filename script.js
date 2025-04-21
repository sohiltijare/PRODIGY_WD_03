


document.addEventListener('DOMContentLoaded', () => {

    const btnRef = document.querySelectorAll(".button-option");
    const popupRef = document.querySelector(".popup");
    const newgameBtn = document.getElementById("new-game");
    const restartBtn = document.getElementById("restart");
    const msgRef = document.getElementById("message");

    const winningPattern = [
        [0, 1, 2], [0, 3, 6], [2, 5, 8],
        [6, 7, 8], [3, 4, 5], [1, 4, 7],
        [0, 4, 8], [2, 4, 6]
    ];

    let xTurn = true;
    let count = 0;

    const disableButtons = () => {
        btnRef.forEach(btn => btn.disabled = true);
        popupRef.classList.add("show");
    };

    const enableButtons = () => {
        btnRef.forEach(btn => {
            btn.innerText = "";
            btn.disabled = false;
            btn.classList.remove("x-selected", "o-selected");
        });
        popupRef.classList.remove("show", "x-win", "o-win", "draw");
        msgRef.innerHTML = "";
        xTurn = true;
        count = 0;
    };

    const winFunction = (letter) => {
        disableButtons();
        msgRef.innerHTML = `🎉 <br> '${letter}' Wins!`;  // ✅ fixed this line
        popupRef.classList.add(letter.toLowerCase() + "-win");
    };

    const drawFunction = () => {
        disableButtons();
        msgRef.innerHTML = "😎 <br> It's a Draw!";
        popupRef.classList.add("draw");
    };

    const winChecker = () => {
        for (let pattern of winningPattern) {
            const [a, b, c] = pattern;
            const val1 = btnRef[a].innerText;
            const val2 = btnRef[b].innerText;
            const val3 = btnRef[c].innerText;

            if (val1 && val1 === val2 && val2 === val3) {
                winFunction(val1);
                return true;
            }
        }
        return false;
    };

    btnRef.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.innerText !== "") return;

            btn.innerText = xTurn ? "X" : "O";
            btn.classList.add(xTurn ? "x-selected" : "o-selected");
            btn.disabled = true;

            count++;
            if (!winChecker() && count === 9) {
                drawFunction();
            }
            xTurn = !xTurn;
        });
    });

    newgameBtn.addEventListener("click", enableButtons);
    restartBtn.addEventListener("click", enableButtons);

    enableButtons();
});
