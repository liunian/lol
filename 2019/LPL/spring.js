// project to: week, home, road, datetime, result
const MATCHES = generateMatches(RAW_MATCH_DATA, TIME_ZONE);
const WEEKS = MATCHES.map(i => i[0]).reduce((prev, cur) => prev.includes(cur) ? prev : prev.concat(cur), []).sort((a, b) => a - b);
const latestWeek = getLatestWeek(MATCHES);

const result = generateRankings(TEAMS, MATCHES);

const $week = document.getElementById('J-week');
const $weekVal = document.getElementById('J-week-val');
const maxWeek = WEEKS[WEEKS.length - 1];

$week.setAttribute('max', latestWeek);
$week.value = latestWeek;
$weekVal.innerText = latestWeek;

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
	// width: 800,
	forceFit: true,
	height: 500,
	padding: { left: 50, right: 50 }
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
chart.intervalStack().position('team*point')
	.color('winLoose', v => v === 'matchWin' ? '#2BBF30' : '#f5222d')
	.label('point*winLoose', (v, t) => {
		if (v === 0) return false;
		return {
			position: 'middle',
			offset: 0
		};
	});
chart.render();

function weekRangeHandler(evt) {
	const curWeek = evt.target.value;
	$weekVal.innerText = curWeek;
	const curResult = generateRankings(TEAMS, MATCHES, curWeek);
	dv.source(curResult.rankings.slice(0).reverse());
}

$week.addEventListener('change', weekRangeHandler, false);
$week.addEventListener('input', weekRangeHandler, false);

document.getElementById('J-detail').innerHTML = generateMatchDetails(TEAMS, MATCHES);