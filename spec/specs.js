describe('Player', function() {
    it("returns the player's mark", function() {
      var testPlayer = new Player("X");
      expect(testPlayer.mark).to.equal("X");
   });
});

describe('Space', function() {
    it("returns the player's mark", function() {
      var testSpace = new Space(1,2);
      expect(testSpace.x).to.equal(1);
   });
});

describe('Space', function() {
    it("returns the player's mark", function() {
      var testSpace = new Space(1,2);
      expect(testSpace.y).to.equal(2);
   });

  it("lets a player mark a space", function() {
      var testPlayer = new Player("X")      
      var testSpace = new Space(1,2);
      testSpace.markedBy(testPlayer)
      expect(testSpace.markedBy).to.equal(testPlayer);
   });
});

describe('Board', function() {
  it("creates 9 spaces when it is initialized", function() {
	  var testSpaces = [];
	  var testBoard = new Board();
	  for (var i = 0; i < 3; i++){
		  for(var j = 0; j < 3; j++){
			  var space = new Space(i, j);
			  testSpaces.push(space);
		  }
	  }
	  expect(testBoard.spaces).to.eql(testSpaces);
  });
});

describe('Game', function(){
	it("starts the game with two players and assigns X to player1 and O to player2", function(){
		var testGame = new Game();
		expect(testGame.players.length).to.equal(2);
		expect(testGame.players[0].mark).to.equal("X");
		expect(testGame.players[1].mark).to.equal("O");
	});
	
	it("initializes with turn set to 0", function(){
		var testGame = new Game();
		expect(testGame.turn).to.equal(0);
	});
});