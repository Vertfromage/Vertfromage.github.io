class SceneLevelMap extends Phaser.Scene {
    constructor() {
        super('SceneLevelMap');
    }
    init(data) {
        // Questions from level map
        this.data = data;
        if (this.data.qSwitch) {
            this.mapSwitch = this.data.qSwitch;
        } else {
            console.log("no data");
            this.mapSwitch = { add: true, sub: false, mult: false, div: false };
        }
    };

    preload() {
        // ToDo - Need to change alpha to .5 if settings are off for option.
    }
    create() {
        console.log("SceneLevelMap");
        this.alignGrid = new AlignGrid({ rows: 12, cols: 6, scene: this });

        this.back = this.add.image(game.config.width / 2, game.config.height / 2, "mapBack");
        Align.scaleToGameW(this.back, 1.1);

        var mediaManager = new MediaManager({ scene: this });
        var sb = new SoundButtons({ scene: this });

        var btnBack = new FlatButton({ scene: this, key: 'toggleBack', text: "↫", event: 'push_back', textConfig: { color: 'black', fontSize: 90 } });
        btnBack.scale = .52;
        btnBack.x = game.config.width * .9;
        btnBack.y = game.config.height * .055;
        emitter.on('push_back', this.goBack, this);
        var score = new MoneyBag({scene:this});
        var btnAvatar = new FlatButton({scene:this,key:model.avatar,text:"",event:'start_avatar',textConfig:{color:'black',fontSize:45}});
        this.alignGrid.placeAtIndex(1.5,btnAvatar);
        btnAvatar.y = game.config.height * .055;
        btnAvatar.scale = .12;
        emitter.on('start_avatar', this.startAvatar, this);
        
        this.uSet = model.userSettings;
        this.drawMap();
        this.lockLevel();

        
        //this.alignGrid.showNumbers();

    }
    goBack() {
        this.emittersOff();
        this.scene.start('SceneChooseMission');
    }
    startAvatar(){
        this.emittersOff();
        this.scene.start('SceneChooseAvatar');
    }

    drawMap() {
        this.skullCastle = this.add.image(0, 0, "skull");
        this.skullCastle.setInteractive();
        this.skullCastle.on('pointerup', this.touchSkull, this);
        Align.scaleToGameW(this.skullCastle, .3);
        this.alignGrid.placeAtIndex(8.5, this.skullCastle);
        this.skullCastle.y+=50;
        this.littleCastles = [];
        this.castles = this.add.group();
        let num = [10, 12, 11, 7, 9, 8, 4, 6, 5, 1, 3, 2];
        for (let i = 0; i < 12; i++) {
            this.littleCastles[i] = this.add.image(0, 0, "little");
            Align.scaleToGameW(this.littleCastles[i], .3);
            this.alignGrid.placeAtIndex(i * 4 + 18.5, this.littleCastles[i]);
            this.add.text(this.littleCastles[i].x - 12, this.littleCastles[i].y, num[i], {
                font: "40px Arial",
                align: "center",
                color: "white"
            });
            this.littleCastles[i].index = num[i];
            this.castles.add(this.littleCastles[i]);
        }
        this.input.setHitArea(this.castles.getChildren()).on('gameobjectdown', function (pointer, gameObject) {
            if (gameObject.index) {
                this.scene.touchLittle(gameObject.index);
                return true;
            } else {
                return false;
            }
        });
    }
    lockLevel() {
        this.littleCastles.forEach(castle => {
            if (!this.uSet.set[castle.index - 1]) {
                castle.alpha = .3;
            }
        });
    }
    touchSkull() {
        // This is the hardest level mixes everything from the settings.
        // console.log("Touch Skull");
        this.emittersOff();
        this.scene.start('SceneMain', { qSet: model.userSettings.set, qSwitch: this.mapSwitch });
    }
    touchLittle(index) {
        if (!this.uSet.set[index - 1]) {
            return;
        }
        // console.log("Touch little");
        this.emittersOff();
        let set = [false, false, false, false, false, false, false, false, false, false, false, false];
        set[index - 1] = true;
        this.scene.start('SceneMain', { qSet: set, qSwitch: this.mapSwitch });
    }

    emittersOff() {
        emitter.off("push_back");
        emitter.off('start_avatar')
    }
}