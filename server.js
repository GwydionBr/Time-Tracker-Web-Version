import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;  
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For developing with Local Server
app.use(cors());

// Helper function to format projects and sessions
function formatProjectsWithSessions(sessionItems, projectItems) {
  return projectItems.map(project => {
    const projectSessions = sessionItems.filter(session => session.project_id === project.id);
    return {
      projectId: project.id,
      projectName: project.project_name,
      projectDescription: project.project_description,
      projectSalary: project.project_salary,
      sessions: projectSessions
    };
  });
}

// Get all the sessions from the database
app.get("/read", async (req, res) => {
  try {
    const sessions = await db.query("SELECT * FROM sessions ORDER BY id ASC;");
    const projects = await db.query("SELECT * FROM projects ORDER BY id ASC;");
    const items = formatProjectsWithSessions(sessions.rows, projects.rows);
    res.status(200).json(items);
  } catch (err) {
    console.error("Error in read request:", err);
    res.status(500).json({ error: "Something went wrong. Please try again later!" });
  }
});

// Add session into the database
app.post("/add", async (req, res) => {
  const { projectName, projectSalary, timeSpent, moneyEarned, date, time } = req.body;
  console.log(projectName, projectSalary, timeSpent, moneyEarned, date, time);
  try {
    // Check if the project already exists
    let data = await db.query("SELECT id FROM projects WHERE project_name = $1", [projectName]);
    let project_id = data.rows.length > 0 ? data.rows[0].id : null;

    // If the project does not exist, add it to projects and get the id
    if (!project_id) {
      try {
        data = await db.query(
          "INSERT INTO projects (project_name, project_salary) VALUES ($1, $2) RETURNING id", 
          [projectName, projectSalary]
        );
        project_id = data.rows[0].id;
      } catch (err) {
        console.error("Error in adding project:", err);
        return res.status(500).json({ error: "Failed to add project" });
      }
    }

    // Insert the session
    try {
      await db.query(
        "INSERT INTO sessions (time_spent, money_earned, date, time, project_id) VALUES ($1, $2, $3, $4, $5)", 
        [timeSpent, moneyEarned, date, time, project_id]
      );

      // Retrieve all sessions and projects to return in response
      const sessions = await db.query("SELECT * FROM sessions ORDER BY id ASC");
      const projects = await db.query("SELECT * FROM projects ORDER BY id ASC");
      const items = formatProjectsWithSessions(sessions.rows, projects.rows);
      res.status(200).json(items);
    } catch (err) {
      console.error("Error in adding session:", err);
      res.status(500).json({ error: "Failed to add session" });
    }
  } catch (err) {
    console.error("Error in add request:", err);
    res.status(500).json({ error: "Something went wrong. Please try again later!" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
