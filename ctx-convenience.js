import { sortFolderContents, setFolderContentsDefaultPermission } from "./utilities/folders.js";
import { setNavigationForAllScenes } from "./utilities/scenes.js";
import permissionDialog from "./apps/permissionDialog.js";
import ApplicationRejected from "./apps/ApplicationRejected.js";
import confirmDialog from "./apps/confirmDialog.js";

Hooks.on("init", () => {
    // "register" utility functions
    game.ctxConvenience = {
        folders: {
            sortFolderContents,
            setFolderContentsDefaultPermission,
        },
        scenes: {
            setNavigationForAllScenes,
        },
    };

    // add context options
    const old_getFolderContextOptions = SidebarDirectory.prototype._getFolderContextOptions;
    SidebarDirectory.prototype._getFolderContextOptions = function () {
        const ctxOptions = old_getFolderContextOptions.call(this);

        const sortContentsA = {
            name: "ctx-convenience.FOLDER.SortContentsAsc",
            icon: '<i class="fas fa-sort-alpha-down"></i>',
            condition: game.user.isGM,
            callback: (header) => {
                const folderId = header.parent().data("folderId");
                sortFolderContents(folderId);
            },
        };

        const sortContentsD = {
            name: "ctx-convenience.FOLDER.SortContentsDesc",
            icon: '<i class="fas fa-sort-alpha-up"></i>',
            condition: game.user.isGM,
            callback: (header) => {
                const folderId = header.parent().data("folderId");
                sortFolderContents(folderId, true);
            },
        };

        const setPerms = {
            name: "ctx-convenience.FOLDER.SetPerms",
            icon: '<i class="fas fa-user-lock"></i>',
            condition: game.user.isGM,
            callback: async (header) => {
                const folderId = header.parent().data("folderId");
                try {
                    const perm = await permissionDialog();
                    setFolderContentsDefaultPermission(folderId, perm);
                } catch (err) {
                    if (!(err instanceof ApplicationRejected)) throw err;
                }
            },
        };

        // unused
        const exportToComp = {
            name: "ctx-convenience.FOLDER.ExportToComp",
            icon: '<i class="fas fa-atlas"></i>',
            condition: game.user.isGm,
            callback: async (header) => {
                const folderId = header.parent().data("folderId");
                const folder = game.folders.get(folderId);
                const packName = folder.name.slugify();
                const existingPack = game.packs.get(`world.${packName}`);

                let packToWrite = null;
                if (existingPack) {
                    const dialogTitle = game.i18n.localize("ctx-convenience.GENERAL.AreYouSure");
                    const dialogContent = `Are you sure you want to overwrite the compendium called ${folder.name}?`;
                    if (await confirmDialog(dialogTitle, dialogContent)) {
                        packToWrite = existingPack;
                    }
                }

                if (!packToWrite) {
                    try {
                        packToWrite = await Compendium.create({
                            name: packName,
                            label: folder.name,
                            package: "world",
                            entity: folder.type,
                        });
                    } catch (err) {
                        ui.notifications.error(err);
                    }
                }
                folder.exportToCompendium(packToWrite, { updateByName: false });
            },
        };

        ctxOptions.unshift(sortContentsA, sortContentsD, setPerms);
        return ctxOptions;
    };

    const scenes_old_getFolderContextOptions = SceneDirectory.prototype._getFolderContextOptions;
    const new_getFolderContextOptions = SidebarDirectory.prototype._getFolderContextOptions;
    SceneDirectory.prototype._getFolderContextOptions = function () {
        const ctxOptions = scenes_old_getFolderContextOptions.call(this);
        // ctxOptions.unshift();

        const showNavAll = {
            name: "ctx-convenience.SCENE.ShowNavAll",
            icon: '<i class="fas fa-eye"></i>',
            condition: game.user.isGM,
            callback: (header) => {
                const folderId = header.parent().data("folderId");
                setNavigationForAllScenes(folderId, true);
            },
        };

        const hideNavAll = {
            name: "ctx-convenience.SCENE.HideNavAll",
            icon: '<i class="fas fa-eye-slash"></i>',
            condition: game.user.isGM,
            callback: (header) => {
                const folderId = header.parent().data("folderId");
                setNavigationForAllScenes(folderId, false);
            },
        };

        ctxOptions.unshift(showNavAll, hideNavAll);
        return ctxOptions;
    };
});
