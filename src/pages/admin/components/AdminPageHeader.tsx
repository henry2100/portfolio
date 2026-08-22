import React from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
}

const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  description,
}) => (
  <div className="flex flex-col gap-1">
    <h1 className="text-2xl font-bold text-Background">{title}</h1>
    {description && (
      <p className="text-sm text-GrayCustom">{description}</p>
    )}
  </div>
);

export default AdminPageHeader;
