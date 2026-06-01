"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Loader2, User } from "lucide-react";
import { propertyOwnerApi } from "@/lib/api/propertyOwner";
import AdminSidebar from "@/component/admin/sidebar";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

export default function AdminSettingPage() {
  const { currentUser, isLoading, updateProfile, refetchCurrentUser } = useCurrentUser();

  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [passwordInfo, setPasswordInfo] = useState({ newPassword: "", confirmPassword: "" });
  const [isInfoSubmitting, setIsInfoSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  
  const [selectedCurrency, setSelectedCurrency] = useState("$");
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUserInfo({
        name: currentUser.name || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploadingAvatar(true);
    const toastId = toast.loading("Uploading new profile picture...");
    try {
      const result = await propertyOwnerApi.uploadImageToCloudinary(file);
      await updateProfile({ profile_picture_url: result.secure_url });
      refetchCurrentUser();
      toast.success("Profile picture updated!", { id: toastId });
    } catch (error: any) {
      toast.error(error.message || "Upload failed.", { id: toastId });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInfoSubmitting(true);
    toast.loading("Updating profile...");

    try {
      await updateProfile({ name: userInfo.name });
      refetchCurrentUser();
      toast.dismiss();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setIsInfoSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!passwordInfo.newPassword) {
      toast.error("Password cannot be empty.");
      return;
    }

    setIsPasswordSubmitting(true);
    toast.loading("Changing password...");

    try {
      await updateProfile({ password: passwordInfo.newPassword });
      setPasswordInfo({ newPassword: "", confirmPassword: "" });
      toast.dismiss();
      toast.success("Password changed successfully!");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to change password.");
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    setCurrencyDropdownOpen(false);
  };

  const handleSaveChanges = () => {
    toast.success(`Currency saved: ${selectedCurrency}`);
  };

  if (isLoading) {
    return (
      <AdminSidebar>
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="ml-2">Loading settings...</p>
        </div>
      </AdminSidebar>
    );
  }

  return (
    <AdminSidebar>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">User Profile</h2>
          <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg border">
            <div className="flex-shrink-0 flex flex-col items-center">
              <label className="relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow cursor-pointer hover:opacity-80 transition-opacity">
                {isUploadingAvatar ? (
                  <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
                ) : currentUser?.profile_picture_url && currentUser.profile_picture_url.trim() !== "" ? (
                  <Image
                    src={currentUser.profile_picture_url}
                    alt="User Avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-gray-500" />
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </label>
              <span className="text-xs text-gray-500 mt-2">Click to change</span>
            </div>

            <div className="flex-grow max-w-md">
              <form onSubmit={handleUserInfoSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userInfo.email}
                    readOnly
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 cursor-not-allowed opacity-80"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isInfoSubmitting}
                    className="bg-[#b8c75b] hover:bg-[#a3b148] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 flex items-center"
                  >
                    {isInfoSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-md">
          <h2 className="text-lg font-medium mb-4">Change password</h2>
          <div className="bg-white p-6 rounded-lg border">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
                 <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordInfo.newPassword}
                onChange={handlePasswordChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={passwordInfo.confirmPassword}
                onChange={handlePasswordChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <button
                type="submit"
                  disabled={isPasswordSubmitting}
                  className="bg-[#b8c75b] hover:bg-[#a3b148] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 flex items-center"
              >
                  {isPasswordSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Save new password
              </button>
            </div>
          </form>
          </div>
        </div>

        <div className="mt-8 max-w-md">
          <h2 className="text-lg font-medium mb-4">System Settings</h2>
          <div className="bg-white p-6 rounded-lg border">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <div className="relative mb-4">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <span>Select Currency: {selectedCurrency}</span>
                <svg
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    currencyDropdownOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
                  <div className="py-1 text-center text-sm text-gray-700">
                    Select
                  </div>
                  <button
                    onClick={() => handleCurrencyChange("$")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    $
                  </button>
                  <button
                    onClick={() => handleCurrencyChange("£")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    £
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleSaveChanges}
              className="bg-[#b8c75b] hover:bg-[#a3b148] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full text-center"
            >
              Save Currency
            </button>
          </div>
        </div>

      </div>
    </AdminSidebar>
  );
}


