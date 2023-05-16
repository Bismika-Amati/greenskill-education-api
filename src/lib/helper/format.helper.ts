type DecimalFormatOption = { places?: 4 };

export function fmtDecimal(value, opts: DecimalFormatOption = {}): number {
  return Number(
    (Math.round(Number(value) * 100) / 100).toFixed(opts.places ?? 4),
  );
}
