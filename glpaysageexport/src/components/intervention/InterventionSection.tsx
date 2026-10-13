import SectionHeading from "@/components/SectionHeading";
import DepartmentList from "./DepartmentList";
import InterventionMapLoader from "./InterventionMapLoader";

export default function InterventionSection() {
  return (
    <section>
      <SectionHeading
        eyebrow="Notre zone d'intervention"
        title="Un projet près de chez vous ?"
        description="Création, entretien et aménagement paysager : contactez GLPaysage pour vérifier nos possibilités d'intervention dans votre commune."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <InterventionMapLoader />
        <DepartmentList />
      </div>
    </section>
  );
}
