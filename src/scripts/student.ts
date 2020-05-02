import { cloneNode, Birthday } from "./libs";

export class Student {
	elements: {[index: string]: HTMLElement;};
	default_class_name: string;
	birthday: Birthday;
	constructor(parent: HTMLElement) {
		const template: HTMLElement = document.querySelector(".template .student");
		const me = cloneNode(template, true);
		this.elements = {
			root: me,
			month: me.querySelector(".month"),
			date: me.querySelector(".date"),
		};
		this.default_class_name = me.className;
		parent.appendChild(me);
	}
	setBirthday(birthday: Birthday): void {
		this.birthday = birthday;
		this.elements.month.textContent = String(birthday.month);
		this.elements.date.textContent = String(birthday.date);
	}
	markSame(same: boolean) {
		this.elements.root.className = this.default_class_name + (same?" hit":"");
	}
};
