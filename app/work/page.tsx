import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import RoleRow from "@/components/RoleRow";
import { ROLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Eithelmir, UBC Rover, and UBC Aerial Robotics and Rocketry Club.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Work"
        lede="Three teams, all of them robotics. Two of the three pages below are mostly about what broke."
      />
      <Container>
        {/* No section headings inside the list. Each entry's own title is the
            only heading it needs, and the hairline between rows is the only
            separator - three bordered cards would read as three unrelated
            things rather than one history. */}
        <ul>
          {ROLES.map((role) => (
            <RoleRow key={role.slug} role={role} />
          ))}
        </ul>
      </Container>
    </>
  );
}
