const TIME_ZONE = '+08:00';

// match data，注意按时间先后拍讯
// home, road, date, time, result
const RAW_MATCH_DATA = [
    ['TES', 'SN', '2021-01-09', '17:00', '0:2'], ['OMG', 'EDG', '2021-01-09', '19:00', '1:2'],
    ['WE', 'RW', '2021-01-10', '17:00', '2:0'], ['JDG', 'IG', '2021-01-10', '19:00', '0:2'],

    ['BLG', 'ES', '2021-01-11', '17:00', '2:1'], ['TT', 'RNG', '2021-01-11', '19:00', '0:2'],
    ['OMG', 'FPX', '2021-01-12', '17:00', '0:2'], ['RW', 'TES', '2021-01-12', '19:00', '2:1'],
    ['WE', 'V5', '2021-01-13', '17:00', '2:1'], ['LNG', 'IG', '2021-01-13', '19:00', '2:0'],
    ['JDG', 'BLG', '2021-01-14', '17:00', '2:0'], ['RNG', 'SN', '2021-01-14', '19:00', '2:1'],
    ['RW', 'ES', '2021-01-15', '17:00', '0:2'], ['TES', 'RA', '2021-01-15', '19:00', '2:0'],
    ['V5', 'LGD', '2021-01-16', '17:00', '2:1'], ['EDG', 'FPX', '2021-01-16', '19:00', '2:1'],
    ['LNG', 'TT', '2021-01-17', '17:00', '2:1'], ['WE', 'IG', '2021-01-17', '19:00', '2:1'],

    ['OMG', 'ES', '2021-01-18', '17:00', '1:2'], ['BLG', 'V5', '2021-01-18', '19:00', '1:2'],
    ['RW', 'FPX', '2021-01-19', '17:00', '0:2'], ['EDG', 'LGD', '2021-01-19', '19:00', '2:0'],
    ['IG', 'ES', '2021-01-20', '17:00', '2:0'], ['SN', 'RA', '2021-01-20', '19:00', '0:2'],
    ['TT', 'WE', '2021-01-21', '17:00', '0:2'], ['OMG', 'RNG', '2021-01-21', '19:00', '0:2'],
    ['RA', 'BLG', '2021-01-22', '17:00', '0:2'], ['EDG', 'JDG', '2021-01-22', '19:00', '2:0'],
    ['TES', 'LGD', '2021-01-23', '17:00', '2:0'], ['FPX', 'SN', '2021-01-23', '19:00', '2:0'],
    ['RW', 'V5', '2021-01-24', '17:00', '0:2'], ['LNG', 'WE', '2021-01-24', '19:00', '0:2'],

    ['EDG', 'TT', '2021-01-25', '17:00', '2:0'], ['JDG', 'RA', '2021-01-25', '19:00', '2:0'],
    ['RNG', 'V5', '2021-01-26', '17:00', '2:1'], ['LNG', 'BLG', '2021-01-26', '19:00', '2:1'],
    ['ES', 'FPX', '2021-01-27', '17:00', '0:2'], ['IG', 'RW', '2021-01-27', '19:00', '2:0'],
    ['LGD', 'BLG', '2021-01-28', '17:00', '0:2'], ['OMG', 'SN', '2021-01-28', '19:00', '0:2'],
    ['ES', 'LNG', '2021-01-29', '17:00', '0:2'], ['WE', 'RNG', '2021-01-29', '19:00', '0:2'],
    ['TT', 'V5', '2021-01-30', '17:00', '2:0'], ['IG', 'FPX', '2021-01-30', '19:00', '0:2'],
    ['RA', 'RW', '2021-01-31', '17:00', '2:0'], ['TES', 'JDG', '2021-01-31', '19:00', '2:0'],

    ['SN', 'LGD', '2021-02-01', '17:00', '2:0'], ['BLG', 'RNG', '2021-02-01', '19:00', '2:1'],
    ['RA', 'WE', '2021-02-02', '17:00', '2:0'], ['V5', 'EDG', '2021-02-02', '19:00', '0:2'],
    ['ES', 'TT', '2021-02-03', '17:00', '1:2'], ['JDG', 'RW', '2021-02-03', '19:00', '2:0'],
    ['IG', 'OMG', '2021-02-04', '17:00', '2:0'], ['FPX', 'LNG', '2021-02-04', '19:00', '2:0'],
    ['LGD', 'TT', '2021-02-05', '17:00', '2:0'], ['EDG', 'SN', '2021-02-05', '19:00', '2:0'],
    ['BLG', 'OMG', '2021-02-06', '15:00', '1:2'], ['JDG', 'WE', '2021-02-06', '17:00', '2:0'], ['FPX', 'TES', '2021-02-06', '19:00', '2:0'],
    ['LNG', 'RA', '2021-02-07', '15:00', '0:2'], ['V5', 'ES', '2021-02-07', '17:00', '2:1'], ['IG', 'RNG', '2021-02-07', '19:00', '1:2'],

    ['SN', 'JDG', '2021-02-22', '17:00', '0:2'], ['FPX', 'WE', '2021-02-22', '19:00', '0:2'],
    ['BLG', 'EDG', '2021-02-23', '17:00', '0:2'], ['TES', 'LNG', '2021-02-23', '19:00', '2:0'],
    ['TT', 'RA', '2021-02-24', '17:00', '1:2'], ['WE', 'ES', '2021-02-24', '19:00', '2:0'],
    ['OMG', 'V5', '2021-02-25', '17:00', '0:2'], ['RW', 'RNG', '2021-02-25', '19:00', '0:2'],
    ['JDG', 'TT', '2021-02-26', '17:00', '2:1'], ['IG', 'EDG', '2021-02-26', '19:00', '2:0'],
    ['LGD', 'RW', '2021-02-27', '15:00', '2:1'], ['ES', 'TES', '2021-02-27', '17:00', '0:2'], ['RNG', 'FPX', '2021-02-27', '19:00', '2:0'],
    ['V5', 'LNG', '2021-02-28', '15:00', '0:2'], ['RA', 'OMG', '2021-02-28', '17:00', '2:1'], ['SN', 'IG', '2021-02-28', '19:00', '2:0'],

    ['RW', 'EDG', '2021-03-01', '17:00', '0:2'], ['FPX', 'JDG', '2021-03-01', '19:00', '2:0'],
    ['SN', 'TT', '2021-03-02', '17:00', '2:0'], ['BLG', 'IG', '2021-03-02', '19:00', '0:2'],
    ['ES', 'RA', '2021-03-03', '17:00', '0:2'], ['LGD', 'WE', '2021-03-03', '19:00', '0:2'],
    ['RNG', 'LNG', '2021-03-04', '17:00', '2:0'], ['OMG', 'TES', '2021-03-04', '19:00', '0:2'],
    ['ES', 'JDG', '2021-03-05', '17:00', '0:2'], ['V5', 'SN', '2021-03-05', '19:00', '0:2'],
    ['LNG', 'LGD', '2021-03-06', '15:00', ''], ['FPX', 'RA', '2021-03-06', '17:00', ''], ['RNG', 'EDG', '2021-03-06', '19:00', ''],
    ['RW', 'OMG', '2021-03-07', '15:00', ''], ['TT', 'BLG', '2021-03-07', '17:00', ''], ['IG', 'TES', '2021-03-07', '19:00', ''],

    ['V5', 'JDG', '2021-03-08', '17:00', ''], ['RNG', 'ES', '2021-03-08', '19:00', ''],
    ['FPX', 'LGD', '2021-03-09', '17:00', ''], ['TES', 'BLG', '2021-03-09', '19:00', ''],
    ['RA', 'V5', '2021-03-10', '17:00', ''], ['SN', 'RW', '2021-03-10', '19:00', ''],
    ['WE', 'OMG', '2021-03-11', '17:00', ''], ['EDG', 'LNG', '2021-03-11', '19:00', ''],
    ['ES', 'LGD', '2021-03-12', '17:00', ''], ['FPX', 'TT', '2021-03-12', '19:00', ''],
    ['BLG', 'RW', '2021-03-13', '15:00', ''], ['RA', 'IG', '2021-03-13', '17:00', ''], ['EDG', 'TES', '2021-03-13', '19:00', ''],
    ['OMG', 'LNG', '2021-03-14', '15:00', ''], ['SN', 'WE', '2021-03-14', '17:00', ''], ['RNG', 'JDG', '2021-03-14', '19:00', ''],

    ['LGD', 'RA', '2021-03-15', '17:00', ''], ['TT', 'IG', '2021-03-15', '19:00', ''],
    ['LGD', 'OMG', '2021-03-17', '17:00', ''], ['V5', 'TES', '2021-03-17', '19:00', ''],
    ['TT', 'RW', '2021-03-18', '17:00', ''], ['WE', 'BLG', '2021-03-18', '19:00', ''],
    ['EDG', 'ES', '2021-03-19', '17:00', ''], ['LNG', 'JDG', '2021-03-19', '19:00', ''],
    ['V5', 'FPX', '2021-03-20', '17:00', ''], ['RNG', 'TES', '2021-03-20', '19:00', ''],
    ['JDG', 'LGD', '2021-03-21', '17:00', ''], ['LNG', 'SN', '2021-03-21', '19:00', ''],


    ['RA', 'RNG', '2021-03-22', '17:00', ''], ['IG', 'V5', '2021-03-22', '19:00', ''],
    ['JDG', 'OMG', '2021-03-23', '17:00', ''], ['SN', 'BLG', '2021-03-23', '19:00', ''],
    ['TES', 'TT', '2021-03-24', '17:00', ''], ['WE', 'EDG', '2021-03-24', '19:00', ''],
    ['RW', 'LNG', '2021-03-25', '17:00', ''], ['LGD', 'IG', '2021-03-25', '19:00', ''],
    ['ES', 'SN', '2021-03-26', '17:00', ''], ['BLG', 'FPX', '2021-03-26', '19:00', ''],
    ['TT', 'OMG', '2021-03-27', '17:00', ''], ['TES', 'WE', '2021-03-27', '19:00', ''],
    ['LGD', 'RNG', '2021-03-28', '17:00', ''], ['RA', 'EDG', '2021-03-28', '19:00', ''],

];
