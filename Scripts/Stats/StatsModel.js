export default class StatsModel {
    constructor(apiKey, charName) {
        this.key = apiKey;
        this.charName = charName;
    }

    async fetchJSON(url) {
        try {
            const res = await fetch(`${url}?access_token=${this.key}`);
            if (!res.ok) {
                console.warn(`Could not fetch ${url}: ${res.status}`);
                return null;
            }
            return res.json();
        } catch (err) {
            console.error(`Error fetching ${url}:`, err);
            return null;
        }
    }

    async getCharacterDetails() {
        return this.fetchJSON(`https://api.guildwars2.com/v2/characters/${encodeURIComponent(this.charName)}`);
    }

    async getWallet() {
        return this.fetchJSON("https://api.guildwars2.com/v2/account/wallet") || [];
    }

    async getInventory() {
        return this.fetchJSON("https://api.guildwars2.com/v2/account/inventory") || [];
    }

    async getGuilds() {
        return this.fetchJSON("https://api.guildwars2.com/v2/account/guilds") || [];
    }

    async getItemNames(itemIds) {
        if (!itemIds.length) return [];
        const ids = itemIds.join(",");
        return this.fetchJSON(`https://api.guildwars2.com/v2/items?ids=${ids}`);
    }

    async getCharacterEquipment() {
        const details = await this.getCharacterDetails();
        return details ? details.equipment || [] : [];
    }

}