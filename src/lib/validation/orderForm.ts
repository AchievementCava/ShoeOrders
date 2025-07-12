import { Colour, Shoe } from '$lib/types/Shoe';

const colours = Object.values(Colour);

export function newShoe() {
	return new Shoe();
}

export function addShoe(shoe: Shoe, shoes: Shoe[]) {
	return [...shoes, shoe];
}

export function removeShoe(counter: number, shoes: Shoe[]) {
	return shoes.filter((shoe) => shoe.number !== counter);
}

export const orderDataValid = (shoes: Shoe[]) => {
	return shoes.every(
		(shoe) =>
			shoe.id.trim() !== '' &&
			shoe.colour !== '' &&
			shoe.size !== null &&
			shoe.size > 0 &&
			shoe.quantity !== null &&
			shoe.quantity >= 1 &&
			Number.isInteger(shoe.quantity)
	);
};

export function isValidName(name: string): boolean {
	return name.trim().length >= 2;
}

export function isValidPhone(phone: string) {
	const pattern = /^01[0-9][\ \-]?[0-9]{7,8}$/;
	const disallowed = ['0123456789', '0169696969'];

	return pattern.test(phone) && !disallowed.includes(phone);
}

export function isValidState(state: string) {
	return state !== '';
}

export function userDataValid(name: string, phone: string, state: string): boolean {
	return isValidName(name) && isValidPhone(phone) && isValidState(state);
}

export function formDataValid(name: string, phone: string, state: string, shoes: Shoe[]): boolean {
	return userDataValid(name, phone, state) && orderDataValid(shoes);
}
