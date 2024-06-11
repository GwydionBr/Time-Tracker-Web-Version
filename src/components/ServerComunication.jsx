const BASE_URL = "http://localhost:3000";


const fetchProjects = async (setProjects, setLoading, setError) => {
  try {
    const response = await fetch(`${BASE_URL}/read`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setProjects(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const addSessionAndProject = async (name, description, salary, logTime, earnedMoney, currentDate, currentTime, setProjects) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      body: JSON.stringify({
        projectName: name,
        projectDescription: description,
        projectSalary: salary,
        timeSpent: logTime,
        moneyEarned: earnedMoney,
        date: currentDate,
        time: currentTime,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    setProjects(data);
  } catch (err) {
    console.log(err.message);
  }
}

const addSession = async (project_id, logTime, earnedMoney, currentDate, currentTime, setProjects) => {
  try {
    const response = await fetch(`${BASE_URL}/addSession`, {
      method: "POST",
      body: JSON.stringify({
        project_id: project_id,
        timeSpent: logTime,
        moneyEarned: earnedMoney,
        date: currentDate,
        time: currentTime,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    setProjects(data);
  } catch (err) {
    console.log(err.message);
  }
}

const addProject = async (name, description, salary, setProjects) => {
  try {
    const response = await fetch(`${BASE_URL}/addProject`, {
      method: "POST",
      body: JSON.stringify({
        projectName: name,
        projectDescription: description,
        projectSalary: salary,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    setProjects(data);
  } catch (err) {
    console.log(err.message);
  }
}

const deleteSession = async (id, setProjects) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteSession/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    setProjects(await response.json());
  } catch (err) {
    console.error(err.message);
  }
};

const deleteProject = async (id, setProjects) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteProject/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    setProjects(await response.json());
  } catch (err) {
    console.error(err.message);
  }
};

export {fetchProjects, addSessionAndProject, deleteSession, deleteProject, addProject, addSession};