---
layout: post
title:  "Robot Mission 404 Post Mortem "
date:   2020-09-24
categories: Update
---
S13KGames Postmortem for Robot Mission 404

[Play Robot Mission 404](http://js13kgames.com/entries/robot-mission-404)

This was my second year participating in js13kgames, last year I barely knew Javascript and had only done one game tutorial before participating.  This year I had made a math flashcard game using Phaser 3, and had completed multiple tutorials about building games with Phaser3, so I figured I could do pretty much anything I imagined at least passably. 

When the theme was set out as 404 the first thought that occurred to me was getting lost, or losing the connection to portals between worlds. I might have settled on a quest style game where you had to reconnect portals between worlds to get back home, but when the competition started I was spending a few days with my in laws away from a computer, so I had time to mull it over. In the end I settled on a later idea about a robot with amnesia in a small town trying to fill the gaps in his memory then acting out his new mission. 

When I first started trying to put this together I had arranged for a CS student I knew to join me in the fun, and he helped me further plan the idea to include a platform element. In the end he changed his mind about joining in and I wrote the code on my own.

I started off using xem's JSGameFramework2020. I liked that it was so tiny and simple, and I liked the use of switches for managing scenes. https://gist.github.com/xem/a7ff7215375520d89b73beeabd7b16bd      

I already had some code from last year to animate a sprite from a sprite sheet using object style programming, dot-notation stuff. So I went looking for something to use for a robot sprite sheet before trying to draw my own. I found a super cool sprite pack on craftpix.net for a few dollars that was total overkill because I knew I'd have to shrink it down horribly and couldn't use the coolest animations, so instead of drawing my own sprite sheet I took about five times as long making that one work for me because I liked it so much.  https://craftpix.net/product/flying-robot-character-sprites/   

Useful tip: If you're trying to make an image take up less space and don't want to lose all the details by making it smaller you can use posterize in GIMP to decrease the total number of colours.

The man sprite came from here: https://opengameart.org/content/pixel-art-adventurer-sprites 

I had never made a platformer, so at first I thought I'm going to have to use rectangle objects and interact with them, but I found a tutorial that explained how platforms were usually done, and that got me started.   
https://www.emanueleferonato.com/2014/01/17/creation-of-an-html5-tile-based-platform-game-with-no-engines-behind-pure-code/

The idea I was going for with my game was two parts, the first part would be talking to the npc's and choosing how to fill in the 404 gaps in the robot's memory, and the second part would be acting out the mission. I wanted to make the second part work with all most any combination of possibilities. 

I did end up making a level builder when I realized how hard it was to visualize how the 0's and 1's would get drawn out from the level arrays. I let my daughters and my husband have a try at building levels... I kept some of what they designed. 

Cool things that I enjoyed included:

- workshopcraft messaged me on twitter to give me some tips, on his offer, I ended up using a function he wrote to make the blocks look like bricks. https://github.com/dazsim/js13k2020 I also used it to add a background.

- I decided to put shadows on the sprites and the font.

- I wrote a song through trial and error using zzfxM and I'm not musical at all. 

- Having the buildings burn down if the robot killed everyone inside them, or exploded inside them. 

- Making it work on mobile when I didn't think I could just so my Mom would be willing to try it. In case you're wondering she tried it, it's not her type of game.

- Realizing no one understood how to play it without more explicit directions... added more explicit directions, still somewhat worried it would still confuse people. 

- Using lots of switch blocks, it made me feel like I was so much more proficient then when everything was a series of if/else blocks.

- Expanding and tweaking the functionality of my sprite object. I made it so you can change the sequence of the animation and changed the that.isTouching into a that.isClose function that takes in x,y and a distance in tiles.

Things I want to do next year:

- Focus on making it more beautiful. Some of the games this year had animated backgrounds and light effects I want to do at least one really beautiful thing next year. 

- Try making a puzzle based game. Some of the games I enjoyed the most this year were puzzle or strategy based, even some of the arcade style games included puzzle elements. I'm not sure if I could do it since I tend towards story based ideas, but since I enjoy them so much it would be a fun experiment to see if I could come up with something good.     
