import { useDispatch, useSelector } from "react-redux";
import { setFilter, selectFilter } from "./employeeSlice";
import { Search, Plus } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SelectBox from "../../components/ui/SelectBox";

const FilterBar = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleSearchChange = (e) => {
    dispatch(setFilter({ search: e.target.value }));
  };

  const handleGenderChange = (val) => {
    dispatch(setFilter({ gender: val }));
  };

  const handleStatusChange = (val) => {
    dispatch(setFilter({ status: val }));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
      {/* Search */}
      <div className="w-full md:w-64">
        <Input
          placeholder="Search by name..."
          value={filter.search}
          onChange={handleSearchChange}
          icon={Search}
          containerClassName="w-full"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-1 gap-4 w-full md:w-auto overflow-x-auto">
        <div className="w-40 min-w-[160px]">
          <SelectBox
            options={[
              { value: "all", label: "All Genders" },
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
            value={filter.gender}
            onChange={handleGenderChange}
            placeholder="Select Genders"
          />
        </div>

        <div className="w-40 min-w-[160px]">
          <SelectBox
            options={[
              { value: "all", label: "All Status" },
              { value: "active", label: "Active Only" },
              { value: "inactive", label: "Inactive Only" },
            ]}
            value={filter.status}
            onChange={handleStatusChange}
            placeholder="Select Status"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
