import { useState } from "react";
import { CloseButton, Modal } from "../Modal";
import { useApp } from "../../context/AppContext";

export function LoginModal() {
  const { modal, closeModal, login, showToast } = useApp();
  const [a, setA] = useState("");
  const i = (f) => {
    f.preventDefault();
    const P = a.trim();
    if (!/^\d{10}$/.test(P)) {
      showToast("Please enter a valid 10-digit mobile number");
      return;
    }
    login(P);
  };
  return (
    <Modal
      open={modal === "login"}
      onClose={closeModal}
      className="max-w-sm p-6"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-900">
          Sign in to InstaCashMart
        </h3>
        <CloseButton onClick={closeModal} small />
      </div>
      <form onSubmit={i} className="mt-4">
        <label
          htmlFor="loginMobile"
          className="block text-xs font-bold text-slate-700 mb-1"
        >
          Enter Mobile Number
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-xs font-bold text-slate-500 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl">
            +91
          </span>
          <input
            id="loginMobile"
            type="tel"
            value={a}
            onChange={(f) => setA(f.target.value)}
            autoFocus
            placeholder="10-digit number"
            maxLength={10}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-r-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition"
        >
          Continue with OTP
        </button>
        <p className="text-[10px] text-center text-slate-400 mt-3">
          We will send a 4-digit verification code to your phone
        </p>
      </form>
    </Modal>
  );
}
