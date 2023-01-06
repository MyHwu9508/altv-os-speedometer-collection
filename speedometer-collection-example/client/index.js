import alt from 'alt-client';
import native from 'natives';

const browser = new alt.WebView('http://resource/client/src/index.html');
const player = alt.Player.local;
let defaultConfig = {
    mode: 0,
    width: 15,
    fps: 45,
    bottom: 2.5,
    right: 0.2,
    speedometerType: 0
};

alt.on('leftVehicle', ()=>{ toggleSpeedometer(false) });
alt.on('enteredVehicle', ()=>{ toggleSpeedometer(true) });
alt.on('consoleCommand', consoleCommand);

alt.setInterval(() => {
    if (!player.vehicle) return;
    browser.emit('updateSpeedometer', {
        speed: native.getEntitySpeed(player.vehicle),
        rpm: player.vehicle.rpm,
        gear: player.vehicle.gear,
        lightState: native.getVehicleLightsState(player.vehicle,true,true)[1]
    });
}, 150);

function toggleSpeedometer(state){
    browser.emit('toggleSpeedometer',state); 
}

function updateSpeedometerConfig(key, value) {
  defaultConfig[key] = value;
  browser.emit('updateSpeedometerConfig', defaultConfig);
}


// The console command matches any attribute in defaultConfig
// If you actually plan to use this speedometer, please implement some mechanism to save user defined configs
// We suggest using https://docs.altv.mp/js/api/alt-client.LocalStorage.html
function consoleCommand(...args){
    if(args?.length < 2){
        return alt.log('bad command! Use for example "fps 30"');
    }

    const command = args[0];
    const value = args[1];

    updateSpeedometerConfig(command,value);
}