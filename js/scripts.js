function Player(mark){
	this.mark = mark;
}

Player.prototype.markSpace = function(space){
	space.mark = this.mark;
	space.isMarked = true;
}

function Space(x,y){
	this.x = x;
	this.y = y;
	this.isMarked = false;
}

function Board(){
	this.spaces = [];
	this.freeSpaces = [];
	for(var i = 1; i <= 3; i++){
		var rows = []
		for(var j = 1; j <= 3; j++){
			var space = new Space(i, j);
			rows.push(space);
		}
		this.spaces.push(rows);
	}
}

Board.prototype.getFreeSpaces = function(){
	this.freeSpaces = [];
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			if(!(this.spaces[i][j].isMarked)){
				this.freeSpaces.push(this.spaces[i][j]);
			}
		}
	}
	return this.freeSpaces;
}

function Game(){
	this.players = [];
	var player1 = new Player("X");
	var player2 = new Player("O");
	this.board = new Board();
	this.players.push(player1);
	this.players.push(player2);
	this.turn = 0;
}

Game.prototype.setUpTurn = function(){
	this.turn++;
	this.currentPlayer = this.turn % 2 === 1 ? this.players[0] : this.players[1];
}

Game.prototype.winner = function(){
	for(var i = 0; i < 2; i++){
		//find matches along the x axis
		var threeRowDiag1 = true;
		var threeRowDiag2 = true;
		for(var coord1 = 0; coord1 < 3; coord1++){
			var threeRowHorz = true;
			var threeRowVert = true;
			for(var coord2 = 0; coord2 < 3; coord2++){
				if(!(this.board.spaces[coord2][coord1].isMarked && this.board.spaces[coord2][coord1].mark === this.players[i].mark)){
					threeRowHorz = false;
				}
				if(!(this.board.spaces[coord1][coord2].isMarked && this.board.spaces[coord1][coord2].mark === this.players[i].mark)){
					threeRowVert = false;
				}
				if(coord1 === coord2){
					if(!(this.board.spaces[coord1][coord2].isMarked && this.board.spaces[coord1][coord2].mark === this.players[i].mark)){
						threeRowDiag1 = false;
						if(coord1 === 1){
							threeRowDiag2 = false;
						}
					}
				}
				if((coord1 === 0 && coord2 === 2) || (coord1 === 2 && coord2 === 0)){
					if(!(this.board.spaces[coord1][coord2].isMarked && this.board.spaces[coord1][coord2].mark === this.players[i].mark)){
						threeRowDiag2 = false;
					}
				}
			}
			if(threeRowHorz || threeRowVert){
				return this.players[i];
			}
		}
		if(threeRowDiag1 || threeRowDiag2){
			return this.players[i];
		}
	}
	return false;
}

Game.prototype.winThreat = function(player){
	var spaces = this.board.spaces;
	var space;
	for(var group = 0; group < 3; group++){
		var threeRowX = [];
		var threeRowY = [];
		var rowsXAndY = [threeRowX, threeRowY, diagSpaces1, diagSpaces2];
		for(var across = 0; across < 3; across++){
			rowsXAndY[0].push(spaces[across][group]);
			rowsXAndY[1].push(spaces[group][across]);
		}
		for(var i = 0; i < 2; i++){//rowsXandY
			var row = rowsXAndY[i];
			var blankSpaces = [];
			for(var j = 0; j < 3; j++){//threeRows
				space = row[j];
				var markedCount = 0;
				if(space.isMarked && space.mark === player.mark){
					markedCount++;
				}
				else{
					blankSpaces.push(rowsXAndY[i].slice(j, j + 1)[0]);
				}
			}
			if(blankSpaces.length < 2){
				return blankSpaces[0];
			}
		}
	}
	var diagSpaces1 = [spaces[0][0], spaces[1][1], spaces[2][2]];
	var diagSpaces2 = [spaces[0][2], spaces[1][1], spaces[2][0]];
	var diags = [diagSpaces1, diagSpaces2];
	for(var i = 0; i < 2; i++){//rowsXandY
		var row = diags[i];
		var blankSpaces = [];
		for(var j = 0; j < 3; j++){//threeRows
			space = row[j];
			var markedCount = 0;
			if(space.isMarked && space.mark === player.mark){
				markedCount++;
			}
			else{
				blankSpaces.push(diags[i].slice(j, j + 1)[0]);
			}
		}
		if(blankSpaces.length < 2){
			return blankSpaces[0];
		}
	}
	return false;
}

$(document).ready(function(){
	var game = new Game();
	var isAgainstComputer = false;
	game.setUpTurn();
	var isNewGame = false;
	var difficulty;
	
	$(".square").click(function(event){
		if(isNewGame){
			newGame();
		}
		else{
			var children = $(event.target).children();
			var child = game.currentPlayer.mark === "O" ? 0 : 1;
			var coordinates = []
			var squareParent = $(event.target).parent()[0];
			coordinates.push(parseInt(squareParent.className.charAt(squareParent.className.length - 1)));
			coordinates.push(parseInt(event.target.className.charAt(event.target.className.length - 1)));
			//see if coordinates of clicked square is a free space
			var freeSpaces = game.board.getFreeSpaces();
			var isFree = false;
			for(var i = 0; i < freeSpaces.length; i++){
				var comparisonCoords = [freeSpaces[i].x, freeSpaces[i].y];
				if(comparisonCoords[0] === coordinates[0] && comparisonCoords[1] === coordinates[1]){
					isFree = true;
					break;
				}
			}
			if(isFree){
				game.currentPlayer.markSpace(game.board.spaces[coordinates[0] - 1][coordinates[1] - 1]);
				children[child].style.visibility = 'visible';
				var winner = game.winner();
				if(winner){
					$("#winner").text(winner.mark + " wins!");
					$("#winner").show();
					isNewGame = true;
				}
				else{
					game.setUpTurn();
					if(isAgainstComputer){
						computerTurn();
					}
				}
			}
		}
	});
	
	$("#new-game").click(function(event){
		isAgainstComputer = false;
		newGame();
	});
	
	$("#against-computer").click(function(event){
		isAgainstComputer = true;
		newGame();
		difficulty = $("input[name=difficulty]:checked").val();
		whichPlayer = $("input[name=which-player]:checked").val();
		if(whichPlayer === 'x'){
			computerTurn();
		}
	});
	
	function newGame(){
		isNewGame = false;
		Array.prototype.forEach.call(document.getElementsByClassName("x"), function(x){
			x.style.visibility = 'hidden';
		});
		Array.prototype.forEach.call(document.getElementsByClassName("o"), function(o){
			o.style.visibility = 'hidden';
		});
		$("#winner").hide();
		game = new Game();
		game.setUpTurn();
	}
	
	function computerTurn(){
		var targetSpace;
		if(difficulty === "easy"){
			targetSpace = markRandomSpace();
		}
		else{
			targetSpace = markCertainSpace();
		}
		var column = document.getElementsByClassName("column" + targetSpace.x);
		var square = $(column).children()[targetSpace.y - 1];
		var child = game.currentPlayer.mark === "O" ? 0 : 1;
		$(square).children()[child].style.visibility = 'visible';
		var winner = game.winner();
		if(winner){
			$("#winner").text(winner.mark + " wins!");
			$("#winner").show();
			isNewGame = true;
		}
		else{
			game.setUpTurn();
		}
	}
	
	function markRandomSpace(){
		var freeSpaces = game.board.getFreeSpaces();
		var randSpace = freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
		game.currentPlayer.markSpace(randSpace);
		return randSpace;
	}
	
	function markCertainSpace(){
		var freeSpaces = game.board.getFreeSpaces();
		var opponent = game.currentPlayer.mark === 'O' ? game.players[0] : game.players[1];
		var targetSpace = game.winThreat(opponent);
		if(targetSpace && !(targetSpace.isMarked)){
			game.currentPlayer.markSpace(targetSpace);
			debugger;
		}
		else if(!(game.board.spaces[1][1].isMarked)){
			targetSpace = game.board.spaces[1][1];
			game.currentPlayer.markSpace(targetSpace);
			debugger;
		}
		else if(game.winThreat(game.currentPlayer) && !(game.winThreat(game.currentPlayer).isMarked)){
			targetSpace = game.winThreat(game.currentPlayer);
			game.currentPlayer.markSpace(targetSpace);
			debugger;
		}
		else{
			targetSpace = markRandomSpace();
			debugger;
		}
		return targetSpace;
	}
});