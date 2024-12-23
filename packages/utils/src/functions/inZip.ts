import JSZip from "jszip";

export const inZip = async (files: File[]): Promise<{ zipBlob: Blob, size: number, type: string }> => {
    const zip = new JSZip();
    files.forEach((file, index) => {
        zip.file(`file_${index + 1}.${file.name.split('.').pop()}`, file);
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });
    return {
        zipBlob,
        size: zipBlob.size,
        type: "application/zip"
    };
};