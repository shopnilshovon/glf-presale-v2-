export default function Notification({ type, message }) {
  const baseStyle = "text-white px-4 py-3 rounded shadow text-center";
  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div className={`${baseStyle} ${styles[type] || "bg-gray-600"}`}>
      {message}
    </div>
  );
}