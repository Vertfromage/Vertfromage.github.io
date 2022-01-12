var game;
var model;
var emitter;
var G;
var controller;

window.onload = function() {
    var isMobile = navigator.userAgent.indexOf("Mobile");
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 480,
            height: 840
        },
        scene: [SceneLoad, SceneTitle, SceneSettings, SceneChooseAvatar, SceneChooseMission, SceneLevelMap, SceneMain, SceneOver]
    }
    G = new Constants();
    model = new Model();
    model.isMobile= isMobile;
    game = new Phaser.Game (gameConfig);
    window.focus();
}