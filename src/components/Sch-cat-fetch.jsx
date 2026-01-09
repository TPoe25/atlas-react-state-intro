import React, { useEffect, useState } from "react";

const SetTable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/public/api/courses.json");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses: {error}</p>;

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
        {courses.map((course) => (
          <tr key={course.id}>
            <td>{course.trimester}</td>
            <td>{course.courseNumber}</td>
            <td>{course.courseName}</td>
            <td>{course.semesterCredits}</td>
            <td>{course.totalClockHours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SetTable;
