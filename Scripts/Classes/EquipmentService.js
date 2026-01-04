export default class EquipmentService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.guildwars2.com/v2";
    }

    async fetchJSON(url) {
        try {
            const res = await fetch(`${url}?access_token=${this.apiKey}`);
            if (!res.ok) return [];
            return await res.json();
        } catch (err) {
            console.error(`Fetch error: ${url}`, err);
            return [];
        }
    }

    async getCharacterEquipment(characterName) {
        const c = await this.fetchJSON(`${this.baseUrl}/characters/${encodeURIComponent(characterName)}`);
        if (!c || !c.equipment) return [];
        return c.equipment;
    }

    async getItemNames(itemIds) {
        if (!itemIds || !itemIds.length) return [];
        const ids = itemIds.join(",");
        return this.fetchJSON(`${this.baseUrl}/items?ids=${ids}`);
    }

    async getEquipmentWithNames(characterName) {
        const equipment = await this.getCharacterEquipment(characterName);
        if (!equipment.length) return [];

        const itemIds = equipment.map(e => e.id);
        const itemsInfo = await this.getItemNames(itemIds);

        return equipment.map(equip => {
            const itemData = itemsInfo.find(item => item.id === equip.id);

            return {
                slot: equip.slot,
                id: equip.id,
                name: itemData?.name || `Unknown (ID:${equip.id})`,
                icon: itemData?.icon || null,
                rarity: itemData?.rarity || "Basic"
            };
        });
    }
}