const BLOCK_TYPES = ['T', 'I', 'J', 'L', 'O', 'Z', 'S']

const createPiece = (type) => {
	const piece = {
		x: 3,
		y: 0,
		blocks: [],
		color: 'white'
	};

	switch (type) {
		case 'T':
			piece.blocks = [
				[1, 1, 1],
				[0, 1, 0],
				[0, 0, 0],
			]
			piece.color = 'purple'
			break
		case 'I':
			piece.blocks = [
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]
			piece.y--
			piece.color = 'aqua'
			break
		case 'J':
			piece.blocks = [
				[1, 1, 1],
				[0, 0, 1],
				[0, 0, 0],
			]
			piece.color = 'blue'
			break
		case 'L':
			piece.blocks = [
				[1, 1, 1],
				[1, 0, 0],
				[0, 0, 0],
			]
			piece.color = 'orange'
			break
		case 'O':
			piece.blocks = [
				[1, 1],
				[1, 1]
			]
			piece.color = 'yellow'
			break
		case 'Z':
			piece.blocks = [
				[1, 1, 0],
				[0, 1, 1],
				[0, 0, 0],
			]
			piece.color = 'red'
			break
		case 'S':
			piece.blocks = [
				[0, 1, 1],
				[1, 1, 0],
				[0, 0, 0],
			]
			piece.color = 'green'
			break
	}

	return piece
	
}

export default function generateRandomPiece() {
	const index = Math.floor(Math.random() * BLOCK_TYPES.length);
	const type = BLOCK_TYPES[index]
	return createPiece(type)  
}