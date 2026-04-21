import { ShieldCheck } from 'lucide-react';

const WpsSkeleton = ({ handleNext }: { handleNext: () => void }) => {
  return (
    <div className="w-full h-full bg-[url('@/static/skeleton.png')] bg-no-repeat bg-top bg-cover">
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-[2px]">
        <div className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 p-8 max-w-[360px] w-full text-center transform transition-all animate-in fade-in zoom-in duration-500">
          {/* 蓝色盾牌图标 */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-100">
                <ShieldCheck size={40} className="text-white" />
              </div>
            </div>
          </div>

          {/* 文字提示 */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">长期未操作</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            页面已进入保护模式
            <br />
            点击「继续审查」，快速回归高效工作
          </p>

          {/* 交互按钮 */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.97]"
          >
            继续审查
          </button>
        </div>
      </div>
    </div>
  );
};

export default WpsSkeleton;
