const Airtable = require('airtable');

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map();

// Rate limit: 5 requests per hour per IP
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production'
    ? 'https://enablesleep.com'
    : '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Get client IP for rate limiting
    const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0] ||
                     req.headers['x-real-ip'] ||
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        error: 'Too many submissions. Please try again later.'
      });
    }

    // Validate environment variables
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.error('Missing Airtable credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Parse and validate request body
    const { name, email, role, notes } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Initialize Airtable
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID);

    // Create record in Airtable
    await base('Email Submissions').create([
      {
        fields: {
          Name: name || '',
          Email: email,
          Role: role || '',
          Notes: notes || '',
          'Submitted At': new Date().toISOString(),
        },
      },
    ]);

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Successfully submitted!'
    });

  } catch (error) {
    console.error('Error submitting to Airtable:', error);

    // Don't expose internal errors to client
    return res.status(500).json({
      error: 'Failed to submit. Please try again later.'
    });
  }
};
