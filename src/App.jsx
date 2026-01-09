import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import SearchField from "./components/search-field";

export default function App() {
  return (
    <div>
      <Header />
      <SearchField />
      <SchoolCatalog />
      <ClassSchedule />
    </div>
  );
}
