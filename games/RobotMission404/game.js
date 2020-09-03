// initialize 2D canvas (c)
// initialize game state (s)
// initialize keys states (u,r,d,l for directions, k for all the keyboard)
c = a.getContext`2d`, k = [u = r = d = l = s = 0]
// (initialize your global variables here)
c.w = innerWidth;
c.h = innerHeight;
// update u,l,d,r globals when an arrow key/wasd/zqsd is pressed or released
// update k[keyCode] if any other key is pressed/released
onkeydown = onkeyup = e => k[e.which] = self['lld*rlurdu'[e.which % 32 % 17]] = e.type[5]

// Keep track of gameOver for restart
var tool,
    tS,
    loot = 0,
    nLoot = 0,
    nDead = 0,
    levelCols = 32,// level width, in tiles
    levelRows = 16,// level height, in tiles
    tileSize = innerWidth / levelCols,
    pCol = 2, // player starting column
    pRow = 12, // player starting row
    ct2 = 0,
    pS = 5,
    pL = c.width / levelCols,
    gameOver = false,
    testing = false,
    lorR = -1,
    p = makeSprite(c, 420, 70, "robot.png", 6, 30, c.w/7, c.h/3, 1.2, pS),
    key = makeSprite(c, 6, 6, "key.png", 1, 0, 0, 0, 6, 0),
    toX, toY = 0,
    onOff = -1, numnpcs = 5,
    npcs = [],
    bd = [];
for (let i = 0; i < numnpcs; i += 1) {
    spawnnpc();
    if (i > 2) {
        spawnb();
    } else {
        spawnb();
    }
    bd[i].seq = [0];
}


// Adventure text
var story,
    choose,
    speak = ["This is a ", "Ahh! You're a ", "You have a ", "You're here to ", ""],
    choices = [["Peaceful Town", "Alien", "Warp Tunnel", "Destroy all life!", "Ahhh! What are you?!"], ["Mob's Hideout", "Robo Cop", "Laser Gun", "Fight the Mob!", "Can I pay you off?"], ["Government Facility", "Escaped Experiment", "Self Destruct", "Destroy the Evidence.", "I'm going to be in so much trouble!"], ["Delightful Bakery", "Bad Trip", "Cool Jet Pack", "Try the Brownies?", "Yikes!"], ["Comic Convention", "Cosplayer", "Loot Bag", "Collect Prizes", "The costumes are amazing this year!"]],
    data,
    endG = [0, 0, 0, 0],
    R = 0,
    game,
    mob,
    health,
    dead,
    done =true,
    bdBoom= toolTap = mobile = false;
