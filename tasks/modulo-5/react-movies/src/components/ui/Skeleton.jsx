export function Skeleton({ className, ...props }) {
  return (
    <div
      className={`animate-pulse bg-gray-800 rounded-md ${className}`}
      {...props}
    />
  );
} 