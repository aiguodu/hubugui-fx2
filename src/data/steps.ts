import { ReactNode } from 'react';
import { BookOpen, Compass, Move, Ruler, Calculator } from 'lucide-react';
import React from 'react';

export interface StepData {
  title: string;
  icon: ReactNode;
  desc: string;
  detail: string;
  tts: string;
}

export const steps: StepData[] = [
  {
    title: "题目解析与模型识别",
    icon: React.createElement(BookOpen, { className: "w-5 h-5" }),
    desc: "求 MN + ½ON 的最小值",
    detail: "已知抛物线过 A(4,0), C(-1,0), M(2,-3)，N 为 y 轴动点。求 MN + ½ON 的最小值。看到线段和加上一个系数，应立刻想到经典的“胡不归”模型。",
    tts: "同学们好！这道压轴题要求 MN 加上二分之一 ON 的最小值。看到线段之和加上一个系数，我们要立刻想到经典的“胡不归”模型。核心思想是通过构造特殊的角度，把带系数的线段转化成点到直线的距离。"
  },
  {
    title: "构造辅助线",
    icon: React.createElement(Compass, { className: "w-5 h-5" }),
    desc: "构造射线 OD，使 ∠DON = 30°",
    detail: "∵ 系数为 ½，联想到 Rt△ 中 30° 角对的直角边等于斜边的一半。\n∴ 以原点 O 为顶点，y 轴为一边，在第三象限构造射线 OD，使得 ∠DON = 30°。",
    tts: "因为系数是二分之一，我们联想到在直角三角形中，30度角所对的直角边等于斜边的一半。所以，我们以原点 O 为顶点，y 轴为一边，在第三象限构造一条射线 OD，使得它与 y 轴的夹角为 30 度。"
  },
  {
    title: "转化线段",
    icon: React.createElement(Ruler, { className: "w-5 h-5" }),
    desc: "作 NH ⊥ OD，得 NH = ½ON",
    detail: "过点 N 作 NH ⊥ OD 于点 H。\n在 Rt△ONH 中，∵ ∠NOH = 30°，\n∴ NH = ON · sin30° = ½ON。\n原式转化为求 MN + NH 的最小值。",
    tts: "接下来，我们从动点 N 向射线 OD 作垂线，垂足记为 H。在直角三角形 ONH 中，因为角 NOH 是 30 度，所以 NH 的长度正好等于 ON 的一半。这样，我们就把二分之一的 ON 成功转化为了线段 NH。"
  },
  {
    title: "化折为直",
    icon: React.createElement(Move, { className: "w-5 h-5" }),
    desc: "M, N, H 三点共线时取最小值",
    detail: "根据“两点之间线段最短”及“垂线段最短”，当 M, N, H 三点共线，且 MH ⊥ OD 时，MN + NH 取得最小值。此时点 N 即为 MH 与 y 轴的交点。",
    tts: "现在，我们要求解的式子就变成了求 MN 加 NH 的最小值。观察图形，M 是定点，OD 是定直线。根据“垂线段最短”，当 M、N、H 三点共线，并且与射线 OD 垂直时，MN 加 NH 的值最小。我们把 N 点滑动到这个最佳位置。"
  },
  {
    title: "计算结果",
    icon: React.createElement(Calculator, { className: "w-5 h-5" }),
    desc: "求点 M 到直线 OD 的距离",
    detail: "射线 OD 的解析式为 y = √3x。\n点 M 坐标为 (2, -3)。\n利用点到直线距离公式：\nd = |√3(2) - (-3)| / √(3+1) = (2√3 + 3) / 2 = √3 + 1.5。",
    tts: "最后一步就是计算了。射线 OD 的解析式为 y 等于根号 3 x。我们只需要利用点到直线的距离公式，求出点 M 到直线 OD 的距离。代入坐标计算，最终得到最小值为二分之三加根号三。这道压轴题就迎刃而解啦！"
  }
];
