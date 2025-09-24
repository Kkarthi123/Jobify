import { Role } from "@/types";
import { Briefcase, PlusCircle } from "lucide-react";

const navBarConfig = [
    {
        id:1,
        title: 'All Jobs',
        link: '/job/jobs',
        tooltip: 'View all jobs',
        icon: <Briefcase size={20} />,
        Role: [Role.User, Role.Recruiter]
    },
    {
        id:2,
        title: 'Add Job',
        link: '/job/new-job',
        tooltip: 'Add a new job',
        icon: <PlusCircle size={20} />,
        Role: [Role.Recruiter]
    }
]

export default navBarConfig;