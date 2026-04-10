import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { GeometrySVG } from './components/GeometrySVG';
import { StepPanel } from './components/StepPanel';
import { steps } from './data/steps';
import { ttsService } from './services/ttsService';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // 当步骤改变时，自动播放 TTS
  useEffect(() => {
    if (isPlaying) {
      playCurrentStep();
    } else {
      // 如果没有在播放，仅显示字幕
      setShowSubtitle(true);
    }
    return () => {
      ttsService.stop();
    };
  }, [currentStep, isPlaying]);

  const playCurrentStep = () => {
    setShowSubtitle(true);
    ttsService.playTTS(
      steps[currentStep].tts,
      () => setIsPlaying(true),
      () => {
        setIsPlaying(false);
        // 自动播放下一步（可选，这里设定为讲完停顿等待用户操作）
      }
    );
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      ttsService.stop();
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      ttsService.stop();
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    ttsService.stop();
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-100 flex items-center px-6 justify-between shrink-0 bg-white z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full tracking-wider">
              几何动点
            </span>
            <h1 className="text-lg font-bold text-slate-800">中考数学压轴题：胡不归模型</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row h-[570px]">
          
          {/* 左侧：视觉/图形区 (55%) */}
          <div className="w-full md:w-[55%] h-full relative bg-white flex flex-col">
            <GeometrySVG step={currentStep} />
            
            {/* 字幕浮层 (防遮挡设计) */}
            {showSubtitle && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-h-[120px] overflow-y-auto bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/10 z-30">
                <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
                  {steps[currentStep].tts}
                </p>
                {isPlaying && (
                  <div className="absolute bottom-2 right-4 flex gap-1">
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 右侧：逻辑/讲解区 (45%) */}
          <div className="w-full md:w-[45%] h-full border-l border-slate-100">
            <StepPanel currentStep={currentStep} />
          </div>

        </div>

        {/* Footer Controls */}
        <footer className="h-16 border-t border-slate-100 bg-white flex items-center justify-between px-6 shrink-0 z-20">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重新开始
          </button>

          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={handlePlayPause}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all active:translate-y-0"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
            </button>

            <button 
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
