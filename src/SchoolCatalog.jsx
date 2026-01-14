import { useEffect, useMemo, useState } from "react";
import SearchField from "./components/search-field";
import SetTable from "./components/Sch-cat-fetch";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/courses.json");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return courses.filter(
      (course) =>
        course.courseName.toLowerCase().includes(query) ||
        course.courseNumber.toLowerCase().includes(query)
    );
  }, [courses, searchTerm]);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>

      <SearchField value={searchTerm} onChange={setSearchTerm} />

      {loading && <p>Loading courses...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && <SetTable courses={filteredCourses} />}

      <div className="pagination">
        <button disabled>Previous</button>
        <button disabled>Next</button>
      </div>
    </div>
  );
}
