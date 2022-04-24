const cleanPercentage = (percentage) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({colour, pct}) => {
    const r = 50;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - pct) * circ) / 100;
    return (
        <circle
            r={r}
            cx={75}
            cy={75}
            fill="#FFF"
            stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
            strokeWidth={"1.5rem"}
            strokeDasharray={circ}
            strokeDashoffset={pct ? strokePct : 0}
            strokeLinecap="round"
        ></circle>
    );
};

const Text = ({percentage}) => {
    return (
        <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={"1.5em"}
        >
            {percentage}
        </text>
    );
};

export default function Timer({percentage, colour, txt}) {
    const pct = cleanPercentage(percentage);
    return (
        <svg width={150} height={150}>
            <g transform={`rotate(-90 ${"75 75"})`}>
                <Circle colour="lightgrey"/>
                <Circle colour={colour} pct={pct}/>
            </g>
            <Text percentage={txt}/>
        </svg>
    );
};
