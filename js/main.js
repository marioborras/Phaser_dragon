let game;
let score;
let soundOn = true;
let musicOn = true
let useLandscape=false;


window.onload = function () {

let isMobile=navigator.userAgent.indexOf("Mobile");
if (isMobile>-1)
     {
        isMobile=true;
     }
     else
     {
        isMobile=false;
     }

    if (isMobile==false) {
        //desktop laptop
        if (useLandscape == true) {
            game = new Phaser.Game(480, 640, Phaser.AUTO, "ph_game");
        } else {
            //browser view
            game = new Phaser.Game(800, 480, Phaser.AUTO, "ph_game");
        }

    } else {
        //mobile device
        game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "ph_game");
    }
    //a game state is just a screen.
    game.state.add("StateMain",StateMain);
    game.state.add("StateOver",StateOver);
    game.state.add("StateTitle",StateTitle);
    game.state.add("StateInstructions",StateInstructions);
    game.state.start("StateTitle");
}