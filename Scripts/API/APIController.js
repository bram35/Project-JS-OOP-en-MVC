export default class APIController {
    constructor(model, view, onSuccess) {
        this.model = model;
        this.view = view;
        this.view.bindSubmit(async (key) => {
            const result = await this.model.validateKey(key);
            if (result.valid) onSuccess(key);
            else this.view.showError("Ongeldige API key: " + result.reason);
        });
    }
}