import { TrashIcon } from "@heroicons/react/20/solid";

const ArrayCardList = ({ items, config, onDelete, arrayKey }) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative bg-white border border-gray-200 rounded-xl p-5
          shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
        >
          {/* Top Section */}
          <div className="flex items-start justify-between">
            <div>
              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 leading-tight">
                {item[config.title]}
              </h3>

              {/* Subtitle */}
              {config.subtitle && (
                <p className="text-sm text-gray-600 mt-1">
                  {item[config.subtitle]}
                </p>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(arrayKey, item.id)}
              className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          {config.description && (
            <p className="text-sm text-gray-500 mt-2">
              {config.descriptionPrefix || ""}
              {item[config.description]}
            </p>
          )}

          {/* Badges */}
          {config.badges && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {config.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    typeof badge.className === "function"
                      ? badge.className(item[badge.key])
                      : badge.className
                  }`}
                >
                  {item[badge.key]}
                </span>
              ))}
            </div>
          )}

          {/* Date Section */}
          {config.startDate && config.endDate && (
            <div className="mt-4 text-xs text-gray-400 border-t pt-3">
              {item[config.startDate]} — {item[config.endDate]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArrayCardList;
