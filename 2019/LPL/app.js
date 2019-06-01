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
	type: 'map',
	callback(row) {
		row.matchWinRate = row.matchCount === 0 ? 0 : row.matchWin / row.matchCount * 100;
		row.gameWinRate = (row.gameWin + row.gameLoose) === 0 ? 0 : row.gameWin / (row.gameWin + row.gameLoose) * 100
		// 净胜场
		row.goal = row.gameWin - row.gameLoose;
		return row;
	}
});
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
	height: 580,
	padding: { left: 50, right: 50, top: 60, bottom: 80 }
});
chart.scale({
	winLoose: {
		formatter(val) {
			return val === 'matchWin' ? '胜' : '负';
		}
	},
	point: {
		alias: '积分',
		min: 0,
		max: Math.max(TEAMS.length - 1, result.matchCount),
		tickInterval: 1
	},
	winRateType: {
		formatter(val) {
			return val === 'matchWinRate' ? '胜率' : '小场胜率';
		}
	},
	goal: {
		alias: '净胜分'
	},
	matchWinRate: {
		alias: '胜率',
		min: 0,
		max: 100
	},
	gameWinRate: {
		alias: '小场胜率',
		min: 0,
		max: 100
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
	})
	.tooltip('point*winLoose*gameWin*gameLoose', (point, winLoose, gameWin, gameLoose) => {
		return {
			name: winLoose === 'matchWin' ? '胜(小场胜)' : '负(小场负)',
			value: winLoose === 'matchWin' ? `${point}(${gameWin})` : `${point}(${gameLoose})`
		};
	});

chart.line().position('team*matchWinRate').tooltip('matchWinRate', rate => ({ name: '胜率', value: `${rate.toFixed(0)}%` })).color('#40a9ff');
chart.point().position('team*matchWinRate').tooltip('matchWinRate', rate => ({ name: '胜率', value: `${rate.toFixed(0)}%` })).color('#40a9ff');
chart.axis('matchWinRate', {
	title: { position: 'end' },
	label: { formatter: text => `${text}%` }
});

chart.line().position('team*gameWinRate').tooltip('gameWinRate', rate => ({ name: '小场胜率', value: `${rate.toFixed(0)}%` })).color('#666');
chart.point().position('team*gameWinRate').tooltip('gameWinRate', rate => ({ name: '小场胜率', value: `${rate.toFixed(0)}%` })).color('#666');
chart.axis('gameWinRate', false);

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

// last updated match info
function updateLastMatchInfo(matches, ele) {
	const lastIndex = matches.findIndex(match => !match[4]) - 1;
	const lastMatch = lastIndex === -2 ? matches[matches.length - 1] : (lastIndex < 0 ? null : matches[lastIndex]);
	if (lastMatch) {
		ele.textContent = getMatchStr(lastMatch);
	}
}
updateLastMatchInfo(MATCHES, document.getElementById('J-last-match'));

// current or next play day info
function updateNextMatchInfo(matches, ele) {
	const now = moment();
	let nextMatchDay;
	let hasTodayMatches = false;
	const todayMatches = [];
	let nextMatches = [];

	for (let match of matches) {
		const matchDate = match[3];
		if (matchDate.isBefore(now, 'day')) continue;
		if (matchDate.isSame(now, 'day')) {
			todayMatches.push(match);
			if (!match[4]) {
				nextMatchDay = now;
				hasTodayMatches = true;
			}
			continue;
		}

		if (nextMatchDay && matchDate.isAfter(nextMatchDay, 'day')) break;

		nextMatchDay = matchDate;
		nextMatches.push(match);
	}

	if (hasTodayMatches) {
		nextMatches = todayMatches;
	}

	if (!nextMatches.length) return;

	ele.style.display = '';
	ele.querySelector('.J-title').textContent = hasTodayMatches ? '今日比赛' : '下个比赛日';
	const content = nextMatches.map(m => `<div>${getMatchStr(m)}</div>`);
	ele.querySelector('.J-con').innerHTML = content.join('');
}
updateNextMatchInfo(MATCHES, document.getElementById('J-cur-next-play-day'));

initTableCellFocus(document.getElementById('J-detail'));
