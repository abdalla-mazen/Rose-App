// This component renders a simple horizontal line used to visually separate sections or elements in the UI.

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return (
    <div className={`flex-1 border-t border-zinc-200 ${className || ""}`}></div>
  );
}
