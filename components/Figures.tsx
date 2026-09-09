import { FIGURES } from "@/lib/content";

/**
 * The masthead figures.
 *
 * This is the site's one argument, made without an adjective in it: everything
 * below is measurable, so the top of the page is four measurements. It merges
 * two things - Rover's rule that a number beats a claim ("780m effective
 * operational radius" rather than "high-performance"), and Eithelmir's stat
 * block, which is a large mono numeral over a small dim label.
 *
 * The layout is the hairline grid: `gap-px` over a rule-coloured background,
 * so the cells are separated by true 1px lines that are the grid itself rather
 * than borders drawn on each child. Four cells into two columns then four, so
 * there is never a partial row to fill.
 *
 * The unit is a separate, smaller, dimmer span. Setting "9.8 cm" all at one
 * size makes the unit compete with the figure; at 0.55em and dimmed it reads
 * as an annotation on the number, which is what it is.
 */
export default function Figures() {
  return (
    <dl className="bg-rule border-rule grid grid-cols-2 gap-px border sm:grid-cols-4">
      {FIGURES.map((f) => (
        <div key={f.note} className="bg-bg px-4 py-5">
          {/* dd before dt, which is legal inside a div in a dl and is what the
              layout wants: the figure reads first, its name second. The visible
              label is the <dt> rather than an sr-only copy of itself - an
              earlier version shipped both and screen readers read every note
              twice in a row. */}
          <dd className="figure text-text text-3xl leading-none sm:text-4xl">
            {f.value}
            <span className="text-text-dim ml-1 align-baseline text-[0.55em]">{f.unit}</span>
          </dd>
          <dt className="label mt-3 leading-snug">{f.note}</dt>
        </div>
      ))}
    </dl>
  );
}
