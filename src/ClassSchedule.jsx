import { useContext } from "react";
import { EnrollmentContext } from "./context/Enroll-Context";

export default function ClassSchedule() {
  const { enrolledCourses, dropCourse } = useContext(EnrollmentContext);

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>
                <button onClick={() => dropCourse(course.courseNumber)}>
                  Drop
                </button>
              </td>
            </tr>
          ))}

          {enrolledCourses.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "1rem" }}>
                No courses enrolled yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
