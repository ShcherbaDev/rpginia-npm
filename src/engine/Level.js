class Level {
	/**
	 * Possible settings:
	 * name, background, spriteSheetPath (alias: spriteSheet), spritesPositionPath (alias: spritesPosition)
	 */ 
	constructor(settings) {
		const { name, background, spriteSheetPath, spriteSheet, spritesPositionPath, spritesPosition } = settings;

		this._name = name;
		this._background = background || '#000000';
		this._spriteSheetPath = spriteSheetPath || spriteSheet;
		this._spritesPositionPath = spritesPositionPath || spritesPosition;

		this._isActive = false;
	}

	render() {
		return this._isActive;
	}

	get name() { return this._name; }

	get background() { return this._background; }

	get spriteSheetPath() { return this._spriteSheetPath; }

	get spritesPositionPath() { return this._spritesPositionPath; }

	get isActive() { return this._isActive; }

	set isActive(newActiveValue) { this._isActive = newActiveValue; }
}

export default Level;
