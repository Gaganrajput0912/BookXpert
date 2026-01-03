import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllEmployees,
  selectStats,
} from "../features/employees/employeeSlice";
import {
  Plus,
  Users,
  UserCheck,
  UserX,
  Download,
  PieChart as PieChartIcon,
} from "lucide-react";
import EmployeeTable from "../features/employees/EmployeeTable";
import EmployeeFormModal from "../features/employees/EmployeeFormModal";
import FilterBar from "../features/employees/FilterBar";
import StatsChart from "../features/employees/StatsChart";
import Button from "../components/ui/Button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import CountUp from "react-countup";

const DashboardPage = () => {
  const employees = useSelector(selectAllEmployees);
  const stats = useSelector(selectStats);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleAddStart = () => {
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEmployeeToEdit(null);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Employee List", 14, 22);

    const tableData = employees.map((emp) => [
      emp.id.slice(0, 6),
      emp.name,
      emp.gender,
      emp.state,
      format(new Date(emp.dob), "MMM d, yyyy"),
      emp.active ? "Active" : "Inactive",
    ]);

    autoTable(doc, {
      head: [["ID", "Name", "Gender", "State", "DOB", "Status"]],
      body: tableData,
      startY: 30,
    });

    doc.save("employees.pdf");
  };

  return (
    <div className="h-full flex overflow-hidden bg-gray-50/50">
      {/* Left Sidebar - Analytics (Scrollable independently) */}
      <aside className="w-80 flex-shrink-0 bg-white border-r border-gray-100 overflow-y-auto p-6 hidden xl:block custom-scrollbar">
        <div className="flex items-center gap-2 mb-6">
          <PieChartIcon size={20} className="text-primary-600" />
          <h2 className="font-bold text-gray-800 text-lg">
            Analytics Overview
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          {/* Compact Stats Cards */}
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 card-hover group cursor-default">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">
                  Total Workforce
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  <CountUp end={stats.total} duration={2} />
                </p>
              </div>
              <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600 group-hover:scale-110 transition-transform duration-300">
                <Users size={18} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 card-hover group cursor-default">
              <p className="text-xs font-medium text-green-700 mb-1">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                <CountUp end={stats.active} duration={2.2} />
              </p>
            </div>
            <div className="bg-red-50/50 p-4 rounded-xl border border-red-100 card-hover group cursor-default">
              <p className="text-xs font-medium text-red-700 mb-1">Inactive</p>
              <p className="text-2xl font-bold text-gray-900">
                <CountUp end={stats.inactive} duration={2.5} />
              </p>
            </div>
          </div>
        </div>

        {/* Charts Stack */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">
            Demographics
          </h3>
          <StatsChart employees={employees} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header - Fixed */}
        <header className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-b border-gray-100 shadow-sm z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Employee Directory
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              View and manage your team members.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadPDF}
              className="bg-white text-xs"
            >
              <Download size={14} className="mr-1.5" />
              Export
            </Button>
            <Button
              size="sm"
              onClick={handleAddStart}
              className="shadow-lg shadow-primary-500/20 text-xs"
            >
              <Plus size={14} className="mr-1.5" />
              Add Employee
            </Button>
          </div>
        </header>

        {/* Scrollable Table Area */}
        <div className="flex-1 overflow-hidden p-6 flex flex-col gap-4">
          {/* Filters */}
          <div className="flex-shrink-0">
            <FilterBar />
          </div>

          {/* Table Component */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <EmployeeTable onEdit={handleEdit} />
            </div>
          </div>
        </div>
      </main>

      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        employeeToEdit={employeeToEdit}
      />
    </div>
  );
};

export default DashboardPage;
