async function convertToWebp(file: any): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const img = document.createElement('img');
      const reader = new FileReader();
  
      reader.onload = function () {
        img.onload = async function () {
          try {
            const canvas = new OffscreenCanvas(img.width, img.height);
            const ctx: OffscreenCanvasRenderingContext2D | null = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const blob = await canvas.convertToBlob({ type: 'image/webp' });
              const convertedImage = await blob.arrayBuffer();
              resolve(convertedImage);
            } else {
              reject(new Error('Could not obtain 2D rendering context'));
            }
          } catch (error) {
            reject(error);
          }
        };
        img.src = reader.result as string;
      };
  
      reader.onerror = function (event) {
        reject(new Error('Error reading file: ' + (event.target?.error?.message || '')));
      };
  
      reader.readAsDataURL(file);
    });
  }
  
  export default convertToWebp;
  