import { Briefcase, PlusCircle } from "lucide-react";

const navBarConfig = [
    {
        id:1,
        title: 'All Jobs',
        link: '/jobs',
        tooltip: 'View all jobs',
        icon: <Briefcase size={20} />,
    },
    {
        id:2,
        title: 'Add Job',
        link: '/add-job',
        tooltip: 'Add a new job',
        icon: <PlusCircle size={20} />,
    }
]

export default navBarConfig;