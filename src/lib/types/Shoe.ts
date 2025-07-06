export enum Colour {
	Brown = 'Brown',
	Orange = 'Orange',
	Yellow = 'Yellow',
	Pink = 'Pink',
	Red = 'Red',
	Purple = 'Purple',
	Grey = 'Grey',
	Green = 'Green',
	White = 'White',
	Blue = 'Blue',
	Black = 'Black'
}

export class Shoe {
	static counter: number = 0;

	number: number;
	id: string;
	colour: Colour | '';
	size: number | null;
	quantity: number | null;

	constructor(id: string = '', colour: Colour = '', size: number = null, quantity: number = null) {
		this.id = id;
		this.colour = colour;
		this.size = size;
		this.quantity = quantity;
		this.number = Shoe.counter;

		Shoe.counter = Shoe.counter + 1;
	}
}
