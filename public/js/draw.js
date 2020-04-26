export default function draw(canvas, score, game, requestAnimationFrame) {

	const drawBoard = (ctx, board) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		board.forEach((row, y) => {
			row.forEach((color, x) => {
				ctx.fillStyle = color;
				ctx.fillRect(x, y, 1, 1);
			});
		});
	};

	const drawPiece = (ctx, piece) => {
		ctx.fillStyle = piece.color;
		piece.blocks.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					ctx.fillRect(piece.x + x, piece.y + y, 1, 1);
				}
			});
		});
	};

	const ctx = canvas.getContext("2d");
	ctx.fillStyle = 'white'
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBoard(ctx, game.state.board)
	drawPiece(ctx, game.state.piece)
	
	score.innerText = game.state.score

	requestAnimationFrame((timestamp) => {
		if(game.state.startTime === null) {
			game.state.startTime = timestamp
		}
		if (timestamp - game.state.startTime >= 1000) {
			game.receive({type: 'drop-piece'})
			game.state.startTime = null
		}
		draw(canvas, score, game, requestAnimationFrame)
	})
}
