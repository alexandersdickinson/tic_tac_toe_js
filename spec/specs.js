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

describe("winner", function(){
	it("declares the winner if three spaces along the x axis are marked by the same player", function(){
		var testGame = new Game();
		testGame.players[0].markSpace(testGame.board.spaces[0][0]);
		testGame.players[0].markSpace(testGame.board.spaces[1][0]);
		testGame.players[0].markSpace(testGame.board.spaces[2][0]);
		expect(testGame.winner()).to.equal(testGame.players[0]);
	});
	
	it("declares the winner if three spaces along the y axis are marked by the same player", function(){
		var testGame = new Game();
		testGame.players[0].markSpace(testGame.board.spaces[0][0]);
		testGame.players[0].markSpace(testGame.board.spaces[0][1]);
		testGame.players[0].markSpace(testGame.board.spaces[0][2]);
		expect(testGame.winner()).to.equal(testGame.players[0]);
	});
	
	it("declares the winner if three spaces along the diagonal axis where x and y are equal are marked by the same player", function(){
		var testGame = new Game();
		testGame.players[0].markSpace(testGame.board.spaces[0][0]);
		testGame.players[0].markSpace(testGame.board.spaces[1][1]);
		testGame.players[0].markSpace(testGame.board.spaces[2][2]);
		expect(testGame.winner()).to.equal(testGame.players[0]);
	});
	
	it("declares the winner if three spaces along the diagonal axis where x and y are not equal are marked by the same player", function(){
		var testGame = new Game();
		testGame.players[0].markSpace(testGame.board.spaces[0][2]);
		testGame.players[0].markSpace(testGame.board.spaces[1][1]);
		testGame.players[0].markSpace(testGame.board.spaces[2][0]);
		expect(testGame.winner()).to.equal(testGame.players[0]);
	});
	
	it("declares O as the winner", function(){
		var testGame = new Game();
		testGame.players[1].markSpace(testGame.board.spaces[0][2]);
		testGame.players[1].markSpace(testGame.board.spaces[1][1]);
		testGame.players[1].markSpace(testGame.board.spaces[2][0]);
		expect(testGame.winner()).to.equal(testGame.players[1]);
	});
	
	it("declares a tie", function(){
		var testGame = new Game();
		testGame.players[0].markSpace(testGame.board.spaces[0][0]);
		testGame.players[0].markSpace(testGame.board.spaces[1][0]);
		testGame.players[1].markSpace(testGame.board.spaces[2][0]);
		testGame.players[1].markSpace(testGame.board.spaces[0][1]);
		testGame.players[0].markSpace(testGame.board.spaces[1][1]);
		testGame.players[0].markSpace(testGame.board.spaces[2][1]);
		testGame.players[0].markSpace(testGame.board.spaces[0][2]);
		testGame.players[1].markSpace(testGame.board.spaces[1][2]);
		testGame.players[1].markSpace(testGame.board.spaces[2][2]);
		expect(testGame.winner()).to.equal("tie");
	});
	
	it("returns false if three in a row does not occur", function(){
		var testGame = new Game();
		testGame.players[0].markSpace(testGame.board.spaces[1][1]);
		expect(testGame.winner()).to.equal(false);
	});
});

describe("winThreat", function(){
	it("returns space needed for the opponent to win the game", function(){
		var testGame = new Game();
		testGame.players[0].markSpace(testGame.board.spaces[1][1]);
		testGame.players[0].markSpace(testGame.board.spaces[1][2]);
		expect(testGame.winThreat(testGame.players[0])).to.equal(testGame.board.spaces[1][0]);
	})
	
	it("returns space needed for the opponent to win with a diagonal", function(){
		var testGame = new Game();
		testGame.players[0].markSpace(testGame.board.spaces[1][1]);
		testGame.players[0].markSpace(testGame.board.spaces[0][2]);
		expect(testGame.winThreat(testGame.players[0])).to.equal(testGame.board.spaces[2][0]);
	});
	
	it("returns middle space when two outside spaces are marked", function(){
		var testGame = new Game();
		testGame.players[0].markSpace(testGame.board.spaces[0][0]);
		testGame.players[0].markSpace(testGame.board.spaces[2][0]);
		expect(testGame.winThreat(testGame.players[0])).to.equal(testGame.board.spaces[1][0]);
	});
	
	it("returns false if there is no threat", function(){
		var testGame = new Game();
		testGame.players[0].markSpace(testGame.board.spaces[0][0]);
		expect(testGame.winThreat(testGame.players[0])).to.eql(false);
	});
});