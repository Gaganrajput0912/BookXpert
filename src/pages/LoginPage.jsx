import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, LayoutDashboard } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Mock credentials check
      if (email === "admin@bookxpert.com" && password === "admin") {
        dispatch(
          login({
            id: "1",
            name: "Admin User",
            email: email,
            role: "admin",
          })
        );
        toast.success("Welcome back, Admin!");
        navigate("/");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-primary-950/90"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-2xl font-bold tracking-tight">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <LayoutDashboard size={24} />
            </div>
            BookXpert
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Manage your workforce with confidence.
          </h1>
          <p className="text-primary-100 text-lg leading-relaxed">
            The complete solution for employee management, attendance tracking,
            and performance analytics. Designed for modern enterprises.
          </p>
        </div>

        <div className="relative z-10 text-sm text-primary-200">
          © {new Date().getFullYear()} BookXpert Inc. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Sign in to platform
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />

            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full py-2.5 text-base shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Sign In"}
              {!isLoading && <ArrowRight size={18} className="ml-2" />}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Demo Credentials
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium font-mono text-gray-700">
                admin@bookxpert.com
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Password:</span>
              <span className="font-medium font-mono text-gray-700">admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
