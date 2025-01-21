import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListedReport = () => {
  const navigate = useNavigate()
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

  const handleReportClick = () =>{
    navigate('/report')
  }

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
              <button onClick={handleReportClick}>button: {index + 1}</button>
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
