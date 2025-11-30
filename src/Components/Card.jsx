export default function Card({ icon, title, description }) {
  return (
    <div className="bg-blue-300 shadow-sm shadow-blue-200 p-6 flex flex-col gap-4 rounded-lg font-semibold h-full">
      {/* Icon wrapper */}
      <div className="inline-flex items-center justify-center p-2 bg-black/30 w-fit h-fit rounded-md">
        {icon}
      </div>

      <h1 className="text-xl text-white/90">{title}</h1>

      {/* This forces descriptions to take flexible space,
          keeping all cards the same height inside a grid */}
      <p className="grow font-normal text-white/90">{description}</p>
    </div>
  );
}

