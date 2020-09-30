/**
 * Folder Utilities
 */

/**
 * Sorts the contents of a specified folder. By default, sorts ascending alphabetically.
 * @param {string}   folder  the id or name of the folder to sort.
 * @param {boolean}  invert  whether to sort ascending or descending.
 * @param {function} cmp     an optional comparison function to use for sorting the contents.
 */
export function sortFolderContents(folder, invert = false, cmp = null) {
    const folderObject = game.folders.get(folder) || game.folders.getName(folder);
    const entityClass = CONFIG[folderObject.type].entityClass;
    const entityCollection = CONFIG[folderObject.type].collection.instance;
    const comparison = (a, b) => (invert ? -1 : 1) * (cmp ? cmp(a, b) : a.name.localeCompare(b.name));
    const updates = entityCollection
        .filter((entity) => entity.data.folder === folderObject.id)
        .sort(comparison)
        .map((entity, idx) => ({ _id: entity.id, sort: idx }));
    return entityClass.update(updates);
}

/**
 * Sets the default permission on all contents of the specified folder.
 * @param {string}  folder  the id or name of the folder to set permissions for.
 * @param {integer} perm    what permission level to set the contents to. See ENTITY_PERMISSIONS
 */
export function setFolderContentsDefaultPermission(folder, perm = ENTITY_PERMISSIONS.NONE) {
    const folderObject = game.folders.get(folder) || game.folders.getName(folder);
    const entityClass = CONFIG[folderObject.type].entityClass;
    const entityCollection = CONFIG[folderObject.type].collection.instance;
    const updates = entityCollection
        .filter((entity) => entity.data.folder === folderObject.id)
        .map((entity) => {
            const existingPerms = duplicate(entity.data.permission);
            existingPerms.default = perm;
            return { _id: entity.id, permission: existingPerms };
        });
    return entityClass.update(updates, { diff: false });
}
