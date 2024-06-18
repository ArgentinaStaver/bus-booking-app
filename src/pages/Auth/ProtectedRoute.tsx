const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/login',
  children,
}: any) => {
  if (!isAllowed) {
    window.location.href = redirectPath;
    return;
  }

  return children;
};

export default ProtectedRoute;
