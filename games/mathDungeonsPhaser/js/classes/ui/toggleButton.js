class ToggleButton extends Phaser.GameObjects.Container{
    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        this.back = this.scene.add.image(0,0,config.backKey);
        this.offIcon = this.scene.add.image(0,0,config.offIcon);
        this.onIcon = this.scene.add.image(0,0,config.onIcon);

        Align.scaleToGameW(this.back,.1);
        Align.scaleToGameW(this.onIcon,.05);
        Align.scaleToGameW(this.offIcon,.05);

        this.add(this.back);
        this.add(this.offIcon);
        this.add(this.onIcon);

        if(!config.value){
            config.value=true;
        }
        if(config.event){
            this.event = config.event;
        }
        this.value=config.value;
        
        this.setIcons();

        this.back.setInteractive();
        this.back.on('pointerdown',this.toggle,this);

        if(config.x){
            this.x=config.x;
        }
        if(config.y){
            this.y=config.y;
        }
        // phaser container doesn't have height or width unless you set one.
        this.setSize(this.back.displayWidth,this.back.displayHeight);
        // Makes it visible
        this.scene.add.existing(this); 
        if(model.isMobile==-1){
            this.back.on("pointerover", this.over,this);
            this.back.on("pointerout",this.out,this);
        }
    }
    over(){
        this.y-=5;
    }
    out(){
        this.y+=5;
    }

    toggle(){
        this.value=!this.value;
        this.setIcons();
        if(this.event){
            emitter.emit(this.event, this.value);
        }
    }
    setIcons(){
        this.onIcon.visible=this.value;
        this.offIcon.visible=!this.value;
    }
}