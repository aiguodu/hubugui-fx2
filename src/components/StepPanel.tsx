import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { steps } from '../data/steps';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StepPanelProps {
  currentStep: number;
}

export const StepPanel: React.FC<StepPanelProps> = ({ currentStep }) => {
  return (
    <div className="w-full h-full bg-slate-50 p-6 overflow-y-auto flex flex-col gap-4">
      <h2 className="text-xl font-bold text-slate-800 mb-2 border-b pb-2">解题步骤</h2>
      
      <div className="flex flex-col gap-4 relative">
        {/* 连接线 */}
        <div className="absolute left-[1.3rem] top-6 bottom-6 w-0.5 bg-slate-200 z-0" />

        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          
          return (
            <div 
              key={index} 
              className={cn(
                "relative z-10 flex gap-4 p-4 rounded-xl transition-all duration-500",
                isActive ? "bg-white shadow-md border border-blue-100 ring-1 ring-blue-400" : "opacity-70"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                isActive ? "bg-blue-500 text-white shadow-sm" : 
                isPast ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
              )}>
                {step.icon}
              </div>
              
              <div className="flex flex-col gap-1.5 pt-1">
                <h3 className={cn(
                  "font-bold text-base transition-colors",
                  isActive ? "text-blue-700" : "text-slate-700"
                )}>
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-slate-600">
                  {step.desc}
                </p>
                
                {isActive && (
                  <div className="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-line leading-relaxed">
                    {step.detail}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
