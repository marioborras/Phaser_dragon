var StateOver={    
    
    preload:function() {
        game.load.spritesheet("buttons","images/ui/buttons.png",265,75);
        game.load.spritesheet("dragon", "images/main/dragon.png", 120, 85, 4);


     },
     
     create:function() {
         // paramerer is x, then y, the key, the function, the scope,the over normal and pressed states
         this.buttonPlayAgain = game.add.button(game.world.centerX,game.world.centerY+100,"buttons",this.replay,this,0,1,0);
         //center the button
         this.buttonPlayAgain.anchor.set(0.5,0.5);

         this.dragon = game.add.sprite(game.world.centerX,game.world.centerY,"dragon");
         this.dragon.anchor.set(0.5,0.5);
         this.dragon.animations.add("fly", [0,1,2,3], 12,true);
         this.dragon.animations.play("fly");
         //flips the dragon side
         this.dragon.scale.x =-1;
         game.stage.backgroundColor = "#26C9FF";
     },
     replay:function() {
        game.state.start("StateMain");
     },
     update:function()
     {       
         
     }    
     
 }