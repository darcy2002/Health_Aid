import * as express from "express";

const app = express();
app.use(express.json());
const port = process.env.PORT ? process.env.PORT : 3000;

// app.get("/:userid", (req, res) => {
//   const { userid } = req.params;
//   const { name } = req.query;
//   res.json({
//     userid,
//     name,
//     text: `Hello ${userid} from TypeScript + Node (ESM)! ${name}`,
//   });
// });
// //res.send(`Hello ${userid} from TypeScript + Node (ESM)! ${name}`);
// app.post("/api/users", (req, res) => {
//   const { users, age } = req.body;
//   if (!users || !age) {
//     return res.status(400).json({ error: "Name and age are required" });
//   }
//   res.status(201).json({
//     message: `User ${users} added successfully!`,
//     data: { users, age },
//   });
// });
interface patients {
  patientID: number;
  patientName: string;
  patientAge: number;
}
const patients: patients[] = [
  { patientID: 1, patientName: "John", patientAge: 20 },
  { patientID: 2, patientName: "Jane", patientAge: 21 },
  { patientID: 3, patientName: "Jim", patientAge: 22 },
  { patientID: 4, patientName: "Jill", patientAge: 23 },
  { patientID: 5, patientName: "Jack", patientAge: 24 },
  { patientID: 6, patientName: "Jill", patientAge: 25 },
  { patientID: 7, patientName: "Jill", patientAge: 26 },
  { patientID: 8, patientName: "Jill", patientAge: 27 },
];
let nextid = 9;

app.get("/patients", (req, res) => {
  res.status(200).json(patients);
});
app.post("/patients", (req, res) => {
  const { Name, Age } = req.body;

  //const patientID = req.query;
  if (!Name || !Age) {
    res.status(400).json({
      error: "Patient is required",
    });
  }
  const newPatient = {
    patientID: nextid++,
    patientName: Name,
    patientAge: Age,
  };
  patients.push(newPatient);

  res.status(201).json(newPatient);
});

app.get("/patients/:id", (req, res) => {
  const requestedID = parseInt(req.params.id);
  const patient = patients.find((p) => p.patientID === requestedID);
  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }
  res.status(200).json(patient);
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
