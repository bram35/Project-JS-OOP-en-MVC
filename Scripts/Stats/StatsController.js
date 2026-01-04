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

            const details = await this.model.getCharacterDetails();
            if (!details) {
                this.view.renderMessage("Kan niet inladen");
                return;
            }

            const charName = details.name;
            const equipmentWithNames = await this.equipmentService.getEquipmentWithNames(charName);
            const age = details.age || 0;
            const deaths = details.deaths || 0;
            const wallet = await this.model.getWallet();
            const guilds = await this.model.getGuilds();

            this.view.renderCharacterStats({
                details,
                age,
                deaths,
                wallet,
                guilds,
                equipment: equipmentWithNames
            });

            console.log("Character Details:", details);
            console.log("Playtime (s):", age);
            console.log("Deaths:", deaths);
            console.log("Wallet:", wallet);
            console.log("Equipment:", equipmentWithNames);
            console.log("Guilds:", guilds);

        } catch (err) {
            console.error("Error:", err);
            this.view.renderMessage("Kan niet stats ophalen.");
        }
    }
}
