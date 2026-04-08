export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Data sourced from CBN, NBS, NNPCL, NERC, ACLED. This site does not express a political opinion — only the data does.
        </p>
        <div className="mt-8 flex justify-center items-center gap-4">
          <div className="h-px w-8 bg-gray-200" />
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            NaijaThenAndNow.ng
          </span>
          <div className="h-px w-8 bg-gray-200" />
        </div>
        <p className="mt-4 text-[10px] text-gray-400">
          © {new Date().getFullYear()} Public Accountability Dashboard
        </p>
      </div>
    </footer>
  );
}
