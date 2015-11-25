function Player(mark){
	this.mark = mark;
}

Player.prototype.markSpace = function(space){
	space.mark = this.mark;
	space.isMarked = true;
};

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
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			if(!(this.spaces[i][j].isMarked)){
				this.freeSpaces.push(this.spaces[i][j]);
			}
		}
	}
	return this.freeSpaces;
};

function Game(){
	this.players = [];
	var player1 = new Player("X");
	var player2 = new Player("O");
	this.players.push(player1);
	this.players.push(player2);
	this.turn = 0;
}

Game.prototype.setUpTurn = function(){
	this.turn++;
	this.currentPlayer = this.turn % 2 === 1 ? this.players[0] : this.players[1];
}

$(document).ready(function(){
	$(".square").click(function(){
		$("body").css("background-color", "blue");
	});
});