import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { getToken } from "services/siteData";
import { useSiteData } from "context/SiteDataContext";
import { UploadCardRef } from "components/molecules/UploadCard";

const useUploadPage = () => {
  const token = getToken();
  const { siteData, refresh } = useSiteData();
  const uploadRef = useRef<UploadCardRef>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);

  const save = async (handler: () => Promise<void>, successMsg: string) => {
    if (!token || files.length === 0) return;
    setSaving(true);
    try {
      await handler();
      await refresh();
      toast.success(successMsg);
      setFiles([]);
      uploadRef.current?.reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return { token, siteData, refresh, uploadRef, files, setFiles, saving, save };
};

export default useUploadPage;
