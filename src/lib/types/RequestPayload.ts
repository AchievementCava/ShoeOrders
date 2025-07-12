export type OrderPayload = {
	name: string;
	ic: string;
	phone: string;
	club: string;
	street: string;
	postcode: number;
	town: string;
	state: string;
	shoes: {
		number: number;
		id: string;
		colour: string;
		size: number;
		quantity: number;
	}[];
};
