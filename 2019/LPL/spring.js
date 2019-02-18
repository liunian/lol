// project to: week, home, road, datetime, result
const MATCHES = generateMatches(RAW_MATCH_DATA, TIME_ZONE);

const result = generateRankings(TEAMS, MATCHES);
console.log(result);

const ds = new DataSet();
const dv = ds.createView().source(result.rankings.slice(0).reverse());
dv.transform({
	type: 'fold',
	fields: ['matchWin', 'matchLoose'],
	key: 'winLoose',
	value: 'point'
});

const chart = new G2.Chart({
	container: 'ranking',
	width: 800,
	// forceFit: true,
	height: 500
});
chart.scale({
	winLoose: {
		formatter(val) {
			return val === 'matchWin' ? '赢场' : '输场';
		}
	},
	point: {
		min: 0,
		max: Math.max(TEAMS.length - 1, result.matchCount),
		tickInterval: 1
	}
});
chart.source(dv);
chart.coord().transpose();
chart.intervalStack().position('team*point').color('winLoose', v => v === 'matchWin' ? '#2BBF30' : '#f5222d');
chart.render();