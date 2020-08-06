const imageScale = 2;
const scale =
  window.devicePixelRatio < imageScale ? imageScale : window.devicePixelRatio;

const canvasWidth = 200;
const canvasHeight = 200;
const margin = 20;

const drawTo = (canvas) => {
  const ctx = canvas.getContext("2d");

  // 最初に要素のサイズを設定する
  canvas.width = canvasWidth * scale;
  canvas.height = canvasHeight * scale;

  // CSSで見た目のサイズを設定する
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  canvas.style.backgroundColor = "#0055aa";

  // 拡大率を指定する
  ctx.scale(scale, scale);

  ctx.fillStyle = "#557799";
  ctx.fillRect(
    margin,
    margin,
    canvasWidth - margin * 2,
    canvasHeight - margin * 2
  );

  ctx.fillStyle = "#aaccff";
  ctx.font = `${canvasWidth - margin * 2}px Arial`;
  ctx.textBaseline = "top";

  ctx.fillText("ぴ", margin, margin * 2);
};

const makeTrimmedCanvas = (canvas) => {
  const distCanvas = document.createElement("canvas");
  const distCtx = distCanvas.getContext("2d");

  const sMargin = margin * scale;
  const sBaseWidth = canvasWidth * scale;
  const sBaseHeight = canvasHeight * scale;

  const sWidth = sBaseWidth - sMargin * 2;
  const sHight = sBaseHeight - sMargin * 2;
  const sx = sMargin;
  const sy = sMargin;

  const dMargin = margin * imageScale;
  const dBaseWidth = canvasWidth * imageScale;
  const dBaseHeight = canvasHeight * imageScale;

  const dx = 0;
  const dy = 0;
  const dWidth = dBaseWidth - dMargin * 2;
  const dHeight = dBaseHeight - dMargin * 2;

  distCanvas.width = dWidth;
  distCanvas.height = dHeight;

  distCtx.drawImage(
    canvas,

    sx,
    sy,
    sWidth,
    sHight,

    dx,
    dy,
    dWidth,
    dHeight
  );
  return distCanvas;
};

const makeTrimmedCanvasToPreview = (canvas) => {
  const canvasPreview = document.querySelector(".trimmed-canvas");
  const trimmedCanvas = makeTrimmedCanvas(canvas);
  canvasPreview.append(trimmedCanvas);

  const justifiedCanvas = makeTrimmedCanvas(canvas);
  canvasPreview.append(justifiedCanvas);
  justifiedCanvas.style.width = `${canvasWidth - 20 * 2}px`;
  justifiedCanvas.style.height = `${canvasHeight - 20 * 2}px`;

  return trimmedCanvas;
};

const previewTrimmedImage = (dataUrl) => {
  const imagePreview = document.querySelector(".trimmed-image");
  const image = document.createElement("img");
  image.setAttribute("src", dataUrl);
  imagePreview.append(image);

  const justifiedImage = document.createElement("img");
  justifiedImage.setAttribute("src", dataUrl);
  imagePreview.append(justifiedImage);

  justifiedImage.style.width = `${canvasWidth - 20 * 2}px`;
  justifiedImage.style.height = `${canvasHeight - 20 * 2}px`;
};

const bindDownloadEvent = (dataUrl) => {
  document.querySelector(".download-btn").addEventListener("click", () => {
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = "canvas-to-image.png";
    anchor.click();
  });
};

const main = () => {
  const canvas = document.querySelector("canvas");
  drawTo(canvas);

  const trimmedCanvas = makeTrimmedCanvasToPreview(canvas);
  const dataUrl = trimmedCanvas.toDataURL("image/png");

  previewTrimmedImage(dataUrl);

  bindDownloadEvent(dataUrl);
};

main();
