export interface Meeting {
  id: number;
  isActiveMeeting: boolean;
  meetingTime: any;
  meetingIncrement: number;
  handleEndingMeeting: () => void;
}
