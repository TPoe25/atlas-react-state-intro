import Header from "./Header";
import SchoolCatalog from "./SchoolCatalog";
import ClassSchedule from "./ClassSchedule";
import { EnrollmentContext } from "./context/Enroll-Context";
import { useMemo, useState } from "react";

export default function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    setEnrolledCourses((prevCourses) => {
      const exists = prevCourses.some(
        (c) => c.courseNumber === course.courseNumber
      );
      if (exists) return prevCourses;
      return [...prevCourses, course];
    });
  };

  const dropCourse = (courseNumber) => {
    setEnrolledCourses((prevCourses) =>
      prevCourses.filter((c) => c.courseNumber !== courseNumber)
    );
  };

  const enrollmentValue = useMemo(
    () => ({ enrolledCourses, enrollCourse, dropCourse }),
    [enrolledCourses]
  );

  return (
    <EnrollmentContext.Provider value={enrollmentValue}>
      <div>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </EnrollmentContext.Provider>
  );
}
