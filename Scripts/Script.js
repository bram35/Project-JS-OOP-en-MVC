import APIView from "./API/APIView.js";
import APIController from "./API/APIController.js";
import APIModel from "./API/APIModel.js";
import CharacterView from "./Characters/CharacterView.js";
import CharacterController from "./Characters/CharacterController.js";
import CharacterModel from "./Characters/CharacterModel.js";
import StatsView from "./Stats/StatsView.js";
import StatsController from "./Stats/StatsController.js";
import StatsModel from "./Stats/StatsModel.js";


export const Bind = (target, event, handler) => target.addEventListener(event, handler);


document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");


    const apiModel = new APIModel();
    const apiView = new APIView(content);
    new APIController(apiModel, apiView, onApiSuccess);


    apiView.render();


    function onApiSuccess(apiKey) {
        const charModel = new CharacterModel(apiKey);
        const charView = new CharacterView(content);
        charView.render();


        new CharacterController(charModel, charView, (charName) => {
            // Ga naar Stats MVC
            const statsModel = new StatsModel(apiKey, charName);
            const statsView = new StatsView(content);
            statsView.render();
            new StatsController(statsModel, statsView);
        });
    }
});