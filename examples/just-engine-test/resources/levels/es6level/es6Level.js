import RPGinia from 'rpginia';

export default class Es6Level extends RPGinia.World.Level { 
    constructor() {
        super({
            name: 'asdasd',
            spriteSheet: '/resources/sprites/spriteSheet.json',
            spritesPosition: '/resources/levels/es6level/view.json'
        });
    }
}
