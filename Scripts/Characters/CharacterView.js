import { Bind } from "../Script.js";
export default class CharacterView {
    constructor(root) { this.root = root; }


    render() {
        this.root.innerHTML = `
<h2>Jouw Characters</h2>
<ul id="charList"></ul>
`;
    }


    showCharacters(chars, onClickCharacter) {
        const ul = document.getElementById("charList");
        ul.innerHTML = chars.map(c => `<li class="char-item" data-name="${c}">${c}</li>`).join("");
        ul.querySelectorAll("li.char-item").forEach(li => {
            li.addEventListener("click", () => onClickCharacter(li.dataset.name));
        });
    }
}