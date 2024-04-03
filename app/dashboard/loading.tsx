import LoadingSpin from "react-loading-spin";

export default function Loading() {
  return (
    <div className="flex p-4 w-full justify-center">
      <LoadingSpin primaryColor="#0038ff" />;
    </div>
  );
}
