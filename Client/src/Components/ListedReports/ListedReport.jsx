import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ListedReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    if (!userId) {
      Swal.fire('Error', 'User ID not found. Please log in again.', 'error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/report/fetchdata/${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          Swal.fire('Info', 'No reports found.', 'info');
          setReports([]);
        }
      } else {
        Swal.fire('Error', 'Failed to fetch reports.', 'error');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      Swal.fire('Error', 'An error occurred while fetching reports.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="report-list">
      <h1>Report List</h1>
      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length > 0 ? (
        reports.map((report, index) => {
          const parsedReport = JSON.parse(report.reportData); // Parse the reportData field
          const { summary, sentimentAnalysis, grammarAnalysis, professionalAnalysis, emotionAnalysis } = parsedReport;

          return (
            <div className="report-card" key={report._id || index}>
              <h3>Report {index + 1}</h3>
              <p>Generated on: {new Date(report.createdAt).toLocaleString()}</p>
              <h4>Summary:</h4>
              <p>Total Duration: {summary?.totalDuration || 'N/A'}</p>
              <p>Words Per Minute: {summary?.wordsPerMinute || 'N/A'}</p>
              <p>Total Words: {summary?.totalWords || 'N/A'}</p>
              <h4>Grammar Analysis:</h4>
              <p>Score: {grammarAnalysis?.score || 'N/A'}</p>
              <p>Feedback: {grammarAnalysis?.feedback || 'N/A'}</p>
              <h4>Sentiment Analysis:</h4>
              <p>Confidence Score: {sentimentAnalysis?.confidenceScore || 'N/A'}</p>
              <p>Clarity Score: {sentimentAnalysis?.clarityScore || 'N/A'}</p>
              <p>Overall Impression: {sentimentAnalysis?.overallImpression || 'N/A'}</p>
              <p>Sentiment: {sentimentAnalysis?.sentiment || 'N/A'}</p>
              <h4>Professional Analysis:</h4>
              <p>Communication Score: {professionalAnalysis?.communicationScore || 'N/A'}</p>
              <p>Organization Score: {professionalAnalysis?.organizationScore || 'N/A'}</p>
              <p>Recommendations:</p>
              <ul>
                {professionalAnalysis?.recommendations?.map((recommendation, i) => (
                  <li key={i}>{recommendation}</li>
                )) || <li>N/A</li>}
              </ul>
              <h4>Emotion Analysis:</h4>
              {emotionAnalysis ? (
                <ul>
                  {Object.entries(emotionAnalysis).map(([emotion, value]) => (
                    <li key={emotion}>
                      {emotion}: {value}%
                    </li>
                  ))}
                </ul>
              ) : (
                <p>N/A</p>
              )}
            </div>
          );
        })
      ) : (
        <p>No reports found. Please create a report first.</p>
      )}
    </div>
  );
};

export default ListedReport;
