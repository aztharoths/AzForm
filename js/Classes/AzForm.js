import Utils from "./Utils.js";

export default class AzForm {
    /**
     *
     * @param {Element} AzFormContainer
     * @param {Object} options
     * @param {String} options.title
     * @param {String} options.submitButtonInnerHTML
     * @param {Function} options.submitFunction
     */
    constructor(AzFormContainer, options) {
        //-------------------- SIGN --------------------//

        AzFormContainer.innerHTML = `<!-------------------- Dev aztharoths#4398 www.azthaweb.com -------------------->`;

        //-------------------- /SIGN --------------------//

        //-------------------- OPTIONS --------------------//

        this.options = Object.assign(
            {
                title: "My AzForm",
                submitButtonInnerHTML: "Submit",
                submitFunction: () => {
                    console.log("submitted");
                },
            },
            options
        );

        //-------------------- /OPTIONS --------------------//

        //-------------------- VARIABLES --------------------//

        this.isValid = false;

        //-------------------- /VARIABLES --------------------//

        //-------------------- CREATE AZFORM --------------------//

        this.AzForm = Utils.createElt("form", "AzForm");
        this.AzForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.isValid) {
                this.options.submitFunction();
            }
        });
        AzFormContainer.appendChild(this.AzForm);

        //-------------------- /CREATE AZFORM --------------------//

        //-------------------- CREATE TITLE --------------------//

        this.title = Utils.createElt("h2", "AzForm__title");
        this.title.innerHTML = this.options.title;
        this.AzForm.appendChild(this.title);

        //-------------------- /CREATE TITLE --------------------//

        //-------------------- CREATE INPUTS --------------------//

        this.AzInputs = [];
        this.AzInputsSection = Utils.createElt("section", "AzForm__AzInputs");
        this.AzForm.appendChild(this.AzInputsSection);

        //-------------------- /CREATE INPUTS --------------------//

        //-------------------- CREATE BUTTONS --------------------//

        this.buttonsSection = Utils.createElt("section", "AzForm__buttons");
        this.AzForm.appendChild(this.buttonsSection);

        //SUBMIT BUTTON

        this.submitButton = Utils.createElt(
            "button",
            ["AzForm__buttons__button", "AzForm__buttons__button--submit"],
            { type: "submit" }
        );
        this.submitButton.innerHTML = this.options.submitButtonInnerHTML;
        this.buttonsSection.appendChild(this.submitButton);

        //-------------------- /CREATE BUTTONS --------------------//

        //-------------------- HERE WE GO ! --------------------//

        this.#checkValidity();

        //-------------------- /HERE WE GO ! --------------------//
    }

    /**
     *
     * @param {String} buttonInnerHTML
     * @param {Function} buttonFunction
     */
    addButton(buttonInnerHTML, buttonFunction) {
        const newButton = Utils.createElt("button", "AzForm__buttons__button", { type: "button" });
        newButton.innerHTML = buttonInnerHTML;
        newButton.addEventListener("click", (e) => {
            buttonFunction();
        });
        this.buttonsSection.appendChild(newButton);
    }

    /**
     *
     * @param {String} buttonInnerHTML
     * @param {Function} [buttonFunction]
     */
    addResetButton(buttonInnerHTML, buttonFunction) {
        const newButton = Utils.createElt("button", "AzForm__buttons__button", { type: "reset" });
        newButton.innerHTML = buttonInnerHTML;
        if (buttonFunction) {
            newButton.addEventListener("click", (e) => {
                buttonFunction();
            });
        }
        this.buttonsSection.appendChild(newButton);
    }

    #disableSubmit() {
        this.isValid = false;
        this.submitButton.setAttribute("disabled", "disabled");
    }
    #enableSubmit() {
        this.isValid = true;
        this.submitButton.removeAttribute("disabled");
    }
    #checkValidity() {
        this.#disableSubmit();
    }
}
