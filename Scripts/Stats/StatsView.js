export default class StatsView {
    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = "<h2>Loading stats...</h2>";
    }

    renderMessage(msg) {
        this.root.innerHTML = `<p>${msg}</p>`;
    }

    renderCharacterStats(data) {
        const details = data.details || {};
        const age = data.age || 0;
        const deaths = data.deaths || 0;
        const wallet = Array.isArray(data.wallet) ? data.wallet : [];
        const guilds = Array.isArray(data.guilds) ? data.guilds : [];
        const equipment = Array.isArray(data.equipment) ? data.equipment : [];

        const hours = Math.floor(age / 3600);
        const minutes = Math.floor((age % 3600) / 60);

        const coinsObj = wallet.find(w => w.id === 1);
        let gold = 0, silver = 0, copper = 0;
        if (coinsObj && coinsObj.value != null) {
            const totalCopper = coinsObj.value;
            gold = Math.floor(totalCopper / 10000);
            silver = Math.floor((totalCopper % 10000) / 100);
            copper = totalCopper % 100;
        }

        this.root.innerHTML = `
            <h2>${details.name || "Unknown"} - Stats Overview</h2>

            <h3>Character Details</h3>
            <p><strong>Level:</strong> ${details.level || "Niet beschikbaar"}</p>
            <p><strong>Profession:</strong> ${details.profession || "Niet beschikbaar"}</p>
            <p><strong>Race:</strong> ${details.race || "Niet beschikbaar"}</p>

            <h3>Stats</h3>
            <p><strong>Playtime:</strong> ${hours}h ${minutes}m</p>
            <p><strong>Deaths:</strong> ${deaths}</p>

            <h3>Wallet</h3>
            <p><strong>Gold:</strong> ${gold}, <strong>Silver:</strong> ${silver}, <strong>Copper:</strong> ${copper}</p>

            <h3>Equipment</h3>
            <ul>
            ${equipment.length
                ? equipment.map(e => `<li><strong>${e.slot}:</strong> ${e.name}</li>`).join("")
                : "<li>Geen equipment gevonden</li>"}
            </ul>

            <h3>Guilds</h3>
            <ul>
            ${guilds.length ? guilds.map(g => `<li>${g}</li>`).join("") : "<li>Geen guilds / scope ontbreekt</li>"}
            </ul>
        `;
    }
}
