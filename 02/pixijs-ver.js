const scale = window.devicePixelRatio;
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

  const text = new PIXI.Text('ぴ');
  text.x = margin;
  text.y = margin;

  text.style = new PIXI.TextStyle({
    fill: '#aaccff',
    fontSize: canvasWidth - margin * 2,
    fontFamily: 'Arial',
  });
  app.stage.addChild(text);
};

const main = () => {
  const canvas = document.querySelector('canvas');
  drawTo(canvas);
};

main();
