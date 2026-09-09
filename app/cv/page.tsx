import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Whisper from "@/components/Whisper";
import { AWARDS, EDUCATION, PROFILE, ROLES, SKILLS } from "@/lib/content";

export const metadata: Metadata = {
  title: "CV",
  description: "Education, experience, awards and technical skills.",
};

/**
 * The CV.
 *
 * al-folio's CV layout is a narrow left date column with the entry beside it,
 * repeated down the page - so the dates form a timeline along the left edge
 * and every entry keeps the same left margin for its prose. That structure is
 * kept and reused for all four blocks, which is why the page needs so few
 * headings: the shape of a row already says what kind of thing it is.
 *
 * The four section labels are whispers, and the PDF is the first thing on the
 * page, because a recruiter opening a CV page is usually looking for the file.
 */
export default function CVPage() {
  return (
    <>
      <PageHeader title="CV" />

      <Container>
        <div className="border-rule flex flex-wrap items-center gap-x-6 gap-y-3 border-y py-5">
          <a href={PROFILE.resume} className="btn-ghost" download>
            Download PDF
          </a>
          <p className="label">{PROFILE.location}</p>
          <a href={`mailto:${PROFILE.email}`} className="label hover:no-underline">
            {PROFILE.email}
          </a>
        </div>
      </Container>

      <Container className="pt-14">
        <Whisper>Education</Whisper>
        <Row dates={EDUCATION.dates}>
          <p className="text-xl">{EDUCATION.school}</p>
          <p className="text-text-dim mt-1 font-light">{EDUCATION.degree}</p>
          <p className="measure text-text-dim mt-3 text-[0.95rem] leading-relaxed font-light">
            <span className="label">Coursework </span>
            {EDUCATION.coursework.join(", ")}
          </p>
        </Row>
      </Container>

      <Container className="pt-14">
        <Whisper>Experience</Whisper>
        <div className="space-y-8">
          {ROLES.map((role) => (
            <Row key={role.slug} dates={role.dates}>
              <h3 className="text-xl">
                {role.title}, <span className="text-text-dim">{role.org}</span>
              </h3>
              <ul className="mt-3 space-y-2">
                {role.bullets.map((b) => (
                  <li
                    key={b}
                    className="measure relative pl-4 text-[0.95rem] leading-relaxed font-light"
                  >
                    <span
                      className="bg-rule-strong absolute top-[0.7em] left-0 h-px w-2"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </Row>
          ))}
        </div>
      </Container>

      <Container className="pt-14">
        <Whisper>Awards</Whisper>
        {/* A bare two-column date/text table with no borders and no card -
            al-folio's announcements table, which is the most characteristically
            academic component in the theme and exactly right for a short list
            of dated facts. */}
        <table className="w-full">
          <tbody>
            {AWARDS.map((a) => (
              <tr key={`${a.what}-${a.where}`} className="align-baseline">
                <th scope="row" className="label figure w-24 py-1.5 pr-4 text-left font-normal">
                  {a.when}
                </th>
                <td className="py-1.5 font-light">
                  {a.what}
                  <span className="text-text-dim"> · {a.where}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>

      <Container className="pt-14">
        <Whisper>Skills</Whisper>
        <dl className="space-y-4">
          {SKILLS.map((group) => (
            <div key={group.group} className="sm:grid sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
              <dt className="label sm:pt-1">{group.group}</dt>
              <dd className="mt-1 font-light sm:mt-0">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}

/** The al-folio CV row: dates in a narrow left column, entry beside it. */
function Row({ dates, children }: { dates: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-8 gap-y-2 sm:grid-cols-[9rem_minmax(0,1fr)]">
      <p className="label figure sm:pt-1.5">{dates}</p>
      <div>{children}</div>
    </div>
  );
}
