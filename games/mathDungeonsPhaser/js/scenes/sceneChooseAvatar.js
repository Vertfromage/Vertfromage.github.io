class SceneChooseAvatar extends Phaser.Scene {
    constructor() {
        super('SceneChooseAvatar');
    }
    preload() {
        
    }
    create() {
        console.log("SceneChooseAvatar");
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        this.back = this.add.image(game.config.width / 2, game.config.height / 2, "mapBack");
        Align.scaleToGameW(this.back, 1.1);
        var soundButtons = new SoundButtons({scene:this});

        var btnStart = new FlatButton({scene:this,key:'button1',text:"✔",event:'start',textConfig:{color:'black',fontSize:45}});
        this.alignGrid.placeAtIndex(104,btnStart);

        emitter.on('start', this.start, this);
       
        this.dude = this.add.sprite(game.config.width / 2, game.config.height *.38, "dudeBlink");
        Align.scaleToGameW(this.dude, .80);

        this.dudette = this.add.sprite(game.config.width / 2, game.config.height *.38, "dudetteBlink");
        Align.scaleToGameW(this.dudette, .80);
        this.dudette.alpha = 0;

        this.possibleAvatars = [this.dude, this.dudette];
        this.currentAvatar = 0;

        this.arrow = this.add.sprite(game.config.width/2, game.config.height * .75, "arrows");
        Align.scaleToGameW(this.arrow, .3);
        
        this.arrow.setInteractive();
        this.arrow.on('pointerup', this.touchArrow, this);

        this.avatarAnimation('dudeBlink');
        this.avatarAnimation('dudetteBlink');

        this.dude.play('dudeBlink');
        this.dudette.play('dudetteBlink');

        if(model.currUser==-1){
        this.addAvatar();
        }else{
            console.log("Multiple users coming!");
        }
    }

    avatarAnimation(key){
        this.anims.create({
            key: key,
            frames: [ { key: key, frame: 0 },{ key: key, frame: 0 }, { key: key, frame: 0 },{ key: key, frame: 0 },{ key: key, frame: 1 },{ key: key, frame: 1 },{ key: key, frame: 1 },{ key: key, frame: 1 },{ key: key, frame: 2 },{ key: key, frame: 2 }],
            frameRate: 6,
            repeat: -1
        });
    }

    touchArrow(){
        this.possibleAvatars[this.currentAvatar].alpha =0;
        if(this.currentAvatar<this.possibleAvatars.length-1){
            this.currentAvatar++;
            this.possibleAvatars[this.currentAvatar].alpha=1;
        }else{
            this.currentAvatar=0;
            this.possibleAvatars[this.currentAvatar].alpha=1;
        }
        this.tweens.add({
            targets: [this.arrow],
            angle: 10,
            duration: 400,
            yoyo: true
        });
        this.chooseAvatar();
    }
    

    start(){
        this.emittersOff();
        this.scene.start("SceneChooseMission");
    }

    emittersOff(){
        emitter.off('start');
    }

    // Code to store in model
    addAvatar(){
        let config = {avatar: this.possibleAvatars[this.currentAvatar].texture.key};
        model.newUser(config);
        model.currUser=0;
        // this.testAddAvatar();
    }
    chooseAvatar(){
        let config = {user:0 , avatar: this.possibleAvatars[this.currentAvatar].texture.key};
        model.editUser(config);
        // this.testAddAvatar();
    }

    // testAddAvatar(){
    //     model.printUsers();
    // }

}
    