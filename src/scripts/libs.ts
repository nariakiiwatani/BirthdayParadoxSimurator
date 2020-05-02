export function cloneNode<T extends Node>(node: T, deep: boolean) {
    return <T>node.cloneNode(deep);
}
export function randomInt(max: number): number {
	return Math.floor(Math.random() * Math.floor(max));
}
export type Birthday = {
	month: number,
	date: number
}
export function randomDate(leap: boolean): Birthday {
	const days = [
		31,28+(leap?1:0),31,30,
		31,30,31,31,
		30,31,30,31
	];
	let month = 0;
	const date: number = days.reduce((date, value, index) => {
		if(date >= value) {
			date -= value;
			month += 1;
		}
		return date;
	}, randomInt(365+(leap?1:0)));
	return {
		month: month+1,
		date: date+1
	};
}