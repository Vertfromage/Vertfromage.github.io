
var k,u,r,d,l,s

var c = a.getContext`2d`
a.width = innerWidth
a.height = innerHeight
c.w = innerWidth
c.h = innerHeight
let attack = false,
run = [{x:0,y:0},{x:0,y:c.h},{x:c.w,y:0},{x:c.w,y:c.h}],
des,
score = [0,0]

const mouse = {
  x: null,
  y: null,
}

let hero = {
  x: 100,
  y: 100,
  w: 15,
  h: 50,
  s:2
}

let enemy = {
    x: 300,
    y: 300,
    w: 15,
    h: 50,
    s: 1
  }


var oldMouse={x:0,y:0}

drawJet = (o, color,f) =>
{
  c.save()
  c.translate(o.x, o.y*f)
  c.rotate(o.angle)
  
  c.fillStyle = '#FFF'
  var x = -(o.w/2)
  var y = -(o.h/2)
  
  c.fillRect(o.w/2, -5, 10, 10)
  c.fillRect(-o.w-15, -4, 20, 8)
  c.fillRect(-o.w-15, -8, 3, 16)
  c.fillStyle = color
  c.fillRect(x, y, o.w, o.h)
  c.restore()
}

onclick = e => {
    let x = e.pageX, y = e.pageY
    if(!attack && !lasers.length){
        setGunOrigin(hero);
        shootlaser(hero,x,y);
        attack = true;
        des = run[rand(4)]
    }
}

onMouseMove = (evt) => {
  var rect = a.getBoundingClientRect()
  if(Math.abs(oldMouse.x-mouse.x)>c.w/12||Math.abs(oldMouse.y-mouse.y)>c.h/10){
  oldMouse.x = mouse.x
  oldMouse.y = mouse.y
}
  mouse.x = evt.clientX - rect.left
  mouse.y = evt.clientY - rect.top
}

a.addEventListener('mousemove', onMouseMove, true)

draw=()=>{
  c.fillStyle = '#000'
  c.fillRect(0, 0, a.width, a.height)

  tx("Hero "+score[0],c.w/2-200, c.h*.87, 2.7, '#00F');
  tx("Enemy "+score[1],c.w/2+200, c.h*.87, 2.7, '#F00');
  tx((!lasers.length && !attack ? "FIRE AT WILL!!":"RELOADING..."),c.w/2, c.h*.2, 4, '#FFF');

  if(attack && !lasers.length){
    setGunOrigin(enemy)
    shootlaser(enemy,hero.x,hero.y)
    attack = false
    }

LookAt(hero, mouse.x, mouse.y)
!attack ?  LookAt(enemy, hero.x, hero.y) : LookAt(enemy, des.x,des.y)

c.translate(0,c.h)
c.globalAlpha=0.50
drawJet(hero, '#00F', -1)
drawJet(enemy, '#F00', -1)

c.setTransform(1,0,0,1,0,0)
c.globalAlpha=1
/// 2. --- Rotate the o and draw
drawJet(hero, '#00F', 1)
drawJet(enemy, '#F00', 1)

// Move o to old mouse x,y
move(hero, mouse)
!attack ?  move(enemy, hero) : move(enemy, des)

  
  playLasers()
  
  
  window.requestAnimationFrame(draw)
}

setGunOrigin =(o)=>{
	o.gX = o.x + (o.w/2) * Math.cos(o.angle);
	o.gY = o.y + (o.w/2) * Math.sin(o.angle);
}

LookAt = (o, dx, dy)=>
{
  o.angle = Math.atan2(dy - o.y, dx - o.x)
}

move = (o, g) =>{
    if(o.x-g.x>1){
      o.x-=o.s
    }else if(o.x-g.x<-1){
      o.x+=o.s
    }
    if(o.y-g.y>1){
      o.y-=o.s
    }else if(o.y-g.y<-1){
      o.y+=o.s
    }
  }

class Laser{
	constructor(x,y,v){
	
		this.x = x;
		this.y = y;
		this.v = v;
		this.outOfBounds = false;
	}
	
	draw(){
		c.fillStyle = "blue";
    	c.beginPath(); //Start path
    	c.arc(this.x, this.y, 2.5, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    	
		c.fill() 
	};

	update(){
		this.x += this.v.x*5
		this.y += this.v.y*5
		if(this.x>c.w||this.x<0||this.y>c.h||this.y<0){
			this.outOfBounds=true
		}
	}

	isClose(x, y, d){
		return Math.sqrt((this.x - x)**2 + (this.y - y)**2) < d
	}
}

const lasers = [];

function destroyLaser (laser) {
	for (var i = 0; i < lasers.length; i++) {
		if (lasers[i] === laser) {
			lasers[i] = null
			lasers.splice(i, 1)
			break
		}
	}
}

function shootlaser(o,x,y){
		let velocity = getVelocity({x:o.gX,y:o.gY},{x:x,y:y})
		lasers.push(new Laser( o.gX,o.gY, velocity))
		velocity = getVelocity({x:o.gX,y:o.gY},{x:x,y:y+20})
		lasers.push(new Laser( o.gX,o.gY, velocity))
		velocity = getVelocity({x:o.gX,y:o.gY},{x:x,y:y-20})
		lasers.push(new Laser( o.gX,o.gY, velocity))
}

function playLasers(){
	lasers.forEach((laser)=>{
		laser.update()
		laser.draw()
		if(laser.outOfBounds){
			destroyLaser(laser)
		}
		// check if hit plane
        if(laser.isClose(hero.x,hero.y, 10) && !attack){
            score[1]++
            destroyLaser(laser)
        }else if(laser.isClose(enemy.x,enemy.y, 10) && attack){
            score[0]++
            destroyLaser(laser)
        }
	})
}

// uses radians
function getVelocity(from,to){
	let angle = Math.atan2(to.y-from.y,to.x-from.x)
	return {x: Math.cos(angle), y: Math.sin(angle)}
}

function rand(max) {
    return Math.floor(Math.random() * max)
  }

function tx(t, w, h, f, s) {
    c.textAlign = 'center';
    c.fillStyle = s;
    c.font = f + 'vw Consolas';
    c.fillText(t, w, h);
}

window.requestAnimationFrame(draw)