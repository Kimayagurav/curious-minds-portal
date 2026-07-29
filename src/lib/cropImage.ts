export default function getCroppedImg(
  imageSrc: string,
  pixelCrop: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not create canvas context."));
        return;
      }

      /*
        We save every profile photo at the same standard size.

        Ratio = 4:5
        Width = 800px
        Height = 1000px

        This makes Doctor and Engineer frames much easier
        to align consistently for every student.
      */

      canvas.width = 800;
      canvas.height = 1000;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        800,
        1000
      );

      const croppedImage = canvas.toDataURL("image/jpeg", 0.85);

      resolve(croppedImage);
    };

    image.onerror = () => {
      reject(new Error("Could not load the selected image."));
    };

    image.src = imageSrc;
  });
}