export default class StatsView {
    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = "<h2 class='loading'>Loading stats...</h2>";
    }


    renderCharacterStats(data) {
        const c = data.c || {};
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
        <div class="stats-container">
            <div class="character">
                <h2 class="char-name">${c.name || "Unknown"}</h2>
                <div class="profession-box">
                    <img src="Src/Class/${c.profession}_icon.png" class="profession-img" alt="profession">
                    <p><strong>Profession:</strong> ${c.profession || "Niet beschikbaar"}</p>
                </div>
                <p><strong>Race:</strong> ${c.race || "Niet beschikbaar"}</p>
                <p><strong>Level:</strong> ${c.level || "Niet beschikbaar"}</p>
            </div>

            <div class="row">

                <div class="stats">
                    <h3>Stats</h3>
                    <p><strong>Playtime:</strong> ${hours}h ${minutes}m</p>
                    <p><strong>Deaths:</strong> ${deaths}</p>
                </div>

            <div class="wallet">
                <h3>Wallet</h3>

                <p class="coin-row">
                    <img src="../Src/Gold_coin.png" class="coin-img" alt="gold">
                    <span>${gold}</span>
                </p>

                <p class="coin-row">
                    <img src="../Src/Silver_coin.png" class="coin-img" alt="silver">
                    <span>${silver}</span>
                </p>

                <p class="coin-row">
                    <img src="../Src/Copper_coin.png" class="coin-img" alt="copper">
                    <span>${copper}</span>
                </p>
            </div>

                <div class="guilds">
                    <h3>Guilds</h3>
                    <ul>
                        ${guilds.length ? guilds.map(g => `<li>${g}</li>`).join("") : "<li>Geen guild</li>"}
                    </ul>
                </div>

            </div>

<div class="equipment">
    <h3>Equipment</h3>
    <ul>
    ${
        equipment.length
        ? equipment.map(e => {

            let iconUrl = typeof e.icon === "string" && e.icon.startsWith("http")
                ? e.icon
                : null;

            if (!iconUrl && e.icon && e.icon.file_id && e.icon.signature) {
                iconUrl = `https://render.guildwars2.com/file/${e.icon.signature}/${e.icon.file_id}.png`;
            }

            if (!iconUrl) {
                iconUrl = "../Src/placeholder.png";
            }

            return `
                <li class="equip-item rarity-${(e.rarity || "Basic").toLowerCase()}">

                    <img src="${iconUrl}" class="equip-img" alt="${e.name}">
                    <span><strong>${e.slot}:</strong> ${e.name}</span>
                </li>
            `;
        }).join("")
        : "<li>Geen equipment gevonden</li>"
    }
    </ul>
</div>

        </div>
        `;

        document.body.style.backgroundImage = "url('Src/backgroundGW3.jpg')";
    }
}