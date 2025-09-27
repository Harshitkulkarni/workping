import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { MdTipsAndUpdates } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { MdGroupAdd } from "react-icons/md";

export function CardWithLink({ title, description, link, icon }) {
  const navigate = useNavigate();
  return (
    <Card className="mt-6 w-80 h-64 p-4">
      <CardBody
        onClick={() => navigate(link)}
        className="cursor-pointer flex flex-col items-center justify-center h-full"
      >
        <div className="flex flex-col items-center justify-center h-full">
          {icon === "MdTipsAndUpdates" && (
            <MdTipsAndUpdates size={80} className="text-2xl mb-4" />
          )}
          {icon === "FaUsers" && (
            <FaUsers size={80} className="text-2xl mb-2" />
          )}
          {icon === "FaUser" && <FaUser size={80} className="text-2xl mb-2" />}
          {icon === "MdAssignmentAdd" && (
            <MdAssignmentAdd size={80} className="text-2xl mb-2" />
          )}
          {icon === "MdAssignment" && (
            <MdAssignment size={80} className="text-2xl mb-2" />
          )}
          {icon === "TbReportAnalytics" && (
            <TbReportAnalytics size={80} className="text-2xl mb-2" />
          )}
          {icon === "MdGroupAdd" && (
            <MdGroupAdd size={80} className="text-2xl mb-2" />
          )}
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </div>
      </CardBody>
    </Card>
  );
}
