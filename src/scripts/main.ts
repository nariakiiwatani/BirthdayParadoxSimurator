import "normalize.css"
//import "reset-css"
import "../style/index.scss"

import { Info } from "./info";
import { Student } from "./student";
import { Birthday, randomDate } from "./libs";
import { Firebase } from "./firebase";
import { Graph } from "./chart";

(() => {
	const info: Info = new Info(document.querySelector("#info"));
	const table: HTMLElement = document.querySelector("#students");
	const students: Student[] = [];
	const database = new Firebase();
	const graph: Graph = new Graph(document.querySelector("#chart"), document.querySelector("#statistics .count"), database.getCountsRef());

	function createStudent(parent: HTMLElement, birthday: Birthday) {
		const student = new Student(parent);
		student.setBirthday(birthday);
		return student;
	}
	function addEvent(reset_when_first_hit: boolean) {
		const student = createStudent(table, randomDate(true));
		const hits: Student[] = students.filter((value) => {
			return value.birthday.month===student.birthday.month
			&& value.birthday.date===student.birthday.date;
		});
		students.push(student);
		info.setNum(students.length);
		if(hits.length !== 0) {
			hits.forEach(student => {
				student.markSame(true);
			});
			student.markSame(true);
			if(!info.isHit()) {
				info.setHit();
				database.addScore(students.length);
				if(reset_when_first_hit) {
					setTimeout(resetEvent, 500);
					// resetEvent();
				}
			}
		}
	};
	function resetEvent() {
		students.length = 0;
		table.innerHTML = "";
		info.reset();
	}
	document.querySelector("#add").addEventListener("click", ()=> {
		addEvent(false);
	});
	document.querySelector("#reset").addEventListener("click", ()=> {
		resetEvent();
	});
//	setTimeout(()=>{setInterval(()=>{addEvent(true);}, 150);}, 10000);
//	setInterval(()=>{addEvent(true);}, 10);

})();