import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "../../../redux/student/studentAPI.js";
import { updateUser } from "../../../redux/auth/authSlice.js";
import { Eye, EyeOff, Save, Lock, User, Phone, MapPin } from "lucide-react";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({ name: "", phone_no: "", address: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!user) return;
    setFormData({
      name: user.name || "",
      phone_no: user.phone_no || "",
      address: user.address || "",
    });
  }, [user]);

  const passwordStrength = useMemo(() => {
    const p = passwordData.newPassword || "";
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score; // 0..4
  }, [passwordData.newPassword]);

  const strengthMeta = useMemo(() => {
    if (passwordStrength <= 1) return { text: "Weak", cls: "bg-rose-500/10 border-rose-500/20 text-rose-200" };
    if (passwordStrength === 2) return { text: "Okay", cls: "bg-amber-500/10 border-amber-500/20 text-amber-200" };
    if (passwordStrength === 3) return { text: "Good", cls: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200" };
    return { text: "Strong", cls: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200" };
  }, [passwordStrength]);

  const handleChange = (e) => {
    setProfileError("");
    setFormData((p) => ({ ...p, [e.target.id]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordError("");
    setPasswordData((p) => ({ ...p, [e.target.id]: e.target.value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError("");

    if (!user?.stud_id) {
      setProfileError("User not logged in.");
      return;
    }

    try {
      const response = await updateProfile({
        studentId: user.stud_id,
        profileData: formData,
      }).unwrap();

      alert(response?.message || "✅ Profile updated successfully");
      dispatch(updateUser({ ...user, ...formData }));
    } catch (err) {
      setProfileError(err?.data?.message || "❌ Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    try {
      const response = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();

      alert(response?.message || "✅ Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordError(err?.data?.message || "❌ Failed to change password");
    }
  };

  if (!user) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-6 sm:p-8">
        <h2 className="text-white font-extrabold text-xl">You’re not logged in</h2>
        <p className="mt-2 text-white/70">Please login to update your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Update Profile</h2>
        <p className="mt-1 text-sm text-white/70">
          Update your personal details and secure your account.
        </p>
      </div>

      {/* Profile card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

        <div className="p-6 sm:p-8">
          <div className="text-white font-extrabold text-lg">Profile Information</div>
          <p className="mt-1 text-sm text-white/60">
            Your email is locked and cannot be changed.
          </p>

          {profileError && (
            <div className="mt-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm font-semibold">
              {profileError}
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={handleProfileSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                id="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                icon={<User size={18} />}
                placeholder="Your full name"
              />

              <Field
                id="email"
                label="Email"
                value={user.email || ""}
                disabled
                icon={<span className="text-white/40">@</span>}
                placeholder=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                id="phone_no"
                label="Phone Number"
                value={formData.phone_no}
                onChange={handleChange}
                icon={<Phone size={18} />}
                placeholder="Your phone number"
              />

              <Field
                id="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                icon={<MapPin size={18} />}
                placeholder="Your home address"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-slate-950 py-3 font-extrabold
                         hover:bg-emerald-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isUpdatingProfile ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </div>

      {/* Password card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-white font-extrabold text-lg">Change Password</div>
          <p className="mt-1 text-sm text-white/60">
            Choose a strong password to keep your account safe.
          </p>

          {passwordError && (
            <div className="mt-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm font-semibold">
              {passwordError}
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={handlePasswordSubmit}>
            <PasswordField
              id="currentPassword"
              label="Current Password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              show={showCurrent}
              setShow={setShowCurrent}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PasswordField
                id="newPassword"
                label="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                show={showNew}
                setShow={setShowNew}
              />
              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                show={showConfirm}
                setShow={setShowConfirm}
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-white/60">
                Use 8+ chars, uppercase, number, symbol (recommended).
              </p>
              <span
                className={[
                  "text-xs font-extrabold rounded-full px-3 py-1 border",
                  strengthMeta.cls,
                ].join(" ")}
              >
                {strengthMeta.text}
              </span>
            </div>

            <button
              type="submit"
              disabled={isChangingPassword}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-slate-950 py-3 font-extrabold
                         hover:bg-emerald-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Lock size={18} />
              {isChangingPassword ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Field = ({ id, label, value, onChange, placeholder, icon, disabled }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-white/90 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
        {icon}
      </div>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={[
          "w-full rounded-2xl border px-4 py-3 outline-none transition",
          "bg-white/5 text-white placeholder:text-white/40 border-white/10",
          "pl-10",
          "focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15",
          disabled ? "opacity-70 cursor-not-allowed" : "",
        ].join(" ")}
      />
    </div>
  </div>
);

const PasswordField = ({ id, label, value, onChange, show, setShow }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-white/90 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
        <Lock size={18} />
      </div>
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/40
                   pl-10 pr-12 py-3 outline-none transition
                   focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
        aria-label="Toggle password visibility"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

export default UpdateProfile;