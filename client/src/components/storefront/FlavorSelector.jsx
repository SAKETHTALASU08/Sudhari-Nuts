import { FLAVORS } from '../../utils/constants';

const FlavorSelector = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none px-3 py-2.5 pr-8
                   bg-cream border-2 border-cashew/30 rounded-xl
                   text-charcoal text-sm font-inter font-medium
                   focus:border-cashew focus:ring-4 focus:ring-cashew/10 focus:outline-none
                   transition-all duration-300 cursor-pointer
                   hover:border-cashew/50"
      >
        <option value="" disabled>
          Choose flavor...
        </option>
        {FLAVORS.map((flavor) => (
          <option key={flavor} value={flavor}>
            {flavor}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="w-4 h-4 text-cashew"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default FlavorSelector;
