// hiding the div that will contain the images
const imagesDiv = document.querySelector("#images");

const fileInput = document.querySelector("#upload");

let imageToFilter = null;
const filteredImage = document.querySelector("#filteredImage");

// initializing the filter value
const filterElement = document.getElementsByName("filterRadio");
let filter;
filterElement.forEach((f) => {
  if (f.checked) filter = f.value;
});

// applying the selected filter
filterElement.forEach((f) => {
  f.onclick = () => {
    filter = f.value;
    filteredImage.src = filterImage(imageToFilter, filter);
  };
});

fileInput.addEventListener("change", async (e) => {
  const [file] = fileInput.files;

  // displaying the uploaded image
  imageToFilter = document.querySelector("#imageToFilter");
  imageToFilter.src = await fileToDataUri(file);

  // making the div containing the image visible
  imagesDiv.style.visibility = "visible";

  // applying the defaul filter
  imageToFilter.addEventListener("load", () => {
    filteredImage.src = filterImage(imageToFilter, filter);
  });

  return false;
});

function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(field);
  });
}

function filterImage(imageToFilter, filter) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const canvasWidth = imageToFilter.width;
  const canvasHeight = imageToFilter.height;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(imageToFilter, 0, 0, canvasWidth, canvasHeight);

  const sourceImageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
  const blankOutputImageData = context.createImageData(
    canvasWidth,
    canvasHeight
  );

  const outputImageData = applyFilter(
    sourceImageData,
    blankOutputImageData,
    filter
  );

  context.putImageData(outputImageData, 0, 0);

  return canvas.toDataURL();
}

function applyFilter(sourceImageData, outputImageData, filter) {
  if (filter === "noFilter") {
    return sourceImageData;
  } else if (filter === "threshold") {
    return applyThreshold(sourceImageData);
  } else if (filter === "sharpen") {
    return applyConvolution(sourceImageData, outputImageData, [
      0,
      -1,
      0,
      -1,
      5,
      -1,
      0,
      -1,
      0
    ]);
  } else if (filter === "blur") {
    return applyConvolution(sourceImageData, outputImageData, [
      1 / 16,
      2 / 16,
      1 / 16,
      2 / 16,
      4 / 16,
      2 / 16,
      1 / 16,
      2 / 16,
      1 / 16
    ]);
  } else {
    return sourceImageData;
  }
}

function applyThreshold(sourceImageData, threshold = 127) {
  const src = sourceImageData.data;

  for (let i = 0; i < src.length; i += 4) {
    const r = src[i];
    const g = src[i + 1];
    const b = src[i + 2];
    // thresholding the current value
    const v = 0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold ? 255 : 0;
    src[i] = src[i + 1] = src[i + 2] = v;
  }

  return sourceImageData;
}

function applyConvolution(sourceImageData, outputImageData, kernel) {
  const src = sourceImageData.data;
  const dst = outputImageData.data;

  const srcWidth = sourceImageData.width;
  const srcHeight = sourceImageData.height;

  const side = Math.round(Math.sqrt(kernel.length));
  const halfSide = Math.floor(side / 2);

  // padding the output by the convolution kernel
  const w = srcWidth;
  const h = srcHeight;

  // iterating through the output image pixels
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;

      // calculating the weighed sum of the source image pixels that
      // fall under the convolution kernel
      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = y + cy - halfSide;
          const scx = x + cx - halfSide;

          if (scy >= 0 && scy < srcHeight && scx >= 0 && scx < srcWidth) {
            let srcOffset = (scy * srcWidth + scx) * 4;
            let wt = kernel[cy * side + cx];
            r += src[srcOffset] * wt;
            g += src[srcOffset + 1] * wt;
            b += src[srcOffset + 2] * wt;
            a += src[srcOffset + 3] * wt;
          }
        }
      }

      const dstOffset = (y * w + x) * 4;

      dst[dstOffset] = r;
      dst[dstOffset + 1] = g;
      dst[dstOffset + 2] = b;
      dst[dstOffset + 3] = a;
    }
  }
  return outputImageData;
}
