// const RPGinia = require('rpginia');
import RPGinia from 'rpginia';

const app = new RPGinia(
    {
        canvas: document.querySelector('canvas')
    }, 
    {
        environment: 'development'
    }
);

const loaders = new RPGinia.Loaders(app);
const world = new RPGinia.World(app);

;(async () => {
    const levelList = [
        '/resources/levels/es6level/es6Level.js'
    ];

    app.eventEmitter.on('toggleFullscreen', (e) => {
        console.log(e);
    });

    world.setLevel(await loaders.loadLevel(levelList[0]));

    world.render();

    // // Load and set level.
    // world.setLevel(await loaders.loadLevel(levelList[0]));

    // // Separator
    // console.log('----------');

    // // Load a spritesheet JSON file.
    // console.log(await loaders.loadSpriteSheet('/resources/sprites/spriteSheet.json'));

    // console.log('File list:\n', loaders.files, '\nLevel list:\n', world._levelManager._levelList);
})();