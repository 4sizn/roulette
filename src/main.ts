import SoundManager from "./SoundManager/SoundManager";
import { EventManager } from "./eventManager";
import "./style.css";
import soundSample from "/assets/sounds/sample.mp3";
// import typescriptLogo from "./typescript.svg";
// import viteLogo from "/vite.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="options">
  <div>
  <button id="btn-decrease">-</button>
  <input type="number" id="input-item-count" value="10" />
  <button id="btn-increase">+</button>
  </div>
  <p class="desc">(1개 ~ 9999개 설정 가능)</p>
  </div>
  <canvas id="canvas" width="680" height="680"></canvas>
  <button id="btn-start">start</button>
`;

const $canvas = document.querySelector("canvas");
if (!$canvas) throw new Error("canvas not found");

const ctx = $canvas.getContext("2d");
if (!ctx) throw new Error("context not found");

const $options = document.querySelector("#options");
console.log("hsshin", $options);

$options?.addEventListener("click", (e) => {
  if (!e.target) return;
  const $btn = e.target as HTMLButtonElement;

  const $input = document.querySelector<HTMLInputElement>("#input-item-count");
  if (!$input) throw new Error("input not found");
  const value = parseInt($input.value, 10);

  if ($btn.id === "btn-decrease") {
    if (value > 1) {
      $input.value = (value - 1).toString();
    }
  } else if ($btn.id === "btn-increase") {
    if (value < 9999) {
      $input.value = (value + 1).toString();
    }
  }
});

const colors = [
  "#dc0936",
  "#e6471d",
  "#f7a416",
  "#efe61f ",
  "#60b236",
  "#209b6c",
  "#169ed8",
  "#3f297e",
  "#87207b",
  "#be107f",
  "#e7167b",
];

const itemList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

type Position = {
  x: number;
  y: number;
};

const center: Position = {
  x: $canvas.width / 2,
  y: $canvas.height / 2,
};

const draw = () => {
  const arc = Math.PI / (itemList.length / 2);
  for (let i = 0; i < itemList.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i % (colors.length - 1)];
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, center.x, arc * (i - 1), arc * i);
    ctx.fill();
    ctx.closePath();
  }
};

const drawPointer = (position: Position) => {
  const { x, y } = position;
  // 포인터 스타일 설정
  ctx.fillStyle = "#FF0000"; // 빨간색
  ctx.strokeStyle = "#000000"; // 검은색
  ctx.lineWidth = 2;

  // 포인터 그리기
  ctx.beginPath();
  ctx.moveTo(x, y + 30);
  ctx.lineTo(x - 10, y);
  ctx.lineTo(x + 10, y);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();

  // // 원 모양의 머리 부분 그리기
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

const drawText = () => {
  // 각도율
  const arc = Math.PI / (itemList.length / 2);

  for (let i = 0; i < itemList.length; i++) {
    // const angle = arc * i;

    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    //각도 중앙값
    const centerAngle = arc * i + arc / 2;

    ctx.fillText(
      itemList[i],
      center.x + Math.cos(centerAngle) * center.x * 0.8,
      center.y + Math.sin(centerAngle) * center.x * 0.8
    );
  }
};
draw();
drawText();

const eventManager = new EventManager();
const soundManager = new SoundManager();
soundManager.install("sample2", new Audio(soundSample));

eventManager.on("h", () => {
  // const audio = new Audio(soundSample);
  // soundManager.play("sample1", audio);
  soundManager.play("sample2");
});

document.querySelector("#btn-start")?.addEventListener("click", () => {
  eventManager.emit("h");
});

drawPointer({
  x: center.x,
  y: 0,
});
