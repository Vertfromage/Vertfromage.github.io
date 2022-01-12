class SceneSettings extends Phaser.Scene {
    constructor() {
        super('SceneSettings');
    }
    preload()
    {
    }
    create() {
        // Bug - when press back should not save changes.
        console.log("SceneSettings");
        this.qSwitch = model.userSettings.switch;
        this.qset = model.userSettings.set;
        
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        this.add.image(game.config.width / 2, game.config.height / 2, "hallway");
        this.setButtons();

        
        var mediaManager = new MediaManager({scene:this});
        var sb = new SoundButtons({scene:this});
        var btnStart = new FlatButton({scene:this,key:'toggleBack',text:"✔",event:'start_game',textConfig:{color:'white',fontSize:60}});
        this.alignGrid.placeAtIndex(104,btnStart);
        
        var btnBack = new FlatButton({scene:this,key:'toggleBack',text: "↫" ,event:'push_back',textConfig:{color:'black',fontSize:90}});
        btnBack.scale = .52;
        btnBack.x = game.config.width*.9;
        btnBack.y = game.config.height*.055;

        emitter.on('push_back',this.goBack,this);
        emitter.on('start_game',this.startGame,this);
        //this.alignGrid.showNumbers()
    }
    setButtons(){
        this.btnAdd = new FlatButton({scene:this,key:'button1',text:"+",event:'press_add', textConfig:{color:'black',fontSize:60}});
        this.btnAdd.scale=0.8;
        this.alignGrid.placeAtIndex(24.5,this.btnAdd);
        this.setButtonAlpha(this.btnAdd,this.qSwitch.add);
        this.btnSub = new FlatButton({scene:this,key:'button1',text:"-",event:'press_sub', textConfig:{color:'black',fontSize:60}});
        this.btnSub.scale=0.8;
        this.alignGrid.placeAtIndex(29.5,this.btnSub);
        this.setButtonAlpha(this.btnSub,this.qSwitch.sub);
        this.btnMult = new FlatButton({scene:this,key:'button1',text:"x",event:'press_mult', textConfig:{color:'black',fontSize:60}});
        this.btnMult.scale=0.8;
        this.alignGrid.placeAtIndex(35.5,this.btnMult);
        this.setButtonAlpha(this.btnMult,this.qSwitch.mult);
        this.btnDiv = new FlatButton({scene:this,key:'button1',text:"÷",event:'press_div', textConfig:{color:'black',fontSize:60}});
        this.btnDiv.scale=0.8;
        this.alignGrid.placeAtIndex(40.5,this.btnDiv);
        this.setButtonAlpha(this.btnDiv,this.qSwitch.div);

        let nScale = 0.6;
        this.btn1 = new FlatButton({scene:this,key:"toggleBack",text:"1",event:'press_1', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(46,this.btn1);
        this.btn1.scale=nScale;
        
        this.btn2 = new FlatButton({scene:this,key:"toggleBack",text:"2",event:'press_2', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(49,this.btn2);
        this.btn2.scale=nScale;

        this.btn3 = new FlatButton({scene:this,key:"toggleBack",text:"3",event:'press_3', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(52,this.btn3);
        this.btn3.scale=nScale;

        this.btn4 = new FlatButton({scene:this,key:"toggleBack",text:"4",event:'press_4', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(57,this.btn4);
        this.btn4.scale=nScale;

        this.btn5 = new FlatButton({scene:this,key:"toggleBack",text:"5",event:'press_5', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(60,this.btn5);
        this.btn5.scale=nScale;

        this.btn6 = new FlatButton({scene:this,key:"toggleBack",text:"6",event:'press_6', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(63,this.btn6);
        this.btn6.scale=nScale;

        this.btn7 = new FlatButton({scene:this,key:"toggleBack",text:"7",event:'press_7', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(68,this.btn7);
        this.btn7.scale=nScale;

        this.btn8 = new FlatButton({scene:this,key:"toggleBack",text:"8",event:'press_8', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(71,this.btn8);
        this.btn8.scale=nScale;

        this.btn9 = new FlatButton({scene:this,key:"toggleBack",text:"9",event:'press_9', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(74,this.btn9);
        this.btn9.scale=nScale;

        this.btn10 = new FlatButton({scene:this,key:"toggleBack",text:"10",event:'press_10', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(79,this.btn10);
        this.btn10.scale=nScale;

        this.btn11 = new FlatButton({scene:this,key:"toggleBack",text:"11",event:'press_11', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(82,this.btn11);
        this.btn11.scale=nScale;

        this.btn12 = new FlatButton({scene:this,key:"toggleBack",text:"12",event:'press_12', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(85,this.btn12);
        this.btn12.scale=nScale;
        var nButtons = [this.btn1,this.btn2,this.btn3,this.btn4,this.btn5,this.btn6,this.btn7,this.btn8,this.btn9,this.btn10,this.btn11,this.btn12];
        for(let i=0;i<nButtons.length;i++){
            this.setButtonAlpha(nButtons[i],this.qset[i]);
        }
        this.btnLow = new FlatButton({scene:this,key:"button4",text:model.userSettings.start,event:'press_low', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(92,this.btnLow);
        this.btnLow.scale=nScale;
        this.btnHigh = new FlatButton({scene:this,key:"button4",text:model.userSettings.end,event:'press_high', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(94,this.btnHigh);
        this.btnHigh.scale=nScale;
        this.btnReset = new FlatButton({scene:this,key:"button4",text:"↶",event:'press_reset', textConfig:{color:'black',fontSize:60}});
        this.alignGrid.placeAtIndex(107,this.btnReset);
        this.btnReset.scale=nScale;
        // emitters
        emitter.on("press_add", this.switchAdd, this);
        emitter.on("press_sub", this.switchSub, this);
        emitter.on("press_mult", this.switchMult, this);
        emitter.on("press_div", this.switchDiv, this);

        emitter.on("press_low", this.low, this);
        emitter.on("press_high", this.high, this);
        emitter.on("press_reset", this.reset, this);

        emitter.on("press_1",this.p1, this);
        emitter.on("press_2",this.p2, this);
        emitter.on("press_3",this.p3, this);
        emitter.on("press_4",this.p4, this);
        emitter.on("press_5",this.p5, this);
        emitter.on("press_6",this.p6, this);
        emitter.on("press_7",this.p7, this);
        emitter.on("press_8",this.p8, this);
        emitter.on("press_9",this.p9, this);
        emitter.on("press_10",this.p10, this);
        emitter.on("press_11",this.p11, this);
        emitter.on("press_12",this.p12, this);
    }
    setButtonAlpha(button,bool){
        // console.log("setButtonAlpha "+"button: "+button.text1.text);
        if(bool){
            button.back.alpha =1;
        }else{
            button.back.alpha=0.3;
        }
    }
    startGame(){
        emitter.off("start_game");
        emitter.off("push_back");
        this.turnOffEmitters();
        model.userSettings = {switch:this.qSwitch, set:this.qset, start:this.btnLow.text1.text,end:this.btnHigh.text1.text};
        this.scene.start('SceneOver');
    }
    goBack(){
        emitter.off("start_game");
        emitter.off("push_back");
        this.turnOffEmitters();
        this.scene.start('SceneOver');
    }
    reset(){
        emitter.off("start_game");
        emitter.off("push_back");
        this.turnOffEmitters();
        model.userSettings= {switch : {add:true,sub:true,mult:true,div:true}
        ,set: [true,true,true,true,true,true,true,true,true,true,true,true], start:"0",end:12};
        this.scene.start('SceneSettings');
    }
    turnOffEmitters(){
        emitter.off("press_add");
        emitter.off("press_sub");
        emitter.off("press_mult");
        emitter.off("press_div");

        emitter.off("press_low");
        emitter.off("press_high");
        emitter.off("press_reset");

        emitter.off("press_1");
        emitter.off("press_2");
        emitter.off("press_3");
        emitter.off("press_4");
        emitter.off("press_5");
        emitter.off("press_6");
        emitter.off("press_7");
        emitter.off("press_8");
        emitter.off("press_9");
        emitter.off("press_10");
        emitter.off("press_11");
        emitter.off("press_12");
    }
    low(){
        let n = parseInt(this.btnLow.text1.text);
        if(n<25){
            if(n<parseInt(this.btnHigh.text1.text)){
            this.btnLow.text1.setText(n+1);
        }else{this.btnLow.text1.setText(this.btnHigh.text1.text);}
        }else{
            this.btnLow.text1.setText(0);
        }
    }
    high(){
        let n = parseInt(this.btnHigh.text1.text);
        if(n<25){
            this.btnHigh.text1.setText(n+1);
        }else{
            this.btnHigh.text1.setText(this.btnLow.text1.text);
        }
    }
    switchAdd(){
        this.qSwitch.add = !this.qSwitch.add;
        this.setButtonAlpha(this.btnAdd, this.qSwitch.add);
    }
    switchSub(){
        this.qSwitch.sub = !this.qSwitch.sub;
        this.setButtonAlpha(this.btnSub, this.qSwitch.sub);
    }
    switchMult(){
        this.qSwitch.mult = !this.qSwitch.mult;
        this.setButtonAlpha(this.btnMult, this.qSwitch.mult);
    }
    switchDiv(){
        this.qSwitch.div = !this.qSwitch.div;
        this.setButtonAlpha(this.btnDiv, this.qSwitch.div);
    }
    pressNum(n, button){
            this.qset[n-1] = !this.qset[n-1];
            this.setButtonAlpha(button, this.qset[n-1]);
    }
    p1(){
        this.pressNum(1,this.btn1);
    }
    p2(){
        this.pressNum(2,this.btn2);
    }
    p3(){
        this.pressNum(3,this.btn3);
    }
    p4(){
        this.pressNum(4,this.btn4);
    }
    p5(){
        this.pressNum(5,this.btn5);
    }
    p6(){
        this.pressNum(6,this.btn6);
    }
    p7(){
        this.pressNum(7,this.btn7);
    }
    p8(){
        this.pressNum(8,this.btn8);
    }
    p9(){
        this.pressNum(9,this.btn9);
    }
    p10(){
        this.pressNum(10,this.btn10);
    }
    p11(){
        this.pressNum(11,this.btn11);
    }
    p12(){
        this.pressNum(12,this.btn12);
    }
    
    
    update() {
    }
}