//sound Not sure if it's worth the space it takes. Mutated Depp sample
const songData = [[[.9, 0, 143, , , .35, 3]], [[[0, -1, 1, 8, 6, 4, 1.5, 2.75, 4, , 5, , 6, 4, , 5, , 6, -1, 0, 0, 0], [0, 1, 1, 8, 6, 4, 1.5, 2.75, 4, , 5, , 6, 4, , 5, , 6, -1, 0, 0, 0]], [[0, -1, 20, , 21, 18, , 18, 20, , 21, 18, , 18, , 18, , 18, 20, , 21, , 20, , 21, 18, , 12, 0, 0, 0, -1, 3.5, 12, 12, 5, , 10, , 10, 5, , 8, , 0, 0, 0, 3.5, 12, , , -1], [0, 1, 20, , 21, 18, , 18, 20, , 21, 18, , 18, , 18, , 18, 20, , 21, , 20, , 21, 18, , 12, 0, 0, 0, -1, 3.5, 12, 12, 5, , 10, , 10, 5, , 8, , 0, 0, 0, 3.5, 12, , , -1]]], [1, 1, 0, 0, 1, 0], 60, { title: "baBoot", author: "Vertfromage" }];
localStorage['OS13kMusic, Robot Mission 404 Song'] = JSON.stringify(songData)
const buffer = zzfxM(...songData);    // Generate the sample data
var music = false;
var level = [[      // L1
    [1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1],
    [1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 2, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
    [4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [4, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [4, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
],
//L2
[
    [1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1],
    [1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1],
    [1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 2, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 2, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
    [4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
],
//L3
[
    [1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1],
    [1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
    [4, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [4, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

],
//L4
[
    [1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1],
    [1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [4, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1],
    [4, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
],
//L5
[
    [1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1],
    [1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 1, 0, 0, 1],
    [1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
],

];
// start game loop (60fps)
// the canvas is cleared and adjusted to fullscreen at each frame
setInterval(e => {
    a.width = innerWidth, a.height = innerHeight;
    switch (s) {
        case 0: title();
            break;
        case 1: street();
            //  if (k[13]) { testing = true; }
            if (k[13] && document.monetization && document.monetization.state === 'started') { testing = true; }
            break;
        case 2: inside();
            break;
        case 3: s = 1;// back to street;
            break;
        case 4: endScreen();
            break;
        case 5: mapEditor();
            break;
    }
}, 16)

// handle click/touch events
// globals x and y contain the pointer's coordinates
// in each screen, you can make a click update the game state
// ex: "game over if we click on the bottom half of the screen" => `if(y>h/2)s=3;`
onclick = e => {
    x = e.pageX; y = e.pageY;
    switch (s) {
        case 0: if(x>a.width/2){mobile=true;} if (!music) { const node = zzfxP(...buffer); node.loop = true; music = true; }
            toX = p.x = c.w / 4; toY = p.y = c.h / 2; p.switch(0); s = 1;
            break;
        case 1: if(mobile){toX = x; toY = y;done=false;}
            break;
        case 2: if(mobile){
            if(key.isClose(x,y,1)){toolTap=true;}else{
                toX = x; toY = y;
                done=false;
                if(tool==3||tool==5){
                    setTimeout(() => {toolTap=false;}, 1000);}else{toolTap=false;}
        }}
            break;
        case 3: // react to clicks on screen 3
            break;
        case 4: p.x= c.w/7; p.y= c.h/3; s=0;
        case 5: toX = x; toY = y; tapped(x, y, false); break;
    }
}
//scenes
// Title
function title() {
    c.w = a.width;
    c.h = a.height;
    data = ["404", "404", "404", "404"];
    endG = [0, 0, 0, 0];
    done = true;
    story = 'Robot Mission 404';
    choose = "";
    game = 1;
    nLoot = nDead = loot = 0;
    bdBoom = toolTap= mobile = false;
    //ToDo switch mob to 0 or 1 and have for each room;
    mob = [false, false, false, false, false];
    dead = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    health = 100;
    for (let i = 0; i < numnpcs; i += 1) {
        npcs[i].newSeq([0, 0, 1, 1, 2, 2, 1, 1]);
        bd[i].newSeq([0]);
    }
    shadow();
    c.fillStyle = '#241007';
    c.fillRect(0, 0, c.w, c.h);
    if (document.monetization && document.monetization.state === 'started') {
        tx('Hello Coil Subscribers! You have access to the level editor!', c.w / 2, c.h / 6, 2, '#FFDC21');
        tx("Press 'enter' before flying into building, 'enter' to exit. Refresh to reset.", c.w / 2, c.h / 4, 1.5, '#f5e2b4');
    }
    tx(story, c.w / 2, c.h * .45, 7, '#FFDC21');
    tx("You're an amnesiac robot with corrupted mission data.", c.w / 2, c.h * .55, 2, '#dc21ff');
    tx("Fly around, talk to the town's people to fill in the blanks, and then carry out your mission.", c.w / 2, c.h * .62, 1.7, '#dc21ff');
    tx('Start Mission! Desktop', c.w/3, c.h * .75, 3, '#f5e2b4');
    tx('Start Mission! Mobile', c.w/3*2, c.h * .75, 3, '#f5e2b4');
    tx('arrows or awsd, space, y, n', c.w / 3, c.h * .85, 1.5, '#f5e2b4');
    tx('landscape, tap to move, button to interact.', c.w / 3*2, c.h * .85, 1.5, '#f5e2b4');


    keyMove();
    if (p.x > c.w) { p.x = 0 }
    if (p.y > c.h) { p.y = 0 }
    if (p.y < 0) { p.y = c.h }
    if (p.x < 0) { p.x = c.w }
    p.render();

}


function endScreen() {
    c.fillStyle = '#241007';
    c.fillRect(0, 0, c.w, c.h);
    tx(story, a.width / 2, a.height / 2, 6, "#FFDC21");
    tx(choose, a.width / 2, a.height * .65, 4, '#f5e2b4');
    tx("Click to restart.", a.width / 2, a.height * .75, 3, '#f5e2b4');
    localStorage['OS13kTrophy,👾,Robot Mission 404, Mission Complete']
    if (health == 100) { localStorage["OS13kTrophy,💖,Robot Mission 404, Perfect Health"] }
    if (nDead = 0) { localStorage['OS13kTrophy,🕊,Robot Mission 404, Angel of Peace'] }
    if (nDead == 25) { localStorage['OS13kTrophy,💀,Robot Mission 404, Death Robot'] }
    if (nDead == 25 && nLoot == 30 && health < 100) { localStorage['OS13kTrophy,🥈,Robot Mission 404, Loot & Pillage'] = "Now try for 100% health." }
    if (nDead == 25 && health > 99 && nLoot == 30) { localStorage['OS13kTrophy,🏆,Robot Mission 404, Max Combo'] }
    if (document.monetization && document.monetization.state === 'started') { localStorage['OS13kTrophy,👑,Robot Mission 404, Coil Subscriber'] }
}

function street() {
    if (p.x > c.w) { p.x = 0 }
    if (p.y > c.h - p.h) { p.y = c.h - p.h }
    if (p.x < 0) { p.x = c.w }
    c.w = a.width;
    c.h = a.height;
    mob = [false, false, false, false, false];
    c.fillStyle = '#99A5FE';
    c.fillRect(0, 0, c.w, c.h);
    c.fillStyle = "#483477";
    shadow();
    c.fillRect(0, c.h * .3, c.w, c.h * .7);
    c.fillStyle = '#241007';
    c.fillRect(0, c.h / 2, c.w, c.h / 3);
    let bX, bY = 0;
    for (i = 0; i < bd.length; i++) {
        if (i > 2) {
            bY = c.h * .12;
            bX = (i - 2) * 2 * c.w / 5 - c.w / 5;
        } else {
            bY = c.h * .05;
            bX = i * 2 * c.w / 5;
        }
        bd[i].x = bX
        bd[i].y = bY;
        bd[i].scaleRatio = c.w * .00675;
        bd[i].update();
        bd[i].render();
        if (p.isClose(bX, bY, 1.5) && !bdBoom && !deadR(i)) {
            R = i;
            if (testing) {
                s = 5;
            } else {
                ct2 = 0;
                building();
            }
        }
    }
    tx('Robot Mission 404', c.w / 2, c.h * .65, 5, "#FFDC21");
    story = 'Mission: Enter ' + data[0] + ' as ' + data[1] + ' use ' + data[2] + ' to ' + data[3];
    tx(story, c.w / 2, c.h * .75, 2, "#f5e2b4");
    if (!bdBoom) {
        if(!mobile){
        keyMove();}else if(!done){touchMove(toX,toY);}else{
            p.seq = [1, 0];
            p.update();
            p.seq = [];}
    } else {
        setTimeout(() => {
            story = "Self Destruct Complete!";
            s = 4;
        }, 2300);
    }
    if (k[32] && game == 2 && tool == 4 && !bdBoom) {
        bdTNT();
    }
    p.render();
}

function building() {
    if (game == 2) {
        tS.x = 0; tS.y = 0;
        for (let i = 0; i < 5; i++) {
            if (!(dead[R][i])) {
                npcs[i].newSeq([0, 0, 1, 1, 2, 2, 1, 1]);
            }
            else {
                npcs[i].newSeq([5]);
            }
        }
    }
    p.x = pCol * a.width / 32;
    p.y = pRow * a.height / 16;
    s = 2;
}
function complete() {
    for (i in data) {
        if (data[i] == 404) {
            return false;
        }
    }
    return true;
}

function inside() {
    c.w = a.width;
    c.h = a.height;
    drawR();
    questTrophy();
    if(mobile){key.x=c.w-tileSize*2+tileSize/2; key.y=tileSize+tileSize/2}
    //npc
    let t = false;
    for (i = 0; i < npcs.length; i++) {
        if (p.isClose(npcs[i].x, npcs[i].y, 1)) {
            // check for game state... adventure vs endgame.
            if (game == 1) {
                if(mobile){key.x=tileSize*21;key.y=tileSize/2}
                story = speak[i] + choices[R][i] + "!";
                choose = "Incoporate into memory file? Y or N";
                t = true;
                if ((k[89]||toolTap) && i != 4) {
                    data[i] = choices[R][i];
                    endG[i] = R;
                    choose = "Data Entered!";
                } else if (k[78] && i != 4) {
                    data[i] = "404";
                    choose = "404 data corrupted!"
                } else if (i == 4 && k[78] || (k[89]||toolTap)) {
                    data[2] = "404";
                    choose = "404 data corrupted!"
                }
            } if (game == 2 && !mob[i] && dead[R][i] == 0 && !(R == 4)) {
                {
                    npcs[i].newSeq([3, 4]);
                    mob[i] = true;
                }
            }
        }
        if (game == 2 && npcs[i].isClose(tS.x, tS.y, 1.5) && dead[R][i] == 0 && tool < 4) {
            npcs[i].newSeq([5]);
            dead[R][i] = 1;
            nDead++;
        }
        npcs[i].update();
        npcs[i].render();
        if (deadR(i)) { bd[i].newSeq([4, 5, 6, 7]); }
    }
    if (!t) {
        story = 'Mission: Enter ' + data[0] + ' as ' + data[1] + ' use ' + data[2] + ' to ' + data[3];
        choose = "";
        if(mobile){choose="Hint: Click past where you want to go."}
        if (complete() && game == 1) {
            choose = "Memory restored. Start mission? Y ? N"
            if(mobile){key.x=tileSize*27;key.y=tileSize/2}
            if (k[89]||toolTap) {
                makeTool();
                game = 2;
            }
        }
        if (game == 2) {
            choose = "Health: " + Math.floor(health);
            if (loot > 0) { if (endG[3] == 3) { choose += " Brownies: " + loot; } else { choose += " Loot: " + loot; } }
            if (nDead > 0) { choose += " Dead: " + nDead }
        }
    }
    if (game == 2) {
        win();
        if (k[32]||toolTap) {
            useTool();
            if (tool == 5 || tool == 3) {
                tS.update();
                tS.render();
            }
        } else if (tool == 5 || tool == 3) {
            tS.x = 0; tS.y = 0;
        }
        if (tool < 3) {
            tS.update();
            tS.render();
        }
    }
    p.render();
    
    if(!mobile){
    keyMove();p.y += p.s;}else if(!done){touchMove(toX,toY);}else{
        p.seq = [1, 0];
        p.update();
        p.seq = [];
        p.y += p.s;
    }
    if(mobile){key.render();}
    

    bump(p);

    tx(story, a.width / 2, c.h * .05, 1.7, "#FFDC21");
    tx(choose, a.width / 2, c.h * .09, 1.5, '#f5e2b4');
    let tile = a.width / levelCols
    if (p.y > tile * 12 && p.x < tile * 1 + tile / 4) {
        s = 3;
    }
    // if game==2 check for mission complete, if complete story = mission complete s=4
    if (health < 0) { story = "Damage Sustained,"; choose = "Failure"; s = 4 };
    
}
function drawR() {
    c.fillStyle = "#99A5FE";
    c.fillRect(0, 0, a.width, a.height);
    tileSize = a.width / levelCols;

    // converting X player position from tiles to pixels
    c.width = tileSize * levelCols;   // canvas width. Won't work without it even if you style it from CSS
    c.height = tileSize * levelRows; // canvas height. Same as before

    

    var nI = 0;

    for (i = 0; i < levelRows; i++) {
        for (j = 0; j < levelCols; j++) {
            let box = level[R][i][j];

            switch (box) {
                case 1: drawWall(c, j * tileSize, i * tileSize, tileSize, '#241007', '#dc21ff');
                    break;
                case 4:
                case 5: c.fillStyle = "#000000"; c.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
                    break;
                case 6: if (game == 1) { level[R][i][j] = 0 } else { if (endG[3] == 3) { c.fillStyle = "#7B4835" } else { c.fillStyle = "#ffdc21" }; c.fillRect(j * tileSize, i * tileSize + tileSize / 2, tileSize / 2, tileSize / 2); }
                    if (p.isClose(j * tileSize, i * tileSize, 1) && (k[32]||toolTap)) { level[R][i][j] = 0; loot++; }
            }
            if (box == 2 && nI < numnpcs && dead[R][nI] == 0) {
                if (game == 2 && mob[nI]) {
                    let n = p.x - nI * 5 - tileSize * 2;
                    let b = (n < c.width - tileSize && n > tileSize);
                    if (npcs[nI].isClose(p.x, p.y, 3) && !(npcs[nI].y > p.y + tileSize * 3) && b) {
                        npcs[nI].x = n;
                        health -= .1;
                    }
                    if (npcs[nI].y + p.s < c.height - tileSize) {
                        npcs[nI].y += p.s;
                    }
                    bump(npcs[nI]);
                } else {
                    npcs[nI].x = j * tileSize; npcs[nI].y = i * tileSize;
                }
                nI++;
            }
        }
    }
}
function questTrophy(){
    for (i in data) {
        if (data[i] == 404) {
            c.fillStyle = "grey";
        }
        else{
            c.fillStyle = '#FFDC21';
        }
        c.fillRect(i*tileSize, 0, tileSize/2, tileSize/2)
        let r = tileSize*29-tileSize/2;
        c.fillRect(i*tileSize+r, 0, tileSize/2, tileSize/2)
    }
}
// Writen by workshopcraft https://github.com/dazsim/js13k2020
function drawWall(c, x, y, s, primary, secondary) {
    c.fillStyle = secondary
    c.shadowOffsetY = -4;
    c.shadowColor = "black";
    c.shadowBlur = 6;
    c.fillRect(x, y, s, s)
    c.shadowOffsetY = 0;
    c.shadowBlur = 0;

    c.strokeStyle = primary
    c.lineWidth = 4

    c.beginPath()
    c.moveTo(x, y + s / 2)
    c.lineTo(x + s, y + s / 2)
    c.stroke()

    c.lineWidth = 2
    c.beginPath()
    c.moveTo(x, y)
    c.lineTo(x + s, y)
    c.stroke()

    c.beginPath()
    c.moveTo(x, y + s - 2)
    c.lineTo(x + s, y + s - 2)
    c.stroke()

    c.lineWidth = 4
    c.beginPath()
    c.moveTo(x + s - 2, y + s / 2)
    c.lineTo(x + s - 2, y + s)
    c.stroke()

    c.beginPath()
    c.moveTo(x + s / 2 - 2, y)
    c.lineTo(x + s / 2 - 2, y + s / 2)
    c.stroke()
}
// Endgame
function makeTool() {
    switch (endG[2]) {
        case 0: tool = 1; tS = makeSprite(c, 24, 4, "warp.png", 4, 5, 0, 0, 10, 0);
            break;
        case 1: tool = 2; tS = makeSprite(c, 40, 5, "shot.png", 2, 10, 0, 0, 2, 2); tS.newSeq([0]);
            break;
        case 2: tool = 4; tS = { x: 0, y: 0 };
            break;
        case 3: tool = 3; tS = makeSprite(c, 70, 70, "jet.png", 1, 0, 0, 0, 1, 0);
            break;
        case 4:
            tool = 5; tS = makeSprite(c, 11, 7, "bag.png", 1, 0, 0, 0, 3, 0);
            break;
    }
    if (endG[3] == 3 || endG[3] == 4) {
        if (endG[0] == 0) {
            for (let i = 0; i < 6; i++) {
                for (j in bd) { hideLoot(j) }
            }
        } else {
            for (let i = 0; i < 6; i++) {
                hideLoot(endG[0]);
            }
        }
    }
}
function useTool() {

    switch (tool) {
        case 1:
            tS.x = p.x;
            tS.y = p.y;
            toolTap=false;
            break;
        case 2:
            tS.x = p.x + a.width / levelCols / 2;
            tS.y = p.y;
            let rA;
            if (l||(toolTap&&lorR>0)) {
                tS.newSeq([0]); rA = -8;
            } if (r||(toolTap&&lorR<0)) { rA = 8; tS.newSeq([1]); }
            let timerId2 = setInterval(() => {
                tS.x += rA;
            },
                20);
            setTimeout(() => {
                clearInterval(timerId2); tS.x = 0;
                tS.y = 0;
            }, 400);
            toolTap=false;
            lorR*=-1;
            break;
        case 3:
            tS.x = p.x;
            tS.y = p.y;
            break;
        case 4:
            bdTNT(R);
            s = 1;
            toolTap=false;
            break;
        case 5: tS.x = p.x - tileSize / 2;
            tS.y = p.y;
            break;
    }
}
function win() {
    let l = endG[0];
    switch (endG[3]) {
        case 0: if ((nDead == 25) || ((!l == 0 && deadR(l)))) { story = "Sucess! Targets eliminated!"; s = 4 }
            break;
        case 1: if (deadR(1)) { story = "Sucess! Mob liquidated!"; s = 4; }
            break;
        case 2: if (health < 1) { story = "Sucess! Destroyed the evidence!"; }
            break;
        case 3: if (loot == nLoot) { story = "Sucess! Tried the brownies!"; s = 4 }
            break;
        case 4: if (loot == nLoot) { story = "Sucess! Got the loot!"; s = 4 }
            break;
    }
}

function deadR(x) {
    if (dead[x][0] && dead[x][1] && dead[x][2] && dead[x][3] && dead[x][4]) {
        return true;
    } else { return false }
}

function bdTNT(room) {
    let timer;
    let z = 0;
    console.log(room);
    if (bdBoom) {
        console.log("Already blown up!");
        return;
    }
    p.switch(5);
    bdBoom = true;
    p.seq = [5];
    if (room) {
        p.x = bd[room].x + tileSize * 2; p.y = bd[room].y + bd[room].h * 4;
        timer = setInterval(() => {
            z++;
            bd[room].newSeq([z]);
        }, 250);
        setTimeout(() => {
            bd[room].newSeq([4, 5, 6, 7, 8]);
            clearInterval(timer);
        }, 1000);
    } else {
        timer = setInterval(() => {
            for (i in bd) {
                bd[i].newSeq([z]);
            }
            z++;
        }, 250);
        setTimeout(() => {
            for (i in bd) {
                bd[i].newSeq([4, 5, 6, 7, 8]);
            }
            clearInterval(timer);
        }, 1000);
    }
}
function hideLoot(r) {
    let n = Math.floor(Math.random() * 32),
        m = Math.floor(Math.random() * 16);
    if (!(level[r][m][n])) {
        level[r][m][n] = 6;
        nLoot++;
    } else { hideLoot(r); }
}

function mapEditor() {
    drawR();
    for (i = 0; i < npcs.length; i += 1) {
        npcs[i].update();
        npcs[i].render();

    }
    if (k[13]) {
        console.log(level[R]);
        s = 2; testing = false;
    }
    if (u) { tapped(toX, toY, true) };
}
function tapped(x, y, t) {
    var tileSize = a.width / levelCols;
    var baseCol = Math.floor(x / tileSize);
    var baseRow = Math.floor(y / tileSize);
    let cur = level[R][baseRow][baseCol];
    switch (cur) {
        case 0: cur = 1;
            break;
        case 1: cur = 0;
            break;
        case 2: cur = 0;
            break;
    }
    if (t) { cur = 2; }
    level[R][baseRow][baseCol] = cur;
}

function bump(s) {
    var tileSize = a.width / levelCols;
    var baseCol = Math.floor(s.x / tileSize);
    var baseRow = Math.floor(s.y / tileSize);
    var colOverlap = s.x % tileSize;
    var rowOverlap = s.y % tileSize;

    if (baseRow > 16) {
        return;
    }
    if (baseCol > 32) {
        return;
    }

    let ch = [level[R][baseRow][baseCol], level[R][baseRow][baseCol + 1], level[R][baseRow + 1][baseCol], level[R][baseRow + 1][baseCol + 1]];

    if ((ch[1] && !ch[0]) || (ch[3] && !ch[2] && rowOverlap)) {
        s.x = (baseCol * tileSize);
    }
    if ((!ch[1] && ch[0]) || (!ch[3] && ch[2] && rowOverlap)) {
        s.x = ((baseCol + 1) * tileSize);
    }
    if ((ch[2] && !ch[0]) || (ch[3] && !ch[1] && colOverlap)) {
        s.y = (baseRow * tileSize);
    }
    if ((!ch[2] && ch[0]) || (!ch[3] && ch[1] && colOverlap)) {
        s.y = ((baseRow + 1) * tileSize);
    }
}

function sprite(options) {

    var that = {},
        frameIndex = 0,
        tickCount = 0,
        spot = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.w = options.width;
    that.h = options.height;
    that.x = options.x;
    that.y = options.y;
    that.image = options.image;
    that.scaleRatio = 1;
    that.s = options.s;
    that.seq = [];

    that.newSeq = function (seq) {
        spot = 0;
        frameIndex = 0;
        that.seq = seq;
    };

    that.switch = function (x) {
        frameIndex = x;
    }

    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {
                // Go to the next frame
                frameIndex += 1;
                if (that.seq.length > 0) {
                    frameIndex = that.seq[spot];
                    spot += 1;
                }
            } else if (that.seq.length < 1) {
                frameIndex = 0;
            }
            if (spot > that.seq.length - 1) {
                spot = 0;
            }
        }
    };

    that.render = function () {
        that.context.shadowOffsetX = -6;
        that.context.shadowOffsetY = -3;
        that.context.shadowColor = "black";
        that.context.shadowBlur = 3;

        // Draw the animation
        that.context.drawImage(
            that.image,
            frameIndex * that.w / numberOfFrames,
            0,
            that.w / numberOfFrames,
            that.h,
            that.x,
            that.y,
            that.w / numberOfFrames * that.scaleRatio,
            that.h * that.scaleRatio,
        );
    };

    that.getFrameWidth = function () {
        return that.w / numberOfFrames;
    };
    that.isClose = function (x, y, t) {
        var dx = (that.x + that.getFrameWidth() / 2 * that.scaleRatio) - (x + that.getFrameWidth() / 2),
            dy = (that.y + that.getFrameWidth() / 2 * that.scaleRatio) - (y + that.getFrameWidth() / 2);

        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < that.getFrameWidth() * that.scaleRatio * t) {
            return true;
        } else {
            return false;
        }
    }

    return that;
}
function makeSprite(c, w, h, img, f, t, x, y, r, s) {
    let i = new Image();
    sp = sprite({
        context: c,
        width: w,
        height: h,
        image: i,
        numberOfFrames: f,
        ticksPerFrame: t,
        s: s
    });
    sp.x = x;
    sp.y = y;
    sp.scaleRatio = r;
    i.src = img;
    return sp;
}

function spawnnpc() {
    let i = npcs.length;
    npcs[i] = makeSprite(c, 168, 22, "man3.png", 6, 5, 0, 0, 1.8, 2);
    npcs[i].dead = false;
}
function spawnb() {
    bd[bd.length] = makeSprite(c, 270, 24, "build.png", 9, 20, 0, 0, 0, 0);
}

function tx(t, w, h, f, s) {
    c.textAlign = 'center';
    c.fillStyle = s;
    c.font = f + 'vw Arial';
    c.fillText(t, w, h);
}

function keyMove() {
    if (u) { p.y -= p.s * 5; p.switch(4); };
    if (d) { p.y += p.s; p.switch(4); };
    if (r) { p.x += p.s; p.switch(3); };
    if (k[37] || k[65]) { p.x -= p.s; p.switch(2); };
    if (u && r) { p.switch(1); };
    if (u && k[37]) { p.switch(0); };
    if (!u && !d && !r && !l && !bdBoom) {
        p.seq = [1, 0];
        p.update();
        p.seq = [];
    };
}
function touchMove(x,y){
    if(p.x<x-p.s){
        p.x+=p.s;
        p.switch(3);
    }
    if(p.x>x+p.s){
        p.x-=p.s;
        p.switch(2); 
    }if(p.y<y-p.s){
        p.y+=p.s;
        p.switch(4);
    }
    if(p.y>y+p.s){
        p.y-=p.s;
        if(p.x<x-p.s){p.switch(1);}else{p.switch(0);}
    }
    if(p.isClose(x,y,.1)){done=true;}
}

function shadow() {
    c.shadowOffsetX = -3;
    c.shadowOffsetY = -3;
    c.shadowColor = "black";
    c.shadowBlur = 3;
}
