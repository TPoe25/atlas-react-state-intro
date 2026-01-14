import { useEffect, useMemo, useState } from "react";
import SearchField from "./components/search-field";
import SetTable from "./components/Sch-cat-fetch";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [sortKey, setSortKey] = useState("courseNumber");
  const [sortDirection, setSortDirection] = useState("asc");

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

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedCourses = useMemo(() => {
    const copy = [...filteredCourses];
    const direction = sortDirection === "asc" ? 1 : -1;

    const numericKeys = new Set([
      "trimester",
      "semesterCredits",
      "totalClockHours",
    ]);

    copy.sort((a, b) => {
      if (numericKeys.has(sortKey)) {
        return (Number(a[sortKey]) - Number(b[sortKey])) * direction;
      }

      const aValue = a[sortKey].toLowerCase();
      const bValue = b[sortKey].toLowerCase();

      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;
      return 0;
    });

    return copy;
  }, [filteredCourses, sortKey, sortDirection]);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>

      <SearchField value={searchTerm} onChange={setSearchTerm} />

      {loading && <p>Loading courses...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <SetTable courses={sortedCourses} onSort={handleSort} />
      )}

      <div className="pagination">
        <button onClick={() => alert("Previous Page")}>Previous</button>
        <button onClick={() => alert("Next Page")}>Next</button>
      </div>
    </div>
  );
}
