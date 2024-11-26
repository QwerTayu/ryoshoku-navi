import { auth } from "@/lib/firebase";
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-rose-500 to-cyan-500 flex items-center">
      <div className="w-full max-w-5xl px-5 mx-auto flex flex-col md:flex-row items-center justify-center gap-[30px] md:justify-between">
        <div className="w-full md:w-max max-w-[400px] flex-col justify-center items-start gap-[30px] md:gap-[50px] inline-flex">
          <div className="text-white text-[32px] md:text-[40px] font-bold leading-normal">
            寮生の<br />
            寮生による<br />
            寮生のためのアプリ
          </div>
          <div className="self-stretch text-white text-base font-normal leading-normal">
            💁‍♂️ 締切17:00を忘れてしまうよ...<br />
            💁‍♀️ 今日欠食してたっけかな...<br />
            🙋‍♀️ あっ!今日人気メニューの日だった！<br />
            そんな寮生のためのアプリができました。
          </div>
        </div>
        <div className="w-full max-w-[380px] md:w-[450px] px-[30px] md:px-[50px] py-[50px] md:py-[100px] bg-white bg-opacity-30 rounded-[40px] flex-col justify-center items-center gap-[30px] inline-flex">
          <img alt="logo" src="/heyagram.svg" className="w-[150px] md:w-[200px]" />
          <div className="flex-col justify-center items-center gap-5 flex">
            <div className="px-10 py-2.5 bg-rose-500 rounded-full flex justify-center items-center">
              <button className="text-white text-base font-normal leading-normal"
                onClick={() => signIn('google')}
              >
                Googleでログイン
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  }
};
