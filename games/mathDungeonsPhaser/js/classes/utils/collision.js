class Collision{
    static checkCollision(obj1,obj2){
        var disX = Math.abs(obj1.x-obj2.x);
        var disY = Math.abs(obj1.y-obj2.y);
        if(disX<obj1.width/2){
            if (disY<obj1.width/2){
                return true;
            }
        }
        return false;
    }
}