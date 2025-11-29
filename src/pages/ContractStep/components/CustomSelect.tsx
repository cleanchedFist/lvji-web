import React, { useEffect, useRef, useState } from 'react';

// 模拟选项数据，内容基于图二中显示的文本

// 自定义 Select 组件
type SelectOption = { label: string; value: any; isPlaceholder?: boolean };
type CustomSelectProps = {
  options: SelectOption[];
  value: any;
  onChange: any;
  placeholder: string;
};
const CustomSelect = ({ options, value, onChange, placeholder }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const defaultOption: SelectOption = { label: placeholder, value: void 0, isPlaceholder: true };

  const selectedOption = options.find((opt) => opt.value === value) || defaultOption;

  // 1. 输入框的样式，保持图一（默认）和图二（聚焦）的视觉效果
  // className="w-full border-gray-300  h-10 px-3 pr-10  appearance-none"
  const inputClassName = `
    w-full 
    h-10
    rounded-md 
    shadow-sm 
    py-2 
    px-3 
    text-base 
    text-gray-900 
    bg-white
    transition 
    duration-150 
    ease-in-out 
    flex justify-between items-center cursor-pointer
    ${isFocused ? 'ring-2 ring-indigo-500 border-indigo-500' : ''}
  `;

  // 2. 下拉菜单的样式，实现图二的浮动效果和选项样式
  const dropdownClassName = `
    absolute 
    z-10 
    mt-1 
    w-full 
    bg-white 
    rounded-md 
    shadow-lg                 // 下拉菜单整体阴影
    max-h-60 
    ring-1 
    ring-black 
    ring-opacity-5 
    overflow-auto 
    ${isOpen ? 'block' : 'hidden'}
  `;

  // 点击组件外部时关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: any) => {
    const mockEvent = {
      target: { value: optionValue },
    } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

    onChange(mockEvent); // 模拟原生 onChange 事件结构
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {/* 模拟 Select 的输入区域 */}
      <div
        className={inputClassName}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsFocused(true);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // 延迟关闭聚焦状态，以便点击下拉菜单
          setTimeout(() => {
            if (!wrapperRef.current || !wrapperRef.current.contains(document.activeElement)) {
              setIsFocused(false);
            }
          }, 0);
        }}
        tabIndex={0} // 使其可聚焦
      >
        <span
          className={`${selectedOption.isPlaceholder ? 'text-[rgba(155,163,177,1)]' : ''} text-sm`}
        >
          {selectedOption.label}
        </span>
      </div>

      {/* 自定义下拉选项列表 */}
      <ul className={dropdownClassName}>
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`
              py-2 
              px-3 
              text-sm 
              cursor-pointer 
              transition-colors 
              
              // 选项样式: 选中时背景色不同，非选中时鼠标悬停时有浅灰背景 (与图二选项列表背景相似)
              ${
                option.value === value
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-900 hover:bg-gray-100' // 图二的选项背景色为浅灰/白色
              }
            `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CustomSelect;
