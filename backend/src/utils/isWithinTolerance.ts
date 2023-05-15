export interface props {
  newValue: number
  originalValue: number
  tolerance?: number
}

export function isWithinTolerance({
  newValue,
  originalValue,
  tolerance = 0.1,
}: props): { result: boolean; text: string } {
  const upperLimit = originalValue * (1 + tolerance)
  const lowerLimit = originalValue * (1 - tolerance)

  const result = newValue >= lowerLimit && newValue <= upperLimit

  const diffPercent = Math.abs(1 - newValue / originalValue) * 100
  const text = `${diffPercent.toFixed(2)}% ${
    result ? 'acima' : 'abaixo'
  } da tolerancia`

  return { result, text }
}
