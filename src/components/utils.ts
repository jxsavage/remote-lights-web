export default function segmentTabWidth(
  totalLEDs: number, segmentLEDs: number, segmentIndex: number, offset: number,
): React.CSSProperties {
  return {
    marginLeft: `${segmentIndex === 0 ? ((offset / totalLEDs) * 100) : 0}%`,
    width: `${(segmentLEDs / totalLEDs) * 100}%`,
  };
}
