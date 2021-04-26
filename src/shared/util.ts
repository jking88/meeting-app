/*
 ** Formats the time to mm:ss
 */
export function formatTime(meetingTime: number): string {
  const getSeconds: string = `0${meetingTime % 60}`.slice(-2);
  const minutes: number = Math.floor(meetingTime / 60);
  const getMinutes: string = `0${minutes % 60}`.slice(-2);

  return `${getMinutes} : ${getSeconds}`;
}
