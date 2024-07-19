import { Auth } from "@/components/Auth";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

export default function login() {
  return (
    <VStack className="flex-1 justify-center items-center" space="md">
      <Heading>Welcome back to whatTodo</Heading>
      <Auth />
    </VStack>
  );
}
