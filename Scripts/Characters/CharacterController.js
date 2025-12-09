export default class CharacterController {
    constructor(model, view, onCharacterClick) {
        this.model = model;
        this.view = view;
        this.onCharacterClick = onCharacterClick;
        this.loadCharacters();
    }


    async loadCharacters() {
        const chars = await this.model.getCharacters();
        this.view.showCharacters(chars, this.onCharacterClick);
        console.log("Characters JSON:", JSON.stringify(chars, null, 2));
    }
}