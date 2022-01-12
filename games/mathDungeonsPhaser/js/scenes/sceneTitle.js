class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
        
    }
    create() {
        //emitter and controller need to be first create of first scene
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        
        this.add.image(game.config.width / 2, game.config.height / 2, "hallway");
        var monster = this.add.image(game.config.width / 2, game.config.height * .55, "troll");
        monster.scale=.9;
        var title = this.add.image(0,0,'title');
        Align.scaleToGameW(title,.95);
        this.alignGrid.placeAtIndex(27,title);

        var btnSettings = new FlatButton({scene:this,key:'toggleBack',text:'⚙',event:'push_settings',textConfig:{color:'black',fontSize:80}});
        this.alignGrid.placeAtIndex(9.5,btnSettings);
        btnSettings.scale = .52;
        btnSettings.y = game.config.height*.055;
        
        // this.alignGrid.showNumbers();
        var soundButtons = new SoundButtons({scene:this});

        var btnStart = new FlatButton({scene:this,key:'button1',text:"▶",event:'start',textConfig:{color:'black',fontSize:45}});
        this.alignGrid.placeAtIndex(104,btnStart);
        
        emitter.on('push_settings',this.goSettings,this);
        emitter.on('start', this.start, this);

        var mediaManager = new MediaManager({scene:this});
        mediaManager.setBackgroundMusic("backgroundMusic");
    }

    start(){
        this.emittersOff();
        //ToDo - If users go to pick player page, if not go straight to add player
        this.scene.start("SceneChooseAvatar");
    }
   
    goSettings(){
        this.emittersOff();
        this.scene.start('SceneSettings');
    }
    emittersOff(){
        emitter.off('push_settings');
        emitter.off('start_map');
    }
    update() {}
}