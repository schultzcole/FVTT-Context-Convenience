import { configurePrototypeTokenForActor } from "./actions/actors.js";
import { setNavigationForAllScenes } from "./actions/scenes.js";

Hooks.on("init", () => {
    // "register" utility functions
    globalThis.ContextConvenience = {
        scenes: {
            setNavigationForAllScenes,
        },
        actors: {
            configurePrototypeTokenForActor,
        }
    };

    // Add scene folder context options:
    //  - Show all scenes in navbar
    //  - Hide all scenes in navbar
    const scenes_old_getFolderContextOptions = SceneDirectory.prototype._getFolderContextOptions;
    SceneDirectory.prototype._getFolderContextOptions = function () {
        const ctxOptions = scenes_old_getFolderContextOptions.call(this);

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

    // Add actor entry context options:
    //  - Edit prototype token
    const actors_old_getEntryContextOptions = ActorDirectory.prototype._getEntryContextOptions;
    ActorDirectory.prototype._getEntryContextOptions = function () {
        const ctxOptions = actors_old_getEntryContextOptions.call(this);

        const editPrototypeToken = {
            name: "TOKEN.TitlePrototype",
            icon: '<i class="fas fa-user-circle"></i>',
            condition: (li) => {
                const actor = game.actors.get(li.data("entityId"));
                return game.user.isGM || (actor.owner && game.user.can("TOKEN_CONFIGURE"));
            },
            callback: (li) => {
                configurePrototypeTokenForActor(li.data("entityId"));
            },
        };

        ctxOptions.unshift(editPrototypeToken);

        return ctxOptions;
    };
});
