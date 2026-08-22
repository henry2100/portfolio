import { useState } from "react";
import { ImagePlus, Save } from "lucide-react";
import { uploadFile, saveSiteData, fileToDataUrl } from "services/siteData";
import UploadCard from "components/molecules/UploadCard";
import ImagePreview from "components/atoms/ImagePreview";
import { cardClass, btnPrimary } from "../components/ui";
import AdminPageHeader from "../components/AdminPageHeader";
import useUploadPage from "../components/useUploadPage";

const HeroImage = () => {
  const { token, siteData, uploadRef, files, setFiles, saving, save } =
    useUploadPage();
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleSave = () =>
    save(async () => {
      const file = files[0];
      const res = await uploadFile(
        token!,
        await fileToDataUrl(file),
        "portfolio/hero"
      );
      await saveSiteData(token!, { hero: { image: res.url } });
    }, "Hero image updated");

  const shownImage = siteData?.hero?.image || "";

  return (
    <div className="w-full flex flex-col gap-6">
      <AdminPageHeader
        title="Hero Image"
        description="This image is used as the background of your landing page."
      />

      <section className={cardClass}>
        <h2 className="text-lg font-bold text-Primary">Current Hero Image</h2>

        <div
          className={`relative w-full aspect-video rounded-xl overflow-hidden border border-Secondary/20 bg-DarkBg2 ${shownImage ? "cursor-pointer hover:ring-2 hover:ring-Primary/50 transition-all" : ""}`}
          onClick={() => shownImage && setPreviewSrc(shownImage)}
        >
          {shownImage ? (
            <img
              src={shownImage}
              alt="Hero"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-GrayCustom">
              <ImagePlus className="w-10 h-10" />
              <span className="text-sm">
                No hero image uploaded yet — the default one is being used.
              </span>
            </div>
          )}
        </div>

        <UploadCard
          ref={uploadRef}
          mode="image"
          multiple={false}
          maxFiles={1}
          maxSizeMB={8}
          label="Choose a hero image"
          onFiles={setFiles}
        />

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={files.length === 0 || saving}
            className={btnPrimary}
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Hero Image"}
          </button>
        </div>
      </section>

      {previewSrc && (
        <ImagePreview
          src={previewSrc}
          alt="Hero preview"
          onClose={() => setPreviewSrc(null)}
        />
      )}
    </div>
  );
};

export default HeroImage;
