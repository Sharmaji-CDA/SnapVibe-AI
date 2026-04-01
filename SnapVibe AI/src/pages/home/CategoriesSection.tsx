// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Sparkles } from "lucide-react";

// type Category = {
//   name: string;
//   image: string;
// };

// export default function CategoriesSection() {
//   const navigate = useNavigate();

//   const [categories,] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 800);
//   }, []);

//   return (
//     <section className="bg-slate-950 py-16">

//       <div className="mx-auto max-w-7xl px-4 sm:px-6">

//         {/* HEADER */}
//         <div className="mb-12 text-center">
//           <h2 className="text-3xl font-bold text-white">
//             Explore by Style
//           </h2>
//           <p className="mt-2 text-sm text-slate-400">
//             Pick a style → generate or explore instantly
//           </p>
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className="flex gap-4 overflow-hidden">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="h-[180px] w-[140px] rounded-2xl bg-slate-800 animate-pulse"
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

//             {categories.map((cat) => (
//               <div
//                 key={cat.name}
//                 className="min-w-[140px] sm:min-w-[180px] cursor-pointer group"
//               >
//                 <div className="relative overflow-hidden rounded-2xl">

//                   {/* IMAGE */}
//                   <img
//                     src={cat.image}
//                     className="h-[180px] sm:h-[220px] w-full object-cover transition group-hover:scale-105"
//                   />

//                   {/* OVERLAY */}
//                   <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-3">

//                     {/* CATEGORY NAME */}
//                     <div className="text-white font-semibold text-sm">
//                       {cat.name}
//                     </div>

//                     {/* ACTIONS */}
//                     <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">

//                       {/* GENERATE */}
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigate(
//                             `/ai/generate?prompt=${encodeURIComponent(
//                               cat.name + " style design"
//                             )}`
//                           );
//                         }}
//                         className="flex items-center justify-center gap-1 bg-white text-black text-xs py-1 rounded-lg"
//                       >
//                         <Sparkles size={12} />
//                         Generate
//                       </button>

//                       {/* EXPLORE */}
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigate(
//                             `/gallery?category=${cat.name}`
//                           );
//                         }}
//                         className="text-xs text-white underline text-center"
//                       >
//                         Explore →
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }