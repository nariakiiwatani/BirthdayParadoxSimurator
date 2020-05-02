import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/analytics";
import { FIREBASE_SECRET_PARAMS } from "./firebase_secret_params";

export class Firebase {
	scores: firebase.database.Reference;
	counts: firebase.database.Reference;
	constructor() {
		firebase.initializeApp(FIREBASE_SECRET_PARAMS);
		firebase.analytics();
		this.scores = firebase.database().ref("scores");
		this.counts = firebase.database().ref("counts");
	}
	addScore(score: number): void {
		this.scores.push({index: score});
	}
	getCountsRef(): firebase.database.Reference {
		return this.counts;
	}
}