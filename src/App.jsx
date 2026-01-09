import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import SetTable from "./components/Sch-cat-fetch";
import SearchField from "./components/search-field";

export default function App() {
  return (
    <div>
      <Header />
      <SearchField />
      <SetTable />
      <SchoolCatalog />
      <ClassSchedule />
    </div>
  );
}
