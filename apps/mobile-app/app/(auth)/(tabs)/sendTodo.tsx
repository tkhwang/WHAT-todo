/* eslint-disable react/no-array-index-key */
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { SEND_TODO_STEPS } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import Header from "@/components/MainLayout/Header";
import { IUserFS } from "@/types";
import SelectedUsers from "@/components/User/select/SelectedUsers";
import SendTodoForm from "@/components/Task/send/SendTodoForm";
import SendTodoStepsSearch from "@/components/Task/send/steps/SendTodoStepsSearch";
import SendTodoStepsTitle from "@/components/Task/send/steps/SendTodoStepsTitle";
import SendTodoStepsCtaButton from "@/components/Task/send/steps/SendTodoStepsCtaButton";

export default function SendTodo() {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");
  const [userType, setUserType] = useState<"user" | "supervisor">("user");
  const [selectedUsers, setSelectedUsers] = useState<IUserFS[]>([]);
  const [selectedSupervisors, setSelectedSupervisors] = useState<IUserFS[]>([]);

  const [sendTodoSteps, setSendTodoSteps] = useState(SEND_TODO_STEPS.SEARCH);
  const [areUsersSelectionDone, setAreUsersSelectionDone] = useState(false);

  const cleanupSelection = useCallback(() => {
    setSearchText("");
    setSelectedUsers([]);
    setSelectedSupervisors([]);
    setAreUsersSelectionDone(false);
    setUserType("user");
  }, []);

  const onBackPress = () => cleanupSelection();

  const handleFocusEffect = useCallback(() => {
    return () => {
      cleanupSelection();
    };
  }, [cleanupSelection]);

  useFocusEffect(handleFocusEffect);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className={"flex flex-1 flex-col p-4 gap-4"}>
          <Header title={t("title.expert.sendTodo")} showBackButton onBackPress={onBackPress} />
          {/* Title: Search User */}

          {/* Selected User */}
          <View className={"flex flex-col gap-2"}>
            <Text className={"text-xl font-semibold"}>{`${t("sendTodo.user.type.user")}:`}</Text>
            <SelectedUsers selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
          </View>

          {/* Selected Supervisors */}
          <View className={"flex flex-col gap-2"}>
            <Text
              className={"text-xl font-semibold"}
            >{`${t("sendTodo.user.type.supervisor")}:`}</Text>
            <SelectedUsers
              selectedUsers={selectedSupervisors}
              setSelectedUsers={setSelectedSupervisors}
            />
          </View>

          {/* Steps title */}
          <SendTodoStepsTitle sendTodoSteps={sendTodoSteps} />

          {/* STEPS */}
          {sendTodoSteps === SEND_TODO_STEPS.SEARCH ? (
            <SendTodoStepsSearch
              searchText={searchText}
              setSearchText={setSearchText}
              // user type
              userType={userType}
              setUserType={setUserType}
              // selectedUsers
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              // selectedSupervisors
              selectedSupervisors={selectedSupervisors}
              setSelectedSupervisors={setSelectedSupervisors}
              // user selection one flag
              setAreUsersSelectionDone={setAreUsersSelectionDone}
            />
          ) : sendTodoSteps === SEND_TODO_STEPS.SELECT ? (
            <SendTodoForm />
          ) : null}

          {/* Button CTA */}
          <SendTodoStepsCtaButton selectedUsers={selectedUsers} sendTodoSteps={sendTodoSteps} />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
