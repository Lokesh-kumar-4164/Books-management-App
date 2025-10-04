import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-t-teal-500 border-b-teal-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
