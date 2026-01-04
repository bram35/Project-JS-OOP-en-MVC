import EquipmentService from "../Classes/EquipmentService.js";

export default class StatsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.equipmentService = new EquipmentService(this.model.key);

        this.loadAllStats();
    }

    async loadAllStats() {
        try {
            this.view.render();

            const c = await this.model.getCharacterDetails();
            if (!c) {
                this.view.renderMessage("Kan niet inladen");
                return;
            }

            const charName = c.name;
            const equipmentWithNames = await this.equipmentService.getEquipmentWithNames(charName);
            const age = c.age || 0;
            const deaths = c.deaths || 0;
            const wallet = await this.model.getWallet();
            const charGuild = await this.model.getCharacterGuild();

            this.view.renderCharacterStats({
                c,
                age,
                deaths,
                wallet,
                guilds: charGuild ? [`${charGuild.tag} - ${charGuild.name}`] : [],
                equipment: equipmentWithNames
            });

            console.log("Character Details:", c);
            console.log("Playtime (s):", age);
            console.log("Deaths:", deaths);
            console.log("Wallet:", wallet);
            console.log("Equipment:", equipmentWithNames);
            console.log("Guilds:", charGuild);

        } catch (err) {
            console.error("Error:", err);
            this.view.renderMessage("Kan niet stats ophalen.");
        }
    }
}
