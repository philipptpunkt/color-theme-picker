import { cn } from "@/utils/cn"
import { IconName } from "./IconName"
import { iconUrls } from "./IconUrls"

interface IconProps {
  iconName: IconName
  color?: string
  className?: string
}

export function Icon({
  iconName,
  color = "text-text-light dark:text-text-dark",
  className = "h-8 w-8",
}: IconProps) {
  const icon = iconUrls[iconName]

  return (
    <svg className={cn(`${color}`, className)}>
      <use href={`${icon.src}#icon`} />
    </svg>
  )
}

export function IconHighlight({
  iconName,
  color = "text-text-light dark:text-text-dark",
  backgroundColor,
  border = false,
  className = "h-8 w-8",
}: IconProps & { backgroundColor?: string; border?: boolean }) {
  const icon = iconUrls[iconName]

  return (
    <div
      className={cn(
        "flex justify-center items-center p-2 rounded-full",
        backgroundColor,
        { "border border-border-light dark:border-border-dark": border }
      )}
    >
      <svg className={cn(`${color}`, className)}>
        <use href={`${icon.src}#icon`} />
      </svg>
    </div>
  )
}

export function IconButton({
  iconName,
  color = "text-text-light dark:text-text-dark",
  className = "h-8 w-8",
  backgroundColor,
  onClick,
}: IconProps & { backgroundColor?: string; onClick: () => void }) {
  const icon = iconUrls[iconName]

  return (
    <button
      className={cn(
        "p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 hover:dark:bg-slate-700",
        backgroundColor
      )}
      onClick={onClick}
    >
      <svg className={cn(color, className)}>
        <use href={`${icon.src}#icon`} />
      </svg>
    </button>
  )
}
