import { useState } from 'react';
import Review from './Review';

function App() {
  const [feedback, setFeedback] = useState('');
  const [student, setStudent] = useState('');

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value);
  };

  const handleStudentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudent(event.target.value);
  };

  return (
    <>
      <section id="feedback">
        <h2>Please share some feedback</h2>
        <p>
          <label>Your Feedback</label>
          <textarea onChange={handleFeedbackChange} />
        </p>
        <p>
          <label>Your Name</label>
          <input type="text" onChange={handleStudentChange} />
        </p>
      </section>
      <section id="draft">
        <h2>Your feedback</h2>

        <Review feedback={feedback} student={student} />

        <p>
          <button>Save</button>
        </p>
      </section>
    </>
  );
}

export default App;