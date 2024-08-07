import Dialogbox from "@/components/Dialogbox/Dialogbox";
import MainHistory from "@/components/Overviews/MainHistory";
import Overview from "@/components/Overviews/Overview";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const usersettings = await prisma.userSettings.findUnique({
    where: {
      userId: user?.id,
    },
  });

  return (
    <>
      <Wrapper>
        <div className="flex text-white mt-5 items-center">
          <h2 className="sm:text-3xl text-xl flex-1">
            Hello <span className="capitalize">{user?.firstName}</span>
          </h2>
          <div className="flex gap-3">
            <Button>{<Dialogbox types="income" />}</Button>
            <Button>{<Dialogbox types="expense" />}</Button>
          </div>
        </div>
        <div>
          <Overview usersettings={usersettings || undefined} />
        </div>
        <div className="mt-6">
          <MainHistory usersettings={usersettings || undefined} />
        </div>
      </Wrapper>
    </>
  );
};

export default Dashboard;
