export default class CharacterView {
    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = `
            <h2 class="charTitle">Choose Character</h2>
            <div id="charGrid"></div>
            <div id="keyControls">
                <button id="saveKeyBtn">Save API Key</button>
                <button id="deleteKeyBtn">✖</button>
            </div>
        `;
        document.body.style.backgroundImage = "url('Src/backgroundGW2.jpg')";
    }

    showCharacters(chars, onClickCharacter) {
        const grid = document.getElementById("charGrid");
        grid.innerHTML = chars.map(c => `
            <div class="charCard" data-name="${c.name}">
                <img src="Src/Class/${c.profession}_icon.png" class="charIcon">
                <p class="charName">${c.name}</p>
            </div>
        `).join("");

        grid.querySelectorAll(".charCard").forEach(card => {
            card.addEventListener("click", () => onClickCharacter(card.dataset.name));
        });
    }

    bindKeyButtons(onSave, onDelete) {
        document.getElementById("saveKeyBtn").onclick = onSave;
        document.getElementById("deleteKeyBtn").onclick = onDelete;
    }
}