class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    cube1 = createSprite(100,200);
    cube1.addImage(Gamerimg);
    cube1.scale= 3;
    cube2 = createSprite(300,200);
    cube2.addImage(Happyguyimg);
    cube2.scale= 3;
    cube3 = createSprite(500,200);
    cube3.addImage(Kingimg);
    cube3.scale= 3;
    cube4 = createSprite(700,200);
    cube4.addImage(Normalimg);
    cube4.scale= 3;
    cube5 = createSprite(100,100);
    cube5.addImage(Presidentimg);
    cube5.scale= 3;
    cube6=createSprite(300,100);
    cube6.addImage(Securityimg);
    cube6.scale= 3;
    cubes = [cube1, cube2, cube3, cube4,cube5,cube6];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
  
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("Cyan");
      //index of the array
      var index = 0;

      //x and y position of the cubes
      var x = 150;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cubes a little away from each other in x direction
        x = x + 150;
        //use data form the database to display the cubes in y direction
        y = displayHeight - allPlayers[plr].distance;
        cubes[index-1].x = x;
        cubes[index-1].y = y;

        if (index === player.index){
          fill("red");
          stroke(10);
          ellipse(x,y,60,60);
          cubes[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cubes[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>3860){
      gameState=2;
      player.rank += 1;
      Player.updatecaratEnd(player.rank);
    }

    drawSprites();
  }
  end(){
    console.log("Game ended");
    console.log(player.rank);
  }
}
