/**
 * The entire emphasis system, lifted from Eithelmir.
 *
 * One rule, stated in that codebase and worth repeating: at most ONE emphasised
 * phrase per heading, and it should be the two to four words that actually
 * carry the claim. Because there is only one emphasis device, there is no
 * fourth type style to accidentally invent later, and every heading picks up
 * the same two-beat rhythm - a plain clause, then the part that matters.
 *
 * `not-italic` because <em> is semantically right here but italics are not:
 * the emphasis is carried by weight and colour.
 */
export default function Em({ children }: { children: React.ReactNode }) {
  return <em className="text-accent font-semibold not-italic">{children}</em>;
}
