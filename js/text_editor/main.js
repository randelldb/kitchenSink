let inputRows = [
    ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "!", "\n"],
    ["T", "h", "i", "s", " ", "i", "s", " ", "a", " ", "t", "e", "s", "t", "\n"]
];

let cursorPosition = [0, 0]; // [rowIndex, columnIndex]
const carret = "<div class='carret'>|</div>"

initializeCursor()
rerenderContent();

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
        moveCursorAndRedraw(e.key);
    }
});



function displayContent(){
    let getEditor= document.querySelector("#editor");
    getEditor.innerHTML = '';

    inputRows.forEach((row, index) => {
        let humanIndex = index + 1
        let contentString = row.join('')
        getEditor.innerHTML += 
        `
            <div class="row" id="row_${index}">
                <div class="row_number">${humanIndex}</div>
                <div class="input">${contentString}</div>
            </div>
        `;
    })
}

function initializeCursor() {
    inputRows[cursorPosition[0]].splice(cursorPosition[1], 0, "|");
}

function moveCursorAndRedraw(direction) {
    // Remove existing cursor
    for (let i = 0; i < inputRows.length; i++) {
        let index = inputRows[i].indexOf();
        if (index !== -1) {
            inputRows[i].splice(index, 1);
            break;
        }
    }

    // Adjust cursor position
    switch (direction) {
        case "ArrowRight":
            cursorPosition[1] += 1;
            break;
        case "ArrowLeft":
            cursorPosition[1] = Math.max(0, cursorPosition[1] - 1);
            break;
        case "ArrowDown":
            cursorPosition[0] += 1;
            break;
        case "ArrowUp":
            cursorPosition[0] = Math.max(0, cursorPosition[0] - 1);
            break;
    }

    // Ensure the cursor does not go beyond the current limit
    cursorPosition[1] = Math.min(cursorPosition[1], inputRows[cursorPosition[0]].length);

    // Insert the cursor at the new position
    inputRows[cursorPosition[0]].splice(cursorPosition[1], 0, "|");
    rerenderContent()
}

function rerenderContent() {
    console.log(`Cursor Position: [${cursorPosition[0]}, ${cursorPosition[1]}]`)
    displayContent();
}