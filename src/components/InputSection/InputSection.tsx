"use client"

import { cn } from "@/utils/cn"
import chroma from "chroma-js"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export function ColorInputSection() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const hexValueFromQuery = searchParams.get("hex")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const [input, setInput] = useState(
    typeof hexValueFromQuery === "string" ? hexValueFromQuery : ""
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    const test = value.startsWith("#")
      ? value
      : value.length > 0
      ? `#${value}`
      : value

    setInput(test)
  }

  useEffect(() => {
    if (chroma.valid(input)) {
      router.push(pathname + "?" + createQueryString("hex", input))
    }
  }, [createQueryString, pathname, router, input])

  return (
    <div className="flex justify-center w-full mb-8">
      <div className="flex justify-center w-full max-w-[1200px] p-4 rounded-md bg-slate-200 dark:bg-slate-900 mt-[3px]">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className={cn(
            "font-semibold",
            "py-2 px-3 w-full max-w-[400px]",
            "border-2 border-border-light hover:border-border-light-hover dark:border-border-dark hover:dark:border-border-dark-hover",
            "focus:outline-none focus:border-custom-500",
            "rounded-lg bg-slate-50 dark:bg-slate-800"
          )}
          placeholder="Enter a hex color"
        />
      </div>
    </div>
  )
}
