import { Chart } from "chart.js";

export class Graph {
	chart: Chart;
	constructor(canvas: HTMLCanvasElement, countView: HTMLElement, ref: firebase.database.Reference) {
		this.chart = new Chart(canvas, {
			type: "line",
			data: {
				datasets: [{
					label: "この人数でかぶった回数",
					fill: 'origin',
					yAxisID: "number",
					lineTension: 0,
					backgroundColor: "rgba(128,220,32,0.5)"
				},
				{
					label: "この人数までで誕生日がかぶった割合",
					fill: 'origin',
					yAxisID: "ratio",
					backgroundColor: "rgba(255,128,128,0.3)"
				}],
			},
			options: {
				scales: {
					xAxes: [{
						type: 'linear',
						ticks: {
							beginAtZero: true,
							stepSize: 5,
							suggestedMax: 40
						}
					}],
					yAxes: [{
						id: 'number',
						type: 'linear',
						position: 'right',
						ticks: {
							min: 0,
							suggestedMax: 10,
							stepSize: 1,
							callback: function(value, index, values) {
								return parseInt(value);
							}						}
					},
					{
						id: 'ratio',
						type: 'linear',
						ticks: {
							min: 0,
							max: 1,
							stepSize: 0.1,
						}
					}]
				}
			}	
		});
		type Point = {x:number,y:number};
		ref.on("value", (snapshot) => {
			const c = this.chart;
			let sum = 0;
			let counts = Array<Point>({x:0,y:0});
			let ratios = Array<Point>({x:0,y:0});
			snapshot.forEach((data)=> {
				const index = parseInt(data.key);
				const value = data.val();
				sum += value;
				counts.push({x:index, y:value});
				ratios.push({x:index, y:sum});
			});
			ratios = ratios.map((data)=> {
				return {x:data.x, y:data.y/sum};
			});
			c.data.datasets[0].data = counts;
			c.data.datasets[1].data = ratios;
			countView.textContent = String(sum);
			c.update();
		});
	}

}