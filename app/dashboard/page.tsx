import { redirect } from "next/navigation";

const DashboardPage = () => {
  redirect(`/dashboard/token-manager`);
};
export default DashboardPage;
