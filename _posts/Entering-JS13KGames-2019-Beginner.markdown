---
layout: post
title:  "Entering JS13KGames 2019 as a Beginner"
date:   2019-09-19
categories: Update
---
[Play BackSide Ball](https://vertfromage.github.io./games/backSideBall/index.html) 

If you're a javascript pro this post isn't for you, this is for a beginner next year who will wonder if they could participate too. This is for the student or hobbyist who knows only a little javascript and is thinking, “do I dare?” Thinking, “Do I dare try to make a game for a contest that draws highly skilled programmers who will look at my amateurish spaghetti code and laugh”.  And this is for anyone, who like me, came into the 2019 JS13KGAMES thinking “Do I Dare Try?” and chose to give it a go.

First I suppose I should define “beginner.” In my case I consider myself a self-taught student. I am not an absolute beginner to programming.  I've done 3 university level programming courses on Edx.org: two of which were intro to programming courses, one intro to data science/Algorithms.  I have also been actively learning Java using Tim Bulchalka's course and HackerRank. I am also not an absolute beginner to javascript I followed along with a fairly basic 21 day coding challenge a couple months prior. But as for HTML5 games, or Javascript games in general I was an absolute beginner.  

A week into the JS13KGAMES it occurred to me that it would fun to try to make a super basic game to hide on my father's website,  his church website. So of course I chose pong, the simplest non-text game I could think of.  I followed a tutorial almost exactly and spent a fair bit of time re-reading the code to understand how and why it worked.  I also wanted to embed it directly in the website page to make it funnier for my father which made it a tad more difficult.  [Play Here](https://www.riversidealbertchurch.com/pong) [Tutorial Here]( https://medium.com/@hershybateea/how-to-make-pong-with-javascript-1a6bd6226ea1)

So booming with newfound confidence I stumbled on JS13KGAMES and thought I can start with the game I just made from the tutorial, which I now understand, and do a spin off for the contest... a hack-sack pong. I didn't know how little I did not know, but I was having fun so I began googling all my varied questions. “What is an HTML5 Game?” “What is HTML5 canvas?” “How to resize a game to fit different screen sizes?” and so on.... The first thing I realized is that I couldn't use the same base code I'd just come to understand... I had to use HTML5 canvas... whatever that was.   

Before I get back into the story of the development of my game I want to give you my take-aways for next year:	

1.  Ask Google Questions - If you keep asking questions you'll find answers. 

2.  Start Simple - Follow a tutorial for the simplest version of the game you envision and start there.

3. What would Make This Better? -  Once you have a basic version working ask this question and implement one improvement. Loop.

4. Get Someone To Play It. - When you think it's done have a friend play it. They'll tell you all the ways it isn't done. 

5. Just Submit Your Game - If you're nervous just remember they accepted my game, as long as it works I'm sure yours will be accepted too.

So I had to start over with HTML5 Canvas, fine I needed a new tutorial. Google: “How to make pong with HTML5 Canvas?”  

Tutorial:  http://bencentra.com/2017-07-11-basic-html5-canvas-games.html

Enter a super basic tutorial from a summer camp, perfect!  Read through code googling anything that I don't understand, discover jsFiddle along the way, change code in jsFiddle to figure out how they work. 
Next Problem: I need to resize the canvas so my game doesn't end up with a scroll bar, so it can be used on mobile. Google: “How to resize HTML5 canvas”

Tutorials:
https://www.kirupa.com/html5/resizing_html_canvas_element.html
https://www.html5rocks.com/en/tutorials/casestudies/gopherwoord-studios-resizing-html5-games/
https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html#toc

For me this problem was a bit of a doozie to understand, but I considered it a non starter if I couldn't resize for different screen. (I imagine I could have done one small size that would have fit any screen, but that didn't appeal to me.) I read quite a few articles and tutorials before I felt I understood how to solve this issue, and while I was figuring it out I tested everything in the jsFiddle from the previous tutorial. 

The fun part! Now I can rework all the code to look and act how I want my spin off hack-sack game to work. My first smart idea was I don't want the ball to bounce off the top because it wouldn't look like it was falling, so I thought I'll make invisible barriers for it to bounce off. I got that working and moved the paddles down to the bottom to represent the knees of my hack-sack player.  I also changed the controls for the paddles.  So it worked... but bouncing off invisible walls didn't look like hack-sack gravity. 

New Problem: my hack-sack game doesn't look like hack-sack it looks like wall ball. This is where I googled, “How to imitate gravity in HTML5 canvas games” but really I was already warming up to this wall ball idea... who says you can't change directions mid project.  So I had wall ball with 2 paddles... was that a feature or a flaw?  And were they for two players or would one player control both paddles.  I ended up deciding it was for one player, and they'd be two hands... later in the game process I considered changing the controls to only use right and left arrows in a similar way to the mouse controls which forced the hands to move together... but my spaghetti code was tangled and when I changed one part of the controls... well you know that story... it just didn't feel worth it.  

At this point I had a working game that I had personalized... and I looked at it and thought, “How can I make this better?” Then I had this really funny idea, “What if there was an elf... and every-time you hit him with a ball he moons you!” The idea made me laugh out loud. Juvenile yes... but what can I say, I thought it was funny.

So I googled, “How do you animate a character in HTML5 canvas?” At that point I didn't know they were called sprites.    

Tutorial: http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

Great I thought, I'll make it work with a coin animation then I can go back and make my own sprite strip! So I did... spend time reading and re-reading the code to figure out how and why it works, try it by itself to see if I understand how it works, then use code in my project, change stuff I need to change to make it work with my game. Write some methods inside the sprite function using that dot notation. 

So once I got that working I had to make my sprite, enter www.piskelapp.com which I found most helpfully on the JS13KGAMES resources page. At first I had it as one long continuous animation where the elf wiggled then mooned you... but it wasn't exactly what I envisioned so I had to break it up into two sprite sheets and write the logic to control when the sprite would moon you and what would happen to the ball while you were being mooned.

So I had done it I had an elf that mooned you and jumped around the page! But I asked myself what would make this better? Well I understood sprites now... what if he dropped a coin every time he jumped.  The only hard part about implementing that was storing the coins in an array... it was covered in the extended part of the coin tutorial... but it seemed hard... so I hemmed and hawed over whether I wanted to maybe break what was already working to add such an extra bit... but I did anyways... it didn't turn out to be as difficult as I imagined. 

So had a somewhat involved game (from my beginner perspective) at that point, so I could have stopped there, but I asked myself again what could be better? Sound. 

I found a tutorial on the resource page: https://7tonshark.com/2018-09-16-web-audio-part-1/#

I really only did a teeny bit of what he was suggesting, just enough to make different noises for the ball, the elf and the coins.

Now I couldn't help asking, what could be better? Touch detection would be better.  I had a delay on mobile because I was leaving touch to be automatically converted to mouse. I googled how to do it, but at the point I was done. Maybe next time I'd tackle touch detection but I wasn't up to that this time. 

I felt like I had done enough and I was satisfied, so I submitted it through the bot and it was accepted.

The end. 

Except for the part where I play all the other games and be amazed by how awesome they are! That part just started!   
