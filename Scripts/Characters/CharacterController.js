export default class CharacterController {
    constructor(model, view, onCharacterClick) {
        this.model = model;
        this.view = view;
        this.onCharacterClick = onCharacterClick;

        this.view.render();
        this.addKeyButtons();
        this.loadCharacters();
    }

    addKeyButtons() {
        const saveBtn = document.getElementById("saveKeyBtn");
        const delBtn = document.getElementById("deleteKeyBtn");
        saveBtn.addEventListener("click", () => {
            localStorage.setItem("apiKey", this.model.key);
            alert("API key opgeslagen");
        });
        delBtn.addEventListener("click", () => {
            localStorage.removeItem("apiKey"); alert("API key verwijderd"); location.reload();
        });
    }

    async loadCharacters() {
        const names = await this.model.getCharacters();

        const characters = [];
        for (const name of names) {
            const data = await this.model.getCharacter(name);
            characters.push({
                name: data.name,
                profession: data.profession
            });
        }

        this.view.showCharacters(characters, this.onCharacterClick);
    }

}