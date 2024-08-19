export interface LogEntry {
    eventType: string;
    stationId: string;
    bottleCount?: number;
    canCount?: number;
    voucherAmount?: number;
  }