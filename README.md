# Context Convenience

A selection of convenient utility actions to sidebar right-click menus.

## Functionality

### Scene Folder Actions

#### Show/Hide in Navigation

Shows or hides all scenes in a folder in the top navigation bar.

## API

Utility functions are available in `game.ctxConvenience` for much of the available context menu actions. In some cases, these functions expose parameters beyond what is available in the context menu. For instance, `game.ctxConvenience.folders.sortFolderContents` exposes a `cmp` parameter that lets you define the comparison function that will be used to sort the entities in the folder.

## Compatibility

Should be compatible with just about anything, though there may be some overlap with other modules which add similar functionality, for instance "The Furnace" adds similar sorting items in the folder context menu.

## License

Licensed under the GPLv3 License (see [LICENSE](LICENSE)).
