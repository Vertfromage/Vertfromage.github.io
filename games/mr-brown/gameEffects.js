/*
    LittleJS Platformer Example - Effects
    - Plays different particle effects which can be persistant
    - Destroys terrain and makes explosions
    - Outlines tiles based on neighbor types
    - Generates parallax background layers
    - Draws moving starfield with plants and suns
    - Tracks zzfx sound effects
*/

'use strict';


///////////////////////////////////////////////////////////////////////////////
// sky with background gradient, stars, and planets

let skySeed, skyColor, horizonColor;

function initSky()
{
    skySeed = rand(1e9);
    skyColor = randColor(new Color(.5,.5,.5), new Color(.9,.9,.9));
    horizonColor = skyColor.subtract(new Color(.05,.05,.05)).mutate(.3).clamp();
}

function drawSky()
{
    // fill background with a gradient
    const gradient = mainContext.fillStyle = mainContext.createLinearGradient(0, 0, 10, mainCanvas.height);
    gradient.addColorStop(0, skyColor.rgba());
    gradient.addColorStop(.9, horizonColor.rgba());
    mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
}