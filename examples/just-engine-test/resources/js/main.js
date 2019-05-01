const RPGinia = require('rpginia');

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
        '/resources/levels/test-level/testLevelView.json',
        '/resources/levels/test-level.1/testLevelView.json'
    ];

    setTimeout(async () => {
        await loaders.jsonFile(levelList[0]); // Will load last because was setted interval.
    }, 5000);
    await loaders.jsonFile(levelList[1]); // Will load first.
})();