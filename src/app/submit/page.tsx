import SubmitForm from "./SubmitForm";

export const dynamic = "force-dynamic";

export default function SubmitPage() {
  const enabled = process.env.SUBMISSIONS_ENABLED === "true";
  return <SubmitForm enabled={enabled} />;
}
