import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Alert, Collapse, Button, ListGroup, ListGroupItem } from 'reactstrap';
import './Task.scss'; // Import the updated CSS file
import GaugeChart from './GaugeChart'; // Import the GaugeChart component

interface Task {
  id: number;
  subject: string;
  due_Date: string;
  status: string;
  priority: string;
  related_to: string;
  task_Owner: string;
}

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks'); // Adjust the endpoint as needed
        setTasks(response.data);
      } catch (err) {
        setError('Error fetching tasks data');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleCollapse = (id: number) => {
    setOpenTaskId(openTaskId === id ? null : id);
  };

  // Calculate completed tasks and total tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  return (
    <div className="task-container">
      <h2>Tasks</h2>
      {loading && <Spinner color="primary" />}
      {error && <Alert color="danger">{error}</Alert>}

      <ListGroup>
        {tasks.length > 0
          ? tasks.map(task => (
              <ListGroupItem key={task.id} className="task-item">
                <div className="task-summary" onClick={() => toggleCollapse(task.id)}>
                  <h5>{task.subject}</h5>
                  <p>
                    <span style={{ color: 'orange' }}>Due Date:</span> {task.due_Date}
                  </p>
                  <Button color="link" onClick={() => toggleCollapse(task.id)}>
                    {openTaskId === task.id ? 'Collapse' : 'Expand'}
                  </Button>
                </div>
                <Collapse isOpen={openTaskId === task.id}>
                  <div className="task-details">
                    <p>
                      <strong>Status:</strong> {task.status}
                    </p>
                    <p>
                      <strong>Priority:</strong> {task.priority}
                    </p>
                    <p>
                      <strong>Related To:</strong> {task.related_to}
                    </p>
                    <p>
                      <strong>Task Owner:</strong> {task.task_Owner}
                    </p>
                  </div>
                </Collapse>
              </ListGroupItem>
            ))
          : !loading && <p>No tasks available.</p>}
      </ListGroup>
    </div>
  );
};

export default Task;
