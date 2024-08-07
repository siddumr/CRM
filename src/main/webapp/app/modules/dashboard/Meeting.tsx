// Meeting.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Alert } from 'reactstrap';
import './Meeting.scss'; // Ensure you have custom CSS for styling

interface Meeting {
  id: number;
  title: string;
  from: string;
  to: string;
  realated_to: string;
  contact_name: string;
  host: string;
}

const Meeting: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('/api/meetings');
        setMeetings(response.data);
      } catch (err) {
        setError('Error fetching meetings data');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="meeting-container">
      <h2>Meetings</h2>
      {loading && <Spinner color="primary" />}
      {error && <Alert color="danger">{error}</Alert>}
      <div className="timeline">
        {meetings.length > 0
          ? meetings.map((meeting, index) => (
              <div className="timeline-item" key={meeting.id}>
                <div className="timeline-date">{meeting.from}</div>
                <div className="timeline-content">
                  <h5>{meeting.title}</h5>
                  <p>
                    <strong>To:</strong> {meeting.to}
                  </p>
                  <p>
                    <strong>Related To:</strong> {meeting.realated_to}
                  </p>
                  <p>
                    <strong>Contact Name:</strong> {meeting.contact_name}
                  </p>
                  <p>
                    <strong>Host:</strong> {meeting.host}
                  </p>
                </div>
              </div>
            ))
          : !loading && <p>No meetings available.</p>}
      </div>
    </div>
  );
};

export default Meeting;
