export class Info {
	elements: {[index: string]: HTMLElement};
	is_hit: boolean;
	constructor(parent: HTMLElement) {
		this.elements = {
			num_all: parent.querySelector(".num_all"),
			index_hit: parent.querySelector(".index_hit"),
		};
		this.reset();
	}
	setNum(num: number): void {
		this.elements.num_all.textContent = String(num);
	}
	setHit(): void {
		if(this.is_hit) {
			return;
		}
		this.elements.index_hit.textContent = this.elements.num_all.textContent;
		this.is_hit = true;
	}
	isHit(): boolean { return this.is_hit; }
	reset(): void {
		this.is_hit = false;
		this.elements.index_hit.textContent = "";
		this.elements.num_all.textContent = "0";
	}
}