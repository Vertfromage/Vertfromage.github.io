class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    init(data)
{
    // Questions from level map
    this.data = data;
    if (this.data.qSwitch&&this.data.qSet) {
        var qSwitch = this.data.qSwitch;
        var qset = this.data.qSet;
    } else {
        console.log("no data");
        var qSwitch = model.userSettings.switch;
        var qset = model.userSettings.set;
    }
    
    this.questions = this.makeQuestions(qSwitch, qset);
    // Reset this to turn on debug.
    // this.questions = false;

};

    preload() {

    }
    create() {
        console.log("SceneMain");
        // Define our objects.
        model.gameOver = false;
        // **TODO pass in questions in config]
        
        this.dungeon = new MathDungeon({ scene: this, questions: this.questions });
        var mediaManager = new MediaManager({ scene: this });
        var sb = new SoundButtons({ scene: this });

        var btnBack = new FlatButton({ scene: this, key: 'toggleBack', text: "↫", event: 'push_back', textConfig: { color: 'black', fontSize: 90 } });
        btnBack.scale = .52;
        btnBack.x = game.config.width * .9;
        btnBack.y = game.config.height * .055;
        emitter.on('push_back', this.goBack, this);
    }
    update() {
        // Constant running loop.
        this.dungeon.update();
    }
    goBack() {
        model.gameOver = true;
        emitter.off("push_back");
        this.scene.start('SceneLevelMap');
    }
    makeQuestions(qSwitch, qset) {
        let set = [];
        // converts boolean to numbers
        for (let i = 0; i < qset.length; i++) {
            if (qset[i]) {
                set.push(i + 1);
            }
        }
        let questions;
        // Adjustable from settings
        let start = parseInt(model.userSettings.start);
        let end = parseInt(model.userSettings.end);
        if (qSwitch.add && qSwitch.sub && qSwitch.mult && qSwitch.div) {
            questions = MathQuestions.combo(set, 3, [], start, end);
        } else if (qSwitch.add && qSwitch.sub) {
            questions = MathQuestions.combo(set, 1, [], start, end);
        } else if (qSwitch.mult && qSwitch.div) {
            questions = MathQuestions.combo(set, 2, [], start, end);
        } else if (qSwitch.add && qSwitch.mult) {
            questions = MathQuestions.add(set, [], start, end);
            questions = MathQuestions.multiply(set, questions, start, end);
        } else if (qSwitch.add && qSwitch.div) {
            questions = MathQuestions.add(set, [], start, end);
            questions = MathQuestions.divide(set, questions, start, end);
        } else if (qSwitch.sub && qSwitch.mult) {
            questions = MathQuestions.subtract(set, [], start, end);
            questions = MathQuestions.multiply(set, questions, start, end);
        } else if (qSwitch.sub && qSwitch.div) {
            questions = MathQuestions.subtract(set, [], start, end);
            questions = MathQuestions.divide(set, questions, start, end);
        } else if (qSwitch.add) {
            questions = MathQuestions.add(set, [], start, end);
        } else if (qSwitch.sub) {
            questions = MathQuestions.subtract(set, [], start, end);
        } else if (qSwitch.mult) {
            questions = MathQuestions.multiply(set, [], start, end);
        } else if (qSwitch.div) {
            questions = MathQuestions.divide(set, [], start, end);
        }

        return questions;
    }
    gameOver() {
        model.gameOver = true;
        emitter.off("push_back");
        this.scene.start('SceneLevelMap');
    }
}