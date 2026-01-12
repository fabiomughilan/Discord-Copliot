export function logger(level: 'info' | 'warn' | 'error', message: string, meta?: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  if (meta) {
    console.log(logMessage, meta);
  } else {
    console.log(logMessage);
  }
}

export const log = {
  info: (message: string, meta?: any) => logger('info', message, meta),
  warn: (message: string, meta?: any) => logger('warn', message, meta),
  error: (message: string, meta?: any) => logger('error', message, meta),
};
