import React from "react";

const IngredientItem = ({ amount, title, desciption }) => {
  return (
    <div className="flex lg:flex-row flex-col text-center items-center lg:text-left gap-1 md:gap-6 mb-3 md:mb-4">
      <div className="font-veneer text-[2rem] md:text-[2.5rem] text-[var(--sienna-2)] min-w-[90px] text-center">
        {amount}
      </div>
      <div className="max-w-full md:max-w-[400px]">
        <strong className="font-veneer md:text-xl text-[var(--sienna)] block mb-1 uppercase">
          {title}
        </strong>
        <p className="text-base leading-5 text-[var(--black)]">{desciption}</p>
      </div>
    </div>
  );
};

export default IngredientItem;
