import "./Dashboard.scss";
import { useRef, useState } from "react";
import LiveWindow from "./LiveWindow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Meeting } from "../interfaces/Meeting";
import { formatTime } from "../shared/util";

function Dashboard() {
  const [isMeetingRunning, setIsMeetingRunning] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingIdCount, setMeetingIdCount] = useState<number>(1);
  const [meetingTime, setMeetingTime] = useState<number>(0);

  const meetingTimeRef = useRef<any>(null);

  /*
   ** Starts the active meeting timer
   */
  const runTimer = () => {
    meetingTimeRef.current = setInterval(() => {
      setMeetingTime((meetingTime) => meetingTime + 1);
    }, 1000);
  };

  /*
   ** Stops the active meeting timer
   */
  const stopTimer = () => {
    clearInterval(meetingTimeRef.current);
    setMeetingTime(0);
  };

  /*
   ** Adds one to the increment count of the active meeting
   */
  const incrementMeetingCount = () => {
    setMeetings(
      meetings.map((meeting: Meeting) => {
        if (meeting.isActiveMeeting) {
          meeting.meetingIncrement = meeting.meetingIncrement + 1;
        }
        return {
          ...meeting,
        };
      })
    );
  };

  /*
   ** Starts a new meeting
   */
  const startNewMeeting = () => {
    setIsMeetingRunning(true);
    runTimer();
    let newMeeting: Meeting = {
      id: meetingIdCount,
      meetingIncrement: 0,
      meetingTime: 0,
      handleEndingMeeting: () => handleEndingMeeting,
      isActiveMeeting: true,
    };
    setMeetings((meetings: Meeting[]) => meetings.concat(newMeeting));
  };

  /*
   ** Ends an active meeting
   */
  const handleEndingMeeting = () => {
    setIsMeetingRunning(false);
    stopTimer();
    setMeetingIdCount(meetingIdCount + 1);
    setMeetings((meetings: Meeting[]) =>
      meetings.map((meeting: Meeting) => {
        if (meeting.isActiveMeeting) {
          meeting.isActiveMeeting = false;
          meeting.meetingTime = meetingTime;
        }
        return {
          ...meeting,
        };
      })
    );
  };

  return (
    <div className="dashboard-wrapper">
      <div className="meeting-history-wrapper">
        <h1 className="meeting-history-header">Meeting History</h1>
        <List className="meeting-history-list">
          {meetings.map((meeting: Meeting) => (
            <div key={meeting.id}>
              <ListItem alignItems="center">
                <ListItemText
                  primary={"Meeting " + meeting.id}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Counter - {meeting.meetingIncrement}
                        <br></br>
                        {meeting.isActiveMeeting
                          ? `Time - ${formatTime(meetingTime)}`
                          : `Time - ${formatTime(meeting.meetingTime)}`}
                      </Typography>
                    </React.Fragment>
                  }
                />
                {meeting.isActiveMeeting ? (
                  <span className="active-meeting">Active</span>
                ) : (
                  <span className="closed-meeting">Closed</span>
                )}
              </ListItem>
              <Divider variant="middle" component="li" />
            </div>
          ))}
        </List>
      </div>
      <div className="start-dashboard">
        {isMeetingRunning ? (
          <>
            <button
              className="stop-meeting"
              onClick={() => handleEndingMeeting()}
            >
              Stop meeting
            </button>
            <button
              className="increment-meeting"
              onClick={() => incrementMeetingCount()}
            >
              Increment Count
            </button>
          </>
        ) : (
          <button className="start-meeting" onClick={() => startNewMeeting()}>
            Start meeting
          </button>
        )}
        {meetings.map((meeting: Meeting) => (
          <LiveWindow
            key={meeting.id}
            id={meeting.id}
            meetingTime={meetingTime}
            meetingIncrement={meeting.meetingIncrement}
            isActiveMeeting={meeting.isActiveMeeting}
            handleEndingMeeting={handleEndingMeeting}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
