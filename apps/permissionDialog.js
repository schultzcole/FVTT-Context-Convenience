import ApplicationRejected from "./ApplicationRejected.js";

export default function permissionDialog() {
    return new Promise((resolve, reject) => {
        new Dialog(
            {
                title: game.i18n.localize("ctx-convenience.GENERAL.SelectPerms"),
                content: `
                <form class="flexcol">
                    <div class="form-group">
                        <select name="permSelector">
                            <option value=${ENTITY_PERMISSIONS.NONE}>None</option>
                            <option value=${ENTITY_PERMISSIONS.LIMITED}>Limited</option>
                            <option value=${ENTITY_PERMISSIONS.OBSERVER}>Observer</option>
                            <option value=${ENTITY_PERMISSIONS.OWNER}>Owner</option>
                        </select>
                    </div>
                </form>
                `,
                buttons: {
                    confirm: {
                        icon: '<i class="fas fa-check"></i>',
                        label: game.i18n.localize("ctx-convenience.GENERAL.Confirm"),
                        callback: (html) => {
                            resolve(parseInt(html.find('select[name="permSelector"]').val()));
                        },
                    },
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: game.i18n.localize("Cancel"),
                    },
                },
                default: "confirm",
                close: () => {
                    reject(new ApplicationRejected("User canceled permission dialog"));
                },
            },
            { width: 150 }
        ).render(true);
    });
}
