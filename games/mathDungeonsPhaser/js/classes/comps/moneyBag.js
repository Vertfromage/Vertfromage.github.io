class MoneyBag extends Phaser.GameObjects.Container{
    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        let scoreX = .52
        // gameOptions in mathdungeons.js
        let topButtonH = game.config.height * .055;
        this.scoreback = this.scene.add.image(game.config.width *(scoreX+.15), topButtonH,"button6");
        this.moneybag = this.scene.add.image(game.config.width *scoreX, topButtonH,"moneybag");
        this.moneybag.angle = 10;
        this.add(this.scoreback);
        this.add(this.moneybag);
        Align.scaleToGameW(this.scoreback, .3);
        Align.scaleToGameW(this.moneybag, .13);
        this.score = this.scene.add.text(game.config.width*(scoreX+.18), topButtonH, model.score, {
            font: "bold 35px Arial",
            align: "center",
            color: "white"
        });
        this.add(this.score);
        this.score.setOrigin(0.5);
        //always have to add to scene
        this.scene.add.existing(this);
    }
}