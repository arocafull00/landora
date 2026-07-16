export type EmployeeOptionDto = {
  id: string;
  name: string;
};

export type BookingSettingsDto = {
  enabled: boolean;
  timezone: string;
  autoConfirmBookings: boolean;
  minAdvanceHours: number;
  maxAdvanceDays: number;
  slotGranularityMinutes: number;
  notificationEmail: string;
};
