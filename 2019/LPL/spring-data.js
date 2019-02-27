const TIME_ZONE = '+08:00';

// match data，注意按时间先后拍讯
// home, road, date, time, result
const RAW_MATCH_DATA = [
    ['TOP', 'IG', '2019-01-14', '17:00', '0:2'], ['FPX', 'RW', '2019-01-14', '19:00', '2:0'],
    ['EDG', 'SDG', '2019-01-15', '17:00', '2:0'], ['LGD', 'BLG', '2019-01-15', '19:00', '0:2'],
    ['SN', 'VG', '2019-01-16', '17:00', '2:1'], ['IG', 'OMG', '2019-01-16', '19:00', '2:0'],
    ['V5', 'TOP', '2019-01-18', '17:00', '1:2'], ['EDG', 'SS', '2019-01-18', '19:00', '1:2'],
    ['WE', 'SDG', '2019-01-19', '17:00', '0:2'], ['JDG', 'RW', '2019-01-19', '19:00', '2:1'],
    ['FPX', 'SS', '2019-01-20', '17:00', '2:1'], ['SN', 'RNG', '2019-01-20', '19:00', '2:0'],

    ['OMG', 'BLG', '2019-01-21', '17:00', '2:0'], ['IG', 'RW', '2019-01-21', '19:00', '2:0'],
    ['SS', 'SDG', '2019-01-22', '17:00', '0:2'], ['LGD', 'RNG', '2019-01-22', '19:00', '1:2'],
    ['WE', 'SN', '2019-01-23', '17:00', '0:2'], ['FPX', 'JDG', '2019-01-23', '19:00', '2:0'],
    ['V5', 'BLG', '2019-01-25', '17:00', '0:2'], ['EDG', 'VG', '2019-01-25', '19:00', '2:1'],
    ['RW', 'LGD', '2019-01-26', '17:00', '2:1'], ['TOP', 'OMG', '2019-01-26', '19:00', '2:0'],
    ['SN', 'SS', '2019-01-27', '17:00', '2:0'], ['IG', 'JDG', '2019-01-27', '19:00', '1:2'],

    ['SDG', 'VG', '2019-01-28', '17:00', '1:2'], ['OMG', 'V5', '2019-01-28', '19:00', '0:2'],
    ['LGD', 'TOP', '2019-01-29', '17:00', '0:2'], ['WE', 'EDG', '2019-01-29', '19:00', '2:0'],
    ['IG', 'SS', '2019-01-30', '17:00', '2:0'], ['SN', 'FPX', '2019-01-30', '19:00', '1:2'],

    ['VG', 'RNG', '2019-02-15', '17:00', '0:2'], ['SDG', 'RW', '2019-02-15', '19:00', '2:0'],
    ['BLG', 'JDG', '2019-02-16', '17:00', '0:2'], ['IG', 'LGD', '2019-02-16', '19:00', '0:2'],
    ['WE', 'FPX', '2019-02-17', '17:00', '0:2'], ['RNG', 'EDG', '2019-02-17', '19:00', '2:0'],

    ['SS', 'BLG', '2019-02-18', '17:00', '1:2'], ['TOP', 'JDG', '2019-02-18', '19:00', '2:0'],
    ['FPX', 'LGD', '2019-02-19', '17:00', '2:1'], ['RW', 'SN', '2019-02-19', '19:00', '2:0'],
    ['VG', 'V5', '2019-02-20', '17:00', '1:2'], ['WE', 'OMG', '2019-02-20', '19:00', '2:1'],
    ['IG', 'SDG', '2019-02-22', '17:00', '2:0'], ['SN', 'EDG', '2019-02-22', '19:00', '0:2'],
    ['SS', 'VG', '2019-02-23', '14:00', '2:1'], ['LGD', 'V5', '2019-02-23', '17:00', '0:2'], ['RNG', 'TOP', '2019-02-23', '19:00', '0:2'],
    ['JDG', 'OMG', '2019-02-24', '14:00', '2:1'], ['BLG', 'SDG', '2019-02-24', '17:00', '2:1'], ['RW', 'EDG', '2019-02-24', '19:00', '0:2'],

    ['LGD', 'WE', '2019-02-25', '17:00', '0:2'], ['IG', 'SN', '2019-02-25', '19:00', '2:0'],
    ['TOP', 'SDG', '2019-02-26', '17:00', '1:2'], ['FPX', 'OMG', '2019-02-26', '19:00', '2:0'],
    ['JDG', 'V5', '2019-02-27', '17:00', ''], ['RW', 'SS', '2019-02-27', '19:00', ''],
    ['RNG', 'WE', '2019-03-01', '17:00', ''], ['SS', 'TOP', '2019-03-01', '19:00', ''],
    ['LGD', 'VG', '2019-03-02', '14:00', ''], ['RW', 'BLG', '2019-03-02', '17:00', ''], ['EDG', 'JDG', '2019-03-02', '19:00', ''],
    ['RNG', 'V5', '2019-03-03', '14:00', ''], ['SN', 'OMG', '2019-03-03', '17:00', ''], ['IG', 'FPX', '2019-03-03', '19:00', ''],

    ['VG', 'BLG', '2019-03-04', '17:00', ''], ['WE', 'SS', '2019-03-04', '19:00', ''],
    ['OMG', 'SDG', '2019-03-05', '17:00', ''], ['LGD', 'SN', '2019-03-05', '19:00', ''],
    ['RNG', 'FPX', '2019-03-06', '17:00', ''], ['IG', 'V5', '2019-03-06', '19:00', ''],
    ['TOP', 'VG', '2019-03-08', '17:00', ''], ['EDG', 'LGD', '2019-03-08', '19:00', ''],
    ['JDG', 'SDG', '2019-03-09', '14:00', ''], ['RW', 'V5', '2019-03-09', '17:00', ''], ['BLG', 'SN', '2019-03-09', '19:00', ''],
    ['TOP', 'FPX', '2019-03-10', '14:00', ''], ['IG', 'WE', '2019-03-10', '17:00', ''], ['RNG', 'SS', '2019-03-10', '19:00', ''],

    ['JDG', 'VG', '2019-03-11', '17:00', ''], ['EDG', 'OMG', '2019-03-11', '19:00', ''],
    ['WE', 'BLG', '2019-03-12', '17:00', ''], ['SN', 'TOP', '2019-03-12', '19:00', ''],
    ['SS', 'V5', '2019-03-13', '17:00', ''], ['RNG', 'RW', '2019-03-13', '19:00', ''],
    ['EDG', 'FPX', '2019-03-15', '17:00', ''], ['IG', 'VG', '2019-03-15', '19:00', ''],
    ['V5', 'WE', '2019-03-16', '14:00', ''], ['RW', 'TOP', '2019-03-16', '17:00', ''], ['JDG', 'SN', '2019-03-16', '19:00', ''],
    ['LGD', 'OMG', '2019-03-17', '14:00', ''], ['RNG', 'BLG', '2019-03-17', '17:00', ''], ['FPX', 'SDG', '2019-03-17', '19:00', ''],

    ['RW', 'VG', '2019-03-18', '17:00', ''], ['JDG', 'SS', '2019-03-18', '19:00', ''],
    ['V5', 'SDG', '2019-03-19', '17:00', ''], ['WE', 'TOP', '2019-03-19', '19:00', ''],
    ['EDG', 'BLG', '2019-03-20', '17:00', ''], ['RNG', 'JDG', '2019-03-20', '19:00', ''],
    ['SDG', 'LGD', '2019-03-22', '17:00', ''], ['SS', 'OMG', '2019-03-22', '19:00', ''],
    ['SN', 'V5', '2019-03-23', '14:00', ''], ['EDG', 'TOP', '2019-03-23', '17:00', ''], ['RNG', 'IG', '2019-03-23', '19:00', ''],
    ['FPX', 'BLG', '2019-03-24', '14:00', ''], ['VG', 'WE', '2019-03-24', '17:00', ''], ['RW', 'OMG', '2019-03-24', '19:00', ''],

    ['EDG', 'V5', '2019-03-25', '17:00', ''], ['RNG', 'SDG', '2019-03-25', '19:00', ''],
    ['BLG', 'IG', '2019-03-26', '17:00', ''], ['JDG', 'LGD', '2019-03-26', '19:00', ''],
    ['FPX', 'VG', '2019-03-27', '17:00', ''], ['OMG', 'RNG', '2019-03-27', '19:00', ''],
    ['RW', 'WE', '2019-03-29', '17:00', ''], ['LGD', 'SS', '2019-03-29', '19:00', ''],
    ['FPX', 'V5', '2019-03-30', '14:00', ''], ['TOP', 'BLG', '2019-03-30', '17:00', ''], ['IG', 'EDG', '2019-03-30', '19:00', ''],
    ['SN', 'SDG', '2019-03-31', '14:00', ''], ['OMG', 'VG', '2019-03-31', '17:00', ''], ['JDG', 'WE', '2019-03-31', '19:00', '']
];
