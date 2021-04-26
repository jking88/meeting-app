import NewWindow from "react-new-window";
import { Meeting } from "../interfaces/Meeting";
import { formatTime } from "../shared/util";
import "./LiveWindow.scss";

function LiveWindow(props: Meeting) {
  return (
    <NewWindow>
      <div key={props.id} className="live-window-wrapper">
        <div className="live-window">
          <div className="live-window-body">
            {props.isActiveMeeting
              ? "Waiting for others to join..."
              : "This meeting as ended"}
            <br></br>
            <br></br>
            {props.isActiveMeeting ? props.meetingIncrement : null}
          </div>
          <div className="live-window-footer">
            {props.isActiveMeeting ? (
              <>
                <button
                  className="live-window-footer__button"
                  onClick={() => {
                    props.handleEndingMeeting();
                  }}
                >
                  Stop meeting
                </button>
                <div className="live-window-footer__time">
                  {formatTime(props.meetingTime)}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </NewWindow>
  );
}

export default LiveWindow;
