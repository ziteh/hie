import Explorer from "@/app/components/explorer";

export default function Page({ params }: { params: { tag: string } }) {
  return <Explorer tagId={Number(params.tag)} />;
}
