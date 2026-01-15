import { useContext } from "react";
import logo from "./assets/logo.png";
import { EnrollmentContext } from "./context/Enroll-Context";

export default function Header() {
  const { enrolledCourses } = useContext(EnrollmentContext);

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">
        Classes Enrolled: {enrolledCourses.length}
      </div>
    </div>
  );
}
