const imageScale = 2;
const scale =
  window.devicePixelRatio < imageScale ? imageScale : window.devicePixelRatio;

const canvasWidth = 200;
const canvasHeight = 200;
const margin = 20;

const drawTo = (canvas) => {
  const app = new PIXI.Application({
    view: canvas,
    width: canvasWidth,
    height: canvasHeight,
    resolution: window.devicePixelRatio,
    autoDensity: true, // 旧バージョンでは autoResize
    backgroundColor: 0x0055aa,
  });

  const graphics = new PIXI.Graphics();
  graphics.clear();
  graphics.beginFill(0x557799, 1);
  graphics.drawRect(20, 20, canvasWidth - 40, canvasHeight - 40);
  graphics.endFill();

  app.stage.addChild(graphics);

  const text = new PIXI.Text("ぴ");
  text.x = margin;
  text.y = margin;

  text.style = new PIXI.TextStyle({
    fill: "#aaccff",
    fontSize: canvasWidth - margin * 2,
    fontFamily: "Arial",
  });
  app.stage.addChild(text);
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

  setTimeout(() => {
    requestAnimationFrame(() => {
      const trimmedCanvas = makeTrimmedCanvasToPreview(canvas);
      const dataUrl = trimmedCanvas.toDataURL("image/png");
      previewTrimmedImage(dataUrl);
      bindDownloadEvent(dataUrl);
    });
  }, 0);
};

main();
