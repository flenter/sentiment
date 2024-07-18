export function Score({ score, class: className }: { score: number, class?: string }) {
  return (
    <span class={`${getBackgroundForScore(score)} rounded p-0.5 ${className}`}>{score}</span>
  )
}

function getBackgroundForScore(score: number) {
  if (score > 0) {
    return "bg-green-800";
  }
  if (score < 0) {
    return "bg-red-800";
  }
  return "bg-gray-800";
}
