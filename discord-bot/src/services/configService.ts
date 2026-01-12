import axios from 'axios';
import { log } from '../utils/logger.js';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export interface BotConfig {
  systemInstructions: string;
  allowedChannels: string[];
  isActive: boolean;
}

let cachedConfig: BotConfig | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 seconds

export async function getBotConfig(): Promise<BotConfig> {
  const now = Date.now();
  
  // Return cached config if still fresh
  if (cachedConfig && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedConfig;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/bot`);
    const config: BotConfig | null = response.data;
    
    // Cache the config if valid
    if (config) {
      cachedConfig = config;
      lastFetchTime = now;
      log.info('Fetched bot configuration', { config: cachedConfig });
      return cachedConfig;
    }
    
    throw new Error('Invalid config received');
  } catch (error) {
    log.error('Failed to fetch bot config', error);
    
    // Return cached config if available, otherwise default
    if (cachedConfig) {
      return cachedConfig;
    }
    
    return {
      systemInstructions: 'You are a helpful assistant.',
      allowedChannels: [],
      isActive: false,
    };
  }
}

export function clearConfigCache() {
  cachedConfig = null;
  lastFetchTime = 0;
}
