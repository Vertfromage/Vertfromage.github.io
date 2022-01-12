class SceneChooseMission extends Phaser.Scene {
    constructor() {
        super('SceneChooseMission');
    }
    preload() {
        // ToDo - Need to change alpha to .5 if settings are off for option.
    }
    create() {
        console.log("SceneChooseMission");
        this.alignGrid = new AlignGrid({ rows: 12, cols: 6, scene: this });

        this.back = this.add.image(game.config.width / 2, game.config.height / 2, "mapBack");
        Align.scaleToGameW(this.back, 1.1);

        var mediaManager = new MediaManager({ scene: this });
        var sb = new SoundButtons({ scene: this });

        var btnBack = new FlatButton({ x:game.config.width * .9,y:game.config.height * .055,scene: this, key: 'toggleBack', text: "↫", event: 'push_back', textConfig: { color: 'black', fontSize: 90 } });
        btnBack.scale = .52;
        emitter.on('push_back', this.goBack, this);

        this.alignGrid = new AlignGrid({rows:15, cols:11, scene:this});
        this.troll = this.add.image(0,0,"troll");
        this.troll.scale = .6;
        this.alignGrid.placeAtIndex(49, this.troll);
        

        var btnAvatar = new FlatButton({scene:this,key:model.avatar,text:"",event:'start_avatar',textConfig:{color:'black',fontSize:45}});
        this.alignGrid.placeAtIndex(3.5,btnAvatar);
        btnAvatar.y = game.config.height * .055;
        btnAvatar.scale = .12;
        emitter.on('start_avatar', this.startAvatar, this);

        //this.alignGrid.showNumbers();

        var score = new MoneyBag({scene:this});
        this.mapSwitch = { add: false, sub: false, mult: false, div: false };

        this.drawTeams();
        this.set = model.userSettings;
        let dim = .2;
        if(this.set.switch.add){
            emitter.on("press_add", this.switchAdd, this);
        }else{
            this.btnAdd.alpha=dim;
        }
        if(this.set.switch.sub){
            emitter.on("press_sub", this.switchSub, this);
        }else{
            this.btnSub.alpha=dim;
        }
        if(this.set.switch.mult){
            emitter.on("press_mult", this.switchMult, this);
        
        }else{
            this.btnMult.alpha=dim;
        }
        if(this.set.switch.div){
            emitter.on("press_div", this.switchDiv, this);
        }else{
            this.btnDiv.alpha=dim;
        }
        if(this.set.switch.add&&this.set.switch.sub){
            emitter.on("press_addsub", this.switchAddSub, this);
        }else{
            this.btnAddSub.alpha=dim;
        }
        if(this.set.switch.mult&&this.set.switch.div){
            emitter.on("press_multdiv", this.switchMultDiv, this);
     
        }else{
            this.btnMultDiv.alpha=dim;
        }
        if(this.set.switch.mult&&this.set.switch.div&&this.set.switch.add&&this.set.switch.sub){
            emitter.on("press_all", this.switchAll, this);
     
        }else{
            this.btnAll.alpha=dim;
        }
    }

    drawTeams() {
        

        // ToDo - add '?' in thought bubble to troll. 

        this.btnAdd = new FlatButton({ scene: this, key: 'button4', text: "+", event: 'press_add', textConfig: { color: 'black', fontSize: 60 } });
        this.btnAdd.scale = .9;
        this.alignGrid.placeAtIndex(79.5, this.btnAdd);
        this.btnSub = new FlatButton({ scene: this, key: 'button4', text: "-", event: 'press_sub', textConfig: { color: 'black', fontSize: 60 } });
        this.btnSub.scale = .9;
        this.alignGrid.placeAtIndex(84.5, this.btnSub);
        this.btnMult = new FlatButton({ scene: this, key: 'button5', text: "x", event: 'press_mult', textConfig: { color: 'black', fontSize: 60 } });
        this.btnMult.scale = .9;
        this.alignGrid.placeAtIndex(101.5, this.btnMult);
        this.btnDiv = new FlatButton({ scene: this, key: 'button5', text: "÷", event: 'press_div', textConfig: { color: 'black', fontSize: 60 } });
        this.btnDiv.scale = .9;
        this.alignGrid.placeAtIndex(106.5, this.btnDiv);

        this.btnAddSub = new FlatButton({ scene: this, key: 'button6', text: "+,-", event: 'press_addsub', textConfig: { color: 'black', fontSize: 60 } });
        this.btnAddSub.scale = .8;
        this.alignGrid.placeAtIndex(123.5, this.btnAddSub);
        this.btnMultDiv = new FlatButton({ scene: this, key: 'button6', text: "x,÷", event: 'press_multdiv', textConfig: { color: 'black', fontSize: 60 } });
        this.btnMultDiv.scale = .8;
        this.alignGrid.placeAtIndex(128.5, this.btnMultDiv);

        this.btnAll = new FlatButton({ scene: this, key: 'button6', text: "+,-,x,÷", event: 'press_all', textConfig: { color: 'black', fontSize: 40 } });
        this.btnAll.scale = 1;
        this.alignGrid.placeAtIndex(148, this.btnAll);

        //this.alignGrid.showNumbers();
    }
    goBack() {
        this.emittersOff();
        this.scene.start('SceneOver');
    }

    emittersOff() {
        emitter.off("push_back");
        emitter.off("press_add");
        emitter.off("press_sub");
        emitter.off("press_mult");
        emitter.off("press_div");
        emitter.off("press_addsub");
        emitter.off("press_multdiv");
        emitter.off("press_all");
        emitter.off('start_avatar');
    }
    switchAdd(){
        this.mapSwitch.add = true;
        this.emittersOff();
        this.scene.start('SceneLevelMap', { qSwitch: this.mapSwitch });
    }
    switchSub(){
        this.mapSwitch.sub = true;
        this.emittersOff();
        this.scene.start('SceneLevelMap', { qSwitch: this.mapSwitch });
    }
    switchMult(){
        this.mapSwitch.mult = true;
        this.emittersOff();
        this.scene.start('SceneLevelMap', { qSwitch: this.mapSwitch });
        
    }
    switchDiv(){
        this.mapSwitch.div = true;
        this.emittersOff();
        this.scene.start('SceneLevelMap', { qSwitch: this.mapSwitch });
    }

    switchAddSub(){
        this.mapSwitch.add = true;
        this.mapSwitch.sub = true;
        this.emittersOff();
        this.scene.start('SceneLevelMap', { qSwitch: this.mapSwitch });
    }
    switchMultDiv(){
        this.mapSwitch.mult = true;
        this.mapSwitch.div = true;
        this.emittersOff();
        this.scene.start('SceneLevelMap', { qSwitch: this.mapSwitch });
    }
    switchAll(){
        this.mapSwitch.add = true;
        this.mapSwitch.sub = true;
        this.mapSwitch.mult = true;
        this.mapSwitch.div = true;
        this.emittersOff();
        this.scene.start('SceneLevelMap', { qSwitch: this.mapSwitch });
    }
    startAvatar(){
        this.emittersOff();
        this.scene.start('SceneChooseAvatar');
    }
}