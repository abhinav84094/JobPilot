/* ---------------- Score ring ---------------- */
function ringColor(score) {
  if (score >= 70) return "#059669"; // green — strong match
  if (score >= 40) return "#d97706"; // amber — partial match
  return "#dc2626"; // red — weak match
}



export default function ScoreRing({ score }) {
  const size = 44, stroke = 4, r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(score, 100) / 100) * c;
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f0ee" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={ringColor(score)} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute text-xs font-medium">{score}</span>
    </div>
  );
}