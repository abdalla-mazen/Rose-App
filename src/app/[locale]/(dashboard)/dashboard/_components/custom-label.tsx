// Type
// type Props = {
// cx:string,
// cy:string,
// midAngle:number,
// innerRadius:number,
// outerRadius:number,
// percent:number
// }

export function CustomLabel(props) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

  // Calculate label position
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.9;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={20} // Circle size
        fill="#fff" // Background
        stroke="#e5e7eb" // Light border
        strokeWidth={1}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#000"
        fontSize="10"
        fontWeight="bold"
      >
        {percent}%
      </text>
    </g>
  );
}
