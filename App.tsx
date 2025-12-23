
import React, { useState, useEffect, useCallback } from 'react';
import { XIAOHUA_WISHES } from './constants';
import { ChristmasWish } from './types';
import Snowfall from './components/Snowfall';
import { generateExtraWish } from './services/geminiService';

const App: React.FC = () => {
  const [currentWish, setCurrentWish] = useState<ChristmasWish | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [extraWish, setExtraWish] = useState<string | null>(null);

  // Initialize with a random wish
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * XIAOHUA_WISHES.length);
    setCurrentWish(XIAOHUA_WISHES[randomIndex]);
  }, []);

  const handleOpenCard = () => {
    setIsOpened(true);
  };

  const handleGetExtraWish = async () => {
    setLoadingAI(true);
    const wish = await generateExtraWish("小花");
    setExtraWish(wish);
    setLoadingAI(false);
  };

  if (!currentWish) return null;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-900 via-red-950 to-slate-900 overflow-hidden px-4">
      <Snowfall />

      {/* Decorative Lights */}
      <div className="absolute top-0 w-full flex justify-around opacity-70">
         {[...Array(10)].map((_, i) => (
           <div key={i} className={`w-4 h-4 rounded-full shadow-lg animate-pulse bg-${i % 2 === 0 ? 'red-500' : 'yellow-300'} blur-sm`}></div>
         ))}
      </div>

      <div className="z-10 w-full max-w-md perspective-1000">
        {!isOpened ? (
          <div 
            onClick={handleOpenCard}
            className="group cursor-pointer transform transition-all duration-700 hover:scale-105 active:scale-95"
          >
            <div className="bg-red-800 rounded-lg shadow-2xl border-4 border-yellow-500 p-8 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
               {/* Christmas Ribbon */}
               <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500 transform rotate-45 translate-x-12 -translate-y-12"></div>
               
               <div className="text-6xl animate-bounce">🎁</div>
               <h1 className="chinese-font text-white text-4xl font-bold tracking-widest">小花专属</h1>
               <p className="text-yellow-200 font-serif italic">有一份圣诞惊喜等待你开启...</p>
               <div className="w-16 h-1 bg-yellow-500"></div>
               <p className="text-white/60 text-xs uppercase tracking-tighter">Click to Open</p>
               
               {/* Inner glow effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-700">
            <div className="bg-slate-50 rounded-xl shadow-2xl overflow-hidden flex flex-col items-center relative min-h-[500px] border-8 border-red-700">
              {/* Header Decoration */}
              <div className="w-full h-32 bg-red-700 flex items-center justify-center relative">
                <div className="text-6xl absolute -top-8 left-4 transform -rotate-12">🎄</div>
                <div className="text-6xl absolute -top-8 right-4 transform rotate-12">⭐</div>
                <h2 className="chinese-font text-white text-5xl mt-4">圣诞快乐</h2>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col items-center justify-between space-y-8 w-full">
                <div className="w-full">
                   <p className="chinese-font text-red-800 text-2xl mb-4 font-bold border-b border-red-100 pb-2">亲爱的小花：</p>
                   <p className="text-gray-800 text-lg leading-loose font-serif indent-8 min-h-[120px]">
                      {currentWish.content}
                   </p>
                   <div className="w-full text-right mt-6">
                      <p className="chinese-font text-red-900 text-xl">—— {currentWish.signature}</p>
                      <p className="text-gray-400 text-sm italic">2024年 圣诞季</p>
                   </div>
                </div>

                {extraWish && (
                  <div className="w-full p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded animate-in slide-in-from-bottom-4 duration-500">
                    <p className="text-xs text-yellow-700 font-bold mb-1 uppercase tracking-widest flex items-center">
                       <span className="mr-1">✨</span> AI 特别祝福
                    </p>
                    <p className="text-gray-700 italic text-sm italic">{extraWish}</p>
                  </div>
                )}

                <div className="flex flex-col space-y-3 w-full">
                  <button 
                    onClick={handleGetExtraWish}
                    disabled={loadingAI}
                    className="w-full py-3 bg-red-700 hover:bg-red-800 text-white rounded-full transition-all flex items-center justify-center shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {loadingAI ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        圣诞老人思考中...
                      </span>
                    ) : (
                      "🪄 让圣诞精灵再写一段"
                    )}
                  </button>
                  <button 
                    onClick={() => { setIsOpened(false); setExtraWish(null); }}
                    className="w-full py-2 text-gray-400 hover:text-red-600 transition-colors text-sm font-serif underline decoration-dotted"
                  >
                    重新封装贺卡
                  </button>
                </div>
              </div>
              
              {/* Bottom Decoration */}
              <div className="w-full py-2 bg-slate-200 flex justify-center space-x-4">
                 <span className="text-xl">🦌</span>
                 <span className="text-xl">🎅</span>
                 <span className="text-xl">🔔</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer copyright */}
      <div className="fixed bottom-4 text-white/30 text-[10px] tracking-[0.2em] uppercase font-serif z-20">
        Designed for Xiaohua with Love
      </div>
    </div>
  );
};

export default App;
