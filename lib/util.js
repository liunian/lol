function getByEqualsInxVal(list, innerListIndex) {
	return function(val) {
		return list.find(i => i[innerListIndex] === val);
	};
}

function teamFactory(teams) {
	return {
		getTeam(teamAbbr) {
			return teams.find(team => team[0] === teamAbbr);
		}
	};
}

function getMatchesBetween(matches, a, b) {
	return matches.filter(match => match[1] === a && match[2] === b || match[1] === b && match[2] === a);
}

function getLatestWeek(matches) {
	return Math.max.apply(Math, matches.filter(match => !!match[4]).map(i => i[0]));
}

function sortRanking(rankings, matches) {
	const compareRanking = function(a, b) {
		const matchDiff = a.matchWin - b.matchWin;
		const gameDiff = a.gameWin - b.gameWin;

		if (matchDiff > 0) return -1;
		if (matchDiff < 0) return 1;
		if (a.matchLoose < b.matchLoose) {
			return -1;
		} else if (a.matchLoose > b.matchLoose) {
			return 1;
		}

		if (gameDiff > 0) return -1;
		if (gameDiff < 0) return 1;
		if (a.gameLoose < b.gameLoose) {
			return -1;
		} else if (a.gameLoose > b.gameLoose) {
			return 1;
		}

		const teamA = a.team;
		const teamB = a.team;
		let subA = {
			matchWin: 0,
			gameWin: 0,
		};
		let subB = {
			matchWin: 0,
			gameWin: 0
		};
		let subAMatchWin = 0, subAGameWin = 0, subBMatchWin = 0, subBGameWin = 0;
		matches.forEach(m => {
			if (!(m[1] === teamA && m[2] === teamB || m[1] === teamB && m[2] === teamA)) return;
			const [homePoint, roadPoint] = m[4].split(':').map(i => i - 0);

			let home, road;
			if (m[1] === teamA) {
				home = subA;
				road = subB;
			} else {
				home = subB;
				road = subA;
			}

			const isHomeWin = homePoint > roadPoint;

			if (isHomeWin) {
				home.matchWin += 1;
			} else {
				road.matchWin += 1;
			}

			home.gameWin += homePoint;
			road.gameWin += roadPoint;
		});

		return 0;
	};

	return rankings.sort(compareRanking);
}

function generateMatches(data, timezone) {
	let lastWeekOfYear;
	let week = 0;

	// project to: week, home, road, datetime, result
	return data.map(i => {
		// calacute week, date
		let datetime = moment(`${i[2]}T${i[3]}${timezone}`);
		let weekOfYear = datetime.isoWeek();
		if (weekOfYear !== lastWeekOfYear) {
			lastWeekOfYear = weekOfYear;
			week += 1;
		}

		return [week, i[0], i[1], datetime, i[4]];
	});
}

function generateRankings(teams, matches, maxWeek = -1) {
	const rankingMap = {};

	teams.forEach(team => {
		rankingMap[team[0]] = {
			team: team[0],
			matchCount: 0,
			gameWin: 0,
			gameLoose: 0,
			matchWin: 0,
			matchLoose: 0
		};
	});

	const validMatches = maxWeek === -1 ? matches.filter(i => !!i[4]) : matches.filter(i => i[0] <= maxWeek);

	validMatches.forEach(match => {
		// skip pending match
		if (!match[4]) return;

		const [homePoint, roadPoint] = match[4].split(':').map(i => i - 0);

		const home = rankingMap[match[1]];
		const road = rankingMap[match[2]];
		const isHomeWin = homePoint > roadPoint;

		home.matchCount += 1;
		road.matchCount += 1;

		if (isHomeWin) {
			home.matchWin += 1;
			road.matchLoose += 1;
		} else {
			home.matchLoose += 1;
			road.matchWin += 1;
		}

		home.gameWin += homePoint;
		home.gameLoose += roadPoint;
		road.gameWin += roadPoint;
		road.gameLoose += homePoint;
	});

	const rankings = Object.values(rankingMap);
	// 每支队伍进行的比赛的 max
	const maxMatchCount = rankings.reduce((prev, cur) => cur.matchCount > prev ? cur.matchCount : prev, 0);

	return {
		matchCount: maxMatchCount,
		rankings: sortRanking(rankings, validMatches),
		rankingMap: rankingMap
	};
}

function getDetailCell(teamX, x, teamY, y, match) {
	if (x === 0 && y === 0) return '<td class="cell__disabled"></td>';
	if (x === y) return '<td class="cell__disabled"></td>';
	if (x === 0) return `<td class="cell__head">${teamY}</td>`;
	if (y === 0) return `<td class="cell__head">${teamX}</td>`;

	if (!match) {
		console.error(`${teamX}, ${x}, ${teamY}, ${y} miss match`);
		return '<td></td>';
	}

	if (!match[4]) {
		return `<td class="cell__pending">${match[3].format('YYYY-MM-DD HH:mm')}</td>`;
	}


	// todo: 单循环赛，应该用 game 数据，0-1 或 1-0
	console.log(`${teamX}, ${x}, ${teamY}, ${y} ${match}`);
	const points = match[4].split(':');
	// 表格的 x/y 和 a:b 的相反
	const [xPoint, yPoint] = teamX === match[1] ? points.reverse() : points;
	const score = xPoint > yPoint ? '0-1' : '1-0';
	const cls = xPoint > yPoint ? 'cell__loose' : 'cell__success';

	return `<td class="${cls}">${score}</td>`;
}

function generateMatchDetails(teams, matches) {
	let html = '';

	teams.forEach((teamX, x) => {
		html += '<tr>';
		teams.forEach((teamY, y) => {
			const xName = teamX[0];
			const yName = teamY[0];
			const match = matches.find(i => i[1] === xName && i[2] === yName || i[1] === yName && i[2] === xName);
			html += getDetailCell(xName, x, yName, y, match);
		});
		html += '</tr>';
	});

	return html;
}