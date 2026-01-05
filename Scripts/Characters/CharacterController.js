export default class CharacterController {
    constructor(characterModel, characterView, apiModel, onCharacterClick) {
        this.model = characterModel;
        this.view = characterView;
        this.apiModel = apiModel;
        this.onCharacterClick = onCharacterClick;

        this.view.render();

        this.view.bindKeyButtons(
            () => this.saveAPIKey(),
            () => this.deleteAPIKey()
        );

        this.loadCharacters();
    }

    async saveAPIKey() {
        const key = this.model.key;
        if (!key) {
            alert("Key eorror");
            return;
        }

        const result = await this.apiModel.validateKey(key);
        if (result.valid) {
            this.apiModel.saveKey(key);
            alert("API key opgeslagen ");
        } else {
            alert(`API key ongeldig: ${result.reason}`);
        }
    }

    deleteAPIKey() {
        this.apiModel.deleteKey();
        alert("API key verwijderd");
        location.reload();
    }

    async loadCharacters() {
        const names = await this.model.getCharacters();
        if (!names) return;

        const characters = [];
        for (const name of names) {
            const data = await this.model.getCharacter(name);
            if (data) characters.push({ name: data.name, profession: data.profession });
        }

        this.view.showCharacters(characters, this.onCharacterClick);
    }
}
