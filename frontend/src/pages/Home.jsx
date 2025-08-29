import Users from "../components/Users";

import useLogout from "../hooks/useLogout";

const Home = () => {
  const { loading, logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-center h-screen w-full bg-gray-100">
      <div className="w-full max-w-[550px] flex flex-col h-screen relative">
        {/* Message/User Window */}
        <div className="flex-1 overflow-y-auto p-4 bg-white border-b sm:border-none sm:min-h-[400px]">
          <Users />
        </div>

        {/* Buttons Row */}
        <div className="flex justify-between gap-2 p-2 bg-gray-200 border-t fixed bottom-0 left-0 right-0 sm:static sm:bg-transparent sm:border-none">
          <button
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            onClick={handleLogout}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
