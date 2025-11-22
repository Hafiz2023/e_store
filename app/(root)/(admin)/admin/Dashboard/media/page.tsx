
import { BreadcrumbDemo } from "@/app/components/Application/Admin/BreadCrumbDemo";
import UploadMedia from "@/app/components/Application/Admin/UploadMedia";

import { ADMIN_DASHBOARD } from "@/app/routes/AdminPanelRoute";


const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" }, // lowercase 'label'
  { href: "/", label: "Media" },             // lowercase 'label'
];

const Media = () => {
  return (
    <div className="p-4">
      <BreadcrumbDemo breadcrumbData={breadcrumbData} />
      <h1 className="mt-4 text-xl font-semibold"></h1>
      <UploadMedia/>
    </div>
  );
};

export default Media;
