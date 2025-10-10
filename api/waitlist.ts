import { VercelRequest, VercelResponse } from '@vercel/node';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface WaitlistEntry {
  name: string;
  email: string;
  practiceType: string;
  timestamp: string;
  userAgent?: string;
  ip?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, practiceType } = req.body;

    // Validation
    if (!name || !email || !practiceType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Create entry
    const entry: WaitlistEntry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      practiceType,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      ip: (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress,
    };

    // Store in JSON file (simple storage)
    const dataDir = '/tmp';
    const filePath = join(dataDir, 'waitlist.json');

    let entries: WaitlistEntry[] = [];
    if (existsSync(filePath)) {
      const fileContent = readFileSync(filePath, 'utf-8');
      entries = JSON.parse(fileContent);
    }

    // Check for duplicate
    const isDuplicate = entries.some(e => e.email === entry.email);
    if (isDuplicate) {
      return res.status(200).json({
        success: true,
        message: 'Already registered',
        duplicate: true
      });
    }

    // Add new entry
    entries.push(entry);
    writeFileSync(filePath, JSON.stringify(entries, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Successfully added to waitlist'
    });

  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
