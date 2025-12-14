interface DashboardCategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function DashboardCategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: DashboardCategoryTabsProps) {
  return (
    <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
            {categories.map((category) => (
            <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedCategory === category
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
                {category}
            </button>
            ))}
        </nav>
    </div>
  );
}
