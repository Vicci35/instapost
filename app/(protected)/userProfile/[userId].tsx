import UserProfileScreen from "./UserProfileScreen";

type UserProfileWrapperProps = {
  params: {
    userId: string;
  };
};

export default function UserProfileWrapper({
  params,
}: UserProfileWrapperProps) {
  const { userId } = params;
  return <UserProfileScreen userId={userId} />;
}
