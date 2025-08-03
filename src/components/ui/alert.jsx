import React from "react";

export function Alert({ children, className = "" }) {
  return (
    <div className={`border-l-4 border-blue-500 bg-blue-50 p-4 rounded-lg ${className}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = "" }) {
  return <div className={`font-bold mb-1 ${className}`}>{children}</div>;
}

export function AlertDescription({ children, className = "" }) {
  return <div className={`text-sm text-gray-700 ${className}`}>{children}</div>;
}