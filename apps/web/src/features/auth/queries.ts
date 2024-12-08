import { createSessoinClient } from "@/lib/appwrite";

export async function getCurrent() {
  try {
    const { account } = await createSessoinClient();

    return await account.get();
  } catch {
    return null;
  }
}
