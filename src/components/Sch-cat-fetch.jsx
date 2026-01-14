const SetTable = ({ courses }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Trimester</th>
          <th>Course Number</th>
          <th>Course Name</th>
          <th>Semester Credits</th>
          <th>Total Clock Hours</th>
        </tr>
      </thead>

      <tbody>
        {courses.map((course, index) => (
          <tr key={`${course.courseNumber}-${index}`}>
            <td>{course.trimester}</td>
            <td>{course.courseNumber}</td>
            <td>{course.courseName}</td>
            <td>{course.semesterCredits}</td>
            <td>{course.totalClockHours}</td>
            <td>
              <button>Enroll</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SetTable;
