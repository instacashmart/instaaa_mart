export function resizeImage(A, e = 600) {
  return new Promise((resolve, reject) => {
    const a = new FileReader();
    a.onload = () => {
      const n = new Image();
      n.onload = () => {
        const i = Math.min(1, e / Math.max(n.width, n.height));
        const f = document.createElement("canvas");
        f.width = Math.round(n.width * i);
        f.height = Math.round(n.height * i);
        f.getContext("2d").drawImage(n, 0, 0, f.width, f.height);
        resolve(f.toDataURL("image/jpeg", 0.8));
      };
      n.onerror = reject;
      n.src = a.result;
    };
    a.onerror = reject;
    a.readAsDataURL(A);
  });
}
