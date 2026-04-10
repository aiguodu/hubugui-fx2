import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GeometrySVGProps {
  step: number;
}

export const GeometrySVG: React.FC<GeometrySVGProps> = ({ step }) => {
  // 坐标映射函数：将数学笛卡尔坐标映射为 SVG 坐标
  // 原点 O 在 SVG 中的坐标为 (200, 200)，缩放比例为 1 单位 = 40px
  const mapX = (x: number) => 200 + x * 40;
  const mapY = (y: number) => 200 - y * 40;

  // 关键坐标点 (数学坐标)
  const pts = {
    O: { x: 0, y: 0 },
    A: { x: 4, y: 0 },
    C: { x: -1, y: 0 },
    M: { x: 2, y: -3 },
    // 初始任意动点 N1
    N1: { x: 0, y: -4 },
    // N1 在 OD 上的投影 H1
    H1: { x: -Math.sqrt(3), y: -3 },
    // 最优动点 N_opt (M, N, H 共线)
    N_opt: { x: 0, y: 2 * Math.sqrt(3) / 3 - 3 },
    // M 在 OD 上的投影 H_opt
    H_opt: { x: 0.5 - 0.75 * Math.sqrt(3), y: 0.5 * Math.sqrt(3) - 2.25 },
    // 射线 OD 上的一个远点
    D: { x: -3, y: -3 * Math.sqrt(3) }
  };

  // 生成抛物线路径 y = 0.5x^2 - 1.5x - 2
  const generateParabolaPath = () => {
    let path = "";
    for (let x = -2; x <= 4.5; x += 0.1) {
      const y = 0.5 * x * x - 1.5 * x - 2;
      const svgX = mapX(x);
      const svgY = mapY(y);
      if (x === -2) path += `M ${svgX} ${svgY} `;
      else path += `L ${svgX} ${svgY} `;
    }
    return path;
  };

  // 动画状态判断
  const showN1 = step >= 1 && step < 3;
  const showRay = step >= 1;
  const showH1 = step === 2;
  const showOpt = step >= 3;

  // 当前 N 和 H 的坐标（根据步骤平滑过渡）
  const currentN = showOpt ? pts.N_opt : pts.N1;
  const currentH = showOpt ? pts.H_opt : pts.H1;

  return (
    <div className="w-full h-full flex items-start justify-center pt-8 relative">
      <svg 
        viewBox="0 0 400 450" 
        className="w-full max-w-[400px] h-auto drop-shadow-sm"
        style={{ overflow: 'visible' }}
      >
        {/* 坐标轴 */}
        <g className="text-slate-400" stroke="currentColor" strokeWidth="1.5">
          {/* X 轴 */}
          <line x1="20" y1="200" x2="380" y2="200" />
          <polygon points="380,196 388,200 380,204" fill="currentColor" />
          <text x="375" y="190" className="font-serif italic text-sm" fill="currentColor" stroke="none">x</text>
          
          {/* Y 轴 */}
          <line x1="200" y1="380" x2="200" y2="20" />
          <polygon points="196,20 200,12 204,20" fill="currentColor" />
          <text x="210" y="25" className="font-serif italic text-sm" fill="currentColor" stroke="none">y</text>
        </g>

        {/* 抛物线 */}
        <path 
          d={generateParabolaPath()} 
          fill="none" 
          stroke="#94a3b8" 
          strokeWidth="2" 
        />

        {/* 基础点与标签 */}
        <g className="font-serif italic text-sm text-slate-700" fill="currentColor">
          <circle cx={mapX(pts.O.x)} cy={mapY(pts.O.y)} r="3" />
          <text x={mapX(pts.O.x) + 5} y={mapY(pts.O.y) - 5}>O</text>

          <circle cx={mapX(pts.A.x)} cy={mapY(pts.A.y)} r="3" />
          <text x={mapX(pts.A.x) + 5} y={mapY(pts.A.y) - 5}>A(4,0)</text>

          <circle cx={mapX(pts.C.x)} cy={mapY(pts.C.y)} r="3" />
          <text x={mapX(pts.C.x) - 45} y={mapY(pts.C.y) - 5}>C(-1,0)</text>

          <circle cx={mapX(pts.M.x)} cy={mapY(pts.M.y)} r="3" />
          <text x={mapX(pts.M.x) + 8} y={mapY(pts.M.y) + 5}>M(2,-3)</text>
        </g>

        {/* 步骤 1: 构造射线 OD */}
        <AnimatePresence>
          {showRay && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.line 
                x1={mapX(pts.O.x)} y1={mapY(pts.O.y)} 
                x2={mapX(pts.D.x)} y2={mapY(pts.D.y)} 
                stroke="#10b981" strokeWidth="2" strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              <text x={mapX(pts.D.x) - 15} y={mapY(pts.D.y)} className="font-serif italic text-sm" fill="#10b981">D</text>
              
              {/* 30度角标记 (∠DON = 30°) */}
              <path d="M 200 220 A 20 20 0 0 1 190 217.32" fill="none" stroke="#10b981" strokeWidth="1.5" />
              <text x="180" y="238" className="text-xs font-sans" fill="#10b981">30°</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* 动点 N 及其连线 (使用 motion 自动补间坐标变化) */}
        {step >= 0 && (
          <g>
            {/* 连线 ON */}
            <motion.line
              x1={mapX(pts.O.x)} y1={mapY(pts.O.y)}
              animate={{ x2: mapX(currentN.x), y2: mapY(currentN.y) }}
              stroke="#3b82f6" strokeWidth="2"
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            {/* 连线 MN */}
            <motion.line
              x1={mapX(pts.M.x)} y1={mapY(pts.M.y)}
              animate={{ x2: mapX(currentN.x), y2: mapY(currentN.y) }}
              stroke="#ef4444" strokeWidth="2"
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            
            {/* 垂线 NH */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.line
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ 
                    opacity: 1, 
                    pathLength: 1,
                    x1: mapX(currentN.x), y1: mapY(currentN.y),
                    x2: mapX(currentH.x), y2: mapY(currentH.y)
                  }}
                  stroke="#ef4444" strokeWidth="2"
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>

            {/* 动点 N */}
            <motion.circle
              animate={{ cx: mapX(currentN.x), cy: mapY(currentN.y) }}
              r="4" fill="#ef4444"
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <motion.text
              animate={{ x: mapX(currentN.x) + 8, y: mapY(currentN.y) + 5 }}
              className="font-serif italic text-sm" fill="#ef4444"
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              N
            </motion.text>

            {/* 动点 H */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: step === 2 ? 1 : 0 }}
                >
                  <motion.circle
                    animate={{ cx: mapX(currentH.x), cy: mapY(currentH.y) }}
                    r="3" fill="#10b981"
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  <motion.text
                    animate={{ x: mapX(currentH.x) - 15, y: mapY(currentH.y) - 5 }}
                    className="font-serif italic text-sm" fill="#10b981"
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    H
                  </motion.text>
                  
                  {/* 直角标记 (简化处理，跟随 H 移动) */}
                  <motion.path
                    animate={{
                      d: `M ${mapX(currentH.x) + 4} ${mapY(currentH.y) + 2.3} L ${mapX(currentH.x) + 6.3} ${mapY(currentH.y) - 1.7} L ${mapX(currentH.x) + 2.3} ${mapY(currentH.y) - 4}`
                    }}
                    fill="none" stroke="#10b981" strokeWidth="1"
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        )}

        {/* 步骤 4: 最终高亮 MH 线段 */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.line
              initial={{ opacity: 0, strokeWidth: 2 }}
              animate={{ opacity: 1, strokeWidth: 4 }}
              x1={mapX(pts.M.x)} y1={mapY(pts.M.y)}
              x2={mapX(pts.H_opt.x)} y2={mapY(pts.H_opt.y)}
              stroke="#f59e0b" strokeLinecap="round"
              className="drop-shadow-md"
              transition={{ duration: 0.5, delay: 1 }}
            />
          )}
        </AnimatePresence>

      </svg>
    </div>
  );
};
