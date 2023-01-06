<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  
  //import speedometer components to render
  import Forza4Digital from "../speedometers/Forza4Digital.svelte";
  import Forza5Digital from "../speedometers/Forza5Digital.svelte";
  import NFS from "../speedometers/NFS.svelte";

  let visible = false;
  let refreshInterval = 150;

  //actual speedometer data
  let data = {
    speed: 0,
    rpm: 0,
    gear: 0,
    lightState: false,
  };

  //design config
  let config = {
    mode: 0, //0 kmh, 1mph
    width: 15,
    fps: 45,
    bottom: 2.5,
    right: 0.2,
    speedometerType: 0,
  };

  createjs.Ticker.framerate = config.fps; //default fps value more then 45 is not really suggested due increasing fps draw of the game

  //register events to interact with UI
  onMount(() => {
    window.alt?.on("updateSpeedometer", updateSpeedometer);
    window.alt?.on("updateSpeedometerConfig", updateSpeedometerConfig);
    window.alt?.on("toggleSpeedometer", toggleSpeedometer);
  });

  function toggleSpeedometer(state) {
    visible = state;
  }

  function updateSpeedometerConfig(newConfig) {
    config = newConfig;
    createjs.Ticker.framerate = config.fps;
  }

  function updateSpeedometer(serverData, isOnlyRPMUpdate = false) {
    data.gear = calcGearText(serverData.gear);
    data.lightState = serverData.lightState;

    let newSpeed = Math.round(config.mode ? serverData.speed * 2.236936 : serverData.speed * 3.6);
    if (isOnlyRPMUpdate) {
      data.speed = 0;
      newSpeed = 0;
    }

    // Each update we tween the data to make it look smoother and to not send everyTick to the UI
    // Due to that the actual displayed values may be delayed by 150ms
    createjs.Tween.get(data, {
      override: true,
      onChange: () => {
        data = data;
      }, // just a svelte thing
    }).to(
      {
        speed: newSpeed,
        rpm: serverData.rpm,
      },
      refreshInterval,
      createjs.Ease.linear
    );
  }

  function calcGearText(currentGear) {
    switch (currentGear) {
      case 0:
        if (data.speed > 1 && data.rpm > 0.21) {
          return "R";
        } else {
          return "N";
        }
      default:
        return currentGear;
    }
  }

  //Adds some little animation while the vehicle is standing still, so the UI looks more alive
  setInterval(() => {
    if (data.speed < 1 && data.rpm <= 0.23) {
      const rpmNum = getRandom(18, 22);
      const newRpm = rpmNum / 100;
      updateSpeedometer({ ...data, rpm: newRpm, speed: 0 }, true);
    }
  }, 100);

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
</script>

{#if visible}
  <div class="fixed pointer-events-none" style="width: {config.width}%;bottom:{config.bottom}%;right:{config.right}%;" transition:fly={{ x: 150, duration: 300 }}>
    {#if config.speedometerType == 1}
      <Forza4Digital {...data} mode={config.mode} />
    {:else if config.speedometerType == 0}
      <Forza5Digital {...data} mode={config.mode} />
    {:else if config.speedometerType == 2}
      <NFS {...data} mode={config.mode} />
    {/if}
  </div>
{/if}

<style>
</style>
