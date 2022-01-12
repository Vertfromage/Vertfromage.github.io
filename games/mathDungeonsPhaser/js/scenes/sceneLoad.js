class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload()
    {
            // Detect the progress of the load
            this.bar = new Bar({scene:this,x:game.config.width/2,y:game.config.height/2});
            this.progText = this.add.text(game.config.width/2,game.config.height/2,"0%",
            {color:"#ffffff", fontSize:game.config.width/20});
            this.progText.setOrigin(0.5,0.5);
            this.load.on("progress", this.onProgress, this);

            // Load images or sounds.
            this.load.image("button1","images/ui/buttons/2/1.png");
            this.load.image("button2","images/ui/buttons/2/4.png");
            this.load.image('toggleBack','images/ui/toggles/1.png');        
            this.load.image('sfxOn','images/ui/icons/sfx_on.png');
            this.load.image('sfxOff','images/ui/icons/sfx_off.png');
            this.load.image('musicOn','images/ui/icons/music_on.png');
            this.load.image('musicOff','images/ui/icons/music_off.png');
            this.load.image("wheel", "images/wheel.png");
            this.load.image("hallway", "images/hallway.png");
            this.load.image("hint", "images/hint.svg");
            this.load.image("moneybag", "images/bag.svg");
            this.load.spritesheet("knife", "images/Blade7-in.png", {frameWidth:331,frameHeight:696});
            this.load.spritesheet("arrows","images/arrows.png", {frameWidth:200,frameHeight:89});
            this.load.spritesheet("troll","images/troll.png", {frameWidth:505,frameHeight:526});
            this.load.spritesheet("dudeBlink","images/dudeBlink.png", {frameWidth:453,frameHeight:627});
            this.load.spritesheet("dudetteBlink","images/dudetteBlink.png", {frameWidth:460,frameHeight:627});
            this.load.audio('backgroundMusic',["audio/random-race.mp3","audio/random-race.ogg"]);
            this.load.audio('boom',["audio/boom.mp3","audio/boom.ogg"]);
            this.load.audio("splat",["audio/zapsplat_fantasy_giant_angry_growl_001_15419.mp3"]);
            this.load.image("button1","images/ui/buttons/2/1.png");
            this.load.image("button4","images/ui/toggles/4.png");
            this.load.image("button5","images/ui/toggles/5.png");
            this.load.image("button6","images/ui/buttons/2/6.png");
            this.load.image("title","images/red-title-3.png");
            this.load.image("mapBack","images/map-background.png");
            this.load.image("skull","images/skull.png");
            this.load.image("little","images/little-castle.png");
        }
    onProgress(value){
        this.bar.setPercent(value);
        var per = Math.floor(value*100);
        this.progText.setText(per+"%");
    }

    create() {
        this.scene.start('SceneTitle');
    }
    update() {
        
    }
}