class SoundButtons{
    constructor(config){

        // talk about not allowing a container inside a container, if this happens:
        // don't extend phaser.gameobjects.container and remove the super
        this.scene=config.scene;

        this.musicButton = new ToggleButton({scene:config.scene,backKey:"toggleBack",onIcon:"musicOn",offIcon:"musicOff",event:G.TOGGLE_MUSIC});
        this.sfxButton = new ToggleButton({scene:config.scene,backKey:"toggleBack",onIcon:"sfxOn",offIcon:"sfxOff",event:G.TOGGLE_SOUND});
        
        this.musicButton.y= this.musicButton.height;
        this.musicButton.x=this.musicButton.width*.75;

        this.sfxButton.x= this.musicButton.x+this.sfxButton.width*1.25;
        this.sfxButton.y= this.musicButton.y;

        if(model.musicOn==false){
            this.musicButton.toggle();
        }
        if(model.soundOn==false){
            this.sfxButton.toggle();
        }
    
    }
}