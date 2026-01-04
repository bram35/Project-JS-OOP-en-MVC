import { Bind } from "../Script.js";

export default class APIView {
    constructor(root) { this.root = root; }


    render() {
        this.root.innerHTML = `
         <div class="apiView">
             <h2 class="apiTitle">Guild Wars 2 API</h2>
       
            <div class=input>
                <input id="apiKey" type="text" placeholder="Enter API" />
            </div>
            <br>
            <div class="submit">
                <button id="submitKey">Get data</button>
            </div>
            <p id="error" style="color:red;"></p>
        </div>
    `;
    document.body.style.backgroundImage = "url('Src/backgroundGW.jpg')";
        Bind(document.getElementById("submitKey"), "click", () => {
            const key = document.getElementById("apiKey").value.trim();
            this.onSubmit(key);
        });
    }


    bindSubmit(handler) { this.onSubmit = handler; }
    showError(msg) { document.getElementById("error").textContent = msg; }
}