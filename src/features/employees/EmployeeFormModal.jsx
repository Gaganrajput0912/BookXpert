import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "./employeeSlice";
import { X, Upload } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SelectBox from "../../components/ui/SelectBox";
import DateInput from "../../components/ui/DateInput";
import { toast } from "react-hot-toast";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
  "Other",
];

const EmployeeFormModal = ({ isOpen, onClose, employeeToEdit }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
      setImagePreview(employeeToEdit.image);
    } else {
      // Reset form
      setFormData({
        name: "",
        gender: "",
        dob: "",
        state: "",
        active: true,
        image: "",
      });
      setImagePreview("");
    }
    setErrors({});
  }, [employeeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        alert("File size too large. Please select an image under 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    // Simple age validation (mock)
    if (formData.dob) {
      const age =
        new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (age < 18) newErrors.dob = "Employee must be at least 18 years old";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (employeeToEdit) {
      dispatch(updateEmployee(formData));
      toast.success("Employee updated successfully");
    } else {
      dispatch(addEmployee(formData));
      toast.success("Employee created successfully");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">
            {employeeToEdit ? "Edit Employee" : "Add New Employee"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="relative w-32 h-32 rounded-full border-4 border-gray-50 shadow-inner overflow-hidden cursor-pointer group bg-gray-100"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-primary-600 transition-colors">
                    <Upload size={32} />
                    <span className="text-xs mt-1">Upload Photo</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-xs">
                  Change
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </div>

              <div>
                <DateInput
                  label="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  error={errors.dob}
                />
              </div>

              <div>
                <SelectBox
                  label="Gender"
                  options={["Male", "Female", "Other"]}
                  value={formData.gender}
                  onChange={(val) =>
                    handleChange({ target: { name: "gender", value: val } })
                  }
                  error={errors.gender}
                  placeholder="Select Gender"
                />
              </div>

              <div>
                <SelectBox
                  label="State"
                  options={STATES}
                  value={formData.state}
                  onChange={(val) =>
                    handleChange({ target: { name: "state", value: val } })
                  }
                  error={errors.state}
                  placeholder="Select State"
                />
              </div>

              <div className="flex items-center md:pt-6">
                <label className="flex items-center cursor-pointer gap-3 select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Active Status
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {employeeToEdit ? "Save Changes" : "Create Employee"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
