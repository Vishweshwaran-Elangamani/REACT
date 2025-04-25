// import "./App.css";
// import axios from "axios";
// import { useState, useEffect } from "react";

// interface ContactForm {
//   name: string;
//   payrollid: string;
//   empid: string;
//   payperiod: string;
//   grosspay: string;
//   detections: string;
// }

// interface DisplayContact extends ContactForm {
//   id: number;
// }

// const ContactFormComponent = ({
//   contactForm,
//   setContactForm,
//   handleInsert,
// }: {
//   contactForm: ContactForm;
//   setContactForm: React.Dispatch<React.SetStateAction<ContactForm>>;
//   handleInsert: (e: React.FormEvent<HTMLFormElement>) => void;
// }) => {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setContactForm({ ...contactForm, [e.target.name]: e.target.value });
//   };

//   return (
//     <form onSubmit={handleInsert}>
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={contactForm.name}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         PAYROLLID:
//         <input
//           type="text"
//           name="payrollid"
//           value={contactForm.payrollid}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         EMPID:
//         <input
//           type="text"
//           name="empid"
//           value={contactForm.empid}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         PAYPERIOD:
//         <input
//           type="text"
//           name="payperiod"
//           value={contactForm.payperiod}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         GROSSPAY:
//         <input
//           type="text"
//           name="grosspay"
//           value={contactForm.grosspay}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         DETECTIONS:
//         <input
//           type="text"
//           name="detections"
//           value={contactForm.detections}
//           onChange={handleChange}
//         />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const ContactTableComponent = ({
//   display,
//   handleDelete,
//   handleEdit,
// }: {
//   display: DisplayContact[];
//   handleDelete: (id: number) => void;
//   handleEdit: (id: number) => void;
// }) => {
//   return (
//     <table border={5}>
//       <thead>
//         <tr>
//           <th>NAME</th>
//           <th>PAYROLLID</th>
//           <th>EMPID</th>
//           <th>PAYPERIOD</th>
//           <th>GROSSPAY</th>
//           <th>DETECTIONS</th>
//           <th>ACTIONS</th>
//         </tr>
//       </thead>
//       <tbody>
//         {display.map((data) => (
//           <tr key={data.id}>
//             <td>{data.name}</td>
//             <td>{data.payrollid}</td>
//             <td>{data.empid}</td>
//             <td>{data.payperiod}</td>
//             <td>{data.grosspay}</td>
//             <td>{data.detections}</td>
//             <td>
//               <button onClick={() => handleDelete(data.id)}>Delete</button>
//               <button onClick={() => handleEdit(data.id)}>Edit</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// function App() {
//   const [contactForm, setContactForm] = useState<ContactForm>({
//     name: "",
//     payrollid: "",
//     empid: "",
//     payperiod: "",
//     grosspay: "",
//     detections: "",
//   });

//   const [display, setDisplay] = useState<DisplayContact[]>([]);

//   useEffect(() => {
//     axios
//       .get<DisplayContact[]>("http://localhost:3000/users")
//       .then((res) => {
//         setDisplay(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const handleInsert = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     axios
//       .post<DisplayContact>("http://localhost:3000/users", contactForm)
//       .then((res) => {
//         setDisplay([...display, res.data]);
//         setContactForm({
//           name: "",
//           payrollid: "",
//           empid: "",
//           payperiod: "",
//           grosspay: "",
//           detections: "",
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleDelete = (id: number) => {
//     axios
//       .delete(`http://localhost:3000/users/${id}`)
//       .then((res) => {
//         const newDisplay = display.filter((item) => item.id !== id);
//         setDisplay(newDisplay);
//         alert("Deleted Successfully");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleEdit = (id: number) => {
//     const foundItem = display.find((item) => item.id === id);
//     if (foundItem) {
//       setContactForm(foundItem);
//     }
//   };

//   return (
//     <div>
//       <ContactFormComponent
//         contactForm={contactForm}
//         setContactForm={setContactForm}
//         handleInsert={handleInsert}
//       />
//       <ContactTableComponent
//         display={display}
//         handleDelete={handleDelete}
//         handleEdit={handleEdit}
//       />
//     </div>
//   );
// }

// export default App;
// import React, { useState } from 'react';
// import axios from 'axios';

// interface FormData {
//   id: string;
//   name: string;
// }

// const App: React.FC = () => {
//   const [id, setId] = useState<string>('');
//   const [name, setName] = useState<string>('');
//   const [submittedData, setSubmittedData] = useState<FormData[]>([]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const newData = { id, name };
//     try {
//       await axios.post('http://localhost:3000/users', newData);
//       setSubmittedData([...submittedData, newData]);
//       setId('');
//       setName('');
//     } catch (error) {
//       console.error('Error sending data:', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>ID:</label>
//           <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
//         </div>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {submittedData.map((data, index) => (
//             <tr key={index}>
//               <td>{data.id}</td>
//               <td>{data.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default App;

