describe('Player', function() {
    it("returns the player's mark", function() {
      var testPlayer = new Player("X");
      expect(testPlayer.mark).to.equal("X");
   });
});

describe('markSpace', function(){
	it("marks a space with the mark of a player", function(){
		var testPlayer = new Player("O");
		var testSpace = new Space(0,0);
		testPlayer.markSpace(testSpace);
		expect(testSpace.mark).to.equal("O");
	});
	
	it("sets isMarked to true", function(){
		var testPlayer = new Player("O");
		var testSpace = new Space(0,0);
		testPlayer.markSpace(testSpace);
		expect(testSpace.isMarked).to.equal(true);
	});
});

describe('Space', function() {
    it("returns the player's mark", function() {
      var testSpace = new Space(1,2);
      expect(testSpace.y).to.equal(2);
   });
   
   it("initializes the value isMarked with false", function(){
	   var testSpace = new Space(0,0);
	   expect(testSpace.isMarked).to.equal(false);
   });
});

describe('Board', function() {
  it("creates an array of three columns each containing three rows to represent grid", function() {
	  var testCols = [];
	  var testBoard = new Board();
	  for(var i = 1; i <= 3; i++){
		  var rows = []
		  for(var j = 1; j <= 3; j++){
			  var space = new Space(i,j);
			  rows.push(space);
		  }
		  testCols.push(rows);
	  }
	  expect(testBoard.spaces).to.eql(testCols);
  });
  
  it("shows spaces that have not been marked", function(){
	  var testBoard = new Board();
	  var testPlayer = new Player("X");
	  var testFreeSpaces = [];
	  for(var i = 1; i < 3; i++){
		  for(var j = 0; j < 3; j++){
			  testFreeSpaces.push(testBoard.spaces[i][j]);
		  }
	  }
	  testPlayer.markSpace(testBoard.spaces[0][0]);
	  testPlayer.markSpace(testBoard.spaces[0][1]);
	  testPlayer.markSpace(testBoard.spaces[0][2]);
	  expect(testBoard.getFreeSpaces()).to.eql(testFreeSpaces);
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

describe("setUpTurn", function(){
	it("increments the turn", function(){
		var testGame = new Game();
		testGame.setUpTurn();
		expect(testGame.turn).to.equal(1);
	});
	
	it("assigns X as the current player on odd numbered turns", function(){
		var testGame = new Game();
		testGame.setUpTurn();
		testGame.setUpTurn();
		testGame.setUpTurn();
		expect(testGame.currentPlayer.mark).to.equal("X");		
	});
	
	it("assigns O as the current player on even numbered turns", function(){
		var testGame = new Game();
		testGame.setUpTurn();
		testGame.setUpTurn();
		expect(testGame.currentPlayer.mark).to.equal("O");		
	});
});