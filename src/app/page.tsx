import chroma from "chroma-js"
import { HeaderSection } from "@/components/HeaderSection/HeaderSection"
import { ColorsSection } from "@/components/Colors/ColorsSection"
import { ExampleSection } from "@/components/ExampleSection/ExampleSection"
import { ColorInputSection } from "@/components/InputSection/InputSection"
import { generateColorValues } from "@/components/Colors/generateColorValues"
import { Suspense } from "react"
import { DEFAULT_COLOR } from "@/components/constants"

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Home({ searchParams }: Props) {
  const hex = searchParams.hex

  let cssVariables = ""

  const hexValue =
    typeof hex === "string" && chroma.valid(hex) ? hex : DEFAULT_COLOR

  const colorValues = generateColorValues(hexValue)

  colorValues.forEach((color) => {
    const rgbColorValue = chroma(color.color).rgb().join(", ")
    cssVariables += `--custom-color-${color.position}: ${rgbColorValue}; `
  })

  return (
    <>
      <style>{`:root { ${cssVariables} }`}</style>
      <HeaderSection />
      <Suspense fallback={null}>
        <ColorInputSection />
      </Suspense>
      <ColorsSection colors={colorValues} hexColor={hexValue} />
      <ExampleSection />
    </>
  )
}
