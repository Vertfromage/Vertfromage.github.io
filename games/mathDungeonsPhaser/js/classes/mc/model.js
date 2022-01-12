class Model{
    constructor(){
        this._score=0;
        this._soundOn=true;
        this._musicOn=true;
        this._hintsOn=true;
        this._difficulty=1;
        this._currUser=-1;
        this._users = [];
        this._userSettings = {switch : {add:true,sub:true,mult:true,div:true}
        ,set: [true,true,true,true,true,true,true,true,true,true,true,true], start:"0",end:12};
    }
    set userSettings(settings){
        this._userSettings = settings;
    }
    get userSettings(){
        return this._userSettings;
    }
    get users(){
        return this._users;
    }

    newUser(config){
        var userData= {};
        if( config.avatar){
            userData.avatar = config.avatar;
        }
        this._users.push(userData);
    }

    editUser(config){
        this._users[config.user].avatar = config.avatar;
    }

    get avatar(){
        if(this._users.length>0){
            return this._users[this._currUser].avatar;
        }else{
            console.log("No Avatars... fix bug.");
            return 'dudeBlink';
        }
    }

    printUsers(){
        this._users.forEach(element => {
            console.log(element);
        });
    }
    get currUser(){
        return this._currUser;
    }
    set currUser(user){
        this._currUser = user;
    }
    set score(val){
        this._score=val;
        emitter.emit(G.SCORE_UPDATED);
    }
    get score(){
        return this._score;
    }
    set musicOn(val){
        this._musicOn=val;
        emitter.emit(G.MUSIC_CHANGED);
    }
    get musicOn(){
        return this._musicOn;
    }
    set hintsOn(val){
        this._hintsOn=val;
    }
    get hintsOn(){
        return this._hintsOn;
    }
    set difficulty(val){
        this._difficulty=val;
    }
    get difficulty(){
        return this._difficulty;
    }
    set soundOn(val){
        this._soundOn=val;
    }
    get soundOn(){
        return this._soundOn;
    }
}