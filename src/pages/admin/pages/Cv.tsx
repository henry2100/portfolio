import { useState } from "react";
import { FileText, Save, ExternalLink, Eye } from "lucide-react";
import { uploadFile, saveSiteData, fileToDataUrl, getProxiedPdfUrl } from "services/siteData";
import UploadCard from "components/molecules/UploadCard";
import DocumentViewer from "components/atoms/DisplayCV";
import bundledCv from "../../../assets/pdf/henry_adedugba_cv.pdf";
import { cardClass, btnPrimary } from "../components/ui";
import AdminPageHeader from "../components/AdminPageHeader";
import useUploadPage from "../components/useUploadPage";

const Cv = () => {
  const { token, siteData, uploadRef, files, setFiles, saving, save } =
    useUploadPage();
  const [previewing, setPreviewing] = useState(false);

  const handleSave = () =>
    save(async () => {
      const file = files[0];
      const res = await uploadFile(
        token!,
        await fileToDataUrl(file),
        "portfolio/cv"
      );
      await saveSiteData(token!, {
        cv: { url: res.url, fileName: file.name },
      });
    }, "CV uploaded");

  const currentFile = siteData?.cv?.fileName || "henry_adedugba_resume.pdf";
  const rawCvUrl = siteData?.cv?.url || bundledCv;
  const cvUrl = rawCvUrl.includes('cloudinary.com')
      ? getProxiedPdfUrl(rawCvUrl)
      : rawCvUrl;

  return (
    <div className="w-full flex flex-col gap-6">
      <AdminPageHeader
        title="Resume / CV"
        description="Visitors can preview and download this file from the footer."
      />

      <section className={cardClass}>
        <h2 className="text-lg font-bold text-Primary">Current Resume</h2>

        <div className="flex flex-col gap-4 p-5 rounded-xl border border-Secondary/20 bg-DarkBg2">
          <div className="flex flex-col mobile:flex-row flex-wrap items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-Primary_Accents_md flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-Primary" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="font-medium text-Background truncate">
                {currentFile}
              </span>
              <span className="text-xs text-GrayCustom">
                {siteData?.cv?.url
                  ? "Uploaded"
                  : "Not uploaded — using the bundled PDF"}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setPreviewing(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-Primary text-Primary hover:bg-Primary hover:text-white transition-colors text-sm"
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
              {siteData?.cv?.url && (
                <a
                  href={siteData.cv.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-Secondary/20 text-GrayCustom hover:text-Primary hover:border-Primary transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" /> Open
                </a>
              )}
            </div>
          </div>
        </div>

        <UploadCard
          ref={uploadRef}
          mode="file"
          multiple={false}
          maxFiles={1}
          maxSizeMB={15}
          acceptedTypes={[".pdf"]}
          label="Choose a resume (PDF)"
          onFiles={setFiles}
        />

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={files.length === 0 || saving}
            className={btnPrimary}
          >
            <Save className="w-4 h-4" />
            {saving ? "Uploading..." : "Upload New CV"}
          </button>
        </div>
      </section>

      {previewing && (
        <DocumentViewer
          fileUrl={cvUrl}
          fileName={currentFile}
          closeModal={setPreviewing}
        />
      )}
    </div>
  );
};

export default Cv;
