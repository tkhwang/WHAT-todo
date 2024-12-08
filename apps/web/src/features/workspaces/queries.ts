import { Query } from "node-appwrite";
import { MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { DATABASE_ID } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";
import { createSessoinClient } from "@/lib/appwrite";

export async function getWorkspaces() {
  try {
    const { account, databases } = await createSessoinClient();
    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
      return { documents: [], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACES_ID, [
      Query.orderDesc("$createdAt"),
      Query.contains("$id", workspaceIds),
    ]);

    return workspaces;
  } catch {
    return { documents: [], total: 0 };
  }
}

interface GetWorkspaceProps {
  workspaceId: string;
}

export async function getWorkspace({ workspaceId }: GetWorkspaceProps) {
  try {
    const { account, databases } = await createSessoinClient();
    const user = await account.get();

    const member = await getMember({ databases, userId: user.$id, workspaceId });
    if (!member) return null;

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId,
    );

    return workspace;
  } catch {
    return null;
  }
}
