import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  image: string;
  expertise: string;
  yearsOfExperience: number;
}

export default function TeamMember({
  name,
  image,
  expertise,
  yearsOfExperience,
}: TeamMemberProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={300}
          className="w-full object-cover h-48"
          sizes="(max-width: 400px) 100vw, 400px"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{name}</CardTitle>
        <p className="text-muted-foreground mb-1">{expertise}</p>
        <p className="text-sm">{yearsOfExperience} years of experience</p>
      </CardContent>
    </Card>
  );
}
