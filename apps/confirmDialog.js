/**
 * Creates a simple dialog that prompts the user to agree/disagree and abstracts the results with a Promise.
 *
 * @param {string} title the title to be shown in the header of the dialog.
 * @param {string} content the message to be displayed in the body of the dialog.
 * @returns a Promise which resolves to true if the user clicks "Yes", and false if the user clicks "No"
 *
 * @example
 * const continue = await confirmDialog("Continue?", "Would you like to continue?");
 * if (continue) console.log("yay");
 * else console.log("nay");
 */
export default function confirmDialog(title, content) {
    return new Promise((resolve, reject) => {
        new Dialog(
            {
                title,
                content,
                buttons: {
                    yes: {
                        icon: '<i class="fas fa-check"></i>',
                        label: game.i18n.localize("Yes"),
                        callback: () => resolve(true),
                    },
                    no: {
                        icon: '<i class="fas fa-times"></i>',
                        label: game.i18n.localize("No"),
                    },
                },
                default: "yes",
                close: () => resolve(false),
            },
            { width: 150 }
        ).render(true);
    });
}
