// Mock Database using Constants
const STATIONS = [
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'MMCT', name: 'Mumbai Central' },
  { code: 'HWH', name: 'Howrah Junction' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'SBC', name: 'KSR Bengaluru' },
  { code: 'PNBE', name: 'Patna Junction' },
  { code: 'ADI', name: 'Ahmedabad Junction' }
];

const TRAINS = [
  {
    trainNo: '12952',
    name: 'Mumbai Rajdhani',
    source: 'NDLS',
    destination: 'MMCT',
    departureTime: '16:55',
    arrivalTime: '08:35',
    duration: '15h 40m',
    classes: ['1A', '2A', '3A'],
    fares: { '1A': 4850, '2A': 2950, '3A': 2150 }
  },
  {
    trainNo: '12004',
    name: 'New Delhi Shatabdi',
    source: 'NDLS',
    destination: 'LKO', /* Lucknow just for variety, though not in station list, will keep to known stations for search logic */
    departureTime: '06:10',
    arrivalTime: '12:40',
    duration: '06h 30m',
    classes: ['EC', 'CC'],
    fares: { 'EC': 1850, 'CC': 950 }
  },
  {
    trainNo: '12229',
    name: 'Lucknow Mail',
    source: 'NDLS',
    destination: 'LKO',
    departureTime: '22:00',
    arrivalTime: '06:50',
    duration: '08h 50m',
    classes: ['1A', '2A', '3A', 'SL'],
    fares: { '1A': 2400, '2A': 1400, '3A': 1000, 'SL': 400 }
  },
  {
    trainNo: '12628',
    name: 'Karnataka Exp',
    source: 'NDLS',
    destination: 'SBC',
    departureTime: '20:20',
    arrivalTime: '12:00',
    duration: '39h 40m',
    classes: ['1A', '2A', '3A', 'SL'],
    fares: { '1A': 5800, '2A': 3400, '3A': 2400, 'SL': 950 }
  },
  {
    trainNo: '12840',
    name: 'Howrah Mail',
    source: 'MAS',
    destination: 'HWH',
    departureTime: '19:15',
    arrivalTime: '23:00',
    duration: '27h 45m',
    classes: ['1A', '2A', '3A', 'SL'],
    fares: { '1A': 4200, '2A': 2500, '3A': 1800, 'SL': 700 }
  }
];

// In a real app we would export these, but since we are using plain script tags, they will be attached to the window object.
window.STATIONS = STATIONS;
window.TRAINS = TRAINS;
