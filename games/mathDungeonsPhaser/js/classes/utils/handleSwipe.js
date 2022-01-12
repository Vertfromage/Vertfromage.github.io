class HandleSwipe {
    static CheckSwipe(e) {
        var swipeTime = e.upTime - e.downTime;
        var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        // console.log("Movement time:" + swipeTime + " ms");
        // console.log("Horizontal distance: " + swipe.x + " pixels");
        // console.log("Vertical distance: " + swipe.y + " pixels");
        return {time: swipeTime,point:swipe};
    }
}