import Image from "next/image";

export default async function Page() {
  const imageUrl = "/api/image";

  return (
    <div>
      <h1>Image Display</h1>
      <Image src={imageUrl} width={500} height={500} alt="Dynamic Image" />
    </div>
  );
}
