import { LogEntry } from '../types/models';

const API_URL = 'http://localhost:5035/api/bottleDepositMachine/logs';

export class LoggingService {

    static async logEvent(logEntry: LogEntry ): Promise<void> {
        console.log("logEntry", logEntry);
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(logEntry),
          });
    
          if (!response.ok) {
            console.error('Failed to log event:', response.statusText);
          }
        } catch (error) {
          console.error('Error logging event:', error);
        }
      }
  }
  