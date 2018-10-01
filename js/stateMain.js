var StateMain={    
    
    preload: function() {
        game.load.spritesheet("dragon", "images/main/dragon.png", 120, 85, 4);
        game.load.image("background", "images/main/background.png");
        game.load.spritesheet("candy", "images/main/candy.png", 52, 50, 8);
        game.load.image("balloon", "images/main/thought.png"); 
        game.load.spritesheet("soundButtons","images/ui/soundButtons.png",44,44,4);
        game.load.audio("burp","sounds/burp.mp3");
        game.load.audio("gulp","sounds/gulp.mp3");
        game.load.audio("backgroundMusic","sounds/background.mp3");
     },
     
     create: function(){
         score =0;
         this.musicPlaying = false;
         this.lift =350;
         this.fall =500;
         this.delay =1;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.top = 0;
        this.bottom = game.height - 120;
        //sounds
        this.burp = game.add.audio("burp");
        this.gulp = game.add.audio("gulp");
        this.backgroundMusic = game.add.audio("backgroundMusic");
        //helps to not drown out the sound effects.
        this.backgroundMusic.volume = .5;
        this.backgroundMusic.lopp = true;
         //dragon
         this.dragon = game.add.sprite(0,0,"dragon");
         this.dragon.animations.add("fly", [0,1,2,3], 12,true);
         this.dragon.animations.play("fly");

        

        
         //background
         this.background = game.add.tileSprite(0, game.height -480, game.width, 480, 'background');
        //puts dragon to the top and above the background
         this.dragon.bringToTop();
         this.dragon.y = this.top;

         //takes an x and y value.If put at 0,0 nothing will happen, this makes background go to the left.
         this.background.autoScroll(-100,0);

          //candies
          this.candies = game.add.group();
          this.candies.createMultiple(40, 'candy');
          //candies have to pay attention to the size of the game.
          this.candies.setAll('checkWorldBounds', true);
          //will remove the candy if it leaves the screen
          this.candies.setAll('outOfBoundsKill', true);

          //thought
          this.balloonGroup=game.add.group();
          this.balloon = game.add.sprite(0,0,"balloon");
          this.think = game.add.sprite(36,26, "candy");
          this.balloonGroup.add(this.balloon);
          this.balloonGroup.add(this.think);
          this.balloonGroup.scale.x = .5;
          this.balloonGroup.scale.y = .5;
          this.balloonGroup.x= 50;

          //text
          this.scoreText = game.add.text(game.world.centerX,60,"0");
          this.scoreText.fill = "#000000";
          this.scoreText.fontSize=64;
          this.scoreText.anchor.set(0.5,0.5);

          this.scoreLabel = game.add.text(game.world.centerX,20,"Score");
          this.scoreLabel.fill = "#000000";
          this.scoreLabel.fontSize=32;
          this.scoreLabel.anchor.set(0.5,0.5);

          //sound buttons
          this.btnMusic = game.add.sprite(20,20,"soundButtons");
          this.btnSound = game.add.sprite(70,20,"soundButtons");
            //no need to set the btnSound because it defaults to 0
          this.btnMusic.frame =2;




 
          game.physics.enable([this.dragon,this.candies], Phaser.Physics.ARCADE);
          this.dragon.body.gravity.y = this.fall;
          this.dragon.body.immovable =true;

         this.setListeners();
         this.resetThink();
         this.updateButtons();
         this.updateMusic();
     },
     setListeners: function() {
            game.time.events.loop(Phaser.Timer.SECOND*this.delay, this.fireCandy, this);
            //enable the sprite to take inputs and then add the listener
            this.btnSound.inputEnabled = true;
            //dont forget to put the scope!
            this.btnSound.events.onInputDown.add(this.toggleSound,this);
            this.btnMusic.inputEnabled = true;
            this.btnMusic.events.onInputDown.add(this.toggleMusic,this);

     },
     toggleSound:function(){
        soundOn =!soundOn;
        this.updateButtons();
     },
     toggleMusic: function(){
         musicOn =!musicOn;
         this.updateButtons();
         this.updateMusic();
     },
     updateMusic: function () {
        if (musicOn = true){
            if (this.musicPlaying ==false) {
                this.musicPlaying = true;
            this.backgroundMusic.play();
        }else {
            this.musicPlaying = false;
            this.backgroundMusic.stop()
         }
       }
     },
     updateButtons:function(){
         if (soundOn == true){
             this.btnSound.frame = 0;
         }else {
            this.btnSound.frame =1;
         }
         if (musicOn == true){
             this.btnMusic.frame = 2;
         }else {
             this.btnMusic.frame = 3;
         }
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
            console.log("candy fired");
     },
     flap:function() {
            this.dragon.body.velocity.y = -this.lift;
     }, 
     onEat:function(dragon,candy){
        if(this.think.frame ==candy.frame){ 
            candy.kill();
            this.resetThink();
            score++;
            this.scoreText.text = score;
            if (soundOn == true){
                this.gulp.play();
            }
        }else {
            candy.kill();
            this.backgroundMusic.stop();

            if (soundOn == true){
                this.burp.play();
            }
            game.state.start("StateOver")
        }
     },
     resetThink:function (){
         let thinking= game.rnd.integerInRange(0,7);
         this.think.frame = thinking;
     }, 
     update:function(){ 
         //requires two objects to check of they collide, third parameter make null as not being used and fourth para is the fuction you want to call if the two things do collide.
         game.physics.arcade.collide(this.dragon,this.candies,null,this.onEat,this);
         //set the balloon group in relation to the dragon.
        this.balloonGroup.y = this.dragon.y-60;
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