# alt:V Open Source Speedometer Collection
**[This collection](https://github.com/MyHwu9508/altv-os-speedometer-collection)** is made for **[alt:V](https://altv.mp/)** and provides some basic implementation of speedometers in alt:V.  
Special thanks to **[tomatenbaumful](https://github.com/tomatenbaumful)** for developing the svg content for this resource! :heart:

## Features
- Switch between 3 different types
- Tweenjs & Svelte for the excellent performance
- Adjust refresh rate, size, type and position with console commands

## Compile files
**[This collection](https://github.com/MyHwu9508/altv-os-speedometer-collection)** uses **[Svelte](https://svelte.dev/)**, **[Tailwind CSS](https://tailwindcss.com/)** with **[NodeJS](https://nodejs.org/en/)**.
Before compiling the files make sure you have the latest [Node.js](https://nodejs.org/en/) version installed.
Run following commands to download all necessary dependencies:
```sh
npm install
```
Now you can build the source by running following command:
```sh
npm run build
```

After the command is executed you will see a `dist` folder containing all the resource files.
Copy the content of this folder to your own resource, or if you are using the example resource paste the files in `speedometer-collection-example\client\src`.

## Example Resource Usage
To run the example resource copy it into your servers resources folder and add `speedometer-collection-example` to your `server.toml`.
Then join your server, enter any vehicle and enjoy the speedometer.

## Design Configuration
You can change some design attributes with console commands (F8) to adjust design to your likings
```js
mode: 0, // 0 is kmh, 1 is mph
width: 15, //width of the speedometer
fps: 45, //refresh rate, less means more fps overall (CEF is currently very fps expensive)
bottom: 2.5, //distance from the bottom of the screen
right: 0.2, //distance from the right border of the screen
speedometerType: 0 //Change the speedometer type 0=Forza5, 1=Forza4, 2=NFS2015
```

### Console command example
Adjust the refresh rate to 90 fps
```
fps 90
```


## Screenshots
The screenshots have been taken from the example resource
Forza 5 Digital | Forza 4 Digital | NFS 2015
:-------|:-------- |:--------
![Forza 5 Digital](https://i.imgur.com/GIUsNkJ.png) | ![Forza 4 Digital](https://i.imgur.com/434B7mK.png) | ![NFS 2015](https://i.imgur.com/4C8d1Mz.png)

## Help
In case you have any questions or concerns regarding this, feel free to contact me on Discord.
**Kaniggel#6969**
Alternatively you can join my Discord and create a ticket: https://corrosive.eu/discord

## License
This project is written by **[Kaniggel](https://github.com/MyHwu9508)** and **[tomatenbaumful](https://github.com/tomatenbaumful)** and published under **MIT License**
The designs are inspired from [Forza](https://forza.net/) [NFS 2015](https://store.steampowered.com/app/1262540/Need_for_Speed/).  
[Google Fonts](https://fonts.google.com/) are being used within this project. For commerical use, please check for licensing!
