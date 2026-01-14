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

  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 5;

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

  const totalPages = Math.max(
    1,
    Math.ceil(sortedCourses.length / ROWS_PER_PAGE)
  );

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    return sortedCourses.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [sortedCourses, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>

      <SearchField value={searchTerm} onChange={setSearchTerm} />

      {loading && <p>Loading courses...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <SetTable courses={paginatedCourses} onSort={handleSort} />
      )}

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
