import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, Calendar, MapPin, ArrowRight, Eye, EyeOff } from "lucide-react";
import { registerUser } from "../services/authApi";
import { LABELS, PLACEHOLDERS, ERRORS } from "../constants/RegisterConstants";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    dateOfBirth: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = ERRORS.required(LABELS.firstName);
    if (!formData.lastName.trim()) newErrors.lastName = ERRORS.required(LABELS.lastName);
    if (!formData.email.trim()) {
      newErrors.email = ERRORS.required(LABELS.email);
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = ERRORS.invalidEmail;
    }
    if (!formData.password) {
      newErrors.password = ERRORS.required(LABELS.password);
    } else if (formData.password.length < 6) {
      newErrors.password = ERRORS.passwordMinLength;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = ERRORS.passwordMismatch;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await registerUser({ ...formData });
      if (response.status === 201 || response.status === 200) {
        navigate("/");
      } else {
        setErrors({ general: response.data?.message || ERRORS.general });
      }
    } catch (error) {
        console.error("Registration failed:", error);
        if (error.response?.data?.message) {
          setErrors({ general: error.response.data.message });
        } else if (error.message) {
          setErrors({ general: error.message });
        } else {
          setErrors({ general: ERRORS.general });
        }
      } finally {
      setLoading(false);
    }
  };

  const renderInputField = (field, type, placeholder, icon = null, showToggle = false, showState = false, setShowState = null) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-3">{LABELS[field]}</label>
      <div className="relative">
        {icon}
        <input
          type={showToggle ? (showState ? "text" : "password") : type}
          value={formData[field]}
          onChange={(e) => updateFormData(field, e.target.value)}
          placeholder={placeholder}
          className={`w-full h-14 px-4 ${icon ? "pl-12" : ""} ${showToggle ? "pr-12" : ""} bg-white/50 backdrop-blur-sm border rounded-2xl text-lg placeholder-slate-500 focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl ${
            errors[field] ? "border-red-300 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200/50 focus:ring-emerald-500/20 focus:border-emerald-500/50"
          }`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowState(!showState)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/50 rounded-xl transition-colors"
          >
            {showState ? <Eye size={20} className="text-slate-500" /> : <EyeOff size={20} className="text-slate-500" />}
          </button>
        )}
      </div>
      {errors[field] && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 lg:h-24 lg:w-24 bg-linear-to-br from-emerald-500 via-teal-500 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6">
            <UserPlus className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-black bg-linear-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Join Profile Management
          </h1>
          <p className="text-xl text-slate-600 font-medium">Create your account in seconds</p>
        </div>

        {/* Register Form */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {renderInputField("firstName", "text", PLACEHOLDERS.firstName)}
              {renderInputField("lastName", "text", PLACEHOLDERS.lastName)}
            </div>

            {renderInputField("email", "email", PLACEHOLDERS.email, <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />)}

            {renderInputField("password", "password", PLACEHOLDERS.password, <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />, true, showPassword, setShowPassword)}
            {renderInputField("confirmPassword", "password", PLACEHOLDERS.confirmPassword, <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />, true, showConfirmPassword, setShowConfirmPassword)}

            <div className="grid grid-cols-2 gap-4">
              {renderInputField("location", "text", PLACEHOLDERS.location, <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />)}
              {renderInputField("dateOfBirth", "date", "", <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />)}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-linear-to-r from-emerald-600 via-teal-600 to-green-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl hover:from-emerald-700 hover:via-teal-700 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {errors.general && (
              <div className="p-4 bg-red-50/80 border border-red-200 rounded-2xl text-red-700 text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.general}
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="text-center pt-6">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;