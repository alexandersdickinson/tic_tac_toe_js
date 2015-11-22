function Player(mark){
	this.mark = mark;
}

function Space(x,y){
	this.x = x;
	this.y = y;
}

Space.prototype.markedBy = function(player){
	this.markedBy = player;
}

function Board(){
	this.spaces = [];
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			var space = new Space(i, j);
			this.spaces.push(space);
		}
	}
}

function Game(){
	this.players = [];
	var player1 = new Player("X");
	var player2 = new Player("O");
	this.players.push(player1);
	this.players.push(player2);
	this.turn = 0;
}