import { CheckCircle, XCircle } from "lucide-react";

export default function Notification({ type, message }) {
  const isSuccess = type === "success";

  const color = isSuccess ? "bg-green-600" : "bg-red-600";
  const Icon = isSuccess ? CheckCircle : XCircle;

  return (
    <div
      className={`flex items-center gap-3 ${color} text-white px-4 py-3 rounded-xl shadow-md animate-fade-in`}
    >
      <Icon className="w-5 h-5" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}