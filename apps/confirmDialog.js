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
