module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layouts/**/*.tsx'],
  safelist: [
    'hover:!bg-indigo-700',
    'hover:scale-[1.01]',
    'hover:!text-gray-900',
    'hover:!border-gray-300',
    'hover:!bg-gray-100',
    '[&_.ant-radio-button-wrapper-checked]:!font-semibold',
    '[&_.ant-radio-button-wrapper-checked]:!text-white',
    '[&_.ant-radio-button-wrapper-checked]:!bg-indigo-600',
    '[&_.ant-radio-button-wrapper-checked]:!border-indigo-600',

    // 2. 选中状态下的 Hover
    '[&_.ant-radio-button-wrapper-checked:hover]:!bg-indigo-700',
    '[&_.ant-radio-button-wrapper-checked:hover]:!border-indigo-700',
    '[&_.ant-radio-button-wrapper-checked:hover]:!text-white',

    // 3. 非选中状态下的 Hover
    '[&_.ant-radio-button-wrapper:not(.ant-radio-button-wrapper-checked):hover]:!text-indigo-600',

    // 4. 修复 Antd 内部的分割线颜色冲突
    '[&_.ant-radio-button-wrapper-checked]:before:!bg-indigo-600',
    'bg-orange-50',
    'text-orange-600',
    'bg-indigo-50',
    'text-indigo-600',
    'bg-emerald-50',
    'text-emerald-600'
  ]
};
