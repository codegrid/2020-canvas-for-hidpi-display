const scale = window.devicePixelRatio;
const canvasWidth = 200;
const canvasHeight = 200;
const margin = 20;

const drawTo = (canvas) => {
  const ctx = canvas.getContext('2d');

  // 最初に要素のサイズを設定する
  canvas.width = canvasWidth * scale;
  canvas.height = canvasHeight * scale;

  // // CSSで見た目のサイズを設定する
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  canvas.style.backgroundColor = '#0055aa';

  // 拡大率を指定する
  ctx.scale(scale, scale);

  ctx.fillStyle = '#557799';
  ctx.fillRect(margin, margin, canvasWidth - margin * 2, canvasHeight - margin * 2);

  ctx.fillStyle = '#aaccff';
  ctx.font = `${canvasWidth - margin * 2}px Arial`;
  ctx.textBaseline = 'top';

  ctx.fillText('ぴ', margin, margin * 2);
};

const main = () => {
  const canvas = document.querySelector('canvas');
  drawTo(canvas);
};

main();
