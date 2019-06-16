const TIME_ZONE = '+08:00';

// match data，注意按时间先后拍讯
// home, road, date, time, result
const RAW_MATCH_DATA = [
    ['DMO', 'EDG', '2019-06-01', '17:00', '0:2'], ['JDG', 'FPX', '2019-06-01', '19:00', '0:2'],
    ['LGD', 'V5', '2019-06-02', '17:00', '2:1'], ['WE', 'RNG', '2019-06-02', '19:00', '0:2'],

    ['SN', 'VG', '2019-06-03', '17:00', '2:1'], ['IG', 'DMO', '2019-06-03', '19:00', '2:1'],
    ['BLG', 'V5', '2019-06-05', '17:00', '2:0'], ['LNG', 'JDG', '2019-06-05', '19:00', '2:1'],
    ['LGD', 'RNG', '2019-06-06', '17:00', '1:2'], ['WE', 'OMG', '2019-06-06', '19:00', '1:2'],
    ['BLG', 'FPX', '2019-06-07', '17:00', '0:2'], ['IG', 'LNG', '2019-06-07', '19:00', '0:2'],
    ['VG', 'TES', '2019-06-08', '17:00', '1:2'], ['RW', 'RNG', '2019-06-08', '19:00', '0:2'],
    ['SN', 'LGD', '2019-06-09', '17:00', '2:0'], ['EDG', 'JDG', '2019-06-09', '19:00', '2:0'],

    ['OMG', 'BLG', '2019-06-10', '17:00', '1:2'], ['IG', 'V5', '2019-06-10', '19:00', '1:2'],
    ['DMO', 'LNG', '2019-06-11', '17:00', '0:2'], ['FPX', 'RW', '2019-06-11', '19:00', '2:0'],
    ['SN', 'WE', '2019-06-12', '17:00', '2:0'], ['BLG', 'EDG', '2019-06-12', '19:00', '0:2'],
    ['DMO', 'TES', '2019-06-14', '17:00', '0:2'], ['OMG', 'LGD', '2019-06-14', '19:00', '0:2'],
    ['VG', 'RNG', '2019-06-15', '17:00', '0:2'], ['IG', 'EDG', '2019-06-15', '19:00', '2:1'],
    ['FPX', 'WE', '2019-06-16', '17:00', ''], ['SN', 'JDG', '2019-06-16', '19:00', ''],

    ['VG', 'V5', '2019-06-17', '17:00', ''], ['TES', 'RW', '2019-06-17', '19:00', ''],
    ['DMO', 'SN', '2019-06-18', '17:00', ''], ['FPX', 'LGD', '2019-06-18', '19:00', ''],
    ['OMG', 'RW', '2019-06-19', '17:00', ''], ['LNG', 'WE', '2019-06-19', '19:00', ''],
    ['BLG', 'LNG', '2019-06-21', '17:00', ''], ['EDG', 'WE', '2019-06-21', '19:00', ''],
    ['JDG', 'VG', '2019-06-22', '17:00', ''], ['IG', 'TES', '2019-06-22', '19:00', ''],
    ['V5', 'OMG', '2019-06-23', '17:00', ''], ['FPX', 'RNG', '2019-06-23', '19:00', ''],

    ['BLG', 'TES', '2019-06-24', '17:00', ''], ['IG', 'SN', '2019-06-24', '19:00', ''],
    ['LGD', 'LNG', '2019-06-25', '17:00', ''], ['RW', 'EDG', '2019-06-25', '19:00', ''],
    ['VG', 'DMO', '2019-06-26', '17:00', ''], ['V5', 'FPX', '2019-06-26', '19:00', ''],
    ['BLG', 'SN', '2019-06-28', '17:00', ''], ['RW', 'LNG', '2019-06-28', '19:00', ''],
    ['TES', 'WE', '2019-06-29', '17:00', ''], ['IG', 'JDG', '2019-06-29', '19:00', ''],
    ['LGD', 'EDG', '2019-06-30', '17:00', ''], ['OMG', 'RNG', '2019-06-30', '19:00', ''],

    ['JDG', 'WE', '2019-07-12', '17:00', ''], ['DMO', 'BLG', '2019-07-12', '19:00', ''],
    ['FPX', 'VG', '2019-07-13', '17:00', ''], ['OMG', 'IG', '2019-07-13', '19:00', ''],
    ['LNG', 'EDG', '2019-07-14', '17:00', ''], ['TES', 'JDG', '2019-07-14', '19:00', ''],

    ['V5', 'RW', '2019-07-15', '17:00', ''], ['VG', 'IG', '2019-07-15', '19:00', ''],
    ['WE', 'DMO', '2019-07-16', '17:00', ''], ['BLG', 'JDG', '2019-07-16', '19:00', ''],
    ['OMG', 'LNG', '2019-07-17', '19:00', ''], ['EDG', 'V5', '2019-07-17', '19:00', ''],
    ['OMG', 'VG', '2019-07-19', '17:00', ''], ['TES', 'LGD', '2019-07-19', '19:00', ''],
    ['SN', 'RW', '2019-07-20', '17:00', ''], ['RNG', 'EDG', '2019-07-20', '19:00', ''],
    ['DMO', 'JDG', '2019-07-21', '17:00', ''], ['FPX', 'IG', '2019-07-21', '19:00', ''],

    ['TES', 'SN', '2019-07-22', '17:00', ''], ['RNG', 'V5', '2019-07-22', '19:00', ''],
    ['RW', 'LGD', '2019-07-23', '17:00', ''], ['BLG', 'WE', '2019-07-23', '19:00', ''],
    ['FPX', 'OMG', '2019-07-24', '17:00', ''], ['LNG', 'TES', '2019-07-24', '19:00', ''],
    ['VG', 'BLG', '2019-07-26', '19:00', ''], ['V5', 'JDG', '2019-07-26', '19:00', ''],
    ['RNG', 'LNG', '2019-07-27', '17:00', ''], ['EDG', 'FPX', '2019-07-27', '19:00', ''],
    ['RW', 'DMO', '2019-07-28', '17:00', ''], ['WE', 'IG', '2019-07-28', '19:00', ''],

    ['V5', 'TES', '2019-07-29', '17:00', ''], ['RNG', 'SN', '2019-07-29', '19:00', ''],
    ['WE', 'VG', '2019-07-30', '17:00', ''], ['LGD', 'DMO', '2019-07-30', '19:00', ''],
    ['LNG', 'FPX', '2019-07-31', '17:00', ''], ['EDG', 'OMG', '2019-07-31', '19:00', ''],
    ['V5', 'SN', '2019-08-02', '17:00', ''], ['JDG', 'RW', '2019-08-02', '19:00', ''],
    ['OMG', 'DMO', '2019-08-03', '19:00', ''], ['RNG', 'TES', '2019-08-03', '19:00', ''],
    ['IG', 'BLG', '2019-08-04', '17:00', ''], ['WE', 'LGD', '2019-08-04', '19:00', ''],

    ['SN', 'OMG', '2019-08-05', '17:00', ''], ['LNG', 'V5', '2019-08-05', '19:00', ''],
    ['RW', 'BLG', '2019-08-06', '17:00', ''], ['RNG', 'DMO', '2019-08-06', '19:00', ''],
    ['VG', 'LNG', '2019-08-07', '17:00', ''], ['JDG', 'LGD', '2019-08-07', '19:00', ''],
    ['WE', 'RW', '2019-08-09', '17:00', ''], ['VG', 'EDG', '2019-08-09', '19:00', ''],
    ['LGD', 'BLG', '2019-08-10', '17:00', ''], ['RNG', 'IG', '2019-08-10', '19:00', ''],
    ['SN', 'FPX', '2019-08-11', '19:00', ''], ['EDG', 'TES', '2019-08-11', '19:00', ''],

    ['JDG', 'OMG', '2019-08-12', '17:00', ''], ['DMO', 'V5', '2019-08-12', '19:00', ''],
    ['RW', 'VG', '2019-08-13', '17:00', ''], ['LGD', 'IG',  '2019-08-13', '19:00', ''],
    ['EDG', 'SN',  '2019-08-14', '17:00', ''], ['RNG', 'BLG', '2019-08-14', '19:00', ''],
    ['DMO', 'FPX', '2019-08-16', '17:00', ''], ['TES', 'OMG','2019-08-16', '19:00', ''],
    ['JDG', 'RNG', '2019-08-17', '14:00', ''], ['V5', 'WE', '2019-08-17', '17:00', ''], ['RW', 'IG', '2019-08-17', '19:00', ''],
    ['LGD', 'VG', '2019-08-18', '14:00', ''],   ['LNG', 'SN', '2019-08-18', '17:00', ''], ['TES', 'FPX', '2019-08-18', '19:00', '']
];
