import React from "react";
import { CardWithLink } from "./ui/Card";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((store) => store.user);

  const userId = user._id;
  console.log(userId);

  return (
    <div className="flex flex-wrap justify-center gap-4 py-10">
      {/* Visible to all roles */}
      <CardWithLink
        title="Daily updates"
        description="Add Your todays Update"
        link="/updates"
        icon="MdTipsAndUpdates"
      />
      <CardWithLink
        title="Team members"
        description="View all team members"
        link="/myteams"
        icon="FaUsers"
      />
      <CardWithLink
        title="Tasks"
        description="View my tasks"
        link={"/mytasks"}
        icon="MdAssignment"
      />

      {/* Admin only */}
      {user.role === "admin" && (
        <>
          <CardWithLink
            title="Assign Task"
            description="Assign tasks to team members"
            link="/Assign-tasks"
            icon="MdAssignmentAdd"
          />
          <CardWithLink
            title="Reports"
            description="View all reports"
            link="/reports"
            icon="TbReportAnalytics"
          />
          <CardWithLink
            title="Create Team"
            description="Create a new team"
            link="/create-team"
            icon="MdGroupAdd"
          />
        </>
      )}

      {/* Manager only */}
      {user.role === "manager" && (
        <>
          <CardWithLink
            title="Assign Task"
            description="Assign tasks to team members"
            link="/Assign-tasks"
            icon="MdAssignmentAdd"
          />
          <CardWithLink
            title="Reports"
            description="View all reports"
            link="/reports"
            icon="TbReportAnalytics"
          />
          <CardWithLink
            title="Review updates"
            description="View all the updates on task assigned to employees"
            link="/review"
            icon="TbReportAnalytics"
          />
        </>
      )}

      {/* Employee only — no extra cards beyond shared ones */}
    </div>
  );
};

export default Dashboard;
