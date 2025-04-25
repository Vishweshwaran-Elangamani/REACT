import React, { useState } from "react";
import axios from "axios";

interface Data {
  id: number;
  reportid: string;
  location: string;
  traficdensity: string;
  averagespeed: string;
  incidentdetail: string;
}

const Form = () => {
  const [reportid, setReportid] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [traficdensity, setTraficdensity] = useState<string>("");
  const [averagespeed, setAveragespeed] = useState<string>("");
  const [incidentdetail, setIncidentdetail] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<Data[]>([]);
  const [searchedData, setSearchedData] = useState<Data[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Data>("http://localhost:3000/users", {
        reportid,
        location,
        traficdensity,
        averagespeed,
        incidentdetail
      });
      setSubmittedData([...submittedData, response.data]);
      setReportid("");
      setLocation("");
      setTraficdensity("");
      setAveragespeed("");
      setIncidentdetail("");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleDelete = async (id: number) => {
    alert("Confirm Delete");
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setSubmittedData(submittedData.filter(data => data.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleSearch = async (location: string) => {
    try {
      const response = await axios.get<Data>(`http://localhost:3000/users/${location}`);
      setSearchedData([response.data]);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  const handleEdit = (id: number) => {
    const dataToEdit = submittedData.find(data => data.id === id);
    if (dataToEdit) {
      setReportid(dataToEdit.reportid);
      setLocation(dataToEdit.location);
      setTraficdensity(dataToEdit.traficdensity);
      setAveragespeed(dataToEdit.averagespeed);
      setIncidentdetail(dataToEdit.incidentdetail);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ backgroundColor: "#FF5733", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", marginBottom: "20px" }}>
          <div>
            <label>Report ID:</label>
            <input type="text" value={reportid} onChange={(e) => setReportid(e.target.value)} required />
          </div>
          <div>
            <label>Location:</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div>
            <label>Trafic Density:</label>
            <input type="text" value={traficdensity} onChange={(e) => setTraficdensity(e.target.value)} required />
          </div>
          <div>
            <label>Average Speed:</label>
            <input type="text" value={averagespeed} onChange={(e) => setAveragespeed(e.target.value)} required />
          </div>
          <div>
            <label>Incident Detail:</label>
            <input type="text" value={incidentdetail} onChange={(e) => setIncidentdetail(e.target.value)} required />
          </div>
          <button type="submit" style={{ marginTop: "20px", marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#DAF7A6" }}>Submit</button>
        </form>
        <div style={{ backgroundColor: "#FFC300", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
          <label>Search by Location :</label>
          <input type="text" onChange={(e) => handleSearch(e.target.value)} />
          <button type="submit" style={{ marginTop: "20px", marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "green" }}>Search</button>
        </div>
        <table border="1" style={{ marginTop: "20px", marginBottom: "20px", padding: "20px", border: "2px solid black", borderRadius: "5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor: "#DAF7A6" }}>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Location</th>
              <th>Trafic Density</th>
              <th>Average Speed</th>
              <th>Incident Detail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchedData.length > 0 ? searchedData.map((data) => (
              <tr key={data.id}>
                <td>{data.reportid}</td>
                <td>{data.location}</td>
                <td>{data.traficdensity}</td>
                <td>{data.averagespeed}</td>
                <td>{data.incidentdetail}</td>
                <td>N/A</td>
              </tr>
            )) : submittedData.map((data) => (
              <tr key={data.id}>
                <td>{data.reportid}</td>
                <td>{data.location}</td>
                <td>{data.traficdensity}</td>
                <td>{data.averagespeed}</td>
                <td>{data.incidentdetail}</td>
                <td>
                  <button onClick={() => handleEdit(data.id)} style={{ marginRight: "10px", backgroundColor: "green" }}>Edit</button>
                  <button onClick={() => handleDelete(data.id)} style={{ backgroundColor: "red" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;

