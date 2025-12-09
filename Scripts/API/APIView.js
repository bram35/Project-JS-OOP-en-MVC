import { Bind } from "../Script.js";
export default class APIView {
    constructor(root) { this.root = root; }


    render() {
        this.root.innerHTML = `
        <h2>Voer je Guild Wars 2 API Key in</h2>
        <input id="apiKey" type="text" placeholder="API Key" />
        <button id="submitKey">Submit</button>
        <p id="error" style="color:red;"></p>
    `;
        Bind(document.getElementById("submitKey"), "click", () => {
            const key = document.getElementById("apiKey").value.trim();
            this.onSubmit(key);
        });
    }


    bindSubmit(handler) { this.onSubmit = handler; }
    showError(msg) { document.getElementById("error").textContent = msg; }
}