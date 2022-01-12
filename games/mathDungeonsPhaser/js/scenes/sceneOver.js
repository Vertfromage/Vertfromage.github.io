class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload()
    {
        this.load.image("button1","images/ui/buttons/2/1.png")
    	this.load.image("title","images/title.png");
    }
    create() {
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        

        this.add.image(game.config.width / 2, game.config.height / 2, "hallway");
        var monster = this.add.image(game.config.width / 2, game.config.height * .55, "troll");
        monster.scale=.9;
        var title = this.add.image(0,0,'title');
        Align.scaleToGameW(title,.8);
        this.alignGrid.placeAtIndex(27,title);

        var btnSettings = new FlatButton({scene:this,key:'toggleBack',text:'⚙',event:'push_settings',textConfig:{color:'black',fontSize:80}});
        this.alignGrid.placeAtIndex(9.5,btnSettings);
        btnSettings.scale = .52;
        btnSettings.y = game.config.height*.06

        var btnMap = new FlatButton({scene:this,key:'button1',text:"▶",event:'start_map',textConfig:{color:'black',fontSize:45}});
        this.alignGrid.placeAtIndex(104,btnMap);

        
        //this.alignGrid.showNumbers();
        var soundButtons = new SoundButtons({scene:this});
        var mediaManager = new MediaManager({scene:this});

        emitter.on('push_settings',this.goSettings,this);
        emitter.on('start_map', this.startMap, this);
        
    }
    goSettings(){
        this.emittersOff();
        this.scene.start('SceneSettings');
    }
    startMap(){
        this.emittersOff();
        this.scene.start('SceneChooseMission');
    }
    emittersOff(){
        emitter.off('push_settings');
        emitter.off('start_map');
    }
    update() {}
}