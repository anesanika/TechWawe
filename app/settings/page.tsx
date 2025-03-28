import { Userprofile } from "../components/userprofile/Userprofile";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
export default async function Settings() {
  const session = await getServerSession(options);

  return (
    <div className="mt-40">
      <Userprofile user={session?.user} />
    </div>
  );
}
