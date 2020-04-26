import generateRandomPiece from "./tetris-block-factory.js";

export default function createTetris(lines, columns) {

	const createBoard = () => {
		let board = []
		for (let y = lines; y > 0; y--) {
			board.push(new Array(columns).fill('white'));
		}
		return board
	};

	const state = {
		score: 0,
		board: createBoard(),
		piece: generateRandomPiece(),
		max_lines: lines,
		max_columns: columns,
		gameover: false,
		startTime: null
	};

	const initState = () => {
		state.score = 0
		state.board = createBoard()
		state.piece = generateRandomPiece()
		state.gameover = false
		state.startTime = null
	}

	const collisionDetector = () => {
		const board = state.board
		const piece = state.piece 
		for (let y = 0; y < piece.blocks.length; y++) {
			for (let x = 0; x < piece.blocks[y].length; x++) {
				if (piece.blocks[y][x] !== 0) {
					if (
						piece.y + y > state.max_lines - 1 ||
						(board[y + piece.y] && board[y + piece.y][x + piece.x] !== 'white')
					) {
						return true;
					}
				}
			}
		}
	
		return false;
	}

	const consolidatePiece = () => {
		const board = state.board
		const piece = state.piece 
		piece.blocks.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					board[y + piece.y][x + piece.x] = piece.color;
				}
			});
		});
	};

	const sweepBoard = () => {
		const board = state.board
		const score = 10
		let counter = 1
		for(let y = state.max_lines - 1; y > 0; y--){
			let isRowFull = true 
			for(let x = 0; x < board[y].length; x++){
				if(board[y][x] === 'white'){
					isRowFull = false
					break;
				}
			}
			if(isRowFull){
				const row = board.splice(y, 1)[0].fill('white')
				board.unshift(row)
				state.score += (score * counter)
				y++
			}
		}
	}

	const acceptedMoves = {
		ArrowUp() {
			rotatePiece()
		},
		ArrowRight() {
			movePiece(1);
		},
		ArrowDown() {
			dropPiece()
			state.startTime = null
		},
		ArrowLeft() {
			movePiece(-1);
		}
	}

	const rotatePiece = () => {

		const piece = state.piece 
		const pos = piece.x
		const pieceBlocksTemp = piece.blocks.slice();
	
		for(let y = 0; y < piece.blocks.length; y++){
			for(let x = 0; x < y; x++){
				[
					piece.blocks[x][y],
					piece.blocks[y][x]
				] = [
					piece.blocks[y][x],
					piece.blocks[x][y]
				]
			}
		}
		piece.blocks.forEach(row => row.reverse())
	
		let offset = 1
		while(collisionDetector()){
			piece.x += offset
			offset = -(offset + (offset > 0 ? 1 : -1))
			if(offset > piece.blocks[0].length){
				piece.blocks = blocksTemp
				piece.x = pos
				return
			}
		}
	}
	
	const movePiece = (direction) => {
		state.piece.x += direction;
		if(collisionDetector()){
			state.piece.x -= direction;
		}
	}

	const dropPiece = () => {
		state.piece.y++;
		if (collisionDetector()) {
			state.piece.y--;
			consolidatePiece();
			sweepBoard()
			resetPiece()
		}
	};

	const resetPiece = () => {
		state.piece = generateRandomPiece();
		if (collisionDetector()) {
			state.gameover = true
			if(confirm('Game Over. Re-start?')){
				initState()
			}
		}
	}

	const receive = (command) => {
		if(state.gameover === true)
			return

		switch(command.type) {
			case 'move-piece':
				const move = acceptedMoves[command.keyPressed]
				if (move){
					move()
				}
				break
			case 'drop-piece':
				dropPiece()
				break
		}
	}

	return {
		state,
		receive
	}

}