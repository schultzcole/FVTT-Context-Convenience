/**
 * Shows or hides all scenes in this folder in the navigation bar
 * @param {string}  folder  the id or name of the folder in which to toggle permissions
 * @param {boolean} navOn   whether navigation should be on or off for all scenes in the given folder
 */
export function setNavigationForAllScenes(folder, navOn) {
    const folderObject = game.folders.get(folder) || game.folders.getName(folder);

    const updates = game.scenes
        .filter((scene) => scene.data.folder === folderObject.id)
        .map((scene) => ({ _id: scene.id, navigation: navOn }));

    return Scene.update(updates);
}
