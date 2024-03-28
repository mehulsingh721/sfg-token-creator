import { redirect } from "next/navigation";

const HomePage = () => {
  redirect(`/dashboard/token-manager`);
};
export default HomePage;
