import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import SetTable from "./components/Sch-cat-fetch";

export default function App() {
  return (
    <div>
      <Header />
      <SchoolCatalog />
      <ClassSchedule />
      <SetTable />
    </div>
  );
}
