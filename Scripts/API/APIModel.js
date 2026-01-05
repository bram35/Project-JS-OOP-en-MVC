export default class APIModel {
    async validateKey(key) {
        try {
            const res = await fetch(`https://api.guildwars2.com/v2/tokeninfo?access_token=${key}`);
            if (!res.ok) {
                const text = await res.text();
                console.error('API key invalid:', res.status, text);
                return { valid: false, reason: `HTTP ${res.status}` };
            }
            const data = await res.json();
            return { valid: true, reason: 'OK', data };
        } catch (err) {
            console.error('Fetch failed:', err);
            return { valid: false, reason: err.message };
        }
    }

    saveKey(key) {
        localStorage.setItem('gw2_api_key', key);
    }

    getKey() {
        return localStorage.getItem('gw2_api_key');
    }

    deleteKey() {
        localStorage.removeItem('gw2_api_key');
    }
}