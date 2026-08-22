import { useState } from "react";
import { Images, Save } from "lucide-react";
import { uploadFile, saveSiteData, fileToDataUrl } from "services/siteData";
import UploadCard from "components/molecules/UploadCard";
import ImagePreview from "components/atoms/ImagePreview";
import { cardClass, btnPrimary } from "../components/ui";
import AdminPageHeader from "../components/AdminPageHeader";
import useUploadPage from "../components/useUploadPage";

const AboutImages = () => {
  const { token, siteData, uploadRef, files, setFiles, saving, save } =
    useUploadPage();
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleSave = () =>
    save(async () => {
      const urls: string[] = [];
      for (const file of files) {
        const res = await uploadFile(
          token!,
          await fileToDataUrl(file),
          "portfolio/about"
        );
        urls.push(res.url);
      }
      await saveSiteData(token!, { about: { images: urls } });
    }, "About images updated");

  const shownImages = siteData?.about?.images || [];

  return (
    <div className="w-full flex flex-col gap-6">
      <AdminPageHeader
        title="About Images"
        description="Images shown in the About section of your portfolio."
      />

      <section className={cardClass}>
        <h2 className="text-lg font-bold text-Primary">Current About Images</h2>

        {shownImages.length ? (
          <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-3 mobile:gap-2">
            {shownImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`About ${i + 1}`}
                className="w-full aspect-square object-cover rounded-xl border border-Secondary/20 bg-DarkBg2 cursor-pointer hover:ring-2 hover:ring-Primary/50 transition-all"
                onClick={() => setPreviewSrc(img)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-GrayCustom">
            <Images className="w-10 h-10" />
            <span className="text-sm">
              No about images yet — the default photo is being used.
            </span>
          </div>
        )}

        <UploadCard
          ref={uploadRef}
          mode="image"
          multiple
          maxFiles={8}
          maxSizeMB={8}
          label="Choose about images"
          onFiles={setFiles}
        />

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={files.length === 0 || saving}
            className={btnPrimary}
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save About Images"}
          </button>
        </div>
      </section>

      {previewSrc && (
        <ImagePreview
          src={previewSrc}
          alt="About image preview"
          onClose={() => setPreviewSrc(null)}
        />
      )}
    </div>
  );
};

export default AboutImages;
