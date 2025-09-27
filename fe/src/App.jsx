import { Route } from "react-router";
import { Routes } from "react-router";
import "./index.css";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import UpdatesForm from "./components/UpdatesForm";
import Dashboard from "./components/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateTeam from "./components/CreateTeam.jsx";
import ProtectedRoute from "./utils/protectedRoutes.jsx";
import TeamPage from "./components/TeamPage";
import TeamDetails from "./components/TeamDetails";
import TaskTable from "./components/TaskTable";
import AssignTaskPage from "./components/AssignTaskPage";
import ReviewUpdates from "./components/ReviewUpdates";
import EmployeeReview from "./components/EmployeeReview";

function App() {
  return (
    <div className="bg-[#f9faf7] h-full">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="updates"
            element={
              <ProtectedRoute>
                <UpdatesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-team"
            element={
              <ProtectedRoute>
                <CreateTeam />
              </ProtectedRoute>
            }
          />
          <Route
            path="myteams"
            element={
              <ProtectedRoute>
                <TeamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="myteams/:id"
            element={
              <ProtectedRoute>
                <TeamDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mytasks"
            element={
              <ProtectedRoute>
                <TaskTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="tasks/user/:userId"
            element={
              <ProtectedRoute>
                <TaskTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="review"
            element={
              <ProtectedRoute>
                <ReviewUpdates />
              </ProtectedRoute>
            }
          />
          <Route
            path="review/employee/:id"
            element={
              <ProtectedRoute>
                <EmployeeReview />
              </ProtectedRoute>
            }
          />
          <Route path="/Assign-tasks" element={<AssignTaskPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
