export default class CharacterModel {
    constructor(key) { this.key = key; }


    async fetchJSON(url) {
        const res = await fetch(`${url}?access_token=${this.key}`);
        if (!res.ok) return null;
        return res.json();
    }


    async getCharacters() { return this.fetchJSON("https://api.guildwars2.com/v2/characters"); }
}