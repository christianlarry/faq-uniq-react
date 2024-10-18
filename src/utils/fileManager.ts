export const downloadFile = (data: string, fileName: string, fileType: string) => {
  const blob = new Blob([data], { type: fileType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url); // Clean up
};