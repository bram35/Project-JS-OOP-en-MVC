export default class StatsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.loadAllStats();
    }

    async loadAllStats() {
        const details = await this.model.getCharacterDetails();
        if (!details) {
            this.view.renderMessage("Kon character details niet laden.");
            return;
        }

        // Playtime en deaths
        const age = details.age || details.played || 0; // seconden
        const deaths = details.deaths || 0;

        // Andere data
        const wallet = await this.model.getWallet();
        const inventory = await this.model.getInventory();
        const guilds = await this.model.getGuilds();

        const equipment = await this.model.getCharacterEquipment();
        const itemIds = equipment.map(e => e.id);
        const itemsInfo = await this.model.getItemNames(itemIds);

        // Map item IDs naar namen
        const equipmentWithNames = equipment.map(equip => {
            const itemData = itemsInfo.find(item => item.id === equip.id);
            return {
                slot: equip.slot,
                name: itemData ? itemData.name : `Unknown (ID:${equip.id})`
            };
        });

        


        // Log alles in console
        console.log("Character Details:", details);
        console.log("Playtime (s):", age);
        console.log("Deaths:", deaths);
        console.log("Wallet:", wallet);
        console.log("Inventory:", inventory);
        console.log("Guilds:", guilds);
        console.log("Equipment:", equipmentWithNames);
        // Doorgeven aan view
        this.view.renderCharacterStats({ details, age, deaths, wallet, inventory, guilds });


    }
}