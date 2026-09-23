const http = require('http');

http.get('http://localhost:3000/', res => {
  console.log('HTTP Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML size:', data.length);
    const requiredSections = [
      'home', 'mission', 'included', 'journey', 'itinerary',
      'experiences', 'stem-robotics', 'cultural-exchange',
      'outcomes', 'ambassador', 'contact', 'day-1', 'day-2',
      'day-3', 'day-4', 'day-5', 'day-6', 'day-7', 'day-8'
    ];
    const missing = requiredSections.filter(id => !data.includes('id="' + id + '"'));
    console.log('Missing IDs:', missing.length === 0 ? 'None (ALL PRESENT!)' : missing);
    console.log('Has Augmented Intelligence:', data.includes('Augmented Intelligence'));
    console.log('Has Autonomous Mobility:', data.includes('Autonomous Mobility'));
    console.log('Has Super 30:', data.includes('Super 30'));
    console.log('Has 500+ Students:', data.includes('500+'));
  });
}).on('error', err => console.error('Error:', err.message));
