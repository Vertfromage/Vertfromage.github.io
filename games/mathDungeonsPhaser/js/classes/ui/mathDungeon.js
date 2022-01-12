class MathDungeon extends Phaser.GameObjects.Container {
    // ToDo: Add hint setting in settings so it can be turned
    // on/off.
    constructor(config) {
        super(config.scene);
        // console.log("MathDungeon Constructor");
        this.scene = config.scene;
        this.gameOptions = {
            // slices (prizes) placed in the wheel
            slices: 20,
            sliceW: 40,
            // prize names, starting from 12 o'clock going clockwise
            slicePrizes: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            testQuestions: [{ q: "6 X 2", a: "12" }],
            // wheel rotation duration, in milliseconds
            rotationTime: 500,
            tweenSpeed: 400,
            monsterSpeed: 12000,
            monsterScale: .2,
            repeat: 1,
            topButtonH: game.config.height * .055,
            resultText: ["", "✔", "✘", "⌛"],
            hintsOn: model.hintsOn && model.difficulty == 1,
            knifeScale: .35
        }
        
        switch (model.difficulty) {
            case 1: break;
            case 2: this.gameOptions.monsterSpeed = 8000;
                break;
            case 3: this.gameOptions.monsterSpeed = 6000;
        }

        //**TODO */
        if (config.sword) {
            this.sword = config.sword;
        }
        if (config.questions) {
            this.questions = config.questions;
        } else {
            this.questions = this.gameOptions.testQuestions;
        }
        if (config.repeat) {
            for (let i = 0; i < questions.length; i++) {
                this.questions[i].r = config.repeat;
            }
        } else {
            for (let i = 0; i < this.questions.length; i++) {
                this.questions[i].r = this.gameOptions.repeat;
            }
        }

        this.answers = {right:0,wrong:0};


        this.back = this.scene.add.image(game.config.width / 2, game.config.height / 2, "hallway");
        this.add(this.back);
        Align.scaleToGameW(this.back, 1);



        // Add monsters
        this.monster = this.scene.add.sprite(game.config.width / 2, game.config.height * .2, "troll");
        this.add(this.monster);
        this.monster.scale = this.gameOptions.monsterScale;

        this.monsterAnimation = this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('troll'),
            frameRate: 15,
            repeat: -1
        });
        this.monsterAnimation.pause();

        this.knife = this.scene.add.sprite(game.config.width / 2, game.config.height, "knife");
        this.add(this.knife);
        this.knife.scale = this.gameOptions.knifeScale;

        // hints
        if (this.gameOptions.hintsOn) {
            this.thoughtBubble = this.scene.add.image(game.config.width * .2, game.config.height / 3, "hint");
            this.add(this.thoughtBubble);
            this.hintText = this.scene.add.text(game.config.width * .15, game.config.height * .27, "hint", {
                font: "bold 40px Arial",
                align: "center",
                color: "black"
            });
            this.add(this.hintText);
            this.hintText.alpha = 0;
            this.thoughtBubble.alpha = 0;
        }
        // score
        let scoreX = .52
        this.scoreback = this.scene.add.image(game.config.width *(scoreX+.15), this.gameOptions.topButtonH,"button6");
        this.moneybag = this.scene.add.image(game.config.width *scoreX, this.gameOptions.topButtonH,"moneybag");
        this.moneybag.angle = 10;
        this.add(this.scoreback);
        this.add(this.moneybag);
        Align.scaleToGameW(this.scoreback, .3);
        Align.scaleToGameW(this.moneybag, .13);
        this.score = this.scene.add.text(game.config.width*(scoreX+.18), this.gameOptions.topButtonH, model.score, {
            font: "bold 35px Arial",
            align: "center",
            color: "white"
        });
        this.add(this.score);
        this.score.setOrigin(0.5);
        // text 
        this.numInput = "";
        this.textQ = this.scene.add.text(game.config.width / 2, game.config.height * .40, "", {
            font: "bold 40px Arial",
            align: "center",
            color: "white"
        });
        this.textA = this.scene.add.text(game.config.width / 2, game.config.height * .47, "", {
            font: "bold 40px Arial",
            align: "center",
            color: "white"
        });


        this.add(this.textA);
        this.add(this.textQ);
        this.textA.setOrigin(0.5);
        this.textQ.setOrigin(0.5);
        // where we are on wheel
        this.spot = 0;
        // current question answer from this.questions
        this.currentA = "";
        // Already answered can't change text
        this.answered = false;
        // Last number touched
        this.lastTouch;

        // adding the wheel in the middle of the canvas
        this.wheel = this.scene.add.sprite(game.config.width / 2, game.config.height, "wheel");
        this.add(this.wheel);
        Align.scaleToGameW(this.wheel, .95);

        // arrows when you've turned as far as you can.
        this.arrows = this.scene.add.sprite(game.config.width * .09, game.config.height * .85, "arrows");
        Align.scaleToGameW(this.arrows, .25);
        this.add(this.arrows);
        this.arrows.alpha = 0;

        // **TODO** have to attach image of throwing knife to wheel so different knives and shields can be used.
        // the game has just started = we can spin the wheel
        this.canSpin = true;
        this.newMonster = true;


        // Listening for movement on the wheel
        this.wheel.setInteractive();
        this.wheel.on('pointerup', this.handleSwipe, this);
        this.scene.input.on("pointerdown", this.numberTouched, this);
        this.scene.input.keyboard.on("keyup", this.handleKey, this);

        this.scene.add.existing(this);

        if (this.questions.length > 0) {
            this.go();
        } else {
            console.log("No questions!")
            this.goGameOver();
        }
    }
    go() {
        if (this.newMonster == true) {
            this.newMonster = false;
            let i = Math.floor(Math.random() * this.questions.length);
            while (this.questions[i].r < 1) {
                this.questions.splice(i, 1);
                if (this.questions.length <= 1) {
                    if (this.questions.length == 1) {
                        i = 0;
                    } else {
                        model.gameOver = true;
                        this.results();
                        return;
                    }
                } else {
                    i = Math.floor(Math.random() * this.questions.length);
                }
            }
            this.textQ.setText(this.questions[i].q);
            this.currentA = this.questions[i].a;
            this.questions[i].r--;

            this.textA.setText("?");
            this.numInput = "";

            this.growAndMove(this.monster);
        }
    }
    goGameOver() {
        emitter.off('done');
        this.scene.gameOver();
        return;
    }

    results(){
        this.monster.alpha=0;
        this.wheel.alpha=0;
        this.knife.alpha=0;
        let stars = Math.floor((this.answers.right/(this.answers.right+this.answers.wrong))*5);
        // text with results
        this.textQ.setText("✰".repeat(stars));
        this.textA.setText(this.answers.right+this.gameOptions.resultText[1]+" "+this.answers.wrong+this.gameOptions.resultText[2]);
        // Character suceeds
        this.avatar = this.scene.add.sprite(game.config.width / 2, game.config.height *.28, model.avatar);
        this.add(this.avatar);
        Align.scaleToGameW(this.avatar, .25);
        
        let key = model.avatar;
        this.scene.anims.create({
            key: key,
            frames: [ { key: key, frame: 0 },{ key: key, frame: 0 }, { key: key, frame: 0 },{ key: key, frame: 0 },{ key: key, frame: 1 },{ key: key, frame: 1 },{ key: key, frame: 1 },{ key: key, frame: 1 },{ key: key, frame: 2 },{ key: key, frame: 2 }],
            frameRate: 6,
            repeat: -1
        });
        this.avatar.play(key);

        this.btnDone = new FlatButton({x:game.config.width / 2,y:game.config.height *.6,scene:this.scene,key:'button4',text:"↫",event:'done',textConfig:{color:'black',fontSize:45}});

        emitter.on('done', this.goGameOver, this);     
    }
    growAndMove(monster) {
        this.monster.play('walk');
        this.monsterAnimation.resume();
        this.monsterTween = this.scene.tweens.add({
            targets: [monster],
            y: game.config.height * .75,
            scale: this.gameOptions.monsterScale * 8,
            duration: this.gameOptions.monsterSpeed,
            callbackScope: this,
            onComplete: this.tooSlow
        });
        this.answered = false;
    }
    tooSlow() {
        // console.log("Too Slow Bro!");
        // TODO Attack animation
        if (!this.answered) {
            this.hideHints();
            this.answered = true;
            this.monsterTween.stop();
            this.monsterAnimation.pause();
            this.monster.setFrame(0);
            this.textA.setText(this.gameOptions.resultText[3]);
            this.textQ.setText(this.textQ.text + " = " + this.currentA);
            this.tintScreen();
            emitter.emit(G.PLAY_SOUND, "boom");
            this.scene.time.addEvent({ delay: 1000, callback: this.resetMonster, callbackScope: this, loop: false })
        }
    }
    resetMonster() {
        this.clearTint();
        this.monster.y = game.config.height * .2;
        this.monster.scale = this.gameOptions.monsterScale;
        this.monster.alpha = 1;
        this.newMonster = true;
        this.go();
    }
    clearTint() {
        this.back.clearTint();
        // this.monster.clearTint();
    }
    resetKnife() {
        this.knife.setFrame(0);
        this.knife.scale = this.gameOptions.knifeScale;
        this.knife.alpha = 1;
        this.knife.x = game.config.width / 2;
        this.knife.y = game.config.height;
    }
    update() {
        this.checkAnswer();
        if (this.gameOptions.hintsOn) {
            if ((this.monster.y > game.config.height * .60) && !this.answered) {
                this.hintText.setText(this.currentA);
                this.hintText.alpha = 1;
                this.thoughtBubble.alpha = 1;
            }
        }

    }
    hideHints() {
        if (this.gameOptions.hintsOn) {
            this.hintText.alpha = 0;
            this.thoughtBubble.alpha = 0;
        }
    }
    checkAnswer() {
        if (!this.answered) {
            if (this.numInput.length < this.currentA.length) {
                if (this.numInput.length > 0) {
                    for (let i = 0; i < this.numInput.length; i++) {
                        if (this.numInput[i] !== this.currentA[i]) {
                            this.wrong();
                            this.hideHints();
                        }
                    }
                }
                return;
            } if (this.numInput.length > this.currentA.length) {
                this.wrong();
                this.hideHints();
                return;
            } else {
                if (this.numInput == this.currentA) {
                    this.right();
                } else {
                    this.wrong();
                }
                this.hideHints();
            }
        }
    }
    coinResult(correct) {
        if (correct) {
            emitter.emit(G.UP_POINTS, 3);
            this.score.setText(model.score);
            this.scene.tweens.add({
                targets: [this.moneybag],
                scale: .6,
                angle: 20,
                duration: this.gameOptions.tweenSpeed,
                yoyo: true
            });
        } else {
            emitter.emit(G.UP_POINTS, -2);
            this.score.setText(model.score);
            this.scene.tweens.add({
                targets: [this.moneybag],
                scale: .3,
                angle: -20,
                duration: this.gameOptions.tweenSpeed,
                yoyo: true
            });
        }
    }

    wrong() {
        if (!this.answered) {
            this.answered = true;
            this.answers.wrong++;
            this.textA.setText(this.textA.text+" "+this.gameOptions.resultText[2]);
            this.textQ.setText(this.textQ.text + " = " + this.currentA);
            this.throwKnife(this.lastTouch, false);
        }
    }
    right() {
        if (!this.answered) {
            this.answered = true;
            this.answers.right++;
            this.textA.setText(this.textA.text+" "+ this.gameOptions.resultText[1]);
            this.textQ.setText(this.textQ.text + " = " + this.currentA);
            this.throwKnife(this.lastTouch, true);
        }
    }
    throwKnife(touch, hit) {
        if (this.lastTouch) {
            this.knife.x = touch.x;
            this.knife.y = touch.y;
        }
        if (hit) {
            this.scene.tweens.add({
                targets: [this.knife],
                x: this.monster.x + 10,
                y: this.monster.y + 40,
                scale: this.monster.scale * this.gameOptions.knifeScale,
                angle: 180,
                duration: this.gameOptions.tweenSpeed * 2,
                callbackScope: this,
                onComplete: this.killMonster
            });

        } else {
            // missed
            this.scene.tweens.add({
                targets: [this.knife],
                x: 0,
                y: game.config.height * .2,
                angle: 180,
                duration: this.gameOptions.tweenSpeed * 2,
                callbackScope: this,
                onComplete: this.monsterAttacks
            });
        }
    }
    monsterAttacks() {
        emitter.emit(G.PLAY_SOUND, "boom");
        this.monsterTween.stop();
        this.hideHints();
        this.resetKnife();
        this.tintScreen();
        this.scene.tweens.add({
            targets: [this.monster],
            y: game.config.height * .75,
            scale: this.gameOptions.monsterScale * 8,
            duration: this.gameOptions.tweenSpeed * 5,
            callbackScope: this
        });
        this.monsterAnimation.pause();
        this.monster.setFrame(0);
        this.scene.time.addEvent({ delay: 2500, callback: this.resetMonster, callbackScope: this, loop: false })
        this.coinResult(false);

    }
    tintScreen() {
        this.back.setTint(0x660000);
        //this.monster.setTint(0xff0000);
    }
    killMonster() {
        emitter.emit(G.PLAY_SOUND, "splat");
        //emitter.emit(G.PLAY_SOUND, "stab");
        //emitter.emit(G.PLAY_SOUND, "laser");
        //More realistic sounds are less fun... test this conclusion.
        this.monsterTween.stop();
        this.monsterAnimation.pause();
        this.monster.setFrame(0);
        this.knife.setFrame(1);
        // TODO Death animation
        this.scene.tweens.add({
            targets: [this.monster, this.knife],
            alpha: 0,
            duration: this.gameOptions.tweenSpeed * 5,
            callbackScope: this,
            onComplete: this.resetKnife
        });
        this.scene.time.addEvent({ delay: 2500, callback: this.resetMonster, callbackScope: this, loop: false });
        this.coinResult(true);
    }
    spinWheel(turns) {
        // can we spin the wheel?
        if (this.canSpin) {
            // Stops it from rotating too far and getting a quick spin animation.
            if (Math.abs(this.spot + (360 / this.gameOptions.slices) * turns) >= 180) {
                this.setArrows();
                //**TODO** sound to show that you can't spin any further */
                return;
            } else {
                this.arrows.alpha = 0;
            }
            // calculates the actual spot to travel to and keeps track of current location
            this.spot = this.spot + (360 / this.gameOptions.slices) * turns;
            //Makes code more readable
            var degrees = this.spot;
            var prize;
            // Number spot calculated adjusted for negative rotation.
            if (this.spot < 0) {
                prize = this.gameOptions.slices - 1 - Math.floor((360 + degrees) / (360 / this.gameOptions.slices));
            }
            else {
                prize = this.gameOptions.slices - 1 - Math.floor(degrees / (360 / this.gameOptions.slices));
            }
            // now the wheel cannot spin because it's already spinning
            this.canSpin = false;

            // animation tweeen for the spin
            // the quadratic easing will simulate friction
            this.scene.tweens.add({
                // adding the wheel to tween targets
                targets: [this.wheel],
                // angle destination
                angle: degrees,
                // tween duration
                duration: this.gameOptions.rotationTime,
                // tween easing
                ease: "Cubic.easeOut",
                // callback scope
                callbackScope: this,
                // function to be executed once the tween has been completed
                onComplete: function (tween) {
                    // player can spin again
                    this.canSpin = true;
                }
            });
        }
    }
    whichSlice(x, y) {
        if (model.gameOver == true) {
            return;
        }
        /**Logic - taking into account
        rotation and coordinates in game pixel of slices
        calculate number and which slice location we're talking about.**/
        let spotsMoved = this.spot / 18;
        // visible slices from left 0-9 index range+35
        var info =
            [{ x: 70, y: 800, origin: 15 },
            { x: 90, y: 760, origin: 16 },
            { x: 120, y: 720, origin: 17 },
            { x: 160, y: 690, origin: 18 },
            { x: 200, y: 670, origin: 19 },
            { x: 250, y: 680, origin: 0 },
            { x: 290, y: 700, origin: 1 },
            { x: 330, y: 720, origin: 2 },
            { x: 350, y: 750, origin: 3 },
            { x: 360, y: 800, origin: 4 }];
        var origin;
        //Checking inside square areas recorded in object array
        for (let i = 0; i < info.length; i++) {
            if (x >= info[i].x && x < (info[i].x + this.gameOptions.sliceW)
                && y > info[i].y && y < (info[i].y + this.gameOptions.sliceW)) {
                origin = info[i].origin;
            }
        }

        // Math to find index of number
        var ans = origin - spotsMoved;
        if (Math.abs(ans) > 19) {
            ans = ans - 20;
        }
        if (ans < 0) {
            ans = ans + 20;
        }
        return ans;

    }
    setArrows() {
        let pulse = 40;
        if (this.spot < 0) {
            this.arrows.setFrame(0);
            this.arrows.x = game.config.width * .09;
            this.arrows.angle = -50;
            pulse *= -1;
        } else {
            this.arrows.setFrame(1);
            this.arrows.x = game.config.width * .91;
            this.arrows.angle = 50;
        }

        this.arrows.alpha = 0;

        this.scene.tweens.add({
            targets: [this.arrows],
            alpha: 1,
            angle: pulse,
            duration: this.gameOptions.tweenSpeed,
            repeat: 1,
            yoyo: true
        });

    }


    numberTouched(e) {
        if (model.gameOver == true) {
            return;
        }
        if (!this.answered) {
            var slice = this.whichSlice(e.worldX, e.worldY);
            if (!isNaN(slice)) {
                this.lastTouch = { x: e.worldX, y: e.worldY };
                this.numInput += this.gameOptions.slicePrizes[slice];
                this.textA.setText(this.numInput);
            }
        }
    }
    handleKey(e) {
        if (model.gameOver == true) {
            return;
        }
        if (this.answered) {
            return;
        }
        let num;
        switch (e.code) {
            case "Numpad0":
            case "Digit0": num = 0;
                break;
            case "Numpad1":
            case "Digit1": num = 1;
                break;
            case "Numpad2":
            case "Digit2": num = 2;
                break;
            case "Numpad3":
            case "Digit3": num = 3;
                break;
            case "Numpad4":
            case "Digit4": num = 4;
                break;
            case "Numpad5":
            case "Digit5": num = 5;
                break;
            case "Numpad6":
            case "Digit6": num = 6;
                break;
            case "Numpad7":
            case "Digit7": num = 7;
                break;
            case "Numpad8":
            case "Digit8": num = 8;
                break;
            case "Numpad9":
            case "Digit9": num = 9;
                break;
        }
        if (!isNaN(num)) {
            this.numInput += num;
            this.textA.setText(this.numInput);
        }
        //**TODO Set up functionality to turn wheel when using keyboard */
    }
    handleSwipe(e) {
        if (model.gameOver == true) {
            return;
        }
        var swipeInfo = HandleSwipe.CheckSwipe(e);
        let swipe = Math.abs(swipeInfo.point.x);
        let speed = 1;
        let direction = (swipeInfo.point.x > 0) ? 1 : -1;
        if (swipe > 30) {
            if (swipe > 120) {
                speed = 4;
            } else if (swipe > 90) {
                speed = 3;
            } else if (swipe > 60) {
                speed = 2;
            }
            this.spinWheel(direction * speed);
        }
    }
}
