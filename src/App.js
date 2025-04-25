import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [payrollForm, setPayrollForm] = useState({
    name: "",
    payrollid: "",
    empid: "",
    payperiod: "",
    grosspay: "",
    detections: "",
  });

  const [display, setDisplay] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Contact")
      .then((res) => {
        setDisplay(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleinsert = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/Contact", payrollForm)
      .then((res) => {
        setDisplay([...display, res.data]);
        setPayrollForm({
          name: "",
          payrollid: "",
          empid: "",
          payperiod: "",
          grosspay: "",
          detections: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/Contact/${id}`)
      .then((res) => {
        setDisplay(display.filter((item) => item.id !== id));
        alert(" sure to be Deleted ");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3000/Contact/${e.target.value}`)
      .then((res) => {
        setDisplay([res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:3000/Contact/${id}`, payrollForm)
      .then((res) => {
        setDisplay(display.map((item) => (item.id === id ? res.data : item)));
        setPayrollForm({
          name: "",
          payrollid: "",
          empid: "",
          payperiod: "",
          grosspay: "",
          detections: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    display.map((item) => {
      if (item.id === id) {
        setPayrollForm(item);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleinsert}>
        <label>
          <input
            type="text"
            placeholder="Name"
            value={payrollForm.name}
            onChange={(e) =>
              setPayrollForm({ ...payrollForm, name: e.target.value })
            }
          />
        </label>
        <label>
          PAYROLLID:
          <input
            type="text"
            placeholder="Payroll ID"
            value={payrollForm.payrollid}
            onChange={(e) =>
              setPayrollForm({ ...payrollForm, payrollid: e.target.value })
            }
          />
        </label>
        <label>
          EMPID:
          <input
            type="text"
            placeholder="Employee ID"
            required
            value={payrollForm.empid}
            onChange={(e) =>
              setPayrollForm({ ...payrollForm, empid: e.target.value })
            }
          />
        </label>
        <label>
          PAYPERIOD:
          <input
            type="text"
            placeholder="Pay Period"
            required
            value={payrollForm.payperiod}
            onChange={(e) =>
              setPayrollForm({ ...payrollForm, payperiod: e.target.value })
            }
          />
        </label>
        <label>
          GROSSPAY:
          <input
            type="text"
            placeholder="Gross Pay"
            required
            value={payrollForm.grosspay}
            onChange={(e) =>
              setPayrollForm({ ...payrollForm, grosspay: e.target.value })
            }
          />
        </label>
        <label>
          DETECTIONS:
          <input
            type="text"
            placeholder="Detections"
            required
            value={payrollForm.detections}
            onChange={(e) =>
              setPayrollForm({ ...payrollForm, detections: e.target.value })
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <table border={5}>
        <tr>
          <th>NAME</th>
          <th>PAYROLLID</th>
          <th>EMPID</th>
          <th>PAYPERIOD</th>
          <th>GROSSPAY</th>
          <th>DETECTIONS</th>
        </tr>
        <tr>
          <td>{payrollForm.name} </td>
          <td>{payrollForm.payrollid}</td>
          <td>{payrollForm.empid}</td>
          <td>{payrollForm.payperiod}</td>
          <td>{payrollForm.grosspay}</td>
          <td>{payrollForm.detections}</td>
        </tr>
        {display.map((data) => {
          return (
            <tr>
              <td>{data.name}</td>
              <td>{data.payrollid}</td>
              <td>{data.empid}</td>
              <td>{data.payperiod}</td>
              <td>{data.grosspay}</td>
              <td>{data.detections}</td>
              <td>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleEdit(data.id)}>Edit</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
