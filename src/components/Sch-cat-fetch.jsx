const SetTable = ({ courses, onSort }) => {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort("trimester")}>Trimester</th>
          <th onClick={() => onSort("courseNumber")}>Course Number</th>
          <th onClick={() => onSort("courseName")}>Course Name</th>
          <th onClick={() => onSort("semesterCredits")}>Semester Credits</th>
          <th onClick={() => onSort("totalClockHours")}>Total Clock Hours</th>
          <th>Enroll</th>
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
              <button onClick={() => alert(`Enrolled in ${course.courseName}`)}>
                Enroll
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SetTable;
