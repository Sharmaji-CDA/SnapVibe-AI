import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";
import type { UserPlan } from "../../types/plan.type";

type Props = {
  children: JSX.Element;
  requiredPlan?: UserPlan;
  userPlan: UserPlan;
};

export default function ProtectedRoute({
  children,
  requiredPlan,
  userPlan,
}: Props) {
  if (!userPlan) return <Navigate to="/login" />;

  if (requiredPlan && userPlan === "free") {
    return <Navigate to="/subscription" />;
  }

  return children;
}
