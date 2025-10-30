'use client';

export const SearchForm = ({
                               value,
                               onChange
                           }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <form className="w-full max-w-[1000px] mx-auto mb-8 mt-[100px]">
            <div className="relative w-full px-[2]">
                <input
                    type="search"
                    value={value}
                    onChange={onChange}
                    placeholder="Поиск видео"
                    className="
                        w-full
                        px-6 py-4
                        text-base
                        border
                        border-gray-300
                        rounded-full
                        shadow-sm
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-transparent
                        transition-all
                        duration-300
                        ease-in-out
                        placeholder:text-gray-500
                        min-h-[40px]
                    "
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                        type="submit"
                        className="
                            cursor-pointer
                            h-full
                            px-4 sm:px-6
                            bg-[#121D2B]
                            hover:bg-blue-700
                            text-white
                            font-medium
                            rounded-full
                            shadow-md
                            transition-colors
                            duration-300
                            ease-in-out
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:ring-offset-2
                            sm:w-[120px] w-[80px]
                        "
                    >
                        Поиск
                    </button>
                </div>
            </div>
        </form>
    );
};
