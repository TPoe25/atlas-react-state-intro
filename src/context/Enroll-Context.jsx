import { createContext } from "react";

export const EnrollmentContext = createContext({
  enrolledCourses: [],
  enrollCourse: (course) => {},
  dropCourse: (courseNumber) => {},
});
