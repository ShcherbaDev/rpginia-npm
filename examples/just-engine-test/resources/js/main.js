const RPGinia = require('rpginia');

const app = new RPGinia(
    {
        canvas: document.querySelector('canvas')
    }, 
    {
        environment: 'development'
    }
);

app.onToggleFullscreen = (e) => {
    console.log('Custom event', e)
}

console.log(app);