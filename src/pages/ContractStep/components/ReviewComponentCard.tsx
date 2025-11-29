import { BulbIcon } from '@/components/Icon';
import { Check } from 'lucide-react';

export type FormData = {
  objectRule?: boolean;
  purposeRule?: boolean;
  violateRule?: boolean;
  clauseRule?: boolean;
  dealNodesRule?: boolean;
};

export type RuleItem = {
  key: keyof FormData;
  checked: boolean;
  label: string;
  description: string;
};

type ReviewComponentCardProps = {
  rule: RuleItem;
  isSelected: boolean;
  onToggle: (key: string) => void;
};
const ReviewComponentCard = ({ rule, isSelected, onToggle }: ReviewComponentCardProps) => (
  <div
    onClick={() => onToggle(rule.key)}
    className={`p-5 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
      isSelected
        ? 'border-indigo-500 bg-indigo-50 shadow-md'
        : 'border-gray-200 bg-white hover:border-indigo-300'
    } relative`}
  >
    {/* 选中标记 (Checkmark) */}
    {isSelected && (
      <div className="absolute top-0 right-0 p-1 bg-indigo-500 rounded-bl-lg">
        <Check className="h-4 w-4 text-white" />
      </div>
    )}

    {/* 图标 (灯泡) */}
    <div className="flex items-center mb-3">
      <div className="p-2 bg-gray-100 rounded-full text-gray-500">
        <BulbIcon className="h-5 w-5" />
      </div>
      <h3 className="ml-3 text-base font-semibold text-gray-800">{rule.label}</h3>
    </div>

    {/* 描述 */}
    <p className="text-sm text-gray-500">{rule.description}</p>
  </div>
);
export default ReviewComponentCard;
