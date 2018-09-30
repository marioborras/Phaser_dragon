var StateMain={    
    
    preload: function() {
        game.load.spritesheet("dragon", "images/main/dragon.png", 120, 85, 4);
        game.load.image("background", "images/main/background.png");
        game.load.spritesheet("candy", "images/main/candy.png", 52, 50, 8);    
     },
     
     create: function(){

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.top = 0;
        this.bottom = game.height - 120;

         //dragon
         this.dragon = game.add.sprite(0,0,"dragon");
         this.dragon.animations.add("fly", [0,1,2,3], 12,true);
         this.dragon.animations.play("fly");

         //candies
         this.candies = game.add.group();
         this.candies.createMultiple(40, 'candy');
         //candies have to pay attention to the size of the game.
         this.candies.setAll('checkWorldBounds', true);
         //will remove the candy if it leaves the screen
         this.candies.setAll('outOfBoundsKill', true);

         game.physics.enable([this.dragon,this.candies], Phaser.Physics.ARCADE);

         this.dragon.body.gravity.y = 500;
        
         //background
         this.background = game.add.tileSprite(0, game.height -480, game.width, 480, 'background');
        //puts dragon to the top and above the background
         this.dragon.bringToTop();
         this.dragon.y = this.top;

         //takes an x and y value.If put at 0,0 nothing will happen, this makes background go to the left.
         this.background.autoScroll(-100,0);

         this.setListeners();
         },
         setListeners: function() {
            game.time.events.loop(Phaser.Timer.SECOND, this.fireCandy, this);

         },
         fireCandy: function() {
             //gets the first piece of candy not on the screen or not active
            var candy = this.candies.getFirstDead();
            var yy = game.rnd.integerInRange(0,game.height-60);
            var xx = game.width - 100;
            var type = game.rnd.integerInRange(0,7);

            candy.frame = type;
            //resets all properties
            candy.reset(xx,yy);
            //no longer eligble for the candyes to get firstdead
            candy.enabled = true;
            candy.body.velocity.x = -200;
            console.log("candy fired")
         },
         flap:function() {
            this.dragon.body.velocity.y = -350;
        },
     
     update:function(){ 
         if (game.input.activePointer.isDown) {
             this.flap();
         } 
         if (this.dragon.y < this.top) {
             this.dragon.y = this.top;
             this.dragon.body.velocity.y = 0;
         }     
         if (this.dragon.y > this.bottom) {
             this.dragon.y = this.bottom;
             this.dragon.body.gravity.y = 0;
         } else {
             this.dragon.body.gravity.y =500;
         }
     }    
     
 }