import { industries } from "@/data/industries";
import { getUserProfile } from "@/actions/user";
import { redirect } from "next/navigation";
import EditInsightsForm from "../_components/edit-insights-form";

export default async function EditInsightsPage() {
  const profile = await getUserProfile();

  if (!profile?.industry) {
    redirect("/onboarding");
  }

  // Stored industry looks like "tech-software-development".
  // Split it back into the industry id + specialization label.
  const matchedIndustry = industries.find((ind) =>
    profile.industry.startsWith(`${ind.id}-`)
  );

  let subIndustry = "";
  if (matchedIndustry) {
    const subSlug = profile.industry.slice(matchedIndustry.id.length + 1);
    subIndustry =
      matchedIndustry.subIndustries.find(
        (sub) => sub.toLowerCase().replace(/ /g, "-") === subSlug
      ) || "";
  }

  const defaultValues = {
    industry: matchedIndustry?.id || "",
    subIndustry,
    experience: profile.experience ?? "",
    skills: (profile.skills || []).join(", "),
    bio: profile.bio || "",
  };

  return (
    <main>
      <EditInsightsForm industries={industries} defaultValues={defaultValues} />
    </main>
  );
}
