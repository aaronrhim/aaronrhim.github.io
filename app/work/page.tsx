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
        title="Experience"
        lede="Building with teams, from competition robots to human motion capture. Here’s what I’ve worked on and how it came together."
      />
      <Container>
        <ul>
          {ROLES.map((role) => (
            <RoleRow key={role.slug} role={role} />
          ))}
        </ul>
      </Container>
    </>
  );
}
