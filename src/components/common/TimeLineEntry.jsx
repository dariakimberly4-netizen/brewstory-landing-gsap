import React from "react";

const TimeLineEntry = ({ year, image, title, description, isOdd }) => {
  return (
    <div
      className={`timeline-entry px-2 flex flex-col gap-1 md:gap-3 items-center text-center lg:text-left min-h-[unset] lg:min-h-[600px] max-w-full lg:max-w-[70%] 
    ${isOdd ? "lg:ml-auto lg:flex-row-reverse" : "lg:mr-auto lg:flex-row"}`}
    >
      {/* Left Column: Date + Image */}
      <div className="flex-none basis-[300px] text-center lg:mb-0 mb-2">
        <div className="font-veneer text-5xl lg:text-[4rem] text-[var(--sienna)] leading-none translate-y-[30px] lg:-translate-x-7">
          {year}
        </div>
        <img
          src={image}
          alt="Timeline"
          className="w-full max-w-[240px] p-1.5 border-[3px] border-[var(--sienna-2)] bg-[var(--papaya-whip)] shadow-[4px_4px_0_var(--sienna)]"
        />
      </div>

      {/* Right Column: Story */}
      <div className="flex-1 max-w-[400px]">
        <h3 className="font-veneer lg:text-3xl text-2xl text-[var(--sienna-2)] mb-1">
          {title}
        </h3>
        <p className="text-lg text-[var(--black)] leading-[1.6]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TimeLineEntry;